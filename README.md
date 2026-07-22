# Shopee Niche Web

เว็บไซต์ Affiliate ที่พัฒนาจากฐานข้อมูล Keyword ของ Shopee

กระบวนการหลัก:

Keyword Intelligence → Product Research → SEO Content → Affiliate Website → Analytics

## Project scope

โปรเจกต์นี้เป็นงานแยกอิสระ และไม่เชื่อมกับโปรเจกต์ก่อนหน้า

## Current status

- Repository initialized
- Keyword Intelligence workbook prepared
- Top 30 keyword sprint prepared
- Product research structure prepared
- Website implementation pending

## Planned modules

- หน้าแรก
- หน้าหมวดหมู่
- หน้าบทความ SEO
- Product comparison blocks
- Affiliate disclosure
- Sitemap
- Metadata
- Analytics

## Next milestone

สร้างเว็บไซต์ MVP และเชื่อมข้อมูล Top 30 Keywords เข้ากับเว็บไซต์

## Site URL configuration

ตั้งค่า `NEXT_PUBLIC_SITE_URL` เป็น origin ของเว็บไซต์โดยไม่มี path หรือ trailing slash เพื่อให้ canonical URL, sitemap และ robots.txt ถูกต้อง

- Local validation: `NEXT_PUBLIC_SITE_URL=http://localhost:3000`
- Production example: `NEXT_PUBLIC_SITE_URL=https://www.your-domain.example`
- ดูรูปแบบไฟล์ได้จาก `.env.example` โดยค่า `https://example.com` เป็นเพียงตัวอย่างการตั้งค่า ไม่ใช่ production URL

ตัวแปรนี้ไม่ใช่ secret แต่ห้าม commit secret หรือข้อมูลรับรองใด ๆ ลงไฟล์ environment หากไม่ได้ตั้งค่า ระบบจะใช้ localhost เฉพาะตอน development และ production build จะหยุดพร้อมข้อความอธิบายแทนการเดา domain
