'use client';
import { motion } from 'framer-motion';

const capacities = [
  { day: 'Today', date: 'Oct 24', booked: 5, total: 5 },
  { day: 'Tomorrow', date: 'Oct 25', booked: 4, total: 5 },
  { day: 'Day After', date: 'Oct 26', booked: 1, total: 5 },
];

export default function OvenCapacityCalendar() {
  return (
    <section className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-[#FFD1DC] flex flex-col items-center">
      <div className="text-center space-y-2 mb-10 border-b border-[#FFF0F5] pb-8 w-full">
        <h2 className="text-3xl font-['Pacifico'] text-[#2D1810]">Live Oven Capacity</h2>
        <p className="text-[#6B5B53]">We only bake 5 custom cakes Daily to ensure absolute perfection.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
        {capacities.map((item, idx) => {
          const percentFull = (item.booked / item.total) * 100;
          const isUrgent = percentFull >= 80;
          const isSoldOut = percentFull === 100;

          return (
            <div key={idx} className="bg-[#FFF0F5] rounded-2xl p-6 relative flex flex-col gap-4 border border-transparent hover:border-[#FFD1DC] transition-colors">
              {isSoldOut && (
                <span className="absolute -top-3 -right-3 bg-[#E63946] text-white text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 rotate-12">
                  Sold Out!
                </span>
              )}
              {!isSoldOut && isUrgent && (
                <span className="absolute -top-3 -right-3 bg-[#FFD700] text-[#2D1810] text-xs font-bold px-3 py-1 rounded-full shadow-md z-10 -rotate-6">
                  Only {item.total - item.booked} Left!
                </span>
              )}

              <div>
                <h4 className="font-bold text-lg text-[#2D1810]">{item.day}</h4>
                <p className="text-sm text-[#6B5B53]">{item.date}</p>
              </div>

              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-xs font-bold text-[#6B5B53]">
                  <span>Capacity</span>
                  <span>{percentFull}% Full</span>
                </div>
                <div className="w-full h-3 bg-white rounded-full overflow-hidden border border-[#FFD1DC]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentFull}%` }}
                    transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                    viewport={{ once: true }}
                    className={`h-full rounded-full ${isUrgent ? 'bg-[#E63946]' : 'bg-[#FFD1DC]'}`}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
