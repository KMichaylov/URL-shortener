import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, createBrowserRouter, RouterProvider} from "react-router";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";

const router = createBrowserRouter([
    {
        path: "/", element: <App/>
    },
    {
        path: "/registration", element: <RegistrationPage/>
    },
    {
        path: "/main", element: <MainPage/>
    }
])
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <RouterProvider router={router}/>
    </BrowserRouter>,
)
