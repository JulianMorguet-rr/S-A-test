export default {
    name: 'multistepQuestions',
    title: 'Multistep Fragen',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string'
        },
        {
            name: 'subtitle',
            title: 'Subtitle bzw. Frages',
            type: 'string',
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
            hidden: ({document}) => document?.frageTyp === 'Text'
            // Hier könntest du auch ein anderes Feld-Typ wie 'object' verwenden,
            // um Antwortoptionen mit zusätzlichen Informationen (z.B. Wert, ID) zu speichern
            // und eine Validierung für richtige Antworten durchführen.
            // Beispiel:
            // of: [{ type: 'antwortOption' }]
        },
        {
            name: 'placeholderForTextInput',
            title: 'Placeholder für Texteingabe',
            type: 'string',
            hidden: ({document}) => document?.frageTyp !== 'Text'
        },
        {
            name: 'inputType',
            title: 'Input Type',
            type: 'string',
            options: {
                list: ['Text Input', 'Textarea', 'Mail', 'Phone' ]
            },
            hidden: ({document}) => document?.frageTyp !== 'Text'
        },
        // TODO: Validation ermöglicht ggf. noch mehr Flexibilität – z.B, um Min/Max-Werte für Textlänge zu definieren
        // Dennoch fraglich ob wir es brauchen 
        {
            name: 'validierung',
            title: 'Validierung',
            type: 'string',
            options: {
            list: ['Keine', 'Numerisch', 'Textlänge']
            }
        },
        // Weitere Felder für Validierungskriterien hinzufügen (z.B. Min/Max-Werte)
    ]
  };
  
  
  
  
  