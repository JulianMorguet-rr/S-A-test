<template>
    <div>
        <div class="section-asset image-edge-grid__img base-shadow">
            
            <!-- <div v-if="!media">
                <p>loading... </p>
            </div> 

            <div> -->

                <!-- <p>browserName: {{ browserName }}</p> -->

                <!-- View Transition API if "chrome" -->
                <!-- v-if="browserName == 'chrome'" -->
                <div class="image-wrapper base-shadow">

                    <!-- <a class="base-shadow" aria-label="Sehen Sie sich das Video an" :href="`/video/${media.video._id}`"> -->
                    <div class="play__Button__Wrapper">
                        <div class="play__Button" @click="toggleModal">
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
                    </div>
                    <!-- </a> -->

                    <!-- <p style="color: #fff;">Media: {{ media }}</p> -->
                    <!-- <p style="color: #fff;">BrowserName: {{browserName}}</p> -->

                    <!-- <img 
                        width="1600"
                        height="900"
                        :src="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video.thumbnailPath}`"
                        :alt="media.video._id || 'Video Thumbnail'"
                    /> -->

                    <picture class="video-thumbnail">
                        <source :srcset="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video?.thumbnailPathWebP}`" type="image/webp">
                        <img
                            width="1600"
                            height="900"
                            :src="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video?.thumbnailPath}`"
                            :alt="media.video._id || 'Video Thumbnail'"
                        >
                    </picture>

                    <!-- <video class="hero-background-video">
                        <source :src="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video.webmPath}`" type="video/webm">
                        <source :src="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video.mp4Path}`" type="video/mp4">
                    </video>   -->
                </div>
                <!-- No View Transition API if not "chrome" -->
                <!-- <div v-else class="image-wrapper base-shadow">
                    <video controls playsinline :poster="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video.thumbnailPath}`" class="hero-background-video">
                        <source :src="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video.webmPath}`" type="video/webm">
                        <source :src="`https://assets.geschmaecker-sind-verschieden.de/video-api/${media.video.mp4Path}`" type="video/mp4">
                    </video>  
                </div> -->

            <!-- </div> -->

        </div>


        <div id="updateProductModal" tabindex="-1" aria-hidden="true" :class="{hidden: !isModalOpen }" class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
            <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
                <!-- Modal content -->
                <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                    <!-- Modal header -->
                    <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            Update Product
                        </h3>
                        <button @click="toggleModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="updateProductModal">
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            <span class="sr-only">Close modal</span>
                        </button>
                    </div>
                    <!-- Modal body -->
                    <div class="modal-body">
                        <h2>Video goes here</h2>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup lang="ts">
import { Image } from 'astro:assets';
import { ref, onMounted } from 'vue'


interface Props {
    media: {
        video: {
            webmPath: string
            mp4Path: string
            thumbnailPath: string
            thumbnailPathWebP: string
            _id: string
        }
    }
}

const props = defineProps<Props>()

const media = ref(props.media)


// Browser Information 

const browserName = ref('')


const isModalOpen = ref(false)

const toggleModal = () => {
  isModalOpen.value = !isModalOpen.value;
};


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

.video-thumbnail img {
    background-color: aqua;
    aspect-ratio: 16 / 9;
    width: 100%;
}


#updateProductModal {
    height: 100vh;
    width: 100vw;
    // background: rgba(0,0,0,0.3);
    // top: 0px;
    // display: flex;
    // position: fixed;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000; /* Ein hoher z-index-Wert, um sicherzustellen, dass es über allen anderen Elementen liegt */
    background-color: rgba(0, 0, 0, 0.5); /* Hintergrundfarbe mit Deckkraft, um den Hintergrund zu verdunkeln */
    display: flex;
    justify-content: center;
    align-items: center;
}

#updateProductModal.hidden {
    display: none;
}

$base-shadow: 0px 4px 12px rgba(0,0,0,0.1), 0px 8px 24px rgba(0,0,0,0.1);

.image-wrapper {
    // background: #000;
    display: flex;
    justify-content: space-around;
    align-items: center;
    // box-shadow: $base-shadow;

    a, .play__Button__Wrapper {
        display: flex;
        position: absolute;
        
        z-index: 9;
        height: 8rem;
        width: 8rem;
        background-color: #fff;
        // box-shadow: $base-shadow;
        border-radius: 50%;

        .play__Button {
            margin: auto;
            cursor: pointer;
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