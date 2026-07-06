import React from 'react';
import { Search } from 'lucide-react';

export default function Explore() {
  const pros = [
    { id: 1, name: "John Doe", role: "Plumber", rating: 4.8 },
    { id: 2, name: "Jane Smith", role: "Electrician", rating: 4.9 },
    { id: 3, name: "Mike Johnson", role: "Carpenter", rating: 4.5 }
  ];

  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Search className="text-emerald-500"/> Explore Pros
      </h1>
      <div className="space-y-4">
        {pros.map(pro => (
          <div key={pro.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800">{pro.name}</h3>
              <p className="text-sm text-slate-500">{pro.role}</p>
            </div>
            <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
              ★ {pro.rating}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
