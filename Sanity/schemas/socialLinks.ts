import {defineArrayMember, defineField, defineType} from 'sanity'

import {DocumentTextIcon} from '@sanity/icons'


export const socialLinks = defineType({
  name: 'socialLinks',
  title: 'Social Media Channels',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Titel | Nur im Backend sichtbar',
      type: 'string',
  }),
    defineField({
      name: 'svg', 
      title: 'SVG Code | Use the one from fontawesome.com',
      type: 'text'
    }),
    defineField({
      name: 'link', 
      title: 'Link to Social Media Account',
      type: 'string'
    }),
  ],

  preview: {
    select: {
      title: 'title',
      link: 'link'
    },
    prepare(selection) {
      const {title, link } = selection
      return {
        title: title || 'Social Link' , // || 'Untitled'
        subtitle: link,
      }
    },
  },
})