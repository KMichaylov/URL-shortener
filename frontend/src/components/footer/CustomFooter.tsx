import {Container, Text} from '@mantine/core';
import classes from "./CustomFooter.module.css"
import {SiAlamy} from "react-icons/si";


function CustomFooter() {
    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <SiAlamy size={50}/>
                <Text c="dimmed" size="sm">© 2025 kris.dev. All rights reserved.</Text>
            </Container>
        </div>
    );
}

export default CustomFooter