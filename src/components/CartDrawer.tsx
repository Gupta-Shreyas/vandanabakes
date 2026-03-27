'use client';

import { useStore } from '@/store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Calendar, Clock, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useStore();
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  
  // Upsells
  const upsells = [
    { id: 'u1', name: 'Sparkle Candle', price: 50, icon: <Sparkles className="w-4 h-4 text-[#E63946] inline" /> },
    { id: 'u2', name: 'Birthday Topper', price: 150, icon: <span className="inline text-[#E63946]">🎂</span> }
  ];

  const handleCheckout = () => {
    alert('Proceeding to checkout with: ' + JSON.stringify({ cart, date, timeSlot }, null, 2));
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#FFF0F5] shadow-2xl z-50 flex flex-col rounded-l-[2rem] border-l border-[#FFD1DC]"
          >
            {/* Header */}
            <div className="p-6 border-b border-[#FFD1DC] flex justify-between items-center bg-white rounded-tl-[2rem]">
              <h2 className="text-2xl font-['Pacifico'] text-[#E63946]">Your Cart</h2>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-[#FFF0F5] rounded-full transition-colors text-[#6B5B53]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="text-center text-[#6B5B53] mt-10">
                  <p>Your cart is empty.</p>
                  <p className="text-sm mt-2">Let&apos;s add some sweetness! 🍰</p>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="bg-white p-4 rounded-[2rem] shadow-sm flex gap-4 items-center border border-[#FFD1DC]"
                  >
                    <div className="w-20 h-20 bg-[#FFF0F5] rounded-[1rem] flex-shrink-0 overflow-hidden relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-['Nunito'] font-bold text-[#2D1810]">{item.name}</h3>
                      <p className="text-sm text-[#6B5B53]">{item.size} {item.isEggless && '(Eggless)'}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="font-bold text-[#E63946]">₹{item.price}</span>
                        <div className="flex items-center gap-2 bg-[#FFF0F5] rounded-full px-2 py-1">
                          <button 
                            className="w-6 h-6 flex items-center justify-center rounded-full text-[#E63946] font-bold hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >-</button>
                          <span className="text-sm w-4 text-center">{item.quantity}</span>
                          <button 
                            className="w-6 h-6 flex items-center justify-center rounded-full text-[#E63946] font-bold hover:bg-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >+</button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#6B5B53] hover:text-[#E63946] p-2 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))
              )}

              {/* Date & Time Selector */}
              {cart.length > 0 && (
                <div className="bg-white p-4 rounded-[2rem] border border-[#FFD1DC] mt-4 space-y-4">
                  <h3 className="font-['Nunito'] font-bold text-[#2D1810]">Delivery Details</h3>
                  <div className="flex gap-2 items-center bg-[#FFF0F5] rounded-full px-4 py-2 border border-[#FFD1DC]">
                    <Calendar className="w-4 h-4 text-[#E63946]" />
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm text-[#2D1810] flex-1"
                    />
                  </div>
                  <div className="flex gap-2 items-center bg-[#FFF0F5] rounded-full px-4 py-2 border border-[#FFD1DC]">
                    <Clock className="w-4 h-4 text-[#E63946]" />
                    <select 
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm text-[#2D1810] flex-1"
                    >
                      <option value="">Select Time Slot</option>
                      <option value="10:00 AM - 1:00 PM">10:00 AM - 1:00 PM</option>
                      <option value="2:00 PM - 5:00 PM">2:00 PM - 5:00 PM</option>
                      <option value="6:00 PM - 9:00 PM">6:00 PM - 9:00 PM</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Checkout Upsells (Slider) */}
              {cart.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-['Nunito'] text-sm font-bold text-[#2D1810] mb-2 px-2">Make it special!</h3>
                  <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar px-2 snap-x">
                    {upsells.map(u => (
                      <div key={u.id} className="min-w-[140px] bg-white p-3 rounded-[1.5rem] border border-[#FFD1DC] flex flex-col gap-2 snap-start flex-shrink-0">
                        <div className="text-sm font-bold text-[#2D1810] flex items-center gap-1">{u.icon} {u.name}</div>
                        <div className="flex justify-between items-center mt-auto">
                          <span className="text-[#E63946] text-sm">+₹{u.price}</span>
                          <button className="text-xs bg-[#FFF0F5] text-[#E63946] px-2 py-1 rounded-full font-bold hover:bg-[#E63946] hover:text-white transition-colors">Add</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Checkout */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#FFD1DC] rounded-bl-[2rem] gap-4 flex flex-col">
                <div className="flex justify-between items-center font-bold font-['Nunito'] text-[#2D1810]">
                  <span>Subtotal</span>
                  <span className="text-xl text-[#E63946]">₹{subtotal}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full py-4 bg-[#E63946] text-white rounded-full font-bold shadow-lg shadow-[#E63946]/30 hover:shadow-[#E63946]/50 transition-shadow active:scale-[0.98]"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
