'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { testimoniosQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { Skeleton } from '@/components/ui/Skeleton'

interface Testimonio {
  _id: string
  name: string
  foto?: any
  text: string
  calificacion?: number
  destino?: { name: string }
}

export default function Testimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Testimonio[]>(testimoniosQuery)
      .then((data) => {
        setTestimonios(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const prev = () => setCurrent((c) => (c === 0 ? testimonios.length - 1 : c - 1))
  const next = () => setCurrent((c) => (c === testimonios.length - 1 ? 0 : c + 1))

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-5 w-96 mx-auto mb-10" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
      </section>
    )
  }

  if (testimonios.length === 0) return null

  const t = testimonios[current]

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Lo que dicen nuestros viajeros
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-card border border-border rounded-2xl p-8 sm:p-10 text-center"
            >
              <Quote className="w-10 h-10 text-primary/30 mx-auto mb-4" />
              <p className="text-lg sm:text-xl text-muted italic mb-6 leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-1 mb-4">
                {Array.from({ length: t.calificacion || 5 }).map((_, i) => (
                  <Star key={i} size={18} className="fill-secondary text-secondary" />
                ))}
              </div>

              <div className="flex items-center justify-center gap-3">
                {t.foto && (
                  <img
                    src={urlFor(t.foto).width(60).height(60).url()}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold">{t.name}</p>
                  {t.destino?.name && (
                    <p className="text-sm text-muted">{t.destino.name}</p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonios.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 p-2 bg-card border border-border rounded-full hover:bg-gray-100 dark:hover:bg-accent-light transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 p-2 bg-card border border-border rounded-full hover:bg-gray-100 dark:hover:bg-accent-light transition-colors"
              >
                <ChevronRight size={20} />
              </button>

              <div className="flex justify-center gap-2 mt-6">
                {testimonios.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === current
                        ? 'bg-primary w-6'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
