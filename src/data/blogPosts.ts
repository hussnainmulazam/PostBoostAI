export type BlogContentItem = 
  | string
  | { type: 'image'; src: string; alt: string; caption?: string };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  content: BlogContentItem[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 100,
    slug: "how-postboost-works",
    title: "Step-by-Step Guide: How PostBoost Works",
    excerpt: "Learn how to use our All-In-One social media automation tool from logging in to analyzing your connected accounts.",
    author: "Product Team",
    date: "April 17, 2026",
    readTime: "5 min read",
    category: "Tutorial",
    image: "./img2.png",
    content: [
      "Getting started with PostBoost is incredibly simple. We've built an all-in-one system that manages your social expansion effortlessly.",
      "### Step 1: Log In First",
      "The first step to unlocking your potential is creating your account and logging into the master dashboard. From here, you have total control.",
      { type: "image", src: "./img1.png", alt: "Log In First", caption: "Securely log into your unified dashboard." },
      "### Step 2: Create Posts with AI Agent",
      "Let our AI Agent do the heavy lifting. Simply upload your image or video, and our AI will generate engaging, viral-ready captions instantly.",
      { type: "image", src: "./img2.png", alt: "Post Create with AI Agent", caption: "AI assisting in content creation." },
      "### Step 3: Schedule with AI Agent",
      "Stop guessing the best time to post. Tell the AI Agent to schedule your post for the exact date and time your audience is most active.",
      { type: "image", src: "./img3.png", alt: "Schedule with AI Agent", caption: "Precision scheduling calendar." },
      "### Step 4: See Connected Accounts",
      "Finally, monitor everything. See exactly which of your social accounts are connected, active, and driving traffic—all in one place.",
      { type: "image", src: "./img4.png", alt: "See Account which are connected", caption: "Your connected integrations at a glance." },
      "By following these four simple steps, you can save hours of manual posting and multiply your reach across the internet."
    ]
  },
  {
    id: 1,
    slug: "ai-content-strategy-growth-playbook",
    title: "AI Content Strategy Playbook for Fast Brand Growth",
    excerpt:
      "Learn a practical framework to plan, create, and scale high-performing content using AI without losing your brand voice.",
    author: "Ava Thompson",
    date: "April 12, 2026",
    readTime: "8 min read",
    category: "Strategy",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=700&fit=crop&q=80",
    content: [
      "AI can dramatically speed up content production, but strategy still decides whether your content performs. The goal is not just volume, but publishing the right message for the right audience at the right time.",
      "Start with a clear content engine: audience problems, pillar topics, and distribution channels. This ensures every AI-generated draft serves a purpose and aligns with your brand positioning.",
      "Use AI for structure and first drafts, then add your unique perspective, examples, and tone. Human editing is what turns generic output into content people trust and remember.",
      "Build a weekly workflow: research on Monday, drafting on Tuesday, design on Wednesday, scheduling on Thursday, and analysis on Friday. This rhythm keeps output consistent and stress low.",
      "Measure quality signals like saves, shares, click-through rate, and time-on-content. Over time, these metrics help you refine prompts, formats, and topic priorities for compounding growth.",
    ],
  },
  {
    id: 2,
    slug: "schedule-posts-multiple-platforms",
    title: "How to Schedule Posts Across Multiple Platforms",
    excerpt:
      "Learn how to efficiently manage and schedule your content across Instagram, TikTok, Twitter, and more.",
    author: "Mike Chen",
    date: "March 12, 2024",
    readTime: "7 min read",
    category: "Tutorial",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=700&fit=crop&q=75",
    content: [
      "Scheduling across multiple platforms starts with a channel-aware plan. Each platform has different audience behavior, so posting the same message everywhere often underperforms.",
      "Create one weekly content map and adapt format per platform. For example, a short hook-based script may work for TikTok, while LinkedIn needs a stronger context-first opening.",
      "Batch your content creation into focused sessions: ideation, writing, design, and review. This reduces context switching and improves quality while saving time.",
      "Use approval workflows before scheduling to avoid errors. A quick review step for copy, media, and links prevents missed opportunities and brand inconsistencies.",
      "After publishing, review top-performing posts and feed the learnings back into the next week’s schedule.",
    ],
  },
  {
    id: 3,
    slug: "ultimate-guide-content-creation",
    title: "The Ultimate Guide to Content Creation",
    excerpt:
      "Master the art of creating engaging content that resonates with your target audience and drives results.",
    author: "Emily Rodriguez",
    date: "March 10, 2024",
    readTime: "10 min read",
    category: "Content",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=700&fit=crop&q=75",
    content: [
      "Great content starts with audience clarity. Before creating anything, define who you are speaking to, what they care about, and what action you want them to take.",
      "Use a simple structure: hook, value, proof, and call to action. This format works across short posts, long-form articles, and videos.",
      "Consistency beats intensity. Publishing useful content every week outperforms sporadic viral attempts because it builds familiarity and trust over time.",
      "Develop a content system with reusable templates and style guidelines. Systems help teams maintain quality while moving faster.",
      "Measure performance in cycles: publish, analyze, improve. Over time this loop creates compounding gains in relevance and conversion.",
    ],
  },
  {
    id: 4,
    slug: "building-brand-social-media",
    title: "Building Your Brand on Social Media",
    excerpt:
      "Essential strategies for building a strong, recognizable brand presence across all social media platforms.",
    author: "David Kim",
    date: "March 8, 2024",
    readTime: "6 min read",
    category: "Branding",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=700&fit=crop&q=75",
    content: [
      "Brand strength on social media is built through consistency in voice, visuals, and messaging. People should recognize your content before they read your handle.",
      "Define your visual language: color palette, typography style, spacing, and media treatment. This creates instant familiarity across posts and campaigns.",
      "Your brand voice should be stable but human. Keep tone guidelines simple so every post sounds like one personality speaking clearly to the same audience.",
      "Community interaction is part of branding. Replies, comments, and customer conversations shape perception as much as your published content.",
      "A strong brand is not loud, it is clear. Focus on clarity and repetition, and your identity will become memorable over time.",
    ],
  },
];
