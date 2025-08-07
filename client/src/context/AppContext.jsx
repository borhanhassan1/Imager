/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';

export const AppContext=createContext();

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);
    const [showLogin,setShowLogin] = useState(false);
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState(localStorage.getItem('token'));
    const [credit,setCredit] = useState(false);
    const navigate=useNavigate();
    const loadCreditsData=async ()=>{
        try{
            const {data} = await axios.get(backendUrl+'/api/user/credit',{headers:{token}});
            if(data.status){
                setCredit(data.credit);
                setUser(data.user);
            }
        }catch(err){
            console.log(err);
            toast.error(err.message);
        }
    }

    const generateImage=async (prompt)=>{
        try{
           const {data} = await axios.post(backendUrl+'/api/image/generate-image',{prompt},
                {headers:{token}});
            if(data.status){
                loadCreditsData();
                return data.resultImage;
            }else{
                toast.error(data.message);
                loadCreditsData();
                if(data.creditBalance===0){
                    navigate('/buy');
                }
            }
        }catch(err){
            toast.error(err);
        }
    }

    const logout=()=>{
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    }
    const checkout=async (plan)=>{
        const {data}=await axios.post(backendUrl+'/api/stripe/checkout',{plan},{headers:{token}});
         window.location.href = data.url;
    }

    useEffect(()=>{
        if(token){
            loadCreditsData();
        }
    },[token])

    const value={
        user,setUser,showLogin,setShowLogin,
        backendUrl,setToken,credit,setCredit,
        loadCreditsData,logout,generateImage,checkout
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

} 
 
export default AppContextProvider;
