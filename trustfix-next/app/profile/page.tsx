"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { User, Star, Shield, Award, MapPin, Calendar, Camera, Wrench } from 'lucide-react';

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20 } }
};

export default function ProfilePage() {
  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      
      {/* Header Profile Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center gap-8 mb-8 relative overflow-hidden group">
        
        {/* Decorative Gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-5 -ml-20 -mb-20 pointer-events-none"></div>
        
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-4xl shadow-xl shrink-0 ring-4 ring-white relative z-10">
            AD
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-2 border-white z-20">
            <Shield size={20} />
          </div>
        </div>

        <div className="text-center md:text-left flex-1 z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Star size={14} className="text-amber-500 fill-amber-500" /> Pro Member
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">Admin User</h1>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4 text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><MapPin size={16} className="text-blue-500" /> New Delhi, IN</span>
            <span className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100"><Calendar size={16} className="text-indigo-500" /> Joined Jan 2026</span>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Trust Score */}
        <motion.div variants={statsVariants} initial="hidden" animate="show" transition={{ delay: 0.1 }} className="md:col-span-1 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-8 shadow-lg flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-inner ring-1 ring-white/30">
            <Award size={40} className="text-white drop-shadow-md" />
          </div>
          <h3 className="text-emerald-100 font-bold uppercase tracking-wider text-sm mb-2">Community Trust Score</h3>
          <span className="text-7xl font-black drop-shadow-lg">98</span>
          <p className="text-sm text-emerald-50 mt-4 font-medium px-4 py-2 bg-black/10 rounded-full backdrop-blur-sm">
            🔥 Top 5% of reporters in your area
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <motion.div variants={statsVariants} initial="hidden" animate="show" transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
             <div className="flex items-start justify-between">
               <div className="bg-blue-50 text-blue-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                 <Camera size={28} />
               </div>
             </div>
             <div className="mt-6">
               <span className="text-4xl font-black text-slate-800">12</span>
               <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1">Issues Reported</h3>
             </div>
          </motion.div>
          
          <motion.div variants={statsVariants} initial="hidden" animate="show" transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow group flex flex-col justify-between">
             <div className="flex items-start justify-between">
               <div className="bg-indigo-50 text-indigo-600 p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                 <Wrench size={28} />
               </div>
             </div>
             <div className="mt-6">
               <span className="text-4xl font-black text-slate-800">4</span>
               <h3 className="text-slate-500 font-bold uppercase tracking-wider text-xs mt-1">Pros Hired</h3>
             </div>
          </motion.div>

          <motion.div variants={statsVariants} initial="hidden" animate="show" transition={{ delay: 0.4 }} className="sm:col-span-2 bg-slate-900 text-white rounded-3xl p-8 shadow-xl flex items-center justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 -mr-20 -mt-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10">
               <h3 className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-2">Total Estimated Savings</h3>
               <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">₹8,500</span>
            </div>
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm relative z-10">
               <Star size={28} className="text-emerald-400" />
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
