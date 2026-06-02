import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'planTuristico',
  title: 'Plan Turístico',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del plan',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'precio',
      title: 'Precio (Bs)',
      type: 'number',
      validation: (rule) => rule.required().positive(),
    }),
    defineField({
      name: 'duracion',
      title: 'Duración',
      type: 'string',
      description: 'Ej: 3 días / 2 noches',
    }),
    defineField({
      name: 'destino',
      title: 'Destino',
      type: 'reference',
      to: [{ type: 'destino' }],
    }),
    defineField({
      name: 'includes',
      title: 'Incluye',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'excludes',
      title: 'No incluye',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'itinerary',
      title: 'Itinerario',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'day', title: 'Día', type: 'number' },
            { name: 'title', title: 'Título', type: 'string' },
            { name: 'description', title: 'Descripción', type: 'text' },
          ],
        },
      ],
    }),
    defineField({
      name: 'images',
      title: 'Imágenes',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'reference',
      to: [{ type: 'categoria' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'precio',
      media: 'images.0',
    },
  },
})
