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

## Keyword data pipeline

- Source workbook: `data/Shopee_Keyword_Intelligence_Sprint2.xlsx`
- Source sheet: `Sprint 2 - Top 30`
- Generated files: `src/data/generated/keywords.json` and `src/data/generated/manifest.json`

Commands:

```bash
npm run data:import
npm run data:validate
npm run data:check
```

Use `git diff -- src/data/generated` after importing to review exactly what changed. Never edit generated JSON manually, and never use the import script to edit or save the Excel workbook.

When the workbook changes:

1. Confirm the source workbook is the intended reviewed file.
2. Run `npm run data:import`.
3. Run `npm run data:validate` and `npm run test`.
4. Review the generated-data diff and manifest source hash.
5. Resolve any validation or category-mapping warning before consuming new records.
