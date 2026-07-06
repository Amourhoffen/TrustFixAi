<div align="center">
  
# 🛠️ TrustFix AI: Community Decision Intelligence

**Empowering communities to instantly diagnose, report, and repair civic and home infrastructure using Multimodal Generative AI.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js)](#)
[![Google Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-Google_Cloud-4285F4?style=for-the-badge&logo=googlecloud)](#)
[![Cloud Run](https://img.shields.io/badge/Deployed_On-Google_Cloud_Run-blue?style=for-the-badge&logo=googlecloud)](#)
[![HuggingFace](https://img.shields.io/badge/Fallback_AI-Hugging_Face-FFD21E?style=for-the-badge&logo=huggingface)](#)

### 🚀 Live Deployment: [TrustFix AI on Cloud Run](https://trustfix-next-904888201027.us-central1.run.app)

</div>

<br />

## 🌟 The Problem
Information asymmetry plagues civic maintenance and household repairs. Everyday citizens lack the technical expertise to diagnose structural damage (like potholes) or broken appliances, leaving them vulnerable to contractor overcharging and scams. Concurrently, municipalities lack structured, verified data on local infrastructure decay.

## 💡 Our Solution
**TrustFix AI** flips this model completely. Instead of just connecting you to a mechanic, our platform acts as your personal technical advisor using Google's State-of-the-art Multimodal AI.
1. **Snap a photo:** Upload a picture of a broken pipe, a pothole, or a sparking outlet.
2. **Instant Diagnosis:** Gemini 2.5 Flash analyzes the image in milliseconds.
3. **Transparent Pricing:** The AI provides an objective INR cost estimate BEFORE you talk to a contractor (acting as an anti-scam shield).
4. **DIY Upskilling:** If safe, the app dynamically fetches a verified YouTube repair tutorial so you can fix it for free.

## ✨ Unique Selling Proposition (USP)
* **Zero-Knowledge Diagnostics:** Users don't need to know technical terms. The AI does the heavy lifting.
* **Resilient Multi-Model Architecture:** We guarantee 100% uptime. If Google Gemini hits a rate limit, our custom backend dynamically cascades to open-source models via the Hugging Face Inference API.
* **Gamified Trust Ecosystem:** Users earn "Trust Scores" for accurately reporting civic issues or validating honest local professionals, creating a hyper-local, community-vetted gig economy.

## 🏗️ Core Architecture & Workflow
Our architecture is built on Next.js, deployed natively on Google Cloud Run for enterprise scalability.

1. **Data Ingestion:** User uploads a photo via our Gamified UI (built with Framer Motion).
2. **AI Processing:** Image is sent to **Google Gemini 2.5 Flash** using a highly engineered system prompt.
3. **Data Transformation:** Gemini outputs strict JSON containing actionable insights (`is_valid_issue`, `diagnosis`, `estimated_cost`).
4. **Dynamic Action:** Backend parses this data and queries the **YouTube Data API** for DIY tutorials.
5. **Failover Protocol:** Built-in Catch blocks automatically route to Llama 3.1 if primary APIs fail.

## 📋 List of Features
1. **Multimodal AI Vision Scanner:** Instantly analyzes uploaded images using Gemini 2.5 Vision to accurately diagnose structural, mechanical, or civic issues.
2. **Dynamic Anti-Scam Cost Estimator:** Automatically calculates and displays a localized, transparent repair cost estimate (in INR) before the user contacts a professional.
3. **Automated DIY Video Integration:** Seamlessly fetches highly-rated DIY repair tutorials via the YouTube Data API when an issue is safe to fix at home.
4. **Resilient Multi-Model AI Architecture:** Guarantees 100% uptime by automatically cascading from Google Gemini to Hugging Face models if API rate limits are hit.
5. **Gamified Trust Ecosystem (Trust Scores):** A community-driven reputation system where citizens earn "Trust Points" for accurately reporting civic issues or verifying the quality of local repair professionals.
6. **Premium & Accessible UI/UX:** Built with Next.js, Framer Motion, and Tailwind CSS. Features micro-animations and strict WCAG accessibility compliance.

## 💻 Tech Stack & Google Cloud Integration
- **Frontend:** Next.js 16 (React, TypeScript), Tailwind CSS, Framer Motion, Sonner
- **Backend:** Next.js API Routes (Serverless)
- **Primary AI (Google):** Google Gemini 2.5 Flash (via Google AI SDK) for high-speed, multimodal visual diagnostics.
- **Fallback AI:** Llama 3.1 8B (via Hugging Face Inference API)
- **External APIs:** YouTube Data API v3
- **Deployment & Scalability:** Google Cloud Run. We chose Cloud Run to provide true serverless scalability. As a containerized solution, it automatically scales to zero during downtime to save costs, and scales up to thousands of concurrent requests instantly during high traffic. This, combined with our Multi-Model AI Fallback system, guarantees 100% uptime for real-world civic deployments.

## 🎯 Social & Practical Impact
- **For Citizens:** Saves thousands of rupees by preventing overcharging and enabling safe DIY repairs.
- **For Professionals:** Helps honest, skilled workers build a verified reputation.
- **For Government:** Crowdsources civic maintenance data (potholes, broken streetlights) with photographic proof and severity assessments, giving municipal bodies a real-time heatmap of infrastructure decay.

---
<div align="center">
  <i>Built with ❤️ for the Google Cloud & Gen AI Academy Hackathon</i>
</div>
