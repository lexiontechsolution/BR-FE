import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, Globe, Shield } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = ({ onOpenEnquiry }) => {
    const footerSections = [
        {
            title: 'Portfolios',
            links: [
                { name: 'Residential Artifacts', path: '/properties' },
                { name: 'Commercial Assets', path: '/properties' },
                { name: 'Signature Estates', path: '/properties' },
                { name: 'Townships', path: '/properties' },
            ]
        },
        {
            title: 'Territories',
            links: [
                { name: 'Chennai Corridor', path: '#' },
                { name: 'Coimbatore Hub', path: '#' },
                { name: 'Bangalore East', path: '#' },
                { name: 'Hyderabad South', path: '#' },
                { name: 'Goa Coastal', path: '#' },
            ]
        },
        {
            title: 'Protocols',
            links: [
                { name: 'Private Concierge', path: '/contact' },
                { name: 'Projects Registry', path: '/projects' },
                { name: 'Admin Dashboard', path: '/admin/login' },
                { name: 'Estate Archive', path: '/properties' },
            ]
        }
    ];

    return (
        <footer className="bg-white border-t border-gray-100 pt-32 pb-16 selection:bg-luxury-gold selection:text-black">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-16 mb-24">
                    {/* Brand Section */}
                    <div className="lg:col-span-3 space-y-10">
                        <Link to="/" className="inline-block relative group">
                            <img 
                                src={logo} 
                                alt="Milestone Land Developers" 
                                className="h-28 md:h-36 w-auto object-contain brightness-100 group-hover:scale-105 transition-all duration-700"
                            />
                        </Link>
                        <p className="text-gray-400 font-outfit text-sm leading-relaxed max-w-sm tracking-wide">
                            Milestone Group is a premier architectural land development entity. 
                            We specialize in curated land portfolios and strategic property assets across South India, 
                            ensuring a legacy of trust since 2009.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                            <button 
                                onClick={() => {
                                    const leadForm = document.getElementById('lead-form');
                                    if (leadForm) {
                                        leadForm.scrollIntoView({ behavior: 'smooth' });
                                    } else if (onOpenEnquiry) {
                                        onOpenEnquiry();
                                    }
                                }}
                                className="btn-luxury px-10 py-5 text-[9px] tracking-[0.3em] shadow-xl shadow-luxury-gold/20"
                            >
                                START PRIVATE CONSULTATION
                            </button>
                            <div className="flex gap-5">
                                <a href="https://www.facebook.com/share/1DhSzVj4Hq/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-luxury-gold hover:text-black transition-all duration-500">
                                    <Facebook size={14} />
                                </a>
                                <a href="https://www.instagram.com/milestonelanddeveloper/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-luxury-gold hover:text-black transition-all duration-500">
                                    <Instagram size={14} />
                                </a>
                                <a href="https://youtube.com/@milestoneland?si=67wmx_lLpOukuPPf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:bg-luxury-gold hover:text-black transition-all duration-500">
                                    <Youtube size={14} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="lg:col-span-1">
                            <h3 className="text-[10px] font-outfit font-black tracking-[0.4em] text-luxury-gold uppercase mb-10">{section.title}</h3>
                            <ul className="space-y-6">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link to={link.path} className="text-gray-400 hover:text-luxury-black text-xs font-outfit font-bold transition-colors block pb-1 border-b border-transparent hover:border-luxury-gold/30">
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 mt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-10 translate-y-2 opacity-80">
                    <div className="flex items-center gap-4 text-gray-300 text-[9px] font-outfit font-black tracking-[0.2em] uppercase">
                        <Globe size={14} className="text-luxury-gold" />
                        <span>OPERATIONAL SINCE 2009</span>
                        <span className="w-8 h-[1px] bg-gray-100" />
                        <span>© MILESTONE GROUP ARTIFACTS</span>
                    </div>
                    
                    <div className="flex items-center gap-10">
                        <div className="flex gap-8 text-gray-300 text-[9px] font-outfit font-black tracking-[0.2em] uppercase whitespace-nowrap">
                            <a href="tel:+916369734738" className="hover:text-luxury-gold transition-colors flex items-center gap-2"><Phone size={10} /> +91 636973 4738</a>
                            <a href="mailto:info.milestonelanddevelopers@gmail.com" className="hover:text-luxury-gold transition-colors flex items-center gap-2"><Mail size={10} /> info.milestonelanddevelopers@gmail.com</a>
                        </div>
                        <div className="flex items-center gap-3 text-luxury-gold px-6 py-3 bg-gray-50 rounded-full border border-gray-100">
                             <Shield size={12} />
                             <span className="text-[9px] font-black tracking-[0.4em]">ENCRYPTED PORTAL</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
