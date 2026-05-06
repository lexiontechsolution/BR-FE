import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = ({ onOpenEnquiry }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Projects', path: '/projects' },
        { name: 'Properties', path: '/properties' },
        { name: 'Our Story', path: '/about' },
        { name: 'Our History', path: '/history' },
        { name: 'Latest Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-[100]">
                {/* Top Promotional Bar */}
                <div className="bg-[#D4AF37] h-10 w-full flex items-center justify-end px-6 md:px-12 relative overflow-hidden">
                    <div className="flex items-center gap-4 text-black font-bold">
                        <motion.div 
                            animate={{ x: [-20, 0], opacity: [0, 1] }}
                            className="hidden md:flex items-center gap-2"
                        >
                            <img 
                                src="https://img.icons8.com/color/48/car.png" 
                                alt="Car Icon" 
                                className="h-6 w-auto"
                            />
                            <span className="text-[10px] font-black uppercase tracking-widest">
                                ENQUIRE NOW FOR A FREE SITE VISIT - 80000 00000
                            </span>
                        </motion.div>
                    </div>
                </div>
                
                {/* Main Navbar */}
                <div className="bg-white shadow-sm px-4 md:px-12 py-1 md:py-2 flex items-center justify-between border-b border-gray-100">
                    <Link to="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-12 md:h-16 lg:h-20 object-contain" />
                    </Link>

                    <div className="hidden lg:flex items-center gap-6 xl:gap-8">
                        {navLinks.map((link) => (
                            <div key={link.name} className="relative group">
                                <Link 
                                    to={link.path}
                                    className={`text-[10px] xl:text-[11px] font-bold transition-all hover:text-[#00529b] flex items-center gap-1 uppercase tracking-tight ${
                                        isActive(link.path) ? 'text-[#00529b]' : 'text-[#444]'
                                    }`}
                                >
                                    {link.name}
                                    {link.dropdown && <span className="text-[10px] opacity-50">▼</span>}
                                </Link>
                                
                                {link.dropdown && (
                                    <div className="absolute top-full left-0 pt-4 hidden group-hover:block min-w-[200px]">
                                        <div className="bg-white shadow-2xl border border-gray-50 rounded-xl py-3">
                                            {link.dropdown.map((sub) => (
                                                <Link 
                                                    key={sub.name} 
                                                    to={sub.path}
                                                    className="block px-6 py-3 text-[12px] font-bold text-[#666] hover:bg-gray-50 hover:text-[#00529b] transition-all"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="lg:hidden flex items-center">
                        <button 
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="p-1 md:p-2 text-[#00529b] hover:bg-blue-50 rounded-lg transition-all"
                        >
                            <Menu size={36} strokeWidth={2.5} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white z-[200] shadow-2xl flex flex-col pointer-events-auto"
                    >
                         <div className="p-8 flex items-center justify-between border-b border-gray-50">
                            <img src={logo} alt="Logo" className="h-10" />
                            <button 
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-[#00529b] hover:bg-blue-50 transition-all"
                            >
                                <X size={28} />
                            </button>
                         </div>
 
                         <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
                            {navLinks.map((link, i) => (
                                <div key={i}>
                                    <Link 
                                        to={link.path}
                                        onClick={() => !link.dropdown && setIsMobileMenuOpen(false)}
                                        className={`text-xl font-black uppercase tracking-tighter hover:text-[#00529b] transition-all ${
                                            isActive(link.path) ? 'text-[#00529b]' : 'text-[#333]'
                                        }`}
                                    >
                                        {link.name}
                                    </Link>
                                    {link.dropdown && (
                                        <div className="mt-4 ml-4 flex flex-col gap-4 border-l-2 border-gray-100 pl-6">
                                            {link.dropdown.map((sub) => (
                                                <Link 
                                                    key={sub.name}
                                                    to={sub.path}
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="text-lg font-bold text-[#666] hover:text-[#00529b] transition-all"
                                                >
                                                    {sub.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                         </div>

                         <div className="p-8 border-t border-gray-50">
                            <button 
                                onClick={() => { setIsMobileMenuOpen(false); onOpenEnquiry(); }}
                                className="w-full bg-[#00529b] text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-[#003d73] transition-all shadow-lg"
                            >
                                Enquire Now
                            </button>
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
