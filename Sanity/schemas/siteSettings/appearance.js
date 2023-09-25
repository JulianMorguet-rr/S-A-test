import { defineType, defineField } from 'sanity'

export default defineType({
    name: 'appearance',
    title: 'Appearance',
    type: 'document',
    fields: [
        defineField({
            name: 'colorScheme',
            title: 'Color Scheme',
            description: 'Select color scheme for the whole site',
            type: 'object',
            fields: [
                defineField({
                    name: 'primary',
                    title: 'Primary Color',
                    type: 'color',
                    options: {
                        disableAlpha: true,
                    },
                }),
                defineField({
                    name: 'secondary',
                    title: 'Secondary Color',
                    type: 'color',
                    options: {
                        disableAlpha: true,
                    },
                }),
                defineField({
                    name: 'accent',
                    title: 'Accent Color',
                    type: 'color',
                    options: {
                        disableAlpha: true,
                    },
                }),
            ],
        }),

        defineField({
            name: 'buttonStyle',
            title: 'Button Style',
            type: 'object',
            fields: [
                defineField({
                    name: 'rounded',
                    title: 'Rounded Buttons',
                    type: 'boolean',
                }),
            ]
        }),

        defineField({
            name: 'enableDarkMode',
            title: 'Enable Dark Mode',
            type: 'boolean',
        }),
    ],
})