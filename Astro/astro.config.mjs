import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";
import vue from "@astrojs/vue";
import node from "@astrojs/node";
import tailwind from "@astrojs/tailwind";

import robotsTxt from "astro-robots-txt";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [sanity({
    projectId: "tz4j4rda",
    dataset: "production",
    apiVersion: "v2021-03-25",
    useCdn: true
  }), vue(), tailwind(), robotsTxt()],
  images: {
    domains: ['cdn.sanity.io', 'geschmaecker-sind-verschieden.com/'],
    remotePatterns: [{protocol: 'https'}]
  },
  adapter: node({
    mode: "standalone"
  })
});