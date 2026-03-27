'use client';

import { bakerProfile } from '@/data/bakeryData';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MeetTheBaker() {
  const steps = [
    { title: 'Gathering', text: 'Fresh, local ingredients hand-picked daily' },
    { title: 'Mixing', text: 'Fold in the love, follow family recipes' },
    { title: 'Baking', text: 'Baked to golden perfection' }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-lg border-2 border-[#FFD1DC] group">
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/60 to-transparent z-10 transition-opacity duration-300 opacity-80" />
          <Image 
            src="/baker.jpg" 
            alt={`Meet ${bakerProfile.name}`} 
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
            <h3 className="text-3xl font-['Pacifico'] mb-2">{bakerProfile.name}</h3>
            <p className="text-sm border-t border-white/30 pt-2 opacity-90 text-white/90">
              Turning simple ingredients into magical moments.
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="text-sm uppercase tracking-widest text-[#E63946] font-bold">Meet The Artisan</h2>
            <h3 className="text-4xl md:text-5xl font-['Pacifico'] text-[#2D1810]">
              Baked Fresh to Order
            </h3>
            <p className="text-lg text-[#6B5B53] leading-relaxed">
              {bakerProfile.bio}
            </p>
            <div className="inline-block bg-[#FFF0F5] border border-[#FFD1DC] rounded-xl px-6 py-4 shadow-sm mt-2">
              <p className="text-[#E63946] font-semibold flex items-center gap-2">
                <span className="text-xl">✨</span> {bakerProfile.capacityMessage}
              </p>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="space-y-6 pt-4 border-t border-[#FFF0F5]">
            <h4 className="font-['Nunito'] font-bold text-[#2D1810] text-xl">The Process</h4>
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <motion.div 
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.2 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E63946] text-white flex items-center justify-center font-bold text-sm shadow-md">
                      {idx + 1}
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="w-0.5 h-12 bg-[#FFD1DC] mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h5 className="font-bold text-[#2D1810] mb-1">{step.title}</h5>
                    <p className="text-sm text-[#6B5B53]">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
