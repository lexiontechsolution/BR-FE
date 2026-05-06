import { motion } from 'framer-motion';
import { useState } from 'react';
import { Phone, Mail, User, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import api from '../utils/api';

const LeadForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        agreed: false
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.agreed) {
            alert("Please agree to our terms to proceed.");
            return;
        }

        setStatus('loading');
        try {
            await api.post('/enquiries', {
                ...formData,
                subject: 'Website Lead Form',
                message: 'Customer submitted interest via bottom lead form.'
            });
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', agreed: false });
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <section id="lead-form" className="py-32 bg-gray-50/50 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-luxury-gold/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2" />
            
            <div className="container mx-auto px-6">
                <div className="bg-white rounded-[4rem] shadow-2xl shadow-gray-200/50 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                    
                    {/* Visual Branding Side */}
                    <div className="relative bg-luxury-black-deep p-16 md:p-24 flex flex-col justify-between overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                            <img 
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200" 
                                className="w-full h-full object-cover"
                                alt="Branding"
                            />
                            <div className="absolute inset-0 bg-gradient-to-br from-luxury-black-deep via-transparent to-luxury-black-deep" />
                        </div>
                        
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-8">
                                <Shield className="text-luxury-gold" size={18} />
                                <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Secure Submission</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-serif font-black text-white mb-8 italic tracking-tighter leading-none">
                                Start Your <br />
                                <span className="text-gold-gradient not-italic">Journey.</span>
                            </h2>
                            <p className="text-white/40 text-lg font-outfit leading-relaxed max-w-sm">
                                Our expert consultants across Tamil Nadu and Kerala are 
                                ready to help you find the best property.
                            </p>
                        </div>

                        <div className="relative z-10 grid grid-cols-2 gap-8 pt-12 border-t border-white/10">
                            <div>
                                <div className="text-2xl font-serif font-black text-white italic">10K+</div>
                                <div className="text-[8px] font-outfit text-white/30 tracking-widest uppercase mt-1">Happy Families</div>
                            </div>
                            <div>
                                <div className="text-2xl font-serif font-black text-white italic">150+</div>
                                <div className="text-[8px] font-outfit text-white/30 tracking-widest uppercase mt-1">Prime Projects</div>
                            </div>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="p-16 md:p-24 bg-white self-center">
                        {status === 'success' ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-10"
                            >
                                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8">
                                    <CheckCircle2 size={40} />
                                </div>
                                <h3 className="text-3xl font-serif font-black text-luxury-black mb-4 italic">Thank You!</h3>
                                <p className="text-gray-500 font-outfit">Your enquiry has been received. Our team will contact you within 2 hours.</p>
                                <button 
                                    onClick={() => setStatus('idle')}
                                    className="mt-10 text-luxury-gold font-outfit font-black tracking-widest text-[10px] uppercase border-b border-luxury-gold/30 pb-1"
                                >
                                    Submit Another Enquiry
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-2">
                                     <h3 className="text-3xl font-serif font-black text-luxury-black italic tracking-tighter mb-2">Enquire Now</h3>
                                     <p className="text-gray-400 text-[11px] font-outfit uppercase tracking-widest">Receive a free site visit & consultation</p>
                                </div>

                                <div className="space-y-6">
                                    {/* Name Input */}
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                                            <User size={16} />
                                        </div>
                                        <input 
                                            required
                                            type="text"
                                            placeholder="FULL NAME*"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-16 pr-8 text-xs font-outfit focus:bg-white focus:border-luxury-gold/50 outline-none transition-all placeholder:text-gray-300"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        />
                                    </div>

                                    {/* Email Input */}
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                                            <Mail size={16} />
                                        </div>
                                        <input 
                                            required
                                            type="email"
                                            placeholder="EMAIL ADDRESS*"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-16 pr-8 text-xs font-outfit focus:bg-white focus:border-luxury-gold/50 outline-none transition-all placeholder:text-gray-300"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    </div>

                                    {/* Phone Input */}
                                    <div className="relative">
                                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300">
                                            <Phone size={16} />
                                        </div>
                                        <div className="absolute left-14 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-gray-200 pr-3 mr-3">
                                            <img src="https://flagcdn.com/w20/in.png" alt="IN" className="w-4 h-auto opacity-70" />
                                            <span className="text-[10px] font-outfit text-gray-400">+91</span>
                                        </div>
                                        <input 
                                            required
                                            type="tel"
                                            placeholder="PHONE NUMBER*"
                                            className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 pl-32 pr-8 text-xs font-outfit focus:bg-white focus:border-luxury-gold/50 outline-none transition-all placeholder:text-gray-300"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        />
                                    </div>

                                    {/* Authorization */}
                                    <div className="flex items-start gap-4 p-4 bg-gray-50/50 rounded-2xl">
                                        <input 
                                            type="checkbox" 
                                            id="agree"
                                            className="mt-1 accent-luxury-gold w-4 h-4 cursor-pointer"
                                            checked={formData.agreed}
                                            onChange={(e) => setFormData({...formData, agreed: e.target.checked})}
                                        />
                                        <label htmlFor="agree" className="text-[10px] text-gray-400 font-outfit leading-relaxed cursor-pointer select-none">
                                            I authorize Milestone Land Developers and its representatives to contact me with updates via email, sms, and WhatsApp. This overrides DND.
                                        </label>
                                    </div>

                                    <button 
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className={`w-full py-6 rounded-2xl text-[10px] font-outfit font-black tracking-[0.3em] uppercase transition-all duration-500 shadow-xl flex items-center justify-center gap-3 ${
                                            status === 'loading'
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            : 'bg-luxury-black text-white hover:bg-luxury-gold shadow-luxury-gold/5 group'
                                        }`}
                                    >
                                        {status === 'loading' ? 'TRANSMITTING...' : 'SUBMIT ENQUIRY'}
                                        {status !== 'loading' && <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />}
                                    </button>

                                    {status === 'error' && (
                                        <p className="text-[10px] text-red-500 text-center font-outfit uppercase tracking-widest">
                                            Transmission failed. Please try again.
                                        </p>
                                    )}
                                </div>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <p className="text-[10px] text-gray-400 font-outfit tracking-[0.5em] uppercase italic">100% Data Privacy Guaranteed</p>
                </div>
            </div>
        </section>
    );
};

export default LeadForm;
