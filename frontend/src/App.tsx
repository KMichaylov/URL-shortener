import './App.css'
import CustomForm from "./components/form/CustomForm.tsx";
import {Flex, MantineProvider} from "@mantine/core";
import {useNavigate} from "react-router";

function App() {

    const navigate = useNavigate()
    return (
        <MantineProvider>
            <div className="wrapper">
                <div className="wrapper-registration">
                    <CustomForm
                        isLogin={true}
                    />
                </div>
                <Flex justify="space-between" gap="xl">
                    {/*TODO: Later add the password reset functionality*/}
                    <span className="account-options">Forgot the password?</span>
                    <span className="account-options" onClick={() => navigate("/registration")}>Create an account</span>
                </Flex>
            </div>
        </MantineProvider>
    )
}

export default App
