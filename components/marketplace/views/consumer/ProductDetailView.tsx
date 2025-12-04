
import React, { useState, useEffect } from 'react';
import { Star, ShoppingBag, Heart, Share2, Truck, RotateCcw, ShieldCheck, ChevronRight, Minus, Plus, Cuboid, Image as ImageIcon, CalendarClock } from 'lucide-react';
import { useToast } from '@/components/common/ToastContext';
import { fetchProducts } from '@/services/productService';
import { useMarketplace } from '@/context/MarketplaceContext';
import ReservationModal from '../../modals/ReservationModal'; // Import Reservation Modal

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string;
        alt?: string;
        'auto-rotate'?: boolean;
        'camera-controls'?: boolean;
        ar?: boolean;
        'ar-modes'?: string;
        'shadow-intensity'?: string;
        [key: string]: any;
      };
    }
  }
}

interface ProductDetailProps {
  id?: string;
  onBack: () => void;
}

const ProductDetailView: React.FC<ProductDetailProps> = ({ id, onBack }) => {
  const { addToCart, toggleFavorite, isFavorite } = useMarketplace(); // Use dynamic context
  const { showToast } = useToast();
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [viewMode, setViewMode] = useState<'image' | '3d'>('image');
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isReserveModalOpen, setIsReserveModalOpen] = useState(false);

  // Fetch product data
  useEffect(() => {
    const load = async () => {
        setLoading(true);
        const allProducts = await fetchProducts('retail');
        const found = allProducts.find(p => p.id.toString() === id) || allProducts.find(p => p.model3d);
        
        if (found) {
             setProduct({
                ...found,
                oldPrice: found.price * 1.2,
                reviews: 124,
                store: 'RAY Official Store',
                rating: 4.8,
                images: [found.image, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: [{ name: 'default', hex: '#000000' }],
                specs: [{ label: 'النوع', value: found.category }, { label: 'الكود', value: found.sku }]
             });
        } else {
             // Fallback mock
             setProduct({
                id: '1',
                name: 'جاكيت بومبر مقاوم للماء',
                price: 850,
                oldPrice: 1200,
                description: 'جاكيت بومبر عصري مصنوع من خامات عالية الجودة مقاومة للماء.',
                rating: 4.8,
                reviews: 124,
                store: 'H&M Official',
                images: ['https://images.unsplash.com/photo-1551028919-33f54764fa5d?w=800'],
                sizes: ['S', 'M', 'L', 'XL'],
                colors: [{ name: 'black', hex: '#000000' }],
                specs: [{ label: 'الخامة', value: '100% بوليستر' }]
             });
        }
        setLoading(false);
    };
    load();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleReserve = (deposit: number, date: string) => {
    // Add to cart as a reservation
    addToCart({ ...product, name: `حجز: ${product.name} (${date})` }, true, deposit);
    setIsReserveModalOpen(false);
  };

  if (loading) return <div className="p-10 text-center">جاري التحميل...</div>;
  if (!product) return <div className="p-10 text-center">المنتج غير موجود</div>;

  const isFav = isFavorite(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in slide-in-from-bottom-4 pb-32 lg:pb-8">
      {/* Breadcrumb & Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="hover:text-ray-blue flex items-center gap-1 p-2 -ml-2 rounded-lg active:bg-gray-100 transition">
           <ChevronRight className="w-4 h-4" /> الرئيسية
        </button>
        <span>/</span>
        <span className="hover:text-ray-blue cursor-pointer">{product.category}</span>
        <span>/</span>
        <span className="text-gray-900 font-bold line-clamp-1">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery Section */}
        <div className="space-y-4">
           <div className="aspect-square bg-gray-100 rounded-3xl overflow-hidden relative group border border-gray-200">
              
              {/* View Mode Toggle */}
              {product.model3d && (
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur p-1 rounded-xl shadow-sm border border-gray-200 flex">
                      <button 
                        onClick={() => setViewMode('image')}
                        className={`p-2 rounded-lg transition ${viewMode === 'image' ? 'bg-ray-black text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="صور"
                      >
                          <ImageIcon className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setViewMode('3d')}
                        className={`p-2 rounded-lg transition ${viewMode === '3d' ? 'bg-ray-blue text-white' : 'text-gray-500 hover:bg-gray-100'}`}
                        title="عرض 3D"
                      >
                          <Cuboid className="w-5 h-5" />
                      </button>
                  </div>
              )}

              {viewMode === '3d' && product.model3d ? (
                  // @ts-ignore
                  <model-viewer
                    src={product.model3d}
                    alt={product.name}
                    auto-rotate
                    camera-controls
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    shadow-intensity="1"
                    style={{ width: '100%', height: '100%', backgroundColor: '#f9fafb' }}
                  >
                    <button slot="ar-button" className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-ray-blue px-4 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-2 z-30 hover:bg-blue-50 transition">
                        <Cuboid className="w-4 h-4" />
                        عرض في غرفتي (AR)
                    </button>
                  {/* @ts-ignore */}
                  </model-viewer>
              ) : (
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-4 transition duration-500 group-hover:scale-105"
                  />
              )}

              <button 
                onClick={() => toggleFavorite(product)}
                className={`absolute top-4 right-4 p-3 bg-white/80 backdrop-blur-md rounded-full transition shadow-sm hover:bg-white z-20 ${isFav ? 'text-red-500' : 'text-gray-600 hover:text-red-500'}`}
              >
                 <Heart className={`w-6 h-6 ${isFav ? 'fill-current' : ''}`} />
              </button>
           </div>

           <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
              {product.images.map((img: string, idx: number) => (
                 <button 
                   key={idx}
                   onClick={() => { setActiveImage(idx); setViewMode('image'); }}
                   className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition flex-shrink-0 bg-white ${activeImage === idx && viewMode === 'image' ? 'border-ray-blue ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300'}`}
                 >
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                 </button>
              ))}
           </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col">
           <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="flex justify-between items-start mb-2 gap-4">
                 <h1 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">{product.name}</h1>
                 <button className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-50">
                    <Share2 className="w-6 h-6" />
                 </button>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                 <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg text-yellow-700 font-bold border border-yellow-100">
                    <Star className="w-4 h-4 fill-current" />
                    {product.rating}
                 </div>
                 <span className="text-gray-500 underline cursor-pointer hover:text-ray-blue">{product.reviews} تقييم</span>
                 <span className="text-gray-300 hidden sm:inline">|</span>
                 <span className="font-bold text-ray-blue w-full sm:w-auto">متجر: {product.store}</span>
              </div>

              <div className="flex items-end gap-3">
                 <span className="text-3xl md:text-4xl font-black text-ray-blue">{product.price} ج.م</span>
                 {product.oldPrice && (
                    <span className="text-lg text-gray-400 line-through mb-1">{product.oldPrice.toFixed(0)} ج.م</span>
                 )}
                 <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-2">وفر {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>
              </div>
           </div>

           {/* Selectors */}
           <div className="space-y-6 mb-8">
              {/* Color */}
              {product.colors && product.colors.length > 0 && product.colors[0].name !== 'default' && (
                <div>
                    <h3 className="text-sm font-bold text-gray-900 mb-3">اللون: <span className="text-gray-500 font-normal">{selectedColor}</span></h3>
                    <div className="flex gap-3">
                        {product.colors.map((color: any) => (
                        <button
                            key={color.name}
                            onClick={() => setSelectedColor(color.name)}
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${selectedColor === color.name ? 'border-ray-blue scale-110' : 'border-transparent hover:scale-105'}`}
                            style={{ backgroundColor: color.hex }}
                            aria-label={`Select color ${color.name}`}
                        >
                            {selectedColor === color.name && <div className={`w-3 h-3 rounded-full ${color.name === 'white' ? 'bg-black' : 'bg-white'}`}></div>}
                        </button>
                        ))}
                    </div>
                </div>
              )}

              {/* Size */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-sm font-bold text-gray-900">المقاس: <span className="text-gray-500 font-normal">{selectedSize}</span></h3>
                        <button className="text-xs text-ray-blue font-bold underline p-1">دليل المقاسات</button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size: string) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 rounded-xl font-bold text-sm transition flex items-center justify-center border-2
                            ${selectedSize === size 
                                ? 'border-ray-black bg-ray-black text-white shadow-lg transform -translate-y-1' 
                                : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'}
                            `}
                        >
                            {size}
                        </button>
                        ))}
                    </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                 <h3 className="text-sm font-bold text-gray-900 mb-3">الكمية</h3>
                 <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                       <button 
                         onClick={() => setQty(Math.max(1, qty - 1))}
                         className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-ray-blue transition active:bg-gray-100"
                         aria-label="Decrease quantity"
                       >
                          <Minus className="w-4 h-4" />
                       </button>
                       <span className="w-12 text-center font-bold text-lg">{qty}</span>
                       <button 
                         onClick={() => setQty(qty + 1)}
                         className="w-10 h-10 flex items-center justify-center bg-white rounded-lg shadow-sm hover:text-ray-blue transition active:bg-gray-100"
                         aria-label="Increase quantity"
                       >
                          <Plus className="w-4 h-4" />
                       </button>
                    </div>
                    <span className="text-xs text-green-600 font-bold">متوفر في المخزون</span>
                 </div>
              </div>
           </div>

           {/* Actions - Sticky on Mobile */}
           <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 lg:static lg:border-0 lg:p-0 lg:bg-transparent z-30 flex gap-3 mt-auto shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] lg:shadow-none flex-col sm:flex-row">
              <div className="flex gap-3 flex-1">
                <button 
                    onClick={() => setIsReserveModalOpen(true)}
                    className="flex-1 bg-purple-100 text-purple-700 py-3.5 lg:py-4 rounded-xl font-bold text-lg hover:bg-purple-200 transition shadow-sm hover:shadow-md flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    <CalendarClock className="w-5 h-5" />
                    حجز (عربون)
                </button>
                <button 
                    onClick={handleAddToCart}
                    className="flex-[2] bg-ray-black text-white py-3.5 lg:py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                    <ShoppingBag className="w-5 h-5" />
                    إضافة للسلة
                </button>
              </div>
           </div>

           {/* Features Info */}
           <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-gray-100">
              <div className="text-center">
                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Truck className="w-5 h-5" />
                 </div>
                 <p className="text-xs font-bold text-gray-600">شحن سريع</p>
                 <p className="text-[10px] text-gray-400">خلال 2-4 أيام</p>
              </div>
              <div className="text-center">
                 <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <ShieldCheck className="w-5 h-5" />
                 </div>
                 <p className="text-xs font-bold text-gray-600">دفع آمن</p>
                 <p className="text-[10px] text-gray-400">حماية 100%</p>
              </div>
              <div className="text-center">
                 <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <RotateCcw className="w-5 h-5" />
                 </div>
                 <p className="text-xs font-bold text-gray-600">استرجاع مجاني</p>
                 <p className="text-[10px] text-gray-400">خلال 14 يوم</p>
              </div>
           </div>
        </div>
      </div>

      {/* Description & Specs Tabs */}
      <div className="mt-12 lg:mt-16">
         <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 lg:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">تفاصيل المنتج</h3>
            <p className="text-gray-600 leading-relaxed mb-8 text-sm lg:text-base">
               {product.description}
            </p>
            
            <h4 className="font-bold text-gray-900 mb-4">المواصفات الفنية</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
               {product.specs.map((spec: any, idx: number) => (
                  <div key={idx} className="flex justify-between py-3 border-b border-gray-50 text-sm">
                     <span className="text-gray-500">{spec.label}</span>
                     <span className="font-bold text-gray-900">{spec.value}</span>
                  </div>
               ))}
            </div>
         </div>
      </div>

      <ReservationModal 
        isOpen={isReserveModalOpen}
        onClose={() => setIsReserveModalOpen(false)}
        product={product}
        onConfirm={handleReserve}
      />
    </div>
  );
};

export default ProductDetailView;
