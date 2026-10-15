import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// index.html keeps crawlable markup for AI crawlers that do not run JS. It has
// to live in <noscript> and NOT inside #root: markup inside #root paints while
// the bundle loads, which real visitors saw as a flash of unstyled content.
describe('crawlable fallback', () => {
  const html = readFileSync(resolve(__dirname, '../../index.html'), 'utf8');

  it('leaves #root empty so nothing paints before React mounts', () => {
    expect(html).toMatch(/<div id="root"><\/div>/);
  });

  it('keeps the crawlable copy inside noscript', () => {
    const noscript = html.match(/<noscript>([\s\S]*?)<\/noscript>/);
    expect(noscript).not.toBeNull();
    expect(noscript![1]).toContain('Senior Backend Engineer');
    expect(noscript![1]).toContain('hello@iamajhere.com');
  });
});
