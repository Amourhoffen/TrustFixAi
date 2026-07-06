import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const HF_MODELS: Record<string, string> = {
  llama: 'meta-llama/Meta-Llama-3-8B-Instruct',
  qwen: 'Qwen/Qwen2.5-72B-Instruct',
  deepseek: 'mistralai/Mistral-7B-Instruct-v0.2', // Fallback to mistral if deepseek is unavailable on free tier
};

export async function POST(req: NextRequest) {
  try {
    const { messages, context, model } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages format.' }, { status: 400 });
    }

    const systemPrompt = `You are the TrustFix AI Assistant, a friendly and expert home repair advisor.
The user just uploaded an image of an issue. The diagnosis is:
Diagnosis: ${context?.diagnosis || 'Unknown'}
Severity: ${context?.severity || 'Unknown'}
Recommended Pro: ${context?.professional_needed || 'Unknown'}

Answer their questions. Keep answers concise, helpful, and formatted clearly in markdown.`;

    // HUGGING FACE INFERENCE (If selected)
    if (model && HF_MODELS[model as keyof typeof HF_MODELS]) {
      const hfApiKey1 = process.env.HUGGINGFACE_API_KEY;
      const hfApiKey2 = process.env.HUGGINGFACE_API_KEY_2;
      
      const keysToTry = [hfApiKey1, hfApiKey2].filter(Boolean);
      const hfModel = HF_MODELS[model as keyof typeof HF_MODELS];

      for (const key of keysToTry) {
        try {
          const res = await fetch(`https://api-inference.huggingface.co/models/${hfModel}/v1/chat/completions`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${key}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              messages: [{ role: 'system', content: systemPrompt }, ...messages],
              max_tokens: 400
            })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.choices && data.choices[0]?.message?.content) {
              return NextResponse.json({ response: data.choices[0].message.content });
            }
          } else {
            console.warn(`HuggingFace ${model} failed with key ${key?.substring(0,6)}... status: ${res.status}`);
          }
        } catch (e) {
          console.error(`HuggingFace Network Error with key ${key?.substring(0,6)}...`, e);
        }
      }
      console.warn(`HuggingFace ${model} failed, falling back to Gemini...`);
    }

    // GEMINI FALLBACK (Or if Gemini is explicitly selected)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) return NextResponse.json({ error: 'Gemini Key missing' }, { status: 500 });
    
    const genAI = new GoogleGenerativeAI(geminiKey);
    const historyMessages = messages.slice(0, -1).map((msg: any) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    let chat;
    try {
      const gModel = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      chat = gModel.startChat({
        history: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "model", parts: [{ text: "Understood. I am ready to help." }] },
          ...historyMessages
        ],
      });
    } catch (err) {
      return NextResponse.json({ error: "All models exhausted." }, { status: 500 });
    }

    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    
    return NextResponse.json({ response: result.response.text() });
    
  } catch (error: unknown) {
    console.error("Chat API Error:", error);
    return NextResponse.json(
      { error: "Sorry, I had trouble processing that request." }, 
      { status: 500 }
    );
  }
}
