import styles from './ForgottenPasswordPage.module.css'
import {useNavigate} from "react-router";
import CustomInput from "../../components/search/CustomInput.tsx";
import React, {useState} from "react";
import CustomButton from "../../components/button/CustomButton.tsx";
import {Container, Title} from "@mantine/core";

function ForgottenPasswordPage() {

    const navigate = useNavigate()
    const [email, setEmail] = useState<string>("");

    // TODO: Add link for resetting the password
    return (
        <div className={styles["wrapper"]}>
            <Container className={styles["items-container"]}>
                <Title>Forgot Password</Title>
                <CustomInput placeholder={"Enter email address"} value={email}
                             onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}/>
                <CustomButton  radius="md"
                               size="md"
                               type="submit"
                               style={{width: '100%'}} placeholder={'Reset Password'}/>
            </Container>
        </div>
    )
}

export default ForgottenPasswordPage
