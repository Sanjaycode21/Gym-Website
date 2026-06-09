"use client";

import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in seconds
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1.5,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalMiliseconds = duration * 1000;
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed >= totalMiliseconds) {
        setCount(end);
        return;
      }

      // Ease out quad formula
      const progress = elapsed / totalMiliseconds;
      const easedProgress = progress * (2 - progress);

      setCount(Math.floor(start + (end - start) * easedProgress));
      requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={`font-mono ${className}`}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}
