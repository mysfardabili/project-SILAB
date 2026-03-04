export type UserRole = "mahasiswa" | "dosen" | "admin";
export type UserStatus = "active" | "inactive";
export type CourseStatus = "active" | "pending" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  prodi?: string;
  nim?: string;
  nip?: string;
  angkatan?: string;
  status?: UserStatus;
  joinedAt?: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  dosenId: string; // Refers to dosen User ID
  dosenName: string;
  prodi: string;
  semester: string;
  studentsCount: number;
  status: CourseStatus;
  createdAt: string;
  color?: string;
  attendanceRate?: number;
}

export interface DiscussionInfo {
  id: string;
  title: string;
  author: string;
  authorId: string;
  replies: number;
  lastActive: string;
  isPinned: boolean;
  content?: string;
}

export interface AppMockData {
  users: User[];
  courses: Course[];
  discussions: DiscussionInfo[];
  stats: {
    monthlyAttendance: Array<{month: string; rate: number}>;
    globalAttendanceRate: number;
  }
}

// In-memory global data store
export const database: AppMockData = {
  users: [
    { id: "u1", name: "Budi Santoso", email: "budi@std.uad.ac.id", role: "mahasiswa", prodi: "Teknik Informatika", nim: "2021010001", angkatan: "2021", status: "active", joinedAt: "Agt 2021" },
    { id: "u2", name: "Sari Dewi", email: "sari@std.uad.ac.id", role: "mahasiswa", prodi: "Teknik Informatika", nim: "2021010015", angkatan: "2021", status: "active", joinedAt: "Agt 2021" },
    { id: "u3", name: "Dr. Ahmad Rizki", email: "ahmad@uad.ac.id", role: "dosen", prodi: "Teknik Informatika", nip: "197801012005011001", status: "active", joinedAt: "Jan 2015" },
    { id: "u4", name: "Candra Maulana", email: "candra@std.uad.ac.id", role: "mahasiswa", prodi: "Sistem Informasi", nim: "2022020010", angkatan: "2022", status: "active", joinedAt: "Agt 2022" },
    { id: "u5", name: "Prof. Indah Pratiwi", email: "indah@uad.ac.id", role: "dosen", prodi: "Sistem Informasi", nip: "196912011998012001", status: "inactive", joinedAt: "Mar 2010" },
    { id: "u6", name: "Admin Utama", email: "admin@silab.id", role: "admin", status: "active", joinedAt: "Jan 2020" }
  ],
  courses: [
    { id: "c1", name: "Teknologi Web", code: "TI-301", dosenId: "u3", dosenName: "Dr. Ahmad Rizki", prodi: "Teknik Informatika", semester: "Genap 2025/2026", studentsCount: 32, status: "active", createdAt: "1 Agt 2025", color: "indigo", attendanceRate: 87.5 },
    { id: "c2", name: "Machine Learning Dasar", code: "TI-501", dosenId: "u5", dosenName: "Dr. Siti Rahayu", prodi: "Teknik Informatika", semester: "Genap 2025/2026", studentsCount: 0, status: "pending", createdAt: "3 Mar 2026", color: "blue", attendanceRate: 0 },
    { id: "c3", name: "Basis Data", code: "SI-202", dosenId: "u5", dosenName: "Prof. Indah Pratiwi", prodi: "Sistem Informasi", semester: "Genap 2025/2026", studentsCount: 28, status: "active", createdAt: "1 Agt 2025", color: "purple", attendanceRate: 92.8 },
    { id: "c4", name: "Pemrograman Web", code: "TI-302", dosenId: "u3", dosenName: "Dr. Ahmad Rizki", prodi: "Teknik Informatika", semester: "Gasal 2025/2026", studentsCount: 27, status: "active", createdAt: "1 Agt 2025", color: "emerald", attendanceRate: 81.5 },
  ],
  discussions: [
    { id: "d1", title: "Error 'Module not found' saat start Next.js", author: "Budi Santoso", authorId: "u1", replies: 5, lastActive: "10 menit lalu", isPinned: true },
    { id: "d2", title: "Cara submit tugas 2 (React Hooks)?", author: "Candra Maulana", authorId: "u4", replies: 2, lastActive: "1 jam lalu", isPinned: false },
    { id: "d3", title: "Perbedaan Server Component dan Client Component", author: "Sari Dewi", authorId: "u2", replies: 8, lastActive: "1 hari lalu", isPinned: false },
    { id: "d4", title: "Diskusi Bebas: Pengalaman pakai TailwindCSS", author: "Budi Santoso", authorId: "u1", replies: 12, lastActive: "2 hari lalu", isPinned: false },
  ],
  stats: {
    monthlyAttendance: [
      { month: "Okt 2025", rate: 85.2 },
      { month: "Nov 2025", rate: 87.4 },
      { month: "Des 2025", rate: 82.1 },
      { month: "Jan 2026", rate: 89.3 },
      { month: "Feb 2026", rate: 88.0 },
      { month: "Mar 2026", rate: 88.4 },
    ],
    globalAttendanceRate: 88.4
  }
};

// Utilities for mocking delay
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// ─────────────────────────────────────────────
// Shared dosen class data — single source of truth for all dosen pages
// ─────────────────────────────────────────────
export interface DosenClass {
  id: string;
  name: string;
  code: string;
  sks: number;
  semester: string;
  schedule: string;
  room: string;
  students: number;
  color: string;
  status: "active" | "inactive";
  description?: string;
}

export const DOSEN_CLASSES: DosenClass[] = [
  { id: "c1", name: "Teknologi Web", code: "TI-301", sks: 3, semester: "Genap 2025/2026", schedule: "Senin 08:00–09:40, Rabu 13:00–14:40", room: "Lab B-201", students: 32, color: "indigo", status: "active", description: "Mata kuliah ini membahas konsep dan teknologi pengembangan aplikasi web modern menggunakan framework berbasis JavaScript." },
  { id: "c2", name: "Basis Data", code: "TI-201", sks: 3, semester: "Genap 2025/2026", schedule: "Selasa 10:00–11:40, Kamis 14:00–15:40", room: "Lab A-101", students: 28, color: "emerald", status: "active", description: "Mata kuliah ini membahas konsep perancangan, pengelolaan, dan optimasi basis data relasional menggunakan SQL." },
  { id: "c3", name: "Pemrograman Web", code: "TI-401", sks: 3, semester: "Genap 2025/2026", schedule: "Rabu 08:00–09:40, Jumat 08:00–09:40", room: "Lab C-301", students: 27, color: "blue", status: "active", description: "Mata kuliah ini berfokus pada implementasi aplikasi web menggunakan teknologi front-end dan back-end modern." },
];

export type MatType = "dokumen" | "video" | "quiz" | "learning_path";

export interface DosenMaterial {
  id: string;
  title: string;
  type: MatType;
  course: string; // matches DosenClass.id
  order: number;
  published: boolean;
  createdAt: string;
}

export const DOSEN_MATERIALS: DosenMaterial[] = [
  { id: "m1", title: "Pengenalan Next.js 15 dan App Router", type: "dokumen", course: "c1", order: 1, published: true, createdAt: "1 Mar 2026" },
  { id: "m2", title: "Video Tutorial: Setup Next.js Project", type: "video", course: "c1", order: 2, published: true, createdAt: "2 Mar 2026" },
  { id: "m3", title: "Quiz: Konsep Dasar Next.js", type: "quiz", course: "c1", order: 3, published: false, createdAt: "3 Mar 2026" },
  { id: "m4", title: "Normalisasi Database", type: "dokumen", course: "c2", order: 1, published: true, createdAt: "28 Feb 2026" },
  { id: "m5", title: "SQL JOIN Operations", type: "video", course: "c2", order: 2, published: true, createdAt: "2 Mar 2026" },
  { id: "m6", title: "Dasar-dasar HTML & CSS", type: "learning_path", course: "c3", order: 1, published: true, createdAt: "25 Feb 2026" },
];

