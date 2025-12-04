
import React, { useState } from 'react';
import { 
  Smartphone, Palette, Layout, Link as LinkIcon, Plus, Trash2, 
  Eye, EyeOff, Move, Save, CheckCircle, Share2, QrCode, Copy, ExternalLink, Download,
  Image as ImageIcon, MessageCircle, Database
} from 'lucide-react';
import FileUploader from '../../common/FileUploader';
import MerchantHero from '../../marketplace/merchant/MerchantHero';

interface LinkButton {
  id: string;
  label: string;
  url: string;
  icon: string;
}

const StorefrontBuilder: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'design' | 'content' | 'contact' | 'launch'>('design');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [config, setConfig] = useState({
    primaryColor: 'blue',
    coverImage: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80',
    logo: 'https://ui-avatars.com/api/?name=AL&background=random',
    name: 'مطعم النور للمأكولات',
    description: 'نقدم لكم أشهى المأكولات الشرقية والغربية بأفضل جودة',
    showReviews: true,
    showAbout: true,
    showLocation: true,
    showPhone: true,
    showWhatsapp: true,
    enablePOS: true,
    showInventory: false,
    customButtons: [] as LinkButton[]
  });

  const [newLink, setNewLink] = useState({ label: '', url: '' });
  const [qrColor, setQrColor] = useState('#000000');

  const storeLink = `https://ray.app/store/${config.name.replace(/\s+/g, '-').toLowerCase()}`;

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogoUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setConfig(prev => ({ ...prev, logo: e.target!.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) setConfig(prev => ({ ...prev, coverImage: e.target!.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCustomButton = () => {
    if (!newLink.label || !newLink.url) return;
    const btn: LinkButton = {
      id: Date.now().toString(),
      label: newLink.label,
      url: newLink.url,
      icon: 'link'
    };
    setConfig(prev => ({ ...prev, customButtons: [...prev.customButtons, btn] }));
    setNewLink({ label: '', url: '' });
  };

  const colors = [
    { id: 'blue', bg: 'bg-blue-600' },
    { id: 'green', bg: 'bg-green-600' },
    { id: 'red', bg: 'bg-red-600' },
    { id: 'orange', bg: 'bg-orange-600' },
    { id: 'purple', bg: 'bg-purple-600' },
    { id: 'black', bg: 'bg-gray-900' },
  ];

  const previewMerchant = {
    name: config.name,
    type: 'مطعم',
    location: 'القاهرة',
    rating: 4.8,
    reviews: 120,
    image: config.logo,
    cover: config.coverImage
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in slide-in-from-bottom-4">
      
      {/* Controls Column */}
      <div className="flex-1 flex flex-col gap-6 overflow-y-auto pb-20 lg:max-w-md">
        
        {/* Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-gray-100 flex shadow-sm overflow-x-auto">
          {['design', 'content', 'contact', 'launch'].map(tab => (
             <button 
               key={tab}
               onClick={() => setActiveTab(tab as any)}
               className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold transition capitalize whitespace-nowrap flex items-center justify-center gap-2 ${activeTab === tab ? 'bg-blue-50 text-blue-600 shadow-sm' : 'text-gray-500 hover:bg-gray-50'}`}
             >
               {tab === 'design' ? <Palette className="w-4 h-4" /> : tab === 'content' ? <Layout className="w-4 h-4" /> : tab === 'contact' ? <LinkIcon className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
               {tab === 'design' ? 'التصميم' : tab === 'content' ? 'المحتوى' : tab === 'contact' ? 'الروابط' : 'نشر'}
             </button>
          ))}
        </div>

        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
          
          {/* --- Design Tab --- */}
          {activeTab === 'design' && (
            <div className="space-y-6 animate-in fade-in">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">لون العلامة التجارية</label>
                <div className="flex gap-3">
                  {colors.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setConfig({...config, primaryColor: c.id})}
                      className={`w-10 h-10 rounded-full ${c.bg} transition-transform shadow-sm ${config.primaryColor === c.id ? 'scale-110 ring-4 ring-offset-2 ring-gray-200' : 'hover:scale-110'}`}
                    />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-bold text-gray-700">الشعار (Logo)</label>
                    {config.logo && <span className="text-xs text-green-600 font-bold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> تم الرفع</span>}
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-dashed border-gray-300 hover:border-blue-400 transition group">
                    <div className="w-16 h-16 rounded-full border-2 border-white shadow-md overflow-hidden shrink-0 relative">
                        <img src={config.logo} className="w-full h-full object-cover" alt="Logo" />
                    </div>
                    <div className="flex-1">
                        <FileUploader label="اختر صورة" onUpload={handleLogoUpload} accept="image/*" />
                    </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">صورة الغلاف</label>
                <div className="w-full h-32 rounded-2xl border-2 border-white shadow-md overflow-hidden mb-3 relative group">
                    <img src={config.coverImage} className="w-full h-full object-cover" alt="Cover" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                </div>
                <FileUploader label="تغيير الغلاف" onUpload={handleCoverUpload} accept="image/*" />
              </div>
            </div>
          )}

          {/* --- Content Tab --- */}
          {activeTab === 'content' && (
            <div className="space-y-5 animate-in fade-in">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">اسم المتجر</label>
                <input 
                  type="text" 
                  value={config.name}
                  onChange={e => setConfig({...config, name: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none transition shadow-sm"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-bold text-gray-700">نبذة عن المتجر</label>
                <textarea 
                  value={config.description}
                  onChange={e => setConfig({...config, description: e.target.value})}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-sm focus:border-blue-500 focus:bg-white outline-none h-32 resize-none transition shadow-sm"
                />
              </div>

              <div className="space-y-3 pt-2">
                <h4 className="font-bold text-gray-800 text-sm">خيارات العرض</h4>
                {[
                  { key: 'showAbout', label: 'معلومات عن المتجر' },
                  { key: 'showReviews', label: 'آراء العملاء' },
                  { key: 'showLocation', label: 'الموقع والخريطة' }
                ].map(opt => (
                  <label key={opt.key} className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                    <span className="text-sm text-gray-600 font-medium">{opt.label}</span>
                    <input 
                      type="checkbox" 
                      checked={(config as any)[opt.key]} 
                      onChange={e => setConfig({...config, [opt.key]: e.target.checked})} 
                      className="w-5 h-5 accent-blue-600 rounded" 
                    />
                  </label>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                  <Database className="w-4 h-4 text-blue-600" />
                  ربط الأنظمة (System Integrations)
                </h4>
                
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                    <div>
                        <span className="text-sm text-gray-800 font-bold block">تفعيل الطلبات (POS)</span>
                        <span className="text-xs text-gray-500">السماح للعملاء بالطلب أونلاين وربطه بالكاشير</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={config.enablePOS} 
                        onChange={e => setConfig({...config, enablePOS: e.target.checked})} 
                        className="w-5 h-5 accent-blue-600 rounded" 
                    />
                </label>

                <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                    <div>
                        <span className="text-sm text-gray-800 font-bold block">عرض المخزون الحي</span>
                        <span className="text-xs text-gray-500">إظهار كميات المنتجات المتاحة للعملاء</span>
                    </div>
                    <input 
                        type="checkbox" 
                        checked={config.showInventory} 
                        onChange={e => setConfig({...config, showInventory: e.target.checked})} 
                        className="w-5 h-5 accent-blue-600 rounded" 
                    />
                </label>
              </div>
            </div>
          )}

          {/* --- Contact Tab --- */}
          {activeTab === 'contact' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="space-y-3">
                <h4 className="font-bold text-gray-800 text-sm">أزرار التواصل</h4>
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                  <span className="text-sm text-gray-600 flex items-center gap-2"><Smartphone className="w-4 h-4" /> زر الاتصال</span>
                  <input type="checkbox" checked={config.showPhone} onChange={e => setConfig({...config, showPhone: e.target.checked})} className="w-5 h-5 accent-blue-600 rounded" />
                </label>
                <label className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
                  <span className="text-sm text-gray-600 flex items-center gap-2"><MessageCircle className="w-4 h-4" /> زر واتساب</span>
                  <input type="checkbox" checked={config.showWhatsapp} onChange={e => setConfig({...config, showWhatsapp: e.target.checked})} className="w-5 h-5 accent-blue-600 rounded" />
                </label>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-bold text-gray-800 text-sm mb-3">روابط إضافية</h4>
                
                {config.customButtons.map((btn) => (
                  <div key={btn.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-xl mb-2 border border-gray-200">
                    <span className="text-sm font-bold text-gray-700">{btn.label}</span>
                    <button onClick={() => setConfig(prev => ({ ...prev, customButtons: prev.customButtons.filter(b => b.id !== btn.id) }))} className="text-red-500 hover:bg-red-100 p-1.5 rounded transition">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <div className="flex gap-2 mt-3">
                  <input 
                    type="text" 
                    placeholder="اسم الزر" 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500"
                    value={newLink.label}
                    onChange={e => setNewLink({...newLink, label: e.target.value})}
                  />
                  <input 
                    type="text" 
                    placeholder="الرابط URL" 
                    className="flex-1 bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-500 dir-ltr"
                    value={newLink.url}
                    onChange={e => setNewLink({...newLink, url: e.target.value})}
                  />
                  <button 
                    onClick={addCustomButton}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition shadow-sm"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* --- Launch Tab --- */}
          {activeTab === 'launch' && (
             <div className="space-y-6 animate-in fade-in">
                <div className="text-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-3xl border border-blue-100">
                   <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-md text-blue-600">
                      <CheckCircle className="w-8 h-8" />
                   </div>
                   <h3 className="font-black text-xl text-gray-900 mb-2">رابط متجرك جاهز!</h3>
                   <p className="text-sm text-gray-600 mb-6">شارك الرابط مع عملائك وابدأ في استقبال الطلبات فوراً.</p>
                   
                   <div className="flex items-center gap-2 bg-white border border-gray-200 p-2 pl-4 rounded-xl mb-4 shadow-sm">
                      <input 
                        type="text" 
                        value={storeLink}
                        readOnly
                        className="flex-1 text-sm text-gray-600 outline-none dir-ltr bg-transparent font-medium"
                      />
                      <button onClick={() => {navigator.clipboard.writeText(storeLink); alert('تم النسخ');}} className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition">
                         <Copy className="w-4 h-4" />
                      </button>
                   </div>

                   <button className="text-sm font-bold text-blue-700 flex items-center justify-center gap-2 hover:underline">
                      <ExternalLink className="w-4 h-4" />
                      زيارة المتجر
                   </button>
                </div>
             </div>
          )}

        </div>

        <button 
          onClick={handleSave} 
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-black transition flex items-center justify-center gap-2 sticky bottom-0"
        >
          {saveSuccess ? <CheckCircle className="w-5 h-5" /> : <Save className="w-5 h-5" />}
          {saveSuccess ? 'تم الحفظ!' : 'حفظ التعديلات'}
        </button>
      </div>

      {/* Preview Column */}
      <div className="flex-1 bg-gray-100 rounded-[2.5rem] p-8 flex items-center justify-center border border-gray-200 relative overflow-hidden min-h-[600px]">
        <div className="absolute top-6 right-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-bold text-gray-700 flex items-center gap-2 shadow-md z-10">
           <Smartphone className="w-4 h-4 text-blue-600" />
           معاينة حية
        </div>

        {/* Phone Frame */}
        <div className="w-[375px] h-[750px] bg-white rounded-[3rem] shadow-2xl border-[8px] border-gray-900 relative overflow-hidden flex flex-col">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-50"></div>
           
           <div className="flex-1 overflow-y-auto no-scrollbar bg-gray-50">
              <MerchantHero 
                merchant={previewMerchant}
                onBack={() => {}}
                isFavorite={false}
                toggleFavorite={() => {}}
                handleShare={() => {}}
                showShareToast={false}
                customConfig={config} 
              />
              <div className="px-4 py-4 space-y-4 relative z-10 pb-12">
                 {(config.showPhone || config.showWhatsapp || config.customButtons.length > 0) && (
                   <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
                      {config.showPhone && (
                        <button className={`flex-1 min-w-[100px] py-3 rounded-xl text-xs font-bold text-white shadow-sm bg-${config.primaryColor}-600`}>اتصال</button>
                      )}
                      {config.showWhatsapp && (
                        <button className="flex-1 min-w-[100px] py-3 rounded-xl text-xs font-bold text-green-700 bg-green-100 shadow-sm">واتساب</button>
                      )}
                      {config.customButtons.map(btn => (
                        <button key={btn.id} className="flex-1 min-w-[100px] py-3 rounded-xl text-xs font-bold text-gray-700 bg-white border border-gray-200 shadow-sm whitespace-nowrap">{btn.label}</button>
                      ))}
                   </div>
                 )}
                 {config.showAbout && (
                   <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
                      <h3 className="font-bold text-sm mb-2 text-gray-900">عن المكان</h3>
                      <p className="text-xs text-gray-500 leading-relaxed">{config.description}</p>
                   </div>
                 )}

                 {config.showInventory && (
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center text-green-600">
                            <Database className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm text-gray-900">مخزون مباشر</h3>
                            <p className="text-xs text-gray-500">يتم عرض الكميات المتاحة</p>
                        </div>
                    </div>
                 )}
              </div>
           </div>
           <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default StorefrontBuilder;
