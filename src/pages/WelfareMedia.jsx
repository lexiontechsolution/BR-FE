import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, Video, ArrowLeft, Heart, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';

const WelfareMedia = () => {
    const galleryImages = [
        {
            url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800',
            title: 'Educational Kit Distribution',
            category: 'Education'
        },
        {
            url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
            title: 'Community Support Program',
            category: 'Welfare'
        },
        {
            url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800',
            title: 'School Infrastructure Support',
            category: 'Infrastructure'
        },
        {
            url: 'https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=800',
            title: 'Student Excellence Awards',
            category: 'Recognition'
        },
        {
            url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
            title: 'Vocational Training Initiative',
            category: 'Skill Building'
        },
        {
            url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800',
            title: 'Youth Mentorship Camp',
            category: 'Mentorship'
        }
    ];

    const youtubeVideos = [
        {
            id: '9l1vdrp98kA',
            title: 'Our Social Responsibility',
            desc: 'A glimpse into our commitment to social welfare and community development.'
        },
        {
            id: 'hmYV3wr6PR4',
            title: 'Empowering Communities',
            desc: 'How we make a difference through our dedicated community outreach programs.'
        }
    ];

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* HERO / HEADER */}
            <section className="pt-32 pb-20 bg-luxury-black-deep text-white relative overflow-hidden">
                 <div className="absolute inset-0 opacity-20">
                    <img 
                        src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2000" 
                        className="w-full h-full object-cover"
                        alt="Background" 
                    />
                </div>
                <div className="container mx-auto px-6 relative z-10">
                    <Link to="/history" className="inline-flex items-center gap-2 text-luxury-gold hover:text-white transition-colors mb-12 group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] font-outfit font-black uppercase tracking-[0.3em]">Back to History</span>
                    </Link>
                    
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-black italic tracking-tighter mb-6">
                            Community <span className="text-luxury-gold text-5xl md:text-7xl">Impact.</span>
                        </h1>
                        <p className="text-white/60 font-outfit max-w-xl text-lg leading-relaxed">
                            Visual journey of our commitment to society and the 
                            lives we've touched through Milestone Welfare Initiatives.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* VIDEO GALLERY */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <div className="flex items-center gap-4 mb-12">
                        <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                            <Video size={20} />
                        </div>
                        <h2 className="text-3xl font-serif font-black italic tracking-tight">Featured Films.</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {youtubeVideos.map((video, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="group"
                            >
                                <div className="relative aspect-video rounded-[2rem] overflow-hidden bg-gray-100 shadow-2xl mb-6">
                                    <iframe 
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${video.id}`}
                                        title={video.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <h3 className="text-2xl font-serif font-black mb-2 group-hover:text-luxury-gold transition-colors">{video.title}</h3>
                                <p className="text-gray-500 font-outfit text-sm leading-relaxed">{video.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* IMAGE GALLERY - MASONRY/BENTO FEEL */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between gap-4 mb-16">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold">
                                <ImageIcon size={20} />
                            </div>
                            <h2 className="text-3xl font-serif font-black italic tracking-tight">Action in Frames.</h2>
                        </div>
                        <div className="hidden md:flex gap-8 text-[10px] font-outfit uppercase tracking-[0.2em] font-black text-gray-400">
                             <span>#CSR</span>
                             <span>#Education</span>
                             <span>#Community</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {galleryImages.map((img, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="group relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-lg"
                            >
                                <img 
                                    src={img.url} 
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                                    <span className="text-luxury-gold text-[10px] font-outfit font-black uppercase tracking-[0.2em] mb-2">{img.category}</span>
                                    <h4 className="text-white text-xl font-serif font-black italic">{img.title}</h4>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CLOSING STATS */}
            <section className="py-32 bg-white text-center">
                 <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 max-w-4xl mx-auto">
                        <div className="space-y-2">
                             <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mx-auto mb-4">
                                <Users size={24} />
                             </div>
                             <p className="text-4xl font-serif font-black">1000+</p>
                             <p className="text-[10px] font-outfit uppercase tracking-widest text-gray-400">Students</p>
                        </div>
                        <div className="space-y-2">
                             <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mx-auto mb-4">
                                <GraduationCap size={24} />
                             </div>
                             <p className="text-4xl font-serif font-black">50+</p>
                             <p className="text-[10px] font-outfit uppercase tracking-widest text-gray-400">Schools</p>
                        </div>
                        <div className="space-y-2">
                             <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mx-auto mb-4">
                                <Heart size={24} />
                             </div>
                             <p className="text-4xl font-serif font-black">15+</p>
                             <p className="text-[10px] font-outfit uppercase tracking-widest text-gray-400">Years</p>
                        </div>
                        <div className="space-y-2">
                             <div className="w-12 h-12 rounded-full bg-luxury-gold/10 flex items-center justify-center text-luxury-gold mx-auto mb-4">
                                <ImageIcon size={24} />
                             </div>
                             <p className="text-4xl font-serif font-black">500+</p>
                             <p className="text-[10px] font-outfit uppercase tracking-widest text-gray-400">Impact Stories</p>
                        </div>
                    </div>
                 </div>
            </section>
        </div>
    );
};

export default WelfareMedia;
