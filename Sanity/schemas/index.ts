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

// Multi Step Form
import multistep from './multistep'
import multistepQuestions from './multistepQuestions'
import multistepComposition from './multistepComposition'

// Testing Categories in Sanity (übergeordnete Kategorien)
import category from "./category"

export const schemaTypes = [
  // Site Settings
  siteSettings,
  // Custom Types 
  pet, post, pageType, author, recruiting,
  // Page Sections
  blockContent, 
  heroType,
  textWithIllustrationType,
  imageGalleryType,
  form,
  // Multistep Form 
  // multistep,
  multistepQuestions,
  multistepComposition,
  // Categoriy
  category
]

// export const schemaTypes = [pet, post, pageType, blockContent, siteSettings]