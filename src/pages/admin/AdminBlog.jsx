import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
    Plus, Search, Trash2, Edit, X, Send, 
    BookOpen, Type, FileText, Tag, Upload, 
    Image as ImageIcon, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Investment',
        author: 'Admin',
        image: '',
        images: []
    });
    const [selectedGalleryFiles, setSelectedGalleryFiles] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const res = await api.get('/blogs');
            setBlogs(res.data);
        } catch (err) {
            toast.error("Failed to synchronizing blog registry.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleGalleryChange = (e) => {
        setSelectedGalleryFiles(Array.from(e.target.files));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        Object.keys(formData).forEach(key => {
            data.append(key, formData[key]);
        });

        if (selectedFile) {
            data.append('image', selectedFile);
        }

        if (selectedGalleryFiles.length > 0) {
            selectedGalleryFiles.forEach(file => {
                data.append('images', file);
            });
        }

        try {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            if (editingBlog) {
                await api.put(`/blogs/${editingBlog._id}`, data, config);
                toast.success("Blog entry updated.");
            } else {
                await api.post('/blogs', data, config);
                toast.success("New blog published.");
            }
            setIsModalOpen(false);
            setEditingBlog(null);
            resetForm();
            fetchBlogs();
        } catch (err) {
            toast.error("Protocol failure during transmission.");
        }
    };

    const resetForm = () => {
        setFormData({ title: '', excerpt: '', content: '', category: 'Investment', author: 'Admin', image: '', images: [] });
        setSelectedFile(null);
        setSelectedGalleryFiles([]);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Confirm permanent erasure of this entry?")) return;
        try {
            await api.delete(`/blogs/${id}`);
            toast.success("Entry erased from registry.");
            fetchBlogs();
        } catch (err) {
            toast.error("Erasure unsuccessful.");
        }
    };

    const openModal = (blog = null) => {
        if (blog) {
            setEditingBlog(blog);
            setFormData({ ...blog });
        } else {
            setEditingBlog(null);
            resetForm();
        }
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                     <h2 className="text-3xl font-serif font-black flex items-center gap-4 text-luxury-black">
                        <BookOpen className="text-luxury-gold" size={28} /> Intellectual Repository
                    </h2>
                    <p className="text-[10px] font-outfit font-black tracking-widest text-gray-400 uppercase mt-2">Content Strategy Protocol</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="btn-luxury px-8 py-4 flex items-center gap-3 text-[9px]"
                >
                    <Plus size={16} /> NEW PUBLICATION
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center text-gray-400 font-serif italic text-2xl">Accessing archives...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {blogs.map((blog) => (
                        <motion.div 
                            layout
                            key={blog._id}
                            className="glass-card bg-white border-gray-100 overflow-hidden group shadow-lg shadow-gray-100/20"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black font-outfit uppercase tracking-widest text-luxury-black">
                                    {blog.category}
                                </div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-serif font-bold text-luxury-black mb-4 line-clamp-2">{blog.title}</h3>
                                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(blog)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(blog._id)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-300 text-[10px] font-outfit uppercase tracking-tighter">
                                        <Calendar size={12} /> {new Date(blog.date).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-luxury-black-deep/60 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="w-full max-w-4xl bg-white rounded-[2rem] overflow-hidden relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <div className="p-12">
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-3xl font-serif font-black italic">{editingBlog ? 'Modify' : 'New'} Publication</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Publication Title</label>
                                        <div className="relative">
                                            <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                                            <input 
                                                required
                                                type="text" 
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                                placeholder="The Future of Southern Corridors..."
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2 text-left">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Category Tag</label>
                                            <div className="relative">
                                                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                                                <select 
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none appearance-none"
                                                >
                                                    <option value="Investment">Investment</option>
                                                    <option value="Sustainability">Sustainability</option>
                                                    <option value="Lifestyle">Lifestyle</option>
                                                    <option value="Milestones">Milestones</option>
                                                    <option value="Market">Market News</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2 text-left">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Author Initial</label>
                                            <input 
                                                type="text" 
                                                value={formData.author}
                                                onChange={(e) => setFormData({...formData, author: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Narrative Excerpt (Brief Summary)</label>
                                        <textarea 
                                            rows="2"
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none resize-none" 
                                            placeholder="A short summary for the preview cards..."
                                        />
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Primary Cover Visual</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <label className="border-2 border-dashed border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all text-gray-400 hover:text-luxury-gold">
                                                <Upload size={32} />
                                                <div className="text-center">
                                                    <span className="text-[10px] font-black uppercase tracking-widest block">Upload Visual Artifact</span>
                                                    <span className="text-[8px] opacity-60">PNG, JPG up to 5MB</span>
                                                </div>
                                                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                                            </label>
                                            <div className="rounded-2xl bg-gray-50 relative group border border-gray-100 overflow-hidden flex items-center justify-center">
                                                {selectedFile || formData.image ? (
                                                    <img src={selectedFile ? URL.createObjectURL(selectedFile) : formData.image} className="w-full h-full object-cover" alt="preview" />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2 text-gray-300">
                                                        <ImageIcon size={40} />
                                                        <span className="text-[8px] font-black tracking-widest uppercase">No Visual Assigned</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400 block text-left">Gallery Visuals (Additional Images)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            <label className="aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all text-gray-400 hover:text-luxury-gold">
                                                <Upload size={24} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Select</span>
                                                <input type="file" multiple onChange={handleGalleryChange} className="hidden" accept="image/*" />
                                            </label>
                                            
                                            {/* Preview Newly Selected Files */}
                                            {selectedGalleryFiles.map((file, idx) => (
                                                <div key={`new-${idx}`} className="aspect-square rounded-2xl bg-gray-50 relative group border border-gray-100 overflow-hidden">
                                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="upload preview" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => {
                                                            const newFiles = [...selectedGalleryFiles];
                                                            newFiles.splice(idx, 1);
                                                            setSelectedGalleryFiles(newFiles);
                                                        }}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Preview Existing Images */}
                                            {formData.images?.map((img, idx) => (
                                                <div key={`existing-${idx}`} className="aspect-square rounded-2xl bg-gray-50 relative group border border-gray-100 overflow-hidden">
                                                    <img src={img} className="w-full h-full object-cover" alt="existing gallery" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <span className="text-[8px] text-white font-black tracking-widest uppercase">Existing</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Editorial Content</label>
                                        <textarea 
                                            rows="8"
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({...formData, content: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none resize-none custom-scrollbar" 
                                            placeholder="Write your full article here..."
                                        />
                                    </div>

                                    <button type="submit" className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-[10px] tracking-[0.5em] font-black">
                                        {editingBlog ? 'UPDATE PUBLICATION' : 'PUBLISH ENTRY'} <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminBlog;
