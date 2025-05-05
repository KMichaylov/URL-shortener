import {useState, FormEvent} from 'react';
import {
    TextInput,
    Center,
    Text, PasswordInput,
} from '@mantine/core';
import styles from './CustomForm.module.css';
import CustomButton from '../button/CustomButton.tsx';
import {useNavigate} from 'react-router';
import {validateEmail, validatePassword, validateUsername} from '../../services/validation.ts';
import {createHandleChange} from "../../utils/formHelper.ts";
import {Errors} from "../../types/Errors.ts";
import {FormValues} from "../../types/FormValues.ts";
import baseUrl from "../../api/apiConfiguration.ts";

type CustomFormProps = {
    isLogin: boolean;
};

const validateForm = (values: FormValues, isLogin: boolean): Errors => {
    const newErrors: Errors = {};

    const emailError = validateEmail(values.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(values.password);
    if (passwordError) newErrors.password = passwordError;

    if (!isLogin) {
        const usernameError = validateUsername(values.username);
        if (usernameError) newErrors.username = usernameError;
    }

    return newErrors;
};

const CustomForm: React.FC<CustomFormProps> = ({isLogin}) => {
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: '',
        username: '',
    });

    const handleChange = createHandleChange<FormValues>(setFormValues)
    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(formValues, isLogin);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            const endpoint = isLogin ? '/users/login' : '/users/registration';
            const payload = isLogin
                ? {
                    email: formValues.email,
                    password: formValues.password,
                }
                : {
                    email: formValues.email,
                    password: formValues.password,
                    username: formValues.username,
                };

            baseUrl
                .post(endpoint, payload)
                .then((response) => {
                    const responseData = response.data as string;
                    const token = responseData
                        .replace(/^Bearer\s/, '')
                        .replace(/^User registered successfully! Token:\s/, '');

                    localStorage.setItem('jwtToken', token);
                    navigate('/main');
                })
                .catch((error) => {
                    console.error("An error occurred in the process", error);
                    alert("An error occurred. Please check your credentials or try again later.");
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Center>
                <Text size="xl" style={{textAlign: 'center'}}>
                    Welcome!
                </Text>
            </Center>

            <TextInput
                id="email"
                radius="md"
                size="md"
                placeholder="Enter email"
                label="Email"
                value={formValues.email}
                onChange={(e) => handleChange('email', e.currentTarget.value)}
                error={errors.email}
                required
                className={styles['input-field']}
            />

            {!isLogin && (
                <TextInput
                    id="username"
                    radius="md"
                    size="md"
                    label="Username"
                    placeholder="Enter username"
                    value={formValues.username}
                    onChange={(e) => handleChange('username', e.currentTarget.value)}
                    error={errors.username}
                    required
                    className={styles['input-field']}
                />
            )}

            <PasswordInput
                size="md"
                radius="md"
                label="Password"
                withAsterisk
                placeholder="Enter password"
                value={formValues.password}
                onChange={(e) => handleChange('password', e.currentTarget.value)}
                error={errors.password}
                required
                className={styles['input-field']}
            />

            <CustomButton
                radius="md"
                size="md"
                type="submit"
                style={{width: '100%'}}
                placeholder={isLogin ? 'Log In' : 'Sign Up'}
            />
        </form>
    );
};

export default CustomForm;
