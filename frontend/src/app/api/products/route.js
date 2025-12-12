// This is a Next.js API Route
// It will be accessible at the URL: /api/products

export async function GET(request) {
  // In a real application, you would fetch this data from a database.
  const products = [
    { id: 1, name: 'لابتوب احترافي', price: 4500, currency: 'SAR' },
    { id: 2, name: 'شاشة 4K', price: 1800, currency: 'SAR' },
    { id: 3, name: 'لوحة مفاتيح ميكانيكية', price: 350, currency: 'SAR' },
  ];

  // Return the product data as a JSON response
  return Response.json(products);
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // In a real application, you would save this to a database
    const newProduct = {
      id: Date.now(), // Simple ID generation
      ...body
    };

    return Response.json(newProduct, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Invalid request body' },
      { status: 400 }
    );
  }
}
