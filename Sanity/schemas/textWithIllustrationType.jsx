import {defineField, defineType} from 'sanity'
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

/**
 * End of customization
 */

export const textWithIllustrationType = defineType({
  name: 'textWithIllustration',
  type: 'object',
  title: 'Text with Illustration',
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
        }),
        defineField({
          name: 'ctaReferenz',
          title: 'Referenz to page',
          type: 'reference',
          to: [{type: 'page'}],
          hidden: ({parent, value}) => !parent?.isCTACustomURL !== true,
        }),
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
        }),
      ],
    }),
    defineField({
      name: 'switchImageToRightSide',
      title: 'Switch image to right side',
      type: 'boolean',
    }),
    defineField({
      name: 'fullwidth',
      title: 'Is row fullwidth? (image will be in the corner of the screen)',
      type: 'boolean',
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
  ],
  preview: {
    select: {
      title: 'heading',
      image: 'media.image' || 'media.video',
    },
    prepare({title, image}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Text width Media',
        media: image || DocumentTextIcon,
      }
    },
  },
})