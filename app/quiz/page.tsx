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
  },
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
  <p className="text-white text-base sm:text-lg font-semibold leading-snug">
    O que vem agora é invisível para muitos.
    <br />
    Mas é o que mantém tudo funcionando.
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
              🔍 Ver como funciona
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  )
}


 return (
  <div className="min-h-screen bg-gradient-to-b from-[#0b0b10] via-[#07070c] to-[#050509] flex items-center justify-center px-4 py-10">
    <Card className="w-full max-w-xl bg-[#14141b] border border-white/15 rounded-3xl shadow-[0_25px_80px_rgba(0,0,0,0.75)]">
      <div className="p-6 sm:p-9">

        {/* HEADER */}
        <div className="text-center mb-10">
          <span className="text-[11px] tracking-[0.32em] uppercase text-purple-300">
            Diagnóstico estratégico
          </span>
          <h1 className="text-lg sm:text-xl font-semibold text-white mt-4">
            Vamos começar
          </h1>
        </div>

        {/* PROGRESSO */}
        <div className="mb-12">
          <div className="flex justify-between text-xs text-white/70 mb-3">
            <span>
              Etapa {currentQuestion + 1} de {questions.length}
            </span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>

          <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* PERGUNTA */}
        <div
          className={`mb-12 transition-all duration-300 ${
            isTransitioning
              ? "opacity-0 translate-x-4"
              : "opacity-100 translate-x-0"
          }`}
        >
          <h2 className="text-xl sm:text-2xl font-semibold text-white text-center leading-relaxed">
            {questions[currentQuestion].question}
          </h2>
        </div>

        {/* OPÇÕES */}
        <div className="space-y-4 mb-14">
          {questions[currentQuestion].options.map((option, index) => {
            const isSelected = selectedAnswer === option
            const isDimmed = selectedAnswer && !isSelected

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                className={`
                  w-full rounded-2xl px-5 py-4 text-left
                  transition-all duration-200
                  ${
                    isSelected
                      ? "bg-[#1e1e2a] border border-lime-400/50"
                      : "bg-[#181824] border border-white/15 hover:bg-[#1f1f2d]"
                  }
                  ${isDimmed ? "opacity-60" : "opacity-100"}
                `}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className={`text-sm sm:text-base ${
                      isSelected
                        ? "text-lime-300 font-medium"
                        : "text-white/80"
                    }`}
                  >
                    {option}
                  </span>

                  <div
                    className={`
                      w-4 h-4 rounded-full border
                      ${
                        isSelected
                          ? "bg-lime-400 border-lime-400"
                          : "border-white/40"
                      }
                    `}
                  />
                </div>
              </button>
            )
          })}
        </div>

        {/* CTA PREMIUM */}
        <Button
          onClick={handleContinue}
          disabled={!selectedAnswer || isLoading}
          className="
            w-full rounded-full py-4 text-base font-semibold
            bg-gradient-to-r from-lime-400 to-lime-300
            text-black
            shadow-[0_14px_40px_rgba(163,230,53,0.35)]
            transition-all duration-300
            hover:translate-y-[-1px]
            hover:shadow-[0_20px_55px_rgba(163,230,53,0.45)]
            disabled:opacity-40 disabled:shadow-none
          "
        >
          {isLoading
            ? "Processando..."
            : currentQuestion === questions.length - 1
            ? "Ver Resultado"
            : "Continuar"}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>

      </div>
    </Card>
  </div>
)

}
