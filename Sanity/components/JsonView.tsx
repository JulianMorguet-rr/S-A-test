import React, {useCallback} from 'react'
import { Stack, Text, Card, TextInput, Code } from '@sanity/ui'
import { InputProps, PortableTextInput, PortableTextInputProps } from 'sanity'
import {set, unset} from 'sanity'

/**
 * Typed Input Props for Sanity
 * - Use syntax highlighting through Code
 */


export function JsonView(props: PortableTextInputProps) {
    // const {elementProps, onChange, value = ''} = props

    props.value ? console.log(props.value) : console.log('no value')

    // const handleChange = useCallback((event: any) => {
    //     if(!event.currentTarget || !event.currentTarget?.value) return
    //     const nextValue = event.currentTarget.value
    //     onChange(nextValue ? set(nextValue) : unset())
    //     }, [onChange])

    return (
        <Card padding={3} radius={2} shadow={1}>
            <Text>WAS GEHT?</Text>
            {/* <TextInput
                {...elementProps}
                onChange={handleChange}
                value={value}
            /> */}
            <PortableTextInput {...props} />
            {/* <Code language="json">{JSON.stringify(props.value)}</Code> */}
            {/* <Stack space={2}>
            <Text>Lorem Ipsum</Text>
            <TextInput
                {...elementProps}
                onChange={handleChange}
                value={value}
            />
            <Text>Output: { props.value ? JSON.stringify(props.value) : ''  }</Text>
            <Code language="json"></Code>
            </Stack> */}
        </Card>
    )
}


