import {defineArrayMember, defineField, defineType} from 'sanity'


export const uploadedVideo = defineType({
    name: 'uploadedVideo',
    type: 'document',
    title: 'Uploaded Video',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'Video Name (uploadedVideo)',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Video Description (alt Text für SEO)',
      },
      {
        name: 'mp4Path',
        type: 'string',
        title: 'MP4 Video Path',
      },
      {
        name: 'webmPath',
        type: 'string',
        title: 'Webm Video Path',
      },
      {
        name: 'thumbnailPath',
        type: 'string',
        title: 'Thumbnail Path',
      },
      {
        name: 'thumbnailPathWebP',
        type: 'string',
        title: 'thumbnailPath WebP',
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