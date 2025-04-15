import {Container, MantineProvider, Text, Title} from "@mantine/core";
import CustomButton from "../../components/button/CustomButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./AnalyticsPage.module.css"
import {useState} from "react";
import {Location, useLocation, useNavigate} from "react-router";

function AnalyticsPage() {
    const [value, setValue] = useState("")
    const navigate: Location = useNavigate();
    const location: Location = useLocation();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleButtonClick = () => {
        if (!value) {
            // TODO: Add a message here
            return;
        }

    }

    return (
        <div className={styles["wrapper-main"]}>
            <Title order={2}>Total URL clicks!</Title>
            <Text>The number of clicks from the shortened URL that redirected the user to the destination
                page.</Text>
            <Container className={styles["wrapper-info"]}>
                <Text className={styles["square-box-url"]}>shortUrl</Text>
                <Text className={styles["square-box-number"]}>0</Text>
                <CustomButton className={styles["custom-button"]}
                              placeholder={"Go Back"} onClick={handleButtonClick}/>
                <CustomButton className={styles["custom-button"]}
                              placeholder={"Shorten another URL"} onClick={handleButtonClick}/>
            </Container>
            <CustomFooter/>
        </div>
    );
}

export default AnalyticsPage