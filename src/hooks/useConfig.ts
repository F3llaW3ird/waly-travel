'use client'

import { useEffect, useState } from 'react'
import { client } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'

export interface ConfigData {
  title?: string
  logo?: any
  whatsappNumber?: string
  whatsappMessage?: string
  email?: string
  direccion?: string
  facebook?: string
  instagram?: string
  tiktok?: string
  aboutText?: any[]
  mission?: string
  vision?: string
}

export function useConfig() {
  const [config, setConfig] = useState<ConfigData | null>(null)

  useEffect(() => {
    client.fetch<ConfigData>(configQuery).then(setConfig).catch(console.error)
  }, [])

  return { config }
}
