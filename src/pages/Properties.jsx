import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LeadForm from '../components/LeadForm';
import BankPartners from '../components/BankPartners';
import { Heart, Search, BedDouble, Bath, Square, MapPin, SlidersHorizontal, ArrowRight, Sparkles } from 'lucide-react';
import api from '../utils/api';

const Properties = ({ onOpenEnquiry }) => {
    const [filter, setFilter] = useState('All');
    const [wishlist, setWishlist] = useState([]);
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const res = await api.get('/api/properties');
                setProperties(res.data);
            } catch (err) {
                console.error("Estate registry synchronization failed.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const toggleWishlist = (id) => {
        setWishlist(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
    };

    const filtered = filter === 'All' ? properties : properties.filter(p => p.type === filter);

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* HERO SECTION - UNIFIED DARK AESTHETIC */}
            <section className="relative h-[60vh] overflow-hidden flex items-center justify-center bg-luxury-black-deep">
                <div className="absolute inset-0 z-0 opacity-40">
                    <img 
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=90&w=2400" 
                        alt="Properties"
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
                            Featured <span className="text-gold-gradient not-italic">Properties.</span>
                        </h1>
                        <p className="text-white/60 text-lg font-outfit max-w-2xl mx-auto leading-relaxed mb-12">
                            A list of the best land developments and properties 
                            available in Tamil Nadu and Kerala for your next home or investment.
                        </p>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-4xl mx-auto"
                        >
                            <div className="relative flex-grow w-full max-w-2xl">
                                 <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-luxury-gold" size={20} />
                                 <input 
                                    type="text" 
                                    placeholder="SEARCH BY LOCATION..." 
                                    className="w-full bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full py-6 pl-20 pr-10 text-xs font-outfit tracking-widest text-white focus:outline-none focus:border-luxury-gold transition-all" 
                                 />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <div className="container mx-auto px-6 md:px-12 py-24">
                {/* Categories */}
                <div className="flex overflow-x-auto pb-12 gap-6 no-scrollbar mb-20">
                     {['All', 'Apartment', 'Villa', 'Plot', 'Commercial'].map((t) => (
                         <button 
                            key={t}
                            onClick={() => setFilter(t)}
                            className={`whitespace-nowrap px-10 py-4 rounded-full text-[10px] font-outfit font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                                filter === t 
                                ? 'bg-luxury-gold text-black border-luxury-gold shadow-xl shadow-luxury-gold/20' 
                                : 'border-gray-100 text-gray-400 hover:text-luxury-black'
                            }`}
                         >
                             {t}
                         </button>
                     ))}
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="py-40 text-center font-serif italic text-4xl text-gray-100 tracking-tighter">Loading Properties...</div>
                ) : (
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((p, idx) => (
                                <motion.div 
                                    layout
                                    key={p._id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ delay: idx * 0.05, duration: 0.8 }}
                                    className="group text-left"
                                >
                                    <div className="bg-white rounded-[3rem] overflow-hidden border border-gray-50 shadow-2xl shadow-gray-200/30 group-hover:-translate-y-4 transition-all duration-700 relative">
                                        <div className="relative aspect-[16/11] overflow-hidden">
                                            <Link to={`/properties/${p._id}`}>
                                                <img 
                                                    src={p.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800'} 
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                                                />
                                            </Link>
                                            <button 
                                                onClick={() => toggleWishlist(p._id)}
                                                className={`absolute top-8 right-8 w-14 h-14 rounded-full backdrop-blur-xl transition-all border border-white/20 flex items-center justify-center z-20 ${wishlist.includes(p._id) ? 'bg-luxury-gold text-black border-luxury-gold shadow-lg shadow-luxury-gold/20' : 'bg-black/10 text-white hover:bg-white/20'}`}
                                            >
                                                <Heart size={20} fill={wishlist.includes(p._id) ? "currentColor" : "none"} />
                                            </button>
                                            <div className="absolute bottom-8 left-8 inline-block px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white font-black text-[9px] tracking-[0.3em] border border-white/20 uppercase">
                                                {p.type}
                                            </div>
                                        </div>
                                        <Link to={`/properties/${p._id}`} className="block p-10">
                                            <div className="flex items-center gap-3 text-luxury-gold font-outfit font-black text-[10px] tracking-[0.3em] uppercase mb-6">
                                                <MapPin size={14} /> {p.location?.toUpperCase()}
                                            </div>
                                            <h3 className="text-4xl font-serif font-black mb-8 group-hover:text-luxury-gold transition-colors tracking-tighter italic">{p.title}</h3>
                                            
                                            <div className="grid grid-cols-3 gap-6 pb-10 border-b border-gray-100 mb-10">
                                                <div className="flex flex-col gap-2">
                                                    <span className="text-[9px] font-black tracking-[0.2em] text-gray-300 uppercase font-outfit">Beds</span>
                                                    <div className="flex items-center gap-2 font-serif font-bold italic text-luxury-black"><BedDouble size={14} className="text-luxury-gold" /> {p.bedrooms || '—'}</div>
                                                </div>
                                                <div className="flex flex-col gap-2 border-x border-gray-100 px-6">
                                                    <span className="text-[9px] font-black tracking-[0.2em] text-gray-300 uppercase font-outfit">Baths</span>
                                                    <div className="flex items-center gap-2 font-serif font-bold italic text-luxury-black"><Bath size={14} className="text-luxury-gold" /> {p.bathrooms || '—'}</div>
                                                </div>
                                                <div className="flex flex-col gap-2 pl-6">
                                                    <span className="text-[9px] font-black tracking-[0.2em] text-gray-300 uppercase font-outfit">Area</span>
                                                    <div className="flex items-center gap-2 font-serif font-bold italic text-luxury-black text-xs whitespace-nowrap"><Square size={14} className="text-luxury-gold" /> {p.sqft?.toLocaleString() || '—'} sq.ft</div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <p className="text-4xl font-serif font-black text-luxury-black italic tracking-tighter">{p.price}</p>
                                                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 group-hover:bg-luxury-gold group-hover:text-black group-hover:border-luxury-gold transition-all duration-500 shadow-sm">
                                                    <ArrowRight size={24} />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
            <BankPartners />
            <LeadForm />
        </div>
    );
};

export default Properties;
