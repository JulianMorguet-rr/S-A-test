import { useSanityClient, groq } from 'astro-sanity';

export async function getFirstBlogPost() {
  const query = groq`*[_type == "post"]{
    title,
    mainImage,
    'imageUrl': mainImage.asset->url,
    body,
    categories, 
    author,
  }`;
  const firstPost = await useSanityClient().fetch(query);
  return firstPost;
}

// So wäre die ganze API URL ohne "groq" und "useSanityClient" geschrieben:
// https://tz4j4rda.api.sanity.io/v2021-06-07/data/query/production?query=*[1] 
// Dabei ist 0 für "Pages" und 1 für "Posts" (siehe Sanity Studio)

export async function getSiteSettings() {
  const query = groq`*[_type == "siteSettings"][0]`; // siteSettings is the name of the schema from '/scr/structure/index.js'
  const siteSettings = await useSanityClient().fetch(query);
  console.log('siteSettings: ', siteSettings);
  return siteSettings;
}


export async function getPages() {
  const query = groq`*[_type == "page"][0]`; // "page" is the name of the schema from '/scr/structure/index.js'
  const pages = await useSanityClient().fetch(query);
  console.log('pages: ', pages);
  return pages;
}



/* End of normal Sanity + Astro API Calls */

/* Image Loader 
import myConfiguredSanityClient from './sanityClient'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(myConfiguredSanityClient)

function urlFor(source) {
  return builder.image(source)
}
*/


/* End of Sanity + Astro */ 




/* Image-URL */

// import { createClient } from '@sanity/client'

/* Image-URL */ 
import createImageUrlBuilder from '@sanity/image-url'
import { config } from './sanityConfig';

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

/*
// Could not import "sanityClient" from "@sanity/client"
// import myConfiguredSanityClient from '@sanity/client'
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// const builder = imageUrlBuilder(myConfiguredSanityClient)
const builder = imageUrlBuilder(createClient)

export function urlFor(source) {
  return builder.image(source)
}
*/






