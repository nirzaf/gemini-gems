function geminiGems() {
    return {
        searchQuery: '',
        selectedCategory: 'all',
        showToast: false,
        toastMessage: '',
        showPreview: false,
        selectedGem: null,
        gemContent: '',
        parsedContent: '',
        loadingContent: false,
        errorMessage: '',
        
        gems: [
            {
                id: 'grammar-teacher',
                name: 'Grammar Teacher',
                description: 'A friendly and engaging grammar tutor for Grade 3 students. Conducts interactive quizzes, adapts to learning pace, and generates creative themed lessons.',
                category: 'Education',
                icon: 'book-open',
                color: 'bg-blue-500',
                file: 'grammar-teacher.md',
                features: [
                    'Interactive grammar quizzes',
                    'Adaptive learning pace',
                    'Creative themed lessons',
                    '42 structured lessons',
                    'Fantasy and adventure themes'
                ]
            },
            {
                id: 'language-teacher',
                name: 'Language Teacher',
                description: 'An expert AI language teacher providing personalized lessons, interactive exercises, and constructive feedback for learning new languages.',
                category: 'Education',
                icon: 'globe',
                color: 'bg-green-500',
                file: 'language-teacher.md',
                features: [
                    'Personalized lesson plans',
                    'Interactive exercises',
                    'Cultural insights',
                    'Progress tracking',
                    'Conversational practice'
                ]
            },
            {
                id: 'programming-copilot',
                name: 'Programming Co-pilot',
                description: 'An expert AI programming assistant helping with code review, debugging, best practices, and strategic guidance for developers.',
                category: 'Development',
                icon: 'code',
                color: 'bg-purple-500',
                file: 'programming-co-pilot.md',
                features: [
                    'Code review and debugging',
                    'Best practices guidance',
                    'Multi-language support',
                    'Step-by-step explanations',
                    'Security-focused advice'
                ]
            },
            {
                id: 'system-architect',
                name: 'System Architect',
                description: 'Transforms high-level project ideas into comprehensive structured project requirements and guidelines documents.',
                category: 'Development',
                icon: 'building',
                color: 'bg-indigo-500',
                file: 'system-architect.md',
                features: [
                    'Project requirements analysis',
                    'Technical architecture planning',
                    'Scope definition',
                    'Risk assessment',
                    'Technology recommendations'
                ]
            },
            {
                id: 'task-breakdown-manager',
                name: 'Task Breakdown Manager',
                description: 'Breaks down complex projects into manageable user stories formatted for AI coding agents and developers.',
                category: 'Development',
                icon: 'list-checks',
                color: 'bg-cyan-500',
                file: 'task-breakdown-manager.md',
                features: [
                    'User story formatting',
                    'Task dependency mapping',
                    'Priority and complexity assessment',
                    'AI-agent friendly structure',
                    'Sprint planning support'
                ]
            },
            {
                id: 'github-branch-generator',
                name: 'GitHub Branch Name Generator',
                description: 'Generates standardized and meaningful GitHub branch names based on user story titles and numbers.',
                category: 'Development',
                icon: 'git-branch',
                color: 'bg-orange-500',
                file: 'github-branch-name-generator.md',
                features: [
                    'Standardized naming conventions',
                    'User story integration',
                    'Date formatting',
                    'Alternative suggestions',
                    'Best practices compliance'
                ]
            },
            {
                id: 'professional-email-crafter',
                name: 'Professional Email Crafter',
                description: 'Crafts professional and effective emails for various business situations with proper tone and structure.',
                category: 'Business',
                icon: 'mail',
                color: 'bg-red-500',
                file: 'professional-email-crafter.md',
                features: [
                    'Professional tone adaptation',
                    'Structured email format',
                    'Follow-up suggestions',
                    'Action-oriented content',
                    'Multiple business scenarios'
                ]
            },
            {
                id: 'marketing-strategist',
                name: 'Marketing Strategist',
                description: 'Creates comprehensive marketing strategies from basic ideas, including audience analysis and channel recommendations.',
                category: 'Business',
                icon: 'trending-up',
                color: 'bg-pink-500',
                file: 'marketing-strategist.md',
                features: [
                    'Market analysis',
                    'Target audience definition',
                    'Channel strategy',
                    'Budget allocation',
                    'SMART objectives'
                ]
            },
            {
                id: 'storyteller-novelist',
                name: 'Storyteller/Novelist',
                description: 'Helps create compelling stories, develop rich characters, and write engaging narratives across various genres.',
                category: 'Creative',
                icon: 'feather',
                color: 'bg-amber-500',
                file: 'storyteller-novelist.md',
                features: [
                    'Character development',
                    'Plot structure guidance',
                    'World-building assistance',
                    'Writing style improvement',
                    'Genre-specific advice'
                ]
            },
            {
                id: 'dua-generator',
                name: 'Dua Generator',
                description: 'Provides authentic Islamic prayers (duas) for various occasions, suitable for sharing via messaging platforms.',
                category: 'Spiritual',
                icon: 'heart',
                color: 'bg-emerald-500',
                file: 'dua-generator.md',
                features: [
                    'Authentic Quran & Hadith sources',
                    'WhatsApp-ready format',
                    'Occasion-specific prayers',
                    'Arabic with translations',
                    'Cultural sensitivity'
                ]
            },
            {
                id: 'diy-tinkerer',
                name: 'DIY Tinkerer (Fix-It Felix)',
                description: 'Expert AI for DIY home repair and improvement projects. Guides users through step-by-step repairs with safety protocols and tool recommendations.',
                category: 'Lifestyle',
                icon: 'wrench',
                color: 'bg-orange-500',
                file: 'diy-tinkerer.md',
                features: [
                    'Step-by-step repair guides',
                    'Safety-first approach',
                    'Tool and materials lists',
                    'Problem diagnosis from descriptions',
                    'Professional vs DIY guidance'
                ]
            },
            {
                id: 'personal-finance-navigator',
                name: 'Personal Finance Navigator (CoinWise)',
                description: 'Personal finance and investment educator that helps create budgets, understand financial products, and develop investment strategies.',
                category: 'Finance',
                icon: 'piggy-bank',
                color: 'bg-green-600',
                file: 'personal-finance-navigator.md',
                features: [
                    'Budget creation and planning',
                    'Investment education',
                    'Risk tolerance assessment',
                    'Retirement planning guidance',
                    'Financial literacy focus'
                ]
            },
            {
                id: 'gameforge-master',
                name: 'GameForge Master',
                description: 'AI assistant for tabletop RPG and video game design. Helps brainstorm mechanics, design characters, and build compelling game worlds.',
                category: 'Creative',
                icon: 'dice-6',
                color: 'bg-purple-600',
                file: 'gameforge-master.md',
                features: [
                    'Game mechanics design',
                    'Character and world building',
                    'Balance and playtesting guidance',
                    'Narrative integration',
                    'TTRPG and video game support'
                ]
            },
            {
                id: 'sous-chef',
                name: 'Sous Chef (Chef Gusteau)',
                description: 'Culinary assistant that creates recipes from available ingredients, scales portions, and provides cooking techniques and substitutions.',
                category: 'Lifestyle',
                icon: 'chef-hat',
                color: 'bg-red-500',
                file: 'sous-chef.md',
                features: [
                    'Pantry-to-plate cooking',
                    'Real-time recipe adaptation',
                    'Dietary restriction substitutions',
                    'Cooking technique education',
                    'Ingredient optimization'
                ]
            },
            {
                id: 'wellness-mindfulness-coach',
                name: 'Wellness & Mindfulness Coach (Serene)',
                description: 'Mindfulness and mental wellness coach providing meditation exercises, breathing techniques, and stress management strategies.',
                category: 'Wellness',
                icon: 'heart-pulse',
                color: 'bg-teal-500',
                file: 'wellness-mindfulness-coach.md',
                features: [
                    'Personalized meditation guidance',
                    'Stress management techniques',
                    'Emotional regulation support',
                    'Breathing exercises',
                    'Mindfulness integration'
                ]
            }
        ],
        
        get categories() {
            return [...new Set(this.gems.map(gem => gem.category))].sort();
        },
        
        get filteredGems() {
            let filtered = this.gems;
            
            // Filter by category
            if (this.selectedCategory !== 'all') {
                filtered = filtered.filter(gem => gem.category === this.selectedCategory);
            }
            
            // Filter by search query
            if (this.searchQuery.trim()) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(gem => 
                    gem.name.toLowerCase().includes(query) ||
                    gem.description.toLowerCase().includes(query) ||
                    gem.category.toLowerCase().includes(query) ||
                    gem.features.some(feature => feature.toLowerCase().includes(query))
                );
            }
            
            return filtered;
        },
        
        getCategoryColor(category) {
            const colors = {
                'Education': 'bg-blue-100 text-blue-800 border-blue-200',
                'Development': 'bg-purple-100 text-purple-800 border-purple-200',
                'Business': 'bg-green-100 text-green-800 border-green-200',
                'Creative': 'bg-amber-100 text-amber-800 border-amber-200',
                'Spiritual': 'bg-emerald-100 text-emerald-800 border-emerald-200',
                'Lifestyle': 'bg-orange-100 text-orange-800 border-orange-200',
                'Finance': 'bg-green-100 text-green-800 border-green-200',
                'Wellness': 'bg-teal-100 text-teal-800 border-teal-200'
            };
            return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
        },
        
        getCategoryIcon(category) {
            const icons = {
                'Education': 'graduation-cap',
                'Development': 'code-2',
                'Business': 'briefcase',
                'Creative': 'palette',
                'Spiritual': 'heart',
                'Lifestyle': 'home',
                'Finance': 'dollar-sign',
                'Wellness': 'heart-pulse'
            };
            return icons[category] || 'tag';
        },
        
        copyToClipboard(filename) {
            navigator.clipboard.writeText(filename).then(() => {
                this.showToastMessage('File path copied to clipboard!');
            }).catch(() => {
                this.showToastMessage('Failed to copy to clipboard');
            });
        },
        
        showToastMessage(message) {
            this.toastMessage = message;
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;
            }, 3000);
        },
        
        async previewGem(gem) {
            this.selectedGem = gem;
            this.gemContent = '';
            this.parsedContent = '';
            this.loadingContent = true;
            this.errorMessage = '';
            this.showPreview = true;

            try {
                // First try to load from local file system using file:// protocol
                const localPath = window.location.origin + window.location.pathname.replace('index.html', '') + gem.file;
                let response = await fetch(localPath);

                if (!response.ok) {
                    // If local fetch fails, try relative path
                    response = await fetch(gem.file);
                }

                if (!response.ok) {
                    // If both fail, try GitHub raw URL as last resort
                    const githubUrl = `https://raw.githubusercontent.com/nirzaf/gemini-gems/main/${gem.file}`;
                    response = await fetch(githubUrl);
                }

                if (response.ok) {
                    this.gemContent = await response.text();
                    // Parse markdown to HTML
                    this.parsedContent = marked.parse(this.gemContent);
                    this.loadingContent = false;
                } else {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
            } catch (error) {
                console.error('Error loading gem content:', error);
                this.loadingContent = false;

                // Try to load content using a different approach for local files
                await this.loadLocalFile(gem);
            }
        },

        async loadLocalFile(gem) {
            try {
                // For local development, we'll use a file input approach
                // This is a workaround for CORS restrictions
                const fileContent = await this.readLocalMarkdownFile(gem.file);
                if (fileContent) {
                    this.gemContent = fileContent;
                    this.parsedContent = marked.parse(fileContent);
                    return;
                }
            } catch (error) {
                console.error('Local file loading failed:', error);
            }

            // If all methods fail, show error with instructions
            this.errorMessage = `To preview complete markdown content, please run a local server. Click "Setup Guide" below for instructions.`;
            this.showInstructionsContent(gem);
        },

        async readLocalMarkdownFile(filename) {
            // This is a placeholder for local file reading
            // In a real scenario, you'd need a local server or different approach
            return null;
        },

        showInstructionsContent(gem) {
            const instructionsContent = `# ${gem.name}

**Category:** ${gem.category}

## Description
${gem.description}

## Key Features
${gem.features.map(feature => `- ${feature}`).join('\n')}

## 📁 Access Complete Content

Due to browser security restrictions, the full markdown content cannot be displayed in preview mode when running locally.

### To access the complete gem content:

1. **Download Method:**
   - Click the "Download File" button below
   - Open the downloaded \`${gem.file}\` file in any text editor
   - Copy the entire content

2. **GitHub Method:**
   - Visit: [${gem.file} on GitHub](https://github.com/nirzaf/gemini-gems/blob/main/${gem.file})
   - Click the "Raw" button to view the plain text
   - Copy the entire content

3. **Local Server Method:**
   - Run a local web server (e.g., \`python -m http.server\` or \`npx serve\`)
   - Access the page through \`http://localhost\` instead of \`file://\`

## How to Use the Gem
1. Copy the complete markdown content from the gem file
2. Paste it into your Gemini conversation as a system prompt
3. Start using your specialized AI assistant!

---
*This gem is part of the Gemini Gems collection - specialized AI personas for Google's Gemini models.*`;

            this.gemContent = instructionsContent;
            this.parsedContent = marked.parse(instructionsContent);
        },
        
        copyGemContent() {
            if (this.gemContent) {
                navigator.clipboard.writeText(this.gemContent).then(() => {
                    this.showToastMessage('Gem content copied to clipboard!');
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = this.gemContent;
                    document.body.appendChild(textArea);
                    textArea.select();
                    try {
                        document.execCommand('copy');
                        this.showToastMessage('Gem content copied to clipboard!');
                    } catch (err) {
                        this.showToastMessage('Failed to copy content to clipboard');
                    }
                    document.body.removeChild(textArea);
                });
            } else {
                this.showToastMessage('No content to copy');
            }
        },
        
        isRunningOnServer() {
            return window.location.protocol === 'http:' || window.location.protocol === 'https:';
        },

        init() {
            // Initialize Lucide icons
            lucide.createIcons();

            // Add fade-in animation to elements
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach(el => {
                    el.classList.add('animate-fade-in');
                });
            }, 100);

            // Show a helpful message if not running on server
            if (!this.isRunningOnServer()) {
                console.log('💡 Tip: For full markdown preview functionality, run a local server. See SERVER_SETUP.md for instructions.');
            }
        }
    }
}
