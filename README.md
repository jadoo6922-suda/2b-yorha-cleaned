# NOX BOT (نسخة شخصية منظّفة)

بوت واتساب Multi-Device (Baileys) بعد تنظيف الإعدادات وتأمين أوامر المالك وربط الذكاء الاصطناعي بـ Groq.

## المتطلبات
- Node.js 22+
- Termux أو لينكس
- حساب WhatsApp للبوت
- مفتاح Groq (اختياري للأوامر الذكية)

## الإعداد السريع
1. عدّل رقمك في `settings.js` داخل `global.owner` إن لزم.
2. ضع مفتاح Groq:
   ```js
   global.APIs.groq = 'gsk_...'
   ```
3. ثبّت ثم شغّل:
   ```bash
   npm install --legacy-peer-deps
   npm start
   ```
4. امسح رمز QR من واتساب → الأجهزة المرتبطة.

## أوامر AI
- `.ai سؤالك`
- `.كلود سؤالك`
- `.groq سؤالك`

## أمان
- تنفيذ الشل `$` للمالك فقط (رقم `global.owner`).
- لا تشارك مجلد `Sessions`.
