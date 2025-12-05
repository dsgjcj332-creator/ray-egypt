
"use client";

import React from 'react';
import Header from '@/components/marketplace/layout/Header';
import Footer from '@/components/marketplace/layout/Footer';
import CheckoutView from '@/components/marketplace/views/consumer/CheckoutView';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans dir-rtl">
      <Header />
      <main className="pt-4 pb-20">
        <CheckoutView 
          onBack={() => router.back()} 
          onComplete={(orderId) => router.push(`/order-tracking?id=${orderId}`)} 
        />
      </main>
      <Footer onGoToSystems={() => router.push('/systems')} />
    </div>
  );
}
