import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'

export const quoteType = defineType({
  name: 'quoteCollection',
  title: 'Zitat Sammlung',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
        name: 'heading', 
        title: 'Frontend Headline',
        type: 'string'
    }),
    defineField({
        name: 'paragraph', 
        title: 'Frontend Paragraph below Headline',
        type: 'text'
    }),
    defineField({
        name: 'quoteArray',
        type: 'array',
        title: 'Zitat Sammlung',
        of: [
            defineArrayMember({
                name: 'quotes',
                title: 'Zitate',
                type: 'reference',
                to: [{type: 'quotes' }],
            }),
        ],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    // this must be "title" even if the field is named "heading" in the schema
    prepare({title}) {
      return {
        title: title , // || 'Untitled'
        subtitle: 'Zitatsammlung',
      }
    },
  },
})