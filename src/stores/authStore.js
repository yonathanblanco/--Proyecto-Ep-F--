import {defineStore} from "pinia"
import { ref } from "vue"


export const useAuthStore = defineStore("auth",()=>{
    let token = ref("")
    let user = ref(null)

    function setToken(newToken){
        token.value=newToken
        if(newToken!=""){
            token.value=newToken
            console.log(token);
            
        }else{
            console.log("No esta llegando el token ", token);
        } 
    }

    function getToken(){
        return token.value 
    }

    return{
        setToken, getToken, token
    }
},
{persist:true}
)