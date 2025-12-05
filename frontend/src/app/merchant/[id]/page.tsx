
"use client";

import React from 'react';
import MerchantPublicView from '@/components/views/MerchantPublicView';
import { useRouter, useSearchParams, useParams } from 'next/navigation';
import GeminiAssistant from '@/components/common/GeminiAssistant';

export default function MerchantPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'food';
  const id = params.id;

  // In a real app, fetch merchant data by ID here
  const getMockMerchant = (merchantId: string) => {
    const merchants = {
      'supermarket-khair-zaman': {
        id: merchantId,
        name: 'سوبر ماركت خير زمان',
        category: 'supermarket',
        type: 'سوبر ماركت',
        rating: 4.8,
        reviews: 156,
        location: 'المعادي، القاهرة',
        image: 'https://ui-avatars.com/api/?name=خير+زمان&background=10B981&color=fff',
        cover: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80',
        phone: '01234567890',
        whatsapp: '201234567890',
        email: 'info@khairzaman.com'
      },
      'restaurant-almaza': {
        id: merchantId,
        name: 'مطعم المزة',
        category: 'food',
        type: 'مطعم',
        rating: 4.6,
        reviews: 89,
        location: 'الشيخ زايد، الجيزة',
        image: 'https://ui-avatars.com/api/?name=المزة&background=F59E0B&color=fff',
        cover: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80',
        phone: '01123456789',
        whatsapp: '201123456789',
        email: 'info@almaza.com'
      }
    };
    
    return merchants[merchantId as keyof typeof merchants] || {
      id: merchantId,
      name: 'اسم المتجر (مثال)',
      category: type,
      type: 'متجر',
      rating: 4.5,
      reviews: 50,
      location: 'القاهرة، مصر',
      image: 'https://ui-avatars.com/api/?name=Merchant&background=random',
      cover: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80'
    };
  };
  
  const mockMerchant = getMockMerchant(Array.isArray(id) ? id[0] : id);

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
