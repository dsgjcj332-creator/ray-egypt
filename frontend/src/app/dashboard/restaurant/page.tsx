'use client';

import React from 'react';
import RestaurantDashboard from '@/components/dashboard/restaurant/RestaurantDashboard';

export default function RestaurantPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <RestaurantDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
