import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
    Plus, Search, Filter, Trash2, Edit, CheckCircle, Info, 
    X, Send, Building2, MapPin, Clock, LayoutGrid, Globe, Upload, Video, Image as ImageIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        status: 'Ongoing',
        marketPrice: '',
        mldPrice: '',
        isHeroFeatured: false,
        images: [''],
        documents: [],
        socialLink: '',
        description: '',
        completedDate: '',
        units: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            toast.error("Failed to load artifacts.");
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    };

    const removeSelectedFile = (index) => {
        const newFiles = [...selectedFiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles);
    };

    const handleDocChange = (e) => {
        setSelectedDocs([...selectedDocs, ...Array.from(e.target.files)]);
    };

    const removeSelectedDoc = (index) => {
        const newDocs = [...selectedDocs];
        newDocs.splice(index, 1);
        setSelectedDocs(newDocs);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        
        // Append text fields
        Object.keys(formData).forEach(key => {
            if (key !== 'images' && key !== 'documents') {
                data.append(key, formData[key]);
            }
        });

        // Append existing image URLs
        formData.images.forEach(img => {
            if (img) data.append('images[]', img);
        });

        // Append existing document objects (as JSON)
        data.append('documentsData', JSON.stringify(formData.documents || []));

        // Append newly selected image files
        selectedFiles.forEach(file => {
            data.append('images', file);
        });

        // Append newly selected document files
        selectedDocs.forEach(file => {
            data.append('documents', file);
        });

        try {
            if (editingProject) {
                await api.patch(`/projects/${editingProject._id}`, data);
                toast.success("Artifact updated.");
            } else {
                await api.post('/projects', data);
                toast.success("New project archived.");
            }
            setIsModalOpen(false);
            setEditingProject(null);
            resetForm();
            fetchProjects();
        } catch (err) {
            toast.error("Transmission error.");
        }
    };

    const resetForm = () => {
        setFormData({ 
            title: '', 
            city: '', 
            status: 'Ongoing', 
            marketPrice: '', 
            mldPrice: '', 
            isHeroFeatured: false, 
            images: [''], 
            documents: [],
            socialLink: '', 
            description: '', 
            completedDate: '', 
            units: '' 
        });
        setSelectedFiles([]);
        setSelectedDocs([]);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Permanent erasure confirmed?")) return;
        try {
            await api.delete(`/projects/${id}`);
            toast.success("Artifact erased.");
            fetchProjects();
        } catch (err) {
            toast.error("Erasure failed.");
        }
    };

    const openModal = (project = null) => {
        if (project) {
            setEditingProject(project);
            setFormData({ 
                ...project, 
                images: project.images?.length > 0 ? project.images : [''],
                socialLink: project.socialLink || '',
                marketPrice: project.marketPrice || '',
                mldPrice: project.mldPrice || '',
                isHeroFeatured: project.isHeroFeatured || false
            });
        } else {
            setEditingProject(null);
            resetForm();
        }
        setIsModalOpen(true);
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData({ ...formData, images: newImages });
    };

    const addImageField = () => {
        setFormData({ ...formData, images: [...formData.images, ''] });
    };

    return (
        <div className="space-y-12">
            <div className="flex justify-between items-end">
                <div>
                     <h2 className="text-3xl font-serif font-black flex items-center gap-4 text-luxury-black">
                        <LayoutGrid className="text-luxury-gold" size={28} /> Architectural Artifacts
                    </h2>
                    <p className="text-[10px] font-outfit font-black tracking-widest text-gray-400 uppercase mt-2">Inventory Management Protocol</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="btn-luxury px-8 py-4 flex items-center gap-3 text-[9px]"
                >
                    <Plus size={16} /> NEW ARCHIVE
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center text-gray-400 font-serif italic text-2xl">Decrypting repository...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {projects.map((project) => (
                        <motion.div 
                            layout
                            key={project._id}
                            className={`glass-card bg-white overflow-hidden group shadow-xl transition-all ${project.isHeroFeatured ? 'border-2 border-luxury-gold ring-4 ring-luxury-gold/10' : 'border-gray-100'}`}
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={project.images?.[0] || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8px] font-black font-outfit uppercase tracking-widest text-luxury-black">
                                    {project.status}
                                </div>
                                {project.isHeroFeatured && (
                                    <div className="absolute top-4 left-4 px-3 py-1 bg-luxury-gold text-black rounded-full text-[8px] font-black font-outfit uppercase tracking-widest flex items-center gap-2">
                                        <Clock size={10} /> HERO FEATURED
                                    </div>
                                )}
                                {project.images?.length > 1 && (
                                    <div className="absolute bottom-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-[8px] text-white font-black tracking-widest">
                                        +{project.images.length - 1} SHOTS
                                    </div>
                                )}
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-serif font-bold text-luxury-black mb-2">{project.title}</h3>
                                <div className="flex items-center gap-3 text-gray-400 text-[10px] font-outfit font-black uppercase tracking-widest mb-6">
                                    <MapPin size={12} className="text-luxury-gold" /> {project.city}
                                </div>
                                
                                {project.mldPrice && (
                                    <div className="mb-6 p-3 bg-gray-50 rounded-xl border border-gray-100">
                                        <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Current Price Strategy</div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-serif font-black text-luxury-black">₹{project.mldPrice}</span>
                                            {project.marketPrice && (
                                                <span className="text-xs text-gray-400 line-through">₹{project.marketPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(project)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(project._id)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <span className="text-[10px] font-outfit text-gray-300 uppercase tracking-tighter">Units: {project.units || 'N/A'}</span>
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
                            className="w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <div className="p-12">
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-3xl font-serif font-black italic">{editingProject ? 'Modify' : 'New'} Artifact</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="flex items-center gap-4 p-6 bg-luxury-gold/5 border border-luxury-gold/10 rounded-3xl mb-8">
                                        <input 
                                            type="checkbox" 
                                            id="isHeroFeatured"
                                            checked={formData.isHeroFeatured}
                                            onChange={(e) => setFormData({...formData, isHeroFeatured: e.target.checked})}
                                            className="w-6 h-6 accent-luxury-gold rounded cursor-pointer"
                                        />
                                        <label htmlFor="isHeroFeatured" className="cursor-pointer">
                                            <div className="text-xs font-black font-outfit uppercase tracking-widest text-luxury-black">Feature in Hero Section</div>
                                            <div className="text-[9px] text-gray-400 font-medium">Prioritize this artifact on the main panoramic lens</div>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Title</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">City</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={formData.city}
                                                onChange={(e) => setFormData({...formData, city: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Status</label>
                                            <select 
                                                value={formData.status}
                                                onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none"
                                            >
                                                <option value="Ongoing">Ongoing</option>
                                                <option value="Upcoming">Upcoming</option>
                                                <option value="Completed">Completed</option>
                                                <option value="Sold Out">Sold Out</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Inventory Units</label>
                                            <input 
                                                type="number" 
                                                value={formData.units}
                                                onChange={(e) => setFormData({...formData, units: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Market Price (e.g. 18L)</label>
                                            <input 
                                                type="text" 
                                                value={formData.marketPrice}
                                                onChange={(e) => setFormData({...formData, marketPrice: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                                placeholder="e.g. 18L"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">MLD Price (e.g. 9.9L)</label>
                                            <input 
                                                type="text" 
                                                value={formData.mldPrice}
                                                onChange={(e) => setFormData({...formData, mldPrice: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                                placeholder="e.g. 9.9L"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Social / Private Link (Optional)</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                                            <input 
                                                type="text" 
                                                value={formData.socialLink}
                                                onChange={(e) => setFormData({...formData, socialLink: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                                placeholder="https://instagram.com/mld_estates"
                                            />
                                        </div>
                                    </div>

                                    {/* Upload Section */}
                                    <div className="space-y-4">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400 block text-left">Direct Asset Upload (Images)</label>
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                            <label className="aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all text-gray-400 hover:text-luxury-gold">
                                                <ImageIcon size={24} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Select</span>
                                                <input type="file" multiple onChange={handleFileChange} className="hidden" accept="image/*" />
                                            </label>
                                            {selectedFiles.map((file, idx) => (
                                                <div key={idx} className="aspect-square rounded-2xl bg-gray-50 relative group border border-gray-100 overflow-hidden">
                                                    <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" alt="upload preview" />
                                                    <button 
                                                        type="button"
                                                        onClick={() => removeSelectedFile(idx)}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* PDF Upload Section */}
                                    <div className="space-y-4">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400 block text-left">Document Archive (Layout Plans / Govt Approvals - PDF)</label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <label className="p-6 border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center gap-4 cursor-pointer hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all text-gray-400 hover:text-luxury-gold">
                                                <Upload size={20} />
                                                <span className="text-[8px] font-black uppercase tracking-widest">Select PDF Documents</span>
                                                <input type="file" multiple onChange={handleDocChange} className="hidden" accept=".pdf" />
                                            </label>
                                            
                                            {/* New Docs */}
                                            {selectedDocs.map((file, idx) => (
                                                <div key={idx} className="p-4 bg-gray-50 rounded-2xl flex items-center justify-between border border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="p-2 bg-luxury-gold/10 text-luxury-gold rounded-lg">
                                                            <Send size={12} />
                                                        </div>
                                                        <span className="text-[10px] font-outfit font-bold truncate max-w-[150px]">{file.name}</span>
                                                    </div>
                                                    <button type="button" onClick={() => removeSelectedDoc(idx)} className="text-red-500 hover:bg-red-50 p-1 rounded-lg">
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}

                                            {/* Existing Docs */}
                                            {formData.documents?.map((doc, idx) => (
                                                <div key={`exist-${idx}`} className="p-4 bg-luxury-gold/5 rounded-2xl flex items-center justify-between border border-luxury-gold/10">
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle className="text-luxury-gold" size={16} />
                                                        <span className="text-[10px] font-outfit font-bold truncate max-w-[150px]">{doc.title}</span>
                                                    </div>
                                                    <button 
                                                        type="button" 
                                                        onClick={() => {
                                                            const newDocs = [...formData.documents];
                                                            newDocs.splice(idx, 1);
                                                            setFormData({ ...formData, documents: newDocs });
                                                        }} 
                                                        className="text-gray-400 hover:text-red-500 p-1"
                                                    >
                                                        <X size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Legacy Image/Video URLs (Optional)</label>
                                            <button type="button" onClick={addImageField} className="text-[8px] font-black text-luxury-gold uppercase tracking-widest">+ Add Visual Channel</button>
                                        </div>
                                        <div className="max-h-48 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                                            {formData.images.map((img, idx) => {
                                                const isVideo = img && (img.includes('youtube.com') || img.includes('youtu.be') || img.includes('instagram.com'));
                                                return (
                                                    <div key={idx} className="relative group">
                                                        <input 
                                                            type="text" 
                                                            value={img}
                                                            onChange={(e) => handleImageChange(idx, e.target.value)}
                                                            className={`w-full bg-gray-50 border ${isVideo ? 'border-luxury-gold/50' : 'border-gray-100'} rounded-xl p-4 pr-12 text-xs font-outfit text-black focus:border-luxury-gold outline-none`} 
                                                            placeholder={`Artifact Capture #${idx + 1} URL (Image or YT/IG Video)`}
                                                        />
                                                        {isVideo && (
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-luxury-gold">
                                                                <Video size={14} />
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Narrative Description</label>
                                        <textarea 
                                            rows="4"
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none resize-none" 
                                        />
                                    </div>

                                    <button type="submit" className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-[10px] tracking-[0.5em] font-black">
                                        {editingProject ? 'UPDATE ARCHIVE' : 'ARCHIVE ARTIFACT'} <Send size={16} />
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

export default AdminProjects;
