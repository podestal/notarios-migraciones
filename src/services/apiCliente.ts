import axios from "axios"

const URL = import.meta.env.VITE_API_URL


const axiosInstance = axios.create({
    baseURL: URL,
    withCredentials: true,
})

class APIClient<ResponseType> {
    endpoint: string

    constructor( endpoint: string) {
        this.endpoint = endpoint
    }
    
    get = (params?: Record<string, string>) => {

        const config: any = {}
        if (params) {
            config.params = params
        }
        // if (access) {
        //     config.headers = { ...config.headers, Authorization: `JWT ${access}` };
        // }
    
        return axiosInstance
            .get<ResponseType>(this.endpoint, config)
            .then(res => res.data);
    }
}

export default APIClient