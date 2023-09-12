import React, { useState, useEffect } from 'react';
import './CSS/videoGallery.css'

import {createClient} from "@sanity/client";
const client = createClient({
    projectId: 'tz4j4rda',
    dataset: 'production',
    apiVersion: 'v2021-03-25', // use current UTC date - see "specifying API version"!
    useCdn: true // `false` if you want to ensure fresh data
})

export function VideoGallery() {

    const [referenceData, setReferenceData] = useState([]);

    useEffect(() => {
        const getReferences = () => {
          const query = '*[_type == "multistepQuestions"]';
          client.fetch(query).then(data => {
            setReferenceData(data); // Aktualisierung des Zustands mit den Daten
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
        //     const response = await fetch('http://localhost:1001/get-videos');
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

        console.log('useEffect wurde aufgerufen');
        fetchVideos();
    }, []);
  
    const openVideoLightbox = (videoPath) => {
        // Hier kannst du eine Methode zum Öffnen der Lightbox implementieren
        // Du könntest eine Modals-Komponente verwenden oder eine andere Lightbox-Library
    };
  
    return (
        <>
            <div className="video-gallery">
                    <h1>Video Gallery</h1>

                    { 
                        referenceData.map((ref, index) => (
                            <div key={index}><p>{JSON.stringify(ref)}</p></div>
                        )) 
                    }

                    <div className="video-grid">
                    
                    {videos.map((video, index) => (
                        <div key={index} className="video-item">
                        <h2>{video.title}</h2>
                        <h2>{video.name}</h2>
                        <p>{video.description}</p>
                        <div className="video-thumbnail" onClick={() => openVideoLightbox(video.path)}>
                            <video controls>
                            <source src={`http://localhost:1001/${video.path}`} type="video/mp4" />
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
  
export function VideoUploader() {
  const [video, setVideo] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleVideoChange = e => {
    setVideo(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('video', video);
    formData.append('name', title);
    formData.append('description', description);

    try {
      await fetch('http://localhost:1001/save-video', {
        method: 'POST',
        body: formData,
      });
      alert('Video uploaded successfully');
    } catch (error) {
      console.error('Error uploading video:', error);
      alert('Error uploading video');
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
    </div>
  );
}
