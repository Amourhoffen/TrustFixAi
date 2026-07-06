"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Sparkles, MapPin, AlertTriangle, CheckCircle, Clock, TrendingUp, Users, Wrench } from 'lucide-react';

const feedItems = [
  { id: 1, title: 'Severe Pothole in Sector 4', status: 'Reported', time: '2 hours ago', severity: 'High', image: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=400' },
  { id: 2, title: 'Transformer Sparking on Main St.', status: 'Fixed', time: '5 hours ago', severity: 'Critical', image: 'https://images.unsplash.com/photo-1473260022066-50e5015b3c5e?auto=format&fit=crop&q=80&w=400' },
  { id: 3, title: 'Water Leak at Central Park', status: 'In Progress', time: '1 day ago', severity: 'Medium', image: 'https://images.unsplash.com/photo-1541888078601-325d74268155?auto=format&fit=crop&q=80&w=400' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

export default function HomeFeed() {
  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      
      {/* Header */}
      <section className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-bold mb-4 border border-blue-100 shadow-sm">
            <Sparkles size={16} className="text-blue-500" /> Welcome back, Admin!
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Intelligence</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-slate-500 mt-2 font-medium max-w-xl">
            Monitor real-time infrastructure issues and local professional deployments in your area.
          </motion.p>
        </div>
        
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 shrink-0">
          <div className="bg-emerald-100 p-3 rounded-xl">
            <TrendingUp className="text-emerald-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">City Health Score</p>
            <p className="text-2xl font-black text-slate-800">92/100</p>
          </div>
        </motion.div>
      </section>

      {/* Stats Grid */}
      <motion.section variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        <motion.div variants={itemVariants} className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h4 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Total Reports</h4>
            <AlertTriangle size={20} className="text-slate-400" />
          </div>
          <span className="text-5xl font-black text-slate-800 relative z-10">1,204</span>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-emerald-600 relative z-10">
            <TrendingUp size={16} /> +12% from last month
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="group relative overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-3xl border border-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-white">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl opacity-10 -mr-10 -mt-10"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h4 className="text-blue-200 font-bold text-sm uppercase tracking-wider">Active Pros</h4>
            <Users size={20} className="text-blue-300" />
          </div>
          <span className="text-5xl font-black relative z-10">342</span>
          <div className="mt-4 flex items-center gap-2 text-sm font-bold text-blue-200 relative z-10">
            <CheckCircle size={16} /> 100% verified workers
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="group relative overflow-hidden bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500 rounded-full blur-3xl opacity-10 -mr-10 -mt-10 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h4 className="text-slate-500 font-bold text-sm uppercase tracking-wider">Issues Fixed</h4>
            <Wrench size={20} className="text-slate-400" />
          </div>
          <span className="text-5xl font-black text-emerald-600 relative z-10">89%</span>
          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-500 relative z-10">
            Resolution rate across city
          </div>
        </motion.div>

      </motion.section>

      {/* Community Feed */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2">
            <MapPin className="text-blue-600 w-6 h-6" /> Live Feed
          </h3>
          <button className="text-sm font-bold text-blue-600 hover:text-blue-700">View Map</button>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {feedItems.map((item, index) => (
            <motion.div 
              key={item.id} 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
              className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col md:flex-row"
            >
              <div className="w-full md:w-48 h-48 md:h-auto relative overflow-hidden shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden"></div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center relative">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h4 className="font-black text-slate-800 text-xl md:text-2xl">{item.title}</h4>
                  <span className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    item.status === 'Fixed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                    item.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'bg-slate-100 text-slate-600 border border-slate-200'
                  }`}>
                    {item.status === 'Fixed' ? <CheckCircle size={14} /> : <AlertTriangle size={14} />}
                    {item.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock size={16} /> {item.time}</span>
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    item.severity === 'Critical' ? 'bg-red-100 text-red-700' : 
                    item.severity === 'High' ? 'bg-orange-100 text-orange-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
