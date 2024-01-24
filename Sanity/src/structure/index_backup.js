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

import siteSettingsStructure from './siteSettings-structure/siteSettingsStructure'
import multistepFormStructure from './multistep-structure/multistepFormStructure'
import videothekFormStructure from './videothek-structure/videothekFormStructure'
import postStructure from './post-structure/post-structure'

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

                // Import "post" Type
                // S.listItem()
                // .title('Beiträge')
                // .child(
                //     // List out all categories
                //     S.documentTypeList('post')
                //         .title('Alle Beiträge') 
                // ),
                
                postStructure('category', S, context.documentStore),

                // Import "post" Type
                S.listItem()
                .title('Zitate')
                .child(
                    // List out all categories
                    S.documentTypeList('quotes')
                        .title('Alle Zitate') 
                ),
                
                
                // Import "post" Type
                S.listItem()
                .title('Statements')
                .child(
                    // List out all categories
                    S.documentTypeList('singleStatement')
                        .title('Single Statements') 
                ),


                // Load every Document Type except the ones listed in the array
                ...S.documentTypeListItems().filter(
                    (listItem) => 
                    // Everything that doesn't match the conditions shows up in the default apperence
                        ![
                            'page',
                            'post',
                            'postOverview',
                            'quotes',
                            'singleStatement',
                            'statementCollectionGrid',
                            'contactSection',
                            'uploadedVideo',
                            'videoMediathek',
                            'globalSiteSettings',
                            'mainMenu',
                            'footerMenu',
                            'appearance',
                            
                            'recruiting',
                            'multistepQuestions',
                            'multistepComposition',
                            'category',
                        ].includes(listItem.getId())
                ),

                // S.divider(),

                videothekFormStructure('category', S, context.documentStore),

                S.divider(),


                /*
                // Import "multistepFormStructure" Type
                multistepFormStructure('category', S, context.documentStore),

                S.divider(),

                */

                /*
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
                */


                // Import "siteSettings" Type
                siteSettingsStructure('category', S, context.documentStore),

                // S.listItem()
                //     .title('Site Settings')
                //     .child(
                //         S.editor()
                //             .id('siteSettings')
                //             .schemaType('siteSettings')
                //             .documentId('siteSettings')
                //             .title('siteSettings'),
                //         S.editor()
                //             .id('appearance')
                //             .schemaType('appearance')
                //             .documentId('appearance')
                //             .title('appearance')
                //     ), 

            ])
)
    
