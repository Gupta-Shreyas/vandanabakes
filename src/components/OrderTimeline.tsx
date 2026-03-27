'use client';

import { motion } from 'framer-motion';
import { Check, Clock, Flame, Package } from 'lucide-react';

interface Props {
  currentStep: number; 
}

const steps = [
  { id: 1, name: 'Placed', icon: <Check className="w-5 h-5" /> },
  { id: 2, name: 'Confirmed', icon: <Clock className="w-5 h-5" /> },
  { id: 3, name: 'Baking', icon: <Flame className="w-5 h-5" /> },
  { id: 4, name: 'Ready', icon: <Package className="w-5 h-5" /> },
];

export default function OrderTimeline({ currentStep = 3 }: Props) {
  return (
    <div className="py-8 px-4 w-full">
      <div className="relative max-w-3xl mx-auto flex items-center justify-between before:absolute before:inset-0 before:ml-[10%] before:-mr-[10%] before:h-1 before:top-1/2 before:-translate-y-1/2 before:w-[80%] before:bg-[#FFD1DC] before:z-0">
        
        {/* Dynamic completed line */}
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 left-[10%] h-1 bg-[#E63946] z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${(Math.max(1, currentStep) - 1) / (steps.length - 1) * 80}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep >= step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-3">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: step.id * 0.1 }}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors duration-500 border-4 border-white ${
                  isCompleted ? 'bg-[#E63946] text-white' : 'bg-[#FFF0F5] text-[#FFD1DC]'
                }`}
              >
                {step.icon}
              </motion.div>
              <div className={`text-sm font-bold font-['Nunito'] ${isCompleted ? 'text-[#2D1810]' : 'text-[#FFD1DC]'}`}>
                {step.name}
              </div>
              {isCurrent && (
                <motion.div 
                  layoutId="pulse-indicator"
                  className="absolute -bottom-4 w-1.5 h-1.5 rounded-full bg-[#E63946]" 
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
