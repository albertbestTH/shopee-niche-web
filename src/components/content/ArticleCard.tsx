import Link from 'next/link';
import { ArrowRight, Clock, FileText } from 'lucide-react';
import { Badge } from '../ui/Badge';

export function ArticleCard({ article, categoryName, featured = false }: { article: { slug: string; title: string; excerpt: string; readTime: string; badge: string }; categoryName: string; featured?: boolean }) {
  return <article className={`article-card${featured ? ' article-card--featured' : ''}`}>
    <div className="article-card__visual" aria-hidden="true"><FileText size={featured ? 38 : 30} /></div>
    <div className="article-card__body">
      <div className="article-card__badges"><Badge tone="primary">ข้อมูลตัวอย่าง</Badge><Badge>{article.badge}</Badge></div>
      <p className="article-card__meta">{categoryName} <span aria-hidden="true">·</span> <Clock aria-hidden="true" size={14} /> {article.readTime}</p>
      <h3><Link href={`/article/${article.slug}`}>{article.title}</Link></h3>
      <p>{article.excerpt}</p>
      <Link className="text-link" href={`/article/${article.slug}`}>อ่าน Buying Guide ตัวอย่าง <ArrowRight aria-hidden="true" size={16} /></Link>
    </div>
  </article>;
}
