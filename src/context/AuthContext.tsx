"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export type UserRole = "mahasiswa" | "dosen" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  /** NIM — only for mahasiswa */
  nim?: string;
  /** NIP — only for dosen/admin */
  nip?: string;
  title?: string;
  prodi?: string;
  angkatan?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

// ─────────────────────────────────────────────
// Mock user database (3 accounts for demo)
// ─────────────────────────────────────────────

export const MOCK_USERS: Array<User & { password: string }> = [
  {
    id: "mhs-001",
    name: "Budi Santoso",
    email: "mahasiswa@silab.id",
    password: "mahasiswa123",
    role: "mahasiswa",
    nim: "2021010001",
    prodi: "Teknik Informatika",
    angkatan: "2021",
    title: "Mahasiswa Semester 6",
  },
  {
    id: "dsn-001",
    name: "Dr. Ahmad Rizki",
    email: "dosen@silab.id",
    password: "dosen123",
    role: "dosen",
    nip: "197801012005011001",
    prodi: "Teknik Informatika",
    title: "Dosen Teknik Informatika",
  },
  {
    id: "adm-001",
    name: "Admin SI Lab",
    email: "admin@silab.id",
    password: "admin123",
    role: "admin",
    nip: "198001012010011001",
    title: "Administrator",
  },
];

// ─────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────

const AuthContext = createContext<AuthContextType | null>(null);

const USER_STORAGE_KEY = "silab-auth-user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore user from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 600));

      const found = MOCK_USERS.find(
        (u) => u.email === email.trim().toLowerCase() && u.password === password
      );

      if (!found) {
        return { success: false, error: "Email atau password salah." };
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _pw, ...userWithoutPassword } = found;
      setUser(userWithoutPassword);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
      return { success: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
