import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
  name: 'quotes',
  type: 'document',
  title: 'Zitate',
  icon: DocumentTextIcon,
  fields: [
    defineField({
        name: 'title',
        title: 'Titel',
        type: 'string',
    }),
    defineField({
        name: 'quote',
        title: 'Zitat',
        type: 'text',
        rows: 3, // Anzahl der Zeilen im Textbereich
    }),
    defineField({
        name: 'author',
        title: 'Autor',
        type: 'string',
    }),
    defineField({
        name: 'source',
        title: 'Quelle',
        type: 'string',
    }),
    defineField({
      name: 'media',
      title: 'Attach media',
      type: 'object',
      fields: [
        defineField({
          name: 'image',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent, value}) => !parent?.isVideo !== true,
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Hintergrundfarbe',
      type: 'color',
      options: {
        disableAlpha: true,
        // Hier können Sie eine Liste von Farben definieren, die im Colorpicker angezeigt werden sollen
        // colors: ['#000000', '#ffffff', '#ff0000', '#00ff00', '#0000ff']
      },
    }),
    defineField({
      name: 'sectionType',
      type: 'string',
      initialValue: 'standard',
      options: {
        list: [
          { 
            title: "standard", 
            value: "standard" 
          },
          { 
            title: "highlighted", 
            value: "Highlighted" 
          },
          { 
            title: "disabled", 
            value: "Disabled" 
          },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author'
    },
    prepare(selection) {
      const {title, author} = selection
      return {
        title: title,
        subtitle: author 
      }
    }
  }
})