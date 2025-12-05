'use client';

import React from 'react';
import GymDashboard from '@/components/dashboard/gym/GymDashboard';

export default function GymPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <GymDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
