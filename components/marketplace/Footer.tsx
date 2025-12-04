
import React from 'react';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Youtube,
  Store, Utensils, Wrench, Shirt, Stethoscope, Pill, Dumbbell, Home, Car, 
  ArrowLeft, ShoppingBag, Building2, Briefcase, HeartPulse, Scissors
} from 'lucide-react';

interface FooterProps {
  handleSystemSelect: (systemId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ handleSystemSelect }) => {
  
  // Grouped Systems Configuration
  const sectors = [
    {
      id: 'commercial',
      title: 'قطاع التجارة والمطاعم',
      icon: Store,
      color: 'blue',
      description: 'حلول ذكية لإدارة المبيعات والمخزون ونقاط البيع.',
      systems: [
        { id: 'retail', label: 'نظام محلات التجزئة', icon: ShoppingBag },
        { id: 'clothing', label: 'نظام محلات الملابس', icon: Shirt },
        { id: 'restaurant', label: 'نظام المطاعم والكافيهات', icon: Utensils },
      ]
    },
    {
      id: 'services',
      title: 'قطاع الخدمات والتشغيل',
      icon: Briefcase,
      color: 'cyan',
      description: 'إدارة العمليات الميدانية، الصيانة، ودورة الغسيل.',
      systems: [
        { id: 'laundry', label: 'نظام المغاسل والدراي كلين', icon: Shirt },
        { id: 'services', label: 'نظام شركات الصيانة', icon: Wrench },
        { id: 'salon', label: 'نظام الصالونات والتجميل', icon: Scissors },
      ]
    },
    {
      id: 'health',
      title: 'قطاع الصحة واللياقة',
      icon: HeartPulse,
      color: 'teal',
      description: 'رعاية متكاملة للمرضى والعملاء وإدارة الملفات.',
      systems: [
        { id: 'clinic', label: 'نظام إدارة العيادات', icon: Stethoscope },
        { id: 'pharmacy', label: 'نظام إدارة الصيدليات', icon: Pill },
        { id: 'gym', label: 'نظام الجيم والصالات', icon: Dumbbell },
      ]
    },
    {
      id: 'assets',
      title: 'قطاع الأصول والعقارات',
      icon: Building2,
      color: 'green',
      description: 'تسويق وإدارة الأصول عالية القيمة بكفاءة.',
      systems: [
        { id: 'realestate', label: 'نظام إدارة العقارات', icon: Home },
        { id: 'cars', label: 'نظام معارض السيارات', icon: Car },
      ]
    }
  ];

  const colors: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200',
    cyan: 'bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border-cyan-200',
    teal: 'bg-teal-50 text-teal-700 hover:bg-teal-100 border-teal-200',
    green: 'bg-green-50 text-green-700 hover:bg-green-100 border-green-200',
  };

  return (
    <footer className="bg-gray-100 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-900 mb-4">أنظمة راي المتخصصة</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">اختر النظام المناسب لنشاطك التجاري وابدأ في إدارة أعمالك باحترافية</p>
        </div>

        {/* Main Solution Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {sectors.map((sector) => (
            <div key={sector.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
               <div className="flex items-start gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${colors[sector.color].split(' ')[0]} ${colors[sector.color].split(' ')[1]}`}>
                    <sector.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{sector.title}</h3>
                    <p className="text-gray-500 text-sm mt-1">{sector.description}</p>
                  </div>
               </div>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sector.systems.map((system) => (
                    <button 
                      key={system.id}
                      onClick={() => handleSystemSelect(system.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all group text-right ${colors[sector.color]}`}
                    >
                      <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                         <system.icon className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-sm flex-1">{system.label}</span>
                      <ArrowLeft className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
               </div>
            </div>
          ))}
        </div>

        {/* Traditional Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 pt-12 border-t border-gray-200">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-ray-blue text-ray-gold rounded-lg flex items-center justify-center font-black text-xl shadow-md">R</div>
              <span className="text-2xl font-black text-ray-blue">RAY</span>
            </div>
            <p className="text-gray-600 leading-relaxed text-sm">
              راي هي المنصة الرقمية الشاملة التي تهدف لتمكين التجار وتسهيل حياة العملاء في مصر.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:bg-ray-blue hover:text-white transition shadow-sm border border-gray-100">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-bold text-ray-black mb-4">عن راي</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-ray-blue transition">من نحن</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">الوظائف</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">المدونة</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">شركاء النجاح</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-bold text-ray-black mb-4">الدعم والمساعدة</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-ray-blue transition">مركز المساعدة</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">الشروط والأحكام</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">سياسة الخصوصية</a></li>
              <li><a href="#" className="hover:text-ray-blue transition">تواصل معنا</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-bold text-ray-black mb-4">اتصل بنا</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-ray-gold" />
                <span className="font-bold dir-ltr">16XXX</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-ray-gold" />
                <span>info@ray.app</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-ray-gold" />
                <span>القاهرة، التجمع الخامس</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">© 2025 RAY. جميع الحقوق محفوظة.</p>
          <div className="flex gap-4 text-xs text-gray-400 font-mono">
             v2.5.0 (Beta)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
