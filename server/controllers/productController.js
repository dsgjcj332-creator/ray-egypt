
// Mock Database for demonstration
const products = [
  { 
    id: 101, name: 'لبن جهينة 1 لتر', price: 42, barcode: '123456', sku: 'DAI-001', category: 'ألبان', 
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=200', stock: 45, minStock: 10, status: 'active', dailySales: 5 
  },
  { 
    id: 102, name: 'شيبسي عائلي', price: 15, barcode: '123457', sku: 'SNK-002', category: 'سناكس', 
    image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200', stock: 8, minStock: 15, status: 'active', dailySales: 3 
  },
  { 
    id: 103, name: 'أرز الضحى 1ك', price: 35, barcode: '123458', sku: 'GRN-003', category: 'بقالة', 
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200', stock: 150, minStock: 20, status: 'active', dailySales: 12 
  },
  { 
    id: 104, name: 'زيت عباد الشمس', price: 65, barcode: '123459', sku: 'OIL-004', category: 'بقالة', 
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200', stock: 12, minStock: 5, status: 'active', dailySales: 2 
  }
];

export const getProducts = (req, res) => {
  try {
    const type = req.query.type;
    // In a real DB, you would query based on type
    // For now, we return the same list but you can extend this
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = (req, res) => {
  try {
    const { id } = req.params;
    const product = products.find(p => p.id == id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
