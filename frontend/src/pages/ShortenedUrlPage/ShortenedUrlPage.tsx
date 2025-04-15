import {MantineProvider, Text, Title} from "@mantine/core";
import CustomInput from "../../components/search/CustomInput.tsx";
import CustomButton from "../../components/button/CustomButton.tsx";
import {useState} from "react";
import {Location, useLocation, useNavigate} from "react-router";
import ButtonCopy from "../../components/button/CopyButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./ShortenedUrlPage.module.css"


function ShortenedUrlPage() {

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
            <div className={styles["title"]}>
                <Title order={2}>Your shortened URL!</Title>
                <Text>Copy the short link and share it in messages with friends.</Text>
            </div>
            <div className={styles["wrapper-urlbox"]}>
                <div className={styles["input-button-row"]}>
                    <CustomInput placeholder={"Enter URL"} name={"url-input"} value={value}
                                 onChange={handleInputChange}/>
                    <ButtonCopy shortenedValue={handleInputChange}/>
                </div>
                <div className={styles["url-info"]}>
                    <Text className={styles["original-text"]}>Original URL: ...</Text>
                    <CustomButton placeholder={"Total number of clicks"} onClick={handleButtonClick}/>
                    <CustomButton placeholder={"Go back"} onClick={handleButtonClick}/>
                    <CustomFooter/>
                </div>
            </div>
        </div>
    );
}

export default ShortenedUrlPage