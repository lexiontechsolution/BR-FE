import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Shield, User, Phone, Mail, MessageSquare, Sparkles } from 'lucide-react';
import { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';

const PrivateEnquiryModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: 'Private Consultation',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await api.post('/enquiries', formData);
            toast.success("Reception Confirmed. Our director will contact you.");
            setFormData({ name: '', email: '', phone: '', subject: 'Private Consultation', message: '' });
            setTimeout(onClose, 2000);
        } catch (error) {
            toast.error("Transmission failed. Please verify connection.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-luxury-black-deep/90 backdrop-blur-xl" 
                />
                
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-[2rem] md:rounded-[3rem] relative shadow-[0_0_100px_rgba(212,175,55,0.1)] border border-luxury-gold/20 custom-scrollbar"
                >
                    {/* Header Decor */}
                    <div className="h-2 bg-luxury-gold w-full" />
                    
                    <button 
                        onClick={onClose}
                        className="absolute top-8 right-8 text-gray-400 hover:text-luxury-black transition-colors p-2"
                    >
                        <X size={24} />
                    </button>

                    <div className="p-8 md:p-14">
                        <div className="text-center mb-12">
                             <div className="w-16 h-16 rounded-full bg-luxury-gold/5 flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="text-luxury-gold" size={28} />
                            </div>
                            <h2 className="text-4xl font-serif font-black text-luxury-black mb-4 tracking-tighter italic">
                                Private <span className="text-luxury-gold not-italic">Dossier.</span>
                            </h2>
                            <p className="text-gray-400 text-xs font-outfit font-bold tracking-[0.3em] uppercase">Initialize Executive Consultation</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <label className="text-[9px] font-outfit font-black tracking-[0.3em] uppercase text-gray-400 ml-1">Identity Name</label>
                                    <div className="relative">
                                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-gold/50" size={16} />
                                        <input 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            type="text" 
                                            placeholder="JULIANNE STERLING"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-xs font-outfit tracking-widest text-black placeholder:text-gray-400 focus:border-luxury-gold outline-none transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[9px] font-outfit font-black tracking-[0.3em] uppercase text-gray-400 ml-1">Secure Mobile</label>
                                    <div className="relative">
                                        <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-gold/50" size={16} />
                                        <input 
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            type="tel" 
                                            placeholder="+91 — — — — — —"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-xs font-outfit tracking-widest text-black placeholder:text-gray-400 focus:border-luxury-gold outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-outfit font-black tracking-[0.3em] uppercase text-gray-400 ml-1">Digital Mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-luxury-gold/50" size={16} />
                                    <input 
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        type="email" 
                                        placeholder="ESTATES@DIRECTORY.COM"
                                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-14 pr-6 text-xs font-outfit tracking-widest text-black placeholder:text-gray-400 focus:border-luxury-gold outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[9px] font-outfit font-black tracking-[0.3em] uppercase text-gray-400 ml-1">Acquisition Objectives</label>
                                <div className="relative">
                                    <MessageSquare className="absolute left-6 top-6 text-luxury-gold/50" size={16} />
                                    <textarea 
                                        required
                                        rows="3"
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="ESTABLISH CONTEXT OF ENQUIRY..."
                                        className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] py-6 pl-14 pr-6 text-xs font-outfit tracking-widest text-black placeholder:text-gray-400 focus:border-luxury-gold outline-none transition-all resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4 p-6 bg-luxury-gold/5 rounded-[1.5rem] border border-luxury-gold/10">
                                <Shield className="text-luxury-gold shrink-0" size={20} />
                                <p className="text-[10px] text-gray-500 leading-relaxed font-outfit font-bold uppercase tracking-tight">
                                    Encryption active. Your communication is routed directly to our executive directorate for maximum confidentiality.
                                </p>
                            </div>

                            <button 
                                disabled={isSubmitting}
                                type="submit" 
                                className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-[10px] tracking-[0.5em] font-black group"
                            >
                                {isSubmitting ? 'TRANSMITTING...' : (
                                    <>CONFIRM ACQUISITION <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PrivateEnquiryModal;
