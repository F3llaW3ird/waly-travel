'use client'

import { MessageCircle } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'

export default function WhatsAppFloat() {
  const { config } = useConfig()
  const number = config?.whatsappNumber || '59170000000'
  const msg = config?.whatsappMessage || 'Hola! Quiero información'
  const url = `https://wa.me/${number}?text=${encodeURIComponent(msg)}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-110 animate-bounce-slow"
      aria-label="WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}
