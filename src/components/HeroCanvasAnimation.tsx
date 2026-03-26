'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useVelocity, useSpring } from 'framer-motion';

export default function HeroCanvasAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Track scroll on the entire window so animation persists
  const { scrollYProgress } = useScroll();
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const FRAME_COUNT = 240;

  useEffect(() => {
    // Preload images
    const loadImages = async () => {
      const loadedImages: HTMLImageElement[] = [];
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/frames/frame_${i}.jpg`;
        loadedImages.push(img);
      }
      setImages(loadedImages);
    };
    loadImages();
  }, []);

  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
  // Render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    let animationFrameId: number;

    const render = () => {
      const idx = Math.min(FRAME_COUNT - 1, Math.max(0, Math.floor(frameIndex.get())));
      
      const img = images[idx];
      if (img && img.complete) {
        // Draw image covering the whole canvas (object-fit: cover equivalent)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      } else {
        // Optional backdrop while loading
        ctx.fillStyle = '#FFF0F5';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, [images, frameIndex]);

  // Anti-gravity text physics
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const yOffset = useTransform(smoothVelocity, [-1, 0, 1], [50, 0, -50]);

  return (
    <>
      <div className="fixed inset-0 z-[-10] w-full h-full bg-[#FFF0F5]">
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover opacity-80" 
        />
      </div>

      <section className="relative h-[150vh] flex flex-col items-center justify-start pt-[30vh]">
        <div className="relative z-10 pointer-events-none flex flex-col items-center justify-center w-full">
          <motion.div style={{ y: yOffset }} className="text-center bg-white/70 backdrop-blur-md p-10 md:p-16 rounded-[3rem] shadow-2xl border-4 border-white mx-4">
            <h1 className="text-7xl md:text-8xl font-['Pacifico'] text-[#E63946] mb-4 drop-shadow-sm tracking-wide">
              Vandana Bakes
            </h1>
            <p className="font-['Nunito'] text-2xl md:text-3xl font-bold text-[#6B5B53] tracking-widest uppercase">
              Home-Baked Love
            </p>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70 z-10">
          <span className="text-sm font-bold tracking-widest text-[#2D1810] uppercase mb-2">Scroll to slice</span>
          <div className="w-[2px] h-12 bg-gradient-to-b from-[#E63946] to-transparent" />
        </div>
      </section>
    </>
  );
}
