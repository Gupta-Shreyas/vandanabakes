import HeroCanvasAnimation from '@/components/HeroCanvasAnimation';
import ProductShowcase from '@/components/ProductShowcase';
import OvenCapacityCalendar from '@/components/OvenCapacityCalendar';
import CupcakeBuilder from '@/components/CupcakeBuilder';
import MeetTheBaker from '@/components/MeetTheBaker';
import LiveBakingToast from '@/components/LiveBakingToast';
import SprinkleCursor from '@/components/SprinkleCursor';
import GlobalAntiGravity from '@/components/GlobalAntiGravity';

export default function Home() {
  return (
    <main className="bg-transparent min-h-screen relative overflow-hidden">
      <GlobalAntiGravity />
      <SprinkleCursor />
      <HeroCanvasAnimation />

      <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
        <MeetTheBaker />
        <OvenCapacityCalendar />
        <ProductShowcase />
        <CupcakeBuilder />
      </div>

      <LiveBakingToast />
    </main>
  );
}
