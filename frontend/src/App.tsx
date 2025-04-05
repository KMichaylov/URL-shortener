import './App.css'
import CustomForm from "./components/CustomForm.tsx";

function App() {

    return (
        <>
            <div className="wrapper">
                <div className="wrapper-registration">
                    <CustomForm
                        isLogin={true}
                    />
                </div>
                <span>Forgot the password?</span>
                <span>Create an account</span>

            </div>
        </>
    )
}

export default App
