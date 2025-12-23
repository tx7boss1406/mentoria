"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ChevronRight, Target } from "lucide-react"

interface Question {
  id: number
  question: string
  options: string[]
}

const questions: Question[] = [
  {
  id: 1,
  question: "Qual dessas situações descreve melhor o que você sente hoje no digital?",
  options: [
    "Sei que posso mais, mas ainda não consigo gerar resultados consistentes",
    "Já tentei várias coisas e sinto que estou travado no mesmo lugar",
    "Tenho um projeto bom, mas não sei como escalar de verdade",
    "Quero começar do zero da forma certa, sem perder tempo",
  ],
},
  {
  id: 2,
  question: "Se você tivesse um método claro e validado, quanto tempo conseguiria dedicar por dia?",
  options: [
    "Menos de 2h - mas sou disciplinado",
    "De 2h a 4h - consigo seguir um passo a passo",
    "5h+ - quero acelerar o processo",
    ],
},
  {
  id: 3,
  question: "Em relação a marketing, copy e estratégias de venda, como você se considera hoje?",
  options: [
    "Total iniciante - preciso de direção",
    "Intermediário - entendo, mas não sei aplicar de forma correta",
    "Avançado - quero estratégias mais fortes para escalar",
  ],
},
  {
  id: 4,
  question: "Na hora de montar ofertas, anúncios e funis… qual é o seu maior desafio hoje?",
  options: [
    "Não sei por onde começar",
    "Tenho ideias, mas não consigo transformar em vendas",
    "Falta alguém experiente para me guiar no caminho certo",
    "Consigo fazer, mas não tenho consistência nos resultados",
  ],
},
  {
  id: 5,
  question: "Como você prefere aprender algo que realmente funcione?",
  options: [
    "Passo a passo com suporte para não errar",
    "Só preciso da estratégia, o resto eu executo",
    "Quero aprender e, se possível, delegar para acelerar",
  ],
},
{
  id: 6,
  question: "O que mais te segurou até hoje de ter resultados reais?",
  options: [
    "Falta de clareza do caminho exato",
    "Falta de estratégia validada",
    "Não ter alguém para corrigir meus erros",
    "Tentar fazer tudo sozinho",
  ],
},
{
  id: 8,
  question: "Quão sério você está sobre realmente mudar seu jogo no digital?",
  options: [
    "Muito - quero levar isso a sério",
    "Depende - preciso de um caminho claro",
    "Pouco - ainda estou entendendo se é para mim",
  ],
}

]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [answers, setAnswers] = useState<string[]>([])
  const [showResult, setShowResult] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleContinue = () => {
    if (!selectedAnswer || isLoading) return

    setIsLoading(true)
    setIsTransitioning(true)

    setTimeout(() => {
      const newAnswers = [...answers, selectedAnswer]
      setAnswers(newAnswers)

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
        setSelectedAnswer(null)
      } else {
        setShowResult(true)
      }

      setIsTransitioning(false)
      setIsLoading(false)
    }, 300)
  }

 if (showResult) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />

      <Card className="bg-black/90 border-2 border-lime-500/50 backdrop-blur-sm max-w-2xl w-full">
        <div className="p-6 sm:p-8 text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Target className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6">
           🎯 Suas respostas revelam algo importante: você não está aqui por acaso.
          </h1>

          <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
            Pelo que você respondeu, fica claro que você quer evoluir.
            Não é "curiosidade". Não é "tentativa".
            Você já decidiu avançar, e isso te coloca à frente de 95% das pessoas que dizem querer viver do digital.
          </p>

          <div className="bg-gradient-to-r from-purple-900/40 to-cyan-900/40 p-5 rounded-lg border border-purple-500/30 mb-8 text-center">
  <p className="text-white text-base sm:text-lg font-bold leading-snug">
    O próximo passo
    <br />
    não foi feito para explicar.
  </p>

  <p className="text-gray-300 text-sm sm:text-base mt-3 leading-snug">
    Foi feito para você enxergar
    <br />
    o que normalmente fica escondido.
  </p>

  <p className="text-lime-400 text-sm sm:text-base mt-3 font-semibold">
    Preste atenção na estrutura.
    <br />
    É ela que faz tudo funcionar.
  </p>
</div>


          <p className="text-lg sm:text-xl font-semibold text-white mb-6">
            Quer ver na prática como funciona por dentro?
          </p>

          <Link href="/estrategia-revelada">
            <Button
              size="lg"
              className="w-full sm:w-auto touch-button bg-gradient-to-r from-lime-600 to-cyan-600 hover:from-lime-500 hover:to-cyan-500 text-black font-bold py-4 px-8 rounded-full text-lg shadow-2xl hover:shadow-lime-500/25 transition-all duration-300 transform hover:scale-105"
            >
              🔍 Ver operação em tempo real
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-32 left-20 w-2 h-2 bg-lime-400 rounded-full animate-bounce opacity-80" />

      <Card className="bg-black/90 border-2 border-purple-500/50 backdrop-blur-sm max-w-2xl w-full">
        <div className="p-6 sm:p-8">
          {/* Diagnóstico */}
<div className="mb-8 text-center">
  <span className="text-sm text-purple-400 tracking-widest uppercase">
    Diagnóstico estratégico
  </span>
  <h1 className="text-xl sm:text-2xl font-semibold text-white mt-2">
    Vamos entender onde você está agora
  </h1>
</div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400 text-sm">
                Etapa {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-gray-400 text-sm">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question */}
          <div
            className={`transition-all duration-300 ${isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"}`}
          >
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 transform hover:scale-[1.02] ${
                    selectedAnswer === option
                      ? "border-lime-400 bg-lime-400/10 text-lime-400"
                      : "border-gray-600 bg-gray-800/50 text-gray-300 hover:border-gray-500 hover:bg-gray-700/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {selectedAnswer === option && (
                      <div className="w-5 h-5 bg-lime-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-black rounded-full" />
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!selectedAnswer || isLoading}
              size="lg"
              className="w-full touch-button bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 disabled:from-gray-600 disabled:to-gray-700 text-white font-bold py-4 px-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processando...
                </div>
              ) : (
                <>
                  {currentQuestion === questions.length - 1 ? "Ver Resultado" : "Continuar"}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
