import {Button, Container, Group, Text, Title} from '@mantine/core';
import classes from './ErrorPage.module.css';
import {useLocation, useNavigate} from 'react-router';

function ErrorPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const {title, message} = location.state || {
        title: "Page not found",
        message: "Something went wrong, couldn't find this page. Please try again."
    };

    return (
        <Container className={classes.root}>
            <div className={classes.label}>Oops</div>
            <Title className={classes.title}>{title}</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                {message}
            </Text>
            <Group justify="center">
                <Button variant="subtle" size="md" onClick={() => navigate("/main")}>
                    Go Back
                </Button>
            </Group>
        </Container>
    );
}

export default ErrorPage;
