"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Play, Gamepad2, Zap } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Cyberpunk Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute inset-0 bg-grid-cyber opacity-50" />

      {/* Glitch Effect - Adjusted for mobile */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-16 sm:w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30 animate-pulse" />
        <div className="absolute top-3/4 right-1/4 w-12 sm:w-24 h-1 bg-gradient-to-r from-transparent via-lime-400 to-transparent opacity-40 animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 container-mobile py-6 sm:py-8 min-h-screen flex flex-col justify-center items-center text-center">
        {/* Logo */}
        <div className="mb-6 sm:mb-8">
          <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
        </div>

        {/* Hero Title - Mobile optimized */}
        <div className="mb-6 sm:mb-8 max-w-full px-2">
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent animate-pulse">
              🚀 JOGUE E DESCUBRA
            </span>
            <br />
            <span className="text-white drop-shadow-2xl text-xl sm:text-2xl md:text-4xl lg:text-5xl">
              COMO LUCRAR TODO DIA
            </span>
            <br />
            <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent text-lg sm:text-xl md:text-3xl lg:text-4xl">
              COM ESTRATÉGIAS SECRETAS
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
            Você está prestes a descobrir o segredo que os top players usam para ganhar dinheiro com funis ocultos.
            Prepare-se.
          </p>
        </div>

        {/* CTA Button - Touch optimized */}
        <div className="mb-8 sm:mb-12 w-full max-w-sm px-4">
          <Link href="/game">
            <Button
              size="lg"
              className="w-full touch-button bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-4 px-6 sm:px-8 rounded-full text-lg md:text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-purple-400/50 hover:border-purple-300"
            >
              <Gamepad2 className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6" />🎮 COMEÇAR O JOGO
            </Button>
          </Link>
        </div>

        {/* Features Grid - Mobile optimized */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-4xl w-full px-2">
  
  <Card className="bg-black/50 border-purple-500/30 p-4 sm:p-6 backdrop-blur-sm hover:border-purple-400/50 hover:scale-[1.02] hover:bg-black/60 transition-all duration-300">
    <div className="text-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-purple-500/20">
        <Play className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <h3 className="text-white font-bold mb-2 text-sm sm:text-base">
        Jogo Interativo Exclusivo
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm">
        Descubra na prática como a gamificação transforma atenção em conversão — em segundos.
      </p>
    </div>
  </Card>

  <Card className="bg-black/50 border-cyan-500/30 p-4 sm:p-6 backdrop-blur-sm hover:border-cyan-400/50 hover:scale-[1.02] hover:bg-black/60 transition-all duration-300">
    <div className="text-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-cyan-500/20">
        <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </div>
      <h3 className="text-white font-bold mb-2 text-sm sm:text-base">
        Técnicas Avançadas Ocultas
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm">
        Aprenda estratégias que os top players usam para gerar vendas todos os dias — sem depender da sorte.
      </p>
    </div>
  </Card>

  <Card className="bg-black/50 border-lime-500/30 p-4 sm:p-6 backdrop-blur-sm hover:border-lime-400/50 hover:scale-[1.02] hover:bg-black/60 transition-all duration-300 sm:col-span-2 lg:col-span-1">
    <div className="text-center">
      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-lime-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg shadow-lime-500/20">
        <span className="text-white font-bold text-lg sm:text-xl">💰</span>
      </div>
      <h3 className="text-white font-bold mb-2 text-sm sm:text-base">
        Resultados Que Escalam
      </h3>
      <p className="text-gray-300 text-xs sm:text-sm">
        Entenda como aplicar as técnicas e transformar tráfego em lucro real — todos os dias.
      </p>
    </div>
  </Card>

</div>


        {/* Bottom CTA - Mobile optimized */}
        <div className="mt-8 sm:mt-12 text-center w-full max-w-sm px-4">
          <p className="text-gray-400 mb-4 text-sm sm:text-base">Pronto para descobrir o segredo?</p>
          <Link href="/game">
            <Button
              variant="outline"
              className="w-full touch-button bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black font-bold py-3 px-6 rounded-full transition-all duration-300 hover:shadow-cyan-400/25 hover:shadow-lg text-sm sm:text-base"
            >
              Iniciar Experiência
            </Button>
          </Link>
        </div>
      </div>

      {/* Floating Elements - Adjusted for mobile */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" />
      <div className="absolute top-32 sm:top-40 right-12 sm:right-20 w-2 sm:w-3 h-2 sm:h-3 bg-cyan-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-24 sm:bottom-32 left-12 sm:left-20 w-2 h-2 bg-lime-400 rounded-full animate-bounce opacity-80" />
      <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-10 w-3 sm:w-4 h-3 sm:h-4 bg-red-400 rounded-full animate-pulse opacity-50" />
    </div>
  )
}
