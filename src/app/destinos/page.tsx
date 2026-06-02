'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { destinosQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Skeleton } from '@/components/ui/Skeleton'

interface Destino {
  _id: string
  name: string
  slug: { current: string }
  ubicacion?: string
  images?: any[]
  description?: any[]
}

export default function DestinosPage() {
  const [destinos, setDestinos] = useState<Destino[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Destino[]>(destinosQuery)
      .then((data) => {
        setDestinos(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Destinos' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Destinos Turísticos</h1>
        <p className="text-muted text-lg max-w-2xl">
          Explora los lugares más fascinantes de Bolivia. Cada destino tiene una
          historia que contar y una experiencia que ofrecer.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : destinos.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-xl font-semibold mb-2">Próximamente</h2>
          <p className="text-muted">Estamos agregando nuevos destinos.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinos.map((destino, index) => (
            <motion.div
              key={destino._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
      )}
    </div>
  )
}
