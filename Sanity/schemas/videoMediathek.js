// import { VideoUploader, VideoGallery } from '../components/VideoUploader';
import { JsonView } from '../components/JsonView';

import {VideoUploader, VideoGallery} from '../components/VideoUploader';

export default {
    name: 'videoMediathek',
    title: 'Video Mediathek',
    type: 'document',
    fields: [

      {
        name: 'name',
        type: 'string',
        title: 'Video Name (uploadedVideo)',
      },

      // {
      //   name: 'rawData',
      //   title: 'Raw Data',
      //   type: 'blockContent', // if i use other other fields like text I should switch for Example to 'string' 
      //   components: {
      //     input: JsonView,
      //   }
      // },

      // {
      //   name: 'whatever',
      //   title: 'Whatever',
      //   type: 'string',
      //   description: 'jsx Video Uploader (real component)',
      // }, 

        {
          name: 'title',
          title: 'Title',
          type: 'string',
          // validation: Rule => Rule.required(),
        },
        {
          name: 'description',
          title: 'Description',
          type: 'text',
        },

      
      {
        name: 'videoUploader',
        title: 'Video Uploader',
        type: 'string',
        description: 'jsx Video Uploader (real component)',
        components: {
          input: VideoUploader
        }
      },
      
      {
        name: 'videoGallery',
        title: 'Video Gallery',
        type: 'string',
        description: 'jsx Video Gallery (real component)',
        components: {
          input: VideoGallery
        }
      },

      
      
      
      {
        name: 'video',
        title: 'Video',
        type: 'file',
        options: {
          accept: 'video/*',
        },
        validation: Rule => Rule.required(),
      },
    ],
  };