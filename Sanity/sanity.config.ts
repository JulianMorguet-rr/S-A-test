import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import { structure } from './src/structure/index.js'
import {documentInternationalization} from '@sanity/document-internationalization'
import {internationalizedArray} from 'sanity-plugin-internationalized-array'

const devOnlyPlugins = [getStartedPlugin()]

export default defineConfig({
  name: 'default',
  title: 'plum-chough',

  projectId: 'tz4j4rda',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: structure
    }), 
    visionTool(), 
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
      schemaTypes: ['post'],

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
    ...(isDev ? devOnlyPlugins : [])
  ],

  schema: {
    types: schemaTypes,
  },
})

