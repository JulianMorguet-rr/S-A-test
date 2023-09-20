import blocksToHtml from '@sanity/block-content-to-html'
// console.log('blocksToHtml: ', blocksToHtml)

const h = blocksToHtml.h

const serializers = {
  types: {
    code: props => (
        h('pre', {className: props.node.language},
            h('code', props.node.code),
            // h('span', {style: {backgroundColor: props.mark.color}}, props.children)
        )
    ),
    // marks: {
    //     mark: props => (
    //         h('mark', { style: { backgroundColor: props.mark.color } }, props.children)
    //     ),
    //     highlight: props => (
    //         h('mark', props.children)
    //     ),
    // },
  },
  marks: {
    mark: props => (
      h('mark', props.children)
    ),
    highlight: props => (
      h('mark', { class: 'highlight' }, props.children)
    ),
  },
}

let blockContentHTML = null
const convertBlockContentToHTML = (inputContent) => {
    if(inputContent) {
        blockContentHTML = blocksToHtml({
            blocks: inputContent,
            serializers: serializers
        })
        return blocksToHtml({
            blocks: inputContent,
            serializers: serializers
        })
    } else {
        return ''
    }
}
convertBlockContentToHTML()


export {
    convertBlockContentToHTML
}