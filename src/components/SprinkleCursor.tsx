'use client';
import { useEffect, useState } from 'react';

type Sprinkle = {
  id: number;
  x: number;
  y: number;
  color: string;
};

const colors = ['#FFD1DC', '#E63946', '#FFFFFF'];

export default function SprinkleCursor() {
  const [sprinkles, setSprinkles] = useState<Sprinkle[]>([]);

  useEffect(() => {
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < 50) return; // Throttled to ~20fps
      lastTime = now;

      const newSprinkle: Sprinkle = {
        id: now,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)]
      };

      setSprinkles(prev => [...prev, newSprinkle]);

      setTimeout(() => {
        setSprinkles(prev => prev.filter(s => s.id !== newSprinkle.id));
      }, 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {sprinkles.map(s => (
        <div
          key={s.id}
          className="sprinkle"
          style={{
            left: s.x,
            top: s.y,
            backgroundColor: s.color,
            width: '6px',
            height: '14px',
          }}
        />
      ))}
    </>
  );
}
