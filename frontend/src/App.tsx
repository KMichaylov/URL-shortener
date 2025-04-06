import './App.css'
import CustomForm from "./components/CustomForm.tsx";
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
                <Flex>
                    <span>Forgot the password?</span>
                    <span>Create an account</span>
                </Flex>
            </div>
        </MantineProvider>
    )
}

export default App
