import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'mainMenu',
    title: 'Main Menu',
    type: 'document',
    fields: [
        defineField({
            title: 'Main Navigation',
            name: 'mainNav',
            description: 'Select pages for the top menu',
            type: 'array',
            of: [
              {
                type: 'reference',
                to: [{ type: 'page' }],
              },
            ],
        }),
    ],
})


