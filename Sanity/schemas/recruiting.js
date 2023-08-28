import {defineArrayMember, defineField, defineType} from 'sanity'

export default {
    name: 'recruiting',
    type: 'document',
    title: 'Recruiting',
    fields: [
        defineField({
            name: 'heading',
            title: 'Recruiting Heading',
            type: 'string',
        }),
        defineField({
            name: 'personioXMLFeed',
            title: 'Personio XML Feed',
            type: 'string',
        }),
        defineField({
        name: 'authorImage',
        title: 'Author Image',
        type: 'image',
        options: {
            hotspot: true
        }
        }),
    ],
}