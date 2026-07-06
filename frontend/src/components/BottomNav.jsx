import React from 'react';
import { Home, Calendar, Sparkles, MapPin, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Calendar, label: 'Bookings' },
    { path: '/scanner', icon: Sparkles, label: 'AI Scanner', highlight: true },
    { path: '/work', icon: MapPin, label: 'Tracking' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 sm:rounded-b-[2.5rem] shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
      <div className="flex justify-around items-center h-[76px] px-2 pb-safe">
        {tabs.map((tab) => {
          const active = location.pathname === tab.path;
          const Icon = tab.icon;
          
          if (tab.highlight) {
            return (
              <button 
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className="flex flex-col items-center justify-center -mt-6 transition-transform hover:scale-105"
              >
                <div className="bg-blue-600 p-4 rounded-full text-white shadow-lg shadow-blue-600/40 border-4 border-white relative">
                  <Icon size={24} strokeWidth={active ? 2.5 : 2} className={active ? "animate-pulse" : ""} />
                </div>
                <span className={`text-[10px] font-bold mt-1 ${active ? 'text-blue-600' : 'text-slate-500'}`}>{tab.label}</span>
              </button>
            )
          }

          return (
            <button 
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 2} className={active ? 'fill-blue-50' : ''} />
              <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  );
}
