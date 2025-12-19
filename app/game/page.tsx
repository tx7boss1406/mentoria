"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Link from "next/link"
import { RotateCcw } from "lucide-react"

interface GameState {
  isPlaying: boolean
  score: number
  money: number
  gameOver: boolean
  birdY: number
  birdVelocity: number
  pipes: Array<{ x: number; height: number; passed: boolean }>
}

export default function GamePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [gameState, setGameState] = useState<GameState>({
    isPlaying: false,
    score: 0,
    money: 0,
    gameOver: false,
    birdY: 250,
    birdVelocity: 0,
    pipes: [],
  })
  const [showGameOverModal, setShowGameOverModal] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 400, height: 500 })
  const [showCountdown, setShowCountdown] = useState(false)
  const [countdown, setCountdown] = useState(3)
  const [waitingFirstTap, setWaitingFirstTap] = useState(false)
  const [hasGameStarted, setHasGameStarted] = useState(false)



  const GRAVITY = 0.5
  const JUMP_FORCE = -8
  const PIPE_WIDTH = 60
  const PIPE_GAP = 150
  const PIPE_SPEED = 2
  const MONEY_PER_PIPE = 12

  // ================= VISUAL STATE (FORA DO DRAW) =================

// ☁️ Clouds (parallax layers)
const clouds = [
  { x: 40, y: 50, scale: 0.9, opacity: 0.35, speed: 0.03 },
  { x: 160, y: 35, scale: 1.1, opacity: 0.3, speed: 0.025 },
  { x: 280, y: 70, scale: 0.8, opacity: 0.35, speed: 0.028 },

  { x: 90, y: 120, scale: 1.4, opacity: 0.6, speed: 0.06 },
  { x: 240, y: 150, scale: 1.6, opacity: 0.55, speed: 0.055 }
]

// ✨ Stars (night)
const stars = Array.from({ length: 40 }, () => ({
  x: Math.random() * canvasSize.width,
  y: Math.random() * 200,
  size: Math.random() * 1.5 + 0.5,
  opacity: Math.random()
}))

// 🌬️ Floating particles (ambient)
const particles = Array.from({ length: 20 }, () => ({
  x: Math.random() * canvasSize.width,
  y: Math.random() * canvasSize.height,
  speed: Math.random() * 0.15 + 0.05,
  size: Math.random() * 2 + 1,
  opacity: Math.random() * 0.2 + 0.05
}))


  // Adjust canvas size for mobile
  useEffect(() => {
    const updateCanvasSize = () => {
      const isMobile = window.innerWidth < 640
      const width = isMobile ? Math.min(350, window.innerWidth - 32) : 400
      const height = isMobile ? Math.min(450, window.innerHeight - 200) : 500
      setCanvasSize({ width, height })
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)
    return () => window.removeEventListener("resize", updateCanvasSize)
  }, [])

  const initGame = useCallback(() => {
    setGameState({
      isPlaying: true,
      score: 0,
      money: 0,
      gameOver: false,
      birdY: canvasSize.height / 2,
      birdVelocity: 0,
      pipes: [{ x: canvasSize.width, height: 200, passed: false }],
    })
    setShowGameOverModal(false)
  }, [canvasSize])

  const jump = useCallback(() => {
    if (!gameState.gameOver && gameState.isPlaying) {
      setGameState((prev) => ({
        ...prev,
        birdVelocity: JUMP_FORCE,
      }))
    }
  }, [gameState.gameOver, gameState.isPlaying])

  const gameLoop = useCallback(() => {
    if (!gameState.isPlaying || gameState.gameOver) return

    setGameState((prev) => {
      const newState = { ...prev }

      // Update bird physics
      newState.birdVelocity += GRAVITY
      newState.birdY += newState.birdVelocity

      // Check ground/ceiling collision
      if (newState.birdY > canvasSize.height - 50 || newState.birdY < 0) {
        newState.gameOver = true
        setShowGameOverModal(true)
        return newState
      }

      // Update pipes
      newState.pipes = newState.pipes.map((pipe) => ({
        ...pipe,
        x: pipe.x - PIPE_SPEED,
      }))

      // Add new pipes
      if (newState.pipes.length === 0 || newState.pipes[newState.pipes.length - 1].x < canvasSize.width / 2) {
        newState.pipes.push({
          x: canvasSize.width,
          height: Math.random() * 200 + 100,
          passed: false,
        })
      }

      // Remove off-screen pipes
      newState.pipes = newState.pipes.filter((pipe) => pipe.x > -PIPE_WIDTH)

      // Check pipe collision and scoring
      newState.pipes.forEach((pipe) => {
        // Check if bird passed pipe
        if (!pipe.passed && pipe.x + PIPE_WIDTH < 50) {
          pipe.passed = true
          newState.score += 1
          newState.money += MONEY_PER_PIPE
        }

        // Check collision
        if (
          50 > pipe.x &&
          50 < pipe.x + PIPE_WIDTH &&
          (newState.birdY < pipe.height || newState.birdY > pipe.height + PIPE_GAP)
        ) {
          newState.gameOver = true
          setShowGameOverModal(true)
        }
      })

      return newState
    })
  }, [gameState.isPlaying, gameState.gameOver, canvasSize])

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

   // ================= BACKGROUND (PREMIUM REALISTA) =================

// 🎯 Progress (0 → 1)
const progress = Math.min(gameState.score / 20, 1)

// 🌈 Sky (deep, cinematic: day → sunset → night)
const skyGradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
skyGradient.addColorStop(
  0,
  `rgb(${185 - progress * 120}, ${225 - progress * 140}, ${255 - progress * 190})`
)
skyGradient.addColorStop(
  0.55,
  `rgb(${120 - progress * 70}, ${200 - progress * 160}, ${245 - progress * 220})`
)
skyGradient.addColorStop(
  1,
  `rgb(${30 + progress * 10}, ${60 + progress * 25}, ${120 + progress * 45})`
)

ctx.globalAlpha = 1
ctx.shadowBlur = 0
ctx.fillStyle = skyGradient
ctx.fillRect(0, 0, canvas.width, canvas.height)

// 🌫️ Atmospheric depth
ctx.fillStyle = `rgba(255,255,255,${0.08 - progress * 0.05})`
ctx.fillRect(0, 0, canvas.width, canvas.height)

// ☀️🌙 Celestial body (fixed)
const cx = canvas.width - 80
const cy = 80
const radius = 36

// ☀️ Sun (real glow, no movement)
if (progress < 0.65) {
  ctx.globalAlpha = 1 - progress * 1.2

  const sunGlow = ctx.createRadialGradient(cx, cy, 8, cx, cy, 90)
  sunGlow.addColorStop(0, "rgba(255,255,255,0.95)")
  sunGlow.addColorStop(0.4, "rgba(253,224,71,0.7)")
  sunGlow.addColorStop(1, "rgba(253,224,71,0)")

  ctx.fillStyle = sunGlow
  ctx.beginPath()
  ctx.arc(cx, cy, 90, 0, Math.PI * 2)
  ctx.fill()

  const sunCore = ctx.createRadialGradient(cx, cy, 6, cx, cy, radius)
  sunCore.addColorStop(0, "#ffffff")
  sunCore.addColorStop(1, "#fde047")

  ctx.fillStyle = sunCore
  ctx.beginPath()
  ctx.arc(cx, cy, radius, 0, Math.PI * 2)
  ctx.fill()
}

// 🌙 Moon (real crescent with physical shadow)
if (progress > 0.55) {
  ctx.globalAlpha = (progress - 0.55) * 1.6

  const moonGrad = ctx.createRadialGradient(
    cx - 6,
    cy - 6,
    6,
    cx,
    cy,
    radius
  )
  moonGrad.addColorStop(0, "#f9fafb")
  moonGrad.addColorStop(1, "#d1d5db")

  ctx.fillStyle = moonGrad
  ctx.beginPath()
  ctx.arc(cx, cy, radius * 0.95, 0, Math.PI * 2)
  ctx.fill()

  // Shadow cut → crescent
  ctx.globalCompositeOperation = "destination-out"
  ctx.beginPath()
  ctx.arc(cx + 14, cy - 2, radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalCompositeOperation = "source-over"

  // Moon glow
  const moonGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, 80)
  moonGlow.addColorStop(0, "rgba(255,255,255,0.25)")
  moonGlow.addColorStop(1, "rgba(255,255,255,0)")

  ctx.fillStyle = moonGlow
  ctx.beginPath()
  ctx.arc(cx, cy, 80, 0, Math.PI * 2)
  ctx.fill()
}

ctx.globalAlpha = 1

// ☁️ Clouds (soft volume + light)
const drawCloud = (
  x: number,
  y: number,
  scale: number,
  opacity: number
) => {
  ctx.save()
  ctx.globalAlpha = opacity

  const cloudGrad = ctx.createRadialGradient(
    x + 20 * scale,
    y - 10 * scale,
    10,
    x + 20 * scale,
    y,
    50 * scale
  )
  cloudGrad.addColorStop(0, "#ffffff")
  cloudGrad.addColorStop(1, "#e5e7eb")

  ctx.fillStyle = cloudGrad

  ctx.beginPath()
  ctx.arc(x, y, 22 * scale, 0, Math.PI * 2)
  ctx.arc(x + 24 * scale, y - 6 * scale, 28 * scale, 0, Math.PI * 2)
  ctx.arc(x + 52 * scale, y, 22 * scale, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

clouds.forEach((cloud) => {
  cloud.x += cloud.speed
  if (cloud.x > canvas.width + 120) cloud.x = -120
  drawCloud(cloud.x, cloud.y, cloud.scale, cloud.opacity)
})

// ✨ Stars (smooth night reveal)
if (progress > 0.6) {
  stars.forEach((star) => {
    ctx.globalAlpha = (progress - 0.6) * star.opacity
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
    ctx.fill()
  })
}
ctx.globalAlpha = 1

// 🌬️ Particles (very subtle)
ctx.fillStyle = "rgba(255,255,255,0.12)"
particles.forEach((p) => {
  p.y -= p.speed
  if (p.y < -10) p.y = canvas.height + 10 

  ctx.beginPath()
  ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
  ctx.fill()
})


// ================= GAME OBJECTS =================

// 🟩 Pipes (SEM ALTERAR LÓGICA)
gameState.pipes.forEach((pipe) => {
  ctx.fillStyle = "#4ade80"
  ctx.fillRect(pipe.x, 0, PIPE_WIDTH, pipe.height)
  ctx.fillRect(pipe.x, pipe.height + PIPE_GAP, PIPE_WIDTH, canvas.height - pipe.height - PIPE_GAP)

  ctx.fillStyle = "#22c55e"
  ctx.fillRect(pipe.x, pipe.height - 6, PIPE_WIDTH, 6)
  ctx.fillRect(pipe.x, pipe.height + PIPE_GAP, PIPE_WIDTH, 6)
})

// 🐤 Bird (SEM ALTERAR POSIÇÃO)
const bx = 50
const by = gameState.birdY

ctx.fillStyle = "#facc15"
ctx.beginPath()
ctx.arc(bx, by, 12, 0, Math.PI * 2)
ctx.fill()

ctx.fillStyle = "#000"
ctx.beginPath()
ctx.arc(bx + 4, by - 2, 2, 0, Math.PI * 2)  
ctx.fill()

ctx.fillStyle = "#fb923c"
ctx.beginPath()
ctx.moveTo(bx + 12, by)
ctx.lineTo(bx + 18, by - 2)
ctx.lineTo(bx + 18, by + 2)
ctx.fill()

ctx.globalAlpha = 1
ctx.shadowBlur = 0



    ctx.shadowBlur = 0
  }, [gameState])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
       if (waitingFirstTap) {
  setWaitingFirstTap(false)
  setGameState((prev) => ({
    ...prev,
    isPlaying: true,
    birdVelocity: JUMP_FORCE, // 🔥 PRIMEIRO CLIQUE JÁ PULA
  }))
  return
}

if (gameState.isPlaying) {
  jump()
}

      }
    }

    const handleClick = () => {
      if (waitingFirstTap) {
  setWaitingFirstTap(false)
 if (waitingFirstTap) {
  setWaitingFirstTap(false)
  setGameState((prev) => ({
    ...prev,
    isPlaying: true,
    birdVelocity: JUMP_FORCE, // 🔥 PRIMEIRO CLIQUE JÁ PULA
  }))
  return
}
 setGameState((prev) => ({ ...prev, isPlaying: true }))
  return
}

if (gameState.isPlaying) {
  jump()
}

    }

    const handleTouch = (e: TouchEvent) => {
      e.preventDefault()
     if (waitingFirstTap) {
  setWaitingFirstTap(false)
 if (waitingFirstTap) {
  setWaitingFirstTap(false)
  setGameState((prev) => ({
    ...prev,
    isPlaying: true,
    birdVelocity: JUMP_FORCE, // 🔥 PRIMEIRO CLIQUE JÁ PULA
  }))
  return
}
 setGameState((prev) => ({ ...prev, isPlaying: true }))
  return
}

if (gameState.isPlaying) {
  jump()
}

    }

    window.addEventListener("keydown", handleKeyPress)
    const canvas = canvasRef.current
    if (canvas) {
      canvas.addEventListener("click", handleClick)
      canvas.addEventListener("touchstart", handleTouch)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress)
      if (canvas) {
        canvas.removeEventListener("click", handleClick)
        canvas.removeEventListener("touchstart", handleTouch)
      }
    }
}, [gameState.isPlaying, waitingFirstTap, jump])

 useEffect(() => {
  const animate = () => {
    if (gameState.isPlaying) {
      gameLoop()
    }
    draw()
    animationRef.current = requestAnimationFrame(animate)
  }

  animationRef.current = requestAnimationFrame(animate)

  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }
}, [gameLoop, draw, gameState.isPlaying])


 useEffect(() => {
  if (!showCountdown) return

  if (countdown > 0) {
    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }

  // Quando chegar no 0
  if (countdown === 0) {
    const timer = setTimeout(() => {
      setShowCountdown(false)
      setCountdown(3)

      // prepara o jogo, MAS NÃO COMEÇA
      setGameState((prev) => ({
        ...prev,
        isPlaying: false,
        gameOver: false,
        birdY: canvasSize.height / 2,
        birdVelocity: 0,
        pipes: [{ x: canvasSize.width, height: 200, passed: false }],
        score: 0,
        money: 0,
      }))

      setWaitingFirstTap(true)
    }, 500)

    return () => clearTimeout(timer)
  }
}, [showCountdown, countdown, canvasSize])

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />

     {!showGameOverModal && (
  <>
    {/* Score Display - Mobile optimized */}
    <div className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs sm:max-w-sm px-4">
      <Card className="bg-black/80 border-purple-500/50 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3">
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-lime-400 mb-1">
            💰 SALDO: R${gameState.money.toFixed(2)}
          </div>
          <div className="text-xs sm:text-sm text-cyan-400">
            Obstáculos: {gameState.score}
          </div>
        </div>
      </Card>
    </div>

    {/* Game Canvas - Mobile responsive */}
    <div className="flex items-center justify-center min-h-screen p-4 pt-20 pb-24">
     <div className="relative">
  <canvas
    ref={canvasRef}
    width={canvasSize.width}
    height={canvasSize.height}
    className="border-2 border-purple-500/50 rounded-lg shadow-2xl shadow-purple-500/25 cursor-pointer touch-none"
  />

  {/* COUNTDOWN OVERLAY */}
  {showCountdown && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg z-30">
      <div className="text-6xl font-extrabold text-lime-400 animate-pulse">
        {countdown === 0 ? "GO!" : countdown}
      </div>
    </div>
  )}

  {/* START SCREEN */}
{!hasGameStarted && !showCountdown && (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg z-20">
      <div className="text-center px-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          TX7 MONEY GAME
        </h2>
        <p className="text-gray-300 mb-6 text-sm sm:text-base">
          Toque ou pressione ESPAÇO para voar
        </p>
        <Button
  onClick={() => {
    setHasGameStarted(true)
    setShowCountdown(true)
  }}
  className="touch-button bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-full"
>
  🎮 COMEÇAR
</Button>

      </div>
    </div>
  )}
</div>
    </div>

    {/* Instructions - Mobile optimized */}
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-20 w-full max-w-xs sm:max-w-md px-4">
      <Card className="bg-black/80 border-cyan-500/30 backdrop-blur-sm px-3 sm:px-4 py-2">
        <p className="text-cyan-400 text-xs sm:text-sm text-center">
        {waitingFirstTap
  ? "Toque para começar a voar"
  : gameState.isPlaying
  ? "Toque ou ESPAÇO para voar • +R$12,00 por obstáculo"
  : "Toque para começar"}


        </p>
      </Card>
    </div>
  </>
)}

     {/* Game Over Modal - Mobile optimized */}
<Dialog open={showGameOverModal} onOpenChange={setShowGameOverModal}>
  <DialogContent
    className="
      bg-black 
      border-2 border-purple-500 
      w-[92%] 
      max-w-[360px]
      mx-auto
      rounded-2xl
      px-4 py-6
      flex flex-col items-center
      text-center
    "
  >
    <DialogHeader>
      <DialogTitle className="text-center text-lg font-extrabold text-white leading-tight">
        ⚡ Seu cérebro acabou de sentir o poder de um *funil diferente*...
      </DialogTitle>
    </DialogHeader>

    {/* SCORE CARD */}
    <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 rounded-xl border border-purple-500/30 w-full">
      <div className="text-lime-400 text-lg font-bold mb-1">
        💰 Você acumulou: R${gameState.money.toFixed(2)}
      </div>
      <div className="text-cyan-400 text-sm">
        Obstáculos superados: {gameState.score}
      </div>
    </div>

    {/* TEXTO */}
    <p className="text-gray-200 text-sm leading-snug mt-3 w-full px-1 text-center">
  O que você acabou de sentir
  <br />
  <span className="text-lime-400 font-bold">
    não foi só um jogo.
  </span>
  <br />
  Foi uma prova real de como o cérebro reage quando você usa estímulos certos.
</p>


    {/* CTA */}
    <div className="text-white text-base font-extrabold mt-4 w-full px-2 leading-snug">
      🔍 Quer descobrir os bastidores do que acabou de acontecer?
    </div>

    {/* BUTTONS */}
    <div className="space-y-3 mt-4 w-full">

      {/* Ver Estratégia */}
      <Link href="/quiz">
        <Button
          className="
            w-full 
            bg-gradient-to-r from-purple-600 to-cyan-600 
            hover:from-purple-500 hover:to-cyan-500
            text-white font-bold py-3 rounded-full text-sm
          "
        >
          🚀 Ver Estratégia
        </Button>
      </Link>

      {/* Revelar Bastidores */}
      <Link href="/quiz">
        <Button
          variant="outline"
          className="
            w-full 
            bg-transparent 
            border-2 border-cyan-400 
            text-cyan-400 
            hover:bg-cyan-400 hover:text-black 
            font-bold py-3 rounded-full text-sm
          "
        >
          📈 Revelar bastidores
        </Button>
      </Link>

      {/* Jogar de novo */}
      <Button
        onClick={() => {
          setShowGameOverModal(false)
          setShowCountdown(true)
        }}
        variant="outline" className="w-full touch-button bg-transparent border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black font-bold py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"

      >
        <RotateCcw className="mr-2 h-4 w-4" /> 🔁 Jogar de novo
      </Button>
    </div>
  </DialogContent>
</Dialog>

    </div>
  )
}
