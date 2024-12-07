import Cookies from "js-cookie";
import axios, { AxiosResponse, type InternalAxiosRequestConfig } from "axios";
import config from "@/config";

export const API_URL = config.env === "staging" ? config.apiUrlStaging : config.apiUrl;
export const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";


const ApiClient = axios.create({
    baseURL: API_URL,
    headers:{
      Accept:'application/json',

    }
});

ApiClient.interceptors.request.use((config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const accessToken = Cookies.get('token'); // Get the token from cookies each time a request is made
    if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return config;
});

ApiClient.interceptors.response.use((config) => {
    // if (config.status === 401) {
    //     refreshAccessToken().then(() => {
    //         config.request.headers.set("Authorization", `Bearer ${getAccessToken()}`);
    //     });
    // }
    return config;
});

type ApiResponse<T> = AxiosResponse<T>;

export type { ApiResponse };

export default ApiClient;
