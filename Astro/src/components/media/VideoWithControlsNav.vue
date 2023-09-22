<template>
    <div>
        <div class="close" v-on:click="returnToLastURL()">
                X
        </div>

        <div>
            <p style="color: #fff;" @click="myRef = 'whatever'">{{ myRef }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const myRef = ref('myRef')

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

</style>