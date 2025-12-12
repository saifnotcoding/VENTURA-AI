/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { HeroScene } from './components/QuantumScene';
import { BusinessHealthDiagram, AIStrategyDiagram } from './components/Diagrams';
import { Interview } from './components/Interview';
import { Dashboard } from './components/Dashboard';
import { Menu, X, TrendingUp, ShieldAlert, Target, Lightbulb, BarChart3, ArrowRight, Zap, Globe, Cpu, Check } from 'lucide-react';

// --- Components for Landing Page ---

const Marquee = () => {
  return (
    <div className="relative flex overflow-hidden py-6 bg-stone-900 border-y border-stone-800">
      <div className="animate-marquee whitespace-nowrap flex gap-24 text-stone-500 font-serif text-xl italic opacity-60">
        <span>PREDICTIVE ANALYTICS</span>
        <span className="text-nobel-gold">•</span>
        <span>MARKET SIMULATION</span>
        <span className="text-nobel-gold">•</span>
        <span>RISK MITIGATION</span>
        <span className="text-nobel-gold">•</span>
        <span>AUTONOMOUS STRATEGY</span>
        <span className="text-nobel-gold">•</span>
        <span>PREDICTIVE ANALYTICS</span>
        <span className="text-nobel-gold">•</span>
        <span>MARKET SIMULATION</span>
        <span className="text-nobel-gold">•</span>
        <span>RISK MITIGATION</span>
        <span className="text-nobel-gold">•</span>
        <span>AUTONOMOUS STRATEGY</span>
      </div>
      <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex gap-24 text-stone-500 font-serif text-xl italic opacity-60">
        <span>PREDICTIVE ANALYTICS</span>
        <span className="text-nobel-gold">•</span>
        <span>MARKET SIMULATION</span>
        <span className="text-nobel-gold">•</span>
        <span>RISK MITIGATION</span>
        <span className="text-nobel-gold">•</span>
        <span>AUTONOMOUS STRATEGY</span>
        <span className="text-nobel-gold">•</span>
        <span>PREDICTIVE ANALYTICS</span>
        <span className="text-nobel-gold">•</span>
        <span>MARKET SIMULATION</span>
        <span className="text-nobel-gold">•</span>
        <span>RISK MITIGATION</span>
        <span className="text-nobel-gold">•</span>
        <span>AUTONOMOUS STRATEGY</span>
      </div>
    </div>
  );
};

const BentoCard = ({ title, desc, icon: Icon, className, delay }: { title: string, desc: string, icon: any, className?: string, delay?: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: delay || 0, duration: 0.5 }}
    className={`bg-white rounded-3xl p-8 border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-500 group relative overflow-hidden ${className}`}
  >
    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110 origin-top-right">
      <Icon size={120} />
    </div>
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center text-stone-900 mb-6 group-hover:bg-nobel-gold group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      <div>
        <h3 className="font-serif text-2xl text-stone-900 mb-3">{title}</h3>
        <p className="text-stone-500 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  </motion.div>
);

// Component for selecting User Type AFTER login
const OnboardingChoice = ({ onSelect }: { onSelect: (type: 'idea' | 'running') => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen bg-[#F9F8F4] flex flex-col items-center justify-center p-6"
    >
        <div className="max-w-4xl w-full text-center">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2 }}
               className="inline-block mb-6 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full"
             >
                Step 1 of 3
             </motion.div>
             <motion.h2 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="font-serif text-4xl md:text-5xl mb-6 text-stone-900"
             >
               Select Your Path
             </motion.h2>
             <motion.p 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.4 }}
               className="text-lg text-stone-600 mb-12 max-w-2xl mx-auto leading-relaxed"
             >
                To provide the most accurate AI analysis, we need to know if you are validating a new concept or optimizing an existing operation.
             </motion.p>

             <div className="flex flex-col md:flex-row justify-center gap-6">
                 <motion.button 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    onClick={() => onSelect('idea')} 
                    className="group flex flex-col items-center justify-center p-8 bg-white border-2 border-stone-200 hover:border-nobel-gold rounded-2xl transition-all duration-300 shadow-sm hover:shadow-xl w-full md:w-1/2 text-left h-64 relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Lightbulb size={120} />
                    </div>
                    <Lightbulb size={40} className="text-nobel-gold mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="font-serif text-2xl font-medium text-stone-900 mb-2 relative z-10">I am exploring an idea</h3>
                    <p className="text-sm text-stone-500 font-light text-center relative z-10">Validate markets, estimate costs, and predict viability.</p>
                 </motion.button>

                 <motion.button 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => onSelect('running')} 
                    className="group flex flex-col items-center justify-center p-8 bg-stone-900 border-2 border-stone-900 hover:border-stone-700 rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl w-full md:w-1/2 text-left h-64 relative overflow-hidden"
                 >
                    <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp size={120} className="text-white" />
                    </div>
                    <TrendingUp size={40} className="text-white mb-6 group-hover:scale-110 transition-transform relative z-10" />
                    <h3 className="font-serif text-2xl font-medium text-white mb-2 relative z-10">I have a running business</h3>
                    <p className="text-sm text-stone-400 font-light text-center relative z-10">Optimize pricing, cut costs, and automate growth.</p>
                 </motion.button>
             </div>
        </div>
    </motion.div>
  )
}

// Main App Component
const App: React.FC = () => {
  // Application State: 'landing' | 'onboarding_choice' | 'interview' | 'dashboard'
  const [appState, setAppState] = useState<'landing' | 'onboarding_choice' | 'interview' | 'dashboard'>('landing');
  const [userType, setUserType] = useState<'idea' | 'running' | null>(null);
  const [userData, setUserData] = useState<Record<string, string>>({});
  
  // Landing Page UI State
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const handleStart = () => {
    setShowAuthModal(true);
  };

  const handleLogin = () => {
    setShowAuthModal(false);
    setAppState('onboarding_choice');
  };

  const handleTypeSelection = (type: 'idea' | 'running') => {
    setUserType(type);
    setAppState('interview');
  };

  const handleInterviewComplete = (data: Record<string, string>) => {
    setUserData(data);
    setAppState('dashboard');
  };

  const handleLogout = () => {
    setAppState('landing');
    setUserType(null);
    setUserData({});
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white font-sans">
      <AnimatePresence mode="wait">
        {/* DASHBOARD STATE */}
        {appState === 'dashboard' && userType && (
           <motion.div 
             key="dashboard" 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0 }} 
             transition={{ duration: 0.5 }}
           >
              <Dashboard userData={userData} userType={userType} onLogout={handleLogout} />
           </motion.div>
        )}

        {/* INTERVIEW STATE */}
        {appState === 'interview' && userType && (
           <motion.div 
             key="interview" 
             initial={{ opacity: 0, y: 20 }} 
             animate={{ opacity: 1, y: 0 }} 
             exit={{ opacity: 0, y: -20 }} 
             transition={{ duration: 0.5 }}
           >
              <Interview type={userType} onComplete={handleInterviewComplete} />
           </motion.div>
        )}
        
        {/* ONBOARDING CHOICE STATE */}
        {appState === 'onboarding_choice' && (
           <OnboardingChoice key="onboarding" onSelect={handleTypeSelection} />
        )}

        {/* LANDING STATE */}
        {appState === 'landing' && (
           <motion.div 
             key="landing" 
             initial={{ opacity: 0 }} 
             animate={{ opacity: 1 }} 
             exit={{ opacity: 0, y: -50, filter: "blur(10px)" }} 
             transition={{ duration: 0.6, ease: "easeInOut" }}
           >
              {/* Floating Pill Navigation */}
              <nav className={`fixed top-6 left-0 right-0 z-50 transition-all duration-300 flex justify-center px-6`}>
                <div className={`backdrop-blur-xl bg-white/70 border border-white/50 shadow-lg shadow-stone-200/50 rounded-full px-6 py-3 flex items-center justify-between w-full max-w-4xl transition-all duration-300 ${scrolled ? 'bg-white/90' : ''}`}>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-8 h-8 bg-stone-900 rounded-full flex items-center justify-center text-white font-serif font-bold text-lg">V</div>
                        <span className="font-serif font-bold text-lg tracking-tight text-stone-900 hidden sm:block">
                        VENTURA<span className="text-nobel-gold">.AI</span>
                        </span>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest text-stone-500 uppercase">
                        <a href="#mission" onClick={scrollToSection('mission')} className="hover:text-stone-900 transition-colors cursor-pointer">Mission</a>
                        <a href="#features" onClick={scrollToSection('features')} className="hover:text-stone-900 transition-colors cursor-pointer">Engine</a>
                        <a href="#modules" onClick={scrollToSection('modules')} className="hover:text-stone-900 transition-colors cursor-pointer">Modules</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={handleStart} className="hidden sm:block text-sm font-medium text-stone-600 hover:text-stone-900">Log In</button>
                        <button 
                        onClick={handleStart}
                        className="px-5 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 transition-all hover:scale-105 shadow-md"
                        >
                        Get Started
                        </button>
                        <button className="md:hidden text-stone-900 p-1" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
              </nav>

              {/* Mobile Menu */}
              {menuOpen && (
                <div className="fixed inset-0 z-40 bg-[#F9F8F4] flex flex-col items-center justify-center gap-8 text-2xl font-serif animate-fade-in">
                    <a href="#mission" onClick={scrollToSection('mission')} className="hover:text-nobel-gold transition-colors cursor-pointer">Mission</a>
                    <a href="#features" onClick={scrollToSection('features')} className="hover:text-nobel-gold transition-colors cursor-pointer">Engine</a>
                    <a href="#modules" onClick={scrollToSection('modules')} className="hover:text-nobel-gold transition-colors cursor-pointer">Modules</a>
                    <button 
                      onClick={() => { setMenuOpen(false); handleStart(); }}
                      className="px-8 py-4 bg-stone-900 text-white rounded-full shadow-lg cursor-pointer text-lg"
                    >
                      Start Assessment
                    </button>
                </div>
              )}

              {/* Modern Hero Section */}
              <header className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                <HeroScene />
                
                {/* Modern Gradient Background */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-stone-100/60 via-[#F9F8F4]/20 to-[#F9F8F4]" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center mt-10">
                  <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-stone-200 bg-white/50 backdrop-blur-md rounded-full text-xs font-bold tracking-[0.2em] uppercase text-stone-500 shadow-sm"
                  >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AI Business Architect v2.0
                  </motion.div>
                  
                  <motion.h1 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.95] tracking-tighter text-stone-900 mb-8"
                  >
                    Build <span className="italic font-light text-stone-500">Smart.</span><br/>
                    Scale <span className="text-nobel-gold">Faster.</span>
                  </motion.h1>
                  
                  <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="max-w-xl mx-auto text-xl text-stone-600 font-light leading-relaxed mb-12"
                  >
                    The first AI co-founder that calculates your probability of success and generates the exact roadmap to profitability.
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                  >
                     <button onClick={handleStart} className="px-12 py-5 bg-stone-900 text-white rounded-full text-lg font-medium shadow-2xl hover:bg-stone-800 hover:shadow-stone-900/30 transition-all duration-300 hover:-translate-y-1 flex items-center gap-3">
                         Begin Analysis <ArrowRight size={20} />
                     </button>
                  </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 text-xs font-bold tracking-widest uppercase"
                >
                    Scroll
                    <div className="w-[1px] h-12 bg-gradient-to-b from-stone-400 to-transparent"></div>
                </motion.div>
              </header>

              <main className="relative z-10 bg-[#F9F8F4]">
                <Marquee />

                {/* Mission / Intro */}
                <section id="mission" className="py-24">
                  <div className="max-w-4xl mx-auto px-6 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                      <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] text-stone-900 mb-10">
                        Most startups die in the dark.<br/>
                        <span className="text-stone-400 italic">We turn on the lights.</span>
                      </h2>
                      <div className="text-lg text-stone-600 leading-relaxed font-light max-w-2xl mx-auto space-y-6">
                        <p>
                           Business failure isn't usually bad luck—it's bad data. Ventura AI acts as a 24/7 auditor for your business model. We don't just give advice; we simulate outcomes based on real-time market constraints.
                        </p>
                        <p>
                           Whether you have a napkin sketch or a running operation, our neural networks dissect your financials, competition, and operational efficiency to provide a single truth: your Probability of Survival.
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Feature 1: The Analysis */}
                <section id="features" className="py-24 bg-white relative overflow-hidden border-y border-stone-100">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-stone-50/50 -skew-x-12 transform origin-top-right"></div>
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-8 border border-stone-200">
                                    <ShieldAlert size={14}/> Risk Engine
                                </div>
                                <h3 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">360° Health Scanner</h3>
                                <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                   Our proprietary algorithm acts as a stress test for your business. It identifies hidden cash-flow leaks, market saturation points, and operational bottlenecks before they become fatal.
                                </p>
                                <ul className="space-y-4">
                                    {["Financial Stability Score", "Market Demand Prediction", "Competitor Threat Level"].map((item, i) => (
                                        <li key={i} className="flex items-center gap-4 text-stone-800 font-medium">
                                            <div className="w-6 h-6 rounded-full bg-nobel-gold flex items-center justify-center text-white text-xs"><Check size={14} /></div>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-stone-900/5 blur-3xl rounded-full transform translate-y-10"></div>
                                <div className="bg-white/80 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-2xl">
                                    <BusinessHealthDiagram />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Feature 2: The Strategy */}
                <section className="py-24 bg-stone-900 text-stone-100 overflow-hidden relative">
                    {/* Background Noise Texture */}
                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
                    
                    <div className="max-w-6xl mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                             <motion.div 
                                className="order-2 lg:order-1"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                             >
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl relative">
                                    <div className="absolute -top-10 -left-10 w-20 h-20 bg-nobel-gold rounded-full blur-2xl opacity-20"></div>
                                    <AIStrategyDiagram />
                                </div>
                             </motion.div>
                             
                             <motion.div 
                                className="order-1 lg:order-2"
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                             >
                                <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-800 text-nobel-gold text-xs font-bold tracking-widest uppercase rounded-full mb-8 border border-stone-700">
                                   <Zap size={14} /> Optimization Protocol
                                </div>
                                <h3 className="font-serif text-4xl md:text-5xl mb-6 text-white">From Data to Doctrine</h3>
                                <p className="text-lg text-stone-400 mb-8 leading-relaxed">
                                    Raw data is noise. Ventura AI translates complex analytics into a daily tactical checklist. We tell you exactly what to charge, where to market, and when to pivot.
                                </p>
                             </motion.div>
                        </div>
                    </div>
                </section>

                {/* Bento Grid Modules */}
                <section id="modules" className="py-24 bg-[#F9F8F4]">
                    <div className="max-w-6xl mx-auto px-6">
                         <motion.div 
                            className="text-center max-w-2xl mx-auto mb-16"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                         >
                             <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-4">Complete Command Center</h2>
                             <p className="text-stone-500">Everything you need to run a data-driven empire, accessible from a single dashboard.</p>
                         </motion.div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                            {/* Large Card */}
                            <BentoCard 
                                className="md:col-span-2 bg-stone-900 text-white border-stone-800"
                                title="Financial Projection Core"
                                desc="Simulate burn rates, revenue growth, and cash flow runways under different market conditions."
                                icon={TrendingUp}
                                delay={0}
                            />
                            {/* Tall Card */}
                            <BentoCard 
                                className="md:row-span-2 bg-white"
                                title="Competitor Intel"
                                desc="Real-time SWOT analysis of your top 3 rivals. We track their pricing changes and marketing moves so you don't have to."
                                icon={Target}
                                delay={0.1}
                            />
                            {/* Standard Cards */}
                            <BentoCard 
                                className="bg-white"
                                title="Smart Pricing"
                                desc="Dynamic pricing models that adjust based on demand elasticity."
                                icon={BarChart3}
                                delay={0.2}
                            />
                            <BentoCard 
                                className="bg-white"
                                title="Auto-Marketing"
                                desc="Generate high-conversion content calendars instantly."
                                icon={Globe}
                                delay={0.3}
                            />
                            {/* Wide Card */}
                            <BentoCard 
                                className="md:col-span-3 bg-gradient-to-r from-stone-100 to-white"
                                title="Investor Readiness"
                                desc="Automated pitch deck generation and valuation scoring to get you funded faster."
                                icon={Cpu}
                                delay={0.4}
                            />
                         </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 bg-white border-t border-stone-100">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className="font-serif text-5xl md:text-7xl text-stone-900 mb-8 tracking-tighter">Ready to build?</h2>
                            <p className="text-xl text-stone-500 mb-12 max-w-2xl mx-auto">Join thousands of founders using Ventura AI to de-risk their future.</p>
                            <button onClick={handleStart} className="px-12 py-6 bg-stone-900 text-white rounded-full text-xl font-medium shadow-2xl hover:bg-nobel-gold hover:text-stone-900 hover:shadow-nobel-gold/30 transition-all duration-300 transform hover:-translate-y-2">
                                Start Your Free Assessment
                            </button>
                        </motion.div>
                    </div>
                </section>
              </main>

              <footer className="bg-stone-900 text-stone-400 py-12 border-t border-stone-800">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <div className="text-white font-serif font-bold text-2xl mb-2 tracking-tight">VENTURA.AI</div>
                        <p className="text-sm opacity-60">The Intelligence Layer for Business.</p>
                    </div>
                    <div className="flex gap-8 text-xs font-bold tracking-widest uppercase text-stone-500">
                        <span className="cursor-default">Privacy</span>
                        <span className="cursor-default">Terms</span>
                        <span className="cursor-default">Twitter</span>
                    </div>
                </div>
              </footer>

              {/* Auth Modal Overlay */}
              <AnimatePresence>
                {showAuthModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-stone-900/60 backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-stone-100"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-serif text-2xl text-stone-900">
                                        Start Your Journey
                                    </h3>
                                    <button onClick={() => setShowAuthModal(false)} className="text-stone-400 hover:text-stone-900 transition-colors">
                                        <X size={24} />
                                    </button>
                                </div>
                                <p className="text-stone-600 mb-8 text-sm">
                                    Create an account to access the AI Business Interview System and begin your assessment.
                                </p>
                                
                                <div className="space-y-4">
                                    <button onClick={handleLogin} className="w-full py-4 px-4 border border-stone-200 rounded-xl flex items-center justify-center gap-3 hover:bg-stone-50 hover:border-stone-300 transition-all">
                                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                                        <span className="font-medium text-stone-700">Continue with Google</span>
                                    </button>
                                    <button onClick={handleLogin} className="w-full py-4 px-4 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                                        Sign up with Email
                                    </button>
                                </div>
                                
                                <div className="mt-6 text-center text-xs text-stone-400">
                                    By continuing, you agree to our Terms and Privacy Policy.
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
              </AnimatePresence>
           </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;