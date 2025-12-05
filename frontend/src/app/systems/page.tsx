
"use client";

import React from 'react';
import SystemsHub from '@/components/systems/SystemsHub';
import { useRouter } from 'next/navigation';

export default function SystemsPage() {
  const router = useRouter();

  const handleSystemSelect = (systemId: string) => {
    // For now, direct to dashboard with query param to simulate selection
    // Ideally, this would go to a registration flow then dashboard
    router.push(`/dashboard?type=${systemId}`);
  };

  return (
    <SystemsHub 
      onSystemSelect={handleSystemSelect} 
      onBackToMarketplace={() => router.push('/')} 
    />
  );
}
