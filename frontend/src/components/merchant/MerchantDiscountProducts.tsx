import React from 'react';
import { Tag, Clock, TrendingUp, Star } from 'lucide-react';

interface DiscountProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: string;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  validUntil: string;
  description: string;
}

interface MerchantDiscountProductsProps {
  merchantId: string;
}

const MerchantDiscountProducts: React.FC<MerchantDiscountProductsProps> = ({ merchantId }) => {
  // Mock products with discounts - في الواقع ستأتي من API
  const discountProducts: DiscountProduct[] = [
    {
      id: 1,
      name: 'تيشيرت قطن أبيض',
      price: 96,
      originalPrice: 120,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
      category: 'ملابس',
      rating: 4.5,
      reviews: 23,
      validUntil: '2024-12-31',
      description: 'تيشيرت قطن 100% مريح وناعم'
    },
    {
      id: 2,
      name: 'بنطلون جينز أزرق',
      price: 224,
      originalPrice: 280,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1542272617-08f086302542?w=400',
      category: 'ملابس',
      rating: 4.8,
      reviews: 45,
      validUntil: '2024-12-31',
      description: 'جينز أصلي مريح وعملي'
    },
    {
      id: 3,
      name: 'حذاء رياضي أسود',
      price: 360,
      originalPrice: 450,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
      category: 'أحذية',
      rating: 4.7,
      reviews: 31,
      validUntil: '2024-12-31',
      description: 'حذاء رياضي مريح وعالي الجودة'
    },
    {
      id: 4,
      name: 'شنطة يد جلدية',
      price: 280,
      originalPrice: 350,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400',
      category: 'إكسسوارات',
      rating: 4.6,
      reviews: 18,
      validUntil: '2024-12-31',
      description: 'شنطة جلدية أصلية فاخرة'
    },
    {
      id: 5,
      name: 'ساعة يد ذهبية',
      price: 520,
      originalPrice: 650,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400',
      category: 'إكسسوارات',
      rating: 4.9,
      reviews: 27,
      validUntil: '2024-12-31',
      description: 'ساعة يد فاخرة بتصميم عصري'
    },
    {
      id: 6,
      name: 'نظارة شمسية',
      price: 224,
      originalPrice: 280,
      discount: '20%',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
      category: 'إكسسوارات',
      rating: 4.4,
      reviews: 12,
      validUntil: '2024-12-31',
      description: 'نظارة شمسية عالية الجودة'
    }
  ];

  const calculateSavings = (original: number, discounted: number) => {
    return original - discounted;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Tag className="w-6 h-6 text-ray-gold" />
          <h2 className="text-2xl font-bold text-gray-900">منتجات مخفضة</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>العروض تنتهي: 31 ديسمبر 2024</span>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {discountProducts.map((product) => (
          <div key={product.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
            {/* Discount Badge */}
            <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {product.discount}
            </div>

            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              <div className="text-xs text-gray-500 mb-1">{product.category}</div>
              
              {/* Name */}
              <h3 className="font-bold text-gray-900 mb-2 group-hover:text-ray-blue transition">
                {product.name}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviews} تقييم)
                </span>
              </div>

              {/* Price Section */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-ray-blue">
                    {product.price} جنيه
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice} جنيه
                  </span>
                </div>
                <div className="text-sm font-bold text-green-600">
                  توفر {calculateSavings(product.originalPrice, product.price)} جنيه
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full bg-ray-gold text-ray-black py-2 rounded-lg font-bold hover:bg-ray-gold/90 transition flex items-center justify-center gap-2">
                <TrendingUp className="w-4 h-4" />
                أضف للسلة
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {discountProducts.length === 0 && (
        <div className="text-center py-12">
          <Tag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">لا توجد منتجات مخفضة حالياً</h3>
          <p className="text-gray-500">تحقق لاحقاً للحصول على أفضل العروض والتخفيضات</p>
        </div>
      )}

      {/* Special Offer Banner */}
      <div className="bg-gradient-to-r from-ray-gold to-yellow-400 rounded-xl p-6 text-center">
        <h3 className="text-xl font-bold text-gray-900 mb-2">عرض خاص!</h3>
        <p className="text-gray-800 mb-4">
          احصل على خصم إضافي 10% عند شراء 3 منتجات مخفضة أو أكثر
        </p>
        <button className="bg-white text-ray-gold px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition">
          استفد من العرض
        </button>
      </div>
    </div>
  );
};

export default MerchantDiscountProducts;
