import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const CaptainLogout = () => {
    const token = localStorage.getItem('captainToken')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/logout`, {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then((response) => { 

        if(response.status === 200){
            localStorage.removeItem('captainToken')
            localStorage.removeItem('captain')
            
            navigate('/captain-login')
        }
    })

    return (
        <div> CaptainLogout </div>
    )
}

export default CaptainLogout