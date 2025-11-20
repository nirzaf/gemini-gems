# Gemini Gems - Deployment Guide

## 📦 Project Structure

The project has been restructured for GitHub Pages deployment:

```
gemini-gems/
├── src/                    # Astro source files
│   ├── components/        # Reusable components
│   ├── content/gems/      # Gem markdown files with frontmatter
│   ├── layouts/           # Page layouts
│   ├── pages/             # Routes
│   └── styles/            # Global styles
├── legacy/                # Old Alpine.js implementation
├── .github/workflows/     # GitHub Actions deployment
├── dist/                  # Build output (generated)
└── astro.config.mjs       # Astro configuration

```

## 🚀 Deployment to Custom Domain

### Automatic Deployment

The site automatically deploys when you push to the `main` branch.

**Workflow:** `.github/workflows/deploy.yml`

### Deployment Steps

1. **Configure Custom Domain**:
   - Go to repository Settings → Pages
   - Source: GitHub Actions
   - Custom domain: `dotnetevangelist.net`
   - Enforce HTTPS: ✅ Enabled
   - Save

2. **DNS Configuration** (if not already done):
   - Add CNAME record pointing to `nirzaf.github.io`
   - Or add A records for GitHub Pages IPs

3. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

4. **Monitor deployment**:
   - Go to Actions tab in GitHub
   - Watch the "Deploy to GitHub Pages" workflow

5. **Access your site**:
   - URL: `https://dotnetevangelist.net/`

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ New Features

### Copy Button on Cards
- Click "Copy" button on any gem card to copy the full markdown content
- No need to open the detail page
- Visual feedback with "Copied!" message

### Project Structure
- Old Alpine.js files moved to `legacy/` folder
- Astro project now in root directory
- Cleaner repository structure

## 📝 Configuration

### Astro Config (`astro.config.mjs`)
```javascript
export default defineConfig({
  site: 'https://dotnetevangelist.net',
  output: 'static',
  vite: {
    plugins: [tailwindcss()]
  }
});
```

**Note:** No `base` path needed since the site is deployed at the root of the domain.

### GitHub Actions Workflow
- Triggers on push to `main` branch
- Builds Astro site
- Deploys to GitHub Pages
- Uses Node.js 20

## 🔧 Troubleshooting

### Build Fails
- Check that all dependencies are installed: `npm install`
- Verify Tailwind CSS v4 is installed: `npm list tailwindcss`
- Check build logs in GitHub Actions

### Pages Not Loading
- Verify GitHub Pages is enabled in repository settings
- Check that base path is correct in `astro.config.mjs`
- Ensure workflow has completed successfully

### Copy Button Not Working
- Check browser console for errors
- Verify markdown files exist in the repository
- Test with different browsers

## 📊 Build Output

Successful build generates:
- 18 static HTML pages (1 homepage + 17 gem detail pages)
- Optimized CSS and JavaScript
- All assets in `dist/` folder

Build time: ~8-10 seconds
