import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
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
        defineField({
            name: 'title',
            title: 'Site Title',
            type: 'string',
        }),
        defineField({
            name: 'description',
            title: 'Site Description',
            type: 'text',
        }),
        defineField({
            name: 'siteLogo',
            title: 'Logo for header',
            type: 'image',
        }),
        defineField({
            name: 'ogImage',
            title: 'Open Graph Image',
            type: 'image',
        }),
        defineField({
            name: 'twitter',
            title: 'Twitter Handle',
            type: 'string',
        }),
        defineField({
            name: 'favicon',
            title: 'Site Favicon',
            type: 'image',
        }),
    ],
})