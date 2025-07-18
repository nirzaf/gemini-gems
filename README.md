# 💎 Gemini Gems

<div align="center">

![Gemini Gems](https://img.shields.io/badge/Gemini-Gems-blue?style=for-the-badge&logo=google&logoColor=white)
![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

**🚀 Supercharge your AI conversations with expertly crafted system prompts!**

*Transform Google's Gemini into specialized expert assistants with our professional-grade prompt collection*

[🌟 Explore Gems](#-available-gems) • [🤝 Contribute](#-contributing-guidelines) • [📖 Documentation](#-documentation) • [🚀 Quick Start](#-quick-start)

</div>

---

## 🎯 What are Gemini Gems?

**Gemini Gems** are meticulously crafted system prompts that transform general-purpose Gemini models into specialized expert assistants. Each gem is a blueprint for creating AI personas with:

- **🎭 Defined Personalities** - Clear roles and behavioral patterns
- **🧠 Specialized Knowledge** - Domain-specific expertise and capabilities
- **📋 Structured Workflows** - Consistent interaction protocols
- **🎨 Professional Output** - Formatted, actionable responses
- **🔄 Adaptive Behavior** - Context-aware responses and guidance

Think of gems as **professional consultants in AI form** - each one an expert in their field, ready to provide specialized assistance with consistent quality and reliability.

## 💎 Available Gems

Our collection features **13 specialized gems** across multiple categories, each designed for specific use cases:

### 📚 Education & Learning
- **[Grammar Teacher](grammar-teacher.md)** - Interactive Grade 3 grammar tutor with dynamic themed adventures
- **[Language Teacher](language-teacher.md)** - Personalized language learning with adaptive exercises and feedback

### 💻 Development & Technical
- **[Programming Co-pilot](programming-co-pilot.md)** - Expert coding assistant for all programming languages and frameworks
- **[System Architect](system-architect.md)** - Transforms ideas into comprehensive technical specifications

### 🎨 Creative & Content
- **[Storyteller/Novelist](storyteller-novelist.md)** - Master storyteller for compelling narratives and character development
- **[GameForge Master](gameforge-master.md)** - TTRPG and video game design specialist

### 💼 Business & Professional
- **[Marketing Strategist](marketing-strategist.md)** - Comprehensive marketing strategy development
- **[Professional Email Crafter](professional-email-crafter.md)** - Expert business communication specialist

### 🏠 Lifestyle & Practical
- **[DIY Tinkerer (Fix-It Felix)](diy-tinkerer.md)** - Home repair and improvement expert with safety-first approach
- **[Sous Chef (Chef Gusteau)](sous-chef.md)** - Culinary assistant for pantry-to-plate cooking

### 💰 Finance & Planning
- **[Personal Finance Navigator (CoinWise)](personal-finance-navigator.md)** - Financial education and investment strategy guidance

### 🧘 Wellness & Mindfulness
- **[Wellness & Mindfulness Coach (Serene)](wellness-mindfulness-coach.md)** - Personalized meditation and stress management

### 🙏 Spiritual & Cultural
- **[Dua Generator](dua-generator.md)** - Authentic Islamic prayers for various occasions

## 🚀 Quick Start

### Option 1: Browse Online (Recommended)
1. **Start Local Server** (for full functionality):
   ```bash
   # Clone the repository
   git clone https://github.com/nirzaf/gemini-gems.git
   cd gemini-gems

   # Start the server (choose one)
   python3 serve.py        # Python server
   node serve.js          # Node.js server
   ./start-server.sh      # Auto-detect server
   ```

2. **Open Browser**: Navigate to `http://localhost:8000`
3. **Explore Gems**: Browse, preview, and copy gems with one click
4. **Use in Gemini**: Paste the copied prompt as your system message

### Option 2: Direct File Access
1. Browse the repository files directly
2. Open any `.md` file to view the gem
3. Copy the entire content
4. Use as system prompt in Google Gemini

## 📖 How to Use a Gem

**Step-by-step process:**

1. **Choose Your Gem** - Select a gem that matches your needs
2. **Copy the Content** - Copy the entire markdown content of the gem file
3. **Set as System Prompt** - In Google Gemini, paste the content as your system message
4. **Start Conversing** - The AI will now behave according to the gem's specifications

**Example:**
```
System Prompt: [Paste entire gem content here]
User Message: "Help me debug this Python function..."
```

The Gemini model will now respond as the specialized expert defined in the gem!

## 🤝 Contributing Guidelines

We welcome and encourage contributions! Here's everything you need to know about contributing to Gemini Gems:

### 🌟 Ways to Contribute

#### 1. **Create New Gems**
- Design specialized AI personas for specific use cases
- Follow our established patterns and quality standards
- Submit via pull request with proper documentation

#### 2. **Improve Existing Gems**
- Enhance clarity, functionality, or effectiveness
- Fix bugs or inconsistencies
- Add new features or capabilities

#### 3. **Enhance the Platform**
- Improve the web interface or user experience
- Add new features to the gem browser
- Optimize performance or accessibility

#### 4. **Documentation & Community**
- Improve documentation and examples
- Create tutorials or guides
- Help with translations or localization

### 📝 Creating a New Gem

#### **Step 1: Planning Your Gem**

**Define Your Concept:**
- **Target Audience**: Who will use this gem?
- **Core Purpose**: What specific problem does it solve?
- **Unique Value**: What makes it different from existing gems?
- **Scope**: What should it do (and not do)?

**Research & Validation:**
- Check existing gems to avoid duplication
- Research best practices in the domain
- Consider user needs and pain points
- Plan for different skill levels and use cases

#### **Step 2: Gem Structure & Content**

**Required Sections** (follow this exact structure):

```markdown
You are **[Persona Name]**, an expert AI [role description]. Your purpose is to [clear mission statement].

## Core Mission
[Detailed explanation of the gem's purpose and capabilities]

## Interaction Protocol
### 1. User Input
### 2. [Assessment/Analysis Phase]
### 3. [Response Generation]

## Required Output Structure
### [Section 1]
### [Section 2]
[etc.]

## Core Behavioral Directives
### [Directive Category 1]
### [Directive Category 2]
[etc.]

## Specialized Knowledge Areas
[Domain-specific expertise areas]

## Response Examples
[Example interactions and outputs]

## Important Limitations
[Boundaries, disclaimers, when to refer to professionals]

## Tone and Personality
[Communication style and approach]
```

#### **Step 3: Quality Standards**

**Content Requirements:**
- ✅ **Clear Persona**: Memorable name and distinct personality
- ✅ **Comprehensive Scope**: Covers the domain thoroughly
- ✅ **Structured Output**: Consistent, formatted responses
- ✅ **Safety Considerations**: Appropriate limitations and warnings
- ✅ **Professional Tone**: Expert but accessible communication
- ✅ **Practical Examples**: Real-world use cases and scenarios

**Technical Requirements:**
- ✅ **Markdown Format**: Proper formatting and structure
- ✅ **2000+ Words**: Comprehensive and detailed content
- ✅ **Consistent Style**: Follows established patterns
- ✅ **Error-Free**: Proper grammar, spelling, and formatting

## Contributing

We welcome contributions to this project! Here are a few ways you can contribute:

*   **Suggest a new gem:** If you have an idea for a new gem, please open an issue to discuss it.
*   **Improve an existing gem:** If you find a bug or have a suggestion for improving an existing gem, please open an issue or submit a pull request.
*   **Submit a new gem:** If you've created a new gem that you'd like to share, please submit a pull request.

When contributing to this project, please follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## Code of Conduct

To ensure a welcoming and inclusive environment, we have adopted a Code of Conduct that all contributors are expected to follow. Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.
