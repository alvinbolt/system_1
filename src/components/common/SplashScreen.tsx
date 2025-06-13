import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  // const text = "HostelConnect"; // Removed H1 text
  // const letters = Array.from(text); // Removed H1 text

  useEffect(() => {
    // Simulate loading process for exactly 4 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, transition: { duration: 0.5 } },
  };

  // const letterVariants = { // Removed H1 text variants
  //   hidden: { opacity: 0, y: 20 },
  //   visible: (i: number) => ({
  //     opacity: 1,
  //     y: 0,
  //     transition: {
  //       delay: i * 0.1,
  //       duration: 0.5,
  //       ease: "easeInOut",
  //     },
  //   }),
  // };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center bg-white text-gray-900 z-50 overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Logo */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img src="/images/logo1.png" alt="HostelConnect Logo" className="h-48 w-48 object-contain" />
          </motion.div>

          {/* Animated H1 Text */}
          {/* Removed H1 text as per request */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen; 