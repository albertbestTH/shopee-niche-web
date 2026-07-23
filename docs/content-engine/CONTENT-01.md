# CONTENT-01 — Product Summary Engine

## Goal

รับข้อมูลสินค้าที่ผู้ใช้ Capture จากหน้า Shopee แล้วสร้าง Product Draft ที่ปลอดภัยสำหรับการตรวจทาน

## Endpoint

`POST /api/content/product-summary`

### Input

```json
{
  "keyword": "รองเท้าวิ่งหน้าเท้ากว้าง",
  "sourceTitle": "ชื่อสินค้าจากหน้า Shopee",
  "sourceDescription": "รายละเอียดที่มองเห็นบนหน้า",
  "sourceUrl": "https://shopee.co.th/...",
  "affiliateUrl": "https://s.shopee.co.th/...",
  "imageUrl": "https://..."
}
```

### Output

- `displayName`
- `summary`
- `highlights`
- `limitations`
- `suitableFor`
- `verificationWarnings`
- `contentStatus: draft`
- `verificationStatus: unverified`

## Guardrails

ระบบเวอร์ชันนี้จะไม่สร้าง:

- ราคา
- คะแนน
- ยอดขาย
- ผลทดสอบ
- คำกล่าวอ้างว่าเคยใช้งานจริง
- คุณสมบัติที่ไม่มีอยู่ในข้อความต้นทาง

## Test

```bash
npm test
```

## Next task

CONTENT-02 ควรเพิ่ม SEO Draft Generator โดยใช้ Product Summary ที่ผ่านการตรวจแล้วเป็น Input ไม่ควรสร้าง SEO จาก Affiliate URL โดยตรง
