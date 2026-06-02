'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Check } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
    const msg = `Hola! Quiero suscribirme al newsletter con el correo: ${email}`
    window.open(`https://wa.me/59170000000?text=${encodeURIComponent(msg)}`, '_blank')
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ¿Listo para viajar?
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Déjanos tu correo y recibe ofertas exclusivas y tips de viaje
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="flex-1 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 bg-secondary hover:bg-secondary-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              {sent ? (
                <>
                  <Check size={18} /> Enviado
                </>
              ) : (
                <>
                  <Send size={18} /> Suscribirme
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
