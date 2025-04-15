import {MantineProvider} from "@mantine/core";
import CustomForm from "../../components/form/CustomForm.tsx";

function RegistrationPage() {

    return (
        <div className="wrapper">
            <div className="wrapper-registration">
                <CustomForm
                    isLogin={false}
                />
            </div>
        </div>
    )
}

export default RegistrationPage
