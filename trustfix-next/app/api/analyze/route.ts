import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Robust JSON Parsing (Adapted from GreenStep gemini_service.py)
function parseJsonResponse(text: string): any {
  try { return JSON.parse(text); } catch (e) {}
  
  const mdMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
  if (mdMatch) {
    try { return JSON.parse(mdMatch[1]); } catch (e) {}
  }
  
  const bracketMatch = text.match(/\{[\s\S]*\}/);
  if (bracketMatch) {
    try { return JSON.parse(bracketMatch[0]); } catch (e) {}
  }
  
  throw new Error("Failed to parse JSON from AI response.");
}

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY is missing.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const formData = await req.formData();
    const file = formData.get('image') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image uploaded.' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');
    
    const imagePart = {
      inlineData: {
        data: base64Image,
        mimeType: file.type,
      },
    };

    const prompt = `SYSTEM: You are an expert home and civic maintenance auditor. The user has uploaded a photo of a problem.
Your task:
1. STRICT VALIDATION: Check the photo. Is it genuinely a home maintenance issue, appliance issue, or civic infrastructure problem (e.g., broken pipe, pothole, rusted AC)? If it is a person, an animal, a selfie, a screenshot, or completely unrelated, you MUST set "is_valid_issue" to false and explain why in "rejection_reason".
2. If valid, diagnose the issue, determine severity, identify the professional needed, estimate the price in INR, and suggest a 11-character YouTube Video ID for a relevant DIY repair (e.g. 'j-KviwEExHk').

Return ONLY this JSON (no other text):
{
  "is_valid_issue": true or false,
  "rejection_reason": "if false, explain why",
  "diagnosis": "Detailed explanation",
  "severity": "Low", "Medium", or "High",
  "professional_needed": "e.g. Plumber",
  "estimated_price_inr": "e.g. ₹500 - ₹800",
  "youtube_video_id": "11 character ID"
}`;

    // Robust Model Fallback Logic
    let result;
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      result = await model.generateContent([prompt, imagePart]);
    } catch (e1: unknown) {
      console.warn("gemini-2.5-flash failed. Trying gemini-2.0-flash...", e1);
      try {
        const model2 = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        result = await model2.generateContent([prompt, imagePart]);
      } catch (e2: unknown) {
        console.warn("gemini-2.0-flash failed...", e2);
        const model3 = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
        result = await model3.generateContent([prompt, imagePart]);
      }
    }

    if (!result) {
      throw new Error("All AI models failed or API Key is invalid. Did you restart your Next.js server?");
    }

    const text = result.response.text();
    const jsonResult = parseJsonResponse(text);

    return NextResponse.json(jsonResult, { status: 200 });

  } catch (error: unknown) {
    console.error("AI Analysis Error:", error);
    const msg = error instanceof Error ? error.message : 'An unexpected error occurred during analysis.';
    return NextResponse.json(
      { error: msg },
      { status: 500 }
    );
  }
}
