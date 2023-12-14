import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

/**
 * Customize visualization in the studio
 * 
 */

import React from 'react'

const HighlightIcon = () => (
  <span style={{ fontWeight: 'bold' }}>H</span>
)
const HighlightDecorator = (props: any) => (
  <span style={{ backgroundColor: '#74b730' }}>{props.children}</span>
)

const MarkDecorator = (props: any) => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

/**
 * End of customization
 */
export const textSectionType = defineType({
  name: 'textSection',
  type: 'object',
  title: 'Text Section',
  icon: DocumentTextIcon,
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
      name: 'isCentered',
      title: 'Centered Content?',
      type: 'boolean',
      initialValue: false,
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
      name: 'cta',
      title: 'Call to action',
      type: 'object',
      fields: [
        defineField({
          name: 'ctaText',
          type: 'string',
        }),
        defineField({
          name: 'isCTACustomURL',
          type: 'boolean',
          initialValue: false,
        }),
        // defineField({
        //   name: 'ctaReferenz',
        //   title: 'Referenz to page',
        //   type: 'reference',
        //   to: [{type: 'page'}],
        //   hidden: ({parent, value}) => !parent?.isCTACustomURL !== true,
        // }),
        defineField({
          name: 'customCtaURL',
          title: 'Custom URL',
          type: 'string',
          hidden: ({parent, value}) => !parent?.isCTACustomURL !== false,
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open URL in new Tab',
          type: 'boolean',
          initialValue: false,
        }),
      ],
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
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'media.image'
    },
    prepare({title, image}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Text Section',
        media: image || DocumentTextIcon,
      }
    },
  },
})