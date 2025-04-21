import React, { useContext } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/userContext";
import { toast } from "react-toastify"
import axios from "axios";

const UserLogin = () => {
    const [users, setUsers] = useState({
        email : "",
        password : ""
    })

    const navigate = useNavigate()
    const { setUser } = useContext(UserDataContext)

    const handleChange = (event) => {
        const { name, value } = event.target
        
        setUsers((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
    
        const newUser = {
            email : users.email,
            password : users.password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, newUser)
            
            if(response.status === 200){
                const data = response.data

                setUser(data.user)
                localStorage.setItem('userToken', data.token)

                toast.success('Login successfully');
                navigate('/home')
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Login failed. Please try again.';
    
            toast.error(errorMessage);
        }

        setUsers({ email : "", password : "" })
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between"> 
            <div>
                <img className="w-18 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png" alt="Uber logo" />
                <form onSubmit={handleSubmit}>
                    <h3 className="text-xl mb-2 font-semibold"> What's your email </h3>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        name="email"
                        value={users.email}
                        onChange={handleChange}
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:border-2 focus:border-black"
                        required
                    />  

                    <h3 className="text-xl mb-2 font-semibold"> Enter Password </h3>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={users.password}
                        onChange={handleChange}
                        className="bg-[#eeeeee] mb-7 rounded px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:border-2 focus:border-black"
                        required
                    />   

                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg cursor-pointer"> Login </button>
                </form>
                    
                <p className="text-center text-sm"> New here?  <NavLink to="/signup" className="text-blue-600 cursor-pointer"> Create new Account </NavLink> </p>
            </div> 

            <div>
                <NavLink to='/captain-login' className="bg-[#10b461] text-white font-semibold rounded px-4 py-2 w-full text-lg flex align-center justify-center"> Sign in as Captain </NavLink>
            </div>   
        </div>
    )
}

export default UserLogin