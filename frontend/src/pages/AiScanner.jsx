import React, { useState } from 'react';
import { ShieldCheck, User } from 'lucide-react';

export default function AiScanner() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('query', query);
      const res = await fetch('http://localhost:8000/api/diagnose', { method: 'POST', body: formData });
      const data = await res.json();
      
      // Fallback logic to get recommended providers using ML tags
      const recRes = await fetch('http://localhost:8000/api/recommend-providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          issue_tags: data.tags || [],
          providers: [
            { id: "1", name: "John Doe (Plumber)", tags: ["plumber", "leak", "pipe", "water"] },
            { id: "2", name: "Jane Smith (Electrician)", tags: ["electrician", "wiring", "short", "power"] }
          ]
        })
      });
      const recData = await recRes.json();
      
      setResult({ ...data, recommended: recData.recommended || [] });
    } catch (err) {
      alert("AI Scan failed. Check if backend is running and API key is set.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShieldCheck className="text-emerald-500" />
        <h1 className="text-2xl font-bold">AI Scanner</h1>
      </div>
      
      <form onSubmit={handleScan} className="bg-white p-5 rounded-3xl shadow-md border border-slate-100">
        <textarea 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe your maintenance issue..."
          className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
          rows="4"
        />
        <button type="submit" disabled={loading} className="w-full bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-bold py-4 rounded-2xl shadow-sm">
          {loading ? 'Analyzing with Gemini...' : 'Diagnose Issue'}
        </button>
      </form>
      
      {result && (
        <div className="mt-6 space-y-4">
          <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100">
            <h2 className="font-bold text-lg mb-2 text-slate-800">Diagnosis</h2>
            <p className="text-slate-600 mb-4">{result.issue}</p>
            
            <h3 className="font-semibold text-sm text-slate-500 uppercase tracking-wider mb-1">DIY Steps</h3>
            <p className="text-sm text-slate-700 mb-4 bg-slate-50 p-3 rounded-xl">{result.diy_steps}</p>
            
            <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl font-medium flex items-center justify-between">
              <span>Pro Needed:</span>
              <span className="font-bold">{result.professional_needed}</span>
            </div>
          </div>

          {result.recommended && result.recommended.length > 0 && (
            <div className="bg-indigo-50 p-5 rounded-3xl border border-indigo-100">
              <h3 className="font-bold text-indigo-900 mb-3 flex items-center gap-2"><User size={18}/> ML Recommended Providers</h3>
              {result.recommended.map((pro, i) => (
                <div key={i} className="bg-white p-3 rounded-xl mb-2 shadow-sm text-sm font-medium text-slate-700">
                  {pro.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
