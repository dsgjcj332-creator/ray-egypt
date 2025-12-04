
export interface Product {
  id: number | string;
  name: string;
  price: number;
  barcode?: string;
  sku?: string;
  category: string;
  image: string;
  model3d?: string; 
  stock?: number;
  minStock?: number;
  status?: 'active' | 'inactive';
  description?: string;
  cost?: number;
  dailySales?: number;
}

// Fallback local data in case backend is offline
const localProducts: Product[] = [
   { id: 101, name: 'لبن جهينة 1 لتر (Local)', price: 42, barcode: '123456', sku: 'DAI-001', category: 'ألبان', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200', stock: 45, minStock: 10, status: 'active', dailySales: 5 },
   // ... more fallback data if needed
];

const pharmacyCategories = ['الكل', 'مسكنات', 'مضادات', 'ضغط', 'فيتامينات', 'مكملات', 'أطفال', 'مستلزمات'];
const retailCategories = ['الكل', 'أثاث', 'بقالة', 'ألبان', 'سناكس', 'مشروبات', 'منظفات'];

export const fetchProducts = async (type: string): Promise<Product[]> => {
  try {
    // Fetch from our new Express Backend (proxied via Next.js /api)
    const response = await fetch(`/api/products?type=${type}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn("Backend not reachable, using local fallback data.", error);
    // Simulate delay for fallback
    await new Promise(resolve => setTimeout(resolve, 500));
    return localProducts;
  }
};

export const fetchCategories = async (type: string): Promise<string[]> => {
  // Categories can still be static or fetched from a separate API endpoint
  await new Promise(resolve => setTimeout(resolve, 200));
  return type === 'pharmacy' ? pharmacyCategories : retailCategories;
};

export const updateProduct = async (product: Product, type: string = 'retail'): Promise<Product> => {
  // In a real app, this would send a PUT/POST request to the backend
  console.log("Updating product on server:", product);
  await new Promise(resolve => setTimeout(resolve, 500));
  return product;
};
