import React, { useEffect, useState, useCallback, useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
    containerStyle ?:{},
}
interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = ({ name, icon,containerStyle = {}, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const inputElementRef = useRef<any>(null);
    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);
    const handleInputBluer = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }));
    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            },
        })
    })

    return (
        <Container style={containerStyle} isFocused={isFocused} isErrored={!!error}>
            <Icon
                name={icon}
                size={20}
                color={isFocused || isFilled ? '#ff9000' : '#666360'} />
            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                defaultValue={defaultValue}
                onFocus={handleInputFocus}
                onBlur={handleInputBluer}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
        </Container>
    );
    ;
}


export default forwardRef(Input);