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
      name: 'centerText',
      title: 'Center Text?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'useCustomColorGradient',
      title: 'Use custom color gradient',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'customColorGradient',
      title: 'Custom color gradient for Heading',
      type: 'object',
      hidden: ({parent, value}) => parent?.useCustomColorGradiend !== true,
      fields: [
        defineField({
          name: 'color1',
          title: 'Color 1',
          type: 'string',
          initialValue: '#000000',
          validation: Rule => Rule.custom((color1) => {
            // write a function that checks if the color is valid
            if(typeof color1 !== 'string') return 'Please enter a valid color'
            if (color1.charAt(0) !== '#') return 'Please enter a valid color'
            const hex = color1.slice(1);
            if (hex.length !== 3 && hex.length !== 6) return 'Please enter a valid color'
            for (let i = 0; i < hex.length; i++) {
              const char = hex.charAt(i).toLowerCase();
              if (!(/[0-9a-f]/.test(char))) {
                return 'Please enter a valid color'
              }
            }
            return true
          })
        }),
        defineField({
          name: 'color2',
          title: 'Color 2',
          type: 'string',
          initialValue: '#000000',
          validation: Rule => Rule.custom((color1) => {
            // write a function that checks if the color is valid
            if(typeof color1 !== 'string') return 'Please enter a valid color'
            if (color1.charAt(0) !== '#') return 'Please enter a valid color'
            const hex = color1.slice(1);
            if (hex.length !== 3 && hex.length !== 6) return 'Please enter a valid color'
            for (let i = 0; i < hex.length; i++) {
              const char = hex.charAt(i).toLowerCase();
              if (!(/[0-9a-f]/.test(char))) {
                return 'Please enter a valid color'
              }
            }
            return true
          })
        }),
      ],
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