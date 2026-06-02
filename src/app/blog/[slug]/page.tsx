'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, User, PenLine } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { blogPostBySlugQuery } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import { Skeleton } from '@/components/ui/Skeleton'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

interface Post {
  _id: string
  title: string
  excerpt?: string
  content?: any[]
  portada?: any
  publishedAt?: string
  author?: string
  tags?: string[]
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.slug) return
    client
      .fetch<Post>(blogPostBySlugQuery, { slug: params.slug })
      .then((data) => {
        setPost(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [params.slug])

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10">
        <Skeleton className="h-5 w-48 mb-6" />
        <Skeleton className="h-10 w-full mb-4" />
        <Skeleton className="h-5 w-64 mb-8" />
        <Skeleton className="h-64 w-full rounded-2xl mb-8" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <PenLine size={48} className="mx-auto text-muted mb-4" />
        <h1 className="text-2xl font-bold mb-4">Artículo no encontrado</h1>
        <Link
          href="/blog"
          className="text-primary hover:text-primary-dark font-semibold"
        >
          ← Volver al blog
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-sm text-muted mb-6 flex-wrap">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          )}
          {post.author && (
            <span className="flex items-center gap-1.5">
              <User size={16} />
              {post.author}
            </span>
          )}
        </div>

        {post.portada && (
          <div className="h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <img
              src={urlFor(post.portada).width(800).height(500).url()}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {post.content && (
          <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-foreground leading-relaxed">
            {post.content.map((block: any, i: number) => {
              if (block._type === 'block') {
                return (
                  <p key={i} className="mb-4">
                    {block.children.map((c: any) => c.text).join('')}
                  </p>
                )
              }
              return null
            })}
          </div>
        )}

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 mb-6">
            {post.tags.map((tag, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-gray-100 dark:bg-accent-light rounded-full text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-border pt-6 mt-6">
          <p className="text-muted mb-3">
            ¿Te gustó este artículo? Compártelo o consulta más información.
          </p>
          <WhatsAppButton
            message={`Hola! Quiero más información sobre el artículo: ${post.title}`}
            size="md"
          />
        </div>
      </motion.article>
    </div>
  )
}
