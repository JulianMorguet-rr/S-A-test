import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'

export const statementCollection = defineType({
  name: 'statementCollection',
  title: 'Zitat Sammlung',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
        name: 'tagline', 
        title: 'Frontend Tagline',
        type: 'string'
    }),
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
        name: 'statementArray',
        type: 'array',
        title: 'Statement Sammlung',
        of: [
            defineArrayMember({
                name: 'statement',
                title: 'Statement',
                type: 'reference',
                to: [{type: 'singleStatement' }],
            }),
        ],
    }),
    defineField({
        name: 'cta', 
        title: 'CTA',
        type: 'object',
        fields: [
            defineField({
                name: 'ctaText',
                title: 'CTA Text',
                type: 'string',
            }),
            defineField({
                name: 'ctaLink',
                title: 'CTA Link',
                type: 'reference',
                to: [{type: 'page' }],
            }),
        ]
    }),
    defineField({
      name: 'id',
      title: 'Define custom ID',
      type: 'string',
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
        subtitle: 'Statement Sammlung Slider',
      }
    },
  },
})