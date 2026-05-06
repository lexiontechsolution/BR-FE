import { motion } from 'framer-motion';
import { Search, Calendar, User, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';
import api from '../utils/api';

const Blog = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await api.get('/blogs');
                setBlogPosts(res.data);
            } catch (err) {
                console.error("Failed to fetch stories.");
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    return (
        <div className="bg-white min-h-screen text-luxury-black selection:bg-luxury-gold selection:text-black">
            {/* HERO SECTION */}
            <section className="pt-40 pb-20 bg-luxury-black-deep text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <img 
                        src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=2000" 
                        className="w-full h-full object-cover"
                        alt="Background" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-luxury-black-deep via-transparent to-luxury-black-deep" />
                </div>
                
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center justify-center gap-4 mb-6">
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                            <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Insights & News</span>
                            <span className="w-12 h-[1px] bg-luxury-gold" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-black italic tracking-tighter mb-8 leading-none">
                            Our <span className="text-gold-gradient not-italic">Stories.</span>
                        </h1>
                        <p className="text-white/60 font-outfit max-w-2xl mx-auto text-lg leading-relaxed">
                            Deep dives into real estate, community welfare, and the 
                            future of Milestone Land Developers across South India.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* SEARCH & FILTERS */}
            <section className="py-12 bg-gray-50 border-y border-gray-100">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="relative w-full md:w-96">
                        <input 
                            type="text" 
                            placeholder="Search articles..." 
                            className="w-full bg-white border border-gray-200 rounded-full px-8 py-4 pl-14 font-outfit text-sm focus:outline-none focus:border-luxury-gold transition-all"
                        />
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                    
                    <div className="flex gap-6 text-[10px] font-outfit font-black uppercase tracking-widest text-gray-400">
                        {['All', 'Market', 'Welfare', 'Guide', 'News'].map((cat, i) => (
                            <button key={i} className="hover:text-luxury-gold transition-colors">{cat}</button>
                        ))}
                    </div>
                </div>
            </section>

            {/* BLOG GRID */}
            <section className="py-32 bg-white">
                <div className="container mx-auto px-6">
                    {loading ? (
                        <div className="py-20 text-center text-gray-300 font-serif italic text-2xl">Accessing archives...</div>
                    ) : blogPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {blogPosts.map((post, i) => (
                                <Link to={`/blog/${post._id}`} key={i}>
                                    <motion.article 
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="group"
                                    >
                                        <div className="aspect-[16/10] rounded-[2.5rem] overflow-hidden mb-8 relative shadow-2xl shadow-gray-200">
                                            <img 
                                                src={post.image} 
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                                            />
                                            <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur rounded-full text-[9px] font-outfit font-black tracking-widest uppercase">
                                                {post.category}
                                            </div>
                                        </div>
                                        
                                        <div className="flex items-center gap-6 mb-4 text-[10px] font-outfit font-bold text-gray-400 uppercase tracking-widest">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={12} className="text-luxury-gold" />
                                                {new Date(post.date).toLocaleDateString()}
                                            </div>
                                            <div className="flex items-center gap-2 text-left">
                                                <User size={12} className="text-luxury-gold" />
                                                {post.author}
                                            </div>
                                        </div>
                                        
                                        <h3 className="text-2xl font-serif font-black mb-4 group-hover:text-luxury-gold transition-colors leading-tight text-left">
                                            {post.title}
                                        </h3>
                                        
                                        <p className="text-gray-500 font-outfit text-sm leading-relaxed mb-8 line-clamp-2 text-left">
                                            {post.excerpt}
                                        </p>
                                        
                                        <div className="inline-flex items-center gap-3 text-[10px] font-outfit font-black tracking-widest uppercase group-hover:translate-x-2 transition-transform">
                                            READ ARTICLE
                                            <ArrowRight size={14} className="text-luxury-gold" />
                                        </div>
                                        
                                        <div className="w-full h-[1px] bg-gray-100 mt-10 group-hover:bg-luxury-gold transition-colors" />
                                    </motion.article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-gray-300 font-serif italic text-2xl">No stories published yet. Stay tuned.</div>
                    )}
                    
                    <div className="mt-20 text-center">
                        <button className="bg-luxury-black text-white px-12 py-5 rounded-full text-[11px] font-outfit font-black tracking-widest hover:bg-luxury-gold hover:text-black transition-all shadow-xl">
                            LOAD MORE ARTICLES
                        </button>
                    </div>
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <div className="bg-luxury-black-deep rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-luxury-gold/10 blur-[100px] rounded-full" />
                        <div className="relative z-10 max-w-2xl mx-auto">
                            <Tag className="text-luxury-gold mx-auto mb-8" size={32} />
                            <h2 className="text-4xl md:text-6xl font-serif font-black text-white italic tracking-tighter mb-8">
                                Stay <span className="text-gold-gradient not-italic">Updated.</span>
                            </h2>
                            <p className="text-white/40 font-outfit mb-12">
                                Join our inner circle to receive exclusive property listings, 
                                market reports, and welfare updates directly in your inbox.
                            </p>
                            
                            <form className="flex flex-col md:flex-row gap-4">
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="flex-grow bg-white/5 border border-white/10 rounded-full px-10 py-5 text-white font-outfit focus:outline-none focus:border-luxury-gold"
                                />
                                <button className="bg-luxury-gold text-black px-12 py-5 rounded-full font-outfit font-black text-[11px] tracking-widest hover:bg-white transition-all uppercase">
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blog;
