"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Rocket, CheckCircle, Instagram, Phone, User } from 'lucide-react'

export default function FormularioPage() {
  const [formData, setFormData] = useState({
    nome: "",
    instagram: "",
    contato: "",
    aceito: false,
  })
  const [showSuccess, setShowSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)

  const [errors, setErrors] = useState({
    nome: "",
    instagram: "",
    contato: "",
    aceito: "",
  })

  const validateForm = () => {
    const newErrors = {
      nome: "",
      instagram: "",
      contato: "",
      aceito: "",
    }

    if (!formData.nome.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

    if (!formData.instagram.trim()) {
      newErrors.instagram = "Instagram é obrigatório"
    }

    if (!formData.contato.trim()) {
      newErrors.contato = "Contato é obrigatório"
    } else {
      const contact = formData.contato.trim()

      // Check if it's an email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      // Fixed regex: properly escaped parentheses with $$ and $$ instead of $$
      // Accepts: 11942498881, (11) 94249-8881, 942498881, (11)942498881, etc.
      const phoneRegex = /^($$\d{2}$$[\s-]?)?9?\d{8,9}$/
      const cleanPhone = contact.replace(/[\s\-()]/g, "")

      const isValidEmail = emailRegex.test(contact)
      const isValidPhone = phoneRegex.test(cleanPhone) && cleanPhone.length >= 8

      if (!isValidEmail && !isValidPhone) {
        newErrors.contato = "Digite um email válido ou telefone (ex: 11942498881)"
      }
    }

    if (!formData.aceito) {
      newErrors.aceito = "Você deve aceitar os termos"
    }

    setErrors(newErrors)
    return Object.values(newErrors).every((error) => error === "")
  }

  const getSmartPlaceholder = (value: string) => {
    if (!value) return "WhatsApp ou E-mail"

    const firstChar = value.charAt(0)
    if (/\d/.test(firstChar) || firstChar === "(") {
      return "(11) 94249-8881"
    } else if (/[a-zA-Z]/.test(firstChar)) {
      return "email@exemplo.com"
    }
    return "WhatsApp ou E-mail"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)

      // Reset form
      setFormData({
        nome: "",
        instagram: "",
        contato: "",
        aceito: false,
      })
      setErrors({
        nome: "",
        instagram: "",
        contato: "",
        aceito: "",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute inset-0 bg-grid-cyber opacity-50" />

      {/* Floating Elements - Mobile adjusted */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-2 h-2 bg-purple-400 rounded-full animate-ping opacity-75" />
      <div className="absolute top-32 sm:top-40 right-12 sm:right-20 w-2 sm:w-3 h-2 sm:h-3 bg-cyan-400 rounded-full animate-pulse opacity-60" />
      <div className="absolute bottom-24 sm:bottom-32 left-12 sm:left-20 w-2 h-2 bg-lime-400 rounded-full animate-bounce opacity-80" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="bg-black/80 border-2 border-purple-500/50 backdrop-blur-sm shadow-2xl shadow-purple-500/25">
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent">
                  🚀 Preencha para garantir
                </span>
                <br />
                <span className="text-white text-lg sm:text-xl md:text-2xl">sua vaga na próxima turma</span>
              </h1>

              <p className="text-gray-300 text-sm">Últimos acessos sendo liberados</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-white flex items-center text-sm sm:text-base font-medium">
                  <User className="h-4 w-4 mr-3 text-purple-400 flex-shrink-0" />
                  Nome Completo
                </Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, nome: e.target.value }))
                    if (errors.nome) setErrors((prev) => ({ ...prev, nome: "" }))
                  }}
                  className={`touch-button bg-black/50 border-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-400/50 transition-all duration-300 text-sm sm:text-base h-12 ${
                    errors.nome
                      ? "border-red-500 focus:border-red-400"
                      : formData.nome
                        ? "border-purple-400 shadow-lg shadow-purple-400/20"
                        : "border-purple-500/30 hover:border-purple-400/50 focus:border-purple-400"
                  }`}
                  required
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.nome}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-white flex items-center text-sm sm:text-base font-medium">
                  <Instagram className="h-4 w-4 mr-3 text-cyan-400 flex-shrink-0" />
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  type="text"
                  placeholder="@seuinstagram"
                  value={formData.instagram}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, instagram: e.target.value }))
                    if (errors.instagram) setErrors((prev) => ({ ...prev, instagram: "" }))
                  }}
                  className={`touch-button bg-black/50 border-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400/50 transition-all duration-300 text-sm sm:text-base h-12 ${
                    errors.instagram
                      ? "border-red-500 focus:border-red-400"
                      : formData.instagram
                        ? "border-cyan-400 shadow-lg shadow-cyan-400/20"
                        : "border-cyan-500/30 hover:border-cyan-400/50 focus:border-cyan-400"
                  }`}
                  required
                />
                {errors.instagram && (
                  <p className="text-red-400 text-xs flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.instagram}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="contato" className="text-white flex items-center text-sm sm:text-base font-medium">
                  <Phone className="h-4 w-4 mr-3 text-lime-400 flex-shrink-0" />
                  WhatsApp ou E-mail
                </Label>
                <Input
                  id="contato"
                  type="text"
                  placeholder={getSmartPlaceholder(formData.contato)}
                  value={formData.contato}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, contato: e.target.value }))
                    if (errors.contato) setErrors((prev) => ({ ...prev, contato: "" }))
                  }}
                  className={`touch-button bg-black/50 border-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-lime-400/50 transition-all duration-300 text-sm sm:text-base h-12 ${
                    errors.contato
                      ? "border-red-500 focus:border-red-400"
                      : formData.contato
                        ? "border-lime-400 shadow-lg shadow-lime-400/20"
                        : "border-lime-500/30 hover:border-lime-400/50 focus:border-lime-400"
                  }`}
                  required
                />
                {errors.contato && (
                  <p className="text-red-400 text-xs flex items-center">
                    <span className="mr-1">⚠️</span>
                    {errors.contato}
                  </p>
                )}
              </div>

              <div className="flex items-start space-x-3 py-2">
                <Checkbox
                  id="aceito"
                  checked={formData.aceito}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, aceito: checked as boolean }))
                    if (errors.aceito) setErrors((prev) => ({ ...prev, aceito: "" }))
                  }}
                  className={`border-2 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600 mt-1 min-w-[20px] min-h-[20px] transition-all duration-300 ${
                    errors.aceito ? "border-red-500" : "border-gray-400 hover:border-purple-400"
                  }`}
                />
                <Label htmlFor="aceito" className="text-xs sm:text-sm text-gray-300 leading-relaxed cursor-pointer">
                  ✅ Aceito receber conteúdos e dicas exclusivas sobre marketing digital e funis de conversão
                </Label>
              </div>
              {errors.aceito && (
                <p className="text-red-400 text-xs flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.aceito}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full touch-button bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-600 hover:from-purple-500 hover:via-purple-400 hover:to-cyan-500 text-white font-bold py-4 px-6 sm:px-8 rounded-full text-sm sm:text-lg shadow-2xl shadow-purple-500/30 hover:shadow-purple-400/40 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none border border-purple-400/20 hover:border-purple-300/30"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  <>
                    <Rocket className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />🔐 GARANTIR MINHA VAGA
                  </>
                )}
              </Button>
            </form>

            {/* Security Note */}
            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-xs text-gray-400">🔒 Seus dados estão seguros e não serão compartilhados</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Success Modal - Mobile optimized */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="bg-black border-2 border-lime-500 max-w-sm sm:max-w-md mx-4">
          <DialogHeader>
            <DialogTitle className="text-center text-lg sm:text-2xl font-bold text-white mb-4">
              🎉 Vaga Garantida!
            </DialogTitle>
          </DialogHeader>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>

            <div className="space-y-2">
              <p className="text-lime-400 font-bold text-base sm:text-lg">Sua vaga foi garantida com sucesso!</p>
              <p className="text-gray-300 text-sm">
                Para ativar seu acesso completo, siga o próximo passo agora mesmo:
              </p>
            </div>

            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 rounded-lg border border-purple-500/30">
              <p className="text-white font-semibold mb-2 text-sm sm:text-base">Próximos passos:</p>
              <ul className="text-xs sm:text-sm text-gray-300 space-y-1 text-left">
                <li>✅ Acesso ao grupo exclusivo de alunos</li>
                <li>✅ Cronograma completo da mentoria</li>
                <li>✅ Material antecipado de preparação</li>
                <li>✅ Participação direta na operação com a equipe</li>
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-center mb-4">
                <p className="text-lime-400 font-medium text-sm sm:text-base">
                  🟢 <span className="font-bold">Clique no botão abaixo</span> para liberar tudo isso agora mesmo.
                </p>
              </div>
              <Button
                onClick={() => {
                  setShowSuccess(false)
                  setShowCheckout(true)
                }}
                className="w-full touch-button bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-bold py-3 px-4 sm:px-6 rounded-full text-sm sm:text-base"
              >
                🔓 LIBERAR ACESSO COMPLETO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Block - Mobile optimized */}
      {showCheckout && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-black border-2 border-lime-500 max-w-sm sm:max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-lime-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl">🔓</span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                  <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    ACESSO LIBERADO
                  </span>
                  <br />
                  <span className="text-white text-xl sm:text-2xl md:text-3xl">SÓ FALTA UM PASSO!</span>
                </h1>
              </div>

              {/* Price */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="bg-gradient-to-r from-lime-900/50 to-cyan-900/50 p-4 sm:p-6 rounded-lg border-2 border-lime-500/50 mb-4 sm:mb-6">
                  <div className="text-lime-400 text-base sm:text-lg font-semibold mb-2">🎯 Valor do Acesso:</div>
                  <div className="text-3xl sm:text-5xl font-bold text-white mb-2">R$69,99</div>
                  <div className="text-gray-300 text-xs sm:text-sm">Pagamento único • Sem mensalidades</div>
                </div>

                <p className="text-base sm:text-lg text-gray-300 mb-4 sm:mb-6 px-2">
                  Parabéns por chegar até aqui! Agora você pode garantir sua vaga e desbloquear tudo o que está
                  esperando por você:
                </p>
              </div>

              {/* Benefits - Mobile optimized */}
              <div className="mb-6 sm:mb-8">
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  <div className="flex items-start space-x-3 p-3 sm:p-4 bg-black/50 rounded-lg border border-lime-500/30">
                    <div className="text-lime-400 text-lg sm:text-xl flex-shrink-0">✅</div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      Acesso à operação em tempo real com a equipe
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 sm:p-4 bg-black/50 rounded-lg border border-cyan-500/30">
                    <div className="text-cyan-400 text-lg sm:text-xl flex-shrink-0">✅</div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      Entrar no grupo fechado de suporte e acompanhamento
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 sm:p-4 bg-black/50 rounded-lg border border-purple-500/30">
                    <div className="text-purple-400 text-lg sm:text-xl flex-shrink-0">✅</div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      Participação em análises, entradas e tomadas de decisão ao vivo
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 sm:p-4 bg-black/50 rounded-lg border border-orange-500/30">
                    <div className="text-orange-400 text-lg sm:text-xl flex-shrink-0">✅</div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      Suporte direto com quem está no campo de batalha todos os dias
                    </p>
                  </div>

                  <div className="flex items-start space-x-3 p-3 sm:p-4 bg-black/50 rounded-lg border border-red-500/30">
                    <div className="text-red-400 text-lg sm:text-xl flex-shrink-0">✅</div>
                    <p className="text-white font-medium text-sm sm:text-base">
                      Atualizações e estratégias exclusivas para membros
                    </p>
                  </div>
                </div>
              </div>

              {/* Value Proposition */}
              <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-4 sm:p-6 rounded-lg border border-purple-500/30 mb-6 sm:mb-8">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-2">💡 Tudo isso por apenas R$69,99</div>
                  <p className="text-gray-300 text-sm sm:text-base">Sem mensalidade, sem taxas escondidas.</p>
                </div>
              </div>

              {/* Security Note */}
              <div className="text-center mb-6 sm:mb-8">
                <div className="flex items-center justify-center space-x-2 text-gray-300 mb-4">
                  <span className="text-xl sm:text-2xl">🔒</span>
                  <span className="font-semibold text-sm sm:text-base">Pagamento 100% seguro via Kirvano</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3 sm:space-y-4">
                <a
                  href="https://pay.kirvano.com/f61bb896-e3bd-483a-a59a-359c5ba74aad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="w-full touch-button bg-gradient-to-r from-lime-600 to-cyan-600 hover:from-lime-500 hover:to-cyan-500 text-black font-bold py-4 sm:py-6 px-6 sm:px-8 rounded-full text-base sm:text-xl shadow-2xl hover:shadow-lime-500/25 transition-all duration-300 transform hover:scale-105 border-2 border-lime-400"
                  >
                    <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💳</span>
                    FINALIZAR PAGAMENTO - R$69,99
                  </Button>
                </a>

                <Button
                  onClick={() => setShowCheckout(false)}
                  variant="outline"
                  size="lg"
                  className="w-full touch-button bg-transparent border-2 border-gray-500 text-gray-400 hover:bg-gray-500 hover:text-black font-bold py-3 px-4 sm:px-6 rounded-full transition-all duration-300 text-sm sm:text-base"
                >
                  Fechar
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 sm:mt-8 text-center">
                <div className="grid grid-cols-3 gap-4 text-xs sm:text-sm text-gray-400">
                  <div className="flex flex-col items-center">
                    <span className="text-base sm:text-lg mb-1">🛡️</span>
                    <span>Pagamento Seguro</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base sm:text-lg mb-1">⚡</span>
                    <span>Acesso Imediato</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-base sm:text-lg mb-1">🎯</span>
                    <span>Suporte Direto</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
