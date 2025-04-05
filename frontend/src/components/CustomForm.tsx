import {useState, FormEvent} from 'react';
import './CustomForm.css';
import {TextInput, PasswordInput, Button, Box} from '@mantine/core';

type CustomFormProps = {
    isLogin: boolean;
};

type Errors = {
    email?: string;
    password?: string;
    username?: string;
}

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
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '1rem'}}>
                    <TextInput
                        label="Email"
                        placeholder="Enter your email"
                        value={formValues.email}
                        onChange={(e) => handleChange('email', e.currentTarget.value)}
                        error={errors.email}
                        required
                    />
                </div>

                {!isLogin && (
                    <div style={{marginBottom: '1rem'}}>
                        <TextInput
                            label="Username"
                            placeholder="Choose a username"
                            value={formValues.username}
                            onChange={(e) => handleChange('username', e.currentTarget.value)}
                            error={errors.username}
                            required
                        />
                    </div>
                )}

                <div style={{marginBottom: '1rem'}}>
                    <PasswordInput
                        label="Password"
                        placeholder="Enter your password"
                        value={formValues.password}
                        onChange={(e) => handleChange('password', e.currentTarget.value)}
                        error={errors.password}
                        required
                    />
                </div>

                <Box>
                    <Button type="submit">{isLogin ? 'Login' : 'Signup'}</Button>
                </Box>
            </form>
        </div>
    );
};

export default CustomForm;
