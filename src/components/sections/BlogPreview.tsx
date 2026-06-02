'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { truncate } from '@/lib/utils'
import { CardSkeleton } from '@/components/ui/Skeleton'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  portada?: any
  publishedAt?: string
  author?: string
}

export default function BlogPreview() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Post[]>(blogPostsQuery)
      .then((data) => {
        setPosts((data || []).slice(0, 3))
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </section>
    )
  }

  if (posts.length === 0) return null

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
            Blog de Viajes
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto">
            Tips, guías y recomendaciones para tu próxima aventura
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/blog/${post.slug.current}`}
                className="group block bg-white dark:bg-accent-light border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  {post.portada && (
                    <img
                      src={urlFor(post.portada).width(500).height(350).url()}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                </div>
                <div className="p-5">
                  {post.publishedAt && (
                    <p className="flex items-center gap-1 text-sm text-muted mb-2">
                      <Calendar size={14} />
                      {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                  <h3 className="font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className="text-sm text-muted">{truncate(post.excerpt, 120)}</p>
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
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold transition-colors"
          >
            Ver más artículos <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
