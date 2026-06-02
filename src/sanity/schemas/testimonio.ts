import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonio',
  title: 'Testimonio',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del cliente',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'foto',
      title: 'Foto del cliente',
      type: 'image',
    }),
    defineField({
      name: 'text',
      title: 'Testimonio',
      type: 'text',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'calificacion',
      title: 'Calificación (1-5)',
      type: 'number',
      validation: (rule) => rule.min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: 'destino',
      title: 'Destino visitado',
      type: 'reference',
      to: [{ type: 'destino' }],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'text',
      media: 'foto',
    },
  },
})
