import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const imageGalleryType = defineType({
  name: 'gallery',
  type: 'object',
  title: 'Gallery',
  icon: ImagesIcon,
  fields: [
    {
      name: 'heading',
      type: 'string',
    },
    {
      name: 'subheading',
      type: 'string',
    },
    {
      name: 'images',
      type: 'array',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        }),
      ],
      options: {
        layout: 'grid',
      },
    },
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'image',
    },
    prepare({images}) {
      return {
        title: 'Image Gallerie',
        subtitle: 'Image Galleire',
        media: images || ImagesIcon,
      }
    },
  },
})