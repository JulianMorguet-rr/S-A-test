import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const justAnImage = defineType({
  name: 'justAnImage',
  type: 'object',
  title: 'Just an fullwidth image',
  fields: [
    defineField({
      name: 'tagline',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        }),
      ],
    }),
    // defineField({
    //   name: 'referenceToPage',
    //   type: 'reference',
    //   to: [{type: 'page' }]
    // }),
  ],
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'heading',
      image: 'image',
    },
    prepare({title, image}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Just An Image',
        media: image || DocumentTextIcon,
      }
    },
  },
})