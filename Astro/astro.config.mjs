import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";
import vue from "@astrojs/vue";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [sanity({
    projectId: "tz4j4rda",
    dataset: "production",
    apiVersion: "v2021-03-25",
    useCdn: true
  }), vue()],
  adapter: node({
    mode: "standalone"
  })
});