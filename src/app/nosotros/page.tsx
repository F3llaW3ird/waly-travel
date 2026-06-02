'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plane, Shield, Heart, Award } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { configQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Skeleton } from '@/components/ui/Skeleton'

interface Config {
  aboutText?: any[]
  mission?: string
  vision?: string
  logo?: any
  title?: string
}

const values = [
  {
    icon: Shield,
    title: 'Confianza',
    description:
      'Trabajamos con transparencia y responsabilidad para que viajes tranquilo.',
  },
  {
    icon: Heart,
    title: 'Pasión',
    description:
      'Amamos lo que hacemos y compartimos esa pasión en cada experiencia.',
  },
  {
    icon: Award,
    title: 'Calidad',
    description:
      'Seleccionamos los mejores destinos y servicios para ti.',
  },
  {
    icon: Plane,
    title: 'Aventura',
    description:
      'Creamos experiencias únicas que transforman tu forma de viajar.',
  },
]

export default function NosotrosPage() {
  const [config, setConfig] = useState<Config | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Config>(configQuery)
      .then((data) => {
        setConfig(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Nosotros' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-16"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Sobre {config?.title || 'Waly Travel'}
        </h1>

        {loading ? (
          <div className="space-y-3">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-full" />
          </div>
        ) : config?.aboutText ? (
          <div className="text-muted leading-relaxed space-y-4">
            {config.aboutText.map((block: any, i: number) => {
              if (block._type === 'block') {
                return (
                  <p key={i}>
                    {block.children.map((c: any) => c.text).join('')}
                  </p>
                )
              }
              return null
            })}
          </div>
        ) : (
          <p className="text-muted">
            Somos una agencia de viajes dedicada a ofrecer las mejores
            experiencias turísticas. Conectamos a nuestros clientes con los
            destinos más increíbles de Ayacucho, ofreciendo planes turísticos
            personalizados, artesanías únicas y pasajes aéreos.
          </p>
        )}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Misión
          </h2>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <p className="text-muted leading-relaxed">
              {config?.mission ||
                'Ofrecer experiencias de viaje inolvidables que conecten a las personas con la riqueza cultural, natural y artesanal de Ayacucho.'}
            </p>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
            <span className="w-2 h-8 bg-secondary rounded-full" />
            Visión
          </h2>
          {loading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <p className="text-muted leading-relaxed">
              {config?.vision ||
                'Ser la agencia de viajes líder en Ayacucho, reconocida por nuestra calidad, innovación y compromiso con el turismo sostenible.'}
            </p>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Nuestros Valores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg transition-all"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={28} className="text-primary" />
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </div>
  )
}
