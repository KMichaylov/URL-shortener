import {Button, Container, Group, Text, Title} from '@mantine/core';
import classes from './ErrorPage.module.css';

type ErrorProps = {
    code: string;
};

function ErrorPage({code}: ErrorProps) {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>{code}</div>
            <Title className={classes.title}>You have found a secret place.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Unfortunately, this is only a {code} page. You may have mistyped the address, or the page has
                been moved to another URL.
            </Text>
            <Group justify="center">
                <Button variant="subtle" size="md">
                    Take me back to home page
                </Button>
            </Group>
        </Container>
    );
}

export default ErrorPage;
