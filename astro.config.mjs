import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://nirzaf.github.io',
  base: '/gemini-gems',
  output: 'static',
  integrations: [tailwind()]
});
