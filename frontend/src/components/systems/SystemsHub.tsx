import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Store, Utensils, Home, Car, Stethoscope, Dumbbell, 
  Wrench, Shirt, ShoppingBag, Scissors, Pill, Briefcase, 
  ArrowLeft, CheckCircle, ShieldCheck, HardHat, ArrowRight, Menu, X, LayoutGrid,
  Baby, Gavel, Users, Umbrella, Sun, Zap, TrendingUp, BarChart3, Clock, Lock, Cloud,
  Phone, Mail, MapPin, Star, Shield, Award, ChevronRight, Calendar
} from 'lucide-react';

interface SystemsHubProps {
  onSystemSelect: (systemId: string) => void;
  onBackToMarketplace: () => void;
}

const SystemsHub: React.FC<SystemsHubProps> = ({ onSystemSelect, onBackToMarketplace }) => {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const handleGoToMerchant = () => {
    // Simulate navigation to merchant page
    window.location.href = '/merchant/supermarket-khair-zaman';
  };

  const systems = [
    {
      category: "قطاع الحجوزات والخدمات",
      items: [
        { id: 'bookings', title: 'نظام إدارة الحجوزات', icon: Calendar, desc: 'لجميع الأنشطة التي تحتاج حجز', color: 'bg-indigo-100 text-indigo-600' },
        { id: 'clinic', title: 'نظام المجمعات الطبية', icon: Stethoscope, desc: 'حجوزات وملفات مرضى', color: 'bg-teal-100 text-teal-600' },
        { id: 'gym', title: 'نظام الأندية الرياضية', icon: Dumbbell, desc: 'اشتراكات ودخول', color: 'bg-yellow-100 text-yellow-600' },
        { id: 'salon', title: 'نظام صوالين التجميل', icon: Scissors, desc: 'مواعيد وخدمات', color: 'bg-purple-100 text-purple-600' },
      ]
    },
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
      category: "قطاع الصحة والصيدليات",
      items: [
        { id: 'pharmacy', title: 'نظام الصيدليات', icon: Pill, desc: 'أدوية ونواقص', color: 'bg-emerald-100 text-emerald-600' },
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
                  <button 
                    onClick={handleGoToMerchant}
                    className="text-sm font-bold text-white hover:text-ray-gold transition"
                  >
                    عرض مثال محل
                  </button>
                  <button 
                    onClick={() => router.push('/merchant/login')}
                    className="text-sm font-bold text-white hover:text-ray-gold transition"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                     onClick={() => router.push('/merchant/register')}
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
                  <button 
                    onClick={() => router.push('/merchant/login')}
                    className="text-right font-bold text-white py-2"
                  >
                    تسجيل الدخول
                  </button>
                  <button 
                     onClick={() => router.push('/merchant/register')}
                     className="bg-ray-gold text-slate-900 py-3 rounded-lg font-bold text-center shadow-md"
                  >
                     سجّل نشاطك الآن
                  </button>
               </div>
            </div>
         )}
      </header>

      {/* --- HERO SECTION --- */}
      <div className="bg-slate-900 text-white py-20 md:py-32 px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-ray-gold/10 rounded-full blur-2xl animate-pulse delay-500"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur px-4 py-2 rounded-full border border-slate-700">
              <ShieldCheck className="w-4 h-4 text-ray-gold" />
              <span className="text-sm font-medium">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur px-4 py-2 rounded-full border border-slate-700">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-sm font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-800/60 backdrop-blur px-4 py-2 rounded-full border border-slate-700">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">99.9% Uptime</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">
            <span className="block mb-2">Enterprise</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ray-gold via-yellow-200 to-ray-gold animate-gradient">
              Solutions
            </span>
            <span className="block text-3xl md:text-5xl mt-2 text-slate-300">للأعمال العربية</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 leading-relaxed font-light">
            منصة راي تقدم أنظمة إدارة متخصصة بالذكاء الاصطناعي. 
            <span className="text-ray-gold font-bold"> أكثر من 5000 شركة</span> في مصر والشرق الأوسط تثق بنا
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { number: '5000+', label: 'عميل نشط' },
              { number: '16+', label: 'نظام متخصص' },
              { number: '99.9%', label: 'توفر الخدمة' },
              { number: '45%', label: 'زيادة الأرباح' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-ray-gold mb-1">{stat.number}</div>
                <p className="text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
             <button 
                onClick={() => {
                   const element = document.getElementById('systems-grid');
                   element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-ray-gold text-slate-900 px-10 py-5 rounded-2xl font-black text-lg hover:bg-yellow-400 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 w-full sm:w-auto active:scale-95 flex items-center justify-center gap-3"
             >
                <span>استكشف الأنظمة</span>
                <ArrowLeft className="w-6 h-6" />
             </button>
             <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all duration-300 w-full sm:w-auto flex items-center justify-center gap-3">
                <span>جولة تفاعلية</span>
                <Zap className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>

      {/* --- SYSTEMS GRID --- */}
      <div id="systems-grid" className="bg-gradient-to-b from-slate-50 to-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-ray-gold/10 px-4 py-2 rounded-full text-ray-gold font-bold text-sm mb-6">
              <LayoutGrid className="w-4 h-4" />
              16 نظام متخصص
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
              حلول متخصصة لـ <span className="text-ray-gold">كل القطاعات</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">أنظمة مصممة خصيصاً لكل نشاط تجاري، مدعومة بالذكاء الاصطناعي والتحليلات المتقدمة</p>
          </div>

          {systems.map((section, idx) => (
            <div key={idx} className="mb-24 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-6">
                  <div className="h-12 w-1 bg-gradient-to-b from-ray-gold to-yellow-400 rounded-full shadow-lg"></div>
                  <div>
                    <h3 className="text-3xl font-black text-slate-900">{section.category}</h3>
                    <p className="text-slate-500 mt-1">حلول احترافية ومتكاملة</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-slate-400">
                  <span>{section.items.length} أنظمة</span>
                  <ArrowLeft className="w-4 h-4" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {section.items.map((sys) => (
                  <div 
                    key={sys.id}
                    className="group cursor-pointer"
                    onClick={() => onSystemSelect(sys.id)}
                  >
                    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl hover:border-ray-gold/50 hover:-translate-y-3 transition-all duration-500 h-full relative overflow-hidden">
                      {/* Background Pattern */}
                      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${sys.color.split(' ')[0]} opacity-5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700`}></div>
                      
                      {/* Icon */}
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${sys.color} shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300`}>
                        <sys.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      {/* Content */}
                      <h4 className="font-black text-xl text-slate-900 mb-3 group-hover:text-ray-gold transition-colors">
                        {sys.title}
                      </h4>
                      <p className="text-slate-600 mb-6 flex-1 leading-relaxed">{sys.desc}</p>
                      
                      {/* Features List */}
                      <div className="space-y-2 mb-6">
                        {['تسجيل فوري', 'دعم 24/7', 'تحديثات مجانية'].map((feature, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-slate-500">
                            <CheckCircle className="w-3 h-3 text-green-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA */}
                      <div className="pt-6 border-t border-slate-100 w-full">
                        <div className="flex items-center justify-between text-sm font-bold text-ray-gold group-hover:text-ray-black transition-colors">
                          <span>ابدأ الآن</span>
                          <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-2 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="bg-white py-20 px-4 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">لماذا تختار راي؟</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">منصة متكاملة توفر كل ما تحتاجه لإدارة عملك بكفاءة واحترافية</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'سريعة وفعالة', desc: 'واجهة سهلة الاستخدام تسرع من عملك بنسبة 70%' },
              { icon: Cloud, title: 'سحابية 100%', desc: 'لا تحتاج لتثبيت، استخدمها من أي مكان' },
              { icon: Lock, title: 'آمنة تماماً', desc: 'تشفير عسكري وحماية بيانات من الدرجة الأولى' },
              { icon: TrendingUp, title: 'تحليلات متقدمة', desc: 'تقارير شاملة وإحصائيات مفصلة لعملك' },
              { icon: Clock, title: 'دعم 24/7', desc: 'فريق دعم متخصص متاح طوال الوقت' },
              { icon: BarChart3, title: 'زيادة الأرباح', desc: 'عملاؤنا زادت أرباحهم بمعدل 45% في السنة الأولى' }
            ].map((feature, idx) => (
              <div key={idx} className="bg-gradient-to-br from-slate-50 to-slate-100 p-8 rounded-2xl border border-slate-200 hover:border-ray-gold hover:shadow-xl transition-all duration-300 group">
                <div className="w-14 h-14 bg-ray-gold/20 rounded-xl flex items-center justify-center mb-6 group-hover:bg-ray-gold/30 transition">
                  <feature.icon className="w-7 h-7 text-ray-gold" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- STATS SECTION --- */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '5000+', label: 'عميل نشط' },
              { number: '16+', label: 'نظام متخصص' },
              { number: '99.9%', label: 'توفر الخدمة' },
              { number: '45%', label: 'زيادة الأرباح' }
            ].map((stat, idx) => (
              <div key={idx} className="group">
                <div className="text-5xl font-black text-ray-gold mb-2 group-hover:scale-110 transition-transform">{stat.number}</div>
                <p className="text-lg text-slate-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- TESTIMONIALS SECTION --- */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">آراء عملائنا</h2>
            <p className="text-lg text-slate-600">نحن فخورون بثقة آلاف العملاء بنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'أحمد محمد', role: 'صاحب مطعم', text: 'راي غيّر طريقة إدارتي للمطعم، الآن أتحكم بكل شيء من الموبايل!' },
              { name: 'فاطمة علي', role: 'مديرة صيدلية', text: 'النظام سهل جداً والدعم الفني رائع، أنصح به كل صيدليات مصر' },
              { name: 'محمود حسن', role: 'صاحب جيم', text: 'زادت عضويات جيمي 60% بعد استخدام نظام راي، استثمار رائع!' }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 hover:border-ray-gold hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-ray-gold rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-700 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-ray-gold text-lg">★</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="bg-gradient-to-r from-ray-gold to-yellow-500 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-ray-black mb-6">ابدأ رحلتك مع راي اليوم</h2>
          <p className="text-xl text-ray-black/80 mb-10 max-w-2xl mx-auto">احصل على نسخة تجريبية مجانية لمدة 30 يوم، بدون الحاجة لبطاقة ائتمان</p>
          <button 
            onClick={() => onSystemSelect('general')}
            className="bg-ray-black text-ray-gold px-12 py-5 rounded-2xl font-black text-xl hover:bg-slate-900 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:-translate-y-1 active:scale-95 inline-flex items-center gap-3"
          >
            <span>ابدأ الآن مجاناً</span>
            <ArrowLeft className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* --- SYSTEMS FOOTER --- */}
      <footer className="bg-slate-900 text-slate-400 py-20 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-ray-gold rounded-xl flex items-center justify-center font-black text-slate-900 text-xl shadow-lg">R</div>
                <div>
                  <h3 className="text-2xl font-black text-white">RAY Systems</h3>
                  <p className="text-sm text-ray-gold font-bold">Enterprise Solutions</p>
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed">
                منصة راي تقدم حلول إدارة متخصصة للشركات في مصر والشرق الأوسط. أكثر من 5000 شركة تثق بنا لإدارة عملياتها اليومية.
              </p>
              <div className="flex gap-4">
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-ray-gold" />
                  <span className="text-sm">ISO Certified</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800 px-3 py-2 rounded-lg">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span className="text-sm">Secure</span>
                </div>
              </div>
            </div>

            {/* All Systems Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">جميع الأنظمة</h4>
              <div className="grid grid-cols-2 gap-3">
                {systems.flatMap(section => section.items).slice(0, 10).map((sys) => (
                  <button
                    key={sys.id}
                    onClick={() => onSystemSelect(sys.id)}
                    className="text-right text-sm text-slate-400 hover:text-ray-gold transition-colors flex items-center gap-2"
                  >
                    <sys.icon className="w-3 h-3" />
                    <span>{sys.title.split('نظام ')[1]}</span>
                  </button>
                ))}
              </div>
              <button className="mt-3 text-sm text-ray-gold hover:text-yellow-400 transition-colors font-bold">
                عرض جميع الأنظمة (16) →
              </button>
            </div>

            {/* Solutions Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">حلولنا</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-ray-gold transition-colors">حلول للشركات الكبرى</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">حلول للشركات الصغيرة</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">حلول للمتاجر</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">حلول للمطاعم</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">حلول طبية</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">حلول تعليمية</a></li>
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h4 className="font-bold text-white mb-6 text-lg">الدعم والمساعدة</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#" className="hover:text-ray-gold transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">الدعم الفني 24/7</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">فيديوهات تعليمية</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">المدونة التقنية</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">واجهة برمجة التطبيقات</a></li>
                <li><a href="#" className="hover:text-ray-gold transition-colors">حالة الخدمة</a></li>
              </ul>
            </div>
          </div>

          {/* Contact & Stats Bar */}
          <div className="bg-slate-800/50 rounded-2xl p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
                <div className="space-y-2 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-ray-gold" />
                    <span>+20 2 123456789</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-ray-gold" />
                    <span>systems@ray.app</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-ray-gold" />
                    <span>القاهرة، مصر</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-white font-bold mb-4">نحن هنا لمساعدتك</h4>
                <p className="text-slate-400 text-sm mb-4">فريق دعم متخصص متاح 24/7</p>
                <button className="bg-ray-gold text-slate-900 px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-colors">
                  ابدأ محادثة الآن
                </button>
              </div>
              
              <div className="text-center md:text-left">
                <h4 className="text-white font-bold mb-4">انضم لـ 5000+ شركة</h4>
                <p className="text-slate-400 text-sm mb-4">شركات في مصر والشرق الأوسط تثق بنا</p>
                <button 
                  onClick={() => onSystemSelect('general')}
                  className="bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/20 transition-colors"
                >
                  جرب مجاناً 30 يوم
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-sm text-slate-500 text-center md:text-right">
                © 2025 Ray Platform. جميع الحقوق محفوظة.
              </div>
              <div className="flex gap-8 text-sm font-bold">
                <a href="#" className="hover:text-white transition-colors">الشروط والأحكام</a>
                <a href="#" className="hover:text-white transition-colors">سياسة الخصوصية</a>
                <a href="/jobs" className="hover:text-white transition-colors">وظائف</a>
                <a href="#" className="hover:text-white transition-colors">سياسة الاستخدام</a>
                <a href="#" className="hover:text-white transition-colors">معلومات قانونية</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SystemsHub;
