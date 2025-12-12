// This is a Vercel Serverless Function.
// It will be accessible at the URL: /api/products

export default function handler(request, response) {
  // In a real application, you would fetch this data from a database.
  const products = [
    { id: 1, name: 'لابتوب احترافي', price: 4500, currency: 'SAR' },
    { id: 2, name: 'شاشة 4K', price: 1800, currency: 'SAR' },
    { id: 3, name: 'لوحة مفاتيح ميكانيكية', price: 350, currency: 'SAR' },
  ];

  // Set headers to prevent caching issues and specify content type
  response.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate');
  response.setHeader('Content-Type', 'application/json');

  // Send the product data as a JSON response
  response.status(200).json(products);
}