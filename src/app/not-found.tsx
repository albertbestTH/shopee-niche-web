import Link from 'next/link';

export default function NotFound() {
  return <main className="notFoundPage"><div className="container narrow">
    <span className="eyebrow">404 • ไม่พบหน้า</span>
    <h1>ขออภัย ไม่พบหน้าที่คุณกำลังค้นหา</h1>
    <p className="lead">ลิงก์อาจไม่ถูกต้อง หรือหน้านี้อาจถูกย้ายไปแล้ว</p>
    <Link className="primary" href="/">กลับหน้าแรก</Link>
  </div></main>;
}
