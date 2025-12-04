
"use client";

import React from 'react';
import MerchantPublicView from '@/components/marketplace/views/MerchantPublicView';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import GeminiAssistant from '@/components/common/GeminiAssistant';

export default function MerchantPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'food';
  const id = params.id;

  // In a real app, fetch merchant data by ID here
  const mockMerchant = {
    id: id,
    name: 'اسم المتجر (مثال)',
    category: type,
    rating: 4.8,
    reviews: 120,
    location: 'المعادي، القاهرة',
    image: 'https://ui-avatars.com/api/?name=Merchant&background=random',
    cover: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80'
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-ray-black dark:text-white dir-rtl">
      <MerchantPublicView 
        merchant={mockMerchant} 
        onBack={() => router.back()} 
      />
      <GeminiAssistant context="customer" />
    </div>
  );
}
