
import React, { useState } from 'react';
import { X, Mail, Lock, User, Phone, Store, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialType?: 'customer' | 'merchant';
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, initialMode = 'login', initialType = 'customer' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [userType, setUserType] = useState<'customer' | 'merchant'>(initialType);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl relative z-10 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col h-full">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
            <div className="w-12 h-12 bg-gradient-to-br from-ray-gold to-yellow-600 rounded-xl flex items-center justify-center shadow-lg text-ray-blue font-black text-2xl mx-auto mb-4">
              R
            </div>
            <h2 className="text-2xl font-black text-ray-blue mb-1">
              {mode === 'login' ? 'أهلاً بعودتك' : 'إنشاء حساب جديد'}
            </h2>
            <p className="text-gray-500 text-sm">
              {mode === 'login' ? 'سجل الدخول لمتابعة طلباتك وأعمالك' : 'انضم إلينا وابدأ رحلة النجاح'}
            </p>
          </div>

          {/* Type Toggle */}
          <div className="px-8 mb-6">
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button 
                onClick={() => setUserType('customer')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  userType === 'customer' 
                    ? 'bg-white text-ray-blue shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <User className="w-4 h-4" />
                عميل
              </button>
              <button 
                onClick={() => setUserType('merchant')}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                  userType === 'merchant' 
                    ? 'bg-white text-ray-blue shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Store className="w-4 h-4" />
                تاجر
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 mr-1">الاسم بالكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input 
                    type="text" 
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                    placeholder="الاسم ثلاثي"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 mr-1">البريد الإلكتروني أو الهاتف</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="text" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-700 mr-1">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                <input 
                  type="password" 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pr-10 pl-4 focus:outline-none focus:border-ray-gold focus:ring-1 focus:ring-ray-gold transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" className="text-xs font-bold text-ray-blue hover:underline">
                  نسيت كلمة المرور؟
                </button>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-ray-black text-white py-3.5 rounded-xl font-bold text-lg shadow-lg hover:bg-ray-gold hover:text-ray-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {mode === 'login' ? 'تسجيل الدخول' : 'إنشاء الحساب'}
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </>
              )}
            </button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
              <div className="relative flex justify-center"><span className="bg-white px-2 text-xs text-gray-400">أو</span></div>
            </div>

            <button type="button" className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-bold text-sm hover:bg-gray-50 transition flex items-center justify-center gap-2">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              المتابعة باستخدام Google
            </button>

            <div className="text-center mt-4 text-sm font-medium text-gray-600">
              {mode === 'login' ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-ray-blue font-bold hover:underline mx-1"
              >
                {mode === 'login' ? 'أنشئ حساب جديد' : 'سجل دخولك'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
