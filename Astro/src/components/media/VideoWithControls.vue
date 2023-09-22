<template>
    <div>
        
        <div class="close" v-on:click="logSomething()">
                X
        </div>

        <div>
            <p style="color: #fff;" @click="myRef = 'whatever'">{{ myRef }}</p>
        </div>

        <video controls autoplay playsinline class="hero-background-video">
            <source :src="`https://geschmaecker-sind-verschieden.com/video-api/${videoData.webmPath}`" type="video/webm">
            <source :src="`https://geschmaecker-sind-verschieden.com/video-api/${videoData.mp4Path}`" type="video/mp4">
        </video> 
        <!-- <h2 class="text-white">videoData: {{ videoData }}</h2> -->
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'

interface Props {
    videoData: {
        webmPath: string
        mp4Path: string
        thumbnailPath: string
        _id: string
    }
}

const props = defineProps<Props>()

const videoData = ref(props.videoData)


const myRef = ref('myRef')

const logSomething = () => {
    console.log('logSomething fired')
    returnToLastURL()
}

const returnToLastURL = () => {
    console.log('return to last URL')
    window.history.back()
}
</script>

<style scoped>
.close {
    height: 8rem;
    width: 8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin-right: 0;
    margin-left: auto;
    background: #73b740;
}

video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
}
</style>