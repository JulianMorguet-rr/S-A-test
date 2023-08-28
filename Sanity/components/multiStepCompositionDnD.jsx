import React, { useState, useEffect } from 'react'
import { FormField } from 'sanity'
// import { TextInput } from 'sanity'
import {Stack, Flex, Text, TextInput} from '@sanity/ui'
import { PatchEvent, set, unset } from 'sanity'

import {createClient} from "@sanity/client";
const client = createClient({
    projectId: 'tz4j4rda',
    dataset: 'production',
    apiVersion: 'v2021-03-25', // use current UTC date - see "specifying API version"!
    useCdn: true // `false` if you want to ensure fresh data
  })


export const multiStepCompositionDnD = (props) => {
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

    /**
     * TEST FETCHING REFERENCES
     */
    // const getReferences = 'Test'

    console.log('client: ', client)

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

    // let referenceDataJSON = ''
    // const getReferences = async (document, options) => {
    //     const query = '*[_type == "page"]';
    //     // const params = { ref: document.category._ref };
    //     const cattitle = client.fetch(query).then(data => {
    //         // console.log("fetched", data);
    //         return data;
    //     });
    //     await cattitle;
    //     referenceData = cattitle
    //     console.log(referenceData)
    //     return cattitle;
    // }
    // getReferences()

    /**
     * END TEST FETCHING REFERENCES 
     */

    const twitterURL = 'https://twitter.com/'
    let initialValueForPath = ''
    // Cannot read properties of undefined (reading 'replace')
    const setInitialValueForPath = () => {
        if (value) {
            initialValueForPath = value.replace(twitterURL, '')
        }
    }
    setInitialValueForPath()
    const [inputValue, setInputValue] = useState(initialValueForPath);

    const handleChange = (event) => {
        const nextValue =  event.currentTarget.value
        setInputValue(event.target.value);
        onChange(nextValue ? set(twitterURL + event.target.value) : unset())
    }

    const twitterBaseURLStyle = {
        color: 'rgb(92 135 246)',
        padding: '8px 10px 6px 0px',
        margin: '0px',
    }

    return (
        <>
            <h1>Test fetching Reference</h1>
            <div>
                Reference: 
                { 
                    referenceData.map((ref, index) => (
                        <div key={index}><p>{JSON.stringify(ref)}</p></div>
                    )) 
                }
            </div>
            <hr></hr>
            <h2>{ title }</h2>
            <p>{ description }</p>
            <p>inputValue: { inputValue }</p>
            {/* <Flex>
                <p style={twitterBaseURLStyle}>{ twitterURL }</p>
                <Stack
                    space={2}
                    compareValue={compareValue}
                    __unstable_markers={markers}
                    __unstable_presence={presence}
                >
                    <TextInput 
                        value={inputValue}
                        readOnly={readOnly}
                        placeholder={placeholder}
                        onFocus={onFocus}
                        onBlur={onBlur} 
                        onChange={handleChange}
                    />
                </Stack>
            </Flex> */}
            <p>Value: { value }</p>
        </>
        // <h1>Hello World</h1>
    )
}

// export default TwitterUrl