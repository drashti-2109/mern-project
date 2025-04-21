import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CaptainProtectWrapper = ({children}) => {
    const token = localStorage.getItem('captainToken')

    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/captain-login')
        }
    }, [token])
    
    return (
        <>
            {children} 
        </>
    )    
}

export default CaptainProtectWrapper