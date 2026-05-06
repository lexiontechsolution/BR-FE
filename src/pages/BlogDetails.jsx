import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Calendar, Tag, Share2, Facebook, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import api from '../utils/api';

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await api.get(`/blogs/${id}`);
                setBlog(res.data);
            } catch (err) {
                console.error("Story decryption failed.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlog();
        window.scrollTo(0, 0);
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center font-serif italic text-3xl text-gray-200">Retrieving Story...</div>;
    
    if (!blog) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <h2 className="text-4xl font-serif font-black mb-6 text-luxury-black text-left">Story Not Found</h2>
            <Link to="/blog" className="btn-luxury px-10 py-5">RETURN TO STORIES</Link>
        </div>
    );

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black pb-32">
            {/* Navigation / Header */}
            <div className="fixed top-24 left-6 md:left-12 z-[60]">
                <Link to="/blog" className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/10 backdrop-blur-md border border-gray-100 flex items-center justify-center text-luxury-black hover:bg-luxury-gold hover:text-black transition-all shadow-xl group">
                    <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* HERO SECTION */}
            <header className="relative h-[60vh] md:h-[75vh] overflow-hidden">
                <div className="absolute inset-0">
                    <img 
                        src={blog.image} 
                        className="w-full h-full object-cover" 
                        alt={blog.title} 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-luxury-black/20 to-transparent" />
                </div>
                
                <div className="absolute bottom-16 md:bottom-24 left-0 w-full">
                    <div className="container mx-auto px-6 md:px-12">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="max-w-4xl"
                        >
                            <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8">
                                <div className="px-4 py-2 bg-luxury-gold text-black rounded-full text-[9px] font-outfit font-black tracking-[0.3em] uppercase">
                                    {blog.category}
                                </div>
                                <div className="flex items-center gap-3 text-white text-[10px] font-outfit font-black tracking-widest uppercase">
                                    <Calendar size={14} className="text-luxury-gold" />
                                    {new Date(blog.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-serif font-black text-luxury-black mb-8 tracking-tighter leading-[0.95] italic text-left">
                                {blog.title}
                            </h1>
                        </motion.div>
                    </div>
                </div>
            </header>

            {/* ARTICLE CONTENT */}
            <article className="container mx-auto px-6 md:px-12 mt-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Meta Sidebar - Left */}
                    <aside className="lg:col-span-3 lg:border-r border-gray-100 pr-12 hidden lg:block">
                        <div className="sticky top-40 space-y-12 text-left">
                             <div className="space-y-4">
                                <p className="text-[10px] font-outfit font-black text-gray-300 uppercase tracking-widest">Story Curator</p>
                                <div className="flex items-center gap-4">
                                     <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center font-serif text-luxury-gold text-xl bg-luxury-gold/5 italic">
                                         {blog.author?.[0] || 'A'}
                                     </div>
                                     <div className="text-left font-serif font-bold italic text-lg leading-none">{blog.author || 'Director'}</div>
                                </div>
                             </div>

                             <div className="space-y-6">
                                <p className="text-[10px] font-outfit font-black text-gray-300 uppercase tracking-widest">Syndicate</p>
                                <div className="flex flex-col gap-4">
                                    {[
                                        { icon: Facebook, name: 'Facebook' },
                                        { icon: Twitter, name: 'Twitter' },
                                        { icon: Linkedin, name: 'LinkedIn' }
                                    ].map((social, idx) => (
                                        <button key={idx} className="flex items-center gap-4 text-[9px] font-outfit font-black tracking-widest text-gray-400 hover:text-luxury-gold transition-colors uppercase">
                                            <social.icon size={16} /> {social.name}
                                        </button>
                                    ))}
                                </div>
                             </div>

                             <div className="space-y-6 pt-12 border-t border-gray-50">
                                <Tag className="text-luxury-gold" size={24} />
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-gray-50 rounded-full text-[8px] font-outfit font-black text-gray-500 uppercase tracking-widest">#MilestoneLegacy</span>
                                    <span className="px-3 py-1 bg-gray-50 rounded-full text-[8px] font-outfit font-black text-gray-500 uppercase tracking-widest">#SouthIndiaEstates</span>
                                </div>
                             </div>
                        </div>
                    </aside>

                    {/* Body Content - Right */}
                    <div className="lg:col-span-8 text-left">
                        <div className="max-w-3xl">
                            {/* Abstract/Excerpt */}
                            <p className="text-2xl md:text-3xl font-serif font-black italic text-gray-400 mb-16 leading-relaxed border-l-4 border-luxury-gold pl-8">
                                "{blog.excerpt}"
                            </p>

                            {/* Main Narrative */}
                            <div className="prose prose-xl prose-stone max-w-none text-left">
                                {blog.content.split('\n').filter(p => p.trim() !== '').map((para, i) => (
                                    <p key={i} className="text-lg md:text-xl font-outfit text-gray-600 leading-[1.8] mb-10">
                                        {para}
                                    </p>
                                ))}
                            </div>

                            {/* Additional Gallery Images */}
                            {blog.images && blog.images.length > 0 && (
                                <div className="mt-20 space-y-8">
                                    <h4 className="text-2xl font-serif font-black italic mb-8">Visual Chapters.</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {blog.images.map((img, idx) => (
                                            <motion.div 
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="aspect-[4/3] rounded-[2rem] overflow-hidden shadow-xl"
                                            >
                                                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* CTA / Next Story */}
                            <div className="mt-32 p-12 md:p-20 bg-gray-50 rounded-[3.5rem] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-luxury-gold/5 blur-[80px] rounded-full" />
                                <div className="relative z-10 text-center md:text-left">
                                     <MessageSquare className="text-luxury-gold mb-8 mx-auto md:mx-0" size={32} />
                                     <h4 className="text-3xl md:text-4xl font-serif font-black italic mb-6">Dialogue with Milestone.</h4>
                                     <p className="text-gray-500 font-outfit text-lg mb-10 max-w-xl">
                                         Interested in the topics discussed above? Consult with our advisors to see 
                                         how these trends impact your investment portfolio.
                                     </p>
                                     <Link to="/contact" className="btn-luxury px-12 py-6 inline-flex items-center gap-4 text-xs tracking-widest">
                                         INITIATE CONSULTATION <Share2 size={16} />
                                     </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {/* RELATED READS (Optional Suggestion) */}
            <div className="container mx-auto px-6 md:px-12 mt-40">
                 <div className="flex justify-between items-end mb-16">
                     <h2 className="text-4xl font-serif font-black italic">Continued Reading.</h2>
                     <Link to="/blog" className="text-[10px] font-outfit font-black text-luxury-gold border-b border-luxury-gold/30 hover:text-luxury-black transition-colors uppercase tracking-widest mb-2">Full Archive</Link>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 text-left">
                     {/* We could fetch 3 random blogs here if needed */}
                 </div>
            </div>
        </div>
    );
};

export default BlogDetails;
