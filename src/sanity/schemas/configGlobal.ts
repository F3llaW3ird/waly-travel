import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'configGlobal',
  title: 'Configuración Global',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título del sitio',
      type: 'string',
      initialValue: 'Waly Travel',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'whatsappNumber',
      title: 'Número de WhatsApp',
      type: 'string',
      description: 'Ej: 59170000000 (sin + ni espacios)',
    }),
    defineField({
      name: 'whatsappMessage',
      title: 'Mensaje predeterminado de WhatsApp',
      type: 'text',
    }),
    defineField({
      name: 'email',
      title: 'Correo electrónico',
      type: 'string',
    }),
    defineField({
      name: 'direccion',
      title: 'Dirección',
      type: 'string',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'tiktok',
      title: 'TikTok URL',
      type: 'url',
    }),
    defineField({
      name: 'aboutText',
      title: 'Texto "Sobre Nosotros"',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text',
    }),
  ],
})
