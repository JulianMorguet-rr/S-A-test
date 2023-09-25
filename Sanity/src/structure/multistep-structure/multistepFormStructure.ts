import {DocumentStore} from 'sanity'
import {SanityDocument} from '@sanity/client'
import {StructureBuilder} from 'sanity/desk'
import {map} from 'rxjs/operators'
import {TagIcon} from 'lucide-react'


import { PlayIcon } from '@sanity/icons'
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
    .title('Multistep Form')
    .icon(TagIcon)
    .child(() =>
      documentStore.listenQuery(query, {}, options).pipe(
        map((parents) =>
          S.list()
            .title('Multistep Form')
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
                .title('Multistep Fragen')
                .icon(HelpCircleIcon)
                .child(
                  S.documentTypeList('multistepQuestions')
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
                .title('Multistep Composition')
                .icon(ComponentIcon)
                .child(
                  S.documentTypeList('multistepComposition')
                )
                ,
              S.divider(),
              // Create a List Item for Parents
              // To display all documents that do not have parents
              S.listItem()
                .title('Parents')
                .schemaType(schemaType)
                .child(() =>
                  S.documentList()
                    .schemaType(schemaType)
                    .title('Parents')
                    .filter(filter)
                    // Use this list for creating from parents menu
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === 'create' && params.template === 'category'
                    )
                    .child((id) => S.document().documentId(id).schemaType(schemaType))
                ),
              S.divider(),
              // Create a List Item for each parent
              // To display all its child documents
              ...parents.map((parent: SanityDocument) =>
                S.listItem({
                  id: parent._id,
                  title: parent.title,
                  schemaType,
                  child: () =>
                    S.documentTypeList(schemaType)
                      .title('Children')
                      .filter(`_type == $schemaType && parent._ref == $parentId`)
                      .params({schemaType, parentId: parent._id})
                      // Use this list for creating from child menu
                      .canHandleIntent(
                        (intentName, params) =>
                          intentName === 'create' && params.template === 'category-child'
                      )
                      .initialValueTemplates([
                        S.initialValueTemplateItem('category-child', {
                          parentId: parent._id,
                        }),
                      ]),
                })
              ),
            ])
        )
      )
    )
}