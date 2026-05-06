import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import BankPartners from '../components/BankPartners';
import { MapPin, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import api from '../utils/api';

const Projects = ({ onOpenEnquiry }) => {
    const [filter, setFilter] = useState('All');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get('/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Artifact registry communication failure.");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const filteredProjects = filter === 'All' ? projects : projects.filter(p => p.status === filter);

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* HERO SECTION - UNIFIED DARK AESTHETIC */}
            <section className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-luxury-black-deep">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=90&w=2400" 
                        alt="Gallery"
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
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Real Estate in Tamil Nadu & Kerala</span>
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                        </div>
                        <h1 className="text-4xl md:text-7xl font-serif font-black text-white mb-6 tracking-tighter leading-none italic">
                            Our <span className="text-gold-gradient not-italic">Projects.</span>
                        </h1>
                        <p className="text-white/60 text-lg font-outfit max-w-2xl mx-auto leading-relaxed mb-12">
                            A list of the best land developments and properties 
                            available in Tamil Nadu and Kerala for your next home or investment.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6 py-24">
                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-8 mb-24">
                     <div className="flex gap-4">
                        <button 
                            onClick={onOpenEnquiry}
                            className="flex items-center gap-4 px-12 py-8 bg-gray-50 border border-gray-100 rounded-[2rem] text-[10px] font-outfit font-black tracking-widest uppercase hover:bg-luxury-gold hover:text-black transition-all"
                        >
                            <SlidersHorizontal size={18} /> FILTER PROJECTS
                        </button>
                        {['All', 'Ongoing', 'Upcoming', 'Completed'].map((cat) => (
                            <button 
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-10 py-4 rounded-full text-[10px] font-outfit font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                                    filter === cat 
                                    ? 'bg-luxury-gold text-black border-luxury-gold shadow-xl shadow-luxury-gold/20' 
                                    : 'border-gray-100 bg-white text-gray-400 hover:text-luxury-black hover:border-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                     </div>
                     <div className="text-[10px] font-outfit font-bold tracking-[0.4em] text-gray-300 uppercase">
                         Curated Selection — {filteredProjects.length < 10 ? `0${filteredProjects.length}` : filteredProjects.length} Entries
                     </div>
                </div>

                {/* Gallery Grid */}
                {loading ? (
                    <div className="py-40 text-center font-serif italic text-4xl text-gray-100 tracking-tighter">Loading Projects...</div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
                        <AnimatePresence mode="popLayout">
                            {filteredProjects.map((project, idx) => (
                                <motion.div 
                                    layout
                                    key={project._id}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="group text-left"
                                >
                                    <Link to={`/projects/${project._id}`} className="block">
                                        <div className="relative aspect-[16/11] overflow-hidden mb-8 rounded-[2rem] shadow-2xl shadow-gray-200/50 bg-gray-50 flex items-center justify-center">
                                            <img 
                                                src={project.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200'} 
                                                alt={project.title}
                                                className="w-full h-full object-contain grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" 
                                            />
                                            <div className="absolute inset-0 bg-luxury-black/5 group-hover:bg-transparent transition-all duration-1000" />
                                            
                                            <div className="absolute top-6 left-6">
                                                <span className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[8px] font-black uppercase tracking-[0.3em] text-white">
                                                    {project.status}
                                                </span>
                                            </div>

                                            <div className="absolute bottom-6 right-6">
                                                <div className="w-12 h-12 rounded-full bg-luxury-gold text-black flex items-center justify-center translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 shadow-2xl">
                                                    <ArrowUpRight size={20} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-start px-2">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-3 text-luxury-gold font-outfit font-black text-[9px] tracking-[0.3em] uppercase">
                                                    <MapPin size={12} /> {project.city}
                                                </div>
                                                <h3 className="text-2xl lg:text-3xl font-serif font-black tracking-tighter text-luxury-black group-hover:text-luxury-gold transition-colors duration-500">{project.title}</h3>
                                                <div className="flex items-center gap-6 pt-2">
                                                    <div className="flex flex-col">
                                                        <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Pricing</span>
                                                        <span className="text-sm font-serif font-bold">₹{project.mldPrice || 'TBA'}</span>
                                                    </div>
                                                    {project.units && (
                                                        <div className="flex flex-col">
                                                            <span className="text-[8px] font-black text-gray-300 uppercase tracking-widest">Units</span>
                                                            <span className="text-sm font-serif font-bold uppercase">{project.units} Slots</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-gray-100 font-serif italic text-4xl group-hover:text-luxury-gold/20 transition-colors duration-700">0{idx + 1}</div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            <BankPartners />

            {/* CTA SECTION */}
            <div className="container mx-auto px-6 py-40 border-t border-gray-100">
                <div className="bg-gray-50 rounded-[4rem] p-20 md:p-32 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-luxury-gold/5 via-transparent to-transparent opacity-50" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="relative z-10"
                    >
                        <LeadForm />
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Projects;
