import {defineArrayMember, defineField, defineType} from 'sanity'

import { metaDescriptionInput } from '../../components/metaDescription'

// make the field collapsible

export const seoSection = defineType({
    name: 'seo', 
    title: 'SEO relevant',
    type: 'object',
    options: {
        collapsible: true,
    },
    fields: [
        defineField({
            name: 'title', 
            title: 'Meta Title (wird im Tab darstellt)',
            type: 'string',
        }),

        {
            name: 'metaDescription', 
            title: 'Meta Description',
            type: 'text',
            // components: {
            //   input: metaDescriptionInput
            // }
        },

        {
            name: 'allowSearchEngines', 
            title: 'Erlaube Suchmaschienen diese Seite in den Suchergebnissen anzuzeigen',
            type: 'boolean',
            initialValue: true,
        },

    ]
})