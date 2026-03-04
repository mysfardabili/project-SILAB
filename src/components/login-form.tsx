"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { setAuthCookie, setRoleCookie } from "@/lib/auth"
import { useAuth } from "@/context/AuthContext"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()
  const { login, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("Email dan password harus diisi.")
      return
    }

    setIsLoading(true)

    try {
      const result = await login(email, password)

      if (!result.success) {
        setError(result.error ?? "Login gagal. Silakan coba lagi.")
        return
      }

      // Set auth cookie for middleware route protection
      await setAuthCookie("silab-auth-token")

      // Determine role from MOCK_USERS via login result (role is set in AuthContext after login)
      // We use the email to look up role since user state may not be updated yet (async setState)
      const trimmedEmail = email.trim().toLowerCase()
      let role: string = "mahasiswa"
      if (trimmedEmail === "dosen@silab.id") role = "dosen"
      else if (trimmedEmail === "admin@silab.id") role = "admin"

      // Save role to cookie so middleware can enforce role-based routing
      await setRoleCookie(role)

      // Role-based redirect
      if (role === "dosen") {
        router.push("/dosen/dashboard")
      } else if (role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/dashboard/home")
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a href="#" className="flex flex-col items-center gap-2 font-medium">
              <Image
                className="dark:invert"
                src="/silab-logo.svg"
                alt="Si Lab logo"
                width={180}
                height={38}
                priority
              />
              <span className="sr-only">SI Lab UAD</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to SI Lab</h1>
            <div className="text-center text-sm">
              Belum punya akun?{" "}
              <a href="/register" className="underline underline-offset-4">
                Daftar
              </a>
            </div>
          </div>

          {/* Demo accounts info */}
          <div className="rounded-lg border border-indigo-100 bg-indigo-50 p-3 text-xs text-indigo-700 space-y-1">
            <p className="font-semibold">Akun Demo:</p>
            <p>Mahasiswa: mahasiswa@silab.id / mahasiswa123</p>
            <p>Dosen: dosen@silab.id / dosen123</p>
            <p>Admin: admin@silab.id / admin123</p>
          </div>

          <div className="flex flex-col gap-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md border border-red-100">
                {error}
              </div>
            )}
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="mahasiswa@silab.id"
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Masuk..." : "Masuk"}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-muted-foreground text-center text-xs text-balance">
        Dengan masuk, Anda menyetujui{" "}
        <a href="/terms" className="underline underline-offset-4 hover:text-primary">
          Ketentuan Layanan
        </a>{" "}
        dan{" "}
        <a href="/privacy" className="underline underline-offset-4 hover:text-primary">
          Kebijakan Privasi
        </a>{" "}
        kami.
      </div>
    </div>
  )
}