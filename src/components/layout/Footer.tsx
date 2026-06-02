'use client'

import Link from 'next/link'
import { Plane, Mail, MapPin, MessageCircle } from 'lucide-react'
import { useConfig } from '@/hooks/useConfig'
import { SITE_NAME, NAV_LINKS } from '@/lib/constants'

export default function Footer() {
  const { config } = useConfig()

  return (
    <footer className="bg-accent text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Plane className="w-6 h-6 text-primary" />
              <span className="text-lg font-bold">{SITE_NAME}</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tu agencia de viajes de confianza. Descubre los mejores destinos,
              planes turísticos y artesanías de Bolivia.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <ul className="space-y-3">
              {config?.direccion && (
                <li className="flex items-start gap-2 text-gray-400 text-sm">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  {config.direccion}
                </li>
              )}
              {config?.email && (
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail size={16} className="shrink-0" />
                  {config.email}
                </li>
              )}
              {config?.whatsappNumber && (
                <li className="flex items-center gap-2 text-gray-400 text-sm">
                  <MessageCircle size={16} className="shrink-0" />
                  +{config.whatsappNumber}
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <div className="flex gap-3">
              {config?.facebook && (
                <a
                  href={config.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-accent-light hover:bg-primary rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
              )}
              {config?.instagram && (
                <a
                  href={config.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-accent-light hover:bg-primary rounded-full transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              )}
              {config?.whatsappNumber && (
                <a
                  href={`https://wa.me/${config.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-accent-light hover:bg-primary rounded-full transition-colors"
                >
                  <MessageCircle size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} {SITE_NAME}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
