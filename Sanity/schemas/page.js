import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
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
    {
      name: 'heroBackgroundVideo',
      title: 'Hero Background Video',
      // type: 'string'
      type: 'reference',
      to: [{type: 'uploadedVideo' }]
    },
    defineField({
      name: 'heroImageAlt',
      title: 'Alt Text Hero Image',
      type: 'string'
    }),
    defineField({
      name: 'heading',
      title: 'Headline auf Hero',
      type: 'string'
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
        name: 'textSection',
        type: 'textSection',
        title: 'Text Section',
      }),
      defineArrayMember({
        name: 'textWithIllustration',
        type: 'textWithIllustration',
        title: 'Text with Illustaion',
      }),
      defineArrayMember({
        name: 'gallery',
        type: 'gallery',
        title: 'Gallery',
      }),
      defineArrayMember({
        name: 'form',
        type: 'form',
        title: 'Form',
      }),
      defineArrayMember({
        name: 'justAnImage',
        type: 'justAnImage',
        title: 'Just an Image',
      }),
      defineArrayMember({
        name: 'quoteCollection',
        type: 'quoteCollection',
        title: 'Quote Collection',
      }),
      defineArrayMember({
        name: 'singleQuote',
        type: 'singleQuote',
        title: 'Einzelnes Zitat',
      }),

      defineArrayMember({
        name: 'accordionSection',
        type: 'accordionSection',
        title: 'Accordion Section',
      }),



      // defineArrayMember({
      //   name: 'video',
      //   type: 'video',
      // }),
      // defineArrayMember({
      //   name: 'callToAction',
      //   type: 'reference',
      //   to: [{type: 'promotion'}],
      // }),
      ],
    }),

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
      type: 'boolean'
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
    // {
    //   title: 'Popularity',
    //   name: 'popularityDesc',
    //   by: [
    //     {field: 'popularity', direction: 'desc'}
    //   ]
    // }
  ]
})