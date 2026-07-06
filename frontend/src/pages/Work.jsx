import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Briefcase } from 'lucide-react';

export default function Work() {
  const { userRole } = useAuth();
  
  return (
    <div className="p-4 pb-24 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Briefcase className="text-emerald-500"/> {userRole === 'member' ? 'My Reported Issues' : 'Job Board'}
      </h1>
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
        <p className="text-slate-600">
          {userRole === 'member' 
            ? 'Track the status of issues you have reported to the community.' 
            : 'UrbanClap-style job board. Apply to jobs requested by community members here.'}
        </p>
      </div>
    </div>
  );
}
