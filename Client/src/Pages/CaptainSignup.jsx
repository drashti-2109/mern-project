import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../Context/captainContext";
import axios from "axios";
import { toast } from 'react-toastify'

const CaptainSignup = () => {
    const [users, setUsers] = useState({
        fullname : {
            firstname : "",
            lastname : ""
        },
        email : "",
        password : "",
        vehicle : {
            color : "",
            plate : "",
            capacity : "",
            vehicleType : ""
        }
    })

    const navigate = useNavigate()
    const { setCaptain } = useContext(CaptainDataContext)

    const handleChange = (event) => {
        const { name, value } = event.target

        if(name === "firstname" || name === "lastname"){
            setUsers((prev) => ({
                ...prev,
                fullname : {
                    ...prev.fullname,
                    [name]: value
                }

            }))
        } else if(name === "color" || name === "plate" || name === "capacity" || name === "vehicleType"){
            setUsers((prev) => ({
                ...prev,
                vehicle : {
                    ...prev.vehicle,
                    [name]: value
                }
            }))
        } else {
            setUsers((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const newCaptain = {
            fullname : {
                firstname : users.fullname.firstname,
                lastname : users.fullname.lastname
            },
            email : users.email,
            password : users.password,
            vehicle : {
                color : users.vehicle.color,
                plate : users.vehicle.plate,
                capacity : users.vehicle.capacity,
                vehicleType : users.vehicle.vehicleType
            }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captain/register`, newCaptain)
        
            if(response.status === 200){
                const data = response.data

                setCaptain(data.captain)
                localStorage.setItem('captain', JSON.stringify(data.captain))

                localStorage.setItem('captainToken', data.token)

                toast.success("Registered successfully")
                navigate('/captain-home')
            }

        } catch (error) {
            const errorMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Register failed. Please try again.';

            toast.error(errorMessage)
        }    
        
        setUsers({ fullname : { firstname : "", lastname : "" }, email : "", password : "", vehicle : { color : "", plate : "", capacity : "", vehicleType : "" }})
    }

    return (
        <div className="p-7 h-screen flex flex-col justify-between"> 
            <div>
                <img className="w-18 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png" alt="Uber logo" />
                <form onSubmit={handleSubmit}>
                    <h3 className="text-lg mb-2 font-semibold"> What's your name </h3>
                    <div className="flex gap-3 mb-5">
                        <input
                            type="text"
                            placeholder="Firstname"
                            name="firstname"
                            value={users.fullname.firstname}
                            onChange={handleChange}
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:border-2 focus:border-black"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Lastname"
                            name="lastname"
                            value={users.fullname.lastname}
                            onChange={handleChange}
                            className="bg-[#eeeeee] w-1/2 rounded px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:border-2 focus:border-black"
                            required
                        />  
                    </div>

                    <h3 className="text-lg mb-2 font-semibold"> What's your email </h3>
                    <input
                        type="email"
                        placeholder="email@example.com"
                        name="email"
                        value={users.email}
                        onChange={handleChange}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:border-2 focus:border-black"
                        required
                    />  

                    <h3 className="text-lg mb-2 font-semibold"> Enter Password </h3>
                    <input
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                        value={users.password}
                        onChange={handleChange}
                        className="bg-[#eeeeee] mb-5 rounded px-4 py-2 w-full text-lg placeholder-gray-400 focus:outline-none focus:border-2 focus:border-black"
                        required
                    />   

                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-7'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Color'
                            name="color"
                            value={users.vehicle.color}
                            onChange={handleChange}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                            type="text"
                            placeholder='Vehicle Plate'
                            name="plate"
                            value={users.vehicle.plate}
                            onChange={handleChange}
                        />
                    </div>
                    
                    <div className='flex gap-4 mb-7'>
                    <input
                        required
                        className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        type="number"
                        placeholder='Vehicle Capacity'
                        name="capacity"
                        value={users.vehicle.capacity}
                        onChange={handleChange}
                    />
                    
                    <select
                        required
                        className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
                        name="vehicleType"
                        value={users.vehicle.vehicleType}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select Vehicle Type</option>
                        <option value="car">Car</option>
                        <option value="auto">Auto</option>
                        <option value="moto">Moto</option>
                    </select>
                    </div>

                    <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg"> Signup </button>
                </form>
                    
                <p className="text-center text-sm"> Already have an account?  <NavLink to="/captain-login" className="text-blue-600 cursor-pointer"> Login here </NavLink> </p>
            </div> 

            <p className="text-[11px] leading-tight mb-4"> By proceeding, you consent to get calls, WhatsApp or SMS, including by automated means, from Uber and its affiliates to the email provided. </p>   
        </div>
    )
}

export default CaptainSignup