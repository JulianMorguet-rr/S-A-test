import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'

import React from 'react'

const HighlightIcon = () => (
  <span style={{ fontWeight: 'bold' }}>H</span>
)
const HighlightDecorator = props => (
  <span style={{ backgroundColor: '#74b730' }}>{props.children}</span>
)

const MarkDecorator = props => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

export const quoteCollection = defineType({
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
      name: 'blockContent',
      type: 'array',
      of: [
        {
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {
                title: 'Mark', 
                value: 'mark',
                icon: () => 'M',
                component: MarkDecorator
              },
              { 
                title: 'Highlight', 
                value: 'highlight',
                icon: HighlightIcon,
                component: HighlightDecorator
              },
              {title: 'Code', value: 'code'}
            ]
          }
        }
      ]
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