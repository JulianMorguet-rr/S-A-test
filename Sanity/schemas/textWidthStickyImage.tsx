import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

/**
 * Customize visualization in the studio
 * @see https://www.sanity.io/docs/customizing-the-portable-text-editor
 */

import React from 'react'


// Props 
interface Props {
  children: React.ReactNode | undefined;
}

const HighlightIcon = () => (
  <span style={{ fontWeight: 'bold' }}>H</span>
)
const HighlightDecorator = (props: Props) => (
  <span style={{ backgroundColor: '#74b730' }}>{props.children}</span>
)

const MarkDecorator = (props: Props) => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

/**
 * End of customization
 */

export const textWithStickyImage = defineType({
  name: 'textWithStickyImage',
  type: 'object',
  title: 'Text with sticky Image',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'backendTitle',
      title: 'Backend Title | Bezeichnung im Backend',
      type: 'string',
    }),
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
          initialValue: false,
        }),
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent, value}) => !parent?.isVideo !== true,
        }),
        defineField({
          name: 'imageAltText',
          title: 'Alternativ text für Bild',
          type: 'string',
          hidden: ({parent, value}) => !parent?.isVideo !== true,
        }),
        defineField({
          name: 'video',
          type: 'reference',
          to: [{type: 'uploadedVideo'}],
          hidden: ({parent, value}) => !parent?.isVideo !== false,
        }),
        defineField({
          name: 'videoAltText',
          title: 'Alternativ text für Video',
          type: 'string',
          hidden: ({parent, value}) => !parent?.isVideo !== false,
        }),
        defineField({
          name: 'videoThumbnail',
          title: 'Video Thumbnail',
          type: 'image',
          options: {hotspot: true},
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
          name: 'useCTA',
          type: 'boolean',
          initialValue: false,
        }),
        defineField({
          name: 'ctaText',
          type: 'string',
          hidden: ({parent, value}) => parent?.useCTA !== true,
        }),
        defineField({
          name: 'isCTACustomURL',
          type: 'boolean',
          initialValue: false,
          hidden: ({parent, value}) => parent?.useCTA !== true,
        }),
        defineField({
          name: 'ctaReferenz',
          title: 'Referenz to page',
          type: 'reference',
          to: [{type: 'page'}],
          hidden: ({parent, value}) => parent?.isCTACustomURL !== false || parent?.useCTA !== true,
        }),
        defineField({
          name: 'customCtaURL',
          title: 'Custom URL',
          type: 'string',
          hidden: ({parent, value}) => parent?.isCTACustomURL !== true || parent?.useCTA !== true,
        }),
        defineField({
          name: 'openInNewTab',
          title: 'Open URL in new Tab',
          type: 'boolean',
          initialValue: false,
          hidden: ({parent, value}) => parent?.useCTA !== true,
        }),
      ],
    }),
    defineField({
      name: 'customID',
      title: 'Custom Section ID (z.B. für Ankerlinks)',
      type: 'string',
    }),
    defineField({
      name: 'switchImageToRightSide',
      title: 'Switch image to right side',
      type: 'boolean',
      initialValue: false,
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
      backendTitle: 'backendTitle',
      image: 'media.image' || 'media.video',
    },
    prepare({title, backendTitle, image}) {
      return {
        title: backendTitle || title || 'Untitled',
        subtitle: 'Text width sticky image',
        media: image || DocumentTextIcon,
      }
    },
  },
})