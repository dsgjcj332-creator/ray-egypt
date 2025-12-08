# 🔧 استكشاف الأخطاء والمشاكل

## Backend Issues

### ✅ Error: "Cannot find module 'express'" - **تم الحل**

**السبب:** التبعيات غير مثبتة

**الحل:**
```bash
cd backend
npm install
```

**الحالة الحالية:** ✅ **جميع التبعيات مثبتة**
- express@4.18.2
- mongoose@8.0.0
- cors@2.8.5
- dotenv@16.3.1
- nodemon@3.0.1

### ✅ Error: "MongoDB connection failed" - **تم الحل**

**السبب:** Connection String خاطئ أو MongoDB غير متاح

**الحل:**
1. ✅ تحقق من Connection String في `backend/src/.env.local`
2. ✅ تأكد من أن MongoDB Atlas Cluster يعمل
3. ✅ تأكد من أن IP Whitelist يسمح بـ `0.0.0.0/0`
4. ✅ جرب الاتصال مباشرة من MongoDB Atlas

**الخطوات المتبعة:**
```bash
# 1. اذهب إلى MongoDB Atlas
# 2. اختر Cluster0 > Connect > Connect your application
# 3. اختر Node.js وانسخ Connection String
# 4. ضع في backend/src/.env.local:
MONGODB_URI=mongodb+srv://vdhndn0_db_user:PASSWORD@cluster0.lxsowe9.mongodb.net/ray_db?retryWrites=true&w=majority

# 5. تأكد من إضافة IP في Network Access > IP Access List
# 6. شغّل Backend:
cd backend
npm run dev

# النتيجة:
# ✅ MongoDB Connected: ac-imwrtrl-shard-00-01.lxsowe9.mongodb.net
```

**الحالة الحالية:** ✅ **متصل بنجاح**

### ❌ Error: "Port 5000 is already in use"

**السبب:** هناك تطبيق آخر يستخدم المنفذ 5000

**الحل:**
```bash
# Windows - ابحث عن العملية
netstat -ano | findstr :5000

# قتل العملية (استبدل PID)
taskkill /PID <PID> /F

# أو غير المنفذ في .env.local
PORT=5001
```

### ❌ Error: "CORS error"

**السبب:** Frontend و Backend على origins مختلفة

**الحل:**
1. تأكد من أن `CORS_ORIGIN` في `backend/src/.env.local` صحيح
2. تأكد من أن Frontend يعمل على `http://localhost:3000`

```env
# backend/src/.env.local
CORS_ORIGIN=http://localhost:3000
```

### ✅ Error: "Cannot find module '../models/Product.js'" - **تم الحل**

**السبب:** المسار خاطئ

**الحل:**
تأكد من أن المسارات صحيحة في الملفات:
- ✅ `backend/src/api/routes/products.js` - يستورد من `../controllers/controllers/productController.js`
- ✅ `backend/src/api/controllers/controllers/productController.js` - يستورد من `../../../models/Product.js`

**الحالة الحالية:** ✅ **جميع المسارات صحيحة**

### ✅ Error: "ReferenceError: __dirname is not defined" - **تم الحل**

**السبب:** استخدام `__dirname` في ES6 modules

**الحل:**
```javascript
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
```

**الحالة الحالية:** ✅ **معرّف في backend/src/index.js**

---

### ❌ Error: "nodemon: command not found"

**السبب:** nodemon غير مثبت عالمياً

**الحل:**
```bash
# استخدم npm scripts بدلاً من الأمر المباشر
cd backend
npm run dev

# أو ثبّت nodemon عالمياً
npm install -g nodemon
```

---

### ❌ Error: "Cannot GET /"

**السبب:** الـ server لم يبدأ أو الـ port خاطئ

**الحل:**
```bash
# تحقق من أن الـ server يعمل
curl http://localhost:5000

# يجب أن ترى:
# RAY API Server is running...

# إذا لم تعمل، تحقق من:
# 1. هل Backend يعمل؟
# 2. هل PORT صحيح في .env.local؟
# 3. هل هناك خطأ في الـ logs؟
```

---

### ❌ Error: "SyntaxError: Unexpected token"

**السبب:** خطأ في صيغة JSON أو JavaScript

**الحل:**
```bash
# تحقق من صيغة الملف
# استخدم JSON validator: https://jsonlint.com/

# تحقق من الأقواس والفواصل
# استخدم Prettier لتنسيق الكود:
npm install -D prettier
npx prettier --write src/
```

## Frontend Issues

### ⏳ Status: **جاهز للتشغيل**

**الخطوات:**
```bash
cd frontend
npm install
npm run dev
```

**سيفتح على:** http://localhost:3000

---

### ❌ Error: "Cannot find module '@/components/...'"

**السبب:** الـ alias غير معرّف

**الحل:**
تأكد من أن `tsconfig.json` يحتوي على:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### ❌ Error: "next: command not found"

**السبب:** Next.js غير مثبت

**الحل:**
```bash
cd frontend
npm install
npm run dev
```

---

### ❌ Error: "Module not found: Can't resolve 'react'"

**السبب:** React غير مثبت

**الحل:**
```bash
cd frontend
npm install react react-dom
npm run dev
```

---

### ❌ Error: "TypeError: Cannot read property 'map' of undefined"

**السبب:** البيانات غير محملة بعد

**الحل:**
```typescript
// أضف null check
{data?.map((item) => (
  <div key={item.id}>{item.name}</div>
))}

// أو استخدم optional chaining
{data && data.length > 0 ? (
  data.map((item) => <div key={item.id}>{item.name}</div>)
) : (
  <p>No data available</p>
)}
```

---

### ❌ Error: "Hydration mismatch"

**السبب:** اختلاف بين Server-side و Client-side rendering

**الحل:**
```typescript
// استخدم useEffect للبيانات الديناميكية
import { useEffect, useState } from 'react';

export default function Component() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // جلب البيانات هنا
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  if (!data) return <p>Loading...</p>;
  return <div>{/* استخدم البيانات */}</div>;
}
```

### ❌ Error: "Tailwind styles not loading"

**السبب:** Tailwind لم يتم تجميعه بشكل صحيح

**الحل:**
```bash
cd frontend
rm -rf .next
npm run dev
```

### ❌ Error: "API is not responding"

**السبب:** Backend لا يعمل أو الـ proxy غير معرّف

**الحل:**
1. تأكد من أن Backend يعمل على `http://localhost:5000`
2. تحقق من `next.config.js` rewrites:
```javascript
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:5000/api/:path*',
    },
  ];
}
```

### ❌ Error: "Module not found: Can't resolve 'next/image'"

**السبب:** Next.js غير مثبت بشكل صحيح

**الحل:**
```bash
cd frontend
npm install
rm -rf .next node_modules/.cache
npm run dev
```

### ❌ Error: "Port 3000 is already in use"

**السبب:** هناك تطبيق آخر يستخدم المنفذ 3000

**الحل:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# أو استخدم port مختلف
npm run dev -- -p 3001
```

### ❌ Error: "TypeError: Cannot read property 'map' of undefined"

**السبب:** البيانات غير محملة بعد

**الحل:**
أضف null check:
```typescript
{data?.map((item) => (
  <div key={item.id}>{item.name}</div>
))}
```

## API Integration Issues

### ✅ Error: "Failed to fetch from /api/products" - **تم الاختبار**

**السبب:** API endpoint غير موجود أو Backend معطل

**الحل:**
1. ✅ تأكد من أن Backend يعمل
2. ✅ اختبر الـ endpoint مباشرة:
```bash
# اختبر GET
curl http://localhost:5000/api/products

# النتيجة:
# []

# اختبر POST (إضافة منتج)
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "منتج تجريبي",
    "price": 100,
    "category": "تجريبي",
    "stock": 50
  }'

# النتيجة:
# {"_id":"6935bd68bdee3cc543727744","name":"منتج تجريبي",...}
```

**الحالة الحالية:** ✅ **API يعمل بنجاح**

### ❌ Error: "CORS policy: No 'Access-Control-Allow-Origin' header"

**السبب:** CORS غير مفعّل في Backend

**الحل:**
تأكد من أن `backend/src/index.js` يحتوي على:
```javascript
import cors from 'cors';
app.use(cors());
```

### ❌ Error: "401 Unauthorized"

**السبب:** التوكن غير صحيح أو منتهي الصلاحية

**الحل:**
1. تحقق من التوكن في localStorage
2. أعد تسجيل الدخول
3. تحقق من JWT secret

## Database Issues

### ❌ Error: "MongoError: connect ECONNREFUSED"

**السبب:** MongoDB غير متاح

**الحل:**
1. تأكد من أن MongoDB Atlas Cluster يعمل
2. تحقق من Connection String
3. تأكد من الاتصال بالإنترنت

### ❌ Error: "MongoError: authentication failed"

**السبب:** اسم المستخدم أو كلمة المرور خاطئة

**الحل:**
1. تحقق من اسم المستخدم وكلمة المرور
2. أعد إنشاء Database User
3. تأكد من أن Connection String محدّث

### ❌ Error: "MongoError: IP address not whitelisted"

**السبب:** IP الخاص بك غير مسموح

**الحل:**
1. اذهب إلى MongoDB Atlas
2. اذهب إلى "Network Access"
3. أضف IP الخاص بك أو `0.0.0.0/0` (للتطوير فقط)

## Performance Issues

### ❌ Problem: "Frontend is slow"

**الحل:**
1. امسح `.next` folder
2. امسح `node_modules` وأعد تثبيتها
3. استخدم `npm run build` للاختبار

### ❌ Problem: "API is slow"

**الحل:**
1. أضف Database Indexing
2. استخدم Pagination
3. أضف Caching

**مثال - Pagination:**
```javascript
// backend/src/api/controllers/controllers/productController.js
export const getProducts = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const products = await Product.find()
      .limit(limit)
      .skip(skip);

    const total = await Product.countDocuments();

    res.status(200).json({
      data: products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
```

**الاستخدام:**
```bash
# الصفحة الأولى
curl http://localhost:5000/api/products?page=1&limit=10

# الصفحة الثانية
curl http://localhost:5000/api/products?page=2&limit=10
```

## Development Issues

### ❌ Error: "Git conflicts"

**الحل:**
```bash
git status
git add .
git commit -m "Resolve conflicts"
git pull
```

### ❌ Error: "Node version mismatch"

**الحل:**
```bash
# تحقق من الإصدار
node --version

# يجب أن يكون v16 أو أعلى
# إذا لم يكن، قم بالترقية من https://nodejs.org
```

---

### ❌ Error: "npm ERR! code EACCES"

**السبب:** مشكلة في صلاحيات npm

**الحل:**
```bash
# على Windows، استخدم Command Prompt كـ Administrator
# أو استخدم:
npm install --no-optional

# أو أعد تثبيت npm
npm install -g npm@latest
```

---

### ❌ Error: "Cannot find module 'dotenv'"

**السبب:** dotenv غير مثبت

**الحل:**
```bash
cd backend
npm install dotenv
npm run dev
```

---

### ❌ Error: "ENOENT: no such file or directory"

**السبب:** ملف أو مجلد غير موجود

**الحل:**
```bash
# تحقق من وجود الملف
ls -la backend/src/.env.local

# أو على Windows
dir backend\src\.env.local

# إذا لم يكن موجوداً، أنشئه:
copy backend\src\.env.example backend\src\.env.local
```

## Deployment Issues

### ❌ Error: "Build failed on Vercel"

**الحل:**
1. تأكد من أن جميع التبعيات مثبتة
2. تأكد من أن جميع متغيرات البيئة معرّفة
3. تحقق من Build Logs

### ❌ Error: "Backend not accessible from Frontend"

**الحل:**
1. تأكد من أن Backend URL صحيح
2. تأكد من أن Backend مُنشر بشكل صحيح
3. تحقق من CORS configuration

## Quick Fixes

### إعادة تعيين المشروع
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install
npm run dev

# Frontend
cd frontend
rm -rf node_modules package-lock.json .next
npm install
npm run dev
```

### مسح الـ Cache
```bash
# Frontend
rm -rf .next
rm -rf node_modules/.cache

# Backend
rm -rf node_modules
```

### اختبار الاتصال
```bash
# اختبر Backend
curl http://localhost:5000

# اختبر API
curl http://localhost:5000/api/products

# اختبر Frontend Proxy
curl http://localhost:3000/api/products
```

## Security Best Practices

### ⚠️ تحذير: لا تضع كلمات المرور في الكود

**❌ خطأ:**
```javascript
const uri = "mongodb+srv://user:password@cluster.mongodb.net/db";
```

**✅ صحيح:**
```javascript
// استخدم متغيرات البيئة
const uri = process.env.MONGODB_URI;
```

---

### ⚠️ تحذير: لا تنسى `.gitignore`

تأكد من أن `.gitignore` يحتوي على:
```
.env
.env.local
.env.*.local
node_modules/
.next/
dist/
build/
```

---

### ⚠️ تحذير: استخدم HTTPS في الإنتاج

```javascript
// في الإنتاج، استخدم HTTPS فقط
const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

---

## Debugging Tips

### 1️⃣ استخدم `console.log` بحذر

```javascript
// ✅ جيد
console.log('User created:', user.id);

// ❌ سيء - قد يكشف معلومات حساسة
console.log('User:', user);
```

### 2️⃣ استخدم Browser DevTools

```javascript
// في Frontend
// اضغط F12 لفتح DevTools
// اذهب إلى Console tab
// اختبر API calls:
fetch('/api/products').then(r => r.json()).then(d => console.log(d))
```

### 3️⃣ استخدم MongoDB Compass

```
// تحميل: https://www.mongodb.com/products/compass
// اتصل بـ MongoDB Atlas مباشرة
// استعرض البيانات بصرياً
```

---

## الحصول على المساعدة

إذا لم تجد الحل:
1. 📖 اقرأ الـ logs بعناية
2. 🔍 ابحث عن الخطأ على Google
3. 💬 اسأل في Discord
4. 📧 أرسل بريد إلى info@ray-egypt.com

---

## Useful Resources

- **MongoDB Documentation:** https://docs.mongodb.com/
- **Express.js Guide:** https://expressjs.com/
- **Next.js Documentation:** https://nextjs.org/docs
- **React Documentation:** https://react.dev/
- **Node.js Documentation:** https://nodejs.org/docs/
- **Mongoose Documentation:** https://mongoosejs.com/

---

**آخر تحديث:** 7 ديسمبر 2025

## 📊 ملخص الحالة الحالية

| المكون | الحالة | الملاحظات |
|--------|--------|----------|
| **Backend** | ✅ يعمل | MongoDB متصل، API تعمل |
| **MongoDB** | ✅ متصل | cluster0.lxsowe9.mongodb.net |
| **API Endpoints** | ✅ تعمل | GET/POST/PUT/DELETE products |
| **Frontend** | ⏳ جاهز | يحتاج npm install و npm run dev |
| **CORS** | ✅ مفعّل | http://localhost:3000 |

---

**آخر تاريخ التحديث:** 7 ديسمبر 2025 - 17:46 UTC+02:00
