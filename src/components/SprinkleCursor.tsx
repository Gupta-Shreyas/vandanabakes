'use client';

import { useEffect, useState, useRef } from 'react';

interface Point {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
}

const COLORS = ['#FFD1DC', '#E63946', '#FFFFFF'];

export default function SprinkleCursor() {
  const [points, setPoints] = useState<Point[]>([]);
  const idRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle generating new points to avoid too much overhead
      if (Math.random() > 0.4) return;
      
      const newPoint = {
        id: idRef.current++,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotation: Math.random() * 360
      };
      
      setPoints(prev => [...prev.slice(-20), newPoint]);
      
      // Auto-remove the point after animation duration (1s)
      setTimeout(() => {
        setPoints(prev => prev.filter(p => p.id !== newPoint.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {points.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full animate-fade-out-up shadow-sm border border-black/5"
          style={{
            left: p.x - 4,
            top: p.y - 4,
            width: '8px',
            height: '16px', // Capsule/sprinkle shape
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`
          }}
        />
      ))}
    </div>
  );
}
