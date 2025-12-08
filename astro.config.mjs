import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://geminigems.netlify.app',
  base: '/',
  output: 'static',
  integrations: [tailwind()]
});
