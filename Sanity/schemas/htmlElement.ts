import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const htmlElement = defineType({
  name: 'htmlElement',
  type: 'object',
  title: 'Just an HTML Element',
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
      name: 'htmlElement',
      description: 'Just an HTML Element',
      type: 'text',
    }),
    defineField({
      name: 'isCentered',
      title: 'Centered Content?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      initialValue: 'full',
      options: {
        list: [
          { 
            title: "full", 
            value: "full" 
          },
          { 
            title: "medium", 
            value: "medium" 
          },
          { 
            title: "small", 
            value: "small" 
          },
        ],
      },
    }),
    defineField({
      name: 'sectionType',
      type: 'string',
      initialValue: 'standard',
      options: {
        list: [
          { 
            title: "standard", 
            value: "standard" 
          },
          { 
            title: "Fullwidth Background", 
            value: "fullwidthBackground" 
          },
          { 
            title: "Fullwidth Content", 
            value: "fullwidthContent" 
          },
        ],
      },
    }),
    defineField({
      name: 'id',
      title: 'Define custom ID',
      type: 'string',
    }),
    defineField({
      name: 'disabelScrollIntoViewAnimation',
      title: 'Disable scroll-into-view animation',
      type: 'boolean',
    }),
  ],
  icon: DocumentTextIcon,
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Just an HTML Element',
        media: DocumentTextIcon,
      }
    },
  },
})