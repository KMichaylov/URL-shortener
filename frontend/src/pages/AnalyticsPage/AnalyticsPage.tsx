import {Container, Text, Title} from "@mantine/core";
import CustomButton from "../../components/button/CustomButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./AnalyticsPage.module.css"
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router";
import api from "../../api/apiConfiguration.ts";
import ErrorPage from "../ErrorPage/ErrorPage.tsx";

function AnalyticsPage() {
    const [numberOfClick, setNumberOfClicks] = useState<number>(0)
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();
    const locator = useLocation()
    const shortUrl = locator.state?.shortUrl || "Unknown URL";


    useEffect(() => {
        api.get("/clicks")
            .then((res) => setNumberOfClicks(res.data))
            .catch(() => setHasError(true));
    }, [])

    const handleBackButtonClick = () => {
        navigate(-1)
    }

    const handleShortenButtonClick = () => {
        navigate("/main")
    }

    if (hasError) return <ErrorPage/>

    return (
        <div className={styles["wrapper-main"]}>
            <Title order={2}>Total URL clicks!</Title>
            <Text>The number of clicks from the shortened URL that redirected the user to the destination
                page.</Text>
            <Container className={styles["wrapper-info"]}>
                <Text className={styles["square-box-url"]}>{shortUrl}</Text>
                <Text className={styles["square-box-number"]}>{numberOfClick}</Text>
                <CustomButton className={styles["custom-button"]}
                              placeholder={"Go Back"} onClick={handleBackButtonClick}/>
                <CustomButton className={styles["custom-button"]}
                              placeholder={"Shorten another URL"} onClick={handleShortenButtonClick}/>
            </Container>
            <CustomFooter/>
        </div>
    );
}

export default AnalyticsPage