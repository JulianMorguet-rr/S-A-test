<template>
    <div>

        <h2>{{ id }}</h2>
        <p>newFetchedVideoData: {{ newDataArrived }}</p>

        <!-- <div v-if="!newDataArrived"> -->
        <div v-if="false">
            <h3 class="blog-post__headline">
                <span class="skeleton-box" style="width:55%;"></span>
            </h3>
            <p>
                <span class="skeleton-box" style="width:80%;"></span>
                <span class="skeleton-box" style="width:90%;"></span>
                <span class="skeleton-box" style="width:83%;"></span>
                <span class="skeleton-box" style="width:80%;"></span>
            </p>
        </div>

        <div v-else>
            <video controls autoplay playsinline class="hero-background-video">
                <source :src="`https://assets.geschmaecker-sind-verschieden.com/video-api/${videoData?.webmPath}`" type="video/webm">
                <source :src="`https://assets.geschmaecker-sind-verschieden.com/video-api/${videoData?.mp4Path}`" type="video/mp4">
            </video> 
            <!-- <h2 class="text-white">videoData: {{ videoData }}</h2> -->
        </div>

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

interface Props {
    videoData: {
        webmPath: string
        mp4Path: string
        thumbnailPath: string
        _id: string
    }
    id?: string
}


const props = defineProps<Props>()

console.log(props.videoData)
const videoData = ref(props.videoData)

// Import API functions
// import { getSingleVideo } from '../../lib/sanityApi.js';

/*
// Funktioniert nicht, da "astro-sanity" nicht mit "vue" kompatibel ist
const newFetchedVideoData = ref('test')

const fetchNewData = async () => {
    // setTimeout( async () => {
       console.log('fetchNewData fired')
        newFetchedVideoData.value = await getSingleVideo(`${props.id}`);
        console.log('newFetchedVideoData: ', newFetchedVideoData.value)
    // }, 1000)
}

onMounted(() => {
    console.log('onMounted fired')
    newFetchedVideoData.value = 'Mounted'
    fetchNewData()
})
*/

const newDataArrived = ref(false)

onMounted(() => {
    console.log('onMounted fired')
    // getSingleVideo(`${props.id}`).then((data) => {
    //     console.log('data: ', data)
    //     videoData.value = data
    //     newDataArrived.value = true
    // })
    setTimeout(() => {
        newDataArrived.value = true
    }, 3000)
})


</script>

<style scoped lang="scss">
video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
}



/* Skeleton Boxes */
@keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  .skeleton-box {
    display: inline-block;
    height: 1.3em;
    position: relative;
    overflow: hidden;
    background-color: rgba(255,255,255,0.5);
  }

  .skeleton-box::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );
    animation: shimmer 2s infinite;
    content: '';
  }
  .blog-post__headline {
    font-size: 1.25em;
    font-weight: bold;
  }
  .blog-post__meta {
    font-size: 3em;
    color: #6b6b6b;
  }

  .o-media {
    display: flex;
  }

  .o-media__body {
    flex-grow: 1;
  }

  .o-vertical-spacing > * + * {
    margin-top: 1.2em;
  }

  .o-vertical-spacing--l > * + * {
    margin-top: 2em;
  }
</style>