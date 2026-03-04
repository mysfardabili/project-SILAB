"use server"

import { cookies } from "next/headers"

const COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 1 week
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set("auth-token", token, COOKIE_OPTS)
}

export async function setRoleCookie(role: string) {
  const cookieStore = await cookies()
  cookieStore.set("user-role", role, COOKIE_OPTS)
}

export async function getAuthCookie() {
  const cookieStore = await cookies()
  return cookieStore.get("auth-token")
}

export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("auth-token")
  cookieStore.delete("user-role")
}

export async function isAuthenticated() {
  const cookieStore = await cookies()
  return cookieStore.has("auth-token")
}