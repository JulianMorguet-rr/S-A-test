import {defineField, defineType} from 'sanity'

// Import custom jsx components
import {TwitterUrl} from '../components/TwitterUrl'
import { MyCustomStringInput } from '../components/MyCustomStringInput'

export default {
    name: 'post',
    type: 'document',
    title: 'Post',
    description: 'Blog posts',
    // languages: [],
    fields: [
      // {
      //   language: 'de',
      // },
      {
        name: 'title',
        type: 'string',
        title: 'Title'
      },
      {
        name: 'slug',
        type: 'string',
        title: 'Slug',
        description: 'Ein eindeutiger Slug für diesen Post. Nur Kleinbuchstaben, Zahlen und Bindestriche.',
        options: {
          source: 'title',  // Hier nehmen wir an, dass Sie ein "title" Feld haben, von dem der Slug abgeleitet wird
          maxLength: 96,
        },
        options: {
          source: 'title',
          slugify: input => input
                             .toLowerCase()
                             .replace(/\s+/g, '-')
                             .replace(/[^\w\-]+/g, '')
                             .replace(/\-\-+/g, '-')
        },
        validation: Rule => Rule.required()
      },
      {
        name: 'author',
        title: 'Author',
        // type: 'string'
        type: 'reference',
        to: [{type: 'author' }]
      },
      {
        name: 'mainImage',
        title: 'Main image',
        type: 'image',
        options: {hotspot: true},
        // options: {
        //     hotspot: true
        // }
      },
      {
        name: 'categories',
        title: 'Categories',
        type: 'array',
        of: [{type: 'string', to: {type: 'category'}}],
        validation: Rule => Rule.required().error('Mindestens eine "Category" ist erforderlich – und sei es "Sonstiges" oder "Allgemein".')
      },
      {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime'
      },

      defineField({
        name: 'body',
        title: 'Body',
        type: 'blockContent',
      }),   

      {
        name: 'customString',
        title: 'Textauszug',
        type: 'string',
        components: {
          input: MyCustomStringInput
        },
        validation: Rule => Rule.required().error('Es ist ein Textauszug für die Blog-Übersicht ist erforderlich.')
      },

      defineField({
        name: 'seoSection',
        title: 'SEO',
        type: 'seo',
      }),

      // {
      //   name: 'twitter',
      //   title: 'Twitter URL',
      //   type: 'url',
      //   description: 'Die URL des Twitter-Accounts',
      //   components: {
      //     input: TwitterUrl
      //   }
      // },

      // defineField({
      //   name: 'greeting',
      //   type: 'internationalizedArrayString',
      // }),

      // defineField({
      //   name: 'language',
      //   type: 'string',
      // }),
        
    ]
  }