import './App.css'
import CustomForm from "./components/form/CustomForm.tsx";
import {Flex, MantineProvider} from "@mantine/core";

function App() {

    return (
        <MantineProvider>
            <div className="wrapper">
                <div className="wrapper-registration">
                    <CustomForm
                        isLogin={true}
                    />
                </div>
                <Flex justify="space-between" gap="xl">
                    <span className="account-options">Forgot the password?</span>
                    <span className="account-options">Create an account</span>
                </Flex>
            </div>
        </MantineProvider>
    )
}

export default App
