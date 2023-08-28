<script setup>
const props = defineProps({
    data: Object
})

import { urlFor } from '../lib/sanityApi.js';

// Convert blockContent to HTML
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

let blockContentHTML = blocksToHtml({
    blocks: props.data.blockContent,
    serializers: serializers
    // serializers: {marks: {highlight}}
})

// console.log('blockContentHTML: ', blockContentHTML)

</script>

<template>
    <div>
        <div 
            v-if="data.switchImageToRightSide === false" 
            :class="`flexbox column fullwidth-${data.fullwidth}`"
        >
            <div class="image-wrapper">
                <img :src="urlFor(data.image).width(1240).height(640).format('webp').url()"/>
            </div>
            <div class="text-content">
                <h3 class="tagline">{{data.tagline}}</h3>
                <h2>{{data.heading}}</h2>
                <div v-html="blockContentHTML"></div>
                <!-- <div>{{data.blockContent}}</div> -->
                <!-- <br>
                <p>switchImage: {{data.switchImageToRightSide}}</p>
                <p>fullwidth: {{data.fullwidth}}</p> -->
            </div>
        </div>

        <div 
            v-if="data.switchImageToRightSide === true" 
            :class="`flexbox column flipped fullwidth-${data.fullwidth}`
        ">
            <div class="text-content">
                <h3 class="tagline">{{data.tagline}}</h3>
                <h2>{{data.heading}}</h2>
                <div v-html="blockContentHTML"></div>
                <!-- <div>{{data.blockContent}}</div> -->
                <!-- <br>
                <p>switchImage: {{data.switchImageToRightSide}}</p>
                <p>fullwidth: {{data.fullwidth}}</p> -->
            </div>
            <div class="image-wrapper">
                <img :src="urlFor(data.image).width(1240).height(640).format('webp').url()"/>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
    .fullwidth-true {
        left: calc(50% - 50vw );
        width: 100vw !important;
        position: relative;

        .image-wrapper {
            width: 100%;
            height: auto;
            margin-bottom: 2rem;
            img {
                width: 100%;
                height: auto;
            }
        }

        .text-content {
            box-sizing: border-box;
            flex-basis: calc(50vw - 30px);
            padding-right: calc((100vw / 2) - (1240px / 2));
            flex-grow: 0;
        }
        &.flipped 
            .text-content {
            box-sizing: border-box;
            flex-basis: calc(50vw - 30px);
            padding-right: 0;
            padding-left: calc((100vw / 2) - (1240px / 2));
            flex-grow: 0;
        }
    }
</style>
