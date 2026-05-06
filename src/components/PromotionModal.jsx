import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import api from '../utils/api';

const PromotionModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [latestProject, setLatestProject] = useState(null);

    useEffect(() => {
        const fetchLatest = async () => {
            try {
                const res = await api.get('/projects');
                const projects = res.data;
                
                // Find the newest project (first one since they are sorted by date)
                if (projects.length > 0) {
                    const project = projects[0];
                    setLatestProject(project);

                    // Logic to show popup (only if not seen in last 24h)
                    const lastSeen = localStorage.getItem('mld_promo_seen');
                    const now = new Date().getTime();
                    
                    if (!lastSeen || now - parseInt(lastSeen) > 24 * 60 * 60 * 1000) {
                        // Delay popup for better UX
                        setTimeout(() => {
                            setIsOpen(true);
                        }, 2500);
                    }
                }
            } catch (err) {
                console.error("Promotion protocol offline.");
            }
        };

        fetchLatest();
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem('mld_promo_seen', new Date().getTime().toString());
    };

    return (
        <AnimatePresence>
            {isOpen && latestProject && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-luxury-black-deep/40 backdrop-blur-md"
                    />

                    <motion.div 
                        initial={{ scale: 0.9, y: 40, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 40, opacity: 0 }}
                        transition={{ type: 'spring', damping: 20 }}
                        className="w-full max-w-xl bg-white rounded-[3rem] overflow-hidden relative shadow-2xl"
                    >
                        <button 
                            onClick={handleClose}
                            className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full bg-luxury-black/10 flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-white transition-all shadow-sm"
                        >
                            <X size={20} />
                        </button>

                        <div className="relative h-72 overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1541339905195-0a82b4b95883?auto=format&fit=crop&q=80&w=1200" 
                                alt="Welcome to MLD" 
                                className="w-full h-full object-cover grayscale-[0.3]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white via-luxury-black-deep/20 to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/90 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-2xl"
                                >
                                    <Sparkles className="text-luxury-gold" size={40} />
                                </motion.div>
                            </div>
                        </div>

                        <div className="p-12 md:p-16 text-center -mt-12 relative z-10">
                            <h3 className="text-4xl md:text-5xl font-serif font-black text-luxury-black mb-6 tracking-tighter leading-[0.9] italic">
                                Welcome to <br />
                                <span className="text-gold-gradient not-italic">Milestone Land Developers World.</span>
                            </h3>
                            
                            <p className="text-gray-500 font-outfit text-sm leading-relaxed mb-10 max-w-sm mx-auto">
                                You are now entering South India's premier digital estate archive. 
                                Immerse yourself in our architectural legacies and strategic land portfolios.
                            </p>

                            <div className="space-y-6">
                                <button 
                                    onClick={handleClose}
                                    className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-[10px] tracking-[0.5em] font-black group"
                                >
                                    ENTER THE WORLD <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                                </button>
                                <div className="flex items-center justify-center gap-4 py-4 border-t border-gray-100">
                                     <div className="flex items-center gap-2">
                                         <Building2 size={12} className="text-luxury-gold" />
                                         <span className="text-[9px] font-outfit font-black tracking-widest text-gray-400 uppercase">Legacy Since 2009</span>
                                     </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromotionModal;
