'use client';

import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/services/productService';
import { usePaginatedApi } from '@/hooks/useApi';

export default function ProductsList() {
  const {
    data: products,
    loading,
    error,
    page,
    pages,
    goToPage,
    nextPage,
    prevPage
  } = usePaginatedApi(
    (page, limit) => fetchProducts(page, limit),
    1,
    12
  );

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h3 className="text-red-800 font-semibold">خطأ في تحميل المنتجات</h3>
        <p className="text-red-700">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">المنتجات</h1>

      {loading && products.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-lg h-64 animate-pulse" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">
                      {product.price} ج.م
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.stock > 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock > 0 ? `${product.stock} متاح` : 'غير متاح'}
                    </span>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    إضافة للسلة
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={prevPage}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              السابق
            </button>

            {[...Array(Math.min(5, pages))].map((_, i) => {
              const pageNum = Math.max(1, page - 2) + i;
              if (pageNum > pages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => goToPage(pageNum)}
                  className={`px-4 py-2 rounded-lg ${
                    pageNum === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={nextPage}
              disabled={page === pages}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
              التالي
            </button>
          </div>
        </>
      )}
    </div>
  );
}
