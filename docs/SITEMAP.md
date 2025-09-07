# Site Architecture

## Page Structure

### 🏠 **Home** (`/`)
- **Hero Section**: Name, typing animation (roles), CTA buttons
- **Featured Projects**: 3-4 key projects with metrics
- **Tech Stack**: Visual grid of technologies
- **Quick About**: 2-3 sentence summary with photo

### 💼 **Experience** (`/experience`)
- **Timeline Format**: Similar to LinkedIn experience section
- **Company cards**: Logo, title, duration, key achievements
- **Skills used**: Tech stack badges per role
- **Metrics**: Impact numbers where possible

### 🚀 **Projects** (`/projects`)
- **Filterable Grid**: By technology, type, or year
- **Project Cards**: Screenshot, description, tech stack, metrics
- **Live Demo + GitHub**: Links with external icons
- **Case Studies**: Detailed view for 2-3 major projects

### 📄 **Resume** (`/resume`)
- **Web View**: Responsive HTML version
- **PDF Download**: Generated from same data source
- **Print Optimized**: Clean layout for printing
- **ATS Friendly**: Structured data for applicant tracking systems

### ✍️ **Writing** (`/writing`) - *Optional*
- **Article List**: Technical posts, tutorials, insights
- **MDX Support**: Code snippets with syntax highlighting
- **Search/Filter**: By topic or technology
- **Reading Time**: Estimated duration per article

### 🛠️ **Uses** (`/uses`) - *Popular with developers*
- **Development Setup**: Editor, extensions, themes
- **Hardware**: Laptop, monitor, accessories
- **Software**: Tools, apps, services
- **Why This Page**: Devs love seeing others' setups

### 📬 **Contact** (`/contact`)
- **Contact Form**: EmailJS integration (already implemented)
- **Calendly Integration**: "Schedule a call" option
- **Social Links**: GitHub, LinkedIn, Twitter
- **Response Time**: Clear expectation setting

## Navigation Structure

```
┌─ Header Nav ─────────────────────────┐
│ [Logo] Home Experience Projects      │
│                     Resume Contact   │
└──────────────────────────────────────┘

┌─ Mobile Nav (Hamburger) ─────────────┐
│ ≡ Home                               │
│   Experience                         │
│   Projects                           │
│   Resume                             │
│   Writing                            │
│   Uses                               │
│   Contact                            │
└──────────────────────────────────────┘

┌─ Footer ─────────────────────────────┐
│ © 2025 Will Chen                     │
│ Built with React + TypeScript        │
│ [GitHub] [LinkedIn] [Email]          │
└──────────────────────────────────────┘
```

## Content Strategy

### Priority Pages (MVP)
1. **Home** - First impression, keep visitors engaged
2. **Projects** - Primary showcase of technical skills  
3. **Resume** - ATS and human-readable versions
4. **Contact** - Easy way to reach out

### Secondary Pages
5. **Experience** - Detailed work history
6. **Writing** - Demonstrate thought leadership
7. **Uses** - Personal branding, community engagement

## SEO & Social Optimization

- **Meta Tags**: Title, description, OG tags per page
- **JSON-LD**: Structured data for Person, Organization
- **Sitemap.xml**: Auto-generated for search engines
- **Social Images**: Custom OG images for sharing