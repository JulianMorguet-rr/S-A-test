/*
  * This is the main schema file. It is used to import all the other schemas
  * The schema is exported as an array of objects. Each object represents a schema type
  * 
  * The imports are imported as default (e.g. import siteSettings from "./siteSettings";)
  * Or as named imports (e.g. import {pageType} from './page')  -> e.g. "export const uploadedVideo = defineType({ ... })"
*/

// Global Site Settings
import globalSiteSettings from "./siteSettings/globalSiteSettings";
import appearance from "./siteSettings/appearance";
import mainMenu from "./siteSettings/menus";

// Global Types
import {seoSection} from "./meta/seoSection";

import blockContent from "./blockContent";
import post from './post'
import {postOverview} from './postOverview'
import author from './author'
import quotes from './quotes'
import recruiting from './recruiting'
import {pageType} from './page'

// Page Sections 
import {heroType} from './heroType'
import {textWithIllustrationType} from  './textWithIllustrationType'
import {textWithStickyImage} from  './textWidthStickyImage'
import {textSectionType} from  './textSectionType'
import { textWithTwoColumns } from './textWithTwoColumns'
import {imageGalleryType} from  './imageGallerieType'
import {statementType} from  './statementType'
import {socialLinks} from  './socialLinks'
import {statementCollection} from  './statementCollection'
// @ts-ignore
import {statementCollectionGrid} from  './statementCollectionGrid'
import {form} from  './formType'
import {quoteCollection} from './quoteCollection'
import {singleQuoteType} from './singleQuoteType'
import {accordionSection} from './accordionSection'
import { htmlElement } from "./htmlElement";

import contactSection from './contactSection'

// Mediathek
import videoMediathek from "./videoMediathek";
import {uploadedVideo} from "./uploadedVideos";

// Multi Step Form
import multistep from './multistep'
import multistepQuestions from './multistepQuestions'
import multistepComposition from './multistepComposition'

// import { justAnImage } from './justAnImage'

// Testing Categories in Sanity (übergeordnete Kategorien)
import category from "./category"

export const schemaTypes = [
  // Site Settings
  globalSiteSettings,
  appearance,
  mainMenu,
  // Global Types
  seoSection,
  // Mediathek
  videoMediathek,
  uploadedVideo,
  // Custom Types 
  post, postOverview, 
  pageType, author, quotes, recruiting,
  // Page Sections
  blockContent, 
  heroType,
  textSectionType,
  textWithTwoColumns,
  textWithIllustrationType,
  textWithStickyImage,
  imageGalleryType,
  accordionSection,
  singleQuoteType,
  quoteCollection,
  statementCollection,
  statementCollectionGrid,
  statementType,
  socialLinks,
  form,
  contactSection,
  htmlElement,
  // Multistep Form 
  // multistep,
  multistepQuestions,
  multistepComposition,
  // Categoriy
  category,
]

// export const schemaTypes = [pet, post, pageType, blockContent, siteSettings]