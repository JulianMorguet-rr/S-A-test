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
                type: 'reference',
                to: [
                  { type: 'page' },
                  { type: 'postOverview' },
                  { type: 'post' },
                ],
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
          ],
      }),
    ],
})


