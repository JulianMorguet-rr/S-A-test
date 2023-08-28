import { PlayIcon } from '@sanity/icons'

import { multiStepCompositionDnD } from '../components/multiStepCompositionDnD'

export default {
    name: 'multistepComposition',
    title: 'Multistep Composition',
    type: 'document',
    icon: PlayIcon,
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'twitter',
            title: 'Twitter URL',
            description: 'Die URL des Twitter-Accounts',
            type: 'reference',
            to: [{type: 'multistepQuestions' }],
            components: {
              input: multiStepCompositionDnD
            }
        },
        {
            name: 'questionsSearch',
            title: 'Fragen Suche',
            type: 'reference',
            to: [{type: 'multistepQuestions' }]
        }, 
    ]
  };
  
  
  
  
  