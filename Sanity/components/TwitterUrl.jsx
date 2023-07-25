import React from 'react'
import { FormField } from 'sanity'
import { TextInput } from 'sanity'
import { PatchEvent, set, unset } from 'sanity'

const TwitterUrl = React.forwardRef((props, ref) => {
    const { 
        type,
        value,
        readOnly,
        placeholder,
        markers,
        presence,
        compareValue,
        onFocus,
        onBlur,
        onChange
    } = props


    const handleChange = React.useCallback(
        event => {
            const inputValue = event.currentTarget.value
            props.onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
        },
        [props.onChange]
    )


    return (
        <>
            <h2>Twitter URL H2</h2>
            <FormField
                description={type.description}
                title={type.title}
                compareValue={compareValue}
                __unstable_markers={markers}
                __unstable_presence={presence}
            >
                <TextInput 
                    value={value}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    onFocus={onFocus}
                    onBlur={onBlur} 
                    onChange={handleChange}
                />
            </FormField>
        </>
        // <h1>Hello World</h1>
    )
})

export default TwitterUrl