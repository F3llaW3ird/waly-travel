'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, MapPin } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { planesFeaturedQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
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
}

export default function PlanesPreview() {
  const [planes, setPlanes] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Plan[]>(planesFeaturedQuery)
      .then((data) => {
        setPlanes(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-4" />
            <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </section>
    )
  }

  if (planes.length === 0) return null

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Planes Turísticos
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Paquetes completos para vivir experiencias inolvidables
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {planes.map((plan, index) => (
            <motion.div
              key={plan._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <Link href={`/planes/${plan.slug.current}`} className="block relative h-48 overflow-hidden">
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

                <div className="flex items-center gap-3 text-sm text-muted mb-3">
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
                  message={`Hola! Quiero información sobre el plan turístico: ${plan.name}`}
                  size="sm"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/planes"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
          >
            Ver todos los planes <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
