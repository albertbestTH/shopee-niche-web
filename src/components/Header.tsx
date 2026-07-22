import Link from 'next/link';
export function Header(){return <header className="header"><div className="container nav"><Link className="brand" href="/"><span>คัดของดี</span><b>จริง</b></Link><nav><Link href="/#categories">หมวดหมู่</Link><Link href="/#latest">บทความ</Link><Link href="/about">เกี่ยวกับเรา</Link></nav><Link className="navCta" href="/#latest">ดูของน่าใช้</Link></div></header>}
