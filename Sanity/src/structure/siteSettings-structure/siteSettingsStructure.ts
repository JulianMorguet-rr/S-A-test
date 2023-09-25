
import {DocumentStore} from 'sanity'
import {SanityDocument} from '@sanity/client'
import {StructureBuilder} from 'sanity/desk'
import {map} from 'rxjs/operators'
import {TagIcon} from 'lucide-react'


import { PlayIcon } from '@sanity/icons'
import {UploadIcon} from '@sanity/icons'
import { HelpCircleIcon } from '@sanity/icons'
import {ComponentIcon} from '@sanity/icons'

export default function parentChild(
  schemaType: string,
  S: StructureBuilder,
  documentStore: DocumentStore
) {
  const filter = `_type == "${schemaType}" && !defined(parent) && !(_id in path("drafts.**"))`
  const query = `*[${filter}]{ _id, title }`
  const options = {apiVersion: `2023-01-01`}

  return S.listItem()
    .title('Site Settings')
    .icon(TagIcon)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
            S.list()
                .title('Global Data (e.g. Title, Logo)')
                .menuItems([
                S.menuItem()
                    .title('Add')
                    .icon(TagIcon)
                    .intent({type: 'create', params: {type: schemaType}}),
                ])
                .items([
                // Create a List Item for all documents
                // Useful for searching
                S.listItem()
                    .title('Global Settings (e.g. Title, Logo)')
                    .icon(UploadIcon)
                    .child(
                        // S.documentTypeList('videoMediathek')
                        // .title('Recruiting')
    
                        S.editor()
                            .id('globalSiteSettings')
                            .schemaType('globalSiteSettings')
                            .documentId('globalSiteSettings')
                            .title('globalSiteSettings')

                    ),

                S.divider(),

                S.listItem()
                    .title('appearance')
                    .icon(PlayIcon)
                    .child(

                        S.editor()
                            .id('appearance')
                            .schemaType('appearance')
                            .documentId('appearance')
                            .title('appearance')

                    ),

                S.divider(),

                S.listItem()
                    .title('mainMenu')
                    .icon(PlayIcon)
                    .child(

                        S.editor()
                            .id('mainMenu')
                            .schemaType('mainMenu')
                            .documentId('mainMenu')
                            .title('mainMenu')

                    ),

                    // .id('appearance')
                    // .title('appearance)')
                    // .icon(ComponentIcon)
                    // .child(
                    //     S.documentTypeList('appearance')
                    // )
                
            ])
        )
      )
    )
}