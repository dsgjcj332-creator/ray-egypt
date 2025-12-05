export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  minStock: number;
  sku: string;
  barcode: string;
  status: 'active' | 'inactive' | 'discontinued';
  image: string;
  model3d?: string;
  dailySales?: number;
}

export async function fetchProducts(): Promise<Product[]> {
  // Mock data
  return [
    {
      id: '1',
      name: 'تيشيرت قطن أبيض',
      category: 'ملابس',
      description: 'تيشيرت قطن 100% مريح وناعم',
      price: 120,
      cost: 60,
      stock: 50,
      minStock: 10,
      sku: 'TS-WHT-001',
      barcode: '1234567890',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
    }
  ];
}

export async function saveProduct(product: Product): Promise<Product> {
  return product;
}

export async function updateProduct(product: Product): Promise<Product> {
  return product;
}

export async function deleteProduct(id: string): Promise<void> {
  // Mock delete
}
