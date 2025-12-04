
"use client";

import React, { useState, useEffect } from 'react';
import GeminiAssistant from './common/GeminiAssistant';
import Header from './marketplace/layout/Header';
import Footer from './marketplace/layout/Footer';
import MobileBottomNav from './marketplace/layout/MobileBottomNav';
import Hero from './marketplace/sections/Hero';
import Categories from './marketplace/sections/Categories';
import Featured from './marketplace/sections/Featured';
import { MarketplaceProvider } from '../context/MarketplaceContext'; 

// Listings
import RestaurantListing from './marketplace/listings/RestaurantListing';
import RealEstateListing from './marketplace/listings/RealEstateListing';
import CarListing from './marketplace/listings/CarListing';
import ShoppingListing from './marketplace/listings/ShoppingListing';
import ServiceListing from './marketplace/listings/ServiceListing';
import HealthBeautyListing from './marketplace/listings/HealthBeautyListing';
import EventListing from './marketplace/listings/EventListing';

// Views
import MerchantPublicView from './marketplace/views/MerchantPublicView';
import UserProfileView from './marketplace/views/consumer/UserProfileView';
import CartView from './marketplace/views/consumer/CartView';
import CheckoutView from './marketplace/views/consumer/CheckoutView';
import FavoritesView from './marketplace/views/consumer/FavoritesView';
import NotificationsView from './marketplace/views/consumer/NotificationsView';
import SearchResultsView from './marketplace/views/SearchResultsView';
import OrderTrackingView from './marketplace/views/OrderTrackingView';
import OffersView from './marketplace/views/consumer/OffersView'; 
import AuthModal from './common/AuthModal';

// Pages (Now as Components)
import CategoriesPage from '../app/categories/page';
import BlogPage from '../app/blog/page';
import JobsPage from '../app/jobs/page';
import LoginPage from '../app/login/page';
import SignupPage from '../app/signup/page';

// Static Views
import AboutView from './marketplace/views/static/AboutView';
import ContactView from './marketplace/views/static/ContactView';
import HelpCenterView from './marketplace/views/static/HelpCenterView';
import LegalView from './marketplace/views/static/LegalView';

interface MarketplaceProps {
  onGoToSystems: () => void;
  onProductClick?: (id: string) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ onGoToSystems, onProductClick }) => {
  // Navigation States
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMerchant, setSelectedMerchant] = useState<any | null>(null);
  const [currentView, setCurrentView] = useState<string>('offers'); 
  const [viewParams, setViewParams] = useState<any>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedMerchant(null);
    setCurrentView('category_listing'); // Helper state to show listing
    window.scrollTo(0, 0);
  };

  const handleMerchantSelect = (merchantData: any) => {
    setSelectedMerchant(merchantData);
    window.scrollTo(0, 0);
  };
  
  const handleProductSelect = (id: string) => {
    if (onProductClick) {
        onProductClick(id);
    } else {
        // Fallback
        window.location.assign(`/product/${id}`);
    }
  };

  const goHome = () => {
    setSelectedCategory(null);
    setSelectedMerchant(null);
    setCurrentView('offers'); // Reset to Offers page
    setViewParams(null);
    window.scrollTo(0, 0);
  };

  const handleNavigate = (view: string, params?: any) => {
    if (view === 'systems') {
        onGoToSystems();
        return;
    }
    
    setCurrentView(view);
    if (params) setViewParams(params);
    
    if (!['search', 'order-tracking', 'checkout', 'merchant'].includes(view)) {
        setSelectedCategory(null);
        setSelectedMerchant(null);
    }
    window.scrollTo(0, 0);
  };

  const renderListing = () => {
    switch (selectedCategory) {
      case 'food': return <RestaurantListing onMerchantSelect={handleMerchantSelect} />;
      case 'realestate': return <RealEstateListing onMerchantSelect={handleMerchantSelect} />;
      case 'cars': return <CarListing onMerchantSelect={handleMerchantSelect} />;
      case 'shopping': return <ShoppingListing onMerchantSelect={handleMerchantSelect} onProductClick={handleProductSelect} />;
      case 'services': return <ServiceListing onMerchantSelect={handleMerchantSelect} />;
      case 'beauty': return <HealthBeautyListing category="beauty" onMerchantSelect={handleMerchantSelect} />;
      case 'health': return <HealthBeautyListing category="health" onMerchantSelect={handleMerchantSelect} />;
      case 'education': return <EventListing category="education" onMerchantSelect={handleMerchantSelect} />;
      case 'entertainment': return <EventListing category="entertainment" onMerchantSelect={handleMerchantSelect} />;
      default: return <RestaurantListing onMerchantSelect={handleMerchantSelect} title="المحلات والخدمات" />;
    }
  };

  const renderCurrentView = () => {
    switch(currentView) {
      case 'home': 
      case 'offers': return <OffersView onNavigate={handleNavigate} onProductClick={handleProductSelect} />;
      
      case 'profile': return <UserProfileView onNavigate={handleNavigate} />;
      case 'cart': return <CartView onNavigate={handleNavigate} />;
      case 'checkout': return <CheckoutView onBack={() => handleNavigate('cart')} onComplete={(id) => handleNavigate('order-tracking', {id})} />;
      case 'favorites': return <FavoritesView />;
      case 'notifications': return <NotificationsView />;
      case 'search': return <SearchResultsView query={viewParams?.q} />;
      case 'order-tracking': return <OrderTrackingView onBack={() => handleNavigate('profile')} />;
      
      // New Pages
      case 'categories': return <CategoriesPage onNavigate={handleNavigate} />;
      case 'blog': return <BlogPage onNavigate={handleNavigate} />;
      case 'jobs': return <JobsPage onNavigate={handleNavigate} />;
      case 'login': return <LoginPage onNavigate={handleNavigate} />;
      case 'signup': return <SignupPage onNavigate={handleNavigate} />;

      // Static Pages
      case 'about': return <AboutView />;
      case 'contact': return <ContactView />;
      case 'help': return <HelpCenterView onNavigate={handleNavigate} />;
      case 'terms': return <LegalView type="terms" onBack={() => handleNavigate('home')} />;
      case 'privacy': return <LegalView type="privacy" onBack={() => handleNavigate('home')} />;
      
      case 'category_listing': return renderListing();

      default: return <OffersView onNavigate={handleNavigate} onProductClick={handleProductSelect} />;
    }
  };

  const MainContent = () => (
    <>
        {selectedMerchant ? (
        <div className="min-h-screen bg-white dark:bg-gray-900 font-sans text-ray-black dark:text-white dir-rtl">
            <MerchantPublicView 
            merchant={selectedMerchant} 
            onBack={() => setSelectedMerchant(null)} 
            />
            <GeminiAssistant context="customer" />
        </div>
        ) : (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans text-ray-black dark:text-white dir-rtl transition-colors pb-20 md:pb-0">
            <Header 
                goHome={goHome} 
                activeSystem={null}
                onCategorySelect={handleCategorySelect}
                onNavigate={handleNavigate}
                onAuth={() => setIsAuthOpen(true)}
            />

            {currentView === 'offers' && !selectedCategory && (
                <>
                  <Hero />
                  <Categories onNavigate={handleNavigate} />
                  <Featured onProductClick={handleProductSelect} />
                </>
            )}

            {renderCurrentView()}

            <Footer 
                onGoToSystems={onGoToSystems} 
                onNavigate={handleNavigate}
            />
            
            <MobileBottomNav 
                currentView={currentView} 
                onNavigate={handleNavigate}
            />

            <GeminiAssistant context="customer" />
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
        </div>
        )}
    </>
  );

  return (
    <MarketplaceProvider>
        <MainContent />
    </MarketplaceProvider>
  );
};

export default Marketplace;
