import siteSettings from "./siteSettings";
import blockContent from "./blockContent";
import pet from './pet'
import post from './post'
import author from './author'
import {pageType} from './page'

// Page Sections 
import {heroType} from './heroType'
import {textWithIllustrationType} from  './textWithIllustrationType'
import {imageGalleryType} from  './imageGallerieType'
import {formType} from  './formType'

export const schemaTypes = [
  heroType,
  textWithIllustrationType,
  imageGalleryType,
  formType,
  pet, post, author, pageType, blockContent, siteSettings
]

// export const schemaTypes = [pet, post, pageType, blockContent, siteSettings]