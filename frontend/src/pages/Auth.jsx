import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, User, Wrench } from 'lucide-react';

export default function Auth() {
  const { login } = useAuth();
  const [role, setRole] = useState('member');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">TrustFix Sentinel</h1>
          <p className="text-slate-500 text-sm mt-1">Join the community platform</p>
        </div>

        <div className="space-y-4 mb-8">
          <button 
            onClick={() => setRole('member')}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${role === 'member' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className={`p-3 rounded-full ${role === 'member' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <User size={24} />
            </div>
            <div className="text-left">
              <h3 className={`font-bold ${role === 'member' ? 'text-emerald-900' : 'text-slate-700'}`}>Community Member</h3>
              <p className="text-xs text-slate-500">I need help fixing issues</p>
            </div>
          </button>

          <button 
            onClick={() => setRole('provider')}
            className={`w-full p-4 rounded-2xl border-2 flex items-center gap-4 transition-all ${role === 'provider' ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-slate-300'}`}
          >
            <div className={`p-3 rounded-full ${role === 'provider' ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
              <Wrench size={24} />
            </div>
            <div className="text-left">
              <h3 className={`font-bold ${role === 'provider' ? 'text-indigo-900' : 'text-slate-700'}`}>Service Provider</h3>
              <p className="text-xs text-slate-500">I want to offer my services</p>
            </div>
          </button>
        </div>

        <button 
          onClick={() => login(role)}
          className={`w-full py-4 rounded-xl font-bold text-white shadow-md transition-colors ${role === 'member' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          Continue as {role === 'member' ? 'Member' : 'Provider'}
        </button>
      </div>
    </div>
  );
}
