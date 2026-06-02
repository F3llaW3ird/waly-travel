'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Image as ImageIcon } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { destinoBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Skeleton } from '@/components/ui/Skeleton'

interface Destino {
  _id: string
  name: string
  ubicacion?: string
  images?: any[]
  description?: any[]
}

export default function DestinoDetailPage() {
  const params = useParams()
  const [destino, setDestino] = useState<Destino | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!params.slug) return
    client
      .fetch<Destino>(destinoBySlugQuery, { slug: params.slug })
      .then((data) => {
        setDestino(data)
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
        <Skeleton className="h-5 w-64 mb-8" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!destino) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Destino no encontrado</h1>
        <Link
          href="/destinos"
          className="text-primary hover:text-primary-dark font-semibold"
        >
          ← Volver a destinos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Destinos', href: '/destinos' },
          { label: destino.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-3">
            {destino.images?.[selectedImage] ? (
              <img
                src={urlFor(destino.images[selectedImage])
                  .width(800)
                  .height(600)
                  .url()}
                alt={destino.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <ImageIcon size={48} className="text-muted" />
              </div>
            )}
          </div>
          {destino.images && destino.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {destino.images.map((img: any, i: number) => (
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {destino.name}
            </h1>

            {destino.ubicacion && (
              <p className="flex items-center gap-1.5 text-muted mb-6">
                <MapPin size={18} />
                {destino.ubicacion}
              </p>
            )}

            <div className="mb-6">
              <WhatsAppButton
                message={`Hola! Quiero información sobre el destino: ${destino.name}`}
                size="lg"
              />
            </div>

            {destino.description && (
              <div className="prose prose-sm dark:prose-invert max-w-none text-muted leading-relaxed">
                {destino.description.map((block: any, i: number) => {
                  if (block._type === 'block') {
                    return (
                      <p key={i} className="mb-3">
                        {block.children.map((c: any) => c.text).join('')}
                      </p>
                    )
                  }
                  return null
                })}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}
