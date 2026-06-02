'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, MapPin, Filter } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { planesQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { CardSkeleton } from '@/components/ui/Skeleton'

interface Plan {
  _id: string
  name: string
  slug: { current: string }
  precio: number
  duracion?: string
  description?: any[]
  images?: any[]
  destino?: { name: string; slug?: { current: string } }
  categoria?: { name: string; slug?: { current: string } }
}

export default function PlanesPage() {
  const [planes, setPlanes] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Plan[]>(planesQuery)
      .then((data) => {
        setPlanes(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Planes Turísticos' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Planes Turísticos</h1>
        <p className="text-muted text-lg max-w-2xl">
          Descubre nuestros paquetes turísticos diseñados para que vivas experiencias
          únicas en los destinos más increíbles de Bolivia.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : planes.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">Próximamente</h2>
          <p className="text-muted">
            Estamos preparando planes turísticos increíbles para ti.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planes.map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link
                href={`/planes/${plan.slug.current}`}
                className="block relative h-48 overflow-hidden"
              >
                {plan.images?.[0] && (
                  <img
                    src={urlFor(plan.images[0]).width(500).height(350).url()}
                    alt={plan.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                  {formatPrice(plan.precio)}
                </div>
              </Link>

              <div className="p-5">
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  <Link href={`/planes/${plan.slug.current}`}>{plan.name}</Link>
                </h3>

                <div className="flex items-center gap-3 text-sm text-muted mb-3 flex-wrap">
                  {plan.duracion && (
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {plan.duracion}
                    </span>
                  )}
                  {plan.destino?.name && (
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> {plan.destino.name}
                    </span>
                  )}
                </div>

                <WhatsAppButton
                  message={`Hola! Quiero información sobre el plan: ${plan.name}`}
                  size="sm"
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
