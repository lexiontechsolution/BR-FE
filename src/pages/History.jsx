import { motion } from 'framer-motion';
import { 
    Sparkles, 
    Building2, 
    MapPin, 
    ShieldCheck, 
    FileCheck, 
    Landmark, 
    Map as MapIcon, 
    GraduationCap, 
    Heart, 
    Users,
    CheckCircle2,
    ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';

const History = () => {
    const coreValues = [
        {
            title: 'Premium Land Selection',
            desc: 'We offer carefully chosen plots that are best suited for residential and investment purposes in high-growth locations.',
            icon: MapPin,
            color: 'bg-blue-50 text-blue-600'
        },
        {
            title: '100% Clear Documentation',
            desc: 'All our properties come with legally verified and clear documentation, ensuring a safe and hassle-free purchase.',
            icon: FileCheck,
            color: 'bg-green-50 text-green-600'
        },
        {
            title: 'Government Approved Projects',
            desc: 'Every project is approved by relevant authorities such as DTCP and other government bodies, giving you complete peace of mind.',
            icon: Landmark,
            color: 'bg-purple-50 text-purple-600'
        },
        {
            title: 'Well-Planned Layouts',
            desc: 'We provide detailed layout maps with properly marked plots, roads, and amenities for better clarity and planning.',
            icon: MapIcon,
            color: 'bg-orange-50 text-orange-600'
        },
        {
            title: 'Ready-to-Register Plots',
            desc: 'Our lands are properly surveyed, titled, and ready for immediate registration with complete legal compliance.',
            icon: ShieldCheck,
            color: 'bg-emerald-50 text-emerald-600'
        }
    ];

    const socialImpact = [
        "Supporting students with free educational kits",
        "Helping over 1000+ students in need",
        "Recognizing top-performing students in local communities"
    ];

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-luxury-black-deep">
                <div className="absolute inset-0 z-0">
                    <img 
                        src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=90&w=2400" 
                        alt="Background"
                        className="w-full h-full object-cover opacity-40 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-luxury-black-deep/40 via-luxury-black-deep/80 to-white" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center pt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                         <div className="inline-flex items-center gap-4 mb-8">
                            <span className="w-8 h-[1px] bg-luxury-gold" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Our Operations</span>
                            <span className="w-8 h-[1px] bg-luxury-gold" />
                        </div>
                        <h1 className="text-5xl md:text-8xl font-serif font-black text-white mb-8 tracking-tighter leading-none">
                            What We <span className="text-luxury-gold italic">Do.</span>
                        </h1>
                        <p className="text-white/70 text-lg md:text-xl font-outfit max-w-2xl mx-auto leading-relaxed mb-12">
                            At Milestone Land Developers, we focus on delivering secure, 
                            transparent, and value-driven land investment opportunities.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* CORE OPERATIONS TIMELINE */}
            <section className="py-32 bg-white relative overflow-hidden">
                {/* Background decorative elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-gray-100 hidden lg:block" />
                
                <div className="container mx-auto px-6">
                    <div className="max-w-6xl mx-auto space-y-24 lg:space-y-0">
                        {coreValues.map((item, idx) => (
                            <div key={idx} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-0 ${idx % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                                {/* Content Side */}
                                <motion.div 
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="w-full lg:w-1/2"
                                >
                                    <div className={`bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-gray-100 group hover:border-luxury-gold/30 transition-all duration-500 relative ${idx % 2 === 0 ? 'lg:mr-16' : 'lg:ml-16'}`}>
                                        <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 shadow-lg`}>
                                            <item.icon size={28} />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-luxury-gold font-serif italic text-xl font-black">0{idx + 1}.</span>
                                                <h3 className="text-2xl lg:text-3xl font-serif font-black text-luxury-black tracking-tight leading-tight">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-gray-500 font-outfit leading-relaxed text-lg">
                                                {item.desc}
                                            </p>
                                        </div>
                                        {/* Connecting arrow/line piece for desktop */}
                                        <div className={`absolute top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gray-200 hidden lg:block ${idx % 2 === 0 ? '-right-8' : '-left-8'}`} />
                                    </div>
                                </motion.div>

                                {/* Center Marker */}
                                <div className="relative z-10 hidden lg:flex items-center justify-center w-12 h-12">
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        className="w-4 h-4 bg-white border-4 border-luxury-gold rounded-full shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                                    />
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="absolute inset-0 bg-luxury-gold/10 rounded-full animate-pulse"
                                    />
                                </div>

                                {/* Empty Side for layout balancing */}
                                <div className="hidden lg:block lg:w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SOCIAL RESPONSIBILITY SECTION - SPLIT DESIGN */}
            <section className="py-32 bg-gray-50 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-20">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:w-1/2 space-y-12"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 text-luxury-gold">
                                    <Heart className="fill-luxury-gold" size={24} />
                                    <span className="font-outfit font-black text-xs tracking-[0.4em] uppercase">Social Responsibility</span>
                                </div>
                                <h2 className="text-5xl md:text-6xl font-serif font-black text-luxury-black italic tracking-tighter leading-none">
                                    Believing in <br/> Giving <span className="text-luxury-gold">Back.</span>
                                </h2>
                                <p className="text-gray-500 text-lg font-outfit max-w-lg">
                                    We believe that our success is tied to the prosperity of the communities we serve. 
                                    A portion of our earnings is contributed to welfare activities.
                                </p>
                            </div>

                            <div className="space-y-6">
                                {socialImpact.map((text, i) => (
                                    <div key={i} className="flex items-start gap-4">
                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-luxury-gold/20 flex items-center justify-center text-luxury-gold">
                                            <CheckCircle2 size={14} />
                                        </div>
                                        <p className="text-luxury-black font-outfit font-semibold">{text}</p>
                                    </div>
                                ))}
                            </div>

                            <Link 
                                to="/community-welfare"
                                className="inline-flex items-center gap-3 bg-luxury-black text-white px-8 py-4 rounded-full font-outfit font-black text-xs uppercase tracking-[0.2em] group hover:bg-luxury-gold hover:text-black transition-all duration-500 shadow-xl"
                            >
                                View Community Media
                                <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-2" />
                            </Link>

                            <div className="pt-8 border-t border-gray-200">
                                <div className="flex items-center gap-8">
                                    <div>
                                        <p className="text-4xl font-serif font-black text-luxury-black">1000+</p>
                                        <p className="text-gray-400 text-xs font-outfit uppercase tracking-widest">Students Empowered</p>
                                    </div>
                                    <div className="w-[1px] h-12 bg-gray-200" />
                                    <div>
                                        <p className="text-4xl font-serif font-black text-luxury-black">100%</p>
                                        <p className="text-gray-400 text-xs font-outfit uppercase tracking-widest">Community Focused</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative rounded-[3rem] overflow-hidden aspect-square shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200" 
                                    alt="Community Welfare"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                                />
                                <div className="absolute inset-0 bg-luxury-gold/10 mix-blend-overlay" />
                            </div>
                            {/* Decorative badge */}
                            <div className="absolute -bottom-10 -left-10 bg-luxury-black text-white p-12 rounded-full border-8 border-white hidden md:block">
                                <Users size={40} className="text-luxury-gold mb-2" />
                                <p className="text-[10px] font-outfit uppercase tracking-[0.2em] font-black">Community Welfare</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* WELFARE CONTRIBUTION SECTION */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="max-w-3xl mx-auto space-y-8"
                    >
                        <div className="w-16 h-16 bg-luxury-gold/10 rounded-full flex items-center justify-center text-luxury-gold mx-auto">
                            <GraduationCap size={32} />
                        </div>
                        <h2 className="text-4xl font-serif font-black text-luxury-black italic tracking-tighter">7. Community Welfare Contributions</h2>
                        <p className="text-gray-500 font-outfit text-xl leading-relaxed">
                            A portion of our earnings is contributed to welfare activities, 
                            including support for public causes and community development initiatives.
                        </p>
                        <div className="flex items-center justify-center gap-4 pt-10">
                             <div className="h-[1px] w-12 bg-luxury-gold" />
                             <span className="text-luxury-gold font-serif italic text-lg">Building a Better Future Together</span>
                             <div className="h-[1px] w-12 bg-luxury-gold" />
                        </div>
                    </motion.div>
                </div>
            </section>

            <LeadForm />
        </div>
    );
};

export default History;

