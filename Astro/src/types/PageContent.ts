// PageContent type definition


// interface PageBuilder {
//     textWithImage: {
//         _key: string;
//         _type: string;
//         image: {
//             asset: {
//                 _ref: string;
//                 _type: string;
//             }
//         }
//         text: string;
//     }
// }


interface ReferenceToPage {
    _type: 'reference';
    slug: string;
    heroImage: {
        _type: 'image';
        asset: {
            _ref: string;
        }
    }
  }

  interface ReferenceToQuote {
    _type: 'reference';
    
  }

export type ContentItem = 
    |   { _type: 'hero'; 
            heading?: string;
            subtitle?: string 
            title?: string;
            tagline?: string;
            image?: any;
            text?: string;
            blockContent?: Array<any>;
            excerpt?: string;
            switchImageToRightSide?: boolean;
            images?: Array<any>;   
            pageContent: any;
        }
    |   { _type: 'gallery'; 
            heading: string; 
            subheading: string;
            images: any[] 
        }
    |   { _type: 'form'; 
            heading: string
            subtitle?: string 
            placeholderName?: string | undefined
            placeholderEmail?: string | undefined
            placeholderTextarea?: string | undefined
            buttonText?: string | undefined 
        }
    |   { _type: 'textWithIllustration'; 
            heading: string; 
            text: string; 
            image: any; 
            video?: any;
            sectionType: 'standard' | 'fullwidthBackground' | 'fullwidthContent' 
        }
    |   { _type: 'textSection'; 
            heading: string; 
            text: string; 
            sectionType: 'standard' | 'fullwidthBackground' | 'fullwidthContent' 
        }
    |   { _type: 'textWithTwoColumns'; 
            leftText: Object; 
            rightText: Object;
            sectionType: 'standard' | 'fullwidthBackground' | 'fullwidthContent' 
        }
    |   { 
            _type: 'justAnImage'; 
            heading: string; 
            text: string; 
            image: any; 
            referenceToPage: ReferenceToPage;
        }
    |   { 
            _type: 'quoteCollection'; 
            heading?: string; 
            tagline?: string; 
            paragraph?: string;
            quoteArray: ReferenceToQuote[];
        }
    |   { 
            _type: 'singleQuote'; 
            heading: string; 
            tagline?: string; 
            paragraph?: string;
            quoteReference: ReferenceToQuote;
        }
    |   { 
            _type: 'accordionSection'; 
            heading: string;
            tagline: string;
            blockContent?: Array<any>;
            // TODO: hier noch richtige Types hinzufügen
            singleAccordionItem: any[];
        }
    |   { 
            _type: 'statementCollection'; 
            heading: string;
            tagline: string;
            blockContent?: Array<any>;
            // TODO: hier noch richtige Types hinzufügen
            statements?: Array<any>;
        }



export interface PageContent {
    heroImage: string;
    heroImageAlt: string;
    heroBackgroundVideo: {
        webmPath: string;
        mp4Path: string;
        thumbnail: string;
    }
    heading: string;
    slug: string;
    pageBuilder: ContentItem[];

    seoSection?: {
        title: string;
        metaDescription: string;
        allowSearchEngines: boolean;
    }
}