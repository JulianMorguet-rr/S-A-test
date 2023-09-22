import { useSanityClient, groq } from 'astro-sanity';

/*
export async function getSiteSettings() {
  const query = groq`*[_type == "siteSettings"][0]`; // siteSettings is the name of the schema from '/scr/structure/index.js'
  const siteSettings = await useSanityClient().fetch(query);
  // console.log('siteSettings: ', siteSettings);
  return siteSettings;
}
*/

export async function getFirstBlogPost() {
  const query = groq`*[_type == "post"]{
    title,
    mainImage,
    'imageUrl': mainImage.asset->url,
    body,
    categories, 
    author->,
  }`;
  const firstPost = await useSanityClient().fetch(query);
  return firstPost;
}

// So wäre die ganze API URL ohne "groq" und "useSanityClient" geschrieben:
// https://tz4j4rda.api.sanity.io/v2021-06-07/data/query/production?query=*[1] 
// Dabei ist 0 für "Pages" und 1 für "Posts" (siehe Sanity Studio)

export async function getSiteSettings() {
  const query = groq`*[_type == "siteSettings"][0]{
    ..., 
    'mainNav': mainNav[]->{
      title,
      slug,
    },
  }`; // siteSettings is the name of the schema from '/scr/structure/index.js'
  const siteSettings = await useSanityClient().fetch(query);
  // console.log('siteSettings: ', siteSettings);
  return siteSettings;
}

export async function getHomePage() {
  const query = groq`*[_type == "page" && slug == "/"][0]{
    ...,
    heroBackgroundVideo->,
    pageBuilder[]{
      ...,
      media {
        ...,
        video->
      },
      cta {
        ...,
        ctaReferenz->,
      }, 
      referenceToPage->,
    }
  }`; // "page" is the name of the schema from '/scr/structure/index.js'
  const page = await useSanityClient().fetch(query);
  // console.log('page: ', page);
  return page;
}

export async function getPages() {
  const query = groq`*[_type == "page"][0]`; // "page" is the name of the schema from '/scr/structure/index.js'
  const pages = await useSanityClient().fetch(query);
  // console.log('pages: ', pages);
  return pages;
}

export async function getCurrentPage(pageSlug) {
  const query = groq`*[_type == "page" && slug == "${pageSlug}"][0]{
    ...,
    images[]->,
  }`; // "page" is the name of the schema from '/scr/structure/index.js'
  const pages = await useSanityClient().fetch(query);
  // console.log('pages: ', pages);
  return pages;
}


export async function getSingleVideo(_id) {
  const query = groq`*[_type == "uploadedVideo" && _id == "${_id}"][0]{
    ...
  }`;
  const siteSettings = await useSanityClient().fetch(query);
  return siteSettings;
}


export async function getRecruitingData() {
  const query = groq`*[_type == "recruiting"][0]`; // "page" is the name of the schema from '/scr/structure/index.js'
  const pages = await useSanityClient().fetch(query);
  // console.log('pages: ', pages);
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

import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'tz4j4rda',
  dataset: 'production',
  apiVersion: 'v2021-03-25', // use current UTC date - see "specifying API version"!
  useCdn: true // `false` if you want to ensure fresh data
})

// projectId: "tz4j4rda",
// dataset: "production",
// apiVersion: "v2021-03-25",
// useCdn: true

console.log('Sanity – client: ', client)

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






