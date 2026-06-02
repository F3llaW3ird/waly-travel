'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, MessageCircle, Check } from 'lucide-react'
import { useState } from 'react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { useConfig } from '@/hooks/useConfig'

const formSchema = z.object({
  name: z.string().min(2, 'Mínimo 2 caracteres'),
  email: z.string().email('Correo inválido'),
  phone: z.string().min(8, 'Teléfono inválido'),
  message: z.string().min(10, 'Mínimo 10 caracteres'),
})

type FormData = z.infer<typeof formSchema>

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const { config } = useConfig()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormData) => {
    const msg = `*Nuevo mensaje desde la web*\n\n*Nombre:* ${data.name}\n*Correo:* ${data.email}\n*Teléfono:* ${data.phone}\n*Mensaje:* ${data.message}`
    window.open(
      `https://wa.me/${config?.whatsappNumber || '59170000000'}?text=${encodeURIComponent(msg)}`,
      '_blank'
    )
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Contacto' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Contáctanos</h1>
        <p className="text-muted text-lg max-w-2xl">
          Estamos para ayudarte. Escríbenos y te responderemos a la brevedad.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-card border border-border rounded-2xl p-6 sm:p-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Nombre completo
              </label>
              <input
                {...register('name')}
                placeholder="Tu nombre"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">
                Correo electrónico
              </label>
              <input
                {...register('email')}
                placeholder="tu@correo.com"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Teléfono</label>
              <input
                {...register('phone')}
                placeholder="+591 70000000"
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Mensaje</label>
              <textarea
                {...register('message')}
                rows={4}
                placeholder="Escribe tu mensaje..."
                className="w-full px-4 py-2.5 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.message.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
            >
              {sent ? (
                <>
                  <Check size={20} /> Mensaje enviado
                </>
              ) : (
                <>
                  <Send size={20} /> Enviar mensaje
                </>
              )}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-4">Información de contacto</h2>

            <div className="space-y-4">
              {config?.whatsappNumber && (
                <div className="flex items-start gap-3">
                  <MessageCircle size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <p className="text-sm text-muted">+{config.whatsappNumber}</p>
                  </div>
                </div>
              )}
              {config?.email && (
                <div className="flex items-start gap-3">
                  <Mail size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Correo</p>
                    <p className="text-sm text-muted">{config.email}</p>
                  </div>
                </div>
              )}
              {config?.direccion && (
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">Dirección</p>
                    <p className="text-sm text-muted">{config.direccion}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6 sm:p-8">
            <h2 className="text-xl font-bold mb-2">¿Prefieres escribirnos directo?</h2>
            <p className="text-muted text-sm mb-4">
              Nuestro equipo está listo para atenderte
            </p>
            <WhatsAppButton size="lg" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
