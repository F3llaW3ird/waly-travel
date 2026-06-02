'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Check,
  X,
  Clock,
  MapPin,
  ChevronRight,
  Image as ImageIcon,
} from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { planBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { formatPrice } from '@/lib/utils'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Skeleton } from '@/components/ui/Skeleton'

interface Plan {
  _id: string
  name: string
  precio: number
  duracion?: string
  description?: any[]
  images?: any[]
  includes?: string[]
  excludes?: string[]
  itinerary?: { day: number; title: string; description: string }[]
  destino?: { name: string; slug?: { current: string } }
}

export default function PlanDetailPage() {
  const params = useParams()
  const [plan, setPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (!params.slug) return
    client
      .fetch<Plan>(planBySlugQuery, { slug: params.slug })
      .then((data) => {
        setPlan(data)
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

  if (!plan) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4">Plan no encontrado</h1>
        <Link
          href="/planes"
          className="text-primary hover:text-primary-dark font-semibold"
        >
          ← Volver a planes turísticos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Planes Turísticos', href: '/planes' },
          { label: plan.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div>
          <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden mb-3">
            {plan.images?.[selectedImage] ? (
              <img
                src={urlFor(plan.images[selectedImage]).width(800).height(600).url()}
                alt={plan.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <ImageIcon size={48} className="text-muted" />
              </div>
            )}
          </div>
          {plan.images && plan.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {plan.images.map((img: any, i: number) => (
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">{plan.name}</h1>

            <div className="flex items-center gap-4 text-muted mb-4 flex-wrap">
              {plan.duracion && (
                <span className="flex items-center gap-1.5">
                  <Clock size={18} /> {plan.duracion}
                </span>
              )}
              {plan.destino?.name && (
                <span className="flex items-center gap-1.5">
                  <MapPin size={18} /> {plan.destino.name}
                </span>
              )}
            </div>

            <div className="text-3xl font-bold text-primary mb-6">
              {formatPrice(plan.precio)}
            </div>

            <div className="mb-6">
              <WhatsAppButton
                message={`Hola! Quiero información sobre el plan turístico: ${plan.name} (${formatPrice(plan.precio)})`}
                size="lg"
              />
            </div>

            {plan.includes && plan.includes.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Incluye:</h3>
                <ul className="space-y-1.5">
                  {plan.includes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan.excludes && plan.excludes.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">No incluye:</h3>
                <ul className="space-y-1.5">
                  {plan.excludes.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted">
                      <X size={16} className="text-red-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {plan.itinerary && plan.itinerary.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-6">Itinerario</h2>
          <div className="space-y-4">
            {plan.itinerary.map((day) => (
              <div
                key={day.day}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold shrink-0">
                    {day.day}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{day.title}</h3>
                    {day.description && (
                      <p className="text-muted text-sm">{day.description}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
