import React, { useState } from 'react'
import { FormField } from 'sanity'
// import { TextInput } from 'sanity'
import {Stack, Flex, Text, TextInput} from '@sanity/ui'
import { PatchEvent, set, unset } from 'sanity'

export const TwitterUrl = (props) => {
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
            <h2>{ title }</h2>
            <p>{ description }</p>
            <p>inputValue: { inputValue }</p>
            <Flex>
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
            </Flex>
            <p>Value: { value }</p>
        </>
        // <h1>Hello World</h1>
    )
}

// export default TwitterUrl