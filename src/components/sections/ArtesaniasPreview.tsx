'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { artesaniasFeaturedQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { CardSkeleton } from '@/components/ui/Skeleton'

interface Artesania {
  _id: string
  name: string
  slug: { current: string }
  precio: number
  description?: string
  images?: any[]
  stock?: boolean
}

export default function ArtesaniasPreview() {
  const [items, setItems] = useState<Artesania[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Artesania[]>(artesaniasFeaturedQuery)
      .then((data) => {
        setItems(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto mb-4" />
            <div className="h-5 w-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </section>
    )
  }

  if (items.length === 0) return null

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Artesanías</h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Productos únicos hechos a mano por artesanos ayacuchanos
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group bg-white dark:bg-accent-light border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
            >
              <Link href={`/artesanias/${item.slug.current}`} className="block">
                <div className="aspect-square overflow-hidden">
                  {item.images?.[0] && (
                    <img
                      src={urlFor(item.images[0]).width(400).height(400).url()}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                </div>
              </Link>
              <div className="p-3 sm:p-4">
                <Link href={`/artesanias/${item.slug.current}`}>
                  <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                    {item.name}
                  </h3>
                </Link>
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

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            href="/artesanias"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Ver todas las artesanías <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
