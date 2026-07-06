import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell, MapPin, Search, ShieldCheck, Wrench, Zap, Wind, Hammer, Paintbrush, Camera, Sparkles, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const { userRole } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="bg-slate-50 min-h-full pb-8">
      
      {/* Top Header */}
      <div className="bg-white px-5 pt-6 pb-4 rounded-b-3xl shadow-sm border-b border-slate-100 sticky top-0 z-30">
        <div className="flex justify-between items-center mb-5">
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <Menu size={24} className="text-slate-700" />
          </button>
          <h1 className="text-2xl font-black text-blue-700 tracking-tight">TrustFix</h1>
          <button className="p-2 hover:bg-slate-100 rounded-full transition-colors relative">
            <Bell size={24} className="text-slate-700" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Location & Search */}
        <div className="flex items-center gap-2 mb-4">
          <MapPin size={20} className="text-blue-600" />
          <span className="font-semibold text-slate-800 text-sm">Bangalore</span>
          <ChevronDown size={16} className="text-slate-500" />
        </div>
        
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="What service do you need?" 
            className="w-full bg-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all border border-transparent focus:bg-white"
          />
        </div>
      </div>

      <div className="px-5 pt-6">
        
        {/* Trust Hero Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-6 mb-8 text-white shadow-lg shadow-blue-600/30 relative overflow-hidden flex flex-col justify-center">
          <div className="absolute top-[-20px] right-[-20px] opacity-10">
            <ShieldCheck size={160} />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck size={20} className="text-blue-200" />
              <span className="text-xs font-bold text-blue-100 tracking-wider uppercase">Premium Service</span>
            </div>
            <h2 className="text-2xl font-black mb-2 leading-tight">Verified Professionals.<br/>Transparent Pricing.<br/>Peace of Mind.</h2>
          </div>
        </div>

        {/* Popular Services Grid */}
        <div className="mb-8">
          <h3 className="font-bold text-slate-900 text-lg mb-4">Popular Services</h3>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Plumber', icon: Wrench, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'Electrician', icon: Zap, color: 'text-yellow-500', bg: 'bg-yellow-50' },
              { label: 'Cleaning', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { label: 'AC Repair', icon: Wind, color: 'text-cyan-500', bg: 'bg-cyan-50' },
              { label: 'Painting', icon: Paintbrush, color: 'text-purple-500', bg: 'bg-purple-50' },
              { label: 'Carpenter', icon: Hammer, color: 'text-orange-500', bg: 'bg-orange-50' }
            ].map((service, idx) => {
              const Icon = service.icon;
              return (
                <button key={idx} className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center shadow-sm border border-slate-100 hover:shadow-md transition-shadow gap-3">
                  <div className={`w-12 h-12 rounded-full ${service.bg} flex items-center justify-center`}>
                    <Icon size={24} className={service.color} strokeWidth={2.5} />
                  </div>
                  <span className="text-xs font-bold text-slate-700">{service.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* AI Scanner Integration */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-1 relative overflow-hidden shadow-xl shadow-slate-900/20">
            {/* Animated glowing border effect wrapper */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-20 blur-xl"></div>
            
            <div className="bg-slate-900 rounded-[1.4rem] p-6 relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
                <Sparkles size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-black text-white mb-2">Not sure what's broken?</h3>
              <p className="text-sm text-slate-400 mb-6 px-4">Let our advanced AI diagnose the issue instantly from a simple photo.</p>
              
              <button 
                onClick={() => navigate('/scanner')}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-blue-600/30"
              >
                <Camera size={20} />
                Upload Photo to Diagnose
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
