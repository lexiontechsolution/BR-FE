import { motion } from 'framer-motion';
import { FileCheck, Building2, Map as MapIcon, Users, Trees, Sun, Trophy, MapPin, Award } from 'lucide-react';

const BrandMetrics = () => {
    const metrics = [
        { icon: MapIcon, val: '5,000+', label: 'Acres of land Delivered' },
        { icon: Users, val: '19,999+', label: 'Happy Customers' },
        { icon: Trees, val: '5 Lakh +', label: 'Trees Planted' },
        { icon: Sun, val: '100%', label: 'Solar Powered Sites' },
        { icon: MapPin, val: '20+', label: 'Cities' },
        { icon: Award, val: '13+', label: 'Years of Expertise' },
        { icon: Trophy, val: '13+', label: 'Awards' },
        { icon: FileCheck, val: '100%', label: 'Clear Documentation & Transactions' },
        { icon: Building2, val: '125+', label: 'Premium Projects' },
    ];

    // Double the array for seamless infinite scroll
    const marqueeMetrics = [...metrics, ...metrics];

    return (
        <section className="py-24 bg-white border-b border-gray-50 overflow-hidden">
            <div className="container mx-auto px-6 mb-16 text-center">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-3xl md:text-5xl font-serif font-black text-luxury-black mb-8 tracking-tight uppercase"
                >
                    INDIA'S LARGEST <span className="text-gold-gradient">PLOTTED DEVELOPER.</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-gray-500 font-outfit text-sm md:text-base leading-relaxed max-w-4xl mx-auto"
                >
                    We understand the importance of investing in the house of your dreams – a lifestyle that is 
                    unconditional & unrestricted. Milestone is India's most trusted plot developer, with 
                    every project and property in your favorite metro's most prime & potential addresses.
                </motion.p>
            </div>

            <div className="relative">
                {/* Gradient Masks for smooth fade */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

                <motion.div 
                    className="flex gap-16 md:gap-24 items-start"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: "loop",
                            duration: 30,
                            ease: "linear",
                        },
                    }}
                    style={{ width: "fit-content" }}
                >
                    {marqueeMetrics.map((metric, i) => (
                        <div 
                            key={i}
                            className="flex flex-col items-center text-center group min-w-[180px]"
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-luxury-gold flex items-center justify-center text-black mb-6 shadow-xl shadow-luxury-gold/20 transition-transform duration-500 group-hover:scale-110">
                                <metric.icon size={32} strokeWidth={1.5} />
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-xl md:text-2xl font-serif font-black text-luxury-black whitespace-nowrap">{metric.val}</h4>
                                <p className="text-[10px] md:text-[11px] font-outfit font-bold text-gray-400 leading-tight uppercase tracking-wider max-w-[140px] mx-auto">
                                    {metric.label}
                                </p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default BrandMetrics;
