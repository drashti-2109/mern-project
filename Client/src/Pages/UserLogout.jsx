import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const UserLogout = () => {
    const token = localStorage.getItem('userToken')
    const navigate = useNavigate()

    axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/logout`, {
        headers: {
            Authorization : `Bearer ${token}`
        }
    }).then((response) => { 

        if(response.status === 200){
            localStorage.removeItem('userToken')
            
            navigate('/login')
        }
    })

    return (
        <div> UserLogout </div>
    )
}

export default UserLogout