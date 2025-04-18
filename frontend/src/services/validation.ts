import {isEmail, isNotEmpty, matches} from "@mantine/form";

/**
 * A module configuration used for validation purposes for the registration and login forms.
 */

export const validateEmail = (value: string) => {
    if (isNotEmpty()(value)) return 'This field cannot be empty';
    if (isEmail('Invalid email format')(value)) return 'Invalid email format';
    return null;
};

export const validatePassword = (value: string) => {
    if (isNotEmpty()(value)) return 'This field cannot be empty';
    if (
        matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+~\-={}[\]:;"'<>,.?/]{10,}$/)(value)
    ) {
        return 'Password must be at least 10 characters, include uppercase, lowercase, and a number.';
    }
    return null;
};

export const validateUsername = (value: string) => {
    if (isNotEmpty()(value)) return 'This field cannot be empty';
    if (matches(/^[A-Za-z' ]+$/)(value)) {
        return "Username must contain only letters and apostrophes.";
    }
    return null;
};