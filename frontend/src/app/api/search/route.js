// This is a Next.js API Route for handling search requests.
// It will be accessible at the URL: /api/search

import { NextRequest } from 'next/server';

export async function GET(request) {
  // In a real application, you would fetch this data from a database
  // and apply filtering/sorting based on request.query.
  
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const category = searchParams.get('category');
  const sort = searchParams.get('sort');

  // Dummy data that matches the SearchResult interface in the frontend
  let results = [
    { id: 'p1', type: 'product', name: 'لابتوب احترافي', price: '4500 SAR', priceValue: 4500, currency: 'SAR', rating: 4.5, image: 'https://via.placeholder.com/150/0000FF/FFFFFF?text=Laptop', subtitle: 'أداء عالي للأعمال', features: ['offers', 'free_delivery'] },
    { id: 'p2', type: 'product', name: 'شاشة 4K', price: '1800 SAR', priceValue: 1800, currency: 'SAR', rating: 4.0, image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Monitor', subtitle: 'تجربة مشاهدة غامرة', features: ['free_delivery'] },
    { id: 'p3', type: 'product', name: 'لوحة مفاتيح ميكانيكية', price: '350 SAR', priceValue: 350, currency: 'SAR', rating: 4.8, image: 'https://via.placeholder.com/150/00FF00/FFFFFF?text=Keyboard', subtitle: 'استجابة سريعة للألعاب', features: [] },
    { id: 'r1', type: 'restaurant', name: 'مطعم الشيف', price: '$$', priceValue: 100, currency: 'SAR', rating: 4.2, image: 'https://via.placeholder.com/150/00FFFF/FFFFFF?text=Restaurant', subtitle: 'أشهى المأكولات العربية', features: ['open_now', 'offers'] },
    { id: 'r2', type: 'restaurant', name: 'بيتزا إيطالية', price: '$$$', priceValue: 150, currency: 'SAR', rating: 4.6, image: 'https://via.placeholder.com/150/FFFF00/000000?text=Pizza', subtitle: 'بيتزا على الطريقة الأصلية', features: ['free_delivery'] },
    { id: 're1', type: 'realestate', name: 'شقة فاخرة', price: '1.2M SAR', priceValue: 1200000, currency: 'SAR', rating: 4.9, image: 'https://via.placeholder.com/150/FF00FF/FFFFFF?text=Apartment', subtitle: 'إطلالة بانورامية', features: [] },
    { id: 'c1', type: 'car', name: 'سيارة سيدان', price: '80K SAR', priceValue: 80000, currency: 'SAR', rating: 4.3, image: 'https://via.placeholder.com/150/800080/FFFFFF?text=Car', subtitle: 'موديل حديث ومريح', features: ['offers'] },
  ];

  // Basic filtering logic (can be expanded significantly)
  if (q) {
    const lowerQ = q.toLowerCase();
    results = results.filter(item =>
      item.name.toLowerCase().includes(lowerQ) ||
      item.subtitle.toLowerCase().includes(lowerQ)
    );
  }

  if (category && category !== 'all') {
    results = results.filter(item => item.type === category);
  }

  // Basic sorting logic (can be expanded)
  if (sort === 'price_asc') {
    results.sort((a, b) => a.priceValue - b.priceValue);
  } else if (sort === 'price_desc') {
    results.sort((a, b) => b.priceValue - a.priceValue);
  } else if (sort === 'rating') {
    results.sort((a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0));
  }

  // Return the filtered/sorted data as a JSON response
  return Response.json(results);
}
