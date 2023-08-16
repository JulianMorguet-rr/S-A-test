import { defineConfig } from 'astro/config';
import sanity from "astro-sanity";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  integrations: [sanity({
    projectId: "tz4j4rda",
    dataset: "production",
    apiVersion: "v2021-03-25",
    useCdn: true
  }), vue()]
});