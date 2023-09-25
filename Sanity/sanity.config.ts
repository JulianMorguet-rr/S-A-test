import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'


import { structure  } from './src/structure/index.js'

import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'
import category from './schemas/category'
import { colorInput } from '@sanity/color-input'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'rr Schaltzentrale',

  projectId: 'tz4j4rda',
  dataset: 'production',

  plugins: [
    
    colorInput(),

    // deskTool({
    //   // name: 'siteSettings',
    //   // title: 'Site Settings',
    //   structure: (S, context) => (
    //     S.list()
    //       .title('Site Content')
    //       .items([
    //       S.listItem()
    //           .title('Site Settings')
    //           .child(
    //               S.editor()
    //                   .id('siteSettings')
    //                   .schemaType('siteSettings')
    //                   .documentId('siteSettings')
    //                   .title('siteSettings')
    //           ), 
    //       ...S.documentTypeListItems().filter(
    //           (listItem) => 
    //           // Everything that doesn't match the conditions shows up in the default apperence
    //               ![
    //                   'siteSettings'
    //               ].includes(listItem.getId())
    //       ),
    //     ])
    //   )
    //   // structure: (S, context) => {
    //   //   console.log(context) // returns { currentUser, dataset, projectId, schema, getClient, documentStore }
    //   //   return S.documentTypeList('post')
    //   // },
    // }), 
    deskTool({
      // name: 'category',
      // title: 'Category',
      structure: structure,
      // defaultDocumentNode: documentNodeResolver,
      // structure: (S, context) => {
      //   console.log(context) // returns { currentUser, dataset, projectId, schema, getClient, documentStore }
      //   return S.documentTypeList('post')
      // },
    }), 

    visionTool(), 
    
    /*
    internationalizedArray({
      languages: [
        {id: 'de', title: 'Deutsch'},
        {id: 'en', title: 'English'},
        {id: 'es', title: 'Spanish'}
      ],
      defaultLanguages: ['de'],
      fieldTypes: ['string'],
    }),
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'de', title: 'Deutsch'},
        {id: 'es', title: 'Spanish'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: [
        'post'
      ],

      // Customizes the name of the language field
      languageField: `language`,

      // Optional
      // Keep translation.metadata references weak
      weakReferences: true, // defaults to false

      // Optional
      // Adds UI for publishing all translations at once. Requires access to the Scheduling API
      // https://www.sanity.io/docs/scheduling-api
      bulkPublish: true, // defaults to false

      // Optional
      // Adds additional fields to the metadata document
      // metadataFields: [
      //   defineField({ name: 'slug', type: 'slug' })
      // ],

    }),
    */
    ...(isDev ? devOnlyPlugins : [])
  ],

  schema: {
    types: schemaTypes,

    // Add this 'category child' template
    // templates: (prev) => {
    //   const categoryChild = {
    //     id: 'category-child',
    //     title: 'Category: Child',
    //     schemaType: 'category',
    //     parameters: [{name: `parentId`, title: `Parent ID`, type: `string`}],
    //     // This value will be passed-in from desk structure
    //     value: ({parentId}: {parentId: string}) => ({
    //       parent: {_type: 'reference', _ref: parentId},
    //     }),
    //   }
  
    //   return [...prev, categoryChild]
    // },
  },
})

