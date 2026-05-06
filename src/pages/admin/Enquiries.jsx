import { useState, useEffect } from 'react';
import api from '../../utils/api';
import { Mail, Phone, Clock, Trash2, CheckCircle, ExternalLink, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Enquiries = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            const res = await api.get('/enquiries');
            setEnquiries(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch lead registry.");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try {
            await api.patch(`/enquiries/${id}`, { status });
            toast.success(`Entry marked as ${status}`);
            fetchEnquiries();
        } catch (error) {
            toast.error("Status update protocol failed.");
        }
    };

    const deleteEnquiry = async (id) => {
        if (!window.confirm("Are you sure you want to purge this entry?")) return;
        try {
            await api.delete(`/enquiries/${id}`);
            toast.success("Entry purged from registry.");
            fetchEnquiries();
        } catch (error) {
            toast.error("Purge operation failed.");
        }
    };

    const filteredEnquiries = filter === 'All' 
        ? enquiries 
        : enquiries.filter(e => e.status === filter);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="w-16 h-16 border-4 border-luxury-gold/20 border-t-luxury-gold rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-12 pb-20 selection:bg-luxury-gold selection:text-black">
            <div className="flex justify-between items-end mb-12">
                <div>
                   <h2 className="text-4xl font-serif font-black italic mb-4 text-luxury-black">Lead <span className="text-luxury-gold">Registry.</span></h2>
                   <p className="text-gray-400 text-[10px] font-outfit font-black tracking-[0.3em] uppercase">Communication interface for prospect acquisition</p>
                </div>
                <div className="flex gap-4">
                    {['All', 'New', 'Contacted', 'Closed'].map((f) => (
                        <button 
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-full text-[10px] font-outfit font-black tracking-widest uppercase transition-all border ${filter === f ? 'bg-luxury-gold text-black border-luxury-gold shadow-lg shadow-luxury-gold/20' : 'border-gray-100 text-gray-400 hover:text-luxury-black'}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <div className="glass-card p-8 bg-white shadow-xl shadow-gray-100/50">
                    <p className="text-gray-400 text-[9px] font-outfit font-black tracking-widest uppercase mb-2">Total Transmissions</p>
                    <p className="text-3xl font-serif font-black text-luxury-black italic">{enquiries.length}</p>
                </div>
                <div className="glass-card p-8 bg-white shadow-xl shadow-gray-100/50">
                    <p className="text-gray-400 text-[9px] font-outfit font-black tracking-widest uppercase mb-2">Pending Protocol</p>
                    <p className="text-3xl font-serif font-black text-blue-600 italic">{enquiries.filter(e => e.status === 'New').length}</p>
                </div>
                <div className="glass-card p-8 bg-white shadow-xl shadow-gray-100/50">
                    <p className="text-gray-400 text-[9px] font-outfit font-black tracking-widest uppercase mb-2">Conversion Rate</p>
                    <p className="text-3xl font-serif font-black text-green-600 italic">
                        {enquiries.length ? Math.round((enquiries.filter(e => e.status === 'Closed').length / enquiries.length) * 100) : 0}%
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <AnimatePresence>
                    {filteredEnquiries.map((enq, index) => (
                        <motion.div
                            key={enq._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: index * 0.05 }}
                            className="glass-card p-10 bg-white border-gray-100 group hover:border-luxury-gold/50 transition-all relative overflow-hidden shadow-lg shadow-gray-200/20"
                        >
                            <div className="absolute top-0 right-0 w-2 h-full bg-luxury-gold origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500" />
                            
                            <div className="flex flex-col lg:flex-row justify-between gap-12">
                                <div className="space-y-6 flex-grow">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-4 mb-2">
                                                <h3 className="text-2xl font-serif font-bold text-luxury-black tracking-tight">{enq.name}</h3>
                                                <span className={`px-3 py-1 rounded-full text-[9px] font-outfit font-black uppercase tracking-widest ${
                                                    enq.status === 'New' ? 'bg-blue-50 text-blue-600' : 
                                                    enq.status === 'Contacted' ? 'bg-orange-50 text-orange-600' : 
                                                    'bg-green-50 text-green-600'
                                                }`}>
                                                    {enq.status}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-6 text-gray-400 text-xs font-outfit">
                                                <a href={`mailto:${enq.email}`} className="flex items-center gap-2 hover:text-luxury-gold transition-colors">
                                                    <Mail size={14} /> {enq.email}
                                                </a>
                                                <a href={`tel:${enq.phone}`} className="flex items-center gap-2 hover:text-luxury-gold transition-colors">
                                                    <Phone size={14} /> {enq.phone}
                                                </a>
                                                <div className="flex items-center gap-2 text-gray-300">
                                                    <Clock size={14} /> {new Date(enq.createdAt).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50/50 border border-gray-100 p-6 rounded-2xl">
                                        <div className="text-[10px] font-outfit font-black tracking-widest text-luxury-gold uppercase mb-3 opacity-80">Message Objective: {enq.subject}</div>
                                        <p className="text-gray-500 font-outfit text-sm leading-relaxed italic">
                                            "{enq.message}"
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-row lg:flex-col justify-end gap-3 min-w-[200px]">
                                    {enq.status !== 'Contacted' && (
                                        <button 
                                            onClick={() => updateStatus(enq._id, 'Contacted')}
                                            className="flex items-center justify-center gap-3 p-4 bg-gray-50 hover:bg-luxury-gold hover:text-black rounded-xl text-[10px] font-outfit font-black tracking-widest uppercase transition-all shadow-sm"
                                        >
                                            <ExternalLink size={14} /> Mark Contacted
                                        </button>
                                    )}
                                    {enq.status !== 'Closed' && (
                                        <button 
                                            onClick={() => updateStatus(enq._id, 'Closed')}
                                            className="flex items-center justify-center gap-3 p-4 bg-green-50 text-green-600 hover:bg-green-600 hover:text-white rounded-xl text-[10px] font-outfit font-black tracking-widest uppercase transition-all shadow-sm"
                                        >
                                            <CheckCircle size={14} /> Close Lead
                                        </button>
                                    )}
                                    <button 
                                        onClick={() => deleteEnquiry(enq._id)}
                                        className="flex items-center justify-center gap-3 p-4 bg-red-50 text-red-600/50 hover:bg-red-600 hover:text-white rounded-xl text-[10px] font-outfit font-black tracking-widest uppercase transition-all shadow-sm"
                                    >
                                        <Trash2 size={14} /> Purge Entry
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {filteredEnquiries.length === 0 && (
                    <div className="text-center py-32 glass-card bg-white border-gray-100 shadow-xl shadow-gray-100/50">
                        <Mail className="mx-auto text-luxury-gold/20 mb-6" size={64} />
                        <h3 className="text-2xl font-serif italic text-gray-300">No transmissions found in current registry.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Enquiries;
