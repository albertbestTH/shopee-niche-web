import assert from 'node:assert/strict';
import test from 'node:test';
import { articles, categories } from '../src/data/site.ts';
import { getRobotsConfig, getSitePaths, staticSitePaths } from '../src/lib/site-routes.ts';
import { absoluteUrl, resolveSiteUrl } from '../src/lib/site-url.ts';

test('site URL normalization and validation', () => {
  assert.equal(resolveSiteUrl('https://shop.example.test/', 'production').origin, 'https://shop.example.test');
  assert.equal(resolveSiteUrl(undefined, 'development').origin, 'http://localhost:3000');
  assert.throws(() => resolveSiteUrl(undefined, 'production'), /required outside development/);
  assert.throws(() => resolveSiteUrl('not-a-url', 'production'), /valid absolute URL/);
  assert.throws(() => resolveSiteUrl('https://shop.example.test/path', 'production'), /only an origin/);
});

test('canonical URL generation uses configured origin', () => {
  const previousUrl = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = 'https://shop.example.test';
  try {
    assert.equal(absoluteUrl('/category/it'), 'https://shop.example.test/category/it');
  } finally {
    if (previousUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousUrl;
  }
});

test('category and article data relationships are valid', () => {
  const categorySlugs = categories.map(({ slug }) => slug);
  const articleSlugs = articles.map(({ slug }) => slug);
  assert.equal(new Set(categorySlugs).size, categorySlugs.length);
  assert.equal(new Set(articleSlugs).size, articleSlugs.length);
  for (const article of articles) assert.ok(categorySlugs.includes(article.category), `${article.slug} has an unknown category`);
});

test('sitemap paths cover real routes without duplicates or placeholders', () => {
  const paths = getSitePaths(categories, articles);
  for (const requiredPath of staticSitePaths) assert.ok(paths.includes(requiredPath));
  for (const { slug } of categories) assert.ok(paths.includes(`/category/${slug}`));
  for (const { slug } of articles) assert.ok(paths.includes(`/article/${slug}`));
  assert.equal(new Set(paths).size, paths.length);
  assert.ok(paths.every((path) => !path.includes('#')));
  const productionUrls = paths.map((path) => new URL(path, 'https://shop.example.test').toString());
  assert.ok(productionUrls.every((url) => !url.includes('example.com')));
});

test('robots references the configured sitemap', () => {
  const config = getRobotsConfig(new URL('https://shop.example.test'));
  assert.equal(config.host, 'https://shop.example.test');
  assert.equal(config.sitemap, 'https://shop.example.test/sitemap.xml');
});
