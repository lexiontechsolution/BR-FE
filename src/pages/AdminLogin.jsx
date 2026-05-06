import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import logo from '../assets/logo.png';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const navigate = useNavigate();

    const handleLogin = (e) => {
        if (e) e.preventDefault();
        console.log("Login Attempt:", credentials); // Debug log
        
        // Mock auth logic
        if (credentials.username === 'mld' && credentials.password === 'Milestone@01') {
            toast.success("Identity Verified. Welcome, Director.");
            localStorage.setItem('mld_admin_token', 'mock_token');
            navigate('/admin/dashboard');
        } else {
            console.error("Auth Failed: Incorrect credentials.");
            toast.error("Security Breach: Invalid Credentials.");
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex items-center justify-center px-6 relative overflow-hidden selection:bg-luxury-gold selection:text-black pt-20">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-luxury-gold/5 via-transparent to-transparent opacity-80" />
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-luxury-gold/5 blur-[120px] rounded-full" />

            <div className="w-full max-w-lg relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-12 md:p-20 bg-white border border-gray-100 rounded-[3rem] shadow-2xl shadow-gray-200/50"
                >
                    <div className="text-center mb-16">
                         <Link to="/" className="inline-block mb-12">
                             <img 
                                 src={logo} 
                                 alt="Milestone Land Developers" 
                                 className="h-20 w-auto object-contain"
                             />
                         </Link>
                         <div className="w-20 h-20 rounded-full border border-luxury-gold/20 flex items-center justify-center mx-auto mb-8 bg-luxury-gold/5">
                             <Fingerprint size={32} className="text-luxury-gold" />
                         </div>
                         <h1 className="text-3xl font-serif font-black text-luxury-black mb-2 uppercase tracking-widest">Internal Access</h1>
                         <p className="text-gray-400 text-[10px] font-outfit font-bold tracking-[0.3em] uppercase">Security Level: Authorized Personnel Only</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-10">
                         <div className="space-y-3 text-left">
                             <label className="text-[10px] font-outfit font-black tracking-[0.4em] uppercase text-gray-400 ml-1">Personnel ID</label>
                             <div className="relative group">
                                 <User className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-luxury-gold transition-colors" size={18} />
                                 <input 
                                    required
                                    type="text" 
                                    value={credentials.username}
                                    onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                                    className="w-full bg-transparent border-b border-gray-100 py-4 pl-10 pr-4 text-luxury-black focus:outline-none focus:border-luxury-gold transition-all font-outfit placeholder:text-gray-300"
                                    placeholder="Enter Registry ID"
                                 />
                             </div>
                         </div>
                         <div className="space-y-3 text-left">
                             <label className="text-[10px] font-outfit font-black tracking-[0.4em] uppercase text-gray-400 ml-1">Cryptographic Key</label>
                             <div className="relative group">
                                 <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-luxury-gold transition-colors" size={18} />
                                 <input 
                                    required
                                    type="password" 
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                    className="w-full bg-transparent border-b border-gray-100 py-4 pl-10 pr-4 text-luxury-black focus:outline-none focus:border-luxury-gold transition-all font-outfit placeholder:text-gray-300"
                                    placeholder="••••••••"
                                 />
                             </div>
                         </div>

                         <button type="submit" className="btn-luxury w-full py-6 flex items-center justify-center gap-4 text-[10px] tracking-[0.5em] font-black group">
                            DECRYPT & AUTHORIZE <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                         </button>
                    </form>
                </motion.div>
                
                <div className="text-center mt-12 space-y-2">
                    <p className="text-gray-400 text-[9px] font-outfit font-bold tracking-[0.4em] uppercase">
                        MLD VAULT PROTOCOL 8.42 — 256-BIT SESSION
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
