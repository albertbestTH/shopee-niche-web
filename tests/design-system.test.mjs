import assert from 'node:assert/strict';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import { articles, categories } from '../src/data/site.ts';

const read = (path) => readFileSync(path, 'utf8');
const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const sourceFiles = walk('src').filter((path) => /\.(?:ts|tsx|css)$/.test(path));
const source = sourceFiles.map((path) => read(path)).join('\n');

test('navigation links point to existing routes or homepage sections', () => {
  const header = read('src/components/layout/Header.tsx');
  for (const route of ['/about', '/#categories', '/#guides']) assert.ok(header.includes(`href: '${route}'`));
  assert.ok(read('src/components/layout/Footer.tsx').includes('href={`/category/${category.slug}`}'));
});

test('interactive source contains no empty fragments or placeholder external URLs', () => {
  assert.doesNotMatch(source, /href=["']#["']/);
  assert.doesNotMatch(source, /href=["']https?:\/\/(?:example|placeholder)\./i);
  assert.doesNotMatch(source, /onClick=\{[^}]*\}<div/);
});

test('homepage contains every required design phase section', () => {
  const homepage = read('src/app/page.tsx');
  for (const marker of ['home-hero', 'trust-strip', 'categories', 'guides', 'latest', 'method-heading', 'keyword-heading', 'newsletter-heading']) assert.ok(homepage.includes(marker), marker);
  assert.ok(homepage.includes('getKeywordStats'));
  assert.ok(homepage.includes('getAllKeywords'));
  assert.ok(homepage.includes('ยังไม่สร้าง 30 keyword pages'));
});

test('product placeholder does not invent commerce evidence', () => {
  const placeholder = read('src/components/content/ProductPlaceholderCard.tsx');
  assert.ok(placeholder.includes('ยังไม่มีชื่อสินค้า ราคา คะแนน ยอดขาย'));
  assert.doesNotMatch(placeholder, /฿|\/10|shopee\.co\.th|affiliateUrl|shopBtn/i);
  assert.doesNotMatch(placeholder, /<a\b|<Link\b/);
});

test('mobile menu retains accessible disclosure and keyboard behavior', () => {
  const menu = read('src/components/layout/MobileMenu.tsx');
  for (const value of ['aria-expanded', 'aria-controls', 'aria-label', "event.key === 'Escape'", 'firstLinkRef.current?.focus()', 'buttonRef.current?.focus()', 'onClick={() => setIsOpen(false)}']) assert.ok(menu.includes(value), value);
});

test('legal routes and sample labels remain visible', () => {
  for (const path of ['src/app/about/page.tsx', 'src/app/affiliate-disclosure/page.tsx', 'src/app/privacy/page.tsx']) assert.ok(read(path).includes('StaticPage'));
  assert.ok(read('src/app/page.tsx').includes('ข้อมูลตัวอย่าง'));
  assert.ok(read('src/app/article/[slug]/page.tsx').includes('SampleContentNotice'));
  assert.ok(read('src/app/category/[slug]/page.tsx').includes('SampleContentNotice'));
});

test('design tokens and reduced motion support are present', () => {
  const tokens = read('src/styles/tokens.css');
  for (const token of ['--color-background', '--color-primary', '--color-focus', '--space-4', '--space-30', '--radius-pill', '--shadow-card-hover', '--container-wide', '--article-width', '--text-display', '--transition-normal']) assert.ok(tokens.includes(token), token);
  assert.ok(read('src/app/globals.css').includes('@media (prefers-reduced-motion: reduce)'));
  assert.ok(read('src/app/globals.css').includes(':focus-visible'));
});

test('static element IDs are not duplicated in application source', () => {
  const ids = [...source.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length, `duplicate static IDs: ${ids.filter((id, index) => ids.indexOf(id) !== index).join(', ')}`);
});

test('routes remain driven by the four sample categories and articles', () => {
  assert.equal(categories.length, 4);
  assert.equal(articles.length, 4);
  assert.ok(read('src/app/sitemap.ts').includes('getSitePaths(categories, articles)'));
  assert.doesNotMatch(read('src/app/sitemap.ts'), /getAllKeywords|getTopKeywords/);
});
