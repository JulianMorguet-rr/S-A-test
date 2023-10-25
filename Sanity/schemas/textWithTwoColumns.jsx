import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

/**
 * Customize visualization in the studio
 * @see https://www.sanity.io/docs/customizing-the-portable-text-editor
 */

import React from 'react'

const HighlightIcon = () => (
  <span style={{ fontWeight: 'bold' }}>H</span>
)
const HighlightDecorator = props => (
  <span style={{ backgroundColor: '#74b730' }}>{props.children}</span>
)

const MarkDecorator = props => (
  <span style={{ backgroundColor: 'yellow' }}>{props.children}</span>
)

/**
 * End of customization
 */

export const textWithTwoColumns = defineType({
    name: 'textWithTwoColumns',
    type: 'object',
    title: 'Zweispaltiger Text',
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: 'backendTitle',
            title: 'Titel | Nur im Backend sichtbar',
            type: 'string',
        }),
        defineField({
            name: 'leftText',
            title: 'Left Text',
            type: 'object',
            fields: [
                defineField({
                    name: 'blockContent',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            marks: {
                            decorators: [
                                    {title: 'Strong', value: 'strong'},
                                    {title: 'Emphasis', value: 'em'},
                                    {
                                    title: 'Mark', 
                                    value: 'mark',
                                    icon: () => 'M',
                                    component: MarkDecorator
                                    },
                                    { 
                                    title: 'Highlight', 
                                    value: 'highlight',
                                    icon: HighlightIcon,
                                    component: HighlightDecorator
                                    },
                                    {title: 'Code', value: 'code'}
                                ]
                            }
                        }
                    ]
                }),
                defineField({
                    name: 'cta',
                    title: 'Call to action',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'ctaText',
                            type: 'string',
                        }),
                        defineField({
                            name: 'isCTACustomURL',
                            type: 'boolean',
                        }),
                        defineField({
                            name: 'ctaReferenz',
                            title: 'Referenz to page',
                            type: 'reference',
                            to: [{type: 'page'}],
                            hidden: ({parent, value}) => !parent?.isCTACustomURL !== true,
                        }),
                        defineField({
                            name: 'customCtaURL',
                            title: 'Custom URL',
                            type: 'string',
                            hidden: ({parent, value}) => !parent?.isCTACustomURL !== false,
                        }),
                        defineField({
                            name: 'openInNewTab',
                            title: 'Open URL in new Tab',
                            type: 'boolean',
                        }),
                    ],
                }),
            ],
        }),


        defineField({
            name: 'rightText',
            title: 'Left Text',
            type: 'object',
            fields: [
                defineField({
                    name: 'blockContent',
                    type: 'array',
                    of: [
                        {
                            type: 'block',
                            marks: {
                            decorators: [
                                    {title: 'Strong', value: 'strong'},
                                    {title: 'Emphasis', value: 'em'},
                                    {
                                    title: 'Mark', 
                                    value: 'mark',
                                    icon: () => 'M',
                                    component: MarkDecorator
                                    },
                                    { 
                                    title: 'Highlight', 
                                    value: 'highlight',
                                    icon: HighlightIcon,
                                    component: HighlightDecorator
                                    },
                                    {title: 'Code', value: 'code'}
                                ]
                            }
                        }
                    ]
                }),
                defineField({
                    name: 'cta',
                    title: 'Call to action',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'ctaText',
                            type: 'string',
                        }),
                        defineField({
                            name: 'isCTACustomURL',
                            type: 'boolean',
                        }),
                        defineField({
                            name: 'ctaReferenz',
                            title: 'Referenz to page',
                            type: 'reference',
                            to: [{type: 'page'}],
                            hidden: ({parent, value}) => !parent?.isCTACustomURL !== true,
                        }),
                        defineField({
                            name: 'customCtaURL',
                            title: 'Custom URL',
                            type: 'string',
                            hidden: ({parent, value}) => !parent?.isCTACustomURL !== false,
                        }),
                        defineField({
                            name: 'openInNewTab',
                            title: 'Open URL in new Tab',
                            type: 'boolean',
                        }),
                    ],
                }),
            ],
        }),
    
        // Relevant for both rows
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
                    title: "Fullwidth Background", 
                    value: "fullwidthBackground" 
                },
                { 
                    title: "Fullwidth Content", 
                    value: "fullwidthContent" 
                },
                ],
            },
        }),
    ],

    preview: {
        select: {
            title: 'backendTitle'
        },
        prepare({title}) {
            return {
                title: title || 'Untitled',
                subtitle: 'Zweispaltiger Text',
            }
        },
    },
})