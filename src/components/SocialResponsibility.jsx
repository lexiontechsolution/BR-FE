import { motion } from 'framer-motion';
import { ArrowRight, Users, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SocialResponsibility = () => {
    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    
                    {/* Left Content */}
                    <div className="order-2 lg:order-1">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Social Responsibility</span>
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-serif font-black text-luxury-black mb-8 leading-[1.1] tracking-tighter italic">
                            Believing in <span className="text-gold-gradient not-italic">Giving Back.</span>
                        </h2>
                        
                        <p className="text-gray-500 text-lg font-outfit leading-relaxed mb-12 max-w-xl">
                            We believe that our success is tied to the prosperity of the communities we serve. 
                            A portion of our earnings is contributed to welfare activities.
                        </p>
                        
                        <ul className="space-y-6 mb-12">
                            {[
                                'Supporting students with free educational kits',
                                'Helping over 1000+ students in need',
                                'Recognizing top-performing students in local communities'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-4 group">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black transition-all">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span className="text-[13px] md:text-sm font-outfit font-bold text-gray-700 tracking-wide uppercase">{item}</span>
                                </li>
                            ))}
                        </ul>
                        
                        <Link 
                            to="/community-welfare" 
                            className="inline-flex items-center gap-4 bg-luxury-black text-white px-10 py-5 rounded-full text-[11px] font-outfit font-black tracking-widest hover:bg-luxury-gold hover:text-black transition-all group mb-20 shadow-xl shadow-black/10"
                        >
                            VIEW COMMUNITY MEDIA
                            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                        </Link>
                        
                        <div className="grid grid-cols-2 gap-8 border-t border-gray-100 pt-12">
                            <div>
                                <div className="text-3xl font-serif font-black text-luxury-black">1000+</div>
                                <div className="text-[9px] font-outfit font-black text-gray-400 tracking-[0.2em] uppercase mt-2">Students Empowered</div>
                            </div>
                            <div className="border-l border-gray-100 pl-8">
                                <div className="text-3xl font-serif font-black text-luxury-black">100%</div>
                                <div className="text-[9px] font-outfit font-black text-gray-400 tracking-[0.2em] uppercase mt-2">Community Focused</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Gallery - Horizontal Scroll */}
                    <div className="order-1 lg:order-2 relative lg:right-[-10%] w-full lg:w-[120%] overflow-visible">
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="flex gap-6 overflow-x-auto pb-12 no-scrollbar snap-x snap-mandatory px-4 md:px-0"
                        >
                            {/* Video 1 */}
                            <div className="flex-shrink-0 w-[85vw] md:w-[450px] aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 snap-center">
                                <iframe 
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/9l1vdrp98kA"
                                    title="Welfare Video 1"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Image 1 */}
                            <div className="flex-shrink-0 w-[85vw] md:w-[450px] aspect-video rounded-[3rem] overflow-hidden shadow-2xl snap-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200" 
                                    alt="Community Welfare 1" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>

                            {/* Video 2 */}
                            <div className="flex-shrink-0 w-[85vw] md:w-[450px] aspect-video rounded-[3rem] overflow-hidden shadow-2xl bg-gray-100 snap-center">
                                <iframe 
                                    className="w-full h-full"
                                    src="https://www.youtube.com/embed/hmYV3wr6PR4"
                                    title="Welfare Video 2"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>

                            {/* Image 2 */}
                            <div className="flex-shrink-0 w-[85vw] md:w-[450px] aspect-video rounded-[3rem] overflow-hidden shadow-2xl snap-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" 
                                    alt="Community Welfare 2" 
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                                />
                            </div>
                        </motion.div>
                        
                        {/* Aesthetic Rulers & Decors */}
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-luxury-gold/10 blur-[80px] rounded-full -z-10" />
                        
                        <div className="hidden md:flex items-center gap-4 mt-6 text-[10px] font-outfit font-black tracking-[0.2em] text-gray-300">
                             <div className="w-12 h-[1px] bg-gray-200" />
                             SCROLL TO EXPLORE
                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default SocialResponsibility;
