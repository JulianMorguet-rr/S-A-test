import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'globalSiteSettings',
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
            name: 'favicon',
            title: 'Site Favicon',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),

        // create a new object field for image in site settings document with image format, a svg icon as text input and a alt text field
        defineField({
            name: 'logo',
            title: 'Site Logo',
            type: 'object',
            fields: [
                defineField({
                    name: 'src',
                    title: 'Logo for header and footer – only gets displayed if no SVG is uploaded',
                    type: 'image',
                    options: {
                        hotspot: true,
                    },
                }),
                defineField({
                    name: 'svg',
                    title: 'Logo for header and footer',
                    type: 'text',
                }),
                defineField({
                    name: 'altText',
                    title: 'Alt Text for Logo – both SVG and image',
                    type: 'string',
                }),
            ],
        }),



        defineField({
            name: 'meta',
            title: 'Remaining Meta Tags',
            type: 'object',
            fields: [
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
            ],
        }),
    ],
})