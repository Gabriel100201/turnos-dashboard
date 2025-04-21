"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/lib/auth-action"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const result = await register(email, password, name)
      if (result.success) {
        router.push("/dashboard")
        router.refresh()
      } else {
        setError(result.error || "Failed to register")
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
          <h1 className="font-bold text-3xl">Register</h1>
          <p className="mt-2 text-muted-foreground">Create a new account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" type="text" placeholder="John Doe" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="name@example.com" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required disabled={isLoading} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" required disabled={isLoading} />
          </div>

          {error && <div className="bg-destructive/15 p-3 rounded-md text-destructive text-sm">{error}</div>}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </Button>

          <div className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

