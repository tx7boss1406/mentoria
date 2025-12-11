"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Target, Users, Eye, Gamepad2 } from "lucide-react"

export default function EstrategiaReveladaPage() {
  return (
    <div className="min-h-screen bg-dark-gradient relative overflow-hidden">
      {/* Background Grid - Removed specific gradient, using general dark grid if desired */}
      <div className="absolute inset-0 bg-grid-cyber opacity-10" />

      {/* Header */}
      <div className="relative z-10 text-center pt-8 sm:pt-12 pb-6 sm:pb-8">
        <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
          ESTRATÉGIA REVELADA
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 px-4">
          A Estratégia
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Por Trás do Jogo
          </span>
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto px-4 leading-relaxed tracking-wide">
          Você acabou de experimentar na prática como um funil gamificado funciona.
          <br />
          Agora vou te mostrar exatamente como criar isso.
        </p>
      </div>

      {/* Strategy Steps */}
      <div className="relative z-10 container-mobile py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Step 1 */}
          <Card className="bg-gray-900/70 border-2 border-blue-400/50 backdrop-blur-sm p-6 sm:p-8 hover:border-blue-300 transition-all duration-300 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">1. Captura de Atenção</h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-base sm:text-lg">
                  O jogo quebra o padrão. Enquanto todo mundo oferece uma landing page igual, você oferece uma experiência única que prende a atenção.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-blue-400/30">
                  <div className="flex items-center space-x-2 text-blue-300">
                    <span className="text-yellow-400">💡</span>
                    <span className="font-semibold text-sm">Resultado:</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Tempo de permanência 10x maior que páginas tradicionais</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="bg-gray-900/70 border-2 border-cyan-400/50 backdrop-blur-sm p-6 sm:p-8 hover:border-cyan-300 transition-all duration-300 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-lime-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">2. Engajamento Ativo</h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-base sm:text-lg">
                  O usuário não só lê, ele PARTICIPA. A cada ponto ganho cria uma conexão emocional com sua marca.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-cyan-400/30">
                  <div className="flex items-center space-x-2 text-cyan-300">
                    <span className="text-yellow-400">💡</span>
                    <span className="font-semibold text-sm">Resultado:</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Taxa de conversão 5x maior que formulários estáticos</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="bg-gray-900/70 border-2 border-purple-400/50 backdrop-blur-sm p-6 sm:p-8 hover:border-purple-300 transition-all duration-300 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">3. Revelação da Estratégia</h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-base sm:text-lg">
                  No momento certo, você revela que tudo aquilo foi uma estratégia. O usuário se sente "descoberto" e
                  quer aprender mais.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-purple-400/30">
                  <div className="flex items-center space-x-2 text-purple-300">
                    <span className="text-yellow-400">💡</span>
                    <span className="font-semibold text-sm">Resultado:</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Curiosidade máxima = interesse genuíno no produto</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Step 4 */}
          <Card className="bg-gray-900/70 border-2 border-lime-400/50 backdrop-blur-sm p-6 sm:p-8 hover:border-lime-300 transition-all duration-300 shadow-xl">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-lime-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl">💰</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">4. Conversão Natural</h3>
                <p className="text-gray-300 mb-4 leading-relaxed text-base sm:text-lg">
                  Depois da experiência, a venda acontece naturalmente. O lead já está conectado emocionalmente com seu
                  conhecimento.
                </p>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-lime-400/30">
                  <div className="flex items-center space-x-2 text-lime-300">
                    <span className="text-yellow-400">💡</span>
                    <span className="font-semibold text-sm">Resultado:</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">Vendas mais fáceis com clientes pré-qualificados</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 bg-gradient-to-t from-[#0c0f1a] to-transparent py-12 sm:py-16">
        <div className="container-mobile text-center">
          {/* Competitive Message */}
          <div className="mb-8 sm:mb-12">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Enquanto seus concorrentes brigam por atenção com os mesmos métodos de sempre, você estará criando
              experiências que seus clientes <span className="font-bold text-white">nunca vão esquecer.</span>
            </p>
          </div>

          {/* Value Proposition */}
          <div className="bg-gray-900/70 p-6 sm:p-8 rounded-2xl border-2 border-purple-400/30 backdrop-blur-sm mb-8 sm:mb-12 max-w-4xl mx-auto shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Isso é só o começo...</h2>
            <p className="text-gray-300 text-lg sm:text-xl mb-6 leading-relaxed">
              Na mentoria TX7Boss, você aprende a criar não só jogos, mas sistemas completos de automação que trabalham
              24/7 para você.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="flex items-center space-x-3">
                <span className="text-cyan-400 text-xl">→</span>
                <span className="text-gray-300 text-base sm:text-lg">Funis interativos que viralizam sozinhos</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-lime-400 text-xl">→</span>
                <span className="text-gray-300 text-base sm:text-lg">Automações que nutrem e convertem leads</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-purple-400 text-xl">→</span>
                <span className="text-gray-300 text-base sm:text-lg">
                  Estratégias de tráfego que realmente funcionam
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pink-400 text-xl">→</span>
                <span className="text-gray-300 text-base sm:text-lg">Sistemas de vendas que escalam infinitamente</span>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Pronto para dominar essa estratégia?</h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto px-4">
              Pare de competir com todo mundo usando os mesmos métodos. Seja o único que seus clientes lembram.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 max-w-md mx-auto">
            <Link href="/discord">
              <Button
                size="lg"
                className="w-full touch-button bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-full text-lg shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-cyan-400/50"
              >
                <Eye className="mr-3 h-5 w-5" />
                👁️ Ver a Operação em Tempo Real
              </Button>
            </Link>

            <Link href="/game">
              <Button
                variant="outline"
                size="lg"
                className="w-full touch-button bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-black font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 hover:shadow-purple-400/25 hover:shadow-lg"
              >
                <Gamepad2 className="mr-3 h-5 w-5" />🎮 Jogar Novamente
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
