import {useState, FormEvent} from 'react';
import {
    TextInput,
    Center,
    Text,
} from '@mantine/core';
import styles from './CustomForm.module.css';
import CustomButton from '../button/CustomButton.tsx';
import {useNavigate} from 'react-router';
import {validateEmail, validatePassword, validateUsername} from '../../services/validation.ts';

type CustomFormProps = {
    isLogin: boolean;
};

type FormValues = {
    email: string;
    password: string;
    username: string;
};

type Errors = {
    [key: string]: string | undefined;
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

    const [errors, setErrors] = useState<Errors>({});
    const navigate = useNavigate();

    const handleChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm(formValues, isLogin);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            navigate('/main');
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

            <TextInput
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
