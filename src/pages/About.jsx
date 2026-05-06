import { motion } from 'framer-motion';
import { Target, Eye, Award, Clock, ShieldCheck, Users, Milestone, Building2, MapPin, Sparkles, Shield, Globe } from 'lucide-react';
import LeadForm from '../components/LeadForm';

const About = () => {
    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* HERO SECTION - UNIFIED DARK AESTHETIC */}
            <section className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-luxury-black-deep">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=90&w=2400" 
                        alt="Heritage"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-luxury-black-deep via-transparent to-white" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center pt-40">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                         <div className="flex items-center justify-center gap-4 mb-8">
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Our Story</span>
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif font-black text-white mb-6 tracking-tighter leading-none italic">
                            Trust & <span className="text-gold-gradient not-italic">Service.</span>
                        </h1>
                        <p className="text-white/60 text-lg font-outfit max-w-2xl mx-auto leading-relaxed">
                            Since 2009, we've been transforming the property market of Tamil Nadu 
                            and Kerala with transparency, legal clarity, and quality development.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* HERITAGE STATS SECTION */}
            <section className="py-20 md:py-32 bg-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-20 text-center">
                        <div className="space-y-2">
                            <div className="text-7xl font-serif font-black text-luxury-black italic">15+</div>
                            <div className="text-[10px] font-outfit font-black text-luxury-gold tracking-[0.3em] uppercase">Years of Real Estate Service</div>
                        </div>
                        <div className="w-[1px] h-20 bg-gray-100 hidden md:block" />
                        <div className="space-y-2">
                            <div className="text-7xl font-serif font-black text-luxury-black italic">150+</div>
                            <div className="text-[10px] font-outfit font-black text-luxury-gold tracking-[0.3em] uppercase">Successful Projects Delivered</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* MISSION & VISION - REIMAGINED */}
            <section className="py-24 md:py-40 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
                    <Globe size={800} />
                </div>
                <div className="container mx-auto px-6 text-center max-w-6xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white p-16 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-2 transition-all duration-700"
                        >
                            <div className="w-20 h-20 bg-luxury-gold/5 rounded-full flex items-center justify-center text-luxury-gold mx-auto mb-10 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-500">
                                <Target size={32} />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-luxury-black mb-8 italic">The Mission Protocol</h3>
                            <p className="text-gray-500 font-outfit leading-relaxed text-lg">
                                To provide transparent, hassle-free land ownership experiences 
                                through meticulous legal vetting and strategic location mapping, 
                                ensuring every client gets the best value for their investment.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-16 rounded-[3rem] shadow-xl shadow-gray-200/50 border border-gray-100 group hover:-translate-y-2 transition-all duration-700"
                        >
                            <div className="w-20 h-20 bg-luxury-gold/5 rounded-full flex items-center justify-center text-luxury-gold mx-auto mb-10 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-500">
                                <Eye size={32} />
                            </div>
                            <h3 className="text-3xl font-serif font-black text-luxury-black mb-8 italic">The Vision Benchmark</h3>
                            <p className="text-gray-500 font-outfit leading-relaxed text-lg">
                                To be the global benchmark in land development, recognized for 
                                architectural excellence, legal transparency, and for creating 
                                communities that thrive for generations.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CORE ARTIFACT VALUES */}
            <section className="py-40">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                         <div className="flex items-center justify-center gap-4 mb-6">
                            <Sparkles className="text-luxury-gold" size={18} />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase">Core Values</span>
                        </div>
                        <h2 className="text-4xl md:text-7xl font-serif font-black text-luxury-black tracking-tight leading-none italic">
                            The Pillars of <br />
                            <span className="text-gold-gradient not-italic">Our Excellence.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { icon: Shield, title: 'Clear Documentation', text: '100% clear titles and legally verified papers for your peace of mind.' },
                            { icon: Clock, title: 'On-Time Delivery', text: 'We respect your time. Every project is handed over exactly when promised.' },
                            { icon: Award, title: 'Top Quality', text: 'Construction and infrastructure that meets the highest standards.' },
                            { icon: Users, title: 'Customer Support', text: 'Dedicated support at every step of your property buying process.' }
                        ].map((v, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="p-10 bg-white rounded-3xl border border-gray-50 hover:border-luxury-gold/20 hover:bg-gray-50/30 transition-all duration-500 text-center"
                            >
                                <div className="text-luxury-gold mb-8 flex justify-center">
                                     <v.icon size={40} />
                                </div>
                                <h4 className="text-xl font-serif font-black text-luxury-black mb-6 italic tracking-tight">{v.title}</h4>
                                <p className="text-gray-400 text-xs font-outfit leading-relaxed tracking-wide pb-4">{v.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* LEADERSHIP SECTION - REDESIGNED */}
            <section className="py-40 bg-white border-t border-gray-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">The Board</span>
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                        </div>
                        <h2 className="text-4xl md:text-7xl font-serif font-black text-luxury-black tracking-tight leading-none italic">
                            Founding <br />
                            <span className="text-gold-gradient not-italic">Leadership.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
                        {[
                            { 
                                name: 'Santhosh Kumar', 
                                role: 'Founder & Managing Director', 
                                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
                                bio: 'With over 15 years of industry experience, Santhosh has led Milestone from a local startup to a regional powerhouse.'
                            },
                            { 
                                name: 'Rajesh Nair', 
                                role: 'Co-Founder & Director', 
                                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
                                bio: 'An expert in legal clarity and urban planning, Rajesh ensures that every project meets the highest standards of transparency.'
                            }
                        ].map((leader, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group bg-gray-50/50 p-12 rounded-[3.5rem] border border-gray-100 hover:border-luxury-gold/30 hover:bg-white hover:shadow-2xl transition-all duration-700 text-center"
                            >
                                <div className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-10">
                                    <div className="absolute inset-0 rounded-full border-2 border-luxury-gold border-dashed animate-[spin_10s_linear_infinite] opacity-30" />
                                    <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl relative z-10">
                                        <img 
                                            src={leader.image} 
                                            alt={leader.name}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-luxury-gold rounded-full flex items-center justify-center text-black shadow-lg z-20">
                                        <Award size={18} />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.3em] uppercase">{leader.role}</h4>
                                    <h3 className="text-3xl font-serif font-black italic tracking-tight text-luxury-black">{leader.name}</h3>
                                    <p className="text-gray-500 font-outfit leading-relaxed max-w-sm mx-auto">
                                        {leader.bio}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TEAM SECTION - PLACEHOLDERS FOR USER EDITING */}
            <section className="py-40 bg-gray-50/50">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-20">
                         <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Expert Team</span>
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-serif font-black text-luxury-black mb-8 italic tracking-tighter">
                            Meet Our <span className="text-gold-gradient not-italic">Team.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-6xl mx-auto">
                        {[
                            { role: 'Senior Consultant', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800' },
                            { role: 'Project Manager', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800' },
                            { role: 'Legal Advisor', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800' },
                            { role: 'Sales Head', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800' }
                        ].map((member, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group"
                            >
                                <div className="aspect-square rounded-[2rem] overflow-hidden mb-6 relative shadow-lg shadow-gray-200/50">
                                    <img 
                                        src={member.img} 
                                        alt={member.role}
                                        className="w-full h-full object-cover transition-all duration-700 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                                <div className="space-y-1">
                                    <h4 className="text-luxury-gold text-[9px] font-outfit font-black tracking-[0.3em] uppercase">{member.role}</h4>
                                    <h3 className="text-xl font-serif font-black text-luxury-black group-hover:text-luxury-gold transition-colors duration-300">Team Member Name</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            <LeadForm />
        </div>
    );
};

export default About;
