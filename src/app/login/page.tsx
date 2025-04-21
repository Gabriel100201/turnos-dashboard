"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/auth-action"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await login(email, password)
      console.log(result);
      if (result.success) {
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Failed to login")
      }
    } catch (error) {
      console.log(error);
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-4 min-h-screen">
      <div className="space-y-8 bg-card shadow-md p-6 border rounded-lg w-full max-w-md">
        <div className="text-center">
          <h1 className="font-bold text-3xl">Login</h1>
          <p className="mt-2 text-muted-foreground">Ingrese sus credenciales a continuación</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="nombre@ejemplo.com" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input id="password" name="password" type="password" placeholder="••••••••" required disabled={isLoading} />
          </div>

          {error && <div className="bg-destructive/15 p-3 rounded-md text-destructive text-sm">{error}</div>}

          <Button type="submit" variant={"outline"} className="w-full hover:cursor-pointer" disabled={isLoading}>
            {isLoading ? "Iniciando Sesión..." : "Ingresar"}
          </Button>
        </form>
      </div>
    </div>
  )
}

