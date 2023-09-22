<template>
    <div>
        <!-- View Transition API if "chrome" -->
        <div v-if="browserName === 'chrome'" class="image-wrapper base-shadow">
            <a class="base-shadow" :href="`/video/${media.video._id}`">
                <div class="play__Button">
                    <svg fill="rgb(251 146 60)" height="6rem" width="6rem" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                        viewBox="0 0 60 60" xml:space="preserve">
                        <g>
                            <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30
                                c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15
                                C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"/>
                            <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30
                                S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"/>
                        </g>
                    </svg>
                </div>
            </a>
            <!-- <p style="color: #fff;">Media: {{ media }}</p> -->
            <!-- <p style="color: #fff;">BrowserName: {{browserName}}</p> -->
            <img width="1600" height="900" :src="`https://geschmaecker-sind-verschieden.com/video-api/${media.video.thumbnailPath}`">
            <!-- <video class="hero-background-video">
                <source :src="`https://geschmaecker-sind-verschieden.com/video-api/${media.video.webmPath}`" type="video/webm">
                <source :src="`https://geschmaecker-sind-verschieden.com/video-api/${media.video.mp4Path}`" type="video/mp4">
            </video>   -->
        </div>
        <!-- No View Transition API if not "chrome" -->
        <div v-else class="image-wrapper base-shadow">
            <!-- <p style="color: #fff;">Media: {{ media }}</p> -->
            <!-- <p style="color: #fff;">BrowserName: {{browserName}}</p> -->
            <video controls class="hero-background-video">
                <source :src="`https://geschmaecker-sind-verschieden.com/video-api/${media.video.webmPath}`" type="video/webm">
                <source :src="`https://geschmaecker-sind-verschieden.com/video-api/${media.video.mp4Path}`" type="video/mp4">
            </video>  
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted } from 'vue'


interface Props {
    media: {
        video: {
            webmPath: string
            mp4Path: string
            thumbnailPath: string
            _id: string
        }
    }
}

const props = defineProps<Props>()

const media = ref(props.media)


// Browser Information 

const browserName = ref('')

onMounted(() => {
    fnBrowserDetect()
})
function fnBrowserDetect(){
                 
        let userAgent = window.navigator.userAgent;
        console.log('userAgent: ', userAgent)
        
        if(userAgent.match(/chrome|chromium|crios/i)){
            browserName.value = "chrome";
        }else if(userAgent.match(/firefox|fxios/i)){
            browserName.value = "firefox";
        }  else if(userAgent.match(/safari/i)){
            browserName.value = "safari";
        // }else if(userAgent.match(/opr//i)){
        //     browserName.value = "opera";
        } else if(userAgent.match(/edg/i)){
            browserName.value = "edge";
        }else{
            browserName.value = "No browser detection";
        }
}
</script>

<style scoped lang="scss">

$base-shadow: 0px 4px 12px rgba(0,0,0,0.1), 0px 8px 24px rgba(0,0,0,0.1);

.image-wrapper {
    // background: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: $base-shadow;

    a {
        display: flex;
        position: absolute;
        
        z-index: 9;
        height: 8rem;
        width: 8rem;
        background-color: #fff;
        box-shadow: $base-shadow;
        border-radius: 50%;

        .play__Button {
            margin: auto;
        }

        svg {
            margin: auto;
        }
    }

    img {
        opacity: 0.8;
    }
}
</style>