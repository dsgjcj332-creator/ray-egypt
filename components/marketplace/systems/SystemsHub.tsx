
import React from 'react';
import { 
  Store, Utensils, Home, Car, Stethoscope, Dumbbell, 
  Wrench, Shirt, ShoppingBag, Scissors, Pill, Briefcase, 
  ArrowLeft, CheckCircle, ShieldCheck, HardHat, ArrowRight, Menu, X, LayoutGrid,
  Baby, Gavel, Users, Umbrella, Sun
} from 'lucide-react';

interface SystemsHubProps {
  onSystemSelect: (systemId: string) => void;
  onBackToMarketplace: () => void;
}

const SystemsHub: React.FC<SystemsHubProps> = ({ onSystemSelect, onBackToMarketplace }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const systems = [
    {
      category: "قطاع التجارة والمطاعم",
      items: [
        { id: 'restaurant', title: 'نظام إدارة المطاعم', icon: Utensils, desc: 'حجوزات، كاشير، ومطبخ', color: 'bg-orange-100 text-orange-600' },
        { id: 'retail', title: 'نظام إدارة التجزئة', icon: Store, desc: 'مبيعات ومخزون', color: 'bg-blue-100 text-blue-600' },
        { id: 'clothing', title: 'نظام محلات الملابس', icon: Shirt, desc: 'مقاسات وألوان', color: 'bg-pink-100 text-pink-600' },
        { id: 'supermarket', title: 'نظام السوبر ماركت', icon: ShoppingBag, desc: 'باركود سريع', color: 'bg-green-100 text-green-600' },
      ]
    },
    {
      category: "قطاع الصحة واللياقة",
      items: [
        { id: 'clinic', title: 'نظام المجمعات الطبية', icon: Stethoscope, desc: 'حجوزات وملفات مرضى', color: 'bg-teal-100 text-teal-600' },
        { id: 'pharmacy', title: 'نظام الصيدليات', icon: Pill, desc: 'أدوية ونواقص', color: 'bg-emerald-100 text-emerald-600' },
        { id: 'gym', title: 'نظام الأندية الرياضية', icon: Dumbbell, desc: 'اشتراكات ودخول', color: 'bg-yellow-100 text-yellow-600' },
        { id: 'salon', title: 'نظام صوالين التجميل', icon: Scissors, desc: 'مواعيد وخدمات', color: 'bg-purple-100 text-purple-600' },
      ]
    },
    {
      category: "قطاع الخدمات والتشغيل",
      items: [
        { id: 'nursery', title: 'نظام إدارة الحضانات', icon: Baby, desc: 'متابعة الأطفال والرسوم', color: 'bg-rose-100 text-rose-600' },
        { id: 'carwash', title: 'نظام مغاسل السيارات', icon: Car, desc: 'حجوزات وخدمات', color: 'bg-cyan-100 text-cyan-600' },
        { id: 'services', title: 'نظام خدمات التنظيف', icon: Wrench, desc: 'أوامر شغل وفنيين', color: 'bg-indigo-100 text-indigo-600' },
        { id: 'laundry', title: 'نظام إدارة المغاسل', icon: Briefcase, desc: 'استلام وتسليم', color: 'bg-sky-100 text-sky-600' },
      ]
    },
    {
      category: "قطاع الأعمال والأصول",
      items: [
        { id: 'law', title: 'نظام مكاتب المحاماة', icon: Gavel, desc: 'قضايا وموكلين', color: 'bg-slate-100 text-slate-600' },
        { id: 'consulting', title: 'نظام الشركات الإستشارية', icon: Users, desc: 'مشاريع وساعات عمل', color: 'bg-blue-100 text-blue-800' },
        { id: 'realestate', title: 'نظام إدارة العقارات', icon: Home, desc: 'بيع وإيجار', color: 'bg-green-100 text-green-700' },
        { id: 'resort', title: 'نظام الشاليهات والمنتجعات', icon: Sun, desc: 'حجوزات وتسكين', color: 'bg-amber-100 text-amber-600' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans dir-rtl flex flex-col">
      
      {/* --- SYSTEMS HEADER --- */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-lg">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
               {/* Logo Area */}
               <div className="flex items-center gap-3 cursor-pointer" onClick={onBackToMarketplace}>
                  <div className="w-10 h-10 bg-ray-gold rounded-xl flex items-center justify-center font-black text-slate-900 text-xl shadow-md hover:scale-105 transition">R</div>
                  <div>
                     <h1 className="text-xl font-bold tracking-wide text-white">RAY <span className="text-ray-gold">Systems</span></h1>
                     <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Business Solutions</p>
                  </div>
               </div>

               {/* Desktop Nav */}
               <div className="hidden md:flex items-center gap-6">
                  <button onClick={onBackToMarketplace} className="text-sm font-medium text-slate-300 hover:text-white transition flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4" />
                    العودة للمتجر
                  </button>
                  <div className="h-6 w-px bg-slate-700"></div>
                  <button className="text-sm font-bold text-white hover:text-ray-gold transition">تسجيل الدخول</button>
                  <button 
                     onClick={() => onSystemSelect('general')}
                     className="bg-ray-gold text-slate-900 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-yellow-400 transition flex items-center gap-2 shadow-lg hover:shadow-yellow-500/20"
                  >
                     سجّل نشاطك الآن <ArrowLeft className="w-4 h-4" />
                  </button>
               </div>

               {/* Mobile Menu Toggle */}
               <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-white p-2 hover:bg-slate-800 rounded-lg">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
               </button>
            </div>
         </div>

         {/* Mobile Menu */}
         {mobileMenuOpen && (
            <div className="md:hidden bg-slate-800 border-t border-slate-700 p-4 absolute w-full left-0 shadow-2xl animate-in slide-in-from-top-5">
               <div className="flex flex-col gap-4">
                  <button onClick={onBackToMarketplace} className="text-right text-slate-300 hover:text-white py-2 border-b border-slate-700">العودة للمتجر (Marketplace)</button>
                  <button className="text-right font-bold text-white py-2">تسجيل الدخول</button>
                  <button 
                     onClick={() => onSystemSelect('general')}
                     className="bg-ray-gold text-slate-900 py-3 rounded-lg font-bold text-center shadow-md"
                  >
                     ابدأ الآن مجاناً
                  </button>
               </div>
            </div>
         )}
      </header>

      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 text-white py-16 md:py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur border border-slate-700 px-4 py-1.5 rounded-full text-ray-gold font-bold text-xs mb-8 shadow-lg">
            <ShieldCheck className="w-4 h-4" />
            نظام سحابي متكامل (SaaS)
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
            حلول ذكية لكل <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ray-gold via-yellow-200 to-ray-gold animate-pulse">نشاط تجاري</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
             منصة راي تقدم لك أنظمة إدارة متخصصة تغطي جميع المجالات. ابدأ اليوم وارفع كفاءة عملك، نظم حجوزاتك، وزد أرباحك.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => {
                   const element = document.getElementById('systems-grid');
                   element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition flex items-center justify-center gap-2 shadow-lg hover:-translate-y-1 w-full sm:w-auto active:scale-95"
             >
                استعراض الأنظمة
                <ArrowLeft className="w-5 h-5" />
             </button>
          </div>
        </div>
      </div>

      {/* --- SYSTEMS GRID --- */}
      <div id="systems-grid" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
           <h2 className="text-3xl font-black text-slate-800 mb-4">المجالات التي يخدمها راي (RAY)</h2>
           <p className="text-slate-500 max-w-2xl mx-auto">نغطي أكثر من 16 قطاع مختلف، كل نظام مصمم بخصائص فريدة تناسب طبيعة عملك.</p>
        </div>

        {systems.map((section, idx) => (
          <div key={idx} className="mb-20 last:mb-0">
            <div className="flex items-center gap-4 mb-8">
               <div className="h-10 w-1.5 bg-ray-gold rounded-full shadow-sm"></div>
               <h3 className="text-2xl font-black text-slate-800">{section.category}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.items.map((sys) => (
                <button 
                  key={sys.id}
                  onClick={() => onSystemSelect(sys.id)}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-ray-gold/50 hover:-translate-y-2 transition-all duration-300 group text-right flex flex-col h-full relative overflow-hidden active:scale-[0.98]"
                >
                  <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${sys.color.split(' ')[0]} opacity-10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150`}></div>
                  
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${sys.color} shadow-inner`}>
                    <sys.icon className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold text-lg text-slate-900 mb-2 group-hover:text-blue-600 transition">{sys.title}</h4>
                  <p className="text-sm text-slate-500 mb-6 flex-1 leading-relaxed">{sys.desc}</p>
                  
                  <div className="pt-4 border-t border-slate-50 w-full mt-auto">
                     <div className="flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-blue-600 transition">
                        <span>ابدأ الآن</span>
                        <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-2 transition-transform" />
                     </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- SYSTEMS FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center font-bold text-ray-gold text-lg shadow-inner">R</div>
               <div>
                  <span className="font-bold text-white block">RAY Systems</span>
                  <span className="text-xs text-slate-500">Enterprise Solutions</span>
               </div>
            </div>
            <div className="text-sm text-center md:text-right">
               © 2025 Ray Platform. جميع الحقوق محفوظة.
            </div>
            <div className="flex gap-8 text-sm font-bold">
               <a href="#" className="hover:text-white transition">الدعم الفني</a>
               <a href="#" className="hover:text-white transition">سياسة الخصوصية</a>
            </div>
         </div>
      </footer>
    </div>
  );
};

export default SystemsHub;
