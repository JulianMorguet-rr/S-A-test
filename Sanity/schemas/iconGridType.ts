import {defineArrayMember, defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'


export const iconGrid = defineType({
  name: 'iconGrid',
  type: 'object',
  title: 'Icon Grid',
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
      name: 'blockContent',
      title: 'Text',
      type: 'blockContent',
    }),
    defineField({
      name: 'iconItems',
      title: 'Icon Items',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'heading',
              type: 'string',
            }),
            defineField({
              name: 'text',
              title: 'content',
              type: 'blockContent',
            }),
          ],
        }),
      ],
    }),

  
    // defineField({
    //   name: 'cta',
    //   title: 'Call to action',
    //   type: 'object',
    //   fields: [
    //     defineField({
    //       name: 'useCTA',
    //       type: 'boolean',
    //       initialValue: false,
    //     }),
    //     defineField({
    //       name: 'ctaText',
    //       type: 'string',
    //       hidden: ({parent, value}) => parent?.useCTA !== true,
    //     }),
    //     defineField({
    //       name: 'isCTACustomURL',
    //       type: 'boolean',
    //       initialValue: false,
    //       hidden: ({parent, value}) => parent?.useCTA !== true,
    //     }),
    //     defineField({
    //       name: 'ctaReferenz',
    //       title: 'Referenz to page',
    //       type: 'reference',
    //       to: [{type: 'page'}],
    //       hidden: ({parent, value}) => parent?.isCTACustomURL !== false || parent?.useCTA !== true,
    //     }),
    //     defineField({
    //       name: 'customCtaURL',
    //       title: 'Custom URL',
    //       type: 'string',
    //       hidden: ({parent, value}) => parent?.isCTACustomURL !== true || parent?.useCTA !== true,
    //     }),
    //     defineField({
    //       name: 'openInNewTab',
    //       title: 'Open URL in new Tab',
    //       type: 'boolean',
    //       initialValue: false,
    //       hidden: ({parent, value}) => parent?.useCTA !== true,
    //     }),
    //   ],
    // }),

    defineField({
      name: 'isCentered',
      title: 'Center Content',
      initialValue: false,
      type: 'boolean',
    }),

    defineField({
      name: 'customID',
      title: 'Custom Section ID (z.B. für Ankerlinks)',
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
      backendTitle: 'backendTitle',
      image: 'media.image' || 'media.video',
    },
    prepare({title, backendTitle, image}) {
      return {
        title: backendTitle || title || 'Untitled',
        subtitle: 'Icon Grid',
        media: image || DocumentTextIcon,
      }
    },
  },
})