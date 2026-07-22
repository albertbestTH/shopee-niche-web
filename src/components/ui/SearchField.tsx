import { Search } from 'lucide-react';

export function SearchField({ compact = false }: { compact?: boolean }) {
  return <div className={`search-field${compact ? ' search-field--compact' : ''}`} aria-label="ตัวอย่างช่องค้นหา">
    <Search aria-hidden="true" size={20} />
    <span>ค้นหาคู่มือหรือหมวดหมู่</span>
    {!compact && <span className="search-field__status">ยังไม่เปิดใช้งาน</span>}
  </div>;
}
