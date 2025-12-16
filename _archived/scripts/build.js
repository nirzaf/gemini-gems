import { build } from 'astro';

console.log('Starting programmatic build...');
try {
  await build({
    root: process.cwd(),
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
