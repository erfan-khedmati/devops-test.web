import axios from "axios";

const API_BASE_URL = 'http://localhost:4200/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": 'application/json'
    }
})

export const usersApi = {
    getUsers: ()=> api.get('/users')
}

export const healthCheck = ()=> api.get("/health")

export default api;