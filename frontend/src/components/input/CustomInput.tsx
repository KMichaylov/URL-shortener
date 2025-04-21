import {Input, MantineProvider} from "@mantine/core";
import React from "react";

type CustomInputProps = {
    name?: string,
    label?: string,
    error?: string,
    description?: string,
    placeholder?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    value: string,
    className?: string

};


const CustomInput: React.FC<CustomInputProps> = ({
                                                     name,
                                                     label,
                                                     error,
                                                     description,
                                                     placeholder,
                                                     onChange,
                                                     value,
                                                     className
                                                 }) => {
    return (<MantineProvider>
        <Input.Wrapper
            size="md"
            label={label}
            withAsterisk
            description={description}
            error={error}
            className={className}
        >
            <Input size="md" name={name} onChange={onChange} placeholder={placeholder}
                   value={value}/>
        </Input.Wrapper>
    </MantineProvider>)
}

export default CustomInput