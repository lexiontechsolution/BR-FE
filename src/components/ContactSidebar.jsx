import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';

const ContactSidebar = () => {
    const phoneNumber = "+91 636973 4738";
    
    return (
        <div className="fixed left-6 top-0 h-screen z-[100] hidden xl:flex flex-col items-center justify-center">
            {/* Architectural Trace Line */}
            <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gray-100" />
            
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "15vh" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-luxury-gold origin-top"
                transition={{ duration: 2, ease: "easeInOut" }}
            />

            <div className="container relative flex flex-col items-center py-20 bg-white">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group cursor-pointer"
                >
                    <a 
                        href={`tel:${phoneNumber.replace(/\s/g, '')}`}
                        className="flex flex-col items-center gap-12 group"
                    >
                        <span className="text-[10px] font-outfit font-black tracking-[0.8em] text-gray-300 uppercase [writing-mode:vertical-lr] rotate-180 group-hover:text-luxury-gold transition-all duration-500">
                            DIRECT CONCIERGE TERMINAL
                        </span>

                        <div className="relative py-12 flex flex-col items-center">
                            <div className="absolute inset-0 bg-luxury-gold/5 scale-x-125 -rotate-2 opacity-0 group-hover:opacity-100 transition-all duration-700" />
                            <span className="text-2xl font-serif font-black tracking-tighter text-luxury-black/30 group-hover:text-luxury-gold transition-all duration-700 [writing-mode:vertical-lr] rotate-180">
                                {phoneNumber}
                            </span>
                        </div>

                        <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center text-luxury-gold group-hover:bg-luxury-gold group-hover:text-black group-hover:border-luxury-gold transition-all duration-500 shadow-sm relative overflow-hidden">
                            <Phone size={18} />
                            <div className="absolute inset-0 bg-white/20 -translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </div>
                    </a>

                    {/* Technical Label */}
                    <div className="absolute -left-12 top-1/2 -translate-y-1/2 rotate-180 [writing-mode:vertical-lr] text-[8px] font-outfit font-bold text-gray-200 uppercase tracking-widest whitespace-nowrap">
                        M L D — S Y S T E M S — 0 9
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ height: 0 }}
                animate={{ height: "15vh" }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-luxury-gold origin-bottom"
                transition={{ duration: 2, ease: "easeInOut" }}
            />
        </div>
    );
};

export default ContactSidebar;
