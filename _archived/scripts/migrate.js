// Migration script to add frontmatter to markdown files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Gem metadata from the original app.js
const gems = [
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
        id: 'gem-creator',
        name: 'Gem Creator (GemForge)',
        description: 'Expert AI assistant for creating high-quality Gemini Gems based on user-provided personas. Transforms role descriptions into comprehensive system prompts.',
        category: 'Development',
        icon: 'gem',
        color: 'bg-violet-500',
        file: 'gem-creator.md',
        features: [
            'Persona-to-prompt transformation',
            'Advanced prompt engineering',
            'Structured gem templates',
            'Quality assurance guidelines',
            'Best practice integration'
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
    },
    {
        id: 'code-review-architect',
        name: 'Code Review Architect',
        description: 'Expert code reviewer focusing on architecture, best practices, and maintainability.',
        category: 'Development',
        icon: 'code',
        color: 'bg-blue-600',
        file: 'code-review-architect.md',
        features: [
            'Architecture analysis',
            'Code quality assessment',
            'Best practices enforcement',
            'Performance optimization',
            'Security review'
        ]
    }
];

// Source and destination directories
const sourceDir = path.join(__dirname, '..');
const destDir = path.join(__dirname, 'src', 'content', 'gems');

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

console.log('🚀 Starting migration...\n');

gems.forEach(gem => {
    const sourceFile = path.join(sourceDir, gem.file);
    const destFile = path.join(destDir, gem.file);

    // Check if source file exists
    if (!fs.existsSync(sourceFile)) {
        console.log(`⚠️  Warning: ${gem.file} not found, skipping...`);
        return;
    }

    // Read the original markdown content
    const originalContent = fs.readFileSync(sourceFile, 'utf-8');

    // Create YAML frontmatter
    const frontmatter = `---
title: "${gem.name}"
description: "${gem.description}"
category: "${gem.category}"
icon: "${gem.icon}"
color: "${gem.color}"
features:
${gem.features.map(f => `  - "${f}"`).join('\n')}
---

`;

    // Combine frontmatter with original content
    const newContent = frontmatter + originalContent;

    // Write to destination
    fs.writeFileSync(destFile, newContent, 'utf-8');
    console.log(`✅ Migrated: ${gem.file}`);
});

console.log('\n🎉 Migration complete! All gems have been processed.');
console.log(`📁 Migrated files are in: ${destDir}`);
