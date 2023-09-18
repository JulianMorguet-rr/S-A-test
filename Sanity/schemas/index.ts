/*
  * This is the main schema file. It is used to import all the other schemas
  * The schema is exported as an array of objects. Each object represents a schema type
  * 
  * The imports are imported as default (e.g. import siteSettings from "./siteSettings";)
  * Or as named imports (e.g. import {pageType} from './page')  -> e.g. "export const uploadedVideo = defineType({ ... })"
*/

import siteSettings from "./siteSettings";

import blockContent from "./blockContent";
import pet from './pet'
import post from './post'
import author from './author'
import recruiting from './recruiting'
import {pageType} from './page'

// Page Sections 
import {heroType} from './heroType'
import {textWithIllustrationType} from  './textWithIllustrationType'
import {imageGalleryType} from  './imageGallerieType'
import {form} from  './formType'

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
  siteSettings,
  // Mediathek
  videoMediathek,
  uploadedVideo,
  // Custom Types 
  pet, post, pageType, author, recruiting,
  // Page Sections
  blockContent, 
  heroType,
  textWithIllustrationType,
  imageGalleryType,
  form,
  justAnImage,
  // Multistep Form 
  // multistep,
  multistepQuestions,
  multistepComposition,
  // Categoriy
  category,



]

// export const schemaTypes = [pet, post, pageType, blockContent, siteSettings]