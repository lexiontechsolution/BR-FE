import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Globe, Shield, Clock, ArrowRight } from 'lucide-react';
import LeadForm from '../components/LeadForm';

const Contact = () => {
    const infoItems = [
        { icon: Phone, title: 'Direct Concierge', detail: '+91 636973 4738', sub: 'Available 24/7 for consultation' },
        { icon: Mail, title: 'Private Email', detail: 'info.milestonelanddevelopers@gmail.com', sub: 'Average response: 2 hours' },
        { icon: MapPin, title: 'Corporate Office', detail: 'Tamil Nadu & Kerala, India', sub: 'Visit us for portfolio discussion' },
        { icon: Clock, title: 'Business Hours', detail: '9:00 AM — 7:00 PM', sub: 'Monday to Saturday' }
    ];

    return (
        <div className="bg-white min-h-screen selection:bg-luxury-gold selection:text-black">
            {/* HERO SECTION - DARK IMMERSIVE (MATCHING HISTORY/PROPERTIES) */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-luxury-black-deep">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1590247813693-5541d1c609fd?auto=format&fit=crop&q=90&w=2400" 
                        alt="Contact"
                        className="w-full h-full object-cover opacity-30 grayscale"
                    />
                    <div className="absolute inset-0 bg-luxury-black-deep/80" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center pt-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                         <div className="inline-flex items-center gap-4 mb-8">
                            <span className="w-8 h-[1px] bg-luxury-gold" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Private Concierge</span>
                            <span className="w-8 h-[1px] bg-luxury-gold" />
                        </div>
                        <h1 className="text-6xl md:text-9xl font-serif font-black text-white mb-8 tracking-tighter leading-none">
                            Contact <span className="text-luxury-gold italic">Us.</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl font-outfit max-w-2xl mx-auto leading-relaxed">
                            Reach out to our expert team for a free consultation or to 
                            discuss investment opportunities in Tamil Nadu and Kerala.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CONTACT INFO GRID - PREMIUM & MINIMAL */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {infoItems.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="p-10 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-luxury-gold/20 hover:bg-white hover:shadow-2xl transition-all duration-700 group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg flex items-center justify-center text-luxury-gold mb-8 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-700">
                                    <item.icon size={24} />
                                </div>
                                <h3 className="text-luxury-black font-serif font-black text-2xl mb-4 italic tracking-tight">{item.title}</h3>
                                <p className="text-gray-500 font-outfit text-sm leading-relaxed mb-4">{item.detail}</p>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-[1px] bg-luxury-gold/30" />
                                    <span className="text-[9px] tracking-[0.2em] text-gray-300 uppercase font-black font-outfit">{item.sub}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* MAP SECTION - CLEAN & GRAYSCALE */}
            <section className="py-32 bg-gray-50/50">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between gap-10 mb-16">
                        <div className="space-y-4 text-left">
                            <div className="flex items-center gap-4 text-luxury-gold">
                                <Globe size={18} />
                                <span className="text-[10px] font-black tracking-[0.5em] uppercase font-outfit">Global Presence</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-serif font-black italic tracking-tighter text-luxury-black">Our <span className="text-gold-gradient not-italic">Location.</span></h2>
                        </div>
                        <div className="hidden lg:flex items-center gap-8 text-gray-400 text-[10px] font-outfit font-black tracking-[0.3em] uppercase">
                            <MapPin size={18} className="text-luxury-gold" />
                            Tamil Nadu & Kerala, India
                        </div>
                    </div>
                    
                    <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border border-white group">
                         <div className="absolute inset-0 bg-luxury-black-deep/5 z-10 pointer-events-none group-hover:bg-transparent transition-all duration-1000" />
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15701.325997424584!2d78.1189!3d9.9252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMilestone%20Group!5e0!3m2!1sen!2sin!4v1617260000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy"
                            className="grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
                        />
                    </div>
                </div>
            </section>

            {/* LEAD FORM SECTION - FINAL CONVERSION */}
            <div className="mt-20">
                <div className="container mx-auto px-6 text-center mb-10">
                     <p className="text-gray-300 text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Secure Submission Channel</p>
                </div>
                <LeadForm />
            </div>
        </div>
    );
};

export default Contact;
