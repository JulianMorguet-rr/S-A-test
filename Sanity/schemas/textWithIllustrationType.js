import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const textWithIllustrationType = defineType({
  name: 'textWithIllustration',
  type: 'object',
  title: 'Text with Illustration',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
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
    defineField({
      name: 'switchImageToRightSide',
      title: 'Switch image to right side',
      type: 'boolean',
    }),
    defineField({
      name: 'text',
      type: 'text',
    }),
    defineField({
      name: 'excerpt',
      type: 'text',
    }),
    
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
        subtitle: 'Text width Illustration',
        media: image || DocumentTextIcon,
      }
    },
  },
})