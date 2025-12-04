
"use client";

import React from 'react';
import Header from '@/components/marketplace/layout/Header';
import Footer from '@/components/marketplace/layout/Footer';
import CartView from '@/components/marketplace/views/consumer/CartView';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main className="pt-4 pb-20">
        <CartView onNavigate={(view) => {
            if(view === 'checkout') router.push('/checkout'); // Assuming you create checkout page later or handle it here
            else router.push(`/${view}`);
        }} />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
