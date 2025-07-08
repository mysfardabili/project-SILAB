// PASTIKAN SEMUA TYPE INI ADA DAN DIEKSPOR
export type Resource = {
  type: 'Course' | 'Article' | 'Video';
  title: string;
  url: string;
};

// PASTIKAN 'status' MEMILIKI TIPE YANG SPESIFIK, BUKAN HANYA STRING
export type RoadmapNode = {
  id: string;
  title: string;
  status: 'done' | 'in_progress' | 'skip' | 'pending';
  description: string;
  resources: Resource[];
  sideNote?: string;
};

export type RoadmapDetail = {
  slug: string;
  title: string;
  description: string;
  nodes: RoadmapNode[];
};

// --- DATA TIRUAN (MOCK DATA) ---

export const allRoadmaps = [
  { title: 'Frontend', slug: 'frontend-developer' },
  { title: 'Backend', slug: 'backend-developer' },
  { title: 'UI/UX', slug: 'ui-ux-designer' },
  { title: 'Full Stack', slug: 'full-stack-developer' },
  { title: 'AI Engineer', slug: 'ai-engineer' },
  { title: 'Data Analyst', slug: 'data-analyst' },
];

const frontendRoadmap: RoadmapDetail = {
  slug: 'frontend-developer',
  title: 'Frontend Developer',
  description: 'Step by step guide to becoming a frontend developer in 2025',
  nodes: [
    {
      id: 'html',
      title: 'HTML',
      status: 'done',
      description: 'HTML (Hypertext Markup Language) is the standard for creating web pages...',
      resources: [
        { type: 'Course', title: 'Responsive Web Design Certification', url: '#' },
        { type: 'Article', title: 'W3School: Learn HTML', url: '#' },
        { type: 'Video', title: 'HTML Full Course for Beginners', url: '#' },
      ],
      sideNote: 'You should be able to find an intern or junior Frontend Developer job after learning these three.'
    },
    {
      id: 'css',
      title: 'CSS',
      status: 'in_progress',
      description: 'CSS is used to style and lay out web pages...',
      resources: [],
      sideNote: 'Start applying for jobs and keep learning'
    },
    {
      id: 'javascript',
      title: 'JavaScript',
      status: 'pending',
      description: 'JavaScript is a programming language that enables interactive web pages...',
      resources: [],
    },
    {
      id: 'git',
      title: 'Git',
      status: 'pending',
      description: 'Git is a distributed version control system for tracking changes in source code during software development.',
      resources: [],
      sideNote: 'Learn about version Control Systems & Start using Git for your future projects.'
    },
    {
      id: 'github',
      title: 'GitHub',
      status: 'pending',
      description: 'GitHub is a provider of Internet hosting for software development and version control using Git.',
      resources: [],
      sideNote: 'Create your Github Profile and publish the Developer join after these three.'
    },
    {
      id: 'npm',
      title: 'npm',
      status: 'pending',
      description: 'npm is the default package manager for the JavaScript runtime environment Node.js.',
      resources: [],
      sideNote: 'Learn to use npm package manager. This should be a quick one. Just get the basics and move on.'
    },
    {
      id: 'react',
      title: 'React',
      status: 'pending',
      description: 'React is a free and open-source front-end JavaScript library for building user interfaces based on components.',
      resources: [],
      sideNote: 'Create some project with React. Make sure to install some external data.'
    },
    {
      id: 'tailwind',
      title: 'Tailwind CSS',
      status: 'pending',
      description: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.',
      resources: [],
      sideNote: 'There are several CSS frameworks available. You can pick any. I would recommend learning Tailwind'
    },
    {
      id: 'vitest',
      title: 'Vitest',
      status: 'pending',
      description: 'Vitest is a blazing fast unit-test framework powered by Vite.',
      resources: [],
      sideNote: 'Learn about different Testing types and how to test your frontend using something like vitest.'
    },
  ],
};

export const getRoadmapBySlug = (slug: string): RoadmapDetail | undefined => {
  if (slug === 'frontend-developer') {
    return frontendRoadmap;
  }
  return undefined;
};