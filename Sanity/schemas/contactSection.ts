import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export default defineType({
    name: 'contactSection',
    type: 'document',
    title: 'Kontaktbereich',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'upperSection',
            title: 'Oberer Bereich',
            type: 'object',
            hidden: ({parent, value}) => parent?.disableUpperSection,
            fields: [
                defineField({
                    name: 'tagline',
                    title: 'Tagline',
                    type: 'string',
                }),
                defineField({
                    name: 'title',
                    title: 'Titel',
                    type: 'string',
                }),
                defineField({
                    name: 'paragraph',
                    title: 'Absatz',
                    type: 'text',
                }),
            ]
        }),
        defineField({
            name: 'disableUpperSection',
            title: 'oberen Abschnitt ausblenden',
            type: 'boolean',
        }),
        
        defineField({
            name: 'imageOfContactPerson',
            title: 'Bild des Ansprechpartners',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'contactPerson',
            title: 'Ansprechpartner',
            type: 'string',
        }),
        defineField({
            name: 'position',
            title: 'Position',
            type: 'string',
        }),
        defineField({
            name: 'company',
            title: 'Unternehmen / Organisation',
            type: 'string',
        }),
        defineField({
            name: 'adress',
            title: 'Adresse',
            type: 'object',
            fields: [
                defineField({
                    name: 'adressLine1',
                    title: 'Adresszeile 1',
                    type: 'string',
                }),
                defineField({
                    name: 'adressLine2',
                    title: 'Adresszeile 2',
                    type: 'string',
                }),
            ]
        }),
        defineField({
            name: 'phone',
            title: 'Telefonnummer',
            type: 'string',
        }),
        defineField({
            name: 'mail',
            title: 'E-Mail',
            type: 'string',
        }),

        defineField({
            name: 'maxWidth',
            title: 'Max Width',
            type: 'string',
            initialValue: 'full',
            options: {
              list: [
                { 
                  title: "full", 
                  value: "full" 
                },
                { 
                  title: "medium", 
                  value: "medium" 
                },
                { 
                  title: "small", 
                  value: "small" 
                },
              ],
            },
          }),
    ],
    preview: {
        select: {
            title: 'title',
        },
        prepare({title}) {
            return {
                title: title || 'Kontaktbereich',
                subtitle: 'Kontaktbereich',
            }
        }
    }
})