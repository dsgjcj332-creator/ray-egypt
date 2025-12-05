'use client';

import React from 'react';
import ClinicDashboard from '@/components/dashboard/clinic/ClinicDashboard';

export default function ClinicPage() {
  const handleLogout = () => {
    console.log('Logout');
  };
  
  const handleSwitchType = (type: any) => {
    console.log('Switch to:', type);
  };

  return (
    <ClinicDashboard 
      onLogout={handleLogout}
      onSwitchType={handleSwitchType}
    />
  );
}
