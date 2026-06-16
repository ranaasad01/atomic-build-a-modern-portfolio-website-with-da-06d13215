export interface ProjectDetail {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
  highlights: string[];
  stats: { label: string; value: string }[];
  techStack: { name: string; role: string; color: string }[];
  screenshots: { src: string; caption: string }[];
  timeline: { phase: string; duration: string; description: string }[];
  relatedProjects: { slug: string; title: string; tagline: string; image: string; tags: string[] }[];
}

export const projects: ProjectDetail[] = [
  {
    slug: 'nova-dashboard',
    title: 'Nova Dashboard',
    tagline: 'Real-time analytics platform for modern SaaS teams',
    description:
      'A comprehensive analytics dashboard built for high-growth SaaS companies.',
    longDescription:
      'Nova Dashboard was born out of frustration with fragmented analytics tools.\n\nThe frontend is built with Next.js 14 and React Server Components for near-instant page loads.\n\nDesign-wise, I focused on information density without clutter.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'TimescaleDB', 'Redis', 'WebSockets', 'Tailwind CSS'],
    category: 'web',
    image: 'https://tibydesignstudio.ca/_next/image?url=%2Fimages%2Fnova-dash%2Fnova-hero-dashboard-device.png&w=3840&q=75',
    liveUrl: 'https://nova-dashboard.demo',
    githubUrl: 'https://github.com/alexmorgan/nova-dashboard',
    featured: true,
    year: 2024,
    highlights: [
      'Reduced average time-to-insight from 12 minutes to under 90 seconds',
      'Handles 50 million+ events per day with sub-200ms query latency',
      'Integrated with 14 third-party data sources via a plugin architecture',
      'Shipped a white-label mode adopted by 3 enterprise customers',
      'Achieved 99.97% uptime over 8 months of production operation',
      'Open-sourced the charting primitives — 1.2k GitHub stars in 6 weeks',
    ],
    stats: [
      { label: 'GitHub Stars', value: '1.2k' },
      { label: 'Daily Events', value: '50M+' },
      { label: 'Query Latency', value: '<200ms' },
      { label: 'Uptime', value: '99.97%' },
    ],
    techStack: [
      { name: 'Next.js 14', role: 'Frontend framework', color: 'from-white/20 to-white/5' },
      { name: 'TypeScript', role: 'Type safety', color: 'from-blue-500/20 to-blue-500/5' },
      { name: 'Fastify', role: 'API server', color: 'from-yellow-500/20 to-yellow-500/5' },
      { name: 'TimescaleDB', role: 'Time-series storage', color: 'from-orange-500/20 to-orange-500/5' },
      { name: 'Redis', role: 'Caching layer', color: 'from-red-500/20 to-red-500/5' },
      { name: 'WebSockets', role: 'Real-time updates', color: 'from-green-500/20 to-green-500/5' },
      { name: 'Tailwind CSS', role: 'Styling', color: 'from-cyan-500/20 to-cyan-500/5' },
      { name: 'Recharts', role: 'Data visualization', color: 'from-purple-500/20 to-purple-500/5' },
    ],
    screenshots: [
      { src: '/images/nova-dashboard-overview-screen.jpg', caption: 'Main overview' },
      { src: '/images/nova-dashboard-funnel-analysis.jpg', caption: 'Funnel analysis' },
      { src: '/images/nova-dashboard-realtime-events.jpg', caption: 'Live event stream' },
    ],
    timeline: [
      { phase: 'Discovery & Design', duration: '3 weeks', description: 'User interviews with 12 product managers, competitive analysis, and high-fidelity Figma prototypes.' },
      { phase: 'Core Infrastructure', duration: '4 weeks', description: 'TimescaleDB schema design, ingestion pipeline, and Fastify API with OpenAPI docs.' },
      { phase: 'Frontend Build', duration: '6 weeks', description: 'Next.js app, chart library integration, real-time WebSocket layer, and responsive layout.' },
      { phase: 'Integrations', duration: '3 weeks', description: 'Plugin system for Stripe, Mixpanel, Intercom, and custom event SDKs.' },
      { phase: 'Beta & Polish', duration: '2 weeks', description: 'Closed beta with 5 teams, performance tuning, accessibility audit, and launch prep.' },
    ],
    relatedProjects: [
      { slug: 'pulse-mobile', title: 'Pulse Mobile', tagline: 'Lightweight event ingestion microservice', image: 'https://routinespulse.com/_next/image?url=%2Fiphone%2FiPhone-1.jpg&w=640&q=75', tags: ['Node.js', 'Kafka', 'Docker'] },
      { slug: 'lumina-design-system', title: 'Lumina Design System', tagline: 'Open-source React charting primitives', image: 'https://s3-alpha.figma.com/hub/file/6242084878/41995a36-8793-43c4-b9a6-9a1d752455c9-cover.png', tags: ['React', 'D3', 'TypeScript'] },
      { slug: 'nova-analytics', title: 'Nova Analytics', tagline: 'Visual ETL pipeline builder for non-engineers', image: 'https://tibydesignstudio.ca/_next/image?url=%2Fimages%2Fnova-dash%2Fnova-hero-dashboard-device.png&w=3840&q=75', tags: ['Next.js', 'PostgreSQL', 'Python'] },
    ],
  },
  {
    slug: 'lumina-design-system',
    title: 'Lumina Design System',
    tagline: 'A scalable component library for modern web apps',
    description: 'Lumina is a fully accessible, themeable design system built with React and TypeScript.',
    longDescription: 'Lumina was born out of the need for a consistent, accessible UI foundation.\n\nIt covers everything from atomic elements to complex patterns like data tables and command palettes.',
    tags: ['React', 'TypeScript', 'Storybook', 'Figma'],
    category: 'oss',
    image: 'https://s3-alpha.figma.com/hub/file/6242084878/41995a36-8793-43c4-b9a6-9a1d752455c9-cover.png',
    liveUrl: 'https://lumina.design',
    githubUrl: 'https://github.com/alexmorgan/lumina',
    featured: true,
    year: 2024,
    highlights: ['60+ accessible components', 'Full dark mode support', 'Storybook documentation'],
    stats: [{ label: 'Components', value: '60+' }, { label: 'GitHub Stars', value: '2k+' }, { label: 'Downloads', value: '10k/mo' }, { label: 'Contributors', value: '24' }],
    techStack: [
      { name: 'React', role: 'UI library', color: 'from-cyan-500/20 to-cyan-500/5' },
      { name: 'TypeScript', role: 'Type safety', color: 'from-blue-500/20 to-blue-500/5' },
      { name: 'Storybook', role: 'Documentation', color: 'from-pink-500/20 to-pink-500/5' },
      { name: 'Radix UI', role: 'Primitives', color: 'from-violet-500/20 to-violet-500/5' },
    ],
    screenshots: [],
    timeline: [
      { phase: 'Design Tokens', duration: '2 weeks', description: 'Color system, typography scale, and spacing tokens.' },
      { phase: 'Core Components', duration: '8 weeks', description: 'Buttons, inputs, modals, and navigation components.' },
      { phase: 'Documentation', duration: '3 weeks', description: 'Storybook stories and usage guidelines.' },
    ],
    relatedProjects: [],
  },
  {
    slug: 'pulse-mobile',
    title: 'Pulse Mobile',
    tagline: 'Health & fitness tracker with AI-powered insights',
    description: 'A cross-platform mobile app that uses computer vision to diagnose plant diseases.',
    longDescription: 'Pulse combines a beautiful, gesture-driven UI with a lightweight on-device ML model.\n\nIt syncs across devices via a Supabase backend and supports widgets on both iOS and Android.',
    tags: ['React Native', 'Expo', 'TensorFlow.js', 'Node.js'],
    category: 'mobile',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/48/T-Mobile_Pulse_BW_1.jpg',
    liveUrl: 'https://pulse.health',
    githubUrl: 'https://github.com/alexmorgan/pulse',
    featured: true,
    year: 2023,
    highlights: ['On-device ML predictions', 'iOS & Android widgets', 'Gesture-driven UI'],
    stats: [{ label: 'Downloads', value: '200k+' }, { label: 'App Store', value: '4.9★' }, { label: 'DAU', value: '50k' }, { label: 'Uptime', value: '99.9%' }],
    techStack: [
      { name: 'React Native', role: 'Mobile framework', color: 'from-blue-500/20 to-blue-500/5' },
      { name: 'Expo', role: 'Build tooling', color: 'from-white/20 to-white/5' },
      { name: 'TensorFlow.js', role: 'ML inference', color: 'from-orange-500/20 to-orange-500/5' },
      { name: 'Supabase', role: 'Backend', color: 'from-green-500/20 to-green-500/5' },
    ],
    screenshots: [],
    timeline: [
      { phase: 'Research', duration: '2 weeks', description: 'User research and competitive analysis.' },
      { phase: 'MVP', duration: '6 weeks', description: 'Core tracking features and ML integration.' },
      { phase: 'Launch', duration: '2 weeks', description: 'App Store submission and marketing.' },
    ],
    relatedProjects: [],
  },
  {
    slug: 'nova-analytics',
    title: 'Nova Analytics',
    tagline: 'Real-time product analytics dashboard for SaaS teams.',
    description: 'Nova is a real-time analytics platform that helps SaaS companies understand user behavior.',
    longDescription: 'Built with Next.js 14, Prisma, and ClickHouse for blazing-fast aggregations.\n\nNova processes millions of events per day with sub-second query latency.',
    tags: ['Next.js', 'ClickHouse', 'Prisma', 'Recharts', 'tRPC'],
    category: 'web',
    image: 'https://tibydesignstudio.ca/_next/image?url=%2Fimages%2Fnova-dash%2Fnova-hero-dashboard-device.png&w=3840&q=75',
    liveUrl: 'https://nova-analytics.app',
    githubUrl: 'https://github.com/alexmorgan/nova',
    featured: true,
    year: 2024,
    highlights: ['Sub-second query latency', 'Cohort & funnel analysis', 'Self-hostable', 'GDPR compliant'],
    stats: [{ label: 'Events/day', value: '1M+' }, { label: 'Latency', value: '<1s' }, { label: 'Customers', value: '500+' }, { label: 'Uptime', value: '99.9%' }],
    techStack: [
      { name: 'Next.js', role: 'Frontend', color: 'from-white/20 to-white/5' },
      { name: 'ClickHouse', role: 'Analytics DB', color: 'from-yellow-500/20 to-yellow-500/5' },
      { name: 'Prisma', role: 'ORM', color: 'from-teal-500/20 to-teal-500/5' },
      { name: 'tRPC', role: 'API layer', color: 'from-blue-500/20 to-blue-500/5' },
    ],
    screenshots: [],
    timeline: [
      { phase: 'Architecture', duration: '2 weeks', description: 'Schema design and technology selection.' },
      { phase: 'Build', duration: '10 weeks', description: 'Full-stack implementation and testing.' },
      { phase: 'Launch', duration: '2 weeks', description: 'Beta testing and public launch.' },
    ],
    relatedProjects: [],
  },
];
