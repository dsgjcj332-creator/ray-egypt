# 🚀 Ray Egypt Platform

منصة متكاملة لإدارة الأعمال والتجارة الإلكترونية في مصر

## 📊 نظرة عامة

**Ray Egypt** هي منصة SaaS شاملة توفر:
- 🏪 أنظمة تجارية متعددة (مطاعم، محلات، عيادات، صالونات، حضانات...)
- 📱 واجهة متجاوبة وحديثة
- 🤖 مساعد ذكي بـ Gemini AI
- 📊 تقارير وتحليلات متقدمة
- 💳 دفع إلكتروني آمن
- 👥 إدارة المستخدمين والأدوار
- 📦 إدارة المنتجات والمخزون
- 📅 إدارة الحجوزات والمواعيد

## 📁 هيكل المشروع

```
ray-egypt-8/
├── backend/                      # Express.js API Server
│   ├── src/
│   │   ├── api/                  # Routes & Controllers
│   │   ├── config/               # MongoDB Config
│   │   ├── models/               # Database Models
│   │   └── index.js              # Entry Point
│   └── package.json
├── frontend/                     # Next.js Frontend
│   ├── src/
│   │   ├── app/                  # Pages (148)
│   │   ├── components/           # Components (233)
│   │   ├── context/              # Context API
│   │   ├── hooks/                # Custom Hooks
│   │   ├── services/             # API Services
│   │   └── utils/                # Utilities
│   └── package.json
├── docs/                         # Documentation
├── BACKEND_SETUP.md              # Backend Setup Guide
├── FRONTEND_SETUP.md             # Frontend Setup Guide
├── docker-compose.yml            # Docker Configuration
└── README.md                     # This File
```

## 🚀 البدء السريع

### المتطلبات
- Node.js v16+
- npm أو yarn
- MongoDB Atlas Account (مجاني)
- Git

### 1️⃣ استنساخ المشروع
```bash
git clone <repository-url>
cd ray-egypt-8
```

### 2️⃣ تشغيل Backend
```bash
cd backend
npm install
npm run dev
```

**ملاحظة:** تأكد من إعداد MongoDB أولاً (انظر `BACKEND_SETUP.md`)

### 3️⃣ تشغيل Frontend
```bash
cd frontend
npm install
npm run dev
```

### 4️⃣ فتح المتصفح
```
http://localhost:3000
```

## 📚 التوثيق

- **[Backend Setup Guide](./BACKEND_SETUP.md)** - دليل إعداد Backend
- **[Frontend Setup Guide](./FRONTEND_SETUP.md)** - دليل إعداد Frontend
- **[Backend README](./backend/src/README.md)** - توثيق Backend
- **[API Documentation](./docs/API.md)** - توثيق API

## 🏗️ البنية التقنية

### Backend
- **Framework:** Express.js 4.18.2
- **Database:** MongoDB 7.0.0 + Mongoose 8.0.0
- **Language:** JavaScript (ES6+)
- **Runtime:** Node.js

### Frontend
- **Framework:** Next.js 14.1.0
- **Library:** React 18.2.0
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 3.3.0
- **Icons:** Lucide React
- **Charts:** Recharts

## 🔌 API Endpoints

### Products
| Method | Endpoint | الوصف |
|--------|----------|-------|
| GET | `/api/products` | الحصول على جميع المنتجات |
| GET | `/api/products/:id` | الحصول على منتج واحد |
| POST | `/api/products` | إنشاء منتج جديد |
| PUT | `/api/products/:id` | تحديث منتج |
| DELETE | `/api/products/:id` | حذف منتج |

## 📦 التبعيات الرئيسية

### Backend
```json
{
  "express": "^4.18.2",
  "mongoose": "^8.0.0",
  "mongodb": "^7.0.0",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "nodemon": "^3.0.1"
}
```

### Frontend
```json
{
  "next": "14.1.0",
  "react": "^18.2.0",
  "tailwindcss": "^3.3.0",
  "typescript": "^5",
  "lucide-react": "^0.554.0",
  "recharts": "^2.12.0"
}
```

## 🔐 متغيرات البيئة

### Backend (.env.local)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ray_db
MONGODB_DB_NAME=ray_db
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key
```

## 🎯 الميزات الرئيسية

### 1. لوحة التحكم (Dashboard)
- ✅ إحصائيات شاملة
- ✅ رسوم بيانية وتقارير
- ✅ إدارة الحجوزات
- ✅ متابعة الأداء

### 2. إدارة الأنشطة
- ✅ العيادات والمستشفيات
- ✅ الأندية الرياضية
- ✅ الصالونات
- ✅ الحضانات
- ✅ المطاعم والمقاهي

### 3. إدارة الإدمن
- ✅ 17 صفحة إدارة شاملة
- ✅ إدارة المستخدمين
- ✅ إدارة الطلبات والمنتجات
- ✅ التحليلات والتقارير
- ✅ إدارة الأمان والإعدادات

### 4. التكامل الذكي
- ✅ مساعد Gemini AI
- ✅ البحث الذكي
- ✅ التوصيات التلقائية

## 🚢 Deployment

### Vercel (Frontend)
```bash
vercel --prod
```

### Heroku/Railway (Backend)
```bash
git push heroku main
```

## 🐛 استكشاف الأخطاء

### Backend لا يعمل
1. تأكد من تثبيت التبعيات: `npm install`
2. تحقق من MongoDB Connection String
3. تأكد من أن المنفذ 5000 متاح

### Frontend لا يعمل
1. تأكد من تثبيت التبعيات: `npm install`
2. امسح `.next` folder
3. أعد تشغيل الـ dev server

### API لا يستجيب
1. تأكد من أن Backend يعمل
2. تحقق من `next.config.js` rewrites
3. تحقق من CORS configuration

## 📝 ملاحظات

- جميع الملفات مُعدة بـ TypeScript
- جميع المكونات مُعدة بـ React Functional Components
- استخدام TailwindCSS للـ Styling
- دعم كامل للعربية (RTL)

## 🤝 المساهمة

للمساهمة في المشروع:
1. Fork المشروع
2. أنشئ branch جديد (`git checkout -b feature/amazing-feature`)
3. اعمل على التحسينات
4. اعمل commit (`git commit -m 'Add amazing feature'`)
5. اعمل push (`git push origin feature/amazing-feature`)
6. افتح Pull Request

## 📄 الترخيص

MIT License - انظر `LICENSE` للتفاصيل

## 📧 التواصل

للأسئلة والاستفسارات:
- 📧 Email: info@ray-egypt.com
- 🌐 Website: https://ray-egypt.com
- 💬 Discord: [Join our server]

---

**تم إعداد المشروع بنجاح! 🎉**

**الخطوات التالية:**
1. ✅ اقرأ `BACKEND_SETUP.md` لإعداد Backend
2. ✅ اقرأ `FRONTEND_SETUP.md` لإعداد Frontend
3. ⏳ اختبر الـ API Endpoints
4. ⏳ ابدأ التطوير!
