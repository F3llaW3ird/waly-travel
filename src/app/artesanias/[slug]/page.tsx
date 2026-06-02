'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ShoppingBag, Image as ImageIcon, Check } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { artesaniaBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import { useCart } from '@/hooks/useCart'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Skeleton } from '@/components/ui/Skeleton'

interface Artesania {
  _id: string
  name: string
  precio: number
  description?: string
  images?: any[]
  stock?: boolean
  categoria?: { name: string }
}

export default function ArtesaniaDetailPage() {
  const params = useParams()
  const [item, setItem] = useState<Artesania | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const addItem = useCart((s) => s.addItem)

  useEffect(() => {
    if (!params.slug) return
    client
      .fetch<Artesania>(artesaniaBySlugQuery, { slug: params.slug })
      .then((data) => {
        setItem(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <Skeleton className="h-5 w-48 mb-6" />
        <Skeleton className="h-64 w-full rounded-2xl mb-6" />
        <Skeleton className="h-10 w-96 mb-4" />
        <Skeleton className="h-5 w-32 mb-8" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!item) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={48} className="mx-auto text-muted mb-4" />
        <h1 className="text-2xl font-bold mb-4">Artesanía no encontrada</h1>
        <Link
          href="/artesanias"
          className="text-primary hover:text-primary-dark font-semibold"
        >
          ← Volver a artesanías
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Artesanías', href: '/artesanias' },
          { label: item.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-3">
            {item.images?.[selectedImage] ? (
              <img
                src={urlFor(item.images[selectedImage])
                  .width(800)
                  .height(600)
                  .url()}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <ImageIcon size={48} className="text-muted" />
              </div>
            )}
          </div>
          {item.images && item.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {item.images.map((img: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                    i === selectedImage
                      ? 'border-primary'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={urlFor(img).width(100).height(80).url()}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {item.categoria?.name && (
              <p className="text-sm text-primary font-medium mb-2">
                {item.categoria.name}
              </p>
            )}
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{item.name}</h1>

            <div className="text-3xl font-bold text-primary mb-4">
              {formatPrice(item.precio)}
            </div>

            {item.stock !== undefined && (
              <p
                className={`flex items-center gap-1 text-sm mb-6 ${
                  item.stock ? 'text-green-600' : 'text-red-500'
                }`}
              >
                <Check size={16} />
                {item.stock ? 'Disponible' : 'Agotado'}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <WhatsAppButton
                message={`Hola! Quiero comprar: ${item.name} (${formatPrice(item.precio)})`}
                size="lg"
              />
              <button
                onClick={() =>
                  addItem({
                    _id: item._id,
                    name: item.name,
                    precio: item.precio,
                    quantity: 1,
                    image: item.images?.[0]
                      ? urlFor(item.images[0]).width(100).url()
                      : undefined,
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-card border border-border hover:bg-card-hover px-6 py-3 rounded-full font-semibold transition-all"
              >
                <ShoppingBag size={20} />
                Agregar al carrito
              </button>
            </div>

            {item.description && (
              <div className="text-muted leading-relaxed">{item.description}</div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
