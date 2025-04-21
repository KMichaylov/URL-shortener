import {Text, Title} from "@mantine/core";
import CustomInput from "../../components/input/CustomInput.tsx";
import CustomButton from "../../components/button/CustomButton.tsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import ButtonCopy from "../../components/button/CopyButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./ShortenedUrlPage.module.css"
import api from "../../api/apiConfiguration.ts";
import ErrorPage from "../ErrorPage/ErrorPage.tsx";

function ShortenedUrlPage() {

    const [value, setValue] = useState("")
    const navigate = useNavigate();

    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get("/clicks")
            .then((res) => setValue(res.data))
            .catch(() => setHasError(true));
    }, []);


    const handleButtonCountClick = () => {
        navigate("/shorted-url/clicks")
    }

    const handleBackButtonClick = () => {
        navigate("/main")
    }

    if (hasError) return <ErrorPage/>;
    return (
        <div className={styles["wrapper-main"]}>
            <div className={styles["title"]}>
                <Title order={2}>Your shortened URL!</Title>
                <Text>Copy the short link and share it in messages with friends.</Text>
            </div>
            <div className={styles["wrapper-urlbox"]}>
                <div className={styles["input-button-row"]}>
                    <CustomInput placeholder={"Enter URL"} name={"url-input"} value={value}/>
                    <ButtonCopy shortenedValue={value}/>
                </div>
                <div className={styles["url-info"]}>
                    <Text className={styles["original-text"]}>Original URL: ...</Text>
                    <CustomButton placeholder={"Total number of clicks"} onClick={handleButtonCountClick}/>
                    <CustomButton placeholder={"Go back"} onClick={handleBackButtonClick}/>
                    <CustomFooter/>
                </div>
            </div>
        </div>
    );
}

export default ShortenedUrlPage