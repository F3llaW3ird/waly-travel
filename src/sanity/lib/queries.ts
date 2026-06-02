import { defineQuery } from 'next-sanity'

export const configQuery = defineQuery(`*[_type == "configGlobal"][0]`)

export const destinosQuery = defineQuery(`*[_type == "destino"] | order(order asc)`)

export const destinosFeaturedQuery = defineQuery(
  `*[_type == "destino" && featured == true] | order(order asc)`
)

export const destinoBySlugQuery = defineQuery(
  `*[_type == "destino" && slug.current == $slug][0]`
)

export const planesQuery = defineQuery(`*[_type == "planTuristico"] {
  ...,
  destino->,
  categoria->
} | order(precio asc)`)

export const planesFeaturedQuery = defineQuery(
  `*[_type == "planTuristico" && featured == true] {
    ...,
    destino->,
    categoria->
  } | order(precio asc)`
)

export const planBySlugQuery = defineQuery(
  `*[_type == "planTuristico" && slug.current == $slug][0] {
    ...,
    destino->,
    categoria->
  }`
)

export const artesaniasQuery = defineQuery(`*[_type == "artesania"] {
  ...,
  categoria->
} | order(name asc)`)

export const artesaniasFeaturedQuery = defineQuery(
  `*[_type == "artesania" && featured == true] {
    ...,
    categoria->
  } | order(name asc)`
)

export const artesaniaBySlugQuery = defineQuery(
  `*[_type == "artesania" && slug.current == $slug][0] {
    ...,
    categoria->
  }`
)

export const testimoniosQuery = defineQuery(`*[_type == "testimonio"] {
  ...,
  destino->
}`)

export const blogPostsQuery = defineQuery(
  `*[_type == "blogPost"] | order(publishedAt desc)`
)

export const blogPostBySlugQuery = defineQuery(
  `*[_type == "blogPost" && slug.current == $slug][0]`
)

export const categoriasQuery = defineQuery(`*[_type == "categoria"]`)
