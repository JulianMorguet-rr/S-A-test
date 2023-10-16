import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";
import vue from "@astrojs/vue";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";
import robotsTxt from "astro-robots-txt";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
  // compressHTML: false,
  site: 'https://geschmaecker-sind-verschieden.de',
  output: "server",
  server: {
    port: 4321,
    host: true // expose on all addresses, including LAN and public addresses
  },
  integrations: [
    sanity({
      projectId: "tz4j4rda",
      dataset: "production",
      apiVersion: "v2021-03-25",
      useCdn: true
    }), 
    vue(), 
    tailwind(), 
    robotsTxt(), 
    prefetch()
  ],
  images: {
    domains: ['cdn.sanity.io', 'geschmaecker-sind-verschieden.de', 'geschmaecker-sind-verschieden.de/videos/video-api'],
    remotePatterns: [{
      protocol: 'https'
    }]
  },
  adapter: node({
    mode: "standalone"
  })
});