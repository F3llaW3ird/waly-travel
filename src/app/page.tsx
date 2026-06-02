import Hero from '@/components/sections/Hero'
import DestinosDestacados from '@/components/sections/DestinosDestacados'
import PlanesPreview from '@/components/sections/PlanesPreview'
import ArtesaniasPreview from '@/components/sections/ArtesaniasPreview'
import Testimonios from '@/components/sections/Testimonios'
import BlogPreview from '@/components/sections/BlogPreview'
import Newsletter from '@/components/sections/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <DestinosDestacados />
      <PlanesPreview />
      <ArtesaniasPreview />
      <Testimonios />
      <BlogPreview />
      <Newsletter />
    </>
  )
}
