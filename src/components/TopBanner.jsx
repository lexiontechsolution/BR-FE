import { motion } from 'framer-motion';
import { Phone, Mail, ChevronRight } from 'lucide-react';

const TopBanner = () => {
    return (
        <div className="fixed top-0 left-0 w-full bg-luxury-black text-white py-3 h-[38px] flex items-center overflow-hidden z-[110]">
             {/* Scrolling/Running Text Layer */}
             <div className="flex whitespace-nowrap animate-marquee items-center gap-12 select-none">
                {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-12">
                        <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse" />
                            <p className="text-[9px] font-outfit font-black tracking-[0.4em] uppercase">
                                DIRECT CONCIERGE: <span className="text-luxury-gold">+91 636973 4738</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500">
                             <Mail size={10} className="text-luxury-gold" />
                             <p className="text-[9px] font-outfit font-black tracking-[0.4em] uppercase">
                                info.milestonelanddevelopers@gmail.com
                             </p>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500">
                             <ChevronRight size={10} className="text-luxury-gold" />
                             <p className="text-[9px] font-outfit font-black tracking-[0.4em] uppercase">
                                South India's Premier Land Developers
                             </p>
                        </div>
                    </div>
                ))}
             </div>

             <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
             `}} />
        </div>
    );
};

export default TopBanner;
