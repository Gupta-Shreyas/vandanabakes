import OrderTimeline from '@/components/OrderTimeline';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw } from 'lucide-react';

export default function AccountPage() {
  const pastOrders = [
    { id: 'ORD-89A2', date: 'Oct 24, 2026', total: 600, items: '1/2 Kg Pineapple Cake', status: 'Delivered' },
    { id: 'ORD-76B1', date: 'Sep 15, 2026', total: 1200, items: 'Box of 6 Cupcakes', status: 'Delivered' }
  ];

  return (
    <main className="min-h-screen bg-[#FFF0F5] relative p-4 md:p-12 font-['Nunito']">
      <div className="max-w-4xl mx-auto space-y-8">
        <Link href="/" className="inline-flex items-center gap-2 text-[#E63946] font-bold hover:opacity-80 transition-opacity">
          <ArrowLeft className="w-5 h-5" /> Back to Bakery
        </Link>
        
        <div>
          <h1 className="text-4xl font-['Pacifico'] text-[#2D1810]">Your Sweet Journey</h1>
          <p className="text-[#6B5B53] mt-2">Track your active orders and view your past treats.</p>
        </div>

        {/* Active Order with Timeline */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#FFD1DC] flex flex-col items-center">
          <div className="w-full flex justify-between items-center mb-6 border-b border-[#FFD1DC] pb-4">
            <div>
              <h2 className="font-bold text-xl text-[#2D1810]">Active Order <span className="text-[#E63946]">#ORD-90F3</span></h2>
              <p className="text-sm text-[#6B5B53]">Arriving today by 5:00 PM</p>
            </div>
          </div>
          <OrderTimeline currentStep={3} />
        </div>

        {/* Past Orders */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-[#FFD1DC]">
          <h2 className="font-bold text-xl text-[#2D1810] mb-6">Past Orders</h2>
          <div className="space-y-4">
            {pastOrders.map(order => (
              <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[#FFF0F5] rounded-[1.5rem] border border-[#FFD1DC]">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#E63946]">{order.id}</span>
                    <span className="text-sm text-[#6B5B53]">{order.date}</span>
                  </div>
                  <p className="font-bold text-[#2D1810] mt-1">{order.items}</p>
                  <p className="text-sm text-[#6B5B53]">Total: ₹{order.total}</p>
                </div>
                <button className="mt-4 md:mt-0 flex items-center justify-center gap-2 bg-white text-[#E63946] px-6 py-2 rounded-full font-bold shadow-sm shadow-[#FFD1DC] border border-[#FFD1DC] hover:bg-[#E63946] hover:text-white transition-colors">
                  <RefreshCcw className="w-4 h-4" /> Reorder
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
