import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { 
    Plus, Search, Filter, Trash2, Edit, CheckCircle, Info, 
    X, Send, Building2, MapPin, Clock, LayoutGrid, Ruler, Bed, Bath, Globe, Upload, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminProperties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedDocs, setSelectedDocs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Apartment',
        price: '',
        location: '',
        description: '',
        bedrooms: '',
        bathrooms: '',
        sqft: '',
        images: [''],
        documents: [],
        socialLink: '',
        status: 'Ongoing',
        isFeatured: false
    });

    useEffect(() => {
        fetchProperties();
    }, []);

    const fetchProperties = async () => {
        try {
            const res = await api.get('/properties');
            setProperties(res.data);
        } catch (err) {
            toast.error("Failed to load inventory.");
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

        selectedFiles.forEach(file => {
            data.append('images', file);
        });

        selectedDocs.forEach(file => {
            data.append('documents', file);
        });

        try {
            if (editingProperty) {
                await api.patch(`/properties/${editingProperty._id}`, data);
                toast.success("Estate updated.");
            } else {
                await api.post('/properties', data);
                toast.success("New estate archived.");
            }
            setIsModalOpen(false);
            setEditingProperty(null);
            resetForm();
            fetchProperties();
        } catch (err) {
            toast.error("Transmission error.");
        }
    };

    const resetForm = () => {
        setFormData({
            title: '', type: 'Apartment', price: '', location: '', description: '',
            bedrooms: '', bathrooms: '', sqft: '', images: [''], documents: [], socialLink: '', status: 'Ongoing', isFeatured: false
        });
        setSelectedFiles([]);
        setSelectedDocs([]);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Permanent erasure confirmed?")) return;
        try {
            await api.delete(`/properties/${id}`);
            toast.success("Estate erased.");
            fetchProperties();
        } catch (err) {
            toast.error("Erasure failed.");
        }
    };

    const openModal = (property = null) => {
        if (property) {
            setEditingProperty(property);
            setFormData({ 
                ...property,
                images: property.images?.length > 0 ? property.images : [''],
                socialLink: property.socialLink || ''
            });
        } else {
            setEditingProperty(null);
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
                        <Building2 className="text-luxury-gold" size={28} /> Estate Inventory
                    </h2>
                    <p className="text-[10px] font-outfit font-black tracking-widest text-gray-400 uppercase mt-2">Inventory Management Protocol</p>
                </div>
                <button 
                    onClick={() => openModal()}
                    className="btn-luxury px-8 py-4 flex items-center gap-3 text-[9px]"
                >
                    <Plus size={16} /> ADD ESTATE
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center text-gray-400 font-serif italic text-2xl">Decrypting repository...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {properties.map((prop) => (
                        <motion.div 
                            layout
                            key={prop._id}
                            className="glass-card bg-white border-gray-100 overflow-hidden group shadow-lg shadow-gray-100/20"
                        >
                            <div className="h-48 overflow-hidden relative">
                                <img src={prop.images[0] || 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80'} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute top-4 left-4 px-3 py-1 bg-luxury-gold text-black rounded-full text-[8px] font-black font-outfit uppercase tracking-widest shadow-lg">
                                    {prop.type}
                                </div>
                                {prop.images?.length > 1 && (
                                    <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-[8px] text-white font-black tracking-widest">
                                        {prop.images.length} IMAGES
                                    </div>
                                )}
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                     <h3 className="text-xl font-serif font-bold text-luxury-black">{prop.title}</h3>
                                     <span className="text-luxury-gold font-serif font-black italic">{prop.price}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-400 text-[10px] font-outfit font-black uppercase tracking-widest mb-6">
                                    <MapPin size={12} className="text-luxury-gold" /> {prop.location}
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-50 mb-6">
                                     <div className="text-center">
                                         <p className="text-[8px] text-gray-300 uppercase font-black tracking-widest mb-1">Beds</p>
                                         <p className="font-serif font-bold text-sm text-luxury-black">{prop.bedrooms || '-'}</p>
                                     </div>
                                     <div className="text-center border-x border-gray-50">
                                         <p className="text-[8px] text-gray-300 uppercase font-black tracking-widest mb-1">Baths</p>
                                         <p className="font-serif font-bold text-sm text-luxury-black">{prop.bathrooms || '-'}</p>
                                     </div>
                                     <div className="text-center">
                                         <p className="text-[8px] text-gray-300 uppercase font-black tracking-widest mb-1">Area</p>
                                         <p className="font-serif font-bold text-sm text-luxury-black">{prop.sqft} <span className="text-[8px] uppercase">ft²</span></p>
                                     </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex gap-2">
                                        <button onClick={() => openModal(prop)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-luxury-gold hover:bg-luxury-gold/5 transition-all">
                                            <Edit size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(prop._id)} className="p-3 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase font-outfit ${prop.status === 'Completed' ? 'bg-green-500/10 text-green-600' : 'bg-luxury-gold/10 text-luxury-gold'}`}>
                                        {prop.status}
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
                            className="w-full max-w-3xl bg-white rounded-[2rem] overflow-hidden relative shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
                        >
                            <div className="p-12">
                                <div className="flex justify-between items-center mb-12">
                                    <h3 className="text-3xl font-serif font-black italic">{editingProperty ? 'Modify' : 'New'} Estate</h3>
                                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Estate Title</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={formData.title}
                                                onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Price Quote</label>
                                            <input 
                                                required
                                                type="text" 
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                                placeholder="Ex: ₹ 4.5 Cr"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Type</label>
                                            <select 
                                                value={formData.type}
                                                onChange={(e) => setFormData({...formData, type: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none"
                                            >
                                                <option value="Apartment">Apartment</option>
                                                <option value="Villa">Villa</option>
                                                <option value="Plot">Plot</option>
                                                <option value="Commercial">Commercial</option>
                                            </select>
                                        </div>
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
                                            </select>
                                        </div>
                                        <div className="space-y-2 flex items-center gap-4 pt-8 underline-offset-4 decoration-luxury-gold">
                                            <input 
                                                type="checkbox" 
                                                checked={formData.isFeatured}
                                                onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})}
                                                className="w-5 h-5 accent-luxury-gold"
                                            />
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Featured Estate</label>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-3 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Bedrooms</label>
                                            <input type="number" value={formData.bedrooms} onChange={(e) => setFormData({...formData, bedrooms: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Bathrooms</label>
                                            <input type="number" value={formData.bathrooms} onChange={(e) => setFormData({...formData, bathrooms: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Sq. Ft.</label>
                                            <input type="number" value={formData.sqft} onChange={(e) => setFormData({...formData, sqft: e.target.value})} className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Social / Resource Link (Optional)</label>
                                        <div className="relative">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-luxury-gold" size={16} />
                                            <input 
                                                type="text" 
                                                value={formData.socialLink}
                                                onChange={(e) => setFormData({...formData, socialLink: e.target.value})}
                                                className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 pl-12 pr-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                                placeholder="https://facebook.com/mld_estates"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 text-left">
                                        <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400">Location Detailed</label>
                                        <input 
                                            required
                                            type="text" 
                                            value={formData.location}
                                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl p-4 text-xs font-outfit text-black focus:border-luxury-gold outline-none" 
                                        />
                                    </div>

                                     <div className="space-y-4">
                                         <label className="text-[9px] font-outfit font-black tracking-widest uppercase text-gray-400 block text-left">Direct Asset Upload (Images)</label>
                                         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                             <label className="aspect-square border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all text-gray-400 hover:text-luxury-gold">
                                                 <Upload size={24} />
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
                                                            placeholder={`Image Artifact #${idx + 1} URL (Image or YT/IG Video)`}
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

                                    <button type="submit" className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-[10px] tracking-[0.5em] font-black">
                                        {editingProperty ? 'UPDATE INVENTORY' : 'ARCHIVE ESTATE'} <Send size={16} />
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

export default AdminProperties;
