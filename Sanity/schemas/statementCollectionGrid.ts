import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'

export const statementCollectionGrid = defineType({
  name: 'statementCollectionGrid',
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
        name: 'blockContent',
        title: 'Frontend Paragraph below Headline',
        type: 'array',
        of: [
            {
                type: 'block',
            }
        ]
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
  ],
  preview: {
    select: {
      title: 'heading',
    },
    // this must be "title" even if the field is named "heading" in the schema
    prepare({title}) {
      return {
        title: title , // || 'Untitled'
        subtitle: 'Statement Sammlung Grid',
      }
    },
  },
})