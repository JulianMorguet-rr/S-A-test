import React, { useState, useEffect } from 'react'

import { FormField } from 'sanity'
// import { TextInput } from 'sanity'
import {Stack, Flex, Text, TextInput} from '@sanity/ui'
import { PatchEvent, set, unset } from 'sanity'

const VideoPlayer = (props) => {
  // Hier können Sie auf die Dokument-ID oder andere Felder zugreifen
  const { 
    title, // title of the field
    description, // description of the field
    type, // all information about schema type
    value, // ciurrent value
    readOnly, // boolean if field should be read only
    placeholder, // placeholder text
    markers, // validation information
    presence, // wich editors are active
    compareValue, // check if this was edited recently 
    onFocus, // currently beeing focust by the user
    onBlur, // we neet to have a blur event happend
    onChange // own custom function to change the value
    } = props
    
    console.log('props: ', props)

    

    const [inputValue, setInputValue] = useState(value);
    const [urlIsAvailable, setUrlIsAvailable] = useState();

    const handleChange = async (event) => {
        // Update Sanity Value 
        const nextValue = event.currentTarget.value;
        setInputValue(nextValue);
        onChange(nextValue ? set(nextValue) : unset());
      
        // Überprüfen Sie die Verfügbarkeit der URL, bevor Sie das Video aktualisieren
        const isUrlAvailable = await checkUrlAvailability(`https://geschmaecker-sind-verschieden.de/video-api/${nextValue}.mp4`);
        
        if (isUrlAvailable) {
          // Hier können Sie Ihre Logik für das Aktualisieren der Videoquelle hinzufügen
          updateVideoSource(nextValue);
        } else {
          console.error('Die URL ist nicht erreichbar.');
          // Hier können Sie weitere Maßnahmen ergreifen, wenn die URL nicht erreichbar ist
        }
    };

    const checkUrlAvailability = async (url) => {
        if(!url) {
            console.log('value is empty')
            // setUrlIsAvailable(false)
            return false
        }
        try {
          const response = await fetch(value, { method: 'HEAD' });
          if (response.ok) {
            setUrlIsAvailable(true)
            console.log('URL is available');
            return true; // Die URL ist erreichbar
          } else {
            setUrlIsAvailable(false)
            console.log('URL is not available');
            return false; // Die URL ist nicht erreichbar
          }
        } catch (error) {
          console.error('Fehler beim Überprüfen der URL-Verfügbarkeit:', error);
          return false; // Fehler beim Überprüfen der URL
        }
    };
    // fire use EFfect one time
    useEffect(() => {
        checkUrlAvailability(value)
    }, [])
    

    const updateVideoSource = (newVideoId) => {
        const videoElement = document.getElementById('video-prev'); // Ersetzen Sie 'yourVideoElementId' durch die tatsächliche ID Ihres Videoelements
        // const videoElement2 = document.getElementById('video-prev2'); // Ersetzen Sie 'yourVideoElementId' durch die tatsächliche ID Ihres Videoelements
        if (videoElement) {
          videoElement.src = `https://geschmaecker-sind-verschieden.de/video-api/${newVideoId}`;
          videoElement.load(); // Laden Sie das Video neu
          
        //   videoElement2.src = `https://geschmaecker-sind-verschieden.de/video-api/${newVideoId}`;
        //   videoElement2.load(); // Laden Sie das Video neu
        }
    };

    /**
     * Styles
     */
    const errorStyle = {
        color: 'rgb(155 0 55)',
        padding: '8px 10px 6px 0px',
        margin: '0px',
    }

    return (
        // Ihre Video-Komponente
        <div>
            <div>{title}</div>
            {
                urlIsAvailable ?
                <video id={'video-prev'} controls poster={`https://geschmaecker-sind-verschieden.de/video-api/${value}-thumbnail.png`}>
                    <source src={`https://geschmaecker-sind-verschieden.de/video-api/${value}.mp4`} type="video/mp4" />
                </video>
                : 
                <div>
                    <p style={errorStyle}>URL is not available or empty</p>
                    {/* <video id={'video-prev'} controls poster={`https://geschmaecker-sind-verschieden.de/video-api/${value}-thumbnail.png`}>
                        <source src={`https://geschmaecker-sind-verschieden.de/video-api/${value}.mp4`} type="video/mp4" />
                    </video> */}
                </div>
            }
            <TextInput 
                value={inputValue}
                readOnly={readOnly}
                placeholder={placeholder}
                onFocus={onFocus}
                onBlur={onBlur} 
                onChange={handleChange}
            />
        </div>
    );
};

// export default withDocument(VideoPreview);
export default VideoPlayer