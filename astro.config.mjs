// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  site: 'https://geminigems.netlify.app',
  output: 'server', // Server mode to enable API routes
  adapter: netlify(),
  integrations: [tailwind()]
});
