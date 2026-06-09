"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if the loader has already played in the current session
    const hasLoaded = sessionStorage.getItem("ironforge-loaded");
    
    if (hasLoaded) {
      setIsVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("ironforge-loaded", "true");
    }, 2200); // 2.2 seconds total animation time

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    exit: {
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.76, 0, 0.24, 1], // easeInOutQuint for luxury feel
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: 0.6,
      },
    },
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={containerVariants}
          initial="initial"
          exit="exit"
          className="fixed inset-0 z-[9999] bg-background-stitch flex flex-col items-center justify-center overflow-hidden"
        >
          <div className="flex flex-col items-center gap-4">
            {/* Animated Logo Text */}
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={textVariants}
              className="font-bebas text-6xl md:text-8xl tracking-[0.3em] text-primary"
            >
              IRONFORGE
            </motion.h1>

            {/* Fading Gold Bar */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="h-[1px] w-48 bg-primary origin-center"
            />

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="font-dm-sans text-[10px] tracking-[0.4em] text-on-surface-variant uppercase mt-2"
            >
              LUXURY ATHLETICS
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
