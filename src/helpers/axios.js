import axios from "axios";
import {api} from "../urlConfig";
import store from "../store";
import {authConstants} from "../action/constants";


const axiosInstance = axios.create({
        baseURL: api,
        headers: {
            'Authorization':localStorage.getItem('token') ? `Bearer ${localStorage.getItem('token')}`:'',
        }
    }
)

axiosInstance.interceptors.request.use((req)=>{
    const {auth} = store.getState();
    if(auth.token){
        req.headers.Authorization = `Bearer ${auth.token}`;
    }
    return req;
})

axiosInstance.interceptors.response.use((res)=>{
    return res;
},error => {
    console.log(error.response);
    const status = error.message ? error.response.status : 500;
    if (status && status===500){
        localStorage.clear()
        store.dispatch({type:authConstants.LOGOUT_SUCCESS})
    }
    return Promise.reject(error);
})

export default axiosInstance;
