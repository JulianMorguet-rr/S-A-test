<script setup lang="ts">
import {ref } from 'vue';
import type { Ref } from 'vue'

interface NavItem {
    title: string
    slug: string
}
interface SiteSettings {
    mainNav: Array<NavItem>
    footerNav: Array<any>
    siteLogo?: Object
}
const props = defineProps({
    siteSettings: Object as () => SiteSettings,
    slug: String
})

import { urlFor } from '../../lib/sanityApi.js';

const mainNav: Ref<Array<NavItem>> = ref([])
const computedMainNav = () => {
    // console.log('props.siteSettings.mainNav: ', props.siteSettings.mainNav)
    props.siteSettings.mainNav.map((navItem: NavItem) => {
        if(navItem.slug === '/') {
            mainNav.value.push(navItem)
        } else {
            navItem.slug = '/page' + navItem.slug
            mainNav.value.push(navItem)
        }
    })
}
computedMainNav()
</script>

<template>
    <header>
        <div class="inner">
            <a href="/">
                <img :src="urlFor(siteSettings.siteLogo).format('webp').url()"/>
            </a>
            
            <nav>
                <a 
                    v-for="(nav, index) in mainNav" 
                    :key="index" 
                    :href="nav.slug"
                    :class="{'active': nav.slug === slug}"
                >
                    {{nav.title}}
                </a>
            </nav>
        </div>
        <br>
        <!-- <p>{{ siteSettings }}</p> -->
    </header>
    <div class="header-space"></div>
</template>

<style lang="scss" scoped>
header {
    position: fixed;
    z-index: 9999;
    background: #fff;
    width: 100%;
    display: flex;
    justify-content: center;

    box-shadow: 0px 2px 6px rgba(0,0,0,0.1);

    .inner {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 1280px;
        padding: 20px 0px;

        img {
            height: 56px;
        }

        nav {
            display: flex;
            justify-content: flex-end;
            flex-grow: 3;
            gap: 2rem;

            a {
                
                &.active {
                    text-decoration: underline;
                }
            }
        }
    }
}
.header-space {
    height: 96px;
}
</style>