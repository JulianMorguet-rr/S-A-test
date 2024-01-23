import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [

    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'heroSettings',
      title: 'Hero Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'useHero',
          title: 'Use Hero',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'heroType',
          title: 'Hero Type',
          type: 'string',
          initialValue: 'colorGradient',
          options: {
            list: [
              { 
                title: "Farbverlauf", 
                value: "colorGradient" 
              },
              { 
                title: "image", 
                value: "image" 
              },
              { 
                title: "Mood-Video", 
                value: "moodVideo" 
              },
              { 
                title: "Text and Video-Modal", 
                value: "textAndVideoModal" 
              },
            ],
          },
        }),
      ],
    }),
    
    // ColorGradient Hero
    defineField({
      name: 'colorGradient',
      title: 'Image Hero',
      type: 'object',
      hidden: ({parent, value}) => parent?.heroSettings?.heroType !== 'colorGradient',
      fields: [
        defineField({
          name: 'title', 
          title: 'Frontend Title',
          type: 'string'
        }),
        defineField({
          name: 'text',
          title: 'Absatz',
          type: 'text'
        }),
        defineField({
          name: 'cta',
          title: 'CTA auf Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'linkName',
              title: 'Link Name',
              type: 'string'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'linkType',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      {
                        title: 'Internal',
                        value: 'internal'
                      },
                      {
                        title: 'External',
                        value: 'external'
                      },
                      {
                        title: 'Anchor',
                        value: 'anchor'
                      }
                    ]
                  }
                }),
                defineField({
                  name: 'internalLink',
                  title: 'Interner Link',
                  type: 'reference',
                  to: [{type: 'page'}],
                  hidden: ({parent, value}) => parent?.linkType !== 'internal',
                }),
                defineField({
                  name: 'externalLink',
                  title: 'Externer Link',
                  type: 'string',
                  hidden: ({parent, value}) => parent?.linkType !== 'external'
                }),
                defineField({
                  name: 'anchor',
                  title: 'Anchor',
                  type: 'string',
                  hidden: ({parent, value}) => parent?.linkType !== 'anchor'
                }),
              ]
            }),
          ],
        }),
      ],
    }),

    // Image Hero
    defineField({
      name: 'imageHero',
      title: 'Image Hero',
      type: 'object',
      hidden: ({parent, value}) => parent?.heroSettings?.heroType !== 'image',
      fields: [
        defineField({
          name: 'title', 
          title: 'Frontend Title',
          type: 'string'
        }),
        defineField({
          name: 'heroImage',
          title: 'Hero Image',
          type: 'image',
          options: {
              hotspot: true
          }
        }),
        defineField({
          name: 'heroImageAlt',
          title: 'Alt Text Hero Image',
          type: 'string'
        }),
      ],
    }),

    // Video Hero
    defineField({
      name: 'videoHero',
      title: 'Video Hero',
      type: 'object',
      hidden: ({parent, value}) => parent?.heroSettings?.heroType !== 'moodVideo',
      fields: [
        defineField({
          name: 'title',
          title: 'Titel auf Hero',
          type: 'string'
        }),
        {
          name: 'heroBackgroundVideo',
          title: 'Hero Background Video',
          // type: 'string'
          type: 'reference',
          to: [{type: 'uploadedVideo' }]
        },
      ],
    }),
    

    // Text and Video Modal Hero
    defineField({
      name: 'textAndVideoModalHero',
      title: 'Text and Video Modal Hero',
      type: 'object',
      hidden: ({parent, value}) => parent?.heroSettings?.heroType !== 'textAndVideoModal',
      fields: [
        defineField({
          name: 'title',
          title: 'Titel auf Hero',
          type: 'string'
        }),
        defineField({
          name: 'text',
          title: 'Text auf Hero',
          type: 'text'
        }),
        defineField({
          name: 'cta',
          title: 'CTA auf Hero',
          type: 'object',
          fields: [
            defineField({
              name: 'linkName',
              title: 'Link Name',
              type: 'string'
            }),
            defineField({
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'linkType',
                  title: 'Link Type',
                  type: 'string',
                  options: {
                    list: [
                      {
                        title: 'Internal',
                        value: 'internal'
                      },
                      {
                        title: 'External',
                        value: 'external'
                      },
                      {
                        title: 'Anchor',
                        value: 'anchor'
                      }
                    ]
                  }
                }),
                defineField({
                  name: 'internalLink',
                  title: 'Interner Link',
                  type: 'reference',
                  to: [{type: 'page'}],
                  hidden: ({parent, value}) => parent?.linkType !== 'internal',
                }),
                defineField({
                  name: 'externalLink',
                  title: 'Externer Link',
                  type: 'string',
                  hidden: ({parent, value}) => parent?.linkType !== 'external'
                }),
                defineField({
                  name: 'anchor',
                  title: 'Anchor',
                  type: 'string',
                  hidden: ({parent, value}) => parent?.linkType !== 'anchor'
                }),
              ]
            }),
          ],
        }),

        defineField({
          name: 'video',
          title: 'Video',
          type: 'reference',
          to: [{type: 'uploadedVideo' }]
        }),
        defineField({
          name: 'videoAlt',
          title: 'Video Alt Text',
          type: 'string'
        }),
        defineField({
          name: 'videoPoster',
          title: 'Video Poster',
          type: 'image',
          options: {
              hotspot: true
          }
        }),
        defineField({
          name: 'modalContent',
          title: 'Modal Content',
          type: 'blockContent',
        }),
      ],
    }),

    // Page builder
    defineField({
      name: 'pageBuilder',
      type: 'array',
      title: 'Page builder',
      of: [
        defineArrayMember({
          name: 'hero',
          type: 'hero',
          title: 'Hero',
        }),
        defineArrayMember({
          name: 'justAnImage',
          type: 'justAnImage',
          title: 'Fullwidth Image',
        }),
        defineArrayMember({
          name: 'textSection',
          type: 'textSection',
          title: 'Text Section',
        }),
        defineArrayMember({
          name: 'textWithTwoColumns',
          type: 'textWithTwoColumns',
          title: 'Zweispaltiger Text',
        }),
        defineArrayMember({
          name: 'textWithIllustration',
          type: 'textWithIllustration',
          title: 'Text with Illustaion',
        }),
        defineArrayMember({
          name: 'textWithStickyImage',
          type: 'textWithStickyImage',
          title: 'Advanced Text with Image',
        }),
        defineArrayMember({
          name: 'gallery',
          type: 'gallery',
          title: 'Gallery',
        }),
        defineArrayMember({
          name: 'accordionSection',
          type: 'accordionSection',
          title: 'Accordion Section',
        }),
        
        defineArrayMember({
          name: 'quoteCollection',
          type: 'quoteCollection',
          title: 'Zitat Collection',
        }),
        defineArrayMember({
          name: 'singleQuote',
          type: 'singleQuote',
          title: 'Einzelnes Zitat',
        }),
        
        defineArrayMember({
          name: 'statementCollection',
          type: 'statementCollection',
          title: 'Statement Collection',
        }),
        defineArrayMember({
          name: 'statementCollectionGrid',
          type: 'statementCollectionGrid',
          title: 'Statement Collection Grid',
        }),
        defineArrayMember({
          name: 'form',
          type: 'form',
          title: 'Form',
        }),
        defineArrayMember({
          name: 'iconGrid',
          type: 'iconGrid',
          title: 'Icon Grid',
        }),
        defineArrayMember({
          name: 'contactSection',
          type: 'contactSection',
          title: 'Kontakt Section',
        }),
        defineArrayMember({
          name: 'htmlElement',
          type: 'htmlElement',
          title: 'HTML Section',
        }),
      ],
    }),

    

        /* Former Array Menber of Page Builder */
        // defineArrayMember({
        //   name: 'justAnImage',
        //   type: 'justAnImage',
        //   title: 'Just an Image',
        // }),
        
        // defineArrayMember({
        //   name: 'video',
        //   type: 'video',
        // }),
        // defineArrayMember({
        //   name: 'callToAction',
        //   type: 'reference',
        //   to: [{type: 'promotion'}],
        // }),

    /*
    defineField({
      name: 'pageBuilderAlt',
      title: 'Page builder alt',
      type: 'object',
      fields: [
        defineField({
          name: 'pageBuilder',
          title: 'Page builder',
          type: 'array',
          of: [
            defineArrayMember({
              name: 'textSection',
              type: 'textSection',
              title: 'Text Section',
            }),
            defineArrayMember({
              name: 'textWithTwoColumns',
              type: 'textWithTwoColumns',
              title: 'Zweispaltiger Text',
            }),
          ],
        }),
      ],
    }),
    */
    

    // Page settings
    defineField({
      name: 'slug', 
      title: 'Slug/URL',
      type: 'string'
    }),
    defineField({
      name: 'linkName', 
      title: 'Link Name',
      type: 'string'
    }),
    defineField({
      title: 'is Homepage',
      name: 'isHomepage',
      type: 'boolean',
      initialValue: false,
    }),


    defineField({
      name: 'seoSection',
      title: 'SEO',
      type: 'seo',
    }),
  ],


  // Sollte die Reihenfolge der Pages in der Übersicht bestimmen
  orderings: [
    {
      title: 'Sort by Title | desc',
      name: 'sortbyTitleDesc',
      by: [
        {field: 'title', direction: 'desc'}
      ]
    },
    {
      title: 'Sort by Title | asc',
      name: 'sortbyTitleAsc',
      by: [
        {field: 'title', direction: 'asc'}
      ]
    },

  ]
})