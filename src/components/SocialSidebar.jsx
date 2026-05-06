import { motion } from 'framer-motion';
import { Phone, Edit3 } from 'lucide-react';

const SocialSidebar = () => {
    return (
        <div className="fixed left-6 bottom-10 z-[100] flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                {[
                    { icon: 'IG', label: 'Instagram', color: 'hover:text-pink-500' },
                    { icon: 'FB', label: 'Facebook', color: 'hover:text-blue-600' },
                    { icon: 'YT', label: 'YouTube', color: 'hover:text-red-600' }
                ].map((social) => (
                    <motion.a
                        key={social.label}
                        href="#"
                        whileHover={{ x: 5 }}
                        className={`text-[10px] font-outfit font-black tracking-widest text-white/30 transition-all ${social.color} flex items-center gap-3 group`}
                    >
                        <span className="w-8 h-[1px] bg-white/10 group-hover:bg-luxury-gold group-hover:w-12 transition-all duration-500" />
                        {social.icon}
                    </motion.a>
                ))}
            </div>
            
            <div className="h-20 w-[1px] bg-gradient-to-b from-white/20 to-transparent ml-4" />
        </div>
    );
};

export default SocialSidebar;
