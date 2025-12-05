
import React, { useState, useEffect } from 'react';
import GeminiAssistant from './common/GeminiAssistant';
import Header from './dashboard/layout/Header';
import Sidebar from './dashboard/layout/Sidebar';
import MobileSidebar from './dashboard/layout/MobileSidebar';
import { BusinessType, colorClasses, dashboardConfigs } from './dashboard/config';

// Import Specific Dashboards
import RestaurantDashboard from './dashboard/restaurant/RestaurantDashboard';
import RetailDashboard from './dashboard/retail/RetailDashboard';
import PharmacyDashboard from './dashboard/pharmacy/PharmacyDashboard';
import BookingsDashboard from './dashboard/bookings/BookingsDashboard';
import RealEstateDashboard from './dashboard/realestate/RealEstateDashboard';
import CarsDashboard from './dashboard/cars/CarsDashboard';
import ClinicDashboard from './dashboard/clinic/ClinicDashboard';
import GymDashboard from './dashboard/gym/GymDashboard';
import ServicesDashboard from './dashboard/services/ServicesDashboard';
import LaundryDashboard from './dashboard/laundry/LaundryDashboard';
import ClothingDashboard from './dashboard/clothing/ClothingDashboard';
import SalonDashboard from './dashboard/salon/SalonDashboard';
import ContractingDashboard from './dashboard/contracting/ContractingDashboard';
import CarWashDashboard from './dashboard/carwash/CarWashDashboard'; 
import SystemManagementView from './dashboard/admin/SystemManagementView';
import UserManagementView from './dashboard/admin/UserManagementView';
import ReportsView from './dashboard/admin/ReportsView';

// Generic Views
import Overview from './dashboard/views/Overview';
import SettingsView from './dashboard/views/SettingsView';
import UniversalDataView from './dashboard/views/UniversalDataView';
import ServicePOS from './dashboard/pos/ServicePOS';
import RetailPOS from './dashboard/retail/RetailPOS';

interface DashboardProps {
  onLogout: () => void;
  initialType: BusinessType;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, initialType }) => {
  // Check for admin mode from URL or localStorage
  const [isAdmin, setIsAdmin] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const userStored = localStorage.getItem('userType');
      return urlParams.get('admin') === 'true' || userStored === 'admin';
    }
    return false;
  });

  const [currentBusinessType, setCurrentBusinessType] = useState<BusinessType>(isAdmin ? 'admin' : 'general');
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(colorClasses['slate']);

  // Update admin mode when localStorage or URL changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const userStored = localStorage.getItem('userType');
      const shouldBeAdmin = urlParams.get('admin') === 'true' || userStored === 'admin';
      
      if (shouldBeAdmin !== isAdmin) {
        setIsAdmin(shouldBeAdmin);
        setCurrentBusinessType(shouldBeAdmin ? 'admin' : 'general');
      }
    }
  }, [isAdmin]);

  // Ensure if initialType changes, we update
  useEffect(() => {
    if (initialType && !isAdmin) {
      setCurrentBusinessType(initialType);
    }
  }, [initialType, isAdmin]);

  const renderGenericContent = (type: BusinessType) => {
    const theme = colorClasses[dashboardConfigs[type]?.themeColor || 'blue'];
    
    switch (activeTab) {
      case 'settings':
        return <SettingsView />;
      case 'pos':
        return <RetailPOS />;
      case 'reports':
      case 'analytics':
        return <UniversalDataView type="reports" theme={theme} />;
      case 'inventory':
      case 'products':
        return <UniversalDataView type="products" theme={theme} />;
      case 'customers':
      case 'users':
        return <UniversalDataView type="customers" theme={theme} />;
      case 'staff':
      case 'team':
        return <UniversalDataView type="staff" theme={theme} />;
      case 'overview':
      default:
        return (
          <Overview 
            config={dashboardConfigs[type] || dashboardConfigs['retail']} 
            currentBusinessType={type} 
            theme={theme} 
            onNavigate={setActiveTab}
          />
        );
    }
  };

  const renderGenericDashboard = () => {
    const config = dashboardConfigs[currentBusinessType] || dashboardConfigs['retail'];
    const theme = colorClasses[config.themeColor] || colorClasses['blue'];
    
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex font-sans transition-colors">
        <Sidebar 
          config={config} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={currentBusinessType}
        />
        <MobileSidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          config={config}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={config} 
            currentBusinessType={currentBusinessType} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={theme}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onNavigate={setActiveTab}
          />
          <div className="p-4 md:p-6 max-w-7xl mx-auto flex-1 w-full">
            {renderGenericContent(currentBusinessType)}
          </div>
        </main>
      </div>
    );
  };

  const renderGeneralHub = () => {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors">
        <Sidebar 
          config={dashboardConfigs['general']} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={'general'}
        />
        <MobileSidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          config={dashboardConfigs['general']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={onLogout}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={dashboardConfigs['general']} 
            currentBusinessType={'general'} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={colorClasses['slate']}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onNavigate={setActiveTab}
          />
          <div className="flex-1 w-full max-w-7xl mx-auto">
             {activeTab === 'settings' ? <SettingsView /> : 
 activeTab === 'system-management' ? <SystemManagementView /> :
 activeTab === 'user-management' ? <UserManagementView /> :
 activeTab === 'reports' ? <ReportsView /> :
 <SettingsView />}
          </div>
        </main>
      </div>
    );
  };

  const renderAdminDashboard = () => {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex font-sans transition-colors">
        <Sidebar 
          config={dashboardConfigs['general']} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLogout={onLogout} 
          currentBusinessType={'admin'}
        />
        <main className="flex-1 overflow-y-auto h-screen flex flex-col">
          <Header 
            config={dashboardConfigs['general']} 
            currentBusinessType={'admin'} 
            setCurrentBusinessType={setCurrentBusinessType} 
            theme={colorClasses['slate']}
            onMenuClick={() => setIsMobileMenuOpen(true)}
            onNavigate={setActiveTab}
          />
          <div className="flex-1 w-full max-w-7xl mx-auto">
             {activeTab === 'settings' ? <SettingsView /> : 
             activeTab === 'system-management' ? <SystemManagementView /> :
             activeTab === 'user-management' ? <UserManagementView /> :
             activeTab === 'reports' ? <ReportsView /> :
             <SettingsView />}
          </div>
        </main>
      </div>
    );
  };

  const renderBusinessDashboard = () => {
    switch (currentBusinessType) {
      case 'restaurant':
        return <RestaurantDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'retail':
      case 'supermarket':
      case 'electronics':
        return <RetailDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type={currentBusinessType} />;
      case 'pharmacy':
        return <PharmacyDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'clinic':
      case 'gym':
      case 'salon':
      case 'nursery':
        return <BookingsDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} type={currentBusinessType} />;
      case 'realestate':
        return <RealEstateDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'cars':
        return <CarsDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'services':
        return <ServicesDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'laundry':
        return <LaundryDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'clothing':
        return <ClothingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'contracting':
        return <ContractingDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      case 'carwash':
        return <CarWashDashboard onLogout={onLogout} onSwitchType={setCurrentBusinessType} />;
      default:
        return renderGenericDashboard();
    }
  };

  const renderDashboard = () => {
    if (currentBusinessType === 'admin') {
      return renderAdminDashboard();
    }
    return renderBusinessDashboard();
  };

  return (
    <>
      {renderDashboard()}
      <GeminiAssistant context="merchant" />
    </>
  );
};

export default Dashboard;
