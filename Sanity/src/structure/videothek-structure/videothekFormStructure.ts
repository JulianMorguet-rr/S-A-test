
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
    .title('Videothek')
    .icon(TagIcon)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title('Upload Video')
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
                .title('Upload Video')
                .icon(UploadIcon)
                .child(
                    // S.documentTypeList('videoMediathek')
                    // .title('Recruiting')
  
                    S.editor()
                        .id('videoMediathek')
                        .schemaType('videoMediathek')
                        .documentId('videoMediathek')
                        .title('Videothek')

                )
                // .schemaType(schemaType)
                // .child(() =>
                //   S.documentList()
                //     .schemaType(schemaType)
                //     .title('Parents')
                //     .filter(filter)
                //     // Use this list for displaying from search results
                //     .canHandleIntent(
                //       (intentName, params) => intentName === 'edit' && params.type === 'category'
                //     )
                //     .child((id) => S.document().documentId(id).schemaType(schemaType))
                // )
                ,
              S.divider(),


              S.listItem()
                .id('uploadedVideo')
                .title('uploadedVideo)')
                .icon(ComponentIcon)
                .child(
                    S.documentTypeList('uploadedVideo')
                )
                
            ])
        )
      )
    )
}