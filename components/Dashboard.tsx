/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { 
    LayoutDashboard, Target, MessageSquare, TrendingUp, AlertTriangle, 
    CheckCircle, Wallet, BrainCircuit, ChevronRight, Play, Send, User, Sparkles, Check, Globe,
    Plus, Clock, ArrowUp, PanelLeft, Share, ShieldAlert, Trash2, Search, BarChart3, Coins, Rocket,
    ChevronLeft, ChevronDown, Info, Activity, DollarSign, LogOut, ArrowRight, RefreshCw, WifiOff
} from 'lucide-react';
import { BusinessHealthDiagram, SurvivalChartDiagram } from './Diagrams';

// --- Configuration ---
const OPENROUTER_API_KEY = "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";
const AI_MODEL = "mistralai/mistral-7b-instruct:free";

// --- Types ---
interface DashboardProps {
    userData: Record<string, string>;
    userType: 'idea' | 'running';
    onLogout: () => void;
}

interface AIAnalysisResult {
    healthScore: number;
    financialRisk: number;
    demandRisk: number;
    marketRisk: number;
    efficiencyRisk: number;
    financialMetrics: {
        burnRate: string;
        quickRatio: string;
        debtToEquity: string;
    };
    survivalProbabilities: { days15: number; days30: number; days60: number };
    warnings: string[];
    improvements: string[];
    pricingStrategy: string;
    marketingStrategy: string[];
    dailyTasks: string[];
    marketAnalysis: {
        marketSize: string;
        growthTrends: Array<{ trend: string; insight: string }>;
        keyCompetitors: Array<{ 
            name: string; 
            swot: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] } 
        }>;
    };
    businessIdeas?: Array<{ name: string; investment: string; profit: string }>;
}

const DEFAULT_AI_DATA: AIAnalysisResult = {
    healthScore: 50,
    financialRisk: 50,
    demandRisk: 50,
    marketRisk: 50,
    efficiencyRisk: 50,
    financialMetrics: { burnRate: "--", quickRatio: "--", debtToEquity: "--" },
    survivalProbabilities: { days15: 50, days30: 50, days60: 50 },
    warnings: ["System requires analysis refresh."],
    improvements: ["Click 'Retry Analysis' to generate data."],
    pricingStrategy: "Pending Analysis...",
    marketingStrategy: [],
    dailyTasks: [],
    marketAnalysis: {
        marketSize: "--",
        growthTrends: [],
        keyCompetitors: []
    },
    businessIdeas: []
};

// --- Fallback Data Generator (The Safety Net) ---
const generateFallbackData = (data: Record<string, string>, type: 'idea' | 'running'): AIAnalysisResult => {
    const revenue = parseFloat(data.revenue || "0");
    const expenses = parseFloat(data.expenses || "0");
    const capital = parseFloat(data.capital || "0");
    const industry = data.industry || data.industryInterest || "General Business";
    
    // Heuristic Calculations
    let health = 70;
    let finRisk = 30;
    
    if (type === 'running') {
        const isProfitable = revenue > expenses;
        health = isProfitable ? 82 : 45;
        finRisk = isProfitable ? 20 : 85;
    } else {
        health = capital > 5000 ? 75 : 60;
        finRisk = capital > 5000 ? 30 : 60;
    }

    return {
        healthScore: health,
        financialRisk: finRisk,
        demandRisk: 40,
        marketRisk: 45,
        efficiencyRisk: 35,
        financialMetrics: {
            burnRate: type === 'running' ? `$${Math.abs(revenue - expenses).toLocaleString()}/mo` : `$2,500/mo (Est.)`,
            quickRatio: type === 'running' ? (revenue > 0 ? (revenue / (expenses || 1)).toFixed(2) : "0.5") : "1.2",
            debtToEquity: "0.4"
        },
        survivalProbabilities: { 
            days15: Math.min(95, health + 10), 
            days30: Math.min(90, health), 
            days60: Math.min(80, health - 10) 
        },
        warnings: type === 'running' && expenses > revenue 
            ? ["Expenses exceed revenue (Immediate Action Required)", "Cash runway critically short"]
            : ["Market saturation increasing in " + industry, "Customer acquisition costs rising"],
        improvements: [
            "Optimize pricing model to increase margins by 15%",
            "Implement automated email retargeting for leads",
            "Reduce operational overhead in supply chain"
        ],
        pricingStrategy: "Adopt a value-based pricing tier. Your current segment allows for a 10-15% premium if bundled with high-touch service.",
        marketingStrategy: [
            "LinkedIn thought leadership for B2B trust",
            "SEO focusing on 'high intent' keywords",
            "Strategic partnerships with complementary vendors"
        ],
        dailyTasks: [
            "Review weekly cash flow statement",
            "Contact 5 potential high-value leads",
            "Analyze competitor pricing changes"
        ],
        marketAnalysis: {
            marketSize: "Growing at 8.5% CAGR",
            growthTrends: [
                { trend: "Digital Transformation", insight: "Shift towards automated service delivery." },
                { trend: "Sustainability", insight: "Customers paying premium for eco-friendly options." }
            ],
            keyCompetitors: [
                { 
                    name: "Market Leader Inc.", 
                    swot: { 
                        strengths: ["Brand Recognition", "Capital"], 
                        weaknesses: ["Slow Support", "Legacy Tech"], 
                        opportunities: ["Niche Targeting", "Better UI"], 
                        threats: ["Price War"] 
                    } 
                }
            ]
        },
        businessIdeas: [
            { name: "Subscription Model", investment: "$5,000", profit: "$8,000/mo" },
            { name: "Consulting Service", investment: "$1,000", profit: "$12,000/mo" },
            { name: "Digital Product", investment: "$2,500", profit: "$5,000/mo" }
        ]
    };
};

// --- Helper Components ---

const ChatMessageContent = ({ text, isAnimated }: { text: string, isAnimated: boolean }) => {
    const [displayedText, setDisplayedText] = useState(isAnimated ? "" : text);

    useEffect(() => {
        if (isAnimated) {
            let i = 0;
            const interval = setInterval(() => {
                setDisplayedText(text.slice(0, i + 1));
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                }
            }, 8);
            return () => clearInterval(interval);
        }
    }, [text, isAnimated]);

    const lines = displayedText.split('\n');

    return (
        <div className="space-y-3 font-sans text-[15px] leading-7 text-stone-800">
            {lines.map((line, i) => {
                if (!line.trim()) return <div key={i} className="h-2" />;
                const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ') || line.trim().match(/^\d+\./);
                const content = isBullet ? line.replace(/^[-•]|\d+\.\s*/, '').trim() : line;
                const parts = content.split(/(\*\*.*?\*\*)/g);
                return (
                    <div key={i} className={`${isBullet ? 'flex gap-3 ml-1' : ''}`}>
                        {isBullet && (
                            <span className="text-stone-900 mt-2.5 w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                        )}
                        <p className={`leading-relaxed ${isBullet ? 'flex-1' : ''}`}>
                            {parts.map((part, j) => {
                                if (part.startsWith('**') && part.endsWith('**')) {
                                    return <strong key={j} className="font-semibold text-stone-900">{part.slice(2, -2)}</strong>;
                                }
                                return <span key={j}>{part}</span>;
                            })}
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

const WarningCarousel = ({ warnings }: { warnings: string[] }) => {
    const [index, setIndex] = useState(0);
    const safeWarnings = warnings && warnings.length > 0 ? warnings : ["No critical alerts detected."];

    const next = () => setIndex((prev) => (prev + 1) % safeWarnings.length);
    const prev = () => setIndex((prev) => (prev - 1 + safeWarnings.length) % safeWarnings.length);

    return (
        <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm md:col-span-2 hover:shadow-md transition-all flex flex-col justify-between min-h-[160px]">
            <div className="flex justify-between items-center mb-2">
                <div className="text-stone-500 text-xs font-bold uppercase tracking-widest">Critical Alerts ({index + 1}/{safeWarnings.length})</div>
                <div className="flex gap-2">
                    <button onClick={prev} className="p-1 hover:bg-stone-100 rounded-full transition-colors"><ChevronLeft size={16} /></button>
                    <button onClick={next} className="p-1 hover:bg-stone-100 rounded-full transition-colors"><ChevronRight size={16} /></button>
                </div>
            </div>
            
            <AnimatePresence mode="wait">
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-4 text-amber-600 font-medium flex-1"
                >
                    <div className="p-3 bg-amber-50 rounded-full shrink-0 mt-1"><AlertTriangle size={24} /></div>
                    <span className="text-lg leading-snug">{safeWarnings[index]}</span>
                </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-1 mt-4">
                {safeWarnings.map((_, i) => (
                    <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-6 bg-amber-500' : 'w-1.5 bg-stone-200'}`} />
                ))}
            </div>
        </div>
    );
};

const CompetitorSwotCard = ({ competitor }: { competitor: { name: string, swot: any } }) => {
    const [isOpen, setIsOpen] = useState(false);
    const safeSwot = competitor?.swot || { strengths: [], weaknesses: [], opportunities: [], threats: [] };

    return (
        <motion.div 
            layout
            className={`bg-stone-800/50 rounded-lg overflow-hidden border border-white/10 ${isOpen ? 'bg-stone-800' : 'hover:bg-stone-800/80'} transition-colors cursor-pointer`}
        >
            <div onClick={() => setIsOpen(!isOpen)} className="p-4 flex items-center justify-between">
                <span className="font-serif text-lg text-white">{competitor.name}</span>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                    <ChevronDown className="text-stone-400" size={20} />
                </motion.div>
            </div>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 border-t border-white/10"
                    >
                        <div className="grid grid-cols-2 gap-4 pt-4 text-sm">
                            <div>
                                <div className="text-emerald-400 text-xs font-bold uppercase mb-1">Strengths</div>
                                <ul className="list-disc list-inside text-stone-300 space-y-1">{safeSwot.strengths?.slice(0,2).map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                            </div>
                            <div>
                                <div className="text-red-400 text-xs font-bold uppercase mb-1">Weaknesses</div>
                                <ul className="list-disc list-inside text-stone-300 space-y-1">{safeSwot.weaknesses?.slice(0,2).map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                            </div>
                            <div>
                                <div className="text-blue-400 text-xs font-bold uppercase mb-1">Opportunities</div>
                                <ul className="list-disc list-inside text-stone-300 space-y-1">{safeSwot.opportunities?.slice(0,2).map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                            </div>
                            <div>
                                <div className="text-amber-400 text-xs font-bold uppercase mb-1">Threats</div>
                                <ul className="list-disc list-inside text-stone-300 space-y-1">{safeSwot.threats?.slice(0,2).map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const InteractiveTrend = ({ trend, insight }: { trend: string, insight: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            onClick={() => setIsOpen(!isOpen)} 
            className="group cursor-pointer p-3 bg-white/5 rounded-lg border border-white/5 hover:border-nobel-gold/50 transition-all"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-stone-200">
                    <span className="text-nobel-gold">•</span> 
                    <span className="font-medium">{trend}</span>
                </div>
                <Info size={14} className={`text-stone-500 transition-colors ${isOpen ? 'text-nobel-gold' : 'group-hover:text-stone-300'}`} />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="mt-2 text-sm text-stone-400 pl-4 border-l border-stone-600 italic">
                            {insight}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// --- OpenRouter Helper ---
const callOpenRouter = async (messages: any[], temperature: number = 0.7) => {
    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://ventura.ai",
                "X-Title": "Ventura AI",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "model": AI_MODEL,
                "messages": messages,
                "temperature": temperature,
                "top_p": 0.9,
                "max_tokens": 1024 // Reduced max tokens for stability
            })
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "";
    } catch (error) {
        console.warn("OpenRouter API call failed (using fallback):", error);
        throw error;
    }
};

// --- MAIN DASHBOARD COMPONENT ---
export const Dashboard: React.FC<DashboardProps> = ({ userData, userType, onLogout }) => {
    const [view, setView] = useState<'overview' | 'strategy' | 'mentor'>('overview');
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);
    const [statusText, setStatusText] = useState("Initializing AI Core...");
    const [aiData, setAiData] = useState<AIAnalysisResult | null>(null);
    const [chatHistory, setChatHistory] = useState<{role: 'user' | 'model', text: string}[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [chatLoading, setChatLoading] = useState(false);
    
    const scrollRef = useRef<HTMLDivElement>(null);

    const generateAnalysis = async () => {
        setLoading(true);
        setUsingFallback(false);
        
        try {
            setStatusText("Aggregating Financial & Market Vectors...");
            
            // Simplified prompt structure for Mistral
            const prompt = [
                {
                    role: "system",
                    content: "You are a JSON generator. Output valid JSON only. No markdown. No intro."
                },
                {
                    role: "user",
                    content: `Generate a business analysis JSON for a ${userType === 'running' ? 'Running Business' : 'Startup Idea'}.
                    
                    Data: ${JSON.stringify(userData)}

                    Required JSON Structure:
                    {
                        "healthScore": 75,
                        "financialRisk": 30,
                        "warnings": ["warning1", "warning2"],
                        "improvements": ["imp1", "imp2"],
                        "pricingStrategy": "strategy text",
                        "marketingStrategy": ["strategy1", "strategy2"],
                        "dailyTasks": ["task1", "task2"],
                        "marketAnalysis": {
                            "marketSize": "size",
                            "growthTrends": [{"trend": "t1", "insight": "i1"}],
                            "keyCompetitors": [{"name": "c1", "swot": {"strengths": ["s1"], "weaknesses": ["w1"], "opportunities": ["o1"], "threats": ["t1"]}}]
                        },
                        "financialMetrics": { "burnRate": "val", "quickRatio": "val", "debtToEquity": "val" },
                        "survivalProbabilities": { "days15": 90, "days30": 80, "days60": 70 },
                        "businessIdeas": [{"name": "n1", "investment": "v1", "profit": "p1"}]
                    }`
                }
            ];

            const responseText = await callOpenRouter(prompt, 0.3);
            
            // Extract JSON from response (finding first { and last })
            const firstBrace = responseText.indexOf('{');
            const lastBrace = responseText.lastIndexOf('}');
            
            if (firstBrace !== -1 && lastBrace !== -1) {
                const cleanJson = responseText.substring(firstBrace, lastBrace + 1);
                const parsedData = JSON.parse(cleanJson);
                
                // Merge with default to ensure no missing keys
                setAiData({
                    ...DEFAULT_AI_DATA,
                    ...parsedData,
                    marketAnalysis: { ...DEFAULT_AI_DATA.marketAnalysis, ...parsedData.marketAnalysis }
                });
            } else {
                throw new Error("Invalid JSON format");
            }

        } catch (error) {
            console.warn("Generating fallback analysis due to error:", error);
            // FAIL-SAFE: Generate local data if API fails
            const fallback = generateFallbackData(userData, userType);
            setAiData(fallback);
            setUsingFallback(true);
        } finally {
            setLoading(false);
        }
    };

    // Initial Analysis Effect
    useEffect(() => {
        generateAnalysis();
    }, []);

    // Scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, chatLoading]);

    // Handle Mentor Chat
    const handleChatSend = async () => {
        if (!chatInput.trim()) return;
        
        const userMessage = chatInput;
        setChatInput("");
        setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
        setChatLoading(true);

        try {
            const messages = [
                { 
                    role: "system", 
                    content: "You are Ventura AI, a business mentor. Keep answers short and practical." 
                },
                ...chatHistory.slice(-4).map(msg => ({ role: msg.role === 'model' ? 'assistant' : 'user', content: msg.text })),
                { role: "user", content: userMessage }
            ];

            const responseText = await callOpenRouter(messages, 0.7);
            
            if (responseText) {
                setChatHistory(prev => [...prev, { role: 'model', text: responseText }]);
            }
        } catch (e) {
            // Chat Fallback
            setChatHistory(prev => [...prev, { role: 'model', text: "I'm currently operating in offline mode. Based on your profile, I recommend focusing on cash flow stability and customer retention while I reconnect to the main servers." }]);
        } finally {
            setChatLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-900 flex flex-col items-center justify-center text-white">
                <div className="relative w-24 h-24 mb-8">
                     <div className="absolute inset-0 border-4 border-stone-800 rounded-full"></div>
                     <div className="absolute inset-0 border-4 border-nobel-gold border-t-transparent rounded-full animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="text-nobel-gold animate-pulse" />
                     </div>
                </div>
                <h2 className="font-serif text-3xl mb-3 animate-pulse">Ventura AI</h2>
                <p className="text-stone-500 font-mono text-sm uppercase tracking-widest">{statusText}</p>
            </div>
        );
    }

    if (!aiData) return null; // Should never happen due to fallback

    const tabVariants = {
        hidden: { opacity: 0, x: 20 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
    };

    return (
        <div className="h-screen bg-[#F9F8F4] flex overflow-hidden selection:bg-stone-200 selection:text-stone-900">
            {/* SIDEBAR */}
            <aside className="w-64 bg-stone-900 text-stone-300 flex-col hidden md:flex h-full z-20 shadow-2xl shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3 text-white font-serif text-xl font-bold">
                        <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-stone-900 text-sm shadow-glow">V</div>
                        Ventura AI
                    </div>
                </div>
                
                <nav className="flex-1 px-4 space-y-2 mt-8">
                    <button onClick={() => setView('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${view === 'overview' ? 'bg-stone-800 text-white shadow-md translate-x-1' : 'hover:bg-stone-800/50 hover:text-white'}`}>
                        <LayoutDashboard size={18} /> Overview
                    </button>
                    <button onClick={() => setView('strategy')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${view === 'strategy' ? 'bg-stone-800 text-white shadow-md translate-x-1' : 'hover:bg-stone-800/50 hover:text-white'}`}>
                        <Target size={18} /> Strategy
                    </button>
                    <button onClick={() => setView('mentor')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${view === 'mentor' ? 'bg-stone-800 text-white shadow-md translate-x-1' : 'hover:bg-stone-800/50 hover:text-white'}`}>
                        <MessageSquare size={18} /> Mentor Chat
                    </button>
                </nav>

                <div className="p-6 border-t border-stone-800">
                    <button 
                        onClick={onLogout} 
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-white transition-all duration-300 text-sm font-medium text-stone-400 group shadow-lg"
                    >
                        <LogOut size={16} className="group-hover:-translate-x-1 transition-transform" /> 
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className={`flex-1 font-sans transition-all duration-300 flex flex-col h-full relative ${view === 'mentor' ? 'bg-white' : 'bg-[#F9F8F4]'}`}>
                
                {view !== 'mentor' && (
                    <header className="flex justify-between items-center p-6 md:p-8 shrink-0">
                        <div className="max-w-6xl w-full mx-auto flex justify-between items-center">
                            <div>
                                <h1 className="font-serif text-3xl text-stone-900 mb-1">
                                    {view === 'overview' && "Command Center"}
                                    {view === 'strategy' && "Strategic Blueprint"}
                                </h1>
                                <p className="text-stone-500 text-sm flex items-center gap-2">
                                    {usingFallback ? (
                                        <span className="flex items-center gap-1 text-amber-600"><WifiOff size={12} /> Local Analysis Mode</span>
                                    ) : (
                                        view === 'overview' ? "Real-time business intelligence active." : "AI-Generated Optimization Protocols."
                                    )}
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className={`px-4 py-2 bg-white border border-stone-200 rounded-full shadow-sm text-sm font-medium ${usingFallback ? 'text-amber-600' : 'text-stone-600'} flex items-center gap-2`}>
                                    <div className={`w-2 h-2 rounded-full ${usingFallback ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`}></div> 
                                    <span className="text-xs font-bold tracking-wider uppercase">{usingFallback ? 'Offline Mode' : 'System Online'}</span>
                                </div>
                            </div>
                        </div>
                    </header>
                )}

                {/* SCROLLABLE AREA FOR OVERVIEW & STRATEGY */}
                {view !== 'mentor' && (
                    <div className="flex-1 overflow-y-auto p-6 md:p-8 pt-0">
                        <div className="max-w-6xl mx-auto w-full">
                            <AnimatePresence mode="wait">
                                {/* OVERVIEW VIEW */}
                                {view === 'overview' && (
                                    <motion.div 
                                        key="overview"
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="space-y-8 pb-10"
                                    >
                                        {/* Top Stats Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
                                                <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Health Score</div>
                                                <div className="text-5xl font-serif text-stone-900">{aiData.healthScore}<span className="text-lg text-stone-400 font-sans font-light">/100</span></div>
                                            </div>
                                            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all">
                                                <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-2">Failure Risk (30d)</div>
                                                <div className={`text-5xl font-serif ${aiData.survivalProbabilities.days30 < 50 ? 'text-red-600' : 'text-stone-900'}`}>
                                                    {100 - aiData.survivalProbabilities.days30}%
                                                </div>
                                            </div>
                                            {/* Dynamic Carousel Alert */}
                                            <WarningCarousel warnings={aiData.warnings} />
                                        </div>

                                        {/* Financial Vitals Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                                                <div>
                                                    <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">Est. Burn Rate</div>
                                                    <div className="text-xl font-serif font-bold text-stone-900">{aiData.financialMetrics.burnRate}</div>
                                                </div>
                                                <Activity className="text-rose-400" size={24} />
                                            </div>
                                            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                                                <div>
                                                    <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">Quick Ratio</div>
                                                    <div className="text-xl font-serif font-bold text-stone-900">{aiData.financialMetrics.quickRatio}</div>
                                                </div>
                                                <Coins className="text-emerald-400" size={24} />
                                            </div>
                                            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-sm flex items-center justify-between">
                                                <div>
                                                    <div className="text-stone-500 text-xs font-bold uppercase tracking-widest mb-1">Debt-to-Equity</div>
                                                    <div className="text-xl font-serif font-bold text-stone-900">{aiData.financialMetrics.debtToEquity}</div>
                                                </div>
                                                <DollarSign className="text-blue-400" size={24} />
                                            </div>
                                        </div>

                                        {/* Expanded Market Intelligence Card */}
                                        <div className="bg-stone-900 text-white p-8 rounded-xl shadow-lg relative overflow-hidden">
                                            <div className="absolute top-0 right-0 p-6 opacity-5">
                                                <Globe size={120} />
                                            </div>
                                            <div className="relative z-10">
                                                <h3 className="font-serif text-2xl mb-6 text-nobel-gold flex items-center gap-3">
                                                    <Globe size={24} /> Market Intelligence
                                                </h3>
                                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                                    <div className="lg:col-span-1">
                                                        <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Market Size</div>
                                                        <div className="text-2xl font-serif mb-6">{aiData.marketAnalysis.marketSize}</div>
                                                        
                                                        <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-2">Key Market Trends</div>
                                                        <div className="space-y-3">
                                                            {aiData.marketAnalysis.growthTrends.slice(0, 3).map((trendItem, i) => (
                                                                <InteractiveTrend key={i} trend={trendItem.trend} insight={trendItem.insight} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="lg:col-span-2">
                                                        <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-4">Competitor Landscape (SWOT Analysis)</div>
                                                        <div className="space-y-3">
                                                            {aiData.marketAnalysis.keyCompetitors.map((comp, i) => (
                                                                <CompetitorSwotCard key={i} competitor={comp} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                            <BusinessHealthDiagram 
                                                interactive={false}
                                                scores={{
                                                    financial: 100 - aiData.financialRisk,
                                                    market: 100 - aiData.marketRisk,
                                                    operations: 100 - aiData.efficiencyRisk,
                                                    competition: 50
                                                }}
                                            />
                                            <SurvivalChartDiagram predictionData={aiData.survivalProbabilities} showToggle={false} />
                                        </div>

                                        {/* Task List */}
                                        <div className="bg-white p-8 rounded-xl border border-stone-200 shadow-sm">
                                            <div className="flex items-center gap-3 mb-6">
                                                <CheckCircle className="text-nobel-gold" />
                                                <h3 className="font-serif text-xl text-stone-900">Priority Actions for Today</h3>
                                            </div>
                                            <div className="space-y-4">
                                                {aiData.dailyTasks.map((task, idx) => (
                                                    <div key={idx} className="flex items-center gap-4 p-4 bg-stone-50 rounded-lg border border-stone-100 hover:border-nobel-gold/30 hover:bg-white transition-all group cursor-pointer">
                                                        <div className="w-6 h-6 rounded-full border-2 border-stone-300 group-hover:border-nobel-gold group-hover:bg-nobel-gold transition-colors flex items-center justify-center">
                                                            <Check size={14} className="text-white opacity-0 group-hover:opacity-100" />
                                                        </div>
                                                        <span className="text-stone-700 font-medium group-hover:text-stone-900">{task}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        {/* Business Ideas Section for Idea Users */}
                                        {userType === 'idea' && aiData.businessIdeas && (
                                            <div className="space-y-4">
                                                <h3 className="font-serif text-2xl text-stone-900">Generated Business Models</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    {aiData.businessIdeas.map((idea, i) => (
                                                        <div key={i} className="bg-stone-900 text-stone-100 p-6 rounded-xl shadow-lg relative overflow-hidden group">
                                                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                                                <Target size={64} />
                                                            </div>
                                                            <div className="w-10 h-10 bg-nobel-gold rounded-full flex items-center justify-center text-stone-900 font-bold mb-4 shadow-lg">{i+1}</div>
                                                            <h4 className="font-serif text-xl mb-4">{idea.name}</h4>
                                                            <div className="text-sm text-stone-400 space-y-2">
                                                                <p className="flex justify-between border-b border-stone-800 pb-1"><span>Investment:</span> <span className="text-white font-mono">{idea.investment}</span></p>
                                                                <p className="flex justify-between pt-1"><span>Profit:</span> <span className="text-emerald-400 font-mono">{idea.profit}</span></p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                )}

                                {/* STRATEGY VIEW */}
                                {view === 'strategy' && (
                                    <motion.div 
                                        key="strategy"
                                        variants={tabVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="space-y-6 pb-10"
                                    >
                                        {/* Header Section with Pricing */}
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                             {/* Pricing Strategy - Dark/Premium Card */}
                                             <div className="lg:col-span-2 bg-stone-900 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
                                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                                    <Wallet size={180} />
                                                </div>
                                                <div className="relative z-10">
                                                    <div className="flex items-center gap-3 mb-6">
                                                        <div className="p-2 bg-nobel-gold rounded-lg text-stone-900">
                                                            <DollarSign size={24} />
                                                        </div>
                                                        <h3 className="font-serif text-2xl text-nobel-gold">Pricing Intelligence</h3>
                                                    </div>
                                                    <p className="text-lg leading-relaxed text-stone-300 font-light">
                                                        {aiData.pricingStrategy}
                                                    </p>
                                                    <div className="mt-8 flex gap-4">
                                                        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-sm border border-white/10 transition-colors">
                                                            Analyze Margins
                                                        </button>
                                                         <button className="px-4 py-2 bg-nobel-gold hover:bg-yellow-600 text-stone-900 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-yellow-500/20">
                                                            Apply Model
                                                        </button>
                                                    </div>
                                                </div>
                                             </div>

                                             {/* Quick Actions / Key Metric */}
                                             <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex flex-col justify-center items-center text-center">
                                                 <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                                                    <TrendingUp size={32} />
                                                 </div>
                                                 <h4 className="font-serif text-xl text-stone-900 mb-2">Growth Potential</h4>
                                                 <div className="text-4xl font-bold text-stone-900 mb-2">+12%</div>
                                                 <p className="text-xs text-stone-500 uppercase tracking-widest">Projected MoM Revenue</p>
                                             </div>
                                        </div>

                                        {/* Marketing Strategy Grid */}
                                        <div>
                                            <h3 className="font-serif text-2xl text-stone-900 mb-6 flex items-center gap-3">
                                                <Target className="text-stone-400" /> Growth Vectors
                                            </h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {aiData.marketingStrategy.map((strat, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, y: 20 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="bg-white p-6 rounded-xl border border-stone-200 hover:border-nobel-gold/50 shadow-sm hover:shadow-lg transition-all group"
                                                    >
                                                        <div className="text-stone-300 group-hover:text-nobel-gold transition-colors mb-4">
                                                            <Sparkles size={24} />
                                                        </div>
                                                        <p className="text-stone-700 font-medium leading-relaxed">
                                                            {strat}
                                                        </p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Improvements Timeline/List */}
                                        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
                                            <div className="p-8 border-b border-stone-100 bg-stone-50/50">
                                                <h3 className="font-serif text-2xl text-stone-900 flex items-center gap-3">
                                                    <BrainCircuit className="text-stone-400" /> Optimization Protocol
                                                </h3>
                                            </div>
                                            <div className="divide-y divide-stone-100">
                                                {aiData.improvements.map((imp, i) => (
                                                    <div key={i} className="p-6 flex gap-4 hover:bg-stone-50 transition-colors group">
                                                        <div className="mt-1 w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-nobel-gold group-hover:text-stone-900 transition-colors">
                                                            {i + 1}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="text-stone-800 text-lg">{imp}</p>
                                                            <div className="mt-2 flex gap-2">
                                                                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider bg-stone-100 px-2 py-1 rounded">High Priority</span>
                                                            </div>
                                                        </div>
                                                        <button className="self-center p-2 text-stone-300 hover:text-emerald-500 transition-colors">
                                                            <CheckCircle size={24} />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                )}

                {/* MENTOR CHAT VIEW */}
                {view === 'mentor' && (
                    <motion.div 
                        key="mentor"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col h-full bg-white relative"
                    >
                        {/* Clean Header */}
                        <div className="flex items-center justify-between px-8 py-5 shrink-0 z-10 border-b border-stone-50">
                            <div className="flex items-center gap-4">
                                <Search className="text-stone-400 w-5 h-5 cursor-pointer hover:text-stone-600 transition-colors" />
                                <button onClick={() => setChatHistory([])} className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-50 rounded-full text-sm font-medium text-stone-600 transition-all border border-stone-200 shadow-sm hover:shadow-md">
                                    <Plus size={16} /> New Chat
                                </button>
                            </div>
                            <div className="flex items-center gap-4">
                                <button className="p-2 text-stone-400 hover:text-stone-600 transition-colors" title="Sidebar">
                                    <PanelLeft size={20} />
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-stone-50 rounded-lg text-sm font-medium text-stone-600 transition-colors border border-stone-200 shadow-sm">
                                    <Share size={16} /> Share
                                </button>
                            </div>
                        </div>

                        {/* Chat Content Area - Scrollable */}
                        <div className="flex-1 overflow-y-auto px-4 md:px-0 pb-32 relative scroll-smooth" ref={scrollRef}>
                             {chatHistory.length === 0 ? (
                                 <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="h-full flex flex-col items-center justify-center text-center px-4"
                                 >
                                    
                                    <div className="mb-6 p-4 bg-white rounded-2xl shadow-sm border border-stone-100">
                                        <Sparkles className="w-8 h-8 text-stone-800" />
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-semibold text-stone-900 mb-4 tracking-tight">Good Morning, Founder</h2>
                                    <p className="text-stone-500 text-lg mb-16 font-light">Hey there! What strategic moves can we plan for your business today?</p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl px-4 md:px-12">
                                        {/* Suggestion Card 1: Health Check */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="flex flex-col p-6 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-200 transition-all duration-300 group cursor-pointer text-left h-full" onClick={() => setChatInput("Analyze my current business health and risks.")}
                                        >
                                             <div className="mb-4 text-stone-900 p-2 bg-stone-50 rounded-lg w-fit group-hover:bg-stone-900 group-hover:text-white transition-colors">
                                                 <BarChart3 size={20} />
                                             </div>
                                             <h3 className="font-semibold text-stone-900 text-lg mb-2">How's my business?</h3>
                                             <p className="text-sm text-stone-500 leading-relaxed mb-6 flex-1">Get a quick overview of your business performance, including health score and risk factors.</p>
                                             <div className="w-full py-2.5 bg-stone-50 text-stone-900 text-sm font-medium rounded-xl text-center hover:bg-stone-100 transition-colors">
                                                 View Report
                                             </div>
                                        </motion.div>

                                        {/* Suggestion Card 2: Finance */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                            className="flex flex-col p-6 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-200 transition-all duration-300 group cursor-pointer text-left h-full" onClick={() => setChatInput("Analyze my expenses and suggest budget optimizations.")}
                                        >
                                             <div className="mb-4 text-stone-900 p-2 bg-stone-50 rounded-lg w-fit group-hover:bg-stone-900 group-hover:text-white transition-colors">
                                                 <Coins size={20} />
                                             </div>
                                             <h3 className="font-semibold text-stone-900 text-lg mb-2">Any spend issues?</h3>
                                             <p className="text-sm text-stone-500 leading-relaxed mb-6 flex-1">Identify sudden spikes or dips in operational spend and get suggestions to optimize budget.</p>
                                             <div className="w-full py-2.5 bg-stone-50 text-stone-900 text-sm font-medium rounded-xl text-center hover:bg-stone-100 transition-colors">
                                                 Analyze Budget
                                             </div>
                                        </motion.div>

                                         {/* Suggestion Card 3: Growth */}
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="flex flex-col p-6 bg-white border border-stone-100 rounded-2xl shadow-sm hover:shadow-lg hover:border-stone-200 transition-all duration-300 group cursor-pointer text-left h-full" onClick={() => setChatInput("Suggest growth strategies and marketing channels.")}
                                        >
                                             <div className="mb-4 text-stone-900 p-2 bg-stone-50 rounded-lg w-fit group-hover:bg-stone-900 group-hover:text-white transition-colors">
                                                 <Rocket size={20} />
                                             </div>
                                             <h3 className="font-semibold text-stone-900 text-lg mb-2">What's the next move?</h3>
                                             <p className="text-sm text-stone-500 leading-relaxed mb-6 flex-1">See the top-performing strategies based on market trends to refine your roadmap.</p>
                                             <div className="w-full py-2.5 bg-stone-50 text-stone-900 text-sm font-medium rounded-xl text-center hover:bg-stone-100 transition-colors">
                                                 View Insights
                                             </div>
                                        </motion.div>
                                    </div>
                                 </motion.div>
                             ) : (
                                <div className="max-w-3xl mx-auto space-y-10 pt-8 pb-12">
                                    {chatHistory.map((msg, i) => (
                                        <motion.div 
                                            key={i} 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className={`flex gap-6 ${msg.role === 'user' ? 'justify-end' : 'justify-start group px-4'}`}
                                        >
                                            {msg.role === 'model' && (
                                                <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-serif shadow-sm flex-shrink-0 mt-1">V</div>
                                            )}
                                            <div className={`relative max-w-[85%] rounded-2xl p-6 shadow-sm ${
                                                msg.role === 'user' 
                                                ? 'bg-stone-50 text-stone-800 rounded-tr-sm' 
                                                : 'bg-white border border-stone-100 text-stone-800 rounded-tl-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.05)]'
                                            }`}>
                                                {msg.role === 'model' ? (
                                                    <ChatMessageContent 
                                                        text={msg.text} 
                                                        isAnimated={i === chatHistory.length - 1 && !chatLoading} 
                                                    />
                                                ) : (
                                                    <div className="text-[15px] font-medium font-sans">{msg.text}</div>
                                                )}
                                            </div>
                                            {msg.role === 'user' && (
                                                <div className="w-10 h-10 rounded-full bg-stone-200 text-stone-500 flex items-center justify-center flex-shrink-0 mt-1"><User size={20} /></div>
                                            )}
                                        </motion.div>
                                    ))}
                                    {chatLoading && (
                                        <div className="flex gap-6 px-4">
                                            <div className="w-10 h-10 rounded-full bg-stone-900 text-white flex items-center justify-center text-sm font-serif shadow-sm flex-shrink-0">V</div>
                                            <div className="flex items-center gap-1.5 h-12 px-6 bg-white rounded-2xl rounded-tl-none border border-stone-100 shadow-sm">
                                                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></span>
                                                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-100"></span>
                                                <span className="w-2 h-2 bg-stone-400 rounded-full animate-bounce delay-200"></span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                             )}
                        </div>

                        {/* Input Area - Floating Pill - Fixed at Bottom Center */}
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="absolute bottom-8 left-0 right-0 px-4 flex justify-center z-20 pointer-events-none"
                        >
                            <div className="max-w-3xl w-full pointer-events-auto shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-full bg-white flex items-center p-2 border border-stone-100 transition-shadow focus-within:shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
                                <button className="p-3 text-stone-400 hover:text-stone-600 transition-colors rounded-full hover:bg-stone-50 ml-1">
                                    <Plus size={20} />
                                </button>
                                
                                <input 
                                    type="text"
                                    className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-stone-800 placeholder:text-stone-400 h-10 px-4 text-[15px]"
                                    placeholder="Write a message here..."
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                                />
                                
                                {chatInput.trim() ? (
                                    <button 
                                        onClick={handleChatSend}
                                        disabled={chatLoading}
                                        className="p-2.5 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-md mr-1"
                                    >
                                        <ArrowUp size={18} />
                                    </button>
                                ) : (
                                    <button className="p-2.5 bg-stone-100 text-stone-400 rounded-full cursor-default mr-1">
                                         <ArrowUp size={18} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

            </main>
        </div>
    );
};