import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'


/**
 * Customize visualization in the studio
 * @see https://www.sanity.io/docs/customizing-the-portable-text-editor
 */

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


export const statementType = defineType({
  name: 'singleStatement',
  title: 'Einzelnes Statement',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel | Nur im Backend sichtbar',
      type: 'string',
  }),
    defineField({
      name: 'authorOfStatement', 
      title: 'Author/Quelle des Statements',
      type: 'string'
    }),
    defineField({
      name: 'positionOfAuthor', 
      title: 'Position/Job des Authors',
      type: 'string'
    }),
    defineField({
        name: 'heading', 
        title: 'Frontend Headline',
        type: 'string'
    }),
    // defineField({
    //     name: 'paragraph', 
    //     title: 'Frontend Paragraph below Headline',
    //     type: 'text'
    // }),
    defineField({
        name: 'blockContent',
        title: 'Text des Statements',
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
      name: 'media',
      title: 'Attach media',
      type: 'object',
      fields: [
        defineField({
          name: 'isVideo',
          title: 'Attach Video instead of image',
          type: 'boolean',
        }),
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent, value}) => !parent?.isVideo !== true,
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
        defineField({
          name: 'video',
          type: 'reference',
          to: [{type: 'uploadedVideo'}],
          hidden: ({parent, value}) => !parent?.isVideo !== false,
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      authorOfStatement: 'authorOfStatement'
    },
    prepare(selection) {
      const {title, authorOfStatement } = selection
      return {
        title: title || 'Einzelnes Statement' , // || 'Untitled'
        subtitle: authorOfStatement,
      }
    },
  },
})