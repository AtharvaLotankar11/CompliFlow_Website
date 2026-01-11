import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Sparkles, BarChart3, Users, Home } from 'lucide-react';
import Logo from '../../../components/Logo';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import dataAnalyticsImg from '../../../assets/data_analytics.jpg';

const FlipCard = ({ number, title, desc, icon, color }) => {
    return (
        <div className="group h-[350px] w-full [perspective:1000px]">
            <div className="relative h-full w-full rounded-[2.5rem] transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] shadow-xl">
                {/* Front Side */}
                <div className="absolute inset-0 h-full w-full rounded-[2.5rem] [backface-visibility:hidden] bg-[#365314] flex flex-col items-center justify-center p-10 text-center border-4 border-[#BEF264]/20">
                    <div className="w-16 h-16 bg-[#BEF264] rounded-2xl flex items-center justify-center mb-6 text-[#365314] font-black text-2xl">
                        {number}
                    </div>
                    <h4 className="text-3xl font-black text-[#BEF264] uppercase tracking-tighter">Feature</h4>
                </div>

                {/* Back Side */}
                <div className={`absolute inset-0 h-full w-full rounded-[2.5rem] [backface-visibility:hidden] [transform:rotateY(180deg)] ${color} p-10 border border-[#BEF264]`}>
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-8">
                        {icon}
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-4">{title}</h4>
                    <p className="text-slate-600 leading-relaxed font-medium">{desc}</p>
                </div>
            </div>
        </div>
    );
};

const RippleCard = ({ title, desc }) => {
    return (
        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 text-left overflow-hidden group">
            {/* Ripple Effect Layers */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-2 border-[#BEF264]/40 rounded-full animate-ripple" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-2 border-[#BEF264]/20 rounded-full animate-ripple [animation-delay:0.5s]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-2 border-[#BEF264]/10 rounded-full animate-ripple [animation-delay:1s]" />
            </div>

            <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-2">
                <h4 className="text-[#BEF264] font-bold text-lg mb-2 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#BEF264]" />
                    {title}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

const LandingPage = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100
            }
        }
    };

    return (
        <div className="min-h-screen bg-[#F7FEE7] selection:bg-[#BEF264] selection:text-[#365314] overflow-x-hidden">
            <Navbar />

            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={() => navigate('/')}
                    className="p-4 bg-[#365314] text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group"
                    title="Back to Home"
                >
                    <Home size={24} />
                </button>
            </div>

            {/* Announcement Bar */}
            <div className="pt-8 px-6">
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="max-w-max mx-auto bg-[#365314] text-[#BEF264] py-1.5 px-4 rounded-full text-xs font-medium flex items-center gap-2 mb-8"
                >
                    <Sparkles size={12} className="animate-pulse" />
                    <span>Official Complaint Management Interface</span>
                </motion.div>
            </div>

            {/* Hero Section */}
            <section className="px-6 pb-20 pt-4 relative">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-6xl lg:text-8xl font-black text-slate-900 leading-[1.05] tracking-tight"
                        >
                            Streamline <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#365314] to-[#65a30d]">
                                Every Issue.
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl text-slate-600 max-w-lg leading-relaxed"
                        >
                            Empower your team with a sleek, intuitive platform designed to turn customer complaints into building blocks for growth.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex flex-wrap items-center gap-6"
                        >
                            <button
                                onClick={() => navigate('/auth')}
                                className="bg-[#365314] text-white px-10 py-4 rounded-2xl text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all group flex items-center gap-3"
                            >
                                Access Portal
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: 'spring' }}
                        className="relative"
                    >
                        <div className="relative z-10 rounded-[3rem] overflow-hidden bg-white aspect-square lg:aspect-[4/5] shadow-2xl border border-slate-100">
                            <img
                                src={dataAnalyticsImg}
                                alt="Data Analytics"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 px-6 bg-white rounded-[4rem]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="inline-block px-4 py-1.5 rounded-full bg-slate-100 text-sm font-bold tracking-widest uppercase text-[#365314]">Features</h2>
                        <h3 className="text-4xl lg:text-6xl font-black text-slate-900">Built for speed, <br />scaled for success.</h3>
                        <p className="text-slate-600 text-lg">Everything you need to handle complaints, track issues, and delight customers in one unified dashboard.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <Zap className="text-[#365314]" />,
                                title: "Instant Routing",
                                desc: "Automatically assign issues to the right department based on category and urgency.",
                                color: "bg-[#F7FEE7]",
                                number: "01"
                            },
                            {
                                icon: <Shield className="text-[#365314]" />,
                                title: "Secure Data",
                                desc: "Enterprise-grade encryption keeps your customer data and internal communications safe.",
                                color: "bg-[#ECFCCB]",
                                number: "02"
                            },
                            {
                                icon: <Users className="text-[#365314]" />,
                                title: "Team Collab",
                                desc: "Work together on complex issues with shared threads and internal notes.",
                                color: "bg-[#F7FEE7]",
                                number: "03"
                            }
                        ].map((feature, i) => (
                            <FlipCard key={i} {...feature} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Factual Information Section */}
            <section className="py-24 px-6 relative overflow-hidden flex items-center">
                <div className="absolute inset-0 bg-[#020617]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a2e05]/60 via-black to-[#020617]" />

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <div className="space-y-8 max-w-4xl mx-auto">
                        <h2 className="text-4xl lg:text-7xl font-black text-white leading-tight">
                            Systematic <span className="text-[#BEF264]">Efficiency</span> <br />
                            for Organizational Growth.
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 mt-16">
                            <RippleCard
                                title="Centralized Tracking"
                                desc="Every entry is logged with a unique identifier, ensuring 100% accountability across all departments."
                            />
                            <RippleCard
                                title="Immutable Logs"
                                desc="Action history and status changes are permanently recorded for audit compliance and internal review."
                            />
                            <RippleCard
                                title="Data Integrity"
                                desc="CompliFlow maintains a strict data hierarchy, preventing unauthorized modification of filed reports."
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto bg-[#365314] rounded-[4rem] p-12 lg:p-24 text-center space-y-12 relative overflow-hidden">
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-5xl lg:text-7xl font-black text-white">Ready to flow?</h2>
                        <p className="text-[#BEF264]/80 text-xl max-w-2xl mx-auto">
                            Setup your organization in minutes and start transforming complaints into opportunities today.
                        </p>
                        <div className="pt-8 flex flex-wrap justify-center gap-6">
                            <button
                                onClick={() => navigate('/auth')}
                                className="bg-white text-[#365314] px-10 py-5 rounded-2xl text-xl font-bold hover:scale-105 transition-all shadow-2xl"
                            >
                                Access Portal
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes ripple {
                    0% { width: 0; height: 0; opacity: 1; }
                    100% { width: 500px; height: 500px; opacity: 0; }
                }
                .animate-ripple {
                    animation: ripple 3s linear infinite;
                }
            `}} />
        </div>
    );
};

export default LandingPage;
