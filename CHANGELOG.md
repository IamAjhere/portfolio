# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-18

### Changed
- Upgraded React 18 → 19.2, TypeScript 4.9 → 5.9, Vite 4 → 6.4, Tailwind CSS 3 → 4.3
- Upgraded three.js → 0.185, @react-three/fiber → 9, @react-three/drei → 10
- Upgraded axios → 1.18 (patches known CVEs in 1.3.x)
- Migrated Tailwind config to v4 CSS-based setup (`@import "tailwindcss"`, `@tailwindcss/postcss`); removed `tailwind.config.js`
- Migrated `vite.config.js` → `vite.config.ts`
- Rewrote `functions/leetCode.js` with early returns, optional chaining, and consistent JSON response headers
- Replaced per-element cursor listeners with delegated `mouseover`/`mouseout` handling in `CustomCursor`
- Modernized components to plain typed function components (dropped legacy `React.FC` / `import React`)

### Added
- Error state in `App` — fetch failures now show a message instead of an infinite loading spinner
- Security headers in `netlify.toml` (CSP, frame-ancestors, and related hardening)
- `referrerpolicy="no-referrer"` on the CDN stylesheet link in `index.html`

### Removed
- Unused `src/components/3D/Text.tsx`

### Fixed
- Loading spinner spinning forever when portfolio data failed to load
