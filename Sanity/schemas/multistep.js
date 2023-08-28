import { PlayIcon } from '@sanity/icons'

export default {
    name: 'multistepQuestions',
    title: 'Multistep Fragen',
    type: 'document',
    icon: PlayIcon,
    fields: [
        {
        name: 'frageText',
        title: 'Title',
        type: 'string'
        },
        {
            name: 'subtitle',
            type: 'string',
            title: 'Subtitle',
            hidden: ({document}) => !document?.title
        },
        {
        name: 'frageTyp',
        title: 'Fragetyp',
        type: 'string',
        options: {
            list: ['Text', 'MultiSelect', 'SingleSelect' ]
        }
        },
        {
        name: 'antwortmoeglichkeiten',
        title: 'Antwortmöglichkeiten',
        type: 'array',
        of: [{ type: 'string' }],
        hidden: ({document}) => document.frageTyp === 'Text'

        // Hier könntest du auch ein anderes Feld-Typ wie 'object' verwenden,
        // um Antwortoptionen mit zusätzlichen Informationen (z.B. Wert, ID) zu speichern
        // und eine Validierung für richtige Antworten durchführen.
        // Beispiel:
        // of: [{ type: 'antwortOption' }]
        },
        {
        name: 'validierung',
        title: 'Validierung',
        type: 'string',
        options: {
            list: ['Keine', 'Numerisch', 'Textlänge', '...']
        }
        },
        // Weitere Felder für Validierungskriterien hinzufügen (z.B. Min/Max-Werte)
    ]
}