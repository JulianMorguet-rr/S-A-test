export const structure = (S, context) => (
    S.list()
        .title('Site Content')
        .items([
        S.listItem()
            .title('Site Settings')
            .child(
                S.editor()
                    .id('siteSettings')
                    .schemaType('siteSettings')
                    .documentId('siteSettings')
                    .title('siteSettings')
            ), 
        ...S.documentTypeListItems().filter(
            (listItem) => 
            // Everything that doesn't match the conditions shows up in the default apperence
                ![
                    'siteSettings'
                ].includes(listItem.getId())
        ),
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
        ])
    )
    
