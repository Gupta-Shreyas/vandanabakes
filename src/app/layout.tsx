import type { Metadata } from 'next';
import { Pacifico, Nunito } from 'next/font/google';
import './globals.css';
import CartDrawer from '@/components/CartDrawer';
import PincodeChecker from '@/components/PincodeChecker';
import MagicalTicketModal from '@/components/MagicalTicketModal';
import LiveOvenCapacity from '@/components/LiveOvenCapacity';

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Vandana Bakes | Premium Home Bakery',
  description: 'A premium home bakery where every cake is baked to order. No freezing, no shortcuts, just pure home-baked love.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${pacifico.variable} ${nunito.variable}`}>
      <body className="antialiased bg-[#FFF0F5] font-['Nunito'] text-[#2D1810]">
        <PincodeChecker />
        <LiveOvenCapacity />
        {children}
        <CartDrawer />
        <MagicalTicketModal />
      </body>
    </html>
  );
}
