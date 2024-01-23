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
  title: 'Advanced Text with Sticky Image',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'backendTitle',
      title: 'Backend Title | Bezeichnung im Backend',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'useCustomColorGradiend',
      title: 'Use custom color gradient for Heading',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'customColorGradient',
      title: 'Custom color gradient',
      type: 'object',
      hidden: ({parent, value}) => parent?.useCustomColorGradiend !== true,
      fields: [
        defineField({
          name: 'color1',
          title: 'Color 1',
          type: 'string',
          initialValue: '#000000',
          validation: Rule => Rule.custom((color1) => {
            // write a function that checks if the color is valid
            if(typeof color1 !== 'string') return 'Please enter a valid color'
            if (color1.charAt(0) !== '#') return 'Please enter a valid color'
            const hex = color1.slice(1);
            if (hex.length !== 3 && hex.length !== 6) return 'Please enter a valid color'
            for (let i = 0; i < hex.length; i++) {
              const char = hex.charAt(i).toLowerCase();
              if (!(/[0-9a-f]/.test(char))) {
                return 'Please enter a valid color'
              }
            }
            return true
          })
        }),
        defineField({
          name: 'color2',
          title: 'Color 2',
          type: 'string',
          initialValue: '#000000',
          validation: Rule => Rule.custom((color1) => {
            // write a function that checks if the color is valid
            if(typeof color1 !== 'string') return 'Please enter a valid color'
            if (color1.charAt(0) !== '#') return 'Please enter a valid color'
            const hex = color1.slice(1);
            if (hex.length !== 3 && hex.length !== 6) return 'Please enter a valid color'
            for (let i = 0; i < hex.length; i++) {
              const char = hex.charAt(i).toLowerCase();
              if (!(/[0-9a-f]/.test(char))) {
                return 'Please enter a valid color'
              }
            }
            return true
          })
        }),
      ],
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
        defineField({
          name: 'position',
          title: 'Position',
          type: 'string',
          initialValue: 'center',
          options: {
            list: [
              { 
                title: "center", 
                value: "center" 
              },
              { 
                title: "top", 
                value: "top" 
              },
            ],
          },
        }),
        defineField({
          name: 'isSticky',
          title: 'Sticky',
          type: 'boolean',
          initialValue: false,
          hidden: ({parent, value}) => parent?.position !== 'top',
        })
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
      name: 'gridCols',
      title: 'Grid Columns',
      type: 'string',
      initialValue: 'oneHalfOneHalf',
      options: {
        list: [
          { 
            title: "50/50", 
            value: "oneHalfOneHalf" 
          },
          { 
            title: "33/66", 
            value: "oneThirdTwoThirds" 
          },
          { 
            title: "66/33", 
            value: "twoThirdsOneThird" 
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
      name: 'disabelScrollIntoViewAnimation',
      title: 'Disable scroll-into-view animation',
      type: 'boolean',
      initialValue: false,
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
        subtitle: 'Advanced Text with Image',
        media: image || DocumentTextIcon,
      }
    },
  },
})