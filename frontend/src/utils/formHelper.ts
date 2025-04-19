export const createHandleChange = <T>(setState: React.Dispatch<React.SetStateAction<T>>) => {
    return (name: keyof T, value: string) => {
        setState((prev) => ({
            ...prev,
            [name]: value
        }))
    }
};