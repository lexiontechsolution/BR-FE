import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ArrowLeft, Send, Sparkles, BedDouble, Bath, Square, Shield, CheckCircle, Download, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';

const PropertyDetails = ({ onOpenEnquiry }) => {
    const { id } = useParams();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const res = await api.get('/properties');
                const found = res.data.find(p => p._id === id);
                setProperty(found);
            } catch (err) {
                console.error("Estate registry access failure.");
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-3xl text-gray-200">Decrypting Estate Dossier...</div>;
    if (!property) return <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-4xl font-serif font-black mb-6 text-luxury-black">Asset Not Found</h2>
        <Link to="/properties" className="btn-luxury px-10 py-5">RETURN TO REGISTRY</Link>
    </div>;

    const specs = [
        { icon: BedDouble, label: 'Bedrooms', val: property.bedrooms || '—' },
        { icon: Bath, label: 'Bathrooms', val: property.bathrooms || '—' },
        { icon: Square, label: 'Territory', val: `${property.sqft?.toLocaleString()} Sq.Ft.` || '—' },
    ];

    const getMediaInfo = (url) => {
        if (!url) return { type: 'image' };
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const ytMatch = url.match(ytRegex);
        if (ytMatch) return { type: 'youtube', id: ytMatch[1] };
        const igRegex = /instagram\.com\/(?:p|reels|reel)\/([^\/?#&]+)/;
        const igMatch = url.match(igRegex);
        if (igMatch) return { type: 'instagram', id: igMatch[1] };
        return { type: 'image' };
    };

    const mediaItems = (property.images || []).map(img => ({
        url: img,
        ...getMediaInfo(img)
    }));

    const images = mediaItems.filter(item => item.type === 'image');
    const videos = mediaItems.filter(item => item.type !== 'image');

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* Navigation */}
            <div className="fixed top-24 left-10 z-[60]">
                <Link to="/properties" className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-gray-100 flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-black transition-all shadow-xl group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* HERO GALLERY */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2400" 
                        className="w-full h-full object-cover" 
                        alt="Background" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-luxury-black/40 to-luxury-black/20" />
                </div>
                
                <div className="absolute bottom-20 left-10 right-10 container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-left"
                    >
                         <div className="flex items-center gap-4 mb-8">
                            <Sparkles className="text-luxury-gold" size={24} />
                            <span className="text-luxury-gold text-xs font-outfit font-black tracking-[0.5em] uppercase drop-shadow-md">{property.type} Protocol — Registry #{property._id?.slice(-6).toUpperCase()}</span>
                        </div>
                        <h1 className="text-6xl md:text-9xl font-serif font-black text-white mb-6 tracking-tighter leading-none italic drop-shadow-2xl">
                            {property.title}
                        </h1>
                        <div className="flex items-center gap-6 text-white/90 font-outfit font-black tracking-widest text-sm uppercase drop-shadow-lg">
                            <MapPin className="text-luxury-gold" size={18} /> {property.location?.toUpperCase()}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SPECS STRIP */}
            <section className="border-b border-gray-100 py-20 bg-gray-50/50">
                 <div className="container mx-auto px-6 md:px-12">
                     <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-center">
                         <div className="text-left">
                             <p className="text-[10px] font-outfit font-black text-gray-400 uppercase tracking-widest mb-2">Acquisition Price</p>
                             <p className="text-5xl font-serif font-black text-luxury-black italic tracking-tighter">{property.price}</p>
                         </div>
                         {specs.map((spec, i) => (
                             <div key={i} className="flex items-center gap-6 border-l border-gray-100 pl-12 h-16">
                                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-luxury-gold shadow-sm">
                                      <spec.icon size={20} />
                                 </div>
                                 <div className="text-left">
                                      <p className="text-[9px] font-black tracking-widest text-gray-400 uppercase font-outfit">{spec.label}</p>
                                      <p className="text-xl font-serif font-bold italic text-luxury-black">{spec.val}</p>
                                 </div>
                             </div>
                         ))}
                     </div>
                 </div>
            </section>

            {/* VIDEO SECTION - HORIZONTAL SCROLL */}
            {videos.length > 0 && (
                <section className="py-24 bg-luxury-black text-white overflow-hidden">
                    <div className="container mx-auto px-6 md:px-12 mb-16 text-left">
                        <div className="flex items-center gap-4">
                            <span className="text-luxury-gold text-xs font-outfit font-black tracking-[0.4em] uppercase">Property Showcase</span>
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black italic mt-4">Estate Films<span className="text-luxury-gold">.</span></h2>
                    </div>

                    <div className="flex gap-8 overflow-x-auto px-6 md:px-12 pb-12 custom-scrollbar snap-x">
                        {videos.map((video, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex-shrink-0 w-[85vw] md:w-[600px] aspect-video rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 snap-center shadow-2xl relative group"
                            >
                                {video.type === 'youtube' ? (
                                    <iframe 
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={`${property.title} Video ${i + 1}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <iframe 
                                        className="w-full h-full"
                                        src={`https://www.instagram.com/p/${video.id}/embed`}
                                        title={`${property.title} Instagram ${i + 1}`}
                                        frameBorder="0"
                                        scrolling="no"
                                        allowTransparency="true"
                                    ></iframe>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </section>
            )}

            {/* CONTENT GRID */}
            <section className="py-32 container mx-auto px-6 md:px-12">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-32">
                     {/* Description */}
                     <div className="lg:col-span-8 space-y-16 text-left">
                         <div className="space-y-8">
                            <h2 className="text-[10px] font-outfit font-black tracking-[0.6em] text-gray-300 uppercase">Estate Dossier</h2>
                            <p className="text-2xl font-outfit text-gray-600 leading-relaxed">
                                {property.description || "This premier architectural asset represents a unique opportunity for strategic acquisition within South India's high-fidelity real estate market. Specifically curated for elite portfolios."}
                            </p>
                         </div>

                         {/* Amenities / Features */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             {[
                                 'Ironclad Title Documentation',
                                 'Strategic Geographical Access',
                                 'Precision Boundary Engineering',
                                 'Landscape Architecture Readiness',
                                 '24/7 Security Integration',
                                 'High-Speed Connectivity Node'
                             ].map((feat, i) => (
                                 <div key={i} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                                     <CheckCircle className="text-luxury-gold" size={18} />
                                     <span className="text-xs font-outfit font-bold tracking-widest uppercase text-gray-500">{feat}</span>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Sidebar CTA */}
                     <div className="lg:col-span-4">
                          <div className="glass-card p-12 bg-white sticky top-32 border-luxury-gold/10">
                              <Shield className="text-luxury-gold mb-8" size={32} />
                              <h3 className="text-3xl font-serif font-black italic mb-6">Secure this Asset.</h3>
                              <p className="text-gray-400 text-sm font-outfit mb-10 leading-relaxed uppercase tracking-widest">
                                  Our acquisition advisors are ready to process your dossier for this unique territory.
                              </p>
                              <div className="space-y-4">
                                  <button 
                                      onClick={onOpenEnquiry}
                                      className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-xs tracking-widest"
                                  >
                                      REQUEST VIEWING <Send size={16} />
                                  </button>

                                  {property.documents && property.documents.length > 0 && (
                                     <div className="pt-6 space-y-3">
                                         {property.documents.map((doc, i) => (
                                             <a 
                                                 key={i}
                                                 href={doc.url} 
                                                 download={doc.title}
                                                 target="_blank"
                                                 rel="noopener noreferrer"
                                                 className="flex items-center justify-between p-4 border border-gray-100 rounded-2xl hover:border-luxury-gold transition-all group"
                                             >
                                                 <div className="flex items-center gap-3">
                                                     <div className="p-2 bg-gray-50 text-luxury-gold rounded-lg">
                                                         <Download size={14} />
                                                     </div>
                                                     <span className="text-[10px] font-outfit font-black uppercase tracking-widest truncate max-w-[150px]">{doc.title}</span>
                                                 </div>
                                                 <ArrowUpRight size={14} className="text-gray-300 group-hover:text-luxury-gold transition-colors" />
                                             </a>
                                         ))}
                                     </div>
                                 )}
                              </div>
                          </div>
                     </div>
                 </div>
            </section>

            {/* GALLERY */}
            {images.length > 0 && (
                <section className="py-32 bg-luxury-black overflow-hidden">
                    <div className="container mx-auto px-6 md:px-12 text-left">
                        <h2 className="text-4xl font-serif font-black mb-20 italic text-white">Visual Artifacts<span className="text-luxury-gold">.</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {images.map((img, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    className="aspect-[4/3] rounded-[2rem] overflow-hidden"
                                >
                                    <img src={img.url} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default PropertyDetails;
