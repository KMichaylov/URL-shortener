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
        path: "shorted-url/clicks", element: <AnalyticsPage/>
    },
])
createRoot(document.getElementById('root')!).render(
    <MantineProvider>
        <RouterProvider router={router}/>
    </MantineProvider>
)
