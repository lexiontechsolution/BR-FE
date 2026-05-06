import { motion } from 'framer-motion';
import sbiLogo from '../assets/SBI.png';
import tmbLogo from '../assets/TMB.png';
import sibLogo from '../assets/sib.png';
import federalLogo from '../assets/federal abnk.png';

const BankPartners = () => {
    const banks = [
        { name: 'State Bank of India', logo: sbiLogo },
        { name: 'Tamilnad Mercantile Bank', logo: tmbLogo },
        { name: 'South Indian Bank', logo: sibLogo },
        { name: 'Federal Bank', logo: federalLogo }
    ];

    return (
        <section className="py-20 bg-white overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-20"
                >
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="w-12 h-[1px] bg-luxury-gold" />
                        <span className="text-luxury-gold text-[10px] font-outfit font-black tracking-[0.5em] uppercase italic">Financing Solutions</span>
                        <span className="w-12 h-[1px] bg-luxury-gold" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-black text-luxury-black mb-6 italic tracking-tighter">
                        Our Trusted Bank <span className="text-gold-gradient not-italic">Partners.</span>
                    </h2>
                    <p className="text-gray-400 text-[11px] font-outfit font-black tracking-widest uppercase">Empowering your dream home with easy loan approvals</p>
                </motion.div>

                <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
                    {banks.map((bank, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group flex flex-col items-center justify-center w-[120px] md:w-[180px]"
                        >
                            <div className="h-12 md:h-16 flex items-center justify-center mb-4">
                                <img 
                                    src={bank.logo} 
                                    alt={bank.name} 
                                    className="max-h-full max-w-full object-contain transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
                                />
                            </div>
                            <p className="text-[8px] font-outfit font-black text-gray-300 opacity-0 group-hover:opacity-100 transition-all duration-500 uppercase tracking-[0.2em] text-center">{bank.name}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BankPartners;
