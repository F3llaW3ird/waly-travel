import Link from 'next/link'
import { Plane } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-extrabold text-gradient mb-4">404</div>
        <h1 className="text-2xl font-bold mb-2">Página no encontrada</h1>
        <p className="text-muted mb-8 max-w-md mx-auto">
          Parece que te desviaste de la ruta. Volvamos al inicio.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-full font-semibold transition-all"
        >
          <Plane size={20} />
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}
