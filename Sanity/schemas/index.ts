/*
  * This is the main schema file. It is used to import all the other schemas
  * The schema is exported as an array of objects. Each object represents a schema type
  * 
  * The imports are imported as default (e.g. import siteSettings from "./siteSettings";)
  * Or as named imports (e.g. import {pageType} from './page')  -> e.g. "export const uploadedVideo = defineType({ ... })"
*/

import globalSiteSettings from "./siteSettings/globalSiteSettings";
import appearance from "./siteSettings/appearance";
import mainMenu from "./siteSettings/mainMenu";

import blockContent from "./blockContent";
import post from './post'
import author from './author'
import quotes from './quotes'
import recruiting from './recruiting'
import {pageType} from './page'

// Page Sections 
import {heroType} from './heroType'
import {textWithIllustrationType} from  './textWithIllustrationType'
import {imageGalleryType} from  './imageGallerieType'
import {form} from  './formType'
import {quoteType} from './quoteType'

// Mediathek
import videoMediathek from "./videoMediathek";
import {uploadedVideo} from "./uploadedVideos";

// Multi Step Form
import multistep from './multistep'
import multistepQuestions from './multistepQuestions'
import multistepComposition from './multistepComposition'

import { justAnImage } from './justAnImage'

// Testing Categories in Sanity (übergeordnete Kategorien)
import category from "./category"

export const schemaTypes = [
  // Site Settings
  globalSiteSettings,
  appearance,
  mainMenu,
  // Mediathek
  videoMediathek,
  uploadedVideo,
  // Custom Types 
  post, pageType, author, quotes, recruiting,
  // Page Sections
  blockContent, 
  heroType,
  textWithIllustrationType,
  imageGalleryType,
  form,
  justAnImage,
  quoteType,
  // Multistep Form 
  // multistep,
  multistepQuestions,
  multistepComposition,
  // Categoriy
  category,



]

// export const schemaTypes = [pet, post, pageType, blockContent, siteSettings]