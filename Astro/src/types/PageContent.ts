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
            switchImageToRightSide: boolean 
        }
    |   { 
            _type: 'justAnImage'; 
            heading: string; 
            text: string; 
            image: any; 
            referenceToPage: ReferenceToPage;
        }



export interface PageContent {
    heroBackgroundVideo: {
        webmPath: string;
        mp4Path: string;
        thumbnail: string;
    }
    heroImage: string;

    pageBuilder: ContentItem[];
}