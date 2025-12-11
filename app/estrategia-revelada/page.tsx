"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Target, Users,Gamepad, Eye,Sparkles,Zap } from "lucide-react"

export default function EstrategiaReveladaPage() {

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-black via-[#0b0b0b] to-black text-white overflow-hidden">

      {/* ======== GLOW GLOBAL PREMIUM ======== */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-lime-500/5 blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[150px]" />
      </div>

      {/* ================= HEADER ================= */}
      <header className="pt-16 pb-20 text-center relative animate-fadeSlideUp">

        {/* Selo Premium */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 shadow-[0_0_20px_rgba(0,255,140,0.15)] mb-6">
          <span className="h-2 w-2 rounded-full bg-lime-400 animate-softPulse"></span>
          <span className="text-sm tracking-wide text-gray-300">
            Você desbloqueou uma etapa avançada
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            A Estratégia
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            Por Trás do Jogo
          </span>
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-6 text-lg">
          Você viu na prática como um funil gamificado captura atenção.
          Agora veja como essa mesma estrutura transforma cliques soltos em
          leads qualificados — e vendas consistentes.
        </p>
      </header>

      {/* ===================== PASSOS ===================== */}
      <section className="space-y-10 max-w-3xl mx-auto px-4 animate-fadeSlideUp">

        {[
          {
            number: "1",
            title: "Captura de Atenção",
            icon: <Target className="text-blue-400" />,
            desc:
              "Você para de disputar cliques e começa a entregar experiência. O jogo interrompe o scroll e transforma um visitante passivo em participante ativo.",
            insight: "Retenção 8x–12x maior comparado a páginas comuns."
          },
          {
            number: "2",
            title: "Engajamento Ativo",
            icon: <Sparkles className="text-green-400" />,
            desc:
              "O visitante deixa de consumir e começa a interagir. Micro-recompensas criam vínculo emocional e aumentam o valor percebido.",
            insight: "Leads mais aquecidos e muito mais fáceis de converter."
          },
          {
            number: "3",
            title: "Qualificação Natural",
            icon: <Zap className="text-yellow-400" />,
            desc:
              "As respostas do jogo filtram quem realmente está pronto para avançar. A qualificação acontece sem esforço, sem formulário chato.",
            insight: "Você descarta curiosos e mantém pessoas com real intenção."
          },
          {
            number: "4",
            title: "Abertura da Oportunidade",
            icon: <Eye className="text-purple-400" />,
            desc:
              "Depois da interação, o lead está emocionalmente mais receptivo. Aqui é onde a apresentação da estratégia vira desejo.",
            insight: "Conversões muito acima da média — sem parecer pitch."
          }
        ].map((step, i) => (
          <Card
            key={i}
            className="
              bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl 
              backdrop-blur-lg 
              shadow-[0_0_25px_rgba(0,255,200,0.04)] 
              hover:shadow-[0_0_35px_rgba(0,255,200,0.15)] 
              transition-all
            "
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                {step.icon}
              </div>

              {/* 🔥 COR ESCOLHIDA POR VOCÊ — AMARELO ESCURO PREMIUM */}
              <h2 className="text-xl sm:text-2xl font-bold text-yellow-500 drop-shadow-md">
                {step.number} — {step.title}
              </h2>
            </div>

            <p className="text-gray-300 mt-4 leading-relaxed">{step.desc}</p>

            <div className="mt-5 p-4 rounded-xl bg-black/40 border border-white/10">
              <p className="text-sm text-cyan-300 font-medium">
                💡 Resultado imediato
              </p>
              <p className="text-gray-400 text-sm mt-1">{step.insight}</p>
            </div>
          </Card>
        ))}
      </section>

      {/* ===================== FRASE DIFERENCIAÇÃO ===================== */}
      <section className="text-center max-w-3xl mx-auto px-6 py-24 animate-fadeSlideUp">
        <p className="text-xl sm:text-2xl font-semibold text-white leading-relaxed">
          Enquanto todo mundo grita por atenção,
          <span className="text-cyan-400"> você cria experiência.</span>
          <br />
          E experiência é o que os leads <span className="text-lime-400">lembram</span>.
        </p>
      </section>

      {/* ===================== BLOCO TX7BOSS ===================== */}
      <section className="max-w-4xl mx-auto px-6 relative animate-fadeSlideUp">
        <Card className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,150,0.08)]">
          <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-lime-300 bg-clip-text text-transparent mb-6">
            Isso é só o começo.
          </h3>

          <p className="text-gray-300 leading-relaxed mb-8 text-lg">
            Na mentoria <span className="text-white font-semibold">TX7Boss</span> você aprende a montar sistemas que trabalham por você 24/7.
            Nada de fórmula genérica. É operação real que paga as contas.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
            <div>
              <p className="text-lime-300 font-medium mb-2">→ Funis interativos</p>
              <p className="text-gray-400 text-sm">Modelos prontos para aplicar no mesmo dia.</p>
            </div>

            <div>
              <p className="text-cyan-300 font-medium mb-2">→ Automações inteligentes</p>
              <p className="text-gray-400 text-sm">Nutrição que realmente vira receita.</p>
            </div>

            <div>
              <p className="text-purple-300 font-medium mb-2">→ Tráfego que funciona</p>
              <p className="text-gray-400 text-sm">Criativos e testes que escalam de verdade.</p>
            </div>

            <div>
              <p className="text-yellow-300 font-medium mb-2">→ Escala previsível</p>
              <p className="text-gray-400 text-sm">Sistemas que suportam crescimento constante.</p>
            </div>
          </div>
        </Card>
      </section>

     {/* Final CTA */}
         <section className="text-center py-24 px-6 animate-fadeSlideUp">
  <h3 className="text-3xl sm:text-4xl font-bold mb-4">
    Pronto para dominar essa estratégia?
  </h3>
  <p className="text-gray-400 mb-10">
    Dominar é opcional.  
    Ficar pra trás também.
  </p>
</section>

          {/* Action Buttons */}
<div className="flex flex-col items-center justify-center gap-4 w-full max-w-md mx-auto">
  <Link href="/discord">
    <button
      className="
        flex items-center justify-center
        px-4 py-2
        rounded-full
        bg-gradient-to-r from-cyan-500 to-lime-500
        text-black font-bold text-sm
        shadow-sm hover:shadow-lg
        hover:scale-105
        transition-all duration-300
      "
    >
      <Eye className="mr-2 h-4 w-4" />
      Ver a Operação em Tempo Real
    </button>
  </Link>

  <Link href="/game">
    <button
      className="
        flex items-center justify-center
        px-4 py-2
        rounded-full
        border-2 border-purple-400
        text-purple-300 font-bold text-sm
        shadow-sm hover:shadow-lg
        hover:bg-purple-400/10
        hover:scale-105
        transition-all duration-300
      "
    >
      <Gamepad className="mr-2 h-4 w-4" />
      Jogar Novamente
    </button>
  </Link>
          </div>
        </div>
  )
}

