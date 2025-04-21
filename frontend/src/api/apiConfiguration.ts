import axios from 'axios'
const BASE_URL: string = 'http://localhost:8080/api';

export default axios.create({
    baseURL: BASE_URL
})