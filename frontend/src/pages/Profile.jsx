import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Heart, MessageCircle, LogOut } from 'lucide-react';

export default function Profile() {
  const { userRole, logout } = useAuth();

  return (
    <div className="bg-slate-50 min-h-screen pb-32 max-w-md mx-auto relative overflow-hidden">
      
      {/* Top Header Background */}
      <div className="bg-primary-500 h-48 w-full absolute top-0 left-0 rounded-b-[2.5rem]"></div>

      <div className="relative z-10 px-6 pt-12">
        {/* Nav Bar */}
        <div className="flex justify-between items-center text-white mb-6">
          <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            <button onClick={logout} className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
              <LogOut size={18} />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm">
              <Heart size={18} />
            </button>
          </div>
        </div>

        {/* Avatar Card */}
        <div className="flex flex-col items-center mt-2">
          <div className="w-28 h-28 rounded-full border-4 border-white overflow-hidden bg-slate-200 shadow-lg">
            <img src="https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&q=80&w=200" alt="Jack Martin" className="w-full h-full object-cover object-top pt-2" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mt-3">Jack Martin</h2>
          <p className="text-slate-400 font-medium text-sm">Professional Painter</p>
        </div>

        {/* Stats */}
        <div className="flex justify-between gap-3 mt-6">
          <div className="bg-orange-50 rounded-2xl flex-1 py-4 flex flex-col items-center justify-center">
            <span className="font-bold text-slate-800 text-lg">1240</span>
            <span className="text-xs text-slate-500 font-medium">Work Done</span>
          </div>
          <div className="bg-orange-50 rounded-2xl flex-1 py-4 flex flex-col items-center justify-center">
            <span className="font-bold text-slate-800 text-lg">4.9</span>
            <span className="text-xs text-slate-500 font-medium">Total Rating</span>
          </div>
          <div className="bg-orange-50 rounded-2xl flex-1 py-4 flex flex-col items-center justify-center">
            <span className="font-bold text-slate-800 text-lg">2hr</span>
            <span className="text-xs text-slate-500 font-medium">Avg. Job</span>
          </div>
        </div>

        {/* About Tasker */}
        <div className="mt-8">
          <h3 className="font-bold text-slate-900 text-lg mb-2">About Tasker</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Our professional painters are dedicated to transforming your spaces with precision, creativity, and care. Whether it's refreshing a single room or giving your entire home a makeover.
          </p>
        </div>

        {/* Past Work Done */}
        <div className="mt-8">
          <div className="flex justify-between items-end mb-4">
            <h3 className="font-bold text-slate-900 text-lg">Past Work Done</h3>
            <button className="text-xs font-medium text-slate-500">View All</button>
          </div>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            <img src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=200" alt="Work 1" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
            <img src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200" alt="Work 2" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
            <img src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&q=80&w=200" alt="Work 3" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
            <img src="https://images.unsplash.com/photo-1520188740392-5eb5781a7a01?auto=format&fit=crop&q=80&w=200" alt="Work 4" className="w-24 h-24 rounded-2xl object-cover shrink-0" />
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-28 left-0 right-0 z-40 px-4 pointer-events-none flex justify-center gap-3">
        <div className="max-w-md w-full mx-auto flex gap-3 px-2 pointer-events-auto">
          <button className="bg-primary-500 text-white font-bold rounded-full py-4 flex-1 shadow-lg shadow-primary-500/30">
            Book Now
          </button>
          <button className="bg-primary-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg shadow-primary-500/30 shrink-0">
            <MessageCircle size={24} className="fill-white" />
          </button>
        </div>
      </div>

    </div>
  );
}
