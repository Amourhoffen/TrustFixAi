"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, Camera, MessageCircle, BookOpen, User, Wrench, Menu, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { name: 'Community Feed', href: '/', icon: Home },
    { name: 'AI Scanner', href: '/scan', icon: Camera },
    { name: 'TrustFix AI Chat', href: '/chat', icon: MessageCircle },
    { name: 'Knowledge Hub', href: '/knowledge', icon: BookOpen },
    { name: 'My Profile', href: '/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans selection:bg-blue-200">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-lg tracking-tight text-slate-800">TrustFix<span className="text-blue-600">AI</span></span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-300 ease-in-out z-50 w-64 bg-white border-r border-slate-200 shadow-sm flex flex-col h-full`}>
        
        {/* Desktop Branding */}
        <div className="hidden md:flex items-center gap-2 h-16 px-6 border-b border-slate-100 shrink-0">
          <div className="bg-blue-600 p-2 rounded-xl shadow-inner">
            <Wrench className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-xl tracking-tight text-slate-800">TrustFix<span className="text-blue-600">AI</span></span>
        </div>

        {/* Location / Status */}
        <div className="px-6 py-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-lg text-xs font-medium text-slate-500 border border-slate-100">
            <MapPin size={14} className="text-blue-500" />
            <span>Detecting Location...</span>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            
            return (
              <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 relative group ${
                  isActive ? 'text-blue-700 bg-blue-50 font-bold' : 'text-slate-600 hover:bg-slate-50 font-medium'
                }`}>
                  <Icon size={18} className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500 transition-colors'} />
                  <span>{link.name}</span>
                  {isActive && (
                    <motion.div layoutId="activeNav" className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full" />
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* Footer / Account */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              AD
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800">Admin User</span>
              <span className="text-xs text-slate-500 font-medium">Pro Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto w-full">
          {children}
        </div>
      </main>

    </div>
  );
}
