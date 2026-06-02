'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { destinosFeaturedQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Skeleton } from '@/components/ui/Skeleton'
import { SITE_NAME } from '@/lib/constants'

interface Destino {
  _id: string
  name: string
  slug: { current: string }
  ubicacion?: string
  images?: any[]
  description?: any[]
}

export default function DestinosDestacados() {
  const [destinos, setDestinos] = useState<Destino[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Destino[]>(destinosFeaturedQuery)
      .then((data) => {
        setDestinos(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-72 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (destinos.length === 0) return null

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Destinos Destacados
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Los lugares más increíbles que {SITE_NAME} tiene para ti
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinos.map((destino, index) => (
            <motion.div
              key={destino._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/destinos/${destino.slug.current}`}
                className="group block relative h-72 rounded-2xl overflow-hidden"
              >
                {destino.images?.[0] && (
                  <img
                    src={urlFor(destino.images[0]).width(600).height(500).url()}
                    alt={destino.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-1">
                    {destino.name}
                  </h3>
                  {destino.ubicacion && (
                    <p className="flex items-center gap-1 text-white/70 text-sm">
                      <MapPin size={14} />
                      {destino.ubicacion}
                    </p>
                  )}
                </div>
              </Link>
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
            href="/destinos"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Ver todos los destinos <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
