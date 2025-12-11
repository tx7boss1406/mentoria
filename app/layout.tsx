import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "TX7Boss - Funis Gamificados que Convertem",
  description:
    "Descubra como criar funis de conversão gamificados que prendem atenção e geram resultados. Jogue e aprenda com TX7Boss.",
  keywords: "marketing digital, funis de conversão, gamificação, TX7Boss, automação, tráfego pago",
  authors: [{ name: "TX7Boss" }],
  openGraph: {
    title: "TX7Boss - Funis Gamificados que Convertem",
    description: "Descubra como criar funis de conversão gamificados que prendem atenção e geram resultados.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TX7Boss - Funis Gamificados que Convertem",
    description: "Descubra como criar funis de conversão gamificados que prendem atenção e geram resultados.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  )
}
