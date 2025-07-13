export type Resource = {
  type: 'Course' | 'Article' | 'Video';
  title: string;
  url: string;
};

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

// --- Data Roadmap Frontend ---
const frontendRoadmap: RoadmapDetail = {
  slug: 'frontend-developer',
  title: 'Frontend Developer',
  description: 'Step by step guide to becoming a frontend developer in 2025',
  nodes: [
    { id: 'html', title: 'HTML', status: 'done', description: 'HyperText Markup Language is the standard for creating web pages.', resources: [] },
    { id: 'css', title: 'CSS', status: 'in_progress', description: 'Cascading Style Sheets is used to style and lay out web pages.', resources: [] },
    { id: 'javascript', title: 'JavaScript', status: 'pending', description: 'A programming language that enables interactive web pages.', resources: [] },
    { id: 'git', title: 'Git', status: 'pending', description: 'A distributed version control system for tracking changes in source code.', resources: [] },
    { id: 'github', title: 'GitHub', status: 'pending', description: 'A provider of Internet hosting for software development and version control using Git.', resources: [] },
    { id: 'npm', title: 'npm', status: 'pending', description: 'The default package manager for the JavaScript runtime environment Node.js.', resources: [] },
    { id: 'react', title: 'React', status: 'pending', description: 'A front-end JavaScript library for building user interfaces based on components.', resources: [] },
    { id: 'tailwind', title: 'Tailwind CSS', status: 'pending', description: 'A utility-first CSS framework for rapidly building custom user interfaces.', resources: [] },
    { id: 'vitest', title: 'Vitest', status: 'pending', description: 'A blazing fast unit-test framework powered by Vite.', resources: [] },
  ],
};

// --- Data Roadmap Backend ---
const backendRoadmap: RoadmapDetail = {
  slug: 'backend-developer',
  title: 'Backend Developer',
  description: 'Learn how to build the engine behind modern applications.',
  nodes: [
    { id: 'language', title: 'Choose a Language', status: 'pending', description: 'Pilih satu bahasa utama untuk backend. Contoh: Node.js (JavaScript), Python, Java, atau Go.', resources: [] },
    { id: 'database', title: 'Databases', status: 'pending', description: 'Pelajari cara kerja database. Pilih antara SQL (seperti PostgreSQL) atau NoSQL (seperti MongoDB).', resources: [] },
    { id: 'api', title: 'REST APIs / GraphQL', status: 'pending', description: 'Pelajari cara membuat API agar frontend dan backend bisa berkomunikasi.', resources: [] },
    { id: 'auth', title: 'Authentication', status: 'pending', description: 'Implementasikan sistem login dan keamanan, misalnya menggunakan JWT atau OAuth.', resources: [] },
    { id: 'docker', title: 'Docker', status: 'pending', description: 'Pelajari dasar-dasar containerization dengan Docker untuk mempermudah deployment.', resources: [] },
    { id: 'cloud', title: 'Cloud Deployment', status: 'pending', description: 'Coba deploy aplikasi Anda ke salah satu platform cloud seperti Vercel, AWS, atau Google Cloud.', resources: [] },
  ],
};

// --- Data Roadmap UI/UX ---
const uiuxRoadmap: RoadmapDetail = {
  slug: 'ui-ux-designer',
  title: 'UI/UX Designer',
  description: 'Design intuitive and user-centered digital experiences.',
  nodes: [
    { id: 'research', title: 'User Research', status: 'pending', description: 'Pahami pengguna Anda melalui metode seperti persona, user journey, dan interview.', resources: [] },
    { id: 'principles', title: 'Design Principles', status: 'pending', description: 'Kuasai prinsip dasar desain seperti color theory, typography, dan layout.', resources: [] },
    { id: 'wireframe', title: 'Wireframing', status: 'pending', description: 'Buat kerangka dasar (lo-fi) dari aplikasi Anda untuk merencanakan struktur dan alur.', resources: [] },
    { id: 'prototype', title: 'Prototyping (Figma)', status: 'pending', description: 'Buat prototipe interaktif (hi-fi) menggunakan tools seperti Figma.', resources: [] },
    { id: 'testing', title: 'Usability Testing', status: 'pending', description: 'Uji desain Anda dengan pengguna sungguhan untuk menemukan masalah dan mendapatkan feedback.', resources: [] },
    { id: 'handoff', title: 'Developer Handoff', status: 'pending', description: 'Pelajari cara menyerahkan aset desain, style guide, dan spesifikasi kepada tim developer.', resources: [] },
  ],
};

// --- Data Roadmap Full Stack ---
const fullstackRoadmap: RoadmapDetail = {
  slug: 'full-stack-developer',
  title: 'Full Stack Developer',
  description: 'Master both the frontend and backend to build complete applications.',
  nodes: [
    { id: 'html-css-js', title: 'HTML, CSS, & JS', status: 'pending', description: 'Fondasi wajib untuk semua web development.', resources: [] },
    { id: 'frontend-framework', title: 'Frontend Framework', status: 'pending', description: 'Pilih dan kuasai satu framework seperti React, Vue, atau Svelte.', resources: [] },
    { id: 'backend-language', title: 'Backend Language', status: 'pending', description: 'Pilih satu bahasa backend. Node.js adalah pilihan populer untuk developer full stack JavaScript.', resources: [] },
    { id: 'api-creation', title: 'API Creation', status: 'pending', description: 'Bangun API untuk menghubungkan frontend dan backend Anda.', resources: [] },
    { id: 'database-integration', title: 'Database Integration', status: 'pending', description: 'Hubungkan backend Anda ke database untuk menyimpan dan mengambil data.', resources: [] },
    { id: 'deployment', title: 'Full Deployment', status: 'pending', description: 'Pelajari cara mendeploy seluruh aplikasi (frontend & backend) ke internet.', resources: [] },
  ],
};

// --- Data Roadmap AI Engineer ---
const aiEngineerRoadmap: RoadmapDetail = {
  slug: 'ai-engineer',
  title: 'AI Engineer',
  description: 'Build and deploy intelligent machine learning models at scale.',
  nodes: [
    { id: 'foundation', title: 'Programming & Math Foundation', status: 'pending', description: 'Kuasai Python, Aljabar Linear, Kalkulus, dan Statistik Probabilitas.', resources: [] },
    { id: 'core-ml', title: 'Core Machine Learning', status: 'pending', description: 'Pelajari algoritma Supervised & Unsupervised Learning dengan Scikit-learn.', resources: [] },
    { id: 'deep-learning', title: 'Deep Learning', status: 'pending', description: 'Masuk ke dunia Neural Networks menggunakan framework seperti TensorFlow atau PyTorch.', resources: [] },
    { id: 'specialization', title: 'Specialization (NLP/CV)', status: 'pending', description: 'Pilih spesialisasi seperti Natural Language Processing (NLP) atau Computer Vision (CV).', resources: [] },
    { id: 'mlops', title: 'MLOps', status: 'pending', description: 'Pelajari cara mendeploy, memonitor, dan mengelola siklus hidup model machine learning di production.', resources: [] },
  ],
};

// --- Data Roadmap Data Analyst ---
const dataAnalystRoadmap: RoadmapDetail = {
  slug: 'data-analyst',
  title: 'Data Analyst',
  description: 'Turn raw data into actionable insights through analysis and visualization.',
  nodes: [
    { id: 'spreadsheet', title: 'Advanced Spreadsheets', status: 'pending', description: 'Kuasai fitur-fitur canggih di Excel atau Google Sheets seperti Pivot Tables dan VLOOKUP.', resources: [] },
    { id: 'sql', title: 'SQL', status: 'pending', description: 'SQL adalah bahasa wajib untuk mengambil dan memanipulasi data dari database relasional.', resources: [] },
    { id: 'python-pandas', title: 'Data Wrangling (Python)', status: 'pending', description: 'Gunakan library Python seperti Pandas dan NumPy untuk membersihkan dan mentransformasi data.', resources: [] },
    { id: 'visualization', title: 'Data Visualization', status: 'pending', description: 'Buat visualisasi yang efektif menggunakan tools seperti Tableau, Power BI, atau library Python (Matplotlib, Seaborn).', resources: [] },
    { id: 'statistics', title: 'Statistics Fundamentals', status: 'pending', description: 'Pahami konsep statistik deskriptif dan inferensial untuk membuat kesimpulan yang valid dari data.', resources: [] },
    { id: 'communication', title: 'Storytelling & Communication', status: 'pending', description: 'Kemampuan terpenting adalah menyajikan hasil analisis Anda secara jelas dan meyakinkan kepada stakeholder.', resources: [] },
  ],
};

// --- Fungsi Pengambil Data ---
export const getRoadmapBySlug = (slug: string): RoadmapDetail | undefined => {
  switch (slug) {
    case 'frontend-developer':
      return frontendRoadmap;
    case 'backend-developer':
      return backendRoadmap;
    case 'ui-ux-designer':
      return uiuxRoadmap;
    case 'full-stack-developer':
      return fullstackRoadmap;
    case 'ai-engineer':
      return aiEngineerRoadmap;
    case 'data-analyst':
      return dataAnalystRoadmap;
    default:
      return undefined;
  }
};