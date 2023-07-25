import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
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