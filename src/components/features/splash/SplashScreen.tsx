import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1000);
    }, 4500); // 4.5 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50"
        >
          <div className="relative w-48 h-48 mb-8">
            {/* Outer Loading Circle */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary-900/20"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.2, 0.5],
                rotate: 360
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Middle Loading Circle */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary-900/30"
              animate={{
                scale: [1.1, 0.9, 1.1],
                opacity: [0.3, 0.5, 0.3],
                rotate: -360
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Inner Loading Circle */}
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-primary-900/40"
              animate={{
                scale: [0.9, 1.1, 0.9],
                opacity: [0.4, 0.3, 0.4],
                rotate: 360
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                duration: 1
              }}
              className="absolute inset-0 flex items-center justify-center bg-white rounded-full shadow-lg"
            >
              <Building className="h-16 w-16 text-primary-900" />
            </motion.div>
          </div>

          {/* App Name with Shimmer Animation */}
          <div className="relative">
            <motion.h1 
              className="text-primary-900 text-4xl font-display font-bold tracking-wider relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              HostelConnect
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1
                }}
              />
            </motion.h1>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SplashScreen;