// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://6922e2331769ef9a806b.appwrite.network',
  base: '/',
  output: 'static',
  integrations: [tailwind()]
});