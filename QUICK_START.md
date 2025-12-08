# ⚡ البدء السريع

## 🎯 في 5 دقائق فقط

### الخطوة 1️⃣: تثبيت التبعيات

```bash
# Backend
cd backend
npm install

# Frontend (في terminal جديد)
cd frontend
npm install
```

### الخطوة 2️⃣: إعداد MongoDB

1. اذهب إلى https://www.mongodb.com/cloud/atlas
2. أنشئ حساب مجاني
3. أنشئ Cluster (M0 Free)
4. احصل على Connection String
5. انسخه في `backend/src/.env.local`

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ray_db?retryWrites=true&w=majority
```

### الخطوة 3️⃣: تشغيل المشروع

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### الخطوة 4️⃣: فتح المتصفح

```
http://localhost:3000
```

## ✅ اختبار سريع

### اختبر الـ API
```bash
# الحصول على المنتجات
curl http://localhost:5000/api/products

# إنشاء منتج
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"منتج تجريبي","price":100}'
```

## 🚀 الآن أنت جاهز!

ابدأ بـ:
- 📖 اقرأ `README.md` للنظرة العامة
- 🔧 اقرأ `BACKEND_SETUP.md` لتفاصيل Backend
- 🎨 اقرأ `FRONTEND_SETUP.md` لتفاصيل Frontend

## 🐛 مشاكل شائعة

| المشكلة | الحل |
|--------|------|
| MongoDB لا يتصل | تحقق من Connection String و IP Whitelist |
| Frontend لا يعمل | امسح `.next` folder وأعد تشغيل الـ dev server |
| API لا يستجيب | تأكد من أن Backend يعمل على port 5000 |

---

**استمتع بالتطوير! 🎉**
