// If I want to use TypeScript I can use the following end of filename ".tsx":

import React from 'react';

import {useCallback, useState, useEffect} from 'react'
import {Stack, Flex, Box, Text, TextInput, TextArea} from '@sanity/ui'
import {set, unset} from 'sanity'

export const metaDescriptionInput = (props) => {
  const {elementProps, onChange, value = ''} = props

  // Count Words 
  const [wordsInTotal, setWordsInTotal] = useState(0)

  useEffect(() => {
    if(value === '') return setWordsInTotal(0); // Reset wordsInTotal if value is empty
    setWordsInTotal(value.trim().split(" ").length); // Calculate wordsInTotal on initial render
  }, [value]);

  const handleChange = useCallback((event) => {
    // Set the value to the current value of the input field
    const nextValue = event.currentTarget.value
    onChange(nextValue ? set(nextValue) : unset())

    // Set the wordsInTotal
    console.log('value', value)
    console.log('value.split(" ").length', value.split(" ").length)
    setWordsInTotal(nextValue.trim().split(" ").length)
    
	}, [onChange])

  let [showAdditionalInfo, setShowAdditionalInfo] = useState(false)

  const maxZeichenInTextauszug = 80

  // Styles 
  const cardStyle = {
    color: 'rgb(4 126 132)',
    padding: '12px 12px',
    margin: '0px',
    border: '2px solid rgb(4 126 132)',
    borderRadius: '4px',
    background: 'rgb(4 126 132 / 0.1)',
  }

  const warnung = {
    color: 'rgb(255 0 0)',
  }

  return (
    <>
      <Stack space={2} style={cardStyle}>
        {/* <h2>
        {elementProps.map((prop, i) => (
          <span key={i}>{prop}</span>
        ))}
        </h2> */}
        
        <Flex>
          <Box flex={1}>
            <TextArea 
              {...elementProps}
              onChange={handleChange}
              value={value}
            />
          </Box>
          {/* <button onClick={() => console.log('elementProps', elementProps)}>
            log elementProps
          </button> */}
          <button onClick={() => setShowAdditionalInfo(showAdditionalInfo = !showAdditionalInfo)}>
            { showAdditionalInfo ? 'Hide' : 'Show' } Info
          </button>
          {/* <p>showAdditionalInfo: { JSON.stringify(showAdditionalInfo) }</p> */}
          
        </Flex>
        {/* Warning */}
        {/* Additional Infos */}
        {showAdditionalInfo ? (
            <Stack>
            <Text>Characters inkl. space: {value.trim().length}</Text>
            <br></br>
            <Text>Words: {wordsInTotal}</Text>
            </Stack>
          ) : null}

        {/* Warnung */}
        {
        value.trim().length > maxZeichenInTextauszug ? 
        (<div>
        <p style={warnung}><b>Warnung!</b></p>
        <p style={warnung}>Der Textauszug enthält mehr Zeichen, als im Frontend ausgegeben werden</p>
        </div>) 
        : null 
        }
      </Stack>
    </>
  )
}
