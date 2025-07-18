function geminiGems() {
    return {
        searchQuery: '',
        selectedCategory: 'all',
        showToast: false,
        toastMessage: '',
        showPreview: false,
        selectedGem: null,
        gemContent: '',
        
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
                'Spiritual': 'bg-emerald-100 text-emerald-800 border-emerald-200'
            };
            return colors[category] || 'bg-gray-100 text-gray-800 border-gray-200';
        },
        
        getCategoryIcon(category) {
            const icons = {
                'Education': 'graduation-cap',
                'Development': 'code-2',
                'Business': 'briefcase',
                'Creative': 'palette',
                'Spiritual': 'heart'
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
            this.showPreview = true;
            
            try {
                const response = await fetch(gem.file);
                if (response.ok) {
                    this.gemContent = await response.text();
                } else {
                    this.gemContent = 'Error loading gem content. Please try downloading the file directly.';
                }
            } catch (error) {
                this.gemContent = 'Error loading gem content. Please check your internet connection and try again.';
            }
        },
        
        copyGemContent() {
            if (this.gemContent) {
                navigator.clipboard.writeText(this.gemContent).then(() => {
                    this.showToastMessage('Gem content copied to clipboard!');
                }).catch(() => {
                    this.showToastMessage('Failed to copy content to clipboard');
                });
            }
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
        }
    }
}
