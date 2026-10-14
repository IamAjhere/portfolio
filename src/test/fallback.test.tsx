import { describe, it, expect } from 'vitest';
import { createRoot } from 'react-dom/client';
import { act } from 'react';

// index.html keeps crawlable markup inside #root for AI crawlers. React must
// replace it on mount, or real visitors would see it flash or stack up.
describe('crawlable fallback', () => {
  it('is replaced when React mounts', async () => {
    const host = document.createElement('div');
    host.id = 'root';
    host.innerHTML = '<main><h1>FALLBACK</h1></main>';
    document.body.appendChild(host);

    expect(host.textContent).toContain('FALLBACK');

    await act(async () => {
      createRoot(host).render(<div>APP</div>);
    });

    expect(host.textContent).not.toContain('FALLBACK');
    expect(host.textContent).toBe('APP');
  });
});
