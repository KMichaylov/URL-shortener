import {Container, MantineProvider, Title, Text} from "@mantine/core";
import CustomInput from "../../components/search/CustomInput.tsx";
import CustomButton from "../../components/button/CustomButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./MainPage.module.css"
import {useState} from "react";
import {Location, useLocation, useNavigate} from "react-router";

function MainPage() {

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
    console.log(styles)
    return (<MantineProvider>
        <div className={styles["wrapper-main"]}>
            <Container>
                <Title order={1}>Short URL</Title>
            </Container>

            <div className={styles["wrapper-urlbox"]}>
                <Title order={2}>Paste the URL you want to shorten</Title>
                <div className={styles["input-button-row"]}>
                    <div className={styles["input"]}>
                        <CustomInput
                            placeholder={"Enter your link here"}
                            name={"url-input"}
                            value={value}
                            onChange={handleInputChange}
                            className={"input-field"}
                        />
                    </div>
                    <CustomButton
                        placeholder={"Shorten URL"}
                        onClick={handleButtonClick}
                    />
                </div>
                <Text size="sm">
                    This is a free tool to shorten URLs and generate short links.
                    URL shortener allows you to create a shortened link making it easy to share.
                </Text>
            </div>

            <div className={styles["wrapper-information"]}>
                <Title order={2}>Shorten, share and analyse</Title>
                <Text size="md">
                    Your shortened URLs can be used in various locations without taking much space.
                    See how many times your link has been clicked using the click counter!
                </Text>
            </div>

            <CustomFooter/>
        </div>
    </MantineProvider>)
}

export default MainPage