import os
import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from PIL import Image
import io
import base64

from langchain_core.documents import Document
from langchain_community.vectorstores import FAISS
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers import EnsembleRetriever
from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage

app = FastAPI(title="TrustFix AI Agentic RAG")

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("static", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

api_key = os.getenv("GEMINI_API_KEY")

# ---------------------------------------------------------
# Simulated Knowledge Base
# ---------------------------------------------------------
KNOWLEDGE_BASE = [
    "Plumbing leak repair costs roughly ₹500 to ₹800. Safety protocol: Turn off the main water valve before repairs. Recommended professional: Plumber.",
    "Electrical fault or short circuit repair costs ₹300 to ₹1000 depending on wiring damage. Safety protocol: Turn off main breaker immediately, do not touch exposed wires. Recommended professional: Electrician.",
    "Pothole or driveway patching costs ₹1500 to ₹5000 based on area. Safety protocol: Cordon off the area to prevent tripping or vehicle damage. Recommended professional: Mason/Paving Contractor.",
    "Roof leak repair typically costs ₹2000 to ₹10000. Safety protocol: Do not climb on wet roof. Place buckets to catch water. Recommended professional: Roofer.",
    "Broken window glass replacement costs ₹800 to ₹2500 per pane. Safety protocol: Wear thick gloves and clear broken shards carefully. Recommended professional: Carpenter/Glazier.",
    "AC not cooling or gas leak repair costs ₹1000 to ₹3000. Safety protocol: Unplug the unit. Do not inhale refrigerant gas. Recommended professional: HVAC Technician."
]

docs = [Document(page_content=text) for text in KNOWLEDGE_BASE]

ensemble_retriever = None
llm = None

if api_key:
    try:
        # Initialize Google Embeddings
        embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
        
        # Setup FAISS Retriever
        faiss_vectorstore = FAISS.from_documents(docs, embeddings)
        faiss_retriever = faiss_vectorstore.as_retriever(search_kwargs={"k": 2})
        
        # Setup BM25 Retriever
        bm25_retriever = BM25Retriever.from_documents(docs)
        bm25_retriever.k = 2
        
        # Create Hybrid Ensemble Retriever
        ensemble_retriever = EnsembleRetriever(
            retrievers=[bm25_retriever, faiss_retriever], weights=[0.5, 0.5]
        )
        
        # Initialize LLM
        llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.1)
        print("Agentic RAG System Initialized Successfully!")
    except Exception as e:
        print(f"Failed to initialize RAG components: {e}")
else:
    print("WARNING: GEMINI_API_KEY not set. RAG system disabled.")

# ---------------------------------------------------------
# Endpoints
# ---------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
async def read_index():
    try:
        with open("static/index.html", "r", encoding="utf-8") as f:
            return f.read()
    except FileNotFoundError:
        return "<html><body><h1>index.html not found in static/ directory</h1></body></html>"

@app.post("/analyze_issue")
async def analyze_issue(
    query: str = Form(...),
    file: Optional[UploadFile] = File(None)
):
    if not api_key or not ensemble_retriever or not llm:
        raise HTTPException(status_code=500, detail="Gemini API key not configured or RAG not initialized.")
    
    try:
        # Step 1: Retrieve context from Hybrid Knowledge Base
        relevant_docs = ensemble_retriever.invoke(query)
        context_text = "\n".join([f"- {doc.page_content}" for doc in relevant_docs])
        
        # Step 2: Construct the Prompt with RAG Context
        prompt = f"""
You are TrustFix AI, an expert civic and home maintenance AI agent.
Use the following retrieved context from our Verified Knowledge Base to help assess the user's issue.
If the context contains pricing or safety protocols related to the issue, you MUST use them for your estimates. 
If the issue is unrelated to the context, provide a best-effort estimate but mention it is not from the verified DB.

Retrieved Context:
{context_text}

User Query: {query}

Based on the query and the provided image (if any), return ONLY a JSON object with these EXACT keys:
- "issue_diagnosis": (Brief diagnosis of what seems to be the problem)
- "verified_professional_type": (e.g., Plumber, Electrician)
- "fair_market_price_estimate": (Use the retrieved context for pricing)
- "safety_advice": (Use retrieved context protocols)

Respond ONLY with valid JSON. Do not include markdown code blocks.
"""     
        messages = []
        if file:
            image_bytes = await file.read()
            # Convert to base64 for LangChain multimodal support
            encoded_image = base64.b64encode(image_bytes).decode("utf-8")
            image_message = {
                "type": "image_url",
                "image_url": {"url": f"data:image/jpeg;base64,{encoded_image}"}
            }
            text_message = {"type": "text", "text": prompt}
            messages = [HumanMessage(content=[text_message, image_message])]
        else:
            messages = [HumanMessage(content=prompt)]

        # Step 3: Invoke the LLM
        response = llm.invoke(messages)
        
        # Clean up JSON formatting
        response_text = response.content.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:]
        if response_text.startswith("```"):
            response_text = response_text[3:]
        if response_text.endswith("```"):
            response_text = response_text[:-3]
            
        result_json = json.loads(response_text.strip())
        return result_json
        
    except json.JSONDecodeError as e:
        raise HTTPException(status_code=500, detail=f"Failed to parse Gemini JSON: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend:app", host="0.0.0.0", port=8000, reload=True)
