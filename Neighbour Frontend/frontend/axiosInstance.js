import axios from "axios";
const instance= axios.create({
    baseURL: "http://localhost:5001",
    timeout:5000,
    
}) 



instance.interceptors.request.use(
    async (config)=>{
        try{
            const accessToken="24234324324324";
            console.log("yeh mera token",accessToken)
            config.headers.Authorization=`Bearer${accessToken}`;
            return config;

        }
        catch(error){
console.error("Request Error:", error)
        }
    }

)
instance.interceptors.response.use(
    (response)=>{
        console.log("Response data:",response.data);
        return response;
    },
    (error)=>{

console.error("Response data:",error);
        if(error.response.status === 401){
            console.log("(Unauthorized error,Redirecting to login...)")
        }
    }
);

export default instance;