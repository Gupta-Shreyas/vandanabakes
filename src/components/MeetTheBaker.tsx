import { bakerProfile } from '@/data/bakeryData';
import Image from 'next/image';

export default function MeetTheBaker() {
  return (
    <section className="py-16 md:py-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden bg-white shadow-lg border-2 border-[#FFD1DC]">
          <div className="absolute inset-0 bg-gradient-to-t from-[#2D1810]/40 to-transparent z-10" />
          <Image 
            src="/baker.jpg" 
            alt={`Meet ${bakerProfile.name}`} 
            fill 
            className="object-cover"
          />
        </div>

        <div className="space-y-6">
          <h2 className="text-sm uppercase tracking-widest text-[#E63946] font-bold">Meet The Baker</h2>
          <h3 className="text-4xl md:text-5xl font-['Pacifico'] text-[#2D1810]">
            Hi, I'm {bakerProfile.name}
          </h3>
          <p className="text-lg md:text-xl text-[#6B5B53] leading-relaxed">
            {bakerProfile.bio}
          </p>
          <div className="inline-block bg-white border border-[#FFD1DC] rounded-xl px-6 py-4 shadow-sm">
            <p className="text-[#E63946] font-semibold flex items-center gap-2">
              <span className="text-xl">✨</span> {bakerProfile.capacityMessage}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
