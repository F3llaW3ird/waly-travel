'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, PenLine } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { blogPostsQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import { truncate } from '@/lib/utils'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
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

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client
      .fetch<Post[]>(blogPostsQuery)
      .then((data) => {
        setPosts(data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Blog de Viajes</h1>
        <p className="text-muted text-lg max-w-2xl">
          Tips, guías, recomendaciones y las mejores historias de viaje para
          inspirar tu próxima aventura.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20">
          <PenLine size={48} className="mx-auto text-muted mb-4" />
          <h2 className="text-xl font-semibold mb-2">Próximamente</h2>
          <p className="text-muted">
            Estamos escribiendo artículos interesantes para ti.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                href={`/blog/${post.slug.current}`}
                className="group block bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-48 overflow-hidden">
                  {post.portada ? (
                    <img
                      src={urlFor(post.portada).width(500).height(350).url()}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <PenLine size={32} className="text-muted" />
                    </div>
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
                    <p className="text-sm text-muted">
                      {truncate(post.excerpt, 120)}
                    </p>
                  )}
                  {post.author && (
                    <p className="text-xs text-muted mt-3">Por {post.author}</p>
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
