import os
import json
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import google.generativeai as genai
from googleapiclient.discovery import build
from ml_engine import recommend_providers

app = FastAPI(title="TrustFix Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "TrustFix API is running! Access the frontend to use the app."}

api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

youtube_api_key = os.getenv("YOUTUBE_API_KEY")

class RecommendRequest(BaseModel):
    issue_tags: List[str]
    providers: List[dict]

@app.post("/api/diagnose")
async def diagnose(query: str = Form(...), file: Optional[UploadFile] = File(None)):
    if not api_key:
        raise HTTPException(status_code=500, detail="Gemini API key missing on server")
    
    try:
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        Act as an expert home maintenance diagnostician.
        User Issue: {query}
        
        Identify the issue, provide brief DIY troubleshooting steps, state the type of professional needed (e.g. Plumber, Electrician), and provide a list of keywords/tags (e.g. ["leak", "pipe", "plumbing"]).
        
        Return ONLY a valid JSON object with keys: "issue", "diy_steps", "professional_needed", "tags" (list of strings).
        """
        
        contents = [prompt]
        if file:
            image_bytes = await file.read()
            contents.append({
                "mime_type": file.content_type,
                "data": image_bytes
            })
            
        response = model.generate_content(contents)
        response_text = response.text.strip()
        if response_text.startswith("```json"): response_text = response_text[7:]
        if response_text.startswith("```"): response_text = response_text[3:]
        if response_text.endswith("```"): response_text = response_text[:-3]
        
        return json.loads(response_text.strip())
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/recommend-providers")
async def recommend(req: RecommendRequest):
    try:
        results = recommend_providers(req.issue_tags, req.providers)
        return {"recommended": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/learn")
async def learn(tag: str):
    if not youtube_api_key:
        # Mock fallback
        return {
            "videos": [
                {
                    "title": f"How to fix {tag} - Basic Guide (Mock Video)", 
                    "videoId": "dQw4w9WgXcQ",
                    "thumbnail": "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
                },
                {
                    "title": f"Advanced {tag} repair and diagnostics", 
                    "videoId": "jNQXAC9IVRw",
                    "thumbnail": "https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg"
                }
            ]
        }
    
    try:
        youtube = build('youtube', 'v3', developerKey=youtube_api_key)
        request = youtube.search().list(
            q=f"How to fix {tag} tutorial",
            part='snippet',
            type='video',
            maxResults=3
        )
        response = request.execute()
        videos = []
        for item in response.get('items', []):
            if item['id'].get('videoId'):
                videos.append({
                    "title": item['snippet']['title'],
                    "videoId": item['id']['videoId'],
                    "thumbnail": item['snippet']['thumbnails']['high']['url']
                })
        return {"videos": videos}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
