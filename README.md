# Gemini Gems 💎

**Transform Google's Gemini into Specialized Expert Assistants**

A curated collection of expertly crafted AI prompt templates ("Gems") that transform Google's Gemini into specialized expert assistants across multiple domains. Each gem is a structured system prompt designed to provide domain-specific expertise with defined personas, workflows, and output formats.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Dependencies](#-dependencies)
- [Project Structure](#-project-structure)
- [Content Architecture](#-content-architecture)
- [Assets Inventory](#-assets-inventory)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Deployment](#-deployment)
- [Available Gems](#-available-gems)
- [Contributing](#-contributing)

---

## 🎯 PROJECT OVERVIEW

### Project Identity

- **Project Name:** Gemini Gems
- **Tagline:** Transform Google's Gemini into Specialized Expert Assistants
- **Version:** 0.0.1
- **Current Status:** Production (Active Development)

### Project Domain

- **Industry/Sector:** Artificial Intelligence / Developer Tools
- **Sub-domain:** AI Prompt Engineering, Knowledge Management, Productivity Tools
- **Target Market:** Global
- **Business Model:** Open Source (100% Free)

### Project Type

- **Type:** Static Web Application
- **Architecture:** JAMstack (JavaScript, APIs, Markup)
- **Deployment:** Static Site Generation (SSG)

### Purpose & Value Proposition

Gemini Gems addresses the challenge of getting consistent, expert-level responses from AI assistants by providing pre-configured, specialized prompt templates. Instead of crafting complex prompts for each use case, users can instantly transform Gemini into domain experts ranging from code reviewers to wellness coaches.

The project serves developers, educators, content creators, and professionals who need reliable, structured AI assistance across multiple disciplines. Each gem is meticulously designed with clear personas, systematic workflows, and standardized output formats to ensure predictable, high-quality results.

By open-sourcing these templates, Gemini Gems democratizes access to advanced prompt engineering techniques, enabling anyone to leverage AI expertise without deep technical knowledge of prompt design.

---

## 🛠 TECHNOLOGY STACK

### Frontend

- **Framework:** Astro 5.15.9 (Static Site Generator)
- **Language:** TypeScript (with strict mode)
- **Styling:** Tailwind CSS 3.4.18
- **UI Icons:** 
  - Lucide Astro 0.554.0 (Modern icon components)
  - Font Awesome 6.4.0 (Category icons)
- **Build Tool:** Vite (integrated with Astro)
- **Content Management:** Astro Content Collections (Type-safe markdown processing)

### Backend

- **Architecture:** 100% Static (No backend server)
- **API Type:** None (Client-side only)
- **Content Delivery:** Raw GitHub content for markdown files

### Cloud & Infrastructure

- **Hosting Platform:** GitHub Pages
- **Custom Domain:** dotnetevangelist.net
- **Base Path:** /gemini-gems
- **CDN:** GitHub's built-in CDN
- **SSL/TLS:** Automatic HTTPS via GitHub Pages

### DevOps & CI/CD

- **Version Control:** Git / GitHub
- **CI/CD Pipeline:** GitHub Actions
- **Workflow File:** `.github/workflows/deploy.yml`
- **Deployment Trigger:** Push to `main` branch or manual dispatch
- **Bun Version:** 1.3.x
- **Package Manager:** Bun

---

## 📦 DEPENDENCIES

### Core Dependencies

```json
{
  "astro": "^5.15.9",
  "lucide-astro": "^0.554.0"
}
```

**Dependency Descriptions:**

- **astro (v5.15.9)** - Modern static site generator with TypeScript support, content collections, and optimized build output. Provides SSG capabilities, file-based routing, and component islands architecture.

- **lucide-astro (v0.554.0)** - Icon library with 1000+ consistent, customizable SVG icons optimized for Astro components. Used for UI elements like Copy, Download, and Eye icons.

### Development Dependencies

```json
{
  "@astrojs/tailwind": "^6.0.2",
  "tailwindcss": "^3.4.18"
}
```

**Development Dependency Descriptions:**

- **@astrojs/tailwind (v6.0.2)** - Official Astro integration for Tailwind CSS with automatic configuration and optimization.

- **tailwindcss (v3.4.18)** - Utility-first CSS framework for rapid UI development with dark mode support and responsive design utilities.

### Third-Party CDN Resources

- **Font Awesome 6.4.0** - Loaded via CDN for category icons (graduation cap, code, briefcase, etc.)

### Dependency Management Notes

- **Package Manager:** Bun (with `bun.lock` for version locking)
- **Lock File:** bun.lock
- **Runtime Requirement:** Bun 1.3.x
- **Installation Command:** `bun install`
- **No Known Conflicts:** All dependencies are compatible and regularly updated

---

## 📁 PROJECT STRUCTURE

```
gemini-gems/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment workflow
├── src/
│   ├── components/                 # Reusable Astro components
│   │   ├── Footer.astro           # Site footer with links and branding
│   │   ├── GemCard.astro          # Gem display card with copy/preview actions
│   │   ├── Header.astro           # Site header with navigation and theme toggle
│   │   └── SearchFilter.astro     # Search and category filter component
│   ├── content/                    # Content collections
│   │   ├── gems/                  # Gem markdown files (21 files)
│   │   │   ├── code-review-architect.md
│   │   │   ├── codebase-forensics.md
│   │   │   ├── documentation-architect.md
│   │   │   ├── diy-tinkerer.md
│   │   │   ├── dua-generator.md
│   │   │   ├── gameforge-master.md
│   │   │   ├── gem-creator.md
│   │   │   ├── github-branch-name-generator.md
│   │   │   ├── grammar-teacher.md
│   │   │   ├── language-teacher.md
│   │   │   ├── marketing-strategist.md
│   │   │   ├── personal-finance-navigator.md
│   │   │   ├── professional-email-crafter.md
│   │   │   ├── programming-co-pilot.md
│   │   │   ├── promptsmith.md
│   │   │   ├── readme-architect.md
│   │   │   ├── sous-chef.md
│   │   │   ├── storyteller-novelist.md
│   │   │   ├── system-architect.md
│   │   │   ├── task-breakdown-manager.md
│   │   │   └── wellness-mindfulness-coach.md
│   │   └── config.ts              # Content collection schema definition
│   ├── layouts/
│   │   └── Layout.astro           # Base layout with SEO meta tags
│   ├── pages/
│   │   ├── gems/
│   │   │   └── [...slug].astro    # Dynamic gem detail pages
│   │   └── index.astro            # Homepage with gem grid
│   ├── scripts/                    # JavaScript utilities (empty)
│   └── styles/
│       └── global.css             # Global styles and custom CSS
├── public/
│   └── favicon.svg                # Site favicon
├── legacy/                         # Old Alpine.js implementation (archived)
│   ├── assets/
│   ├── index.html
│   └── [all old gem files].md
├── .gitignore                      # Git ignore rules
├── .nojekyll                       # Disable Jekyll processing on GitHub Pages
├── astro.config.mjs                # Astro configuration
├── CODE_OF_CONDUCT.md              # Community guidelines
├── DEPLOYMENT.md                   # Deployment documentation
├── migrate.js                      # Migration script for content restructuring
├── package.json                    # Project dependencies and scripts
├── bun.lock                        # Locked dependency versions (Bun)
├── README.md                       # This file
├── tailwind.config.mjs             # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

### Architecture Patterns

- **Design Pattern:** Component-Based Architecture with Content Collections
- **Code Organization:** Feature-based (components, content, layouts, pages)
- **Content Strategy:** Markdown-driven with YAML frontmatter
- **Routing:** File-based routing with dynamic slug-based gem pages

### Key Directories Explained

#### `src/components/`
Reusable Astro components that make up the UI:
- **GemCard.astro:** Displays gem preview cards with title, description, features, category badge, and action buttons (Preview, Download, Copy)
- **SearchFilter.astro:** Client-side search and category filtering with live gem count
- **Header.astro:** Navigation header with theme toggle and site branding
- **Footer.astro:** Site footer with links, social media, and attribution

#### `src/content/gems/`
Markdown files containing gem prompts with structured frontmatter:
- Each file defines a specialized AI persona
- Frontmatter includes: title, description, category, icon, color, features, lastUpdated
- Content contains the full system prompt with instructions, workflows, and examples

#### `src/content/config.ts`
Defines the schema for content collections using Zod validation:
- Ensures type safety for gem metadata
- Validates required fields (title, description, category, icon, color, features)
- Optional lastUpdated field for sorting

#### `src/pages/`
File-based routing structure:
- **index.astro:** Homepage with stats, search/filter, and gem grid
- **gems/[...slug].astro:** Dynamic routes for individual gem detail pages

#### `legacy/`
Archived Alpine.js implementation (pre-Astro migration):
- Preserved for reference and rollback capability
- Contains original vanilla HTML/CSS/JS implementation

---

## 📝 CONTENT ARCHITECTURE

### Content Types

#### Gems (Primary Content Entity)

Each gem is a markdown file with YAML frontmatter:

**Frontmatter Schema:**
```yaml
title: string           # Gem display name
description: string     # Brief summary of gem's purpose
category: string        # One of 8 categories
icon: string            # Lucide icon name
color: string           # Tailwind bg-* class for theming
features: string[]      # Array of key features (3-5 items)
lastUpdated: date       # Optional ISO date for sorting
```

**Content Body:**
- Full system prompt in markdown format
- Structured sections with instructions, workflows, examples
- Code blocks, lists, tables for clarity

**Relationships:**
- Each gem belongs to exactly one category
- Categories are derived dynamically from gem metadata

### Categories

The system currently supports **8 categories**:

1. **Education** - Teaching, tutoring, and learning assistance
2. **Development** - Programming, code review, architecture
3. **Business** - Marketing, strategy, professional communication
4. **Creative** - Writing, storytelling, game design
5. **Spiritual** - Mindfulness, wellness, religious content
6. **Lifestyle** - DIY, cooking, home management
7. **Finance** - Personal finance, budgeting, investment guidance
8. **Wellness** - Health, mindfulness, mental well-being

**Category Metadata:**
- Each category has an associated Font Awesome icon
- Icons mapped in `GemCard.astro` component
- Categories are automatically extracted and sorted on homepage

### Content Management

- **CMS:** File-based (markdown files in Git repository)
- **Content Editing:** Direct file editing or Git workflows
- **Content Validation:** Zod schema validation via Astro Content Collections
- **Localization:** Currently English only (i18n ready via Astro)
- **Media Management:** No images/videos in gems (text-only prompts)
- **SEO Strategy:**
  - Meta tags in Layout.astro
  - Semantic HTML structure
  - Open Graph tags for social sharing
  - Descriptive page titles and descriptions

### Content Distribution

- **Raw Markdown Access:** Direct links to GitHub raw content
- **Copy to Clipboard:** One-click copy functionality on cards
- **Download:** Direct download links to markdown files
- **Preview:** Rendered markdown on detail pages

---

## 🎨 ASSETS INVENTORY

### Icons

#### Lucide Icons (Component-based)
- **Total Count:** 3 actively used
- **Format:** Astro components (SVG)
- **Usage:**
  - `Eye` - Preview button icon
  - `Download` - Download button icon
  - `Copy` - Copy to clipboard icon
- **Loading Strategy:** Tree-shaken, only imported icons bundled
- **Location:** Imported from `lucide-astro` package

#### Font Awesome Icons (CDN)
- **Total Count:** 8 category icons
- **Format:** Icon font (web font)
- **Version:** 6.4.0
- **Loading Strategy:** CDN link in GemCard.astro
- **Icons Used:**
  - `fa-graduation-cap` - Education
  - `fa-code` - Development
  - `fa-briefcase` - Business
  - `fa-palette` - Creative
  - `fa-heart` - Spiritual
  - `fa-home` - Lifestyle
  - `fa-dollar-sign` - Finance
  - `fa-heartbeat` - Wellness

### Images

- **Total Count:** 1
- **Files:**
  - `public/favicon.svg` (0.7KB) - Site favicon
- **Formats:** SVG (vector graphics)
- **Optimization:** None required (SVG is already optimized)

### Fonts

- **Font Families:** System font stack (no custom fonts)
- **Strategy:** Native OS fonts for performance
- **Fallback Chain:** 
  ```css
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 
               'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 
               'Open Sans', 'Helvetica Neue', sans-serif;
  ```

### Videos & Media

- **Count:** 0 (no videos or multimedia assets)

### Documents

- **Markdown Files:** 21 gem files (content)
- **Documentation:**
  - README.md (this file)
  - DEPLOYMENT.md (deployment guide)
  - CODE_OF_CONDUCT.md (community guidelines)

---

## 🚀 GETTING STARTED

### Prerequisites

- **Bun:** 1.3.x
- **Git:** For cloning and version control

### Installation

```bash
# Clone the repository
git clone https://github.com/nirzaf/gemini-gems.git

# Navigate to project directory
cd gemini-gems

# Install dependencies
bun install
```

### Development Server

```bash
# Start local development server
bun run dev
```

**Server Details:**
- **URL:** http://localhost:4321
- **Hot Reload:** ✅ Enabled (instant updates on file changes)
- **Port:** 4321 (default Astro port)

### Building for Production

```bash
# Build static site
bun run build
```

**Build Output:**
- **Directory:** `dist/`
- **Pages Generated:** 22+ static HTML files
  - 1 homepage (index.html)
  - 21 gem detail pages
- **Build Time:** ~8-10 seconds
- **Output Size:** Optimized and minified

### Preview Production Build

```bash
# Preview production build locally
bun run preview
```

---

## 💻 DEVELOPMENT WORKFLOW

### Commands Reference

| Command | Action |
|---------|--------|
| `bun install` | Install dependencies |
| `bun run dev` | Start dev server at localhost:4321 |
| `bun run build` | Build production site to ./dist/ |
| `bun run preview` | Preview production build locally |
| `bun run astro ...` | Run Astro CLI commands |
| `bunx astro -- --help` | Get Astro CLI help |

### Adding a New Gem

1. **Create markdown file** in `src/content/gems/`:
   ```bash
   # Example: my-new-gem.md
   ```

2. **Add frontmatter**:
   ```yaml
   ---
   title: "My New Gem"
   description: "Brief description of what this gem does"
   category: "Development"  # Choose from 8 categories
   icon: "code"             # Lucide icon name
   color: "bg-blue-600"     # Tailwind color class
   features:
     - "Feature 1"
     - "Feature 2"
     - "Feature 3"
   lastUpdated: 2025-11-20
   ---
   ```

3. **Write the prompt** in markdown below frontmatter

4. **Test locally**:
   ```bash
   npm run dev
   ```

5. **Verify the gem appears** on homepage and has a detail page

### File Naming Conventions

- **Gem files:** `kebab-case.md` (e.g., `code-review-architect.md`)
- **Component files:** `PascalCase.astro` (e.g., `GemCard.astro`)
- **Config files:** `lowercase.extension` (e.g., `astro.config.mjs`)

### Code Style

- **TypeScript:** Strict mode enabled
- **Formatting:** Prettier (if configured)
- **Linting:** ESLint (if configured)
- **Indent:** 2 spaces

---

## 🚢 DEPLOYMENT

### Automatic Deployment (Recommended)

The site automatically deploys to GitHub Pages when you push to the `main` branch.

**Workflow:**
1. Make changes locally
2. Commit changes:
   ```bash
   git add .
   git commit -m "Your commit message"
   ```
3. Push to main:
   ```bash
   git push origin main
   ```
4. GitHub Actions automatically builds and deploys
5. Monitor deployment in the **Actions** tab
6. Site updates in ~2-3 minutes

### GitHub Actions Workflow

**File:** `.github/workflows/deploy.yml`

**Trigger Events:**
- Push to `main` branch
- Manual workflow dispatch

**Build Steps:**
1. Checkout code
2. Setup Bun 1.3.x
3. Install dependencies with Bun
4. Build Astro site via `bunx astro`
5. Upload artifact
6. Deploy to GitHub Pages

**Permissions Required:**
- `contents: read`
- `pages: write`
- `id-token: write`

### Deployment Configuration

**File:** `astro.config.mjs`

```javascript
export default defineConfig({
  site: 'https://dotnetevangelist.net',
  base: '/gemini-gems',
  output: 'static',
  integrations: [tailwind()]
});
```

**Custom Domain Setup:**
1. Go to repository **Settings → Pages**
2. Set **Source:** GitHub Actions
3. Add **Custom domain:** dotnetevangelist.net
4. Enable **Enforce HTTPS**
5. Configure DNS (CNAME or A records)

### Production URLs

- **Primary:** https://dotnetevangelist.net/gemini-gems/
- **GitHub Pages:** https://nirzaf.github.io/gemini-gems/

### Build Optimization

- **SSG:** All pages pre-rendered at build time
- **Code Splitting:** Automatic via Vite
- **Asset Optimization:** Images, CSS, JS minified
- **Tree Shaking:** Unused code eliminated
- **CDN:** GitHub Pages CDN for global distribution

---

## 💎 AVAILABLE GEMS

### Development (6 Gems)
1. **Code Review Architect** - Deep code analysis with focus areas
2. **Codebase Forensics** - Codebase investigation and analysis
3. **Documentation Architect** - Technical documentation generation
4. **Programming Co-Pilot** - Pair programming assistant
5. **README Architect** - Comprehensive README generation
6. **System Architect** - Software architecture design

### Creative (3 Gems)
7. **GameForge Master** - Game design and development
8. **Gem Creator** - Create new Gemini Gems
9. **Storyteller Novelist** - Creative writing and storytelling

### Business (2 Gems)
10. **Marketing Strategist** - Marketing strategy and campaigns
11. **Professional Email Crafter** - Professional email composition

### Education (2 Gems)
12. **Grammar Teacher** - Grammar instruction and correction
13. **Language Teacher** - Language learning and tutoring

### Lifestyle (2 Gems)
14. **DIY Tinkerer** - DIY project guidance
15. **Sous Chef** - Cooking recipes and techniques

### Finance (1 Gem)
16. **Personal Finance Navigator** - Financial planning and advice

### Wellness (1 Gem)
17. **Wellness Mindfulness Coach** - Mindfulness and wellness guidance

### Spiritual (1 Gem)
18. **Dua Generator** - Islamic prayer composition

### Development Tools (3 Gems)
19. **GitHub Branch Name Generator** - Git branch naming
20. **PromptSmith** - Prompt engineering assistant
21. **Task Breakdown Manager** - Task decomposition and planning

**Total:** 21 Active Gems

---

## 🤝 CONTRIBUTING

Contributions are welcome! Here's how you can help:

### Ways to Contribute

1. **Add New Gems:** Create specialized prompts for new domains
2. **Improve Existing Gems:** Enhance prompt quality and clarity
3. **Fix Bugs:** Report and fix issues
4. **Documentation:** Improve guides and documentation
5. **UI/UX:** Enhance design and user experience

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-gem
   ```
3. **Make your changes**
4. **Test locally:**
   ```bash
   bun run dev
   bun run build
   ```
5. **Commit with clear messages:**
   ```bash
   git commit -m "Add: Amazing new gem for X"
   ```
6. **Push to your fork:**
   ```bash
   git push origin feature/amazing-gem
   ```
7. **Open a Pull Request**

### Code of Conduct

Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

---

## 📄 LICENSE

This project is open source and available under the MIT License.

---

## 🙏 ACKNOWLEDGMENTS

- **Astro Team** - For the amazing static site generator
- **Tailwind CSS** - For the utility-first CSS framework
- **Lucide** - For beautiful open-source icons
- **GitHub** - For hosting and CI/CD infrastructure
- **Community** - For contributions and feedback

---

## 📞 SUPPORT & CONTACT

- **Repository:** https://github.com/nirzaf/gemini-gems
- **Issues:** https://github.com/nirzaf/gemini-gems/issues
- **Website:** https://dotnetevangelist.net/gemini-gems/

---

**Built with ❤️ using Astro and Tailwind CSS**
