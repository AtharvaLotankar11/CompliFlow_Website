import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const AIHelper = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!message.trim() || isLoading) return;

        const userMessage = { role: 'user', content: message };
        setHistory(prev => [...prev, userMessage]);
        setMessage('');
        setIsLoading(true);

        try {
            const response = await axios.post('/api/ai/chat', {
                message: userMessage.content,
                history: history.slice(-5)
            }, { withCredentials: true });

            setHistory(prev => [...prev, { role: 'assistant', content: response.data.response }]);
        } catch (error) {
            console.error('AI Error:', error);
            setHistory(prev => [...prev, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="w-80 sm:w-96 glass rounded-3xl overflow-hidden shadow-2xl border border-white/40 flex flex-col h-[480px]"
                    >
                        {/* Header */}
                        <div className="bg-accent-gradient p-6 text-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="bg-white/20 p-2.5 rounded-2xl backdrop-blur-md border border-white/20">
                                    <Bot size={24} />
                                </div>
                                <div>
                                    <h3 className="font-heading font-bold text-base text-white">CompliFlow AI Helper</h3>
                                    <p className="text-xs text-white/80 flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                        Live Intelligent Assistant
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="hover:bg-white/10 p-2 rounded-xl transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-primary-light/50 dark:bg-slate-900/50">
                            {history.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-full text-center space-y-6 opacity-60">
                                    <div className="bg-accent/10 p-6 rounded-full">
                                        <Sparkles className="text-accent" size={40} />
                                    </div>
                                    <p className="text-base font-semibold">How can I assist you today?</p>
                                    <div className="grid grid-cols-1 gap-3 w-full">
                                        {["How do I report an issue?", "Show my complaint status"].map((q) => (
                                            <button
                                                key={q}
                                                onClick={() => setMessage(q)}
                                                className="text-sm bg-white/50 border border-slate-200 p-3 rounded-2xl hover:border-accent hover:text-accent transition-all dark:bg-slate-800/50 dark:border-slate-700"
                                            >
                                                "{q}"
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {history.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-accent text-white rounded-tr-none shadow-accent'
                                        : 'bg-white text-slate-700 shadow-premium border border-slate-100 rounded-tl-none dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700'
                                        }`}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-4 rounded-3xl rounded-tl-none border border-slate-100 shadow-premium dark:bg-slate-800 dark:border-slate-700">
                                        <Loader2 className="animate-spin text-accent" size={20} />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Ask me anything..."
                                className="flex-1 bg-slate-50 dark:bg-slate-950 border-none focus:ring-2 focus:ring-accent rounded-2xl px-5 py-3 text-sm outline-none dark:text-white"
                            />
                            <button
                                type="submit"
                                disabled={!message.trim() || isLoading}
                                className="bg-accent text-white p-3 rounded-2xl hover:bg-accent-dark disabled:opacity-50 transition-all shadow-accent"
                            >
                                <Send size={20} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.15, rotate: 10, boxShadow: "0 0 30px rgba(99, 102, 241, 0.4)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 rounded-full flex items-center justify-center relative group overflow-hidden shadow-2xl transition-all duration-300"
                style={{
                    background: "radial-gradient(circle at center, #6366f1 0%, #a855f7 100%)"
                }}
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {isOpen ? (
                    <X size={28} className="text-white relative z-10" />
                ) : (
                    <Sparkles size={28} className="text-white relative z-10 animate-pulse" />
                )}
            </motion.button>
        </div>
    );
};

export default AIHelper;

