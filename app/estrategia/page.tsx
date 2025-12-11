"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function EstrategiaPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/quiz")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Redirecionando...</div>
    </div>
  )
}
