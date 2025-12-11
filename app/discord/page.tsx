"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Hash, Volume2, Settings, Users, MicOff, Headphones, Menu, X } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  user: string
  role: string
  color: string
  content: string
  timestamp: string
}

const teamMembers = [
  { name: "@tx7boss", role: "DONO", color: "text-red-400", status: "online" },
  { name: "Lucas", role: "PROGRAMADOR", color: "text-purple-400", status: "online" },
  { name: "Pedro", role: "DESIGNER", color: "text-pink-400", status: "online" },
  { name: "Marina", role: "CRIATIVOS", color: "text-orange-400", status: "online" },
  { name: "Felipe", role: "AUTOMAÇÃO", color: "text-cyan-400", status: "online" },
  { name: "Carla", role: "CEO", color: "text-lime-400", status: "online" },
]

const messages: Omit<Message, "id" | "timestamp">[] = [
  {
    user: "@tx7boss",
    role: "DONO",
    color: "text-red-400",
    content: "A partir de agora, você opera com a gente. Aqui é execução em alta pressão, e resultado aparece rápido pra quem acompanha o ritmo.",
  },
  {
    user: "Lucas",
    role: "PROGRAMADOR",
    color: "text-purple-400",
    content: "Vem comigo montar uma oferta do zero usando IA. Depois a gente modela junto até ficar no nível da operação.",
  },
  {
    user: "Pedro",
    role: "DESIGNER",
    color: "text-pink-400",
    content: "As novas artes estão no ponto. Visual de alta conversão pronto pra rodar hoje.",
  },
  { user: "Carla", role: "CEO", color: "text-lime-400", content: "O objetivo é simples: resultado em tempo real." },
  {
    user: "Felipe",
    role: "AUTOMAÇÃO",
    color: "text-cyan-400",
    content: "Fluxo de WhatsApp conectado, checkout funcionando.",
  },
  {
    user: "Marina",
    role: "CRIATIVOS",
    color: "text-orange-400",
    content: "Criativos revisados. Tudo otimizado pra segurar o lead nos primeiros 2 segundos.",
  },
  {
    user: "@tx7boss",
    role: "DONO",
    color: "text-red-400",
    content: "Aqui você não assiste curso. Você opera junto com a gente.",
  },
]

export default function DiscordPage() {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [typingUser, setTypingUser] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [membersOpen, setMembersOpen] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento inicial
    const initialTimer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 1000)

    return () => clearTimeout(initialTimer)
  }, [])

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (sidebarOpen && !target.closest(".sidebar") && !target.closest(".menu-button")) {
        setSidebarOpen(false)
      }
      if (membersOpen && !target.closest(".members-panel") && !target.closest(".members-button")) {
        setMembersOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen, membersOpen])

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen)
    setMembersOpen(false) // Sempre fecha membros ao abrir sidebar
  }

  const handleMembersToggle = () => {
    setMembersOpen(!membersOpen)
    setSidebarOpen(false) // Sempre fecha sidebar ao abrir membros
  }

  useEffect(() => {
    if (currentMessageIndex < messages.length) {
      const timer = setTimeout(() => {
        const message = messages[currentMessageIndex]
        setIsTyping(true)
        setTypingUser(message.user)

        // Simulate typing delay
        const typingTimer = setTimeout(
          () => {
            setDisplayedMessages((prev) => [
              ...prev,
              {
                ...message,
                id: currentMessageIndex,
                timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
              },
            ])
            setIsTyping(false)
            setTypingUser("")
            setCurrentMessageIndex((prev) => prev + 1)
          },
          1500 + Math.random() * 1000,
        )

        return () => clearTimeout(typingTimer)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [currentMessageIndex])

  return (
    <div className="min-h-screen bg-gray-800 flex relative overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSidebarToggle}
              className={`menu-button p-2 ${sidebarOpen ? "bg-gray-700" : ""}`}
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
            <div>
              <h1 className="text-white font-bold text-lg">TX7BOSS OPERAÇÃO</h1>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-green-400 text-sm">{teamMembers.length} online</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMembersToggle}
            className={`members-button p-2 ${membersOpen ? "bg-gray-700" : ""}`}
          >
            <Users className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>

      {/* Sidebar - Mobile responsive with improved design */}
      <div
        className={`sidebar fixed lg:relative z-40 w-64 bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col transition-all duration-300 ease-out shadow-2xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Server Header - Desktop only */}
        <div className="hidden lg:block p-4 border-b border-slate-700/50 bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🔥</span>
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">TX7BOSS OPERAÇÃO</h1>
              <div className="flex items-center mt-1">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">{teamMembers.length} membros online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile close button */}
        <div className="lg:hidden p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">🔥</span>
            </div>
            <span className="text-white font-semibold text-lg">TX7BOSS</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400 hover:text-white" />
          </Button>
        </div>

        {/* Channels */}
        <div className="flex-1 p-3 overflow-y-auto custom-scrollbar">
          {/* Mentoria Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3 px-2">
              <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Mentoria Ao Vivo</h3>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs">📅</span>
                </div>
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  Lives Diárias
                </span>
              </div>

              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded mr-3 flex items-center justify-center">
                  <Users className="h-3 w-3 text-white" />
                </div>
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  Membros
                </span>
                <div className="ml-auto bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {teamMembers.length}
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded mr-3 flex items-center justify-center">
                  <span className="text-white text-xs">⚡</span>
                </div>
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  Mentoria Ativa
                </span>
              </div>
            </div>
          </div>

          {/* Lobby Section */}
          <div className="mb-6">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2">Lobby</h3>
            <div className="space-y-1">
              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Hash className="h-4 w-4 text-slate-400 mr-3 group-hover:text-orange-400 transition-colors" />
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  🎉 boas-vindas
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Hash className="h-4 w-4 text-slate-400 mr-3 group-hover:text-yellow-400 transition-colors" />
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  ⭐ links-e-plugins
                </span>
              </div>
              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Hash className="h-4 w-4 text-slate-400 mr-3 group-hover:text-blue-400 transition-colors" />
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  duvidas
                </span>
              </div>
            </div>
          </div>

          {/* Text Channels */}
          <div className="mb-6">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2">Canais de Texto</h3>
            <div className="space-y-1">
              <div className="flex items-center p-3 rounded-lg bg-slate-700/50 cursor-pointer transition-all duration-200 border-l-2 border-orange-500">
                <Hash className="h-4 w-4 text-orange-400 mr-3" />
                <span className="text-white text-sm font-medium">📁 geral</span>
              </div>
              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Hash className="h-4 w-4 text-slate-400 mr-3 group-hover:text-red-400 transition-colors" />
                <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                  ofertas-da-semana 🔥
                </span>
              </div>
            </div>
          </div>

          {/* Voice Channels */}
          <div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-3 px-2">Canais de Voz</h3>
            <div className="space-y-1">
              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Volume2 className="h-4 w-4 text-slate-400 mr-3 group-hover:text-blue-400 transition-colors" />
                <div className="flex-1">
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                    🔊 REUNIÃO
                  </span>
                  <div className="text-xs text-slate-500 mt-1">00 / 99</div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Volume2 className="h-4 w-4 text-slate-400 mr-3 group-hover:text-cyan-400 transition-colors" />
                <div className="flex-1">
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                    🔊 CONSULTORIA I...
                  </span>
                  <div className="text-xs text-slate-500 mt-1">00 / 02</div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Volume2 className="h-4 w-4 text-slate-400 mr-3 group-hover:text-purple-400 transition-colors" />
                <div className="flex-1">
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                    🔊 MENTORIA INDI...
                  </span>
                  <div className="text-xs text-slate-500 mt-1">00 / 05</div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Volume2 className="h-4 w-4 text-slate-400 mr-3 group-hover:text-yellow-400 transition-colors" />
                <div className="flex-1">
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                    🔒 PROJETO PRI...
                  </span>
                  <div className="text-xs text-slate-500 mt-1">00 / 10</div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group">
                <Volume2 className="h-4 w-4 text-slate-400 mr-3 group-hover:text-red-400 transition-colors" />
                <div className="flex-1">
                  <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors">
                    🔴 SALA DA EQ...
                  </span>
                  <div className="text-xs text-slate-500 mt-1">00 / 10</div>
                </div>
              </div>

              <div className="flex items-center p-3 rounded-lg bg-slate-700/50 cursor-pointer transition-all duration-200 border-l-2 border-green-500">
                <Volume2 className="h-4 w-4 text-green-400 mr-3" />
                <div className="flex-1">
                  <span className="text-white text-sm font-medium">🌐 NETWO...</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">ATIVO</span>
                    <span className="text-xs text-slate-400">04 / 50</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Users in Voice */}
          <div className="mt-4 pt-4 border-t border-slate-700/50">
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">I</span>
                </div>
                <div className="flex-1">
                  <div className="text-orange-400 text-sm font-medium">Tx7boss</div>
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block">
                    AO VIVO
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-2 rounded-lg">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">L</span>
                </div>
                <div className="text-orange-400 text-sm font-medium">🔥 Lucas Nunes</div>
              </div>
            </div>
          </div>
        </div>

        {/* User Panel */}
        <div className="p-4 bg-slate-800/80 border-t border-slate-700/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">V</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-400 border-2 border-slate-800 rounded-full"></div>
              </div>
              <div>
                <div className="text-white text-sm font-medium">@convidado</div>
                <div className="bg-purple-600 text-white text-xs font-bold px-2 py-0.5 rounded-full inline-block">
                  MEMBRO VIP
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="p-2 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors group">
                <MicOff className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
              <div className="p-2 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors group">
                <Headphones className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
              <div className="p-2 hover:bg-slate-700/50 rounded-lg cursor-pointer transition-colors group">
                <Settings className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Channel Header - Desktop */}
        <div className="hidden lg:block p-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Hash className="h-5 w-5 text-gray-400 mr-2" />
              <span className="text-white font-semibold">geral</span>
              <div className="ml-4 text-gray-400 text-sm">Acompanhe a operação em tempo real</div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 pt-20 lg:pt-4 overflow-y-auto bg-gray-700 min-h-0">
          {isInitialLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto mb-4"></div>
                <p className="text-gray-400">Conectando à operação...</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Mensagem de boas-vindas */}
              {displayedMessages.length === 0 && !isTyping && (
                <div className="text-center py-8">
                  <div className="text-purple-400 text-lg font-semibold mb-2">🔴 AO VIVO</div>
                  <p className="text-gray-300">Você está observando a operação em tempo real...</p>
                </div>
              )}
              {displayedMessages.map((message) => (
                <div key={message.id} className="flex items-start space-x-3 hover:bg-gray-600/30 p-2 rounded">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {message.user.charAt(message.user.startsWith("@") ? 1 : 0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1 flex-wrap">
                      <span className={`font-semibold ${message.color} text-sm sm:text-base`}>{message.user}</span>
                      <Badge variant="secondary" className="text-xs bg-gray-600 text-gray-300">
                        {message.role}
                      </Badge>
                      <span className="text-gray-400 text-xs">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-200 text-sm sm:text-base break-words">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start space-x-3 p-2">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs sm:text-sm font-bold">
                      {typingUser.charAt(typingUser.startsWith("@") ? 1 : 0).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-300 text-sm sm:text-base">{typingUser}</span>
                      <span className="text-gray-400 text-sm">está digitando...</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="p-4 sm:p-6 bg-gray-800 border-t border-gray-700">
          <Card className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border-purple-500/30 p-4 sm:p-6">
            <div className="text-center">
              <h3 className="text-white font-bold text-lg sm:text-xl mb-2">
                👀 Acompanhe a apresentação da operação...
              </h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Veja como trabalhamos em tempo real e faça parte da próxima turma
              </p>
              <Link href="/formulario">
                <Button
                  size="lg"
                  className="w-full sm:w-auto touch-button bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-6 sm:px-8 rounded-full text-sm sm:text-lg shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  🔐 GARANTIR MINHA VAGA
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* Members Panel - Mobile responsive with improved design */}
      <div
        className={`members-panel fixed lg:relative top-0 right-0 z-40 w-64 h-full bg-gradient-to-b from-slate-900 to-slate-800 transition-all duration-300 ease-out shadow-2xl ${
          membersOpen ? "translate-x-0" : "translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Mobile close button */}
        <div className="lg:hidden flex justify-between items-center p-4 pb-4 border-b border-slate-700/50 bg-slate-800/50">
          <span className="text-white font-semibold text-lg">Membros</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMembersOpen(false)}
            className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-400 hover:text-white" />
          </Button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-wider">Membros</h3>
            <div className="bg-slate-700/50 text-slate-300 text-xs font-medium px-2 py-1 rounded-full">
              {teamMembers.length}
            </div>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-96 custom-scrollbar">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-700/30 cursor-pointer transition-all duration-200 group"
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-sm font-bold">
                      {member.name.charAt(member.name.startsWith("@") ? 1 : 0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-slate-800 rounded-full animate-pulse"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`font-medium ${member.color} text-sm truncate group-hover:text-white transition-colors`}
                  >
                    {member.name}
                  </div>
                  <div className="text-slate-500 text-xs font-medium uppercase tracking-wide">{member.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 shadow-lg">
            <div className="text-center">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <p className="text-white font-medium text-sm mb-2">Equipe completa online</p>
              <p className="text-slate-400 text-xs">Operação ativa 24/7</p>
              <div className="mt-3 flex items-center justify-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs font-medium">Todos conectados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {(sidebarOpen || membersOpen) && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => {
            setSidebarOpen(false)
            setMembersOpen(false)
          }}
        />
      )}
    </div>
  )
}
