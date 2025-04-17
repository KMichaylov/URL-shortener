import {useState, FormEvent} from 'react';
import {
    TextInput,
    Button,
    Center,
    Text
} from '@mantine/core';
import styles from "./CustomForm.module.css"

type CustomFormProps = {
    isLogin: boolean;
};

type Errors = {
    email?: string;
    password?: string;
    username?: string;
};

const CustomForm: React.FC<CustomFormProps> = ({isLogin}) => {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
        username: '',
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (name: string, value: string) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const newErrors: Errors = {};

        if (!formValues.email) newErrors.email = 'Email is required';
        if (!formValues.password) newErrors.password = 'Password is required';
        if (!isLogin && !formValues.username) newErrors.username = 'Username is required';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log(formValues);
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
                className={styles["input-field"]}
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
                    className={styles["input-field"]}
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
                className={styles["input-field"]}
            />

            <Button
                radius="md"
                size="md"
                type="submit"
                style={{width: '100%'}}
            >
                {isLogin ? 'Log In' : 'Sign Up'}
            </Button>
        </form>
    );
};

export default CustomForm;
