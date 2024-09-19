# XCHO Frontend

Frontend ระบบจัดการแบบฟอร์ม (XCHO) โดย Next.js

## การติดตั้ง

ใช้ Package Manager แบบ [npm](/) ในการติดตั้ง

```bash
npm i
```

## การใช้งาน

```bash
npm run dev
# หรือ
yarn dev
# หรือ
pnpm dev
```
จากนั้นเปิด [http://localhost:2500](http://localhost:2500) ผ่าน Browser เพื่อดูผลลัพธ์

## ถ้าเจอ ERROR

ถ้าเจอ Error แบบนี้
```bash
Failed to start server
Error: listen EACCES: permission denied 0.0.0.0:2500
...
```
แก้ไขได้โดย
1. เข้า Powershell หรือ Terminal โดยสิทธิ์ Admin (Root)
2. พิมพ์คำสั่ง 
```bash 
net stop winnat
```
3. พิมพ์คำสั่ง 
```bash
net start winnat
```

## เรียนรู้เพิ่มเติม

เทมเพลตนี้ใช้แม่แบบของ VRISTO สามารถศึกษาคู่มือ Components และอื่น ๆ เพิ่มเติมได้ [ที่นี่](https://react.vristo.sbthemes.com/)

## การขึ้นบน Vercel

ตอนนี้ได้ Deploy ขึ้น Vercel แล้วที่ [https://xcho.vercel.app/](https://xcho.vercel.app/) สามารถเล่นได้ในโหมด Progressive Web Application (PWA)

## ลิขสิทธิ์

[MIT](https://choosealicense.com/licenses/mit/)