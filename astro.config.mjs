// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// production = npm run build (Cloudflare Pages + local builds)
// development = astro dev (local dev server with Keystatic admin)
const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  site: 'https://omrminiatures.eu',
  output: isProd ? 'static' : 'server',
  adapter: isProd ? undefined : cloudflare(),
  integrations: [
    sitemap(),
    ...(!isProd ? [keystatic()] : []),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
