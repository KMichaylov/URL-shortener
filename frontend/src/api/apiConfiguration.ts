import axios, {AxiosInstance} from 'axios'

const BASE_URL: string = 'http://localhost:8080/api';

const axiosObject: AxiosInstance = axios.create({
    baseURL: BASE_URL
})

axiosObject.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

export default axiosObject

