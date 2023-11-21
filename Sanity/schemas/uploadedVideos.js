import {defineArrayMember, defineField, defineType} from 'sanity'
import VideoPlayer from '../components/videoPlayer';

export const uploadedVideo = defineType({
    name: 'uploadedVideo',
    type: 'document',
    title: 'Uploaded Video',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Video Name (uploadedVideo)',
        validation: Rule => Rule.required(),
      },
      {
        name: 'videoURL',
        title: 'Video Player',
        type: 'string',
        components: {
          input: VideoPlayer
        }
      },
      {
        name: 'description',
        type: 'text',
        title: 'Video Description (alt Text für SEO)',
      },
      {
        name: 'useCustomThumbnail',
        title: 'Use Custom Thumbnail',
        type: 'boolean',
        initialValue: false,
      },

      {
        name: 'customThumbnailImage',
        type: 'image',
        title: 'Custom Thumbnail',
        options: {
          hotspot: true,
        },
        hidden: ({parent, value}) => parent?.useCustomThumbnail !== true,
        validation: Rule => Rule.custom((fieldValue, context) => {
          // Prüfen, ob 'useCustomThumbnail' auf 'true' gesetzt ist
          if (context.document.useCustomThumbnail) {
            return fieldValue ? true : 'Es ist ein Bild erforderlich, wenn "Use Custom Thumbnail" aktiviert ist.'
          }
          return true;
        })
      },
      {
        name: 'alt',
        title: 'Alternative Text',
        type: 'string',
        // validation: Rule => Rule.required() // Rule.required().min(10).max(80)
        // validation: Rule => [
        //   Rule.required().min(10).error('A title of min. 10 characters is required'),
        //   Rule.max(50).warning('Shorter titles are usually better')
        // ]
        hidden: ({parent, value}) => parent?.useCustomThumbnail !== true,
        validation: Rule => Rule.custom((fieldValue, context) => {
          // Prüfen, ob 'useCustomThumbnail' auf 'true' gesetzt ist
          if (context.document.useCustomThumbnail) {
            return fieldValue ? true : 'Ein Alt Text ist erforderlich, wenn "Use Custom Thumbnail" aktiviert ist.'
          }
          return true;
        })
      },
        
      {
        name: 'mp4Path',
        type: 'string',
        title: 'MP4 Video Path',
        readOnly: true,
      },
      {
        name: 'webmPath',
        type: 'string',
        title: 'Webm Video Path',
        // make read only 
        readOnly: true,
      },
      {
        name: 'thumbnailPath',
        type: 'string',
        title: 'Thumbnail Path',
        readOnly: true,
      },
      {
        name: 'thumbnailPathWebP',
        type: 'string',
        title: 'thumbnailPath WebP',
        readOnly: true,
      },
      {
        name: 'webmConversionStatus',
        type: 'string',
        title: 'WebM Conversion Status',
        options: {
          list: ['waiting', 'processing', 'completed'],
        },
      },
      {
        name: 'devMode',
        title: 'Dev Mode (Uploads to local dev server)',
        type: 'boolean',
      },
    ],
  })