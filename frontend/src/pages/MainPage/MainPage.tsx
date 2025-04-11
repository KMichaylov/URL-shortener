import {Container, MantineProvider, Title, Text} from "@mantine/core";
import CustomSearch from "../../components/search/CustomSearch.tsx";
import CustomButton from "../../components/button/CustomButton.tsx";
import CustomFooter from "../../components/footer/CustomFooter.tsx";

function MainPage() {

    return (<MantineProvider>
        <Title order={1}>Short URL</Title>
        <Container>
            <Title order={2}>Paste the URL you want to shorten</Title>
            <CustomSearch/>
            <CustomButton/>
        </Container>
        <Container>
            <Title order={2}>Shorten, share and analyse</Title>
            <Text size="md">Your shortened URLs can be used in various locations, without taking much space. See how
                many times your link has been clicked using the click counter!</Text>
        </Container>
        <CustomFooter></CustomFooter>
    </MantineProvider>)
}

export default MainPage