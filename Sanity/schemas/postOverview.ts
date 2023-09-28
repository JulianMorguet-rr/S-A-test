import {defineArrayMember, defineField, defineType} from 'sanity'

export const postOverview = defineType({
  name: 'postOverview',
  type: 'document',
  title: 'Beitrags Übersicht',
  fields: [
        defineField({
            name: 'title', 
            title: 'Page title (wird im Tab darstellt und ist für SEO relevant)',
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

        defineField({
            name: 'tagline', 
            title: 'Tagline (p)',
            type: 'string'
        }),

        defineField({
            name: 'heading', 
            title: 'Headline (h1)',
            type: 'string'
        }),


        defineField({
            name: 'paragraphHeading', 
            title: 'Absatz Headline (h2)',
            type: 'string'
        }),

        defineField({
            name: 'paragraph', 
            title: 'Absatz',
            type: 'blockContent',
        }),

        defineField({
            name: 'seoSection',
            title: 'SEO',
            type: 'seo',
        }),

        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'string',
            initialValue: 'blog',
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'heroImage'
        }
    }
})