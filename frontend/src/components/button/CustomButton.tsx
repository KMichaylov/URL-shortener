import {Button, MantineStyleProp} from "@mantine/core";
import React from "react";

type CustomButtonProps = {
    placeholder: string,
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    radius?: string
    size?: string
    type?: "button" | "submit" | "reset" | undefined
    style?: MantineStyleProp
}

const CustomButton: React.FC<CustomButtonProps> = ({placeholder, onClick, className, radius, size, type, style}) => {
    return (
        <Button className={className} size={size} radius={radius} type={type} style={style}
                onClick={onClick}>{placeholder}</Button>
    )

}

export default CustomButton