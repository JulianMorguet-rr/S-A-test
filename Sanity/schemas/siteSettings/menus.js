import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'mainMenu',
    title: 'Main Menu',
    type: 'document',
    fields: [
        defineField({
          name: 'mainNav',
          title: 'Main Navigation',
          description: 'Select pages for the top menu',
          type: 'array',
          of: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'linkName',
                  title: 'Name des Links',
                  description: 'wird im Frontend so angezeigt',
                  type: 'string',
                },
                {
                  name: 'isReference',
                  title: 'Use Reference',
                  description: 'Use Reference (internal Page or Post) or Individual URL',
                  type: 'boolean',
                  initialValue: true,
                },
                {
                  name: 'pageReference',
                  title: 'Page Reference',
                  type: 'reference',
                  to: [{ type: 'page' }, { type: 'postOverview' }, { type: 'post' }],
                  hidden: ({parent, value}) => parent?.isReference !== true,
                },
                {
                  name: 'individualURL',
                  title: 'Individueller Link',
                  description: 'Nur für Ankerlinks oder externe Links',
                  type: 'string',
                  hidden: ({parent, value}) => parent?.isReference === true,
                },
                {
                  name: 'hasSubmenu',
                  title: 'Has Submenu',
                  description: 'Use Submenu',
                  type: 'boolean',
                  initialValue: false,
                },
                {
                  name: 'submenu',
                  title: 'Submenu',
                  description: 'Select pages for the submenu',
                  type: 'array',
                  of: [
                    {
                      name: 'link',
                      type: 'object',
                      title: 'Link',
                      fields: [
                        {
                          name: 'linkName',
                          title: 'Name des Links',
                          description: 'wird im Frontend so angezeigt',
                          type: 'string',
                        },
                        {
                          name: 'isReference',
                          title: 'Use Reference',
                          description: 'Use Reference (internal Page or Post) or Individual URL',
                          type: 'boolean',
                          initialValue: true,
                        },
                        {
                          name: 'pageReference',
                          title: 'Page Reference',
                          type: 'reference',
                          to: [{ type: 'page' }, { type: 'postOverview' }, { type: 'post' }],
                          hidden: ({parent, value}) => parent?.isReference !== true,
                        },
                        {
                          name: 'individualURL',
                          title: 'Individueller Link',
                          description: 'Nur für Ankerlinks oder externe Links',
                          type: 'string',
                          hidden: ({parent, value}) => parent?.isReference === true,
                        },
                      ],
                    },
                  ],
                  hidden: ({parent, value}) => parent?.hasSubmenu !== true,
                }
              ],
              preview: {
                select: {
                  hasSubmenu: 'hasSubmenu',
                  linkName: 'linkName',
                  submenu: 'submenu',
                },
                prepare(selection) {
                  const { hasSubmenu, linkName, submenu } = selection;
    
                  // Extrahiere die Titel der Submenü-Elemente
                  const submenuTitles = submenu?.map(submenuItem => submenuItem.linkName).join(', ');
    
                  return {
                    title: linkName,
                    subtitle: hasSubmenu && submenuTitles ? `Submenu:\n ${submenuTitles}` : 'Kein Submenu'
                  }
                }
              }
            },
          ],
        }),
        defineField({
          name: 'footerNav',
          title: 'Footer Navigation',
          description: 'Select pages for the footer menu',
          type: 'object',
          fields: [
            defineField({
              name: 'footerNavLeft',
              title: 'Footer Navigation Left',
              description: 'Select pages for the footer menu left',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'page' }],
                },
              ],
            }),
            defineField({
              name: 'footerNavRight',
              title: 'Footer Navigation Right',
              description: 'Select pages for the footer menu right',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'page' }],
                },
              ],
            }),
            defineField({
              name: 'socialLinks',
              title: 'Social Links',
              description: 'Select social links and icons for the footer',
              type: 'array',
              of: [
                {
                  type: 'reference',
                  to: [{ type: 'socialLinks' }],
                },
              ],
            }),
          ],
      }),
    ],
})


