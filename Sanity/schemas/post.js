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
        options: {
            source: 'title',
            maxLength: 96
        }
        },
        {
        name: 'author',
        title: 'Author',
        // type: 'string'
        type: 'reference',
        title: 'Author',
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
        of: [{type: 'string', to: {type: 'category'}}]
        },
        {
        name: 'publishedAt',
        title: 'Published at',
        type: 'datetime'
        },

        {
          name: 'twitter',
          title: 'Twitter URL',
          type: 'url',
          description: 'Die URL des Twitter-Accounts',
          components: {
            input: TwitterUrl
          }
        },

        {
          name: 'customString',
          title: 'Custom String',
          type: 'string',
          components: {
            input: MyCustomStringInput
          }
        },

        defineField({
          name: 'body',
          title: 'Body',
          type: 'blockContent',
        }),   

        defineField({
          name: 'greeting',
          type: 'internationalizedArrayString',
        }),

        defineField({
          name: 'language',
          type: 'string',
        }),
        
    ]
  }