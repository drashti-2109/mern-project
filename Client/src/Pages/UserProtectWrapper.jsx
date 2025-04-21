import React, { useEffect, useContext } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/userContext";

const UserProtectWrapper = ({children}) => {
    const token = localStorage.getItem('userToken')
    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!token){
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            if (response.status === 200) {
                setUser(response.data)
            }
        })

    }, [token])
    
    return (
        <>
            {children} 
        </>
    )    
}

export default UserProtectWrapper