'use client'

import { MessageCircle } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'

interface WhatsAppButtonProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function WhatsAppButton({
  message,
  size = 'md',
}: WhatsAppButtonProps) {
  const { config } = useConfig()
  const number = config?.whatsappNumber || '59170000000'
  const defaultMsg = config?.whatsappMessage || 'Hola! Quiero información'

  const text = encodeURIComponent(message || defaultMsg)
  const url = `https://wa.me/${number}?text=${text}`

  const sizeClasses = {
    sm: 'p-2 text-sm',
    md: 'p-3 text-base',
    lg: 'p-4 text-lg',
  }

  const iconSizes = { sm: 18, md: 22, lg: 28 }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-full transition-all hover:shadow-lg ${sizeClasses[size]}`}
    >
      <MessageCircle size={iconSizes[size]} />
      {size !== 'sm' && 'WhatsApp'}
    </a>
  )
}
