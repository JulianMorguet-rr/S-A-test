import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
          hotspot: true
      }
    }),
    defineField({
      name: 'title', 
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
      type: 'string'
    }),
    defineField({
      title: 'is Homepage',
      name: 'isHomepage',
      type: 'boolean'
    }),
  ],
})