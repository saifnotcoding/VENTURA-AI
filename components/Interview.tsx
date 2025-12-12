/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ChevronRight, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InterviewProps {
    type: 'idea' | 'running';
    onComplete: (data: Record<string, string>) => void;
}

interface QuestionConfig {
    text: string;
    key: string;
    validation: 'text' | 'number' | 'currency';
    minLen?: number;
    placeholder?: string;
    subtext?: string;
    longText?: boolean; // New prop for textarea
}

export const Interview: React.FC<InterviewProps> = ({ type, onComplete }) => {
    const [step, setStep] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const inputRef = useRef<HTMLInputElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const questionsIdea: QuestionConfig[] = [
        { 
            text: "What specific industry or market niche are you targeting?", 
            key: "industryInterest", 
            validation: "text", 
            minLen: 5, 
            placeholder: "e.g., Sustainable Fashion, AI Tools for Legal Tech, Urban Farming",
            subtext: "Be specific. Instead of 'Food', try 'Plant-based fast food for busy professionals'."
        },
        { 
            text: "Please describe your business idea in as much detail as possible.", 
            key: "fullDescription", 
            validation: "text", 
            minLen: 20, 
            longText: true,
            placeholder: "Describe the vision, how it works, the revenue model, and why it will succeed...",
            subtext: "The more context you give here, the more accurate our AI analysis will be."
        },
        { 
            text: "What specific problem are you solving for your customers?", 
            key: "problem", 
            validation: "text", 
            minLen: 10, 
            placeholder: "e.g., It's too expensive for small businesses to hire full-time HR...",
            subtext: "Great businesses solve painful problems. What is the pain point?"
        },
        { 
            text: "Who is your ideal target audience?", 
            key: "targetAudience", 
            validation: "text", 
            minLen: 5, 
            placeholder: "e.g., Working moms aged 30-45 in metropolitan areas",
            subtext: "Define demographics, psychographics, or behaviors."
        },
        { 
            text: "What unique skills, connections, or 'unfair advantage' do you have?", 
            key: "skills", 
            validation: "text", 
            minLen: 5,
            subtext: "Why are YOU the right person to build this?"
        },
        { 
            text: "How much capital can you realistically invest to start?", 
            key: "capital", 
            validation: "currency", 
            placeholder: "e.g., 5000",
            subtext: "This helps us calculate realistic runway and feasibility."
        },
        { 
            text: "Which city and country will you launch in?", 
            key: "location", 
            validation: "text", 
            minLen: 3 
        },
    ];

    const questionsRunning: QuestionConfig[] = [
        { 
            text: "What is the official name of your business?", 
            key: "businessName", 
            validation: "text", 
            minLen: 2 
        },
        { 
            text: "What specific industry and niche do you operate in?", 
            key: "industry", 
            validation: "text", 
            minLen: 5, 
            placeholder: "e.g., Boutique Coffee Shop, SaaS for Dentists",
            subtext: "The more specific you are, the better our market data will be."
        },
        { 
            text: "Please describe your business in as much detail as possible.", 
            key: "fullDescription", 
            validation: "text", 
            minLen: 20,
            longText: true,
            placeholder: "Tell us about your history, operations, team size, main products, and current goals...",
            subtext: "Maximum context allows our AI to provide specific strategic advice."
        },
        { 
            text: "Who is your most profitable customer type?", 
            key: "customerDetail", 
            validation: "text", 
            minLen: 10, 
            placeholder: "e.g., Tech-savvy millennials aged 25-40...",
            subtext: "Describe the people who actually pay you."
        },
        { 
            text: "What is your Unique Value Proposition? Why do they buy from you?", 
            key: "uvp", 
            validation: "text", 
            minLen: 10,
            subtext: "Cheaper? Faster? Higher Quality? Better Service?"
        },
        { 
            text: "Who are your main competitors? (Direct or Indirect)", 
            key: "competitors", 
            validation: "text", 
            minLen: 3,
            subtext: "List 2-3 specific names if possible."
        },
        { 
            text: "What is your average monthly revenue (USD)?", 
            key: "revenue", 
            validation: "currency", 
            placeholder: "e.g., 12000" 
        },
        { 
            text: "What are your average monthly expenses (USD)?", 
            key: "expenses", 
            validation: "currency", 
            placeholder: "e.g., 8000" 
        },
        { 
            text: "What is the single biggest challenge holding you back right now?", 
            key: "challenge", 
            validation: "text", 
            minLen: 5 
        }
    ];

    const questions = type === 'idea' ? questionsIdea : questionsRunning;
    const currentQ = questions[step];

    useEffect(() => {
        if (currentQ.longText && textAreaRef.current) {
            textAreaRef.current.focus();
        } else if (inputRef.current) {
            inputRef.current.focus();
        }
        setError(null);
    }, [step, currentQ.longText]);

    const validateInput = (value: string, config: QuestionConfig): string | null => {
        if (!value.trim()) return "Please enter an answer.";
        
        if (config.validation === 'number' || config.validation === 'currency') {
            const num = parseFloat(value.replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return "Please enter a valid number.";
            if (num < 0) return "Value cannot be negative.";
        }

        if (config.minLen && value.trim().length < config.minLen) {
            return `Please provide a more detailed answer (at least ${config.minLen} characters).`;
        }

        return null;
    };

    const handleNext = () => {
        const validationError = validateInput(inputValue, currentQ);
        if (validationError) {
            setError(validationError);
            return;
        }

        const newAnswers = { ...answers, [currentQ.key]: inputValue };
        setAnswers(newAnswers);
        setInputValue("");
        setError(null);

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            onComplete(newAnswers);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        // Only trigger submit on enter for single-line inputs, not textareas (which need Enter for newlines)
        if (e.key === 'Enter' && !currentQ.longText) {
            handleNext();
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F8F4] flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-nobel-gold tracking-widest uppercase">
                            AI Business Interview
                        </span>
                        <div className="h-[1px] bg-stone-200 flex-1"></div>
                        <span className="text-xs font-mono text-stone-400">
                            {step + 1} / {questions.length}
                        </span>
                    </div>
                    <div className="w-full bg-stone-200 h-1 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-stone-900 transition-all duration-500 ease-out" 
                            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                        ></div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div 
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-stone-200"
                    >
                        <h2 className="font-serif text-3xl md:text-4xl text-stone-900 mb-4 leading-tight">
                            {currentQ.text}
                        </h2>
                        
                        {currentQ.subtext && (
                            <p className="text-stone-500 mb-8 text-sm italic border-l-2 border-nobel-gold pl-3">
                                {currentQ.subtext}
                            </p>
                        )}

                        <div className="relative">
                            {currentQ.longText ? (
                                <textarea
                                    ref={textAreaRef}
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    placeholder={currentQ.placeholder || "Type your answer here..."}
                                    className={`w-full bg-transparent border-2 rounded-xl p-4 text-lg md:text-xl text-stone-800 placeholder:text-stone-300 focus:outline-none transition-colors min-h-[150px] resize-y ${error ? 'border-red-400' : 'border-stone-200 focus:border-stone-900'}`}
                                />
                            ) : (
                                <input
                                    ref={inputRef}
                                    type={currentQ.validation === 'text' ? "text" : "number"}
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        if (error) setError(null);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder={currentQ.placeholder || "Type your answer here..."}
                                    className={`w-full bg-transparent border-b-2 py-4 text-xl md:text-2xl text-stone-800 placeholder:text-stone-300 focus:outline-none transition-colors ${error ? 'border-red-400' : 'border-stone-200 focus:border-stone-900'}`}
                                />
                            )}
                            
                            <button
                                onClick={handleNext}
                                className={`absolute right-4 bottom-4 p-2 rounded-full transition-all hover:scale-105 ${inputValue.trim() ? 'bg-stone-900 text-white' : 'bg-stone-200 text-stone-400'}`}
                                style={currentQ.longText ? { bottom: '1rem', right: '1rem' } : {}}
                            >
                                {step === questions.length - 1 ? <Check size={24} /> : <ArrowRight size={24} />}
                            </button>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center gap-2 text-red-500 text-sm"
                            >
                                <AlertCircle size={16} />
                                <span>{error}</span>
                            </motion.div>
                        )}

                        <div className="mt-8 flex gap-3 text-sm text-stone-400">
                             <div className="flex items-center gap-1">
                                <span className="w-4 h-4 rounded border border-stone-300 flex items-center justify-center text-[10px] font-mono">↵</span>
                                <span>{currentQ.longText ? "Click arrow to continue" : "Press Enter"}</span>
                             </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};