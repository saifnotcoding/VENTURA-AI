/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, DollarSign, Users, TrendingUp, AlertTriangle, CheckCircle, BarChart2, Zap } from 'lucide-react';

// --- BUSINESS HEALTH RADAR ---
interface HealthRadarProps {
  scores?: {
    financial: number;
    market: number;
    operations: number;
    competition: number;
  };
  interactive?: boolean;
}

export const BusinessHealthDiagram: React.FC<HealthRadarProps> = ({ 
  scores = { financial: 85, market: 42, operations: 65, competition: 30 },
  interactive = true
}) => {
  const [activeSector, setActiveSector] = useState<number | null>(null);
  
  const sectors = [
    { id: 0, title: "Financial", score: scores.financial, color: "bg-emerald-500", icon: DollarSign, warning: scores.financial < 50 ? "Cash flow critical" : "Healthy margins" },
    { id: 1, title: "Market", score: scores.market, color: "bg-amber-500", icon: Users, warning: scores.market < 50 ? "Low demand detected" : "Strong fit" },
    { id: 2, title: "Operations", score: scores.operations, color: "bg-blue-500", icon: Activity, warning: scores.operations < 50 ? "Inefficiencies found" : "Optimized" },
    { id: 3, title: "Competition", score: scores.competition, color: "bg-red-500", icon: Zap, warning: scores.competition < 50 ? "Market saturated" : "Niche secured" },
  ];

  return (
    <div className={`flex flex-col items-center ${interactive ? 'p-8 bg-white rounded-xl shadow-sm border border-stone-200 my-8' : ''}`}>
      {interactive && (
        <>
          <h3 className="font-serif text-xl mb-4 text-stone-800">Business Health Scan</h3>
          <p className="text-sm text-stone-500 mb-8 text-center max-w-md">
            Click a quadrant to see the AI's risk assessment. Scores below 50 trigger immediate survival warnings.
          </p>
        </>
      )}
      
      <div className="relative w-64 h-64 mb-6">
         {/* Center Grid */}
         <div className="absolute inset-0 grid grid-cols-2 gap-2">
            {sectors.map((sector) => (
                <motion.button
                    key={sector.id}
                    onClick={() => interactive && setActiveSector(sector.id)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all duration-300 ${activeSector === sector.id ? 'border-stone-800 scale-105 shadow-md z-10' : 'border-stone-100 opacity-90 hover:opacity-100 hover:border-stone-300'} ${!interactive && 'cursor-default hover:border-stone-100'}`}
                >
                    <div className={`absolute bottom-0 left-0 right-0 ${sector.color} opacity-20`} style={{ height: `${sector.score}%` }}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2">
                        <sector.icon size={24} className={`mb-2 ${activeSector === sector.id ? 'text-stone-900' : 'text-stone-400'}`} />
                        <span className="text-xs font-bold uppercase tracking-wider text-stone-600">{sector.title}</span>
                        <span className="text-lg font-serif font-bold text-stone-900">{sector.score}</span>
                    </div>
                </motion.button>
            ))}
         </div>
         
         {/* Center Badge */}
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm border border-stone-200 flex items-center justify-center text-xs font-bold text-nobel-gold z-20">
                AI
            </div>
         </div>
      </div>

      <div className="h-16 w-full max-w-xs text-center">
        {activeSector !== null ? (
            <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                key={activeSector}
                className={`p-3 rounded-lg border text-sm ${sectors[activeSector].score < 50 ? 'bg-red-50 border-red-200 text-red-700' : 'bg-stone-50 border-stone-200 text-stone-600'}`}
            >
                <strong>AI Insight:</strong> {sectors[activeSector].warning}
            </motion.div>
        ) : (
             interactive && <div className="text-stone-400 text-sm italic pt-2">Select a sector to analyze...</div>
        )}
      </div>
    </div>
  );
};

// --- AI STRATEGY ENGINE DIAGRAM ---
export const AIStrategyDiagram: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
        setStep(s => (s + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Data Input", icon: BarChart2 },
    { label: "AI Analysis", icon: Activity },
    { label: "Action Plan", icon: CheckCircle }
  ];

  return (
    <div className="flex flex-col items-center p-8 bg-[#F5F4F0] rounded-xl border border-stone-200 my-8">
      <h3 className="font-serif text-xl mb-4 text-stone-900">Optimization Engine</h3>
      <p className="text-sm text-stone-600 mb-6 text-center max-w-md">
        Ventura AI ingests your business data, identifies inefficiencies, and generates a concrete execution plan.
      </p>

      <div className="relative w-full max-w-lg h-48 bg-white rounded-lg shadow-inner overflow-hidden mb-6 border border-stone-200 flex items-center justify-center gap-4 p-4">
        
        {/* Step 1: Data */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${step === 0 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center ${step === 0 ? 'border-stone-800 bg-stone-100' : 'border-stone-200'}`}>
                <BarChart2 className="text-stone-600" />
            </div>
            <span className="text-[10px] uppercase font-bold text-stone-500">Metrics</span>
        </div>

        {/* Arrow 1 */}
        <motion.div animate={{ opacity: step >= 1 ? 1 : 0.2, x: step >= 1 ? 0 : -5 }}>→</motion.div>

        {/* Step 2: Processing */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${step === 1 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
             <div className={`w-20 h-20 rounded-xl border-2 flex items-center justify-center relative overflow-hidden ${step === 1 ? 'border-nobel-gold bg-stone-900' : 'border-stone-200 bg-white'}`}>
                <Activity size={28} className={step === 1 ? 'text-nobel-gold animate-pulse' : 'text-stone-300'} />
                {step === 1 && (
                    <div className="absolute inset-0 bg-nobel-gold/10 animate-pulse"></div>
                )}
             </div>
             <span className="text-[10px] uppercase font-bold text-stone-500">Processing</span>
        </div>

        {/* Arrow 2 */}
        <motion.div animate={{ opacity: step >= 2 ? 1 : 0.2, x: step >= 2 ? 0 : -5 }}>→</motion.div>

        {/* Step 3: Output */}
        <div className={`flex flex-col items-center gap-2 transition-opacity duration-500 ${step === 2 ? 'opacity-100 scale-110' : 'opacity-40'}`}>
            <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center ${step === 2 ? 'border-green-500 bg-green-50' : 'border-stone-200'}`}>
                <CheckCircle className={step === 2 ? 'text-green-600' : 'text-stone-300'} />
            </div>
            <span className="text-[10px] uppercase font-bold text-stone-500">Plan</span>
        </div>

      </div>

      <div className="flex gap-2">
          {[0, 1, 2].map(s => (
              <div key={s} className={`h-1 rounded-full transition-all duration-300 ${step === s ? 'w-12 bg-nobel-gold' : 'w-2 bg-stone-300'}`}></div>
          ))}
      </div>
      <div className="mt-4 text-xs font-mono text-stone-500">
          {step === 0 && "Ingesting revenue, expense, and market data..."}
          {step === 1 && "Simulating 1,000 growth scenarios..."}
          {step === 2 && "Generating optimal pricing and marketing tasks."}
      </div>
    </div>
  );
};

// --- SURVIVAL CHART ---
interface SurvivalChartProps {
  predictionData?: {
    days15: number;
    days30: number;
    days60: number;
  };
  showToggle?: boolean;
}

export const SurvivalChartDiagram: React.FC<SurvivalChartProps> = ({ 
  predictionData,
  showToggle = true
}) => {
    const [view, setView] = useState<'traditional' | 'ai'>('ai');
    
    // Survival Probabilities over 15, 30, 60 days
    // If predictionData is provided, use it for the 'ai' view.
    const defaultData = {
        traditional: [90, 72, 45], // Drops fast
        ai: predictionData ? [predictionData.days15, predictionData.days30, predictionData.days60] : [95, 92, 88]
    };

    const currentData = defaultData[view];
    const isRisk = currentData[2] < 50;

    return (
        <div className={`flex flex-col md:flex-row gap-8 items-center rounded-xl my-8 ${showToggle ? 'p-8 bg-stone-900 text-stone-100 border border-stone-800 shadow-lg' : 'w-full'}`}>
            <div className="flex-1 min-w-[240px]">
                <h3 className={`font-serif text-xl mb-2 ${showToggle ? 'text-nobel-gold' : 'text-stone-900'}`}>Survival Probability</h3>
                <p className={`text-sm mb-4 leading-relaxed ${showToggle ? 'text-stone-400' : 'text-stone-600'}`}>
                    {showToggle 
                      ? "Startups without guidance face a steep decline in survival probability within the first 60 days. Ventura AI identifies risks early to flatten the curve."
                      : "Your projected business survival rate based on current metrics and market conditions."}
                </p>
                {showToggle && (
                    <div className="flex gap-2 mt-6">
                        <button 
                            onClick={() => setView('traditional')} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${view === 'traditional' ? 'bg-stone-700 text-white border-stone-600' : 'bg-transparent text-stone-500 border-stone-800 hover:text-stone-300'}`}
                        >
                            Without Guidance
                        </button>
                        <button 
                            onClick={() => setView('ai')} 
                            className={`px-3 py-1.5 rounded text-sm font-medium transition-all duration-200 border ${view === 'ai' ? 'bg-nobel-gold text-stone-900 border-nobel-gold' : 'bg-transparent text-stone-500 border-stone-800 hover:text-stone-300'}`}
                        >
                            With Ventura AI
                        </button>
                    </div>
                )}
                <div className="mt-6 font-mono text-xs flex items-center gap-2">
                    {isRisk ? (
                        <>
                           <AlertTriangle size={14} className="text-red-500" /> 
                           <span className={showToggle ? 'text-red-400' : 'text-red-600'}>HIGH FAILURE RISK DETECTED</span>
                        </>
                    ) : (
                        <>
                           <CheckCircle size={14} className="text-green-500" /> 
                           <span className={showToggle ? 'text-green-400' : 'text-green-600'}>OPTIMIZED SURVIVAL PATH</span>
                        </>
                    )}
                </div>
            </div>
            
            <div className={`relative w-full max-w-xs h-64 rounded-xl border p-6 flex justify-between items-end ${showToggle ? 'bg-stone-800/50 border-stone-700/50' : 'bg-white border-stone-200'}`}>
                {/* Grid */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between pointer-events-none opacity-10">
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                   <div className="w-full h-[1px] bg-stone-400"></div>
                </div>

                {/* Bars */}
                {[0, 1, 2].map((idx) => (
                    <div key={idx} className="w-14 flex flex-col justify-end items-center h-full z-10">
                        <div className="flex-1 w-full flex items-end justify-center relative mb-3">
                            <motion.div 
                                className={`absolute -top-6 w-full text-center text-xs font-mono font-bold py-1 rounded ${showToggle ? 'text-stone-300 bg-stone-900' : 'text-stone-600 bg-stone-100'}`}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                {currentData[idx]}%
                            </motion.div>
                            <motion.div 
                                className={`w-full rounded-t-sm ${view === 'ai' ? 'bg-nobel-gold shadow-[0_0_15px_rgba(197,160,89,0.2)]' : 'bg-stone-600'}`}
                                initial={{ height: 0 }}
                                animate={{ height: `${currentData[idx]}%` }}
                                transition={{ type: "spring", stiffness: 60, damping: 15 }}
                            />
                        </div>
                        <div className={`h-4 text-[10px] font-bold uppercase ${showToggle ? 'text-stone-500' : 'text-stone-400'}`}>
                            Day {[15, 30, 60][idx]}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}