import {defineField, defineType} from 'sanity'

import {ImagesIcon} from '@sanity/icons'

export const form = defineType({
  name: 'form',
  title: 'Form',
  type: 'object',
  icon: ImagesIcon,
  fields: [
    {
      name: 'tagline',
      type: 'string',
      title: 'Tagline',
      // hidden: ({parent, value}) => !parent?.heading,
    },
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'formtype',
      type: 'string',
      description: 'Select form type',
      options: {
        list: ['Newsletter', 'Register', 'Contact'],
      },
    },

    // Contact form
    {
      name: 'placeholderName',
      title: 'Placeholder Name',
      type: 'string',
      hidden: ({parent, value}) => parent?.formtype !== 'Contact',
    },
    {
      name: 'placeholderEmail',
      title: 'Placeholder Email',
      type: 'string',
      hidden: ({parent, value}) => parent?.formtype !== 'Contact',
    },
    {
      name: 'placeholderTextarea',
      title: 'Placeholder Textarea',
      type: 'string',
      hidden: ({parent, value}) => parent?.formtype !== 'Contact',
    },
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({title}) {
      return {
        title: title || 'Untitled',
        subtitle: 'Formular',
        media: ImagesIcon,
      }
    },
  },
})