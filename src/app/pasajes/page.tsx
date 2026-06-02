'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Plane,
  Search,
  Calendar,
  ArrowRightLeft,
  Users,
  ArrowRight,
} from 'lucide-react'
import WhatsAppButton from '@/components/ui/WhatsAppButton'
import Breadcrumbs from '@/components/ui/Breadcrumbs'

const destinations = [
  'Lima',
  'Ayacucho',
  'Cusco',
  'Arequipa',
  'Trujillo',
  'Iquitos',
  'Pucallpa',
  'Tarapoto',
  'Piura',
]

export default function PasajesPage() {
  const [origen, setOrigen] = useState('')
  const [destino, setDestino] = useState('')
  const [fecha, setFecha] = useState('')
  const [pasajeros, setPasajeros] = useState(1)
  const [searched, setSearched] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!origen || !destino) return
    setSearched(true)
  }

  const handleSwap = () => {
    setOrigen(destino)
    setDestino(origen)
  }

  const whatsappMessage = `Hola! Quiero información sobre pasajes aéreos:\n- Origen: ${origen || 'No especificado'}\n- Destino: ${destino || 'No especificado'}\n- Fecha: ${fecha || 'No especificada'}\n- Pasajeros: ${pasajeros}`

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Breadcrumbs items={[{ label: 'Pasajes Aéreos' }]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Pasajes Aéreos</h1>
        <p className="text-muted text-lg max-w-2xl">
          Busca y reserva tus pasajes aéreos. Consulta disponibilidad y precios
          a través de nuestro WhatsApp.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-6 sm:p-8 mb-10"
      >
        <form onSubmit={handleSearch}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Origen</label>
              <div className="relative">
                <Plane
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <select
                  value={origen}
                  onChange={(e) => setOrigen(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="">Seleccionar</option>
                  {destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-1.5">Destino</label>
              <div className="relative">
                <Plane
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted rotate-90"
                />
                <select
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
                >
                  <option value="">Seleccionar</option>
                  {destinations
                    .filter((d) => d !== origen)
                    .map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="button"
                onClick={handleSwap}
                className="absolute -right-3 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full hidden md:block hover:bg-primary-dark transition-colors"
              >
                <ArrowRightLeft size={14} />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Fecha</label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
                <input
                  type="date"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-background text-foreground border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Pasajeros</label>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <Search size={20} />
            Buscar Vuelos
          </button>
        </form>
      </motion.div>

      {searched && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8 text-center"
        >
          <Plane size={48} className="mx-auto text-primary mb-4" />
          <h2 className="text-xl font-semibold mb-2">
            Vuelo: {origen} → {destino}
          </h2>
          <p className="text-muted mb-6">
            Consulta disponibilidad y precios directamente en nuestro WhatsApp.
          </p>
          <WhatsAppButton message={whatsappMessage} size="lg" />
        </motion.div>
      )}
    </div>
  )
}
