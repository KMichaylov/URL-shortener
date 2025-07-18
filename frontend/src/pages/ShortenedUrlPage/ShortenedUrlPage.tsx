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
import QRCode from "react-qr-code";

function ShortenedUrlPage() {

    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const originalUrl = location.state?.originalUrl || "Unknown URL";
    const shortenedUrl = location.state?.shortenUrl || "No value";
    useEffect(() => {
        api.get("urls/clicks", {params: {url: originalUrl}})
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
                <div className={styles["url-info"]}>
                    <Text className={styles["original-text"]}><b>Original URL:</b> {originalUrl}</Text>
                    <QRCode size={150}
                            style={{height: 150, maxWidth: "100%", width: "auto"}}
                            value={originalUrl}
                            viewBox={`0 0 256 256`}/>
                    <CustomButton placeholder={"Total number of clicks"} onClick={handleButtonCountClick}/>
                    <CustomButton placeholder={"Go back"} onClick={handleBackButtonClick}/>
                    <CustomFooter/>

                </div>
            </div>
        </div>
    );
}

export default ShortenedUrlPage