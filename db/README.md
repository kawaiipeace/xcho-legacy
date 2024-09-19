# XCHO Database

Database ระบบจัดการแบบฟอร์ม (XCHO) โดย PostgreSQL

## การติดตั้ง

ใช้ [Docker Engine](/) ในการรันไฟล์ ต้องติดตั้ง Docker ก่อน
หากมี Docker แล้ว ให้สร้าง Image ผ่านคำสั่ง

```bash
docker build -t xcho-database .
```

## การใช้งาน

```bash
docker run -d --name xcho-database -p 2502:5432 xcho-database
docker start xcho-database
```

จากนั้นใช้ Database Viewer [DBeaver](/) หรือ [PGAdmin](/) โดยกำหนด Connection String ดังนี้
```bash
HOST: localhost
PORT: 2502
DATABASE: xcho
USERNAME: postgres
PASSWORD: 123456
```

## การ Export Database หรือ Dump ข้อมูล

```bash
docker exec xcho-database pg_dump -h localhost -U postgres xcho > xcho.sql
```

ทั้งนี้ ให้สร้างไฟล์ sql ใหม่ก่อน แล้วคัดลอก SQL Syntax ทั้งหมดจากที่ Dump มาใส่ไฟล์ที่สร้างใหม่
วิธีดังกล่าวจะแก้ปัญหาเรื่อง UTF-8 Syntax Error ได้