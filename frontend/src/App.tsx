import './App.css'

function App() {

    return (
        <>
            <div className="wrapper">
                <div className="wrapper-registration">
                    <CustomForm
                        fields={loginConfig}
                        onSubmit={handleFormSubmit}
                        buttonConfig={buttonConfig}
                        initialValues={{email: '', password: ''}}
                    />
                    <span>Don't have an account? <Link to="/register">Register here</Link></span>
                </div>
            </div>
        </>
    )
}

export default App
