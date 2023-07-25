import {defineConfig, isDev} from 'sanity'
import {visionTool} from '@sanity/vision'
import {deskTool} from 'sanity/desk'
import {schemaTypes} from './schemas'
import {getStartedPlugin} from './plugins/sanity-plugin-tutorial'
import { structure } from './src/structure/index.js'
import {documentInternationalization} from '@sanity/document-internationalization'

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
    documentInternationalization({
      // Required configuration
      supportedLanguages: [
        {id: 'de', title: 'Deutsch'},
        {id: 'es', title: 'Spanish'},
        {id: 'en', title: 'English'},
      ],
      schemaTypes: ['post'],
    }),
    ...(isDev ? devOnlyPlugins : [])
  ],

  schema: {
    types: schemaTypes,
  },
})

