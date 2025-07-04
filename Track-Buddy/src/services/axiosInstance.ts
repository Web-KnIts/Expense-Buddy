import axios from 'axios'
import {BASE_URL} from './apiPath';


const axiosInstance = axios.create({
    baseURL:BASE_URL,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json"
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if(accessToken)
        {
            if (config.headers) {
                config.headers.Authorization = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response)=>{
        return response;
    },
    (error)=>{
        console.log(error)
        if(error.message)
        {
            if(error.response.status === 401){
                window.location.href = '/login'
            }
            else if(error.response.status === 500)
            {
                console.log("Server error, Please try again later")
            }
        } else if(error.code === "ECONNABORTED")
        {
            console.error("Request timeout. Please try again.");
        }
        return Promise.reject(error);
    }
)

export default axiosInstance;