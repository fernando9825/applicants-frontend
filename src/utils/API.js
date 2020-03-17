import axios from 'axios';
import LocalStorageService from "./../services/LocalStorageService";

const api = axios.create({
    baseURL: "http://localhost:8000/api/",
    responseType: "json"
});

api.interceptors.request.use(
    config => {

        console.log("REQUEST");
        const token = LocalStorageService.getAccessToken();

        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }

        config.headers['Content-Type'] = 'application/json';
        return config;
    },
    error => {
        Promise.reject(error)
    });

export default api;