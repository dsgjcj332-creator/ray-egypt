
import React, { useState, useEffect } from 'react';
import Marketplace from './components/Marketplace';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';
import { BusinessType } from './components/dashboard/config';
import { ThemeProvider } from './components/common/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/ToastContext';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.MARKETPLACE);
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType>('restaurant');

  // Splash Screen Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleMerchantEntry = (type: string = 'restaurant') => {
    setSelectedBusinessType(type as BusinessType);
    setCurrentView(ViewState.DASHBOARD);
  };

  return (
    <AuthProvider>
      <ThemeProvider>
        <ToastProvider>
          {isLoading ? (
            <div className="fixed inset-0 bg-ray-blue flex items-center justify-center z-50 flex-col">
              <div className="w-24 h-24 bg-ray-gold rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(253,184,19,0.4)] animate-bounce">
                <span className="text-6xl font-black text-ray-blue">R</span>
              </div>
              <h1 className="text-3xl font-black text-white mt-6 tracking-wider animate-pulse">RAY</h1>
              <p className="text-blue-200 mt-2 text-sm font-medium">نور طريق نجاحك</p>
            </div>
          ) : (
            <>
              {currentView === ViewState.MARKETPLACE && (
                <Marketplace onGoToSystems={() => handleMerchantEntry()} />
              )}
              {currentView === ViewState.DASHBOARD && (
                <Dashboard 
                  initialType={selectedBusinessType} 
                  onLogout={() => setCurrentView(ViewState.MARKETPLACE)} 
                />
              )}
            </>
          )}
        </ToastProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
