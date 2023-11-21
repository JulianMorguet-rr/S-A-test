<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Props {
  data: {
    heading: string
    tagline?: string 
    placeholderName?: string | undefined
    placeholderEmail?: string | undefined
    placeholderTextarea?: string | undefined
    buttonText?: string | undefined
    maxWidth?: string
  },
  nodemailerBaseURL: string,
  nodemailerContactFormPath: string
}
const props = defineProps<Props>()

const formData = ref({
    name: '',
    email: '',
    message: ''
})

const errors = ref(false)
const success = ref(false)
const waiting = ref(false)


// !!! ENV VARIABLES !!! //
// const environment = import.meta.env.NODE_ENV || 'development';
// console.log('environment: ', environment)

// loading whole .env file
let env = import.meta.env
console.log('env: ', env)

// const nodemailerURL = ref(import.meta.env.VITE_NODEMAILER_URL)
// nodemailerURL.value = import.meta.env.VITE_NODEMAILER_URL;
// console.log('nodemailerURL:', nodemailerURL.value)

const nodemailerBaseURL = ref(props.nodemailerBaseURL)
const nodemailerContactFormPath = ref(props.nodemailerContactFormPath)

// const getNodeMailer = async () => {
//   nodemailerURL.value = await import.meta.env.NODEMAILER_URL
//   console.log('nodemailerURL: ', nodemailerURL.value)
// } 
// getNodeMailer()


const handleSubmit = async () => {
    console.log('handleSubmit fired: ', formData)
    const response = await fetch(`${nodemailerBaseURL.value}/${nodemailerContactFormPath}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: formData.value.name,
            email: formData.value.email,
            message: formData.value.message
        })
    });

    const responseData = await response.json();
    console.log(responseData); // Message indicating success or failure
};

</script>

<template>
  <div :class="`text-section  ${props.data.maxWidth === 'medium' ? 'max-w-screen-md' : ''} m-auto`">
    <div class="container py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

      <div class="max-w-screen-md m-auto text-center py-8">
        <p class="section-tagline text-gray-500 sm:text-xl mb-4">{{ props.data.tagline }}</p>
        <h2 class="section-heading mb-4 text-4xl tracking-tight text-gray-900">{{ props.data.heading }}</h2>

        <!-- nodemailerBaseURL: {{nodemailerBaseURL}}<br>
        nodemailerContactFormPath: {{nodemailerContactFormPath}}<br> -->
      </div>

      <div class="section-block">
        <form @submit.prevent="handleSubmit()">
            <!-- <h3>{{ data.subtitle }}</h3>
            <h2>{{ data.heading }}</h2>
            <p>{{ formData.name }}</p>
            <p>{{ formData.email }}</p>
            <p>{{ formData.message }}</p> -->
            <div class="flex inputs">
                <input class="input-field" type="text" :placeholder="data.placeholderName" v-model="formData.name" />
                <input class="input-field" type="email" :placeholder="data.placeholderEmail" v-model="formData.email" />
            </div>
            <textarea class="textarea-field" :placeholder="data.placeholderTextarea" v-model="formData.message" />
            <button type="submit" class="m-auto flex section-cta cta items-center mt-6 text-white hover:bg-slate-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                <span v-if="waiting">
                  Laden
                  
                </span>
                <template v-if="!waiting">
                  Abschicken
                  <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                </template>
            </button>

            <br>

            <a 
                href="#" 
                class="inline-flex items-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
                Get started
                <svg class="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </a>


            <p v-if="errors">Etwas lief schief</p>
            <p v-if="success">Abgeschickt</p>
        </form>
      </div>
      
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
    --box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.1);
}

.container {
    display: flex;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }

  
</style>