import {Button, MantineProvider} from "@mantine/core";
import React from "react";

type CustomButtonProps = {
    placeholder: string,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({placeholder, onClick, className}) => {
    return (<MantineProvider>
        <Button className={className} variant="light" color="cyan" size="md" radius="md"
                onClick={onClick}>{placeholder}</Button>
    </MantineProvider>)

}

export default CustomButton