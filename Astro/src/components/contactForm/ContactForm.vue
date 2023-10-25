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
  <div class="container py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">

    <div class="max-w-screen-md m-auto text-center py-8">
      <p class="section-tagline text-gray-500 sm:text-xl mb-4">{{ props.data.tagline }}</p>
      <h2 class="section-heading mb-4 text-4xl tracking-tight font-extrabold text-gray-900">{{ props.data.heading }}</h2>

      <!-- nodemailerBaseURL: {{nodemailerBaseURL}}<br>
      nodemailerContactFormPath: {{nodemailerContactFormPath}}<br> -->
    </div>


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
        <button type="submit">
            <template v-if="waiting">Laden</template>
            <template v-if="!waiting">Abschicken</template>
        </button>
        <p v-if="errors">Etwas lief schief</p>
        <p v-if="success">Abgeschickt</p>
    </form>
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