import {Text, Title, Image} from "@mantine/core";
import CustomInput from "../../components/input/CustomInput.tsx";
import CustomButton from "../../components/button/CustomButton.tsx";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import CopyButton from "../../components/button/CopyButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./ShortenedUrlPage.module.css"
import api from "../../api/apiConfiguration.ts";
import ErrorPage from "../ErrorPage/ErrorPage.tsx";

function ShortenedUrlPage() {

    const [shortenUrl, setShortenUrl] = useState("")
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const originalUrl = location.state?.originalUrl || "Unknown URL";
    const shortenedUrl = location.state?.shortenUrl || "No value";
    useEffect(() => {
        api.get("urls/clicks", {params: {url: originalUrl}})
            .then(() => setShortenUrl(shortenedUrl))
            .catch(() => setHasError(true));
    }, []);


    const handleButtonCountClick = () => {
        navigate("/shorted-url/clicks", {state: {shortUrl: shortenedUrl}})
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
                    <CustomInput placeholder={"Enter URL"} name={"url-input"} value={shortenedUrl}/>
                    <CopyButton shortenedValue={shortenedUrl}/>
                </div>
                {/*TODO: add functionality*/}
                <div className={styles["url-info"]}>
                    <Text className={styles["original-text"]}><b>Original URL:</b> {originalUrl}</Text>
                    <Image
                        radius="md"
                        height={150}
                        width="auto"
                        fit="contain"
                        src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
                    />
                    <CustomButton placeholder={"Total number of clicks"} onClick={handleButtonCountClick}/>
                    <CustomButton placeholder={"Go back"} onClick={handleBackButtonClick}/>
                    <CustomFooter/>

                </div>
            </div>
        </div>
    );
}

export default ShortenedUrlPage