import {defineArrayMember, defineField, defineType} from 'sanity'

import { metaDescriptionInput } from '../../components/metaDescription'

export const seoSection = defineType({
    name: 'seo', 
    title: 'SEO relevant',
    type: 'object',
    fields: [
        defineField({
            name: 'title', 
            title: 'Meta Title (wird im Tab darstellt)',
            type: 'string'
        }),

        {
            name: 'metaDescription', 
            title: 'Meta Description',
            type: 'string',
            components: {
              input: metaDescriptionInput
            }
          },

    ]
})