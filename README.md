# TrustFix Community Sentinel MVP

## Prerequisites
- Docker & Docker Compose OR
- Node.js (for frontend) and Python 3.11 (for backend)

## Configuration

1. **Backend Environment Variables**:
   In the `backend` folder, create a `.env` file (or pass them to docker):
   ```
   GEMINI_API_KEY=your_gemini_key_here
   YOUTUBE_API_KEY=your_youtube_key_here
   ```

2. **Frontend Firebase Config**:
   In `frontend/src/lib/firebase.js`, update the config variables or use a `.env` file in the `frontend` folder:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_PROJECT_ID=your_id
   # ... etc
   ```

## Running the Platform (Docker - Recommended)

To spin up the entire multi-container SaaS platform locally:
```bash
docker-compose up --build
```
- Frontend will be available at: http://localhost:80
- Backend will be available at: http://localhost:8000

## Running the Platform (Manual)

**Backend:**
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```
