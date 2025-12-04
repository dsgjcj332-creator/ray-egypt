export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  merchant: string;
  location: string;
}

export interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'preparing' | 'delivering' | 'completed' | 'cancelled';
  time: string;
}

export interface MerchantStat {
  label: string;
  value: string;
  trend: number;
  icon: any;
}

export enum ViewState {
  MARKETPLACE = 'MARKETPLACE',
  SYSTEMS_HUB = 'SYSTEMS_HUB',
  DASHBOARD = 'DASHBOARD',
  POS = 'POS'
}