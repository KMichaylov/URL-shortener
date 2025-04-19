import styles from './ResetPasswordPage.module.css'
import {useNavigate} from "react-router";
import React, {FormEvent, useState} from "react";
import CustomButton from "../../components/button/CustomButton.tsx";
import {Container, PasswordInput, Title} from "@mantine/core";
import {Errors} from "../../types/Errors.ts";
import {ResetPasswordForm} from "../../types/ResetPasswordForm.ts";
import {createHandleChange} from "../../utils/formHelper.ts";
import {validatePassword, validatePasswordConfirmation} from "../../services/validation.ts";


const validatePasswordData = (passwordData: ResetPasswordForm) => {
    const newErrors: Errors = {}

    const passwordError: string | null = validatePassword(passwordData.password)
    if (passwordError) newErrors.password = passwordError

    const confirmPasswordError: string | null = validatePasswordConfirmation(passwordData.password, passwordData.confirmPassword)
    if (confirmPasswordError) newErrors.confirmPassword = confirmPasswordError

    return newErrors
}

function ResetPasswordPage() {

    const navigate = useNavigate()
    const [passwordData, setPasswordData] = useState<ResetPasswordForm>({
        password: '',
        confirmPassword: ''
    })
    const [errors, setErrors] = useState<Errors>({})
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        const validationErrors = validatePasswordData(passwordData)
        setErrors(validationErrors)
        if (Object.keys(validationErrors).length === 0) {
            navigate('/');
        }
    }

    const handleChange = createHandleChange<ResetPasswordForm>(setPasswordData)

    return (
        <div className={styles["wrapper"]}>
            <Container className={styles["items-container"]}>
                <Title>Reset Password</Title>
                <form onSubmit={handleSubmit}>
                    <PasswordInput placeholder={"Enter new password"}
                                   label="Password"
                                   radius="md"
                                   size="md"
                                   value={passwordData.password}
                                   error={errors.password}
                                   required
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.currentTarget.value)}/>
                    <PasswordInput placeholder={"Retype new password"}
                                   label="Confirmation Password"
                                   radius="md"
                                   size="md"
                                   value={passwordData.confirmPassword}
                                   error={errors.confirmPassword}
                                   required
                                   onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange("password", e.currentTarget.value)}/>
                    <CustomButton radius="md"
                                  size="md"
                                  type="submit"
                                  style={{width: '100%'}} onClick={handleSubmit} placeholder={'Submit'}/>
                </form>
            </Container>
        </div>
    )
}

export default ResetPasswordPage
