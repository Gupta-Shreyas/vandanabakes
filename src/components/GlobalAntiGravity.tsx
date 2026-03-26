'use client';
import { motion, useScroll, useVelocity, useSpring, useTransform } from 'framer-motion';

export default function GlobalAntiGravity() {
  const { scrollYProgress } = useScroll();
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const yOffset = useTransform(smoothVelocity, [-1, 0, 1], [150, 0, -150]);

  // Decorative particles
  const particles = [
    { text: '🍓', left: '10%', top: '20%' },
    { text: '✨', left: '80%', top: '30%' },
    { text: '🧁', left: '15%', top: '50%' },
    { text: '🍫', left: '85%', top: '70%' },
    { text: '🍒', left: '20%', top: '85%' },
    { text: '✨', left: '75%', top: '15%' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute text-4xl opacity-60 drop-shadow-lg"
          style={{
            left: p.left,
            top: p.top,
            y: yOffset,
          }}
        >
          {p.text}
        </motion.div>
      ))}
    </div>
  );
}
