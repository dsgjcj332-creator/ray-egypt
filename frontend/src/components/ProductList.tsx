"use client";

import React, { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  currency: string;
}

function ProductList() {
  // 1. إنشاء حالات لإدارة البيانات، التحميل، والأخطاء
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. استخدام useEffect لجلب البيانات عند تحميل المكون لأول مرة
  useEffect(() => {
    async function fetchProducts() {
      try {
        // 3. طلب البيانات من الـ API الذي أنشأناه
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('فشل في جلب البيانات');
        }
        const data = await response.json();
        setProducts(data); // تحديث حالة المنتجات
      } catch (err) {
        setError(err instanceof Error ? err.message : 'حدث خطأ غير معروف'); // تحديث حالة الخطأ
      } finally {
        setIsLoading(false); // إيقاف حالة التحميل في كل الحالات
      }
    }

    fetchProducts();
  }, []); // المصفوفة الفارغة تعني أن هذا التأثير يعمل مرة واحدة فقط

  // 4. عرض واجهات مختلفة بناءً على الحالة
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-lg">جاري تحميل المنتجات...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="text-red-500 text-lg">حدث خطأ: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-right">قائمة المنتجات</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
            <h3 className="text-lg font-semibold mb-2 text-right">{product.name}</h3>
            <div className="text-blue-600 font-bold text-xl text-right">
              {product.price} {product.currency}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
