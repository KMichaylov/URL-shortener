import {Container, MantineProvider, Title, Text} from "@mantine/core";
import CustomInput from "../../components/input/CustomInput.tsx";
import CustomButton from "../../components/button/CustomButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";
import styles from "./MainPage.module.css";
import api from "../../api/apiConfiguration.ts";
import {useState} from "react";
import {useNavigate} from "react-router";

function MainPage() {
    const [url, setUrl] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUrl(event.target.value);
    };

    // TODO: Move this common behaviour into separate file
    const goToErrorPage = (title: string, message: string) => {
        navigate("/error", {
            state: {
                title,
                message
            }
        });
    };

    const shortenUrl = async () => {
        try {
            await api.post("/short-url", {originalUrl: url}, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            navigate("/shorted-url", {
                state: {
                    originalUrl: url
                }
            });
        } catch (error) {
            console.log(error)
            goToErrorPage(
                "You have found a secret place.",
                "Something went wrong when shortening the URL. Please check your link and try again!"
            );
        }
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (url.trim()) {
            shortenUrl();
        } else {
            goToErrorPage(
                "You have found a secret place.",
                "You have most probably misspelled the link or provided an empty link. Please go back to the main page and try again!"
            );
        }
    };


    return (
        <MantineProvider>
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
                                value={url}
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
        </MantineProvider>
    );
}

export default MainPage;
