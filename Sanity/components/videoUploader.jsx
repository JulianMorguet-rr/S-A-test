import React, { useState, useEffect, useRef } from 'react';
import './CSS/videoGallery.scss'

import {createClient} from "@sanity/client";
const client = createClient({
    projectId: 'tz4j4rda',
    dataset: 'production',
    apiVersion: 'v2021-03-25', // use current UTC date - see "specifying API version"!
    useCdn: true // `false` if you want to ensure fresh data
})

// import {mediaUploadBaseURL} from '../src/environment'
import {devMode} from '../src/environment.js'

import {nodemailerURL} from '../src/environment.js'
import {mediaUploadBaseURL} from '../src/environment.js'
import {mediaUploadSocketBaseURL} from '../src/environment.js'
import {myStudioTitle} from '../src/environment.js'


// socket.io
import { io } from "socket.io-client"
const socket = io(mediaUploadSocketBaseURL)



// socket.on("connect", () => {
//   console.log(`Socket connected with ${socket.id}`)
// });
// socket.on('error', (error) => {
//   console.error('WebSocket error:', error);
// });

// socket.emit("custom-event", 'custom-data')


// socket.on("uploadStatus", (message) => {
//   console.log('uploadStatus: ', message);
// });

// socket.emit("upload-video", 'video', 'title', 'description')



// const saveVideoAPIEndpoint = 'http://localhost:2001/save-video' 

console.log('VideoUploader wurde aufgerufen')

const saveVideoAPIEndpoint = `${mediaUploadBaseURL}/video-api/save-video`;
console.log('saveVideoAPIEndpoint: ', saveVideoAPIEndpoint)

export function VideoUploader() {

  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [uploadStatusData, setUploadStatusData] = useState([]);
  const [webmConversionStatus, setWebmConversionStatus] = useState('');

  useEffect(() => {
    // Initialisierung der WebSocket-Verbindung
    socket.on('connect', () => {
      console.log(`Socket connected with ${socket.id}`);
    });

    socket.on('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.on('uploadStatus', (message) => {
      console.log('uploadStatus: ', message);
      if(message.includes('error Message')) {
        setUploadStatusData([message]);
      } else {
        setUploadStatusData((prevArray) => {
          // Handle case when prev video was uploaded successfully
          if(prevArray.includes('Video successfully uploaded')) {
            return [];
          }
          // Filtere alle Nachrichten aus, die "error Message" enthalten
          const filteredArray = prevArray.filter((item) => !item.includes('error Message'));
          // Füge die neue Nachricht zum gefilterten Array hinzu
          return [...filteredArray, message];
        });
      }
    });

    socket.on('webmConversionProgress', (message) => {
      console.log('webmConversionProgress: ', message);
      setWebmConversionStatus(message)
    });

    return () => {
      // Aufräumen bei Demontage der Komponente
      console.log('%c I am beeing cleaned up', 'color: red; font-size: 1.5em')
      socket.off('connect');
      socket.off('error');
      socket.off('uploadStatus');
    };
  }, []); 

  const handleVideoChange = e => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {

    setUploadStatusData([])

    console.log(`%c handleUpload wurde aufgerufen – emit "uploadVideo" to socket.io`, 'color: red; font-size: 1.5em')

    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', title);
    formData.append('description', description);
    formData.append('devMode', devMode);

    if(!formData.get('video')) {
      console.error('Error: No video selected');
      setUploadStatusData(['Error: No video selected']);
      return;
    }
    if(!formData.get('name')) {
      console.error('Error: No name entered');
      setUploadStatusData(['Error: No name entered']);
      return;
    }
    if(!formData.get('description')) {
      console.error('Error: No description entered');
      setUploadStatusData(['Error: No description entered']);
      return;
    }

    try {
      const response = await fetch(saveVideoAPIEndpoint, {
      // await fetch(saveVideoAPIEndpoint, {
        method: 'POST',
        body: formData,
      });

      if (response.status === 200) {
        // setUploadStatusData(['Video uploaded successfully']);
        setVideo(null);
        setTitle('');
        setDescription('');
      } else {
        console.error('Error uploading video:', response.statusText);
        // setUploadStatusData(['Error uploading video']);
      }
    } catch (error) {
      console.error('Error uploading video:', error);
      // setUploadStatusData(['Error uploading video']);
    }
  };

  return (
    <div>
        <h2>Upload Video</h2>
        <input type="file" accept="video/*" onChange={handleVideoChange} />
        <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
        />
        <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
        <button onClick={handleUpload}>Upload Video</button>

        <div className='update-status'>
            { uploadStatusData.length > 0 &&
              uploadStatusData.map((message, index) => (
                <div key={index} className={`
                  processing-info
                  ${index === (uploadStatusData.length - 1) ? 'active' : ''} 
                  ${index < (uploadStatusData.length - 1) ? 'check' : ''} 
                  ${message.match(/error/i) ? 'validation-error' : ''}
                  ${message.includes('successfully') ? 'success' : ''}
                `}>
                  <div>
                    {message}
                    {
                      message.includes('WebM') && <div>Conversion Progress: {(+webmConversionStatus).toFixed(2)}%</div>
                    }
                  </div>
                  {/* <div className={"flipping-6"}></div> */}
                  <div className="circle-loader">
                      <div className="checkmark draw"></div>
                    </div>
                </div>
              ))
            }
        </div>
    </div>
  );
}





export function VideoGallery() {

    const [referenceData, setReferenceData] = useState([]);

    useEffect(() => {
      const getReferences = () => {
        const query = `*[_type == "uploadedVideo"]{
          ...,
        }`;
        client.fetch(query).then(data => {
          // sort data by date
          let sortedData = data.sort((a, b) => {
            const dateA = new Date(a._createdAt);
            const dateB = new Date(b._createdAt);
            return dateB - dateA; // Sortiere absteigend nach Datum
          });
          console.log('sortedData: ', sortedData.map((d, index) => (d._createdAt)))
          setReferenceData(sortedData); // update state with sorted data
        }).catch(error => {
          console.error('Fehler beim Laden der Daten:', error);
        });
      };
    
      getReferences();
    }, []);

    const [videos, setVideos] = useState([]);
  
    // useEffect(() => {
    //     fetchVideos();
    // }, []); // Lädt Videos automatisch beim Rendern
  
    const query = `*[_type == 'uploadedVideo']`;

    // // TODO: hier Sanity Daten laden statt Express Endpoint. So habe ich nur ein Datensatz pro Video statt aktuell mp4, webm und thumbnail
    const fetchVideos = async () => {
        // try {
        //     const response = await fetch('http://localhost:2001/get-videos');
        //     const data = await response.json();
        //     setVideos(data);
        // } catch (error) {
        //     console.error('Error fetching videos:', error);
        // }

        try {
            const response = await client.fetch(query)
            // const data = await response.json();
            console.log('response: ', response)
            setVideos(response);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    // #Hier über Saniyt abrufen 
    useEffect(() => {

        console.log('Fetch Videos');
        fetchVideos();
    }, []);
  
    const openVideoLightbox = (videoPath) => {
        // Hier kannst du eine Methode zum Öffnen der Lightbox implementieren
        // Du könntest eine Modals-Komponente verwenden oder eine andere Lightbox-Library
    };
  
    return (
        <>
            <div className="video-gallery">
                    <h1>Video Gallery! </h1>
                    <p>nodemailerURL: {nodemailerURL}</p>
                    <p>mediaUploadBaseURL: {mediaUploadBaseURL}</p>
                    <p>myStudioTitle: {myStudioTitle}</p>

                    {/* { 
                        referenceData.map((ref, index) => (
                            <div key={index}><p>{JSON.stringify(ref)}</p></div>
                        )) 
                    } */}

                    <div className="video-grid">
                    
                    {referenceData.map((video, index) => (
                        <div key={index} className="video-item">
                        {/* <h2>{video.title}</h2> */}
                        <h2>{video.name}</h2>
                        <p>{video.description}</p>
                        {/* <p>{JSON.stringify(video)}</p> */}
                        <div className="video-thumbnail" onClick={() => openVideoLightbox(video.path)}>
                            <video controls>
                              {/* <source src={`${mediaUploadBaseURL}/video-api/${video.webmPath}`} type="video/webm" /> */}
                              <source src={`${mediaUploadBaseURL}/video-api/${video.mp4Path}`} type="video/mp4" />
                              {/* <source src={`https://assets.geschmaecker-sind-verschieden.de/video-api/${video.webmPath}`} type="video/mp4" /> */}
                              Your browser does not support the video tag.
                            </video>
                        </div>
                        </div>
                    ))}
                    </div>
            </div>
        </>
    );
  }





