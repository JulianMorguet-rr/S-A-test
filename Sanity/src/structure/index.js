/**
 * Hier wird die Struktur der Daten festgelegt – Anhand derer wird die Navigation im Studio aufgebaut.
 * 
 * Anpassungen sind nur nötig, wenn die Struktur von der standart-Struktur abweicht. 
 * Z.B. wenn es, wie bei SiteSettings nur ein Dokument für die gesamte Setie geben soll
 * oder, wenn es mehrere Kategorien unter einer Übergeordneten Kategorie geben soll.
 * 
 * Die Struktur wird in einem Array definiert, das aus mehreren Listen-Elementen besteht.
 * Jedes Listen-Element kann entweder eine Kategorie oder ein Dokument sein.
 * 
 */


// import { StructureResolver } from 'sanity/desk'

import multistepFormStructure from '../multistep-structure/multistepFormStructure'

export const documentNodeResolver = (S, {schemaType}) => {
    if(schemaType == 'test') {
      // Give all documents of type myDocument the JSON preview, 
      // as well as the default form view
      S.document().views([
        S.view.form(),
        S.view.component(JsonPreview).title('JSON')
      ])
    }
  }

export const structure = (S, context) => (
    // S.list()
    //     .title('Site Content')
    //     .items([
    //     S.listItem()
    //         .title('Site Settings')
    //         .child(
    //             S.editor()
    //                 .id('siteSettings')
    //                 .schemaType('siteSettings')
    //                 .documentId('siteSettings')
    //                 .title('siteSettings')
    //         ), 
    //     ...S.documentTypeListItems().filter(
    //         (listItem) => 
    //         // Everything that doesn't match the conditions shows up in the default apperence
    //             ![
    //                 'siteSettings'
    //             ].includes(listItem.getId())
    //     ),

        // S.listItem()
        //     .title('Pages')
        //     .child(
        //         S.editor()
        //             .id('post')
        //             .schemaType('post')
        //             .title('post')
        //             .documentId('post')
        //     ), 
        // S.listItem()
        //     .title('Pets')
        //     .child(
        //         S.editor()
        //             .id('pet') 
        //             .schemaType('pet')
        //             .title('pet')
        //             .documentId('pet')
        //     ),
        // ]),

    // S.list()
    //     .title('Recruiting')
    //     .items([
    //     S.listItem()
    //         .title('Recruiting')
    //         .child(
    //             S.editor()
    //                 .id('recruiting')
    //                 .schemaType('recruiting')
    //                 .documentId('recruiting')
    //                 .title('recruiting')
    //         ), 
    //     ...S.documentTypeListItems().filter(
    //         (listItem) => 
    //         // Everything that doesn't match the conditions shows up in the default apperence
    //             ![
    //                 'recruiting'
    //             ].includes(listItem.getId())
    //     ),
    //     ]),
        // S.document().schemaType('recruiting').documentId('unique-page-id')
        // S.list()
        //     .title('Content')
        //     .items([
        //     multistepFormStructure('category', S, context.documentStore),
        //     S.divider(),
        //     ]),
        S.list()
            .title('Content')
            .items([


                // Import "page" Type
                S.listItem()
                    .title('Seiten')
                    .child(
                        // List out all categories
                        S.documentTypeList('page')
                            .title('Alle Seiten') 
                    ),


                // Load every Document Type except the ones listed in the array
                ...S.documentTypeListItems().filter(
                    (listItem) => 
                    // Everything that doesn't match the conditions shows up in the default apperence
                        ![
                            'page',
                            'recruiting',
                            'siteSettings',
                            'multistepQuestions',
                            'multistepComposition',
                        ].includes(listItem.getId())
                ),

                S.divider(),

                multistepFormStructure('category', S, context.documentStore),

                S.divider(),

                // Import "recruiting" Type
                S.listItem()
                    .title('Recruiting')
                    .child(
                        S.editor()
                            .id('recruiting')
                            .schemaType('recruiting')
                            .documentId('recruiting')
                            .title('recruiting')
                    ), 

                S.divider(),

                // Import "siteSettings" Type
                S.listItem()
                    .title('Site Settings')
                    .child(
                        S.editor()
                            .id('siteSettings')
                            .schemaType('siteSettings')
                            .documentId('siteSettings')
                            .title('siteSettings')
                    ), 
                
                

                // S.listItem()
                //     .title('Content')
                //     .child(
                //         S.editor()
                //             .id('content')
                //             .schemaType('content')
                //             .documentId('content')
                //             .title('content')
                //     ), 
                // ...S.documentTypeListItems().filter(
                //     (listItem) => 
                //     // Everything that doesn't match the conditions shows up in the default apperence
                //         ![
                //             'content'
                //         ].includes(listItem.getId())
                // ),
                
                

                
            ])
)
    
