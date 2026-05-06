import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Globe, ArrowLeft, Send, Sparkles, Building2, LayoutGrid, Calendar, Download, ArrowUpRight } from 'lucide-react';
import api from '../utils/api';

const ProjectDetails = ({ onOpenEnquiry }) => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                const res = await api.get(`/projects/${id}`);
                setProject(res.data);
            } catch (err) {
                console.error("Failed to fetch project details.");
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white">
            <div className="w-16 h-16 border-4 border-luxury-gold border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="font-outfit font-black tracking-widest text-luxury-gold uppercase text-xs">Loading Artifact...</p>
        </div>
    );

    if (!project) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
            <h2 className="text-4xl font-serif font-black mb-6 text-luxury-black">Project Not Found</h2>
            <p className="text-gray-500 mb-8 max-w-md">The requested architectural artifact could not be located in our repository.</p>
            <Link to="/projects" className="btn-luxury px-10 py-5">RETURN TO PROJECTS</Link>
        </div>
    );

    const getMediaInfo = (url) => {
        if (!url) return { type: 'image' };
        
        // YouTube
        const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
        const ytMatch = url.match(ytRegex);
        if (ytMatch) return { type: 'youtube', id: ytMatch[1] };

        // Instagram
        const igRegex = /instagram\.com\/(?:p|reels|reel)\/([^\/?#&]+)/;
        const igMatch = url.match(igRegex);
        if (igMatch) return { type: 'instagram', id: igMatch[1] };

        return { type: 'image' };
    };

    const mediaItems = (project.images || []).map(img => ({
        url: img,
        ...getMediaInfo(img)
    }));

    const images = mediaItems.filter(item => item.type === 'image');
    const videos = mediaItems.filter(item => item.type !== 'image');

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* Navigation */}
            <div className="fixed top-24 left-4 md:left-10 z-[60]">
                <Link to="/projects" className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/80 backdrop-blur-md border border-gray-100 flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-black transition-all shadow-xl group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* HERO SECTION */}
            <section className="relative h-[70vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400" 
                        className="w-full h-full object-cover" 
                        alt="Background" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-luxury-black/40 to-luxury-black/20" />
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-10 md:p-20 container mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl"
                    >
                         <div className="flex items-center gap-4 mb-6">
                            <div className="h-[1px] w-12 bg-luxury-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"></div>
                            <span className="text-luxury-gold text-xs font-outfit font-black tracking-[0.4em] uppercase drop-shadow-md">{project.status}</span>
                        </div>
                        <h1 className="text-5xl md:text-9xl font-serif font-black text-white mb-8 tracking-tighter leading-none drop-shadow-2xl">
                            {project.title}
                        </h1>
                        <div className="flex flex-wrap items-center gap-8 text-white/90 font-outfit font-black tracking-widest text-sm uppercase drop-shadow-lg">
                            <div className="flex items-center gap-2">
                                <MapPin className="text-luxury-gold" size={20} /> {project.city}
                            </div>
                            {project.units && (
                                <div className="flex items-center gap-2">
                                    <Building2 className="text-luxury-gold" size={20} /> {project.units} Units
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* KEY HIGHLIGHTS BAR */}
            <section className="relative z-10 -mt-16 container mx-auto px-6">
                <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-12 grid grid-cols-1 md:grid-cols-4 gap-8 md:divide-x divide-gray-100">
                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-outfit font-black text-gray-400 uppercase tracking-widest">Project Status</span>
                        <span className="text-xl font-serif font-black italic text-luxury-gold">{project.status}</span>
                    </div>
                    <div className="flex flex-col gap-2 md:pl-8">
                        <span className="text-[10px] font-outfit font-black text-gray-400 uppercase tracking-widest">Location</span>
                        <span className="text-xl font-serif font-black italic">{project.city}</span>
                    </div>
                    <div className="flex flex-col gap-2 md:pl-8">
                        <span className="text-[10px] font-outfit font-black text-gray-400 uppercase tracking-widest">Pricing Strategy</span>
                        <div className="flex items-baseline gap-3">
                            <span className="text-2xl font-serif font-black italic">₹{project.mldPrice || 'TBA'}</span>
                            {project.marketPrice && (
                                <span className="text-sm text-gray-400 line-through">₹{project.marketPrice}</span>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 md:pl-8">
                        <span className="text-[10px] font-outfit font-black text-gray-400 uppercase tracking-widest">Total Units</span>
                        <span className="text-xl font-serif font-black italic">{project.units || 'Exclusive'}</span>
                    </div>
                </div>
            </section>

            {/* VIDEO SECTION - HORIZONTAL SCROLL */}
            {videos.length > 0 && (
                <section className="py-24 bg-luxury-black text-white overflow-hidden">
                    <div className="container mx-auto px-6 md:px-12 mb-16">
                        <div className="flex items-center gap-4">
                            <span className="text-luxury-gold text-xs font-outfit font-black tracking-[0.4em] uppercase">Cinema & Media</span>
                            <div className="h-[1px] flex-grow bg-white/10"></div>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-black italic mt-4">Visual Narratives<span className="text-luxury-gold">.</span></h2>
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
                                        title={`${project.title} Video ${i + 1}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                ) : (
                                    <iframe 
                                        className="w-full h-full"
                                        src={`https://www.instagram.com/p/${video.id}/embed`}
                                        title={`${project.title} Instagram ${i + 1}`}
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
            <section className="py-24 md:py-40 container mx-auto px-6 md:px-12">
                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                     {/* Left: Description */}
                     <div className="lg:col-span-8 space-y-12">
                         <div className="space-y-6">
                            <h2 className="text-[10px] font-outfit font-black tracking-[0.6em] text-luxury-gold uppercase">Project Narrative</h2>
                            <h3 className="text-3xl md:text-5xl font-serif font-black leading-tight">
                                Crafting a legacy of <span className="italic text-luxury-gold">unparalleled</span> excellence.
                            </h3>
                            <div className="h-1 w-20 bg-luxury-gold rounded-full"></div>
                         </div>
                         
                         <p className="text-lg md:text-xl font-outfit text-gray-600 leading-relaxed text-justify whitespace-pre-line">
                            {project.description || "Every masterpiece begins with a vision. This project embodies our commitment to architectural excellence and sustainable living, creating a sanctuary where luxury meets functionality."}
                         </p>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10">
                             <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                                 <Sparkles className="text-luxury-gold" size={32} />
                                 <h4 className="font-serif font-black text-xl italic">Premium Specifications</h4>
                                 <p className="text-sm text-gray-500 font-outfit leading-relaxed">
                                     Designed with meticulously curated materials and state-of-the-art infrastructure.
                                 </p>
                             </div>
                             <div className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 space-y-4">
                                 <LayoutGrid className="text-luxury-gold" size={32} />
                                 <h4 className="font-serif font-black text-xl italic">Architectural Integrity</h4>
                                 <p className="text-sm text-gray-500 font-outfit leading-relaxed">
                                     A harmonious blend of modern aesthetics and traditional craftsmanship.
                                 </p>
                             </div>
                         </div>
                     </div>

                     {/* Right: Quick Info Sidebar */}
                     <div className="lg:col-span-4">
                         <div className="sticky top-32 space-y-8">
                             <div className="p-10 bg-luxury-black rounded-[3rem] text-white space-y-8 shadow-2xl relative overflow-hidden">
                                 <div className="absolute top-0 right-0 w-32 h-32 bg-luxury-gold/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                 
                                 <h4 className="text-2xl font-serif font-black italic">Investment Profile</h4>
                                 
                                 <div className="space-y-6">
                                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                         <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Launch Price</span>
                                         <span className="font-serif font-black text-luxury-gold text-lg">₹{project.mldPrice || 'TBA'}</span>
                                     </div>
                                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                         <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Market Value</span>
                                         <span className="font-serif font-black text-gray-400 line-through">₹{project.marketPrice || 'N/A'}</span>
                                     </div>
                                     <div className="flex justify-between items-center border-b border-white/10 pb-4">
                                         <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Total Units</span>
                                         <span className="font-serif font-black uppercase">{project.units || 'Limited'}</span>
                                     </div>
                                     <div className="flex justify-between items-center">
                                         <span className="text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">Type</span>
                                         <span className="font-serif font-black uppercase">Land Development</span>
                                     </div>
                                 </div>

                                 <button 
                                    onClick={onOpenEnquiry}
                                    className="w-full py-5 bg-luxury-gold hover:bg-luxury-gold-dark text-black rounded-full font-outfit font-black text-[10px] tracking-[0.3em] uppercase transition-all shadow-lg flex items-center justify-center gap-3"
                                 >
                                     REQUEST DOSSIER <Send size={16} />
                                 </button>

                                 {project.documents && project.documents.length > 0 && (
                                    <div className="pt-8 border-t border-white/10 space-y-4 text-left">
                                        <h5 className="text-[10px] font-outfit font-black uppercase tracking-widest text-luxury-gold">Technical Documents</h5>
                                        <div className="space-y-3">
                                            {project.documents.map((doc, i) => (
                                                <a 
                                                    key={i}
                                                    href={doc.url} 
                                                    download={doc.title}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all border border-white/5 group"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-luxury-gold/20 text-luxury-gold rounded-lg">
                                                            <Download size={14} />
                                                        </div>
                                                        <span className="text-[10px] font-outfit font-bold truncate max-w-[150px]">{doc.title}</span>
                                                    </div>
                                                    <ArrowUpRight size={14} className="text-gray-500 group-hover:text-luxury-gold transition-colors" />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                             </div>
                         </div>
                     </div>
                 </div>
            </section>

            {/* IMAGE GALLERY */}
            {images.length > 0 && (
                <section className="py-24 md:py-40 bg-gray-50">
                    <div className="container mx-auto px-6 md:px-12">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                            <div className="space-y-4">
                                <h2 className="text-[10px] font-outfit font-black tracking-[0.6em] text-luxury-gold uppercase">Visual Gallery</h2>
                                <h3 className="text-4xl md:text-6xl font-serif font-black italic">Perspective & <span className="text-luxury-gold">Detail.</span></h3>
                            </div>
                            <p className="text-gray-400 font-outfit max-w-sm">
                                Explore the architectural nuances and landscape design of this exceptional development.
                            </p>
                        </div>
                        
                        <div className="columns-1 md:columns-2 gap-12 space-y-12">
                            {images.map((img, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 group relative"
                                >
                                    <img 
                                        src={img.url} 
                                        alt={`${project.title} - view ${i + 1}`} 
                                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-1000" 
                                    />
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white">
                                            <Sparkles size={24} />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* EXTERNAL LINKS & CTA */}
            <section className="py-32 md:py-60 container mx-auto px-6 md:px-12 text-center relative overflow-hidden">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-gold/5 rounded-full blur-[120px] -z-10"></div>
                 
                 <div className="max-w-4xl mx-auto space-y-12">
                     <h2 className="text-5xl md:text-8xl font-serif font-black italic tracking-tighter">Your future <span className="text-luxury-gold">awaits.</span></h2>
                     <p className="text-gray-500 font-outfit text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                         Begin your journey with MLD Estates. Our advisors are ready to provide 
                         comprehensive technical specifications and investment consultation.
                     </p>
                     
                     <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                         <button 
                            onClick={onOpenEnquiry}
                            className="bg-luxury-black text-white px-12 py-6 rounded-full font-outfit font-black text-[10px] tracking-[0.4em] uppercase hover:bg-luxury-gold hover:text-black transition-all shadow-2xl flex items-center gap-4"
                        >
                             INQUIRE PRIVATELY <Send size={16} />
                         </button>
                         {project.socialLink && (
                             <a 
                                href={project.socialLink} 
                                target="_blank" 
                                className="px-12 py-6 border-2 border-gray-100 rounded-full font-outfit font-black text-[10px] tracking-[0.4em] uppercase hover:border-luxury-gold hover:text-luxury-gold transition-all flex items-center gap-4"
                             >
                                 VIEW CHANNEL <Globe size={16} />
                             </a>
                         )}
                     </div>
                 </div>
            </section>
        </div>
    );
};

export default ProjectDetails;
