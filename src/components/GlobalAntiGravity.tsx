'use client';

import { useScroll, useVelocity, useTransform, useSpring, motion, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  type: string;
  parallaxSpeed: number;
}

// Generates random particles
const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // vw
    y: Math.random() * 100, // vh
    size: Math.random() * 20 + 10,
    type: ['🍓', '🌸', '✨', '🧁'][Math.floor(Math.random() * 4)],
    parallaxSpeed: Math.random() * 2 + 0.5
  }));
};

export default function GlobalAntiGravity() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  
  // Base translateY transformation.
  const baseVelocity = useTransform(smoothVelocity, [-1000, 0, 1000], [-50, 0, 50]);

  useEffect(() => {
    // Generate only on client to avoid hydration mismatch
    const raf = requestAnimationFrame(() => {
      setParticles(generateParticles(25));
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <FallingParticle 
          key={p.id} 
          p={p} 
          scrollY={scrollY} 
          baseVelocity={baseVelocity} 
        />
      ))}
    </div>
  );
}

function FallingParticle({ p, scrollY, baseVelocity }: { p: Particle; scrollY: MotionValue<number>; baseVelocity: MotionValue<number> }) {
  // Individual parallax element based on scrollY
  const yTransform = useTransform(scrollY, (val: number) => {
    return (val * -p.parallaxSpeed) * 0.2;
  });

  // Add the velocity-based boost to the base transform
  const finalY = useTransform(() => yTransform.get() + baseVelocity.get() * (p.parallaxSpeed * 0.5));

  return (
    <motion.div
      className="absolute opacity-30 mix-blend-multiply"
      style={{
        left: `${p.x}vw`,
        top: `${p.y}vh`,
        fontSize: `${p.size}px`,
        y: finalY,
        rotate: p.y * 3
      }}
    >
      {p.type}
    </motion.div>
  );
}
