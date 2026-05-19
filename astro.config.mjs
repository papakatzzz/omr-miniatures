// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import cloudflare from '@astrojs/cloudflare';

// CF_PAGES=1 is injected automatically by Cloudflare Pages CI
const isCloudflarePages = !!process.env.CF_PAGES;

export default defineConfig({
  site: 'https://omrminiatures.eu',
  output: isCloudflarePages ? 'static' : 'server',
  adapter: isCloudflarePages ? undefined : cloudflare(),
  integrations: [
    sitemap(),
    ...(!isCloudflarePages ? [keystatic()] : []),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es', 'it'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
