import { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, Building2, Briefcase, Mail, 
    LogOut, Plus, Search, CheckCircle, Zap, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import Enquiries from './Enquiries';
import AdminProjects from './AdminProjects';
import AdminProperties from './AdminProperties';
import AdminBlog from './AdminBlog';

// --- Sub-Components ---
const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="glass-card p-8 border-gray-100 relative overflow-hidden group bg-white shadow-xl shadow-gray-100/20">
        <div className={`absolute -top-4 -right-4 w-24 h-24 ${color} blur-[40px] rounded-full opacity-10 group-hover:opacity-20 transition-all`} />
        <div className="flex justify-between items-start mb-6">
            <div className={`w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center ${color.replace('bg-', 'text-')} bg-gray-50`}>
                <Icon size={20} />
            </div>
        </div>
        <h3 className="text-gray-400 text-[10px] font-outfit font-black tracking-[0.2em] uppercase mb-2">{title}</h3>
        <p className="text-3xl font-serif font-black text-luxury-black italic">{value}</p>
    </div>
);

const AdminHome = () => {
    const [stats, setStats] = useState({ leads: 0, estates: 0, projects: 0 });
    const [recentLeads, setRecentLeads] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsRes, leadsRes] = await Promise.all([
                    api.get('/stats'),
                    api.get('/enquiries')
                ]);
                setStats(statsRes.data);
                setRecentLeads(leadsRes.data.slice(0, 3));
            } catch (err) {
                console.error("Dashboard out of sync.");
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    if (loading) return <div className="py-20 text-center font-serif text-2xl italic text-gray-300">Synchronizing system...</div>;

    return (
        <div className="space-y-12 text-left">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatsCard title="Estate Inventory" value={stats.estates} icon={Building2} color="bg-luxury-gold" />
                <StatsCard title="Personnel Leads" value={stats.leads} icon={Mail} color="bg-blue-500" />
                <StatsCard title="Active Artifacts" value={stats.projects} icon={Briefcase} color="bg-orange-500" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                 <div className="lg:col-span-8 glass-card p-10 border-gray-100 bg-white">
                     <div className="flex justify-between items-center mb-10">
                        <h3 className="text-2xl font-serif font-black italic flex items-center gap-4 text-luxury-black">
                            <Mail className="text-luxury-gold" size={24} /> Recent Registry Access
                        </h3>
                        <Link to="/admin/dashboard/enquiries" className="text-[10px] font-outfit font-black tracking-widest text-luxury-gold border-b border-luxury-gold/30 hover:text-luxury-black transition-colors uppercase">All Entries</Link>
                     </div>
                     <div className="space-y-4">
                         {recentLeads.length > 0 ? recentLeads.map((enq, i) => (
                             <div key={i} className="flex justify-between items-center p-6 bg-gray-50/50 hover:bg-gray-50 border border-gray-100 rounded-2xl transition-all group">
                                 <div className="flex items-center gap-6">
                                     <div className="w-10 h-10 rounded-full bg-luxury-gold/10 flex items-center justify-center font-serif text-luxury-gold text-lg italic">
                                         {enq.name[0]}
                                     </div>
                                     <div>
                                         <p className="text-luxury-black font-serif font-bold text-lg">{enq.name}</p>
                                         <p className="text-gray-400 text-xs font-outfit">Consultation Ref: #{enq._id.slice(-6).toUpperCase()}</p>
                                     </div>
                                 </div>
                                 <div className="text-right">
                                     <div className={`px-3 py-1 text-[9px] font-outfit font-black rounded-full mb-1 ${enq.status === 'New' ? 'bg-blue-500/10 text-blue-600' : 'bg-luxury-gold/10 text-luxury-gold'}`}>
                                         {enq.status.toUpperCase()}
                                     </div>
                                     <span className="text-[9px] text-gray-400 font-outfit uppercase tracking-widest">
                                         {new Date(enq.createdAt).toLocaleDateString()}
                                     </span>
                                 </div>
                             </div>
                         )) : (
                             <div className="p-12 text-center text-gray-300 font-serif italic text-xl">No leads in registry yet.</div>
                         )}
                     </div>
                 </div>
                 
                 <div className="lg:col-span-4 glass-card p-10 border-gray-100 bg-white">
                      <h3 className="text-2xl font-serif font-black italic mb-10 flex items-center gap-4 text-luxury-black">
                          <Zap className="text-luxury-gold" size={24} /> Commands
                      </h3>
                      <div className="grid grid-cols-1 gap-4">
                           <Link to="/admin/dashboard/properties" className="flex items-center gap-6 p-6 bg-gray-50/50 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-luxury-gold group-hover:scale-110 transition-all shadow-sm">
                                     <Building2 size={20} />
                                </div>
                                <span className="text-xs font-outfit font-black tracking-widest text-gray-500 group-hover:text-luxury-black uppercase">Archive Estate</span>
                           </Link>
                           <Link to="/admin/dashboard/projects" className="flex items-center gap-6 p-6 bg-gray-50/50 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-blue-500 group-hover:scale-110 transition-all shadow-sm">
                                     <Plus size={20} />
                                </div>
                                <span className="text-xs font-outfit font-black tracking-widest text-gray-500 group-hover:text-luxury-black uppercase">Log Artifact</span>
                           </Link>
                      </div>
                 </div>
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---
const AdminDashboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('mld_admin_token');
        if (!token) {
            navigate('/admin/login');
            toast.error("Access denied. Identity required.");
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('mld_admin_token');
        toast.success("Identity Revoked. Terminal Closed.");
        navigate('/admin/login');
    };

    const menuItems = [
        { name: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
        { name: 'Leads', icon: Mail, path: '/admin/dashboard/enquiries' },
        { name: 'Projects', icon: Briefcase, path: '/admin/dashboard/projects' },
        { name: 'Properties', icon: Building2, path: '/admin/dashboard/properties' },
        { name: 'Blog', icon: BookOpen, path: '/admin/dashboard/blog' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen flex text-luxury-black pt-0 overflow-hidden selection:bg-luxury-gold selection:text-black">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-80' : 'w-24'} bg-white border-r border-gray-100 transition-all duration-500 flex flex-col h-screen fixed left-0 top-0 z-[60] shadow-2xl shadow-gray-200/50`}>
                <div className="p-10 flex items-center justify-between">
                    {isSidebarOpen ? (
                        <div className="flex flex-col">
                            <span className="text-2xl font-serif font-black tracking-tighter text-luxury-black">
                                MLD<span className="text-luxury-gold">.</span>
                            </span>
                            <span className="text-[8px] tracking-[0.4em] text-gray-400 font-outfit uppercase -mt-1 font-black text-left">
                                COMMAND CENTER
                            </span>
                        </div>
                    ) : (
                        <div className="w-10 h-10 rounded-full border border-luxury-gold flex items-center justify-center text-luxury-gold font-serif font-black">M</div>
                    )}
                </div>
                
                <nav className="flex-grow px-6 space-y-4 mt-12">
                    {menuItems.map((item) => {
                        const active = location.pathname === item.path || (item.path === '/admin/dashboard' && location.pathname === '/admin/dashboard/');
                        return (
                            <Link 
                                key={item.path} 
                                to={item.path}
                                className={`flex items-center gap-5 p-5 rounded-2xl transition-all duration-500 group relative ${active ? 'bg-luxury-gold text-black shadow-xl shadow-luxury-gold/10' : 'text-gray-400 hover:text-luxury-black hover:bg-gray-50'}`}
                            >
                                <item.icon size={20} className={active ? '' : 'group-hover:text-luxury-gold transition-colors'} />
                                {isSidebarOpen && <span className="text-[10px] font-outfit font-black tracking-widest uppercase">{item.name}</span>}
                                {active && <div className="absolute right-6 w-1.5 h-1.5 bg-black rounded-full" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-8">
                     <button 
                        onClick={handleLogout}
                        className="flex items-center gap-5 p-5 text-gray-400 hover:text-red-500 transition-all w-full group"
                     >
                         <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                         {isSidebarOpen && <span className="text-[10px] font-outfit font-black tracking-widest uppercase">Terminate</span>}
                     </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className={`flex-grow transition-all duration-500 ${isSidebarOpen ? 'ml-80' : 'ml-24'} p-16 h-screen overflow-y-auto custom-scrollbar`}>
                <header className="flex justify-between items-center mb-20">
                     <div className="space-y-1 text-left">
                         <h1 className="text-4xl font-serif font-black flex items-center gap-4 text-luxury-black">
                             Legacy <span className="text-luxury-gold italic">Control.</span>
                         </h1>
                         <p className="text-gray-400 text-[10px] font-outfit font-bold tracking-[0.3em] uppercase">SYSTEM OPERATIONAL — ENCRYPTED 4096-BIT</p>
                     </div>
                     <div className="flex items-center gap-10">
                         <div className="relative group hidden xl:block">
                             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-luxury-gold transition-colors" size={16} />
                             <input type="text" placeholder="CRITICAL SEARCH..." className="bg-white border border-gray-100 rounded-full py-4 pl-14 pr-8 text-xs font-outfit tracking-widest w-80 focus:border-luxury-gold/30 outline-none transition-all shadow-sm" />
                         </div>
                         <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-full border border-gray-100 shadow-sm">
                             <div className="w-12 h-12 rounded-full border border-luxury-gold flex items-center justify-center font-serif text-luxury-gold text-lg bg-luxury-gold/5 italic">A</div>
                             <div className="text-left">
                                  <p className="text-xs font-serif font-bold italic leading-none text-luxury-black">Director Admin</p>
                                  <p className="text-[8px] text-gray-400 font-outfit font-black tracking-widest uppercase mt-1">SUPER_USER</p>
                             </div>
                         </div>
                     </div>
                </header>

                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Routes>
                        <Route index element={<AdminHome />} />
                        <Route path="properties" element={<AdminProperties />} />
                        <Route path="projects" element={<AdminProjects />} />
                        <Route path="enquiries" element={<Enquiries />} />
                        <Route path="blog" element={<AdminBlog />} />
                        <Route path="*" element={<AdminHome />} />
                    </Routes>
                </motion.div>
            </main>
        </div>
    );
};

export default AdminDashboard;
