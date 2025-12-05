"use client";

import React from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube,
  ArrowLeft, Store, Zap
} from 'lucide-react';

interface FooterProps {
  onGoToSystems?: () => void;
  onNavigate?: (view: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onGoToSystems, onNavigate }) => {
  
  const handleNavClick = (e: React.MouseEvent, view: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  const handleSystemSelect = (id: string) => {
     // Redirect to Systems Hub with the selected ID context if needed
     // For now, we just open the hub, as per requirement
     if (onGoToSystems) onGoToSystems();
  };

  return (
    <footer className="bg-white dark:bg-gray-900 pt-16 border-t border-gray-200 dark:border-gray-800 transition-colors mt-auto">
      
      {/* Offers & Discounts Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-red-600 to-red-700 dark:from-red-900 dark:to-red-950 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden shadow-2xl dark:shadow-none border border-red-500 group">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 group-hover:opacity-20 transition-opacity duration-500"></div>
           <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-yellow-400 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
           
           <div className="relative z-10 max-w-xl text-center md:text-right">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold text-yellow-300 mb-4 border border-white/10">
                <span className="text-lg">🎯</span>
                عروض حصرية
              </div>
              <h2 className="text-3xl md:text-4xl font-black mb-4 text-white leading-tight">عروض وخصومات اليوم</h2>
              <p className="text-gray-100 text-lg leading-relaxed">
                اكتشف أفضل العروض والخصومات على جميع المنتجات والخدمات. توفير يصل إلى 70%!
              </p>
           </div>
           <div className="relative z-10">
              <button 
                onClick={(e) => handleNavClick(e, 'offers')}
                className="bg-yellow-400 text-red-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition shadow-lg flex items-center gap-2 group/btn w-full md:w-auto justify-center transform hover:-translate-y-1"
              >
                <span className="text-xl">💰</span>
                عرض العروض
                <ArrowLeft className="w-5 h-5 transition-transform group-hover/btn:-translate-x-1" />
              </button>
           </div>
        </div>
      </div>

      {/* Standard Footer Links */}
      <div className="bg-gray-50 dark:bg-gray-950 pt-16 pb-8 border-t border-gray-200 dark:border-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center md:text-right">
            
            {/* Brand Column */}
            <div className="space-y-6 flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-ray-blue dark:bg-ray-gold text-ray-gold dark:text-ray-blue rounded-lg flex items-center justify-center font-black text-xl shadow-md">R</div>
                <span className="text-2xl font-black text-ray-blue dark:text-white">RAY</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                المنصة الرقمية الأولى للتسوق والخدمات وإدارة الأعمال في مصر.
              </p>
              <button 
                onClick={(e) => handleNavClick(e, 'systems')}
                className="flex items-center gap-3 p-3 rounded-xl border transition-all group text-right bg-ray-blue text-white dark:bg-ray-gold dark:text-ray-black hover:bg-blue-800 dark:hover:bg-yellow-400 border-ray-blue dark:border-ray-gold w-full md:w-auto justify-center md:justify-start"
              >
                <div className="bg-white dark:bg-ray-black w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                  <Store className="w-4 h-4 text-ray-blue dark:text-ray-gold" />
                </div>
                <span className="font-bold text-sm flex-1 md:flex-none">تسجيل نشاطك</span>
                <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <div className="flex gap-4 justify-center md:justify-start">
                {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-ray-blue dark:hover:bg-ray-gold hover:text-white dark:hover:text-ray-black transition shadow-sm border border-gray-100 dark:border-gray-700">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Column 1 */}
            <div>
              <h4 className="font-bold text-ray-black dark:text-white mb-4">عن راي</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/about" onClick={(e) => handleNavClick(e, 'about')} className="hover:text-ray-blue dark:hover:text-ray-gold transition block">من نحن</a></li>
                <li><a href="/jobs" className="hover:text-ray-blue dark:hover:text-ray-gold transition block">الوظائف</a></li>
                <li><a href="/blog" className="hover:text-ray-blue dark:hover:text-ray-gold transition block">المدونة</a></li>
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="font-bold text-ray-black dark:text-white mb-4">المساعدة</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="/help" onClick={(e) => handleNavClick(e, 'help')} className="hover:text-ray-blue dark:hover:text-ray-gold transition block">مركز المساعدة</a></li>
                <li><a href="/terms" onClick={(e) => handleNavClick(e, 'terms')} className="hover:text-ray-blue dark:hover:text-ray-gold transition block">الشروط والأحكام</a></li>
                <li><a href="/privacy" onClick={(e) => handleNavClick(e, 'privacy')} className="hover:text-ray-blue dark:hover:text-ray-gold transition block">الخصوصية</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-ray-black dark:text-white mb-4">اتصل بنا</h4>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Phone className="w-4 h-4 text-ray-gold" />
                  <span className="font-bold dir-ltr">16XXX</span>
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <Mail className="w-4 h-4 text-ray-gold" />
                  <span>info@ray.app</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 dark:text-gray-500 text-xs">© 2025 RAY. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
