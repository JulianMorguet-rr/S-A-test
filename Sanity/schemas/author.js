import {defineArrayMember, defineField, defineType} from 'sanity'

export default {
    name: 'author',
    type: 'document',
    title: 'Author',
    fields: [
        defineField({
            name: 'firstName',
            title: 'Author First Name',
            type: 'string',
        }),
        defineField({
            name: 'lastName',
            title: 'Author First Name',
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