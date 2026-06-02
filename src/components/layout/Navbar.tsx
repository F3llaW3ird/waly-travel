'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingBag, Plane, MapPin, Package, PenLine, Phone } from 'lucide-react'
import DarkModeToggle from '@/components/ui/DarkModeToggle'
import { useCart } from '@/hooks/useCart'
import { SITE_NAME, NAV_LINKS } from '@/lib/constants'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const iconMap: Record<string, React.ReactNode> = {
  'Planes': <Package size={18} />,
  'Destinos': <MapPin size={18} />,
  'Artesanías': <ShoppingBag size={18} />,
  'Pasajes': <Plane size={18} />,
  'Blog': <PenLine size={18} />,
  'Contacto': <Phone size={18} />,
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const itemsCount = useCart((s) => s.itemsCount())

  return (
    <nav className="sticky top-0 z-40 bg-white/80 dark:bg-accent/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/lotus-logo.PNG" alt="Waly Travel" width={32} height={32} className="object-contain" />
            <span className="text-xl font-bold text-gradient">{SITE_NAME}</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-primary transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-accent-light"
              >
                {iconMap[link.label]}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Link
              href="/artesanias"
              className="relative p-2 text-muted hover:text-primary transition-colors"
            >
              <ShoppingBag size={20} />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {itemsCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 text-muted hover:text-primary transition-colors"
              aria-label="Menú"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-border overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-muted hover:text-primary hover:bg-gray-100 dark:hover:bg-accent-light rounded-lg transition-colors"
                >
                  {iconMap[link.label]}
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
