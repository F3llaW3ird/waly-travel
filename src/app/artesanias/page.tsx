'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { artesaniasQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { CardSkeleton } from '@/components/ui/Skeleton'

interface Artesania {
  _id: string
  name: string
  slug: { current: string }
  precio: number
  description?: string
  images?: any[]
  stock?: boolean
  categoria?: { name: string }
}

export default function ArtesaniasPage() {
  const [items, setItems] = useState<Artesania[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Artesania[]>(artesaniasQuery)
      .then((data) => {
        setItems(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Artesanías' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Artesanías</h1>
        <p className="text-muted text-lg max-w-2xl">
          Productos hechos a mano por artesanos bolivianos. Lleva un pedazo de
          nuestra cultura contigo.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={48} className="mx-auto text-muted mb-4" />
          <h2 className="text-xl font-semibold mb-2">Próximamente</h2>
          <p className="text-muted">
            Estamos preparando nuestra colección de artesanías.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <Link
                href={`/artesanias/${item.slug.current}`}
                className="block"
              >
                <div className="aspect-square overflow-hidden">
                  {item.images?.[0] ? (
                    <img
                      src={urlFor(item.images[0]).width(400).height(400).url()}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <ShoppingBag size={32} className="text-muted" />
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-3 sm:p-4">
                <Link href={`/artesanias/${item.slug.current}`}>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
                {item.categoria?.name && (
                  <p className="text-xs text-muted mb-1">{item.categoria.name}</p>
                )}
                <p className="text-primary font-bold text-sm sm:text-base mb-2">
                  {formatPrice(item.precio)}
                </p>
                <WhatsAppButton
                  message={`Hola! Quiero comprar: ${item.name} (${formatPrice(item.precio)})`}
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
