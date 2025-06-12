import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from 'lucide-react';

type SplashScreenProps = {
  onComplete: () => void;
};

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setTimeout(onComplete, 1000); // Allow exit animation to complete
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: 0.5 
      }
    },
    exit: { 
      scale: 1.5, 
      opacity: 0,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  // Water-like ripple effect elements
  const rippleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (custom: number) => ({
      scale: 1,
      opacity: [0, 0.5, 0],
      transition: { 
        delay: custom * 0.3 + 1,
        duration: 1.5, 
        ease: "easeInOut",
        times: [0, 0.2, 1]
      }
    })
  };

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-primary-900 to-primary-700 flex items-center justify-center z-50"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          {/* Logo with water-like portal effect */}
          <div className="relative">
            {/* Ripple circles */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute inset-0 rounded-full border-2 border-white/30"
                custom={i}
                variants={rippleVariants}
                initial="hidden"
                animate="visible"
                style={{ 
                  width: '100%', 
                  height: '100%', 
                }}
              />
            ))}
            
            {/* Logo */}
            <motion.div
              className="relative z-10 bg-white rounded-full p-6 shadow-lg"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <Building className="h-16 w-16 text-primary-900" />
            </motion.div>
          </div>
          
          {/* Text animation */}
          <motion.div
            className="absolute mt-32 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h1 className="text-white text-3xl font-display font-bold tracking-wider">
              HostelConnect
            </h1>
            <p className="text-white/80 mt-2">
              Find your perfect student accommodation
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;