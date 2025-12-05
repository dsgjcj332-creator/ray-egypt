
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '../components/common/ToastContext';

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  qty: number;
  shop?: string;
  type?: string; // product, service, booking
  deposit?: number; // If it's a reservation
  isReservation?: boolean;
}

export interface FavoriteItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
  rating?: number;
  type?: string;
  location?: string;
}

interface MarketplaceContextType {
  cart: CartItem[];
  favorites: FavoriteItem[];
  addToCart: (item: any, isReservation?: boolean, depositAmount?: number) => void;
  removeFromCart: (id: string | number) => void;
  updateQty: (id: string | number, delta: number) => void;
  clearCart: () => void;
  toggleFavorite: (item: any) => void;
  isFavorite: (id: string | number) => boolean;
  cartTotal: number;
  cartCount: number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const { showToast } = useToast();

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ray_cart');
    const savedFavs = localStorage.getItem('ray_favs');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('ray_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ray_favs', JSON.stringify(favorites));
  }, [favorites]);

  const addToCart = (item: any, isReservation = false, depositAmount = 0) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id && i.isReservation === isReservation);
      if (existing) {
        showToast('تم تحديث الكمية في السلة', 'info');
        return prev.map(i => i.id === item.id && i.isReservation === isReservation ? { ...i, qty: i.qty + 1 } : i);
      }
      showToast(isReservation ? 'تم إضافة حجز العربون للسلة' : 'تمت الإضافة للسلة بنجاح', 'success');
      return [...prev, { 
        id: item.id, 
        name: item.name, 
        price: isReservation ? (depositAmount || item.price) : item.price, 
        image: item.image, 
        qty: 1, 
        shop: item.store || item.shop || 'راي ستور',
        type: item.type,
        isReservation,
        deposit: depositAmount
      }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart(prev => prev.filter(i => i.id !== id));
    showToast('تم حذف المنتج من السلة', 'error');
  };

  const updateQty = (id: string | number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, qty: Math.max(1, item.qty + delta) };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const toggleFavorite = (item: any) => {
    const exists = favorites.find(i => i.id === item.id);
    if (exists) {
      setFavorites(prev => prev.filter(i => i.id !== item.id));
      showToast('تم الحذف من المفضلة', 'info');
    } else {
      setFavorites(prev => [...prev, {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        rating: item.rating || 5,
        type: item.type || 'product',
        location: item.location || 'القاهرة'
      }]);
      showToast('تمت الإضافة للمفضلة ❤️', 'success');
    }
  };

  const isFavorite = (id: string | number) => {
    return favorites.some(i => i.id === id);
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <MarketplaceContext.Provider value={{ 
      cart, favorites, addToCart, removeFromCart, updateQty, 
      clearCart, toggleFavorite, isFavorite, cartTotal, cartCount 
    }}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};
