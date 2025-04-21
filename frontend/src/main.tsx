import {createRoot} from 'react-dom/client'
import './index.css'
import '@mantine/core/styles.css';
import App from './App.tsx'
import {createBrowserRouter, RouterProvider} from "react-router";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.tsx";
import MainPage from "./pages/MainPage/MainPage.tsx";
import ShortenedUrlPage from "./pages/ShortenedUrlPage/ShortenedUrlPage.tsx";
import AnalyticsPage from "./pages/AnalyticsPage/AnalyticsPage.tsx";
import {MantineProvider} from "@mantine/core";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import ForgottenPasswordPage from "./pages/ForgottenPasswordPage/ForgottenPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage.tsx";

const router = createBrowserRouter([
    {
        path: "/", element: <App/>
    },
    {
        path: "/registration", element: <RegistrationPage/>
    },
    {
        path: "/main", element: <MainPage/>
    },
    {
        path: "/shorted-url", element: <ShortenedUrlPage/>
    },
    {
        path: "/shorted-url/clicks", element: <AnalyticsPage/>
    },
    {
        path: "/forgotten-password", element: <ForgottenPasswordPage/>
    },
    {
        path: "/reset-password", element: <ResetPasswordPage/>
    },
    {
        path: "*", element: <ErrorPage />
    }
])
createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <RouterProvider router={router}/>
    </MantineProvider>
)
