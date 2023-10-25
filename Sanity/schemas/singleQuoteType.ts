import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'

export const singleQuoteType = defineType({
  name: 'singleQuote',
  title: 'Einzelnes Zitat',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    // defineField({
    //     name: 'heading', 
    //     title: 'Frontend Headline',
    //     type: 'string'
    // }),
    // defineField({
    //     name: 'tagline', 
    //     title: 'Frontend Tagline',
    //     type: 'string'
    // }),
    // defineField({
    //     name: 'paragraph', 
    //     title: 'Frontend Paragraph below Headline',
    //     type: 'text'
    // }),
    defineField({
        name: 'quoteReference',
        type: 'reference',
        title: 'Verknüpfung zu Zitat',
        to: [{type: 'quotes'}],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    // this must be "title" even if the field is named "heading" in the schema
    prepare({title}) {
      return {
        title: title || 'Einzelnes Zitat' , // || 'Untitled'
        subtitle: 'Einzelnes Zitat',
      }
    },
  },
})