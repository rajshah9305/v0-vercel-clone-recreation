export type Build = {
  id: string
  title: string
  prompt: string
  author: string
  authorHandle: string
  category: string
  forks: number
  likes: number
  views: number
  accent: string
}

export const CATEGORIES = [
  'All',
  'Landing Page',
  'Dashboard',
  'E-commerce',
  'AI Chat',
  'Portfolio',
  'SaaS',
]

export const COMMUNITY_BUILDS: Build[] = [
  {
    id: 'aurora-analytics',
    title: 'Aurora Analytics Dashboard',
    prompt: 'A dark analytics dashboard with charts, KPIs, and a sidebar nav.',
    author: 'Maya Chen',
    authorHandle: 'mayac',
    category: 'Dashboard',
    forks: 482,
    likes: 2310,
    views: 18400,
    accent: 'oklch(0.87 0.21 130)',
  },
  {
    id: 'nimbus-saas',
    title: 'Nimbus SaaS Landing',
    prompt: 'A bold SaaS landing page with pricing, testimonials, and CTA.',
    author: 'Diego Torres',
    authorHandle: 'dtorres',
    category: 'Landing Page',
    forks: 631,
    likes: 3120,
    views: 24100,
    accent: 'oklch(0.72 0.15 195)',
  },
  {
    id: 'forge-store',
    title: 'Lumen Storefront',
    prompt: 'A minimalist e-commerce storefront with product grid and cart.',
    author: 'Aisha Khan',
    authorHandle: 'aishak',
    category: 'E-commerce',
    forks: 274,
    likes: 1580,
    views: 12200,
    accent: 'oklch(0.78 0.16 85)',
  },
  {
    id: 'sage-chat',
    title: 'Sage AI Assistant',
    prompt: 'A chat interface for an AI assistant with message threads.',
    author: 'Liam OBrien',
    authorHandle: 'liamob',
    category: 'AI Chat',
    forks: 905,
    likes: 4420,
    views: 31800,
    accent: 'oklch(0.87 0.21 130)',
  },
  {
    id: 'studio-folio',
    title: 'Studio Portfolio',
    prompt: 'A creative portfolio for a design studio with case studies.',
    author: 'Noah Park',
    authorHandle: 'noahp',
    category: 'Portfolio',
    forks: 188,
    likes: 1190,
    views: 9800,
    accent: 'oklch(0.72 0.15 195)',
  },
  {
    id: 'pulse-crm',
    title: 'Pulse CRM',
    prompt: 'A SaaS CRM with deals pipeline, contacts, and activity feed.',
    author: 'Emma Wright',
    authorHandle: 'emmaw',
    category: 'SaaS',
    forks: 357,
    likes: 2040,
    views: 15600,
    accent: 'oklch(0.78 0.16 85)',
  },
  {
    id: 'orbit-finance',
    title: 'Orbit Finance App',
    prompt: 'A personal finance dashboard with budgets and spending charts.',
    author: 'Kai Nakamura',
    authorHandle: 'kain',
    category: 'Dashboard',
    forks: 412,
    likes: 2670,
    views: 19900,
    accent: 'oklch(0.87 0.21 130)',
  },
  {
    id: 'vertex-launch',
    title: 'Vertex Launch Page',
    prompt: 'A product launch landing page with waitlist and feature grid.',
    author: 'Sofia Rossi',
    authorHandle: 'sofiar',
    category: 'Landing Page',
    forks: 523,
    likes: 2890,
    views: 21300,
    accent: 'oklch(0.72 0.15 195)',
  },
  {
    id: 'atlas-booking',
    title: 'Atlas Travel Booking',
    prompt: 'A travel booking UI with search, results, and trip details.',
    author: 'Owen Bennett',
    authorHandle: 'owenb',
    category: 'E-commerce',
    forks: 246,
    likes: 1430,
    views: 11100,
    accent: 'oklch(0.78 0.16 85)',
  },
]

export type Project = {
  id: string
  name: string
  description: string
  updatedAt: string
  versions: number
  status: 'Deployed' | 'Draft' | 'Building'
  visibility: 'Public' | 'Private'
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Acme Marketing Site',
    description: 'Landing page redesign with new hero and pricing.',
    updatedAt: '2 hours ago',
    versions: 14,
    status: 'Deployed',
    visibility: 'Public',
  },
  {
    id: 'p2',
    name: 'Internal Admin Panel',
    description: 'User management dashboard with roles and audit log.',
    updatedAt: '5 hours ago',
    versions: 31,
    status: 'Building',
    visibility: 'Private',
  },
  {
    id: 'p3',
    name: 'Mobile Onboarding Flow',
    description: 'Multi-step signup with progress and validation.',
    updatedAt: 'Yesterday',
    versions: 8,
    status: 'Draft',
    visibility: 'Private',
  },
  {
    id: 'p4',
    name: 'Pricing Experiment B',
    description: 'A/B test variant for the pricing page layout.',
    updatedAt: '3 days ago',
    versions: 19,
    status: 'Deployed',
    visibility: 'Public',
  },
  {
    id: 'p5',
    name: 'Docs Portal',
    description: 'Searchable documentation site with sidebar nav.',
    updatedAt: '1 week ago',
    versions: 22,
    status: 'Deployed',
    visibility: 'Public',
  },
  {
    id: 'p6',
    name: 'Event Registration',
    description: 'Conference signup with schedule and speakers.',
    updatedAt: '2 weeks ago',
    versions: 6,
    status: 'Draft',
    visibility: 'Private',
  },
]

export const STARTER_PROMPTS = [
  'A SaaS pricing page with three tiers and a toggle for monthly/yearly',
  'A dark analytics dashboard with KPI cards and a sidebar',
  'A landing page for an AI note-taking app',
  'A product card grid for a sneaker store with filters',
  'A login screen with social auth buttons',
  'A Kanban board with draggable task columns',
]
