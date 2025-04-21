import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"
import { BsChevronCompactDown } from 'react-icons/bs'
import { ImLocation2 } from "react-icons/im";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { toast } from "react-toastify";

const ConfirmRidePopUp = ({ ride, setConfirmRidePopUp, setRidePopUpPanel }) => {
    const [otp, setOtp] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ride/start-ride`, {
            params : {
                rideId : ride._id,
                otp : otp
            },
            headers : {
                Authorization : `Bearer ${localStorage.getItem('captainToken')}`
            }
        })
    
        if(response.status === 200){
            setConfirmRidePopUp(false)
            setRidePopUpPanel(false)
            navigate('/captain-riding', { state : { ride : ride }})
        }

        toast.success("Ride started")
    }

    return (
        <div>
            <div onClick={() => setConfirmRidePopUp(false)} className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"> <BsChevronCompactDown className="text-3xl text-gray-300 cursor-pointer"/> </div>
            <h3 className='text-2xl font-semibold mb-3'> Confirm ride to start </h3>

            <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className="h-12 rounded-full object-cover w-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBZPudyJZuo7XRY9_1H2mMWbxTt4YrMDKSw&s" alt="User Image" />
                    <h2 className="text-lg font-medium capitalize"> {ride?.user.fullname.firstname} {ride?.user.fullname.lastname} </h2>
                </div>
                
                <h5 className="text-lg font-semibold"> 2.2 KM </h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <ImLocation2 className="text-lg" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {ride?.start} </p>
                        </div>
                    </div>
                          
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <RiMapPinUserFill className="text-lg"/>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {ride?.end} </p>
                        </div>
                    </div>
                                
                    <div className='flex items-center gap-5 p-3'>
                        <TbCashRegister className="text-lg" />
                        <div>
                            <h3 className='text-lg font-medium'>${ride?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div> 

                <div className="mt-5 w-full">
                    <form onSubmit={handleSubmit}>
                        <input value={otp} onChange={(e) => setOtp(e.target.value)} type="text" className="bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-3" placeholder="Enter OTP" />
    
                        <button className='w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg cursor-pointer'> Confirm </button>
    
                        <button onClick={() => [ setConfirmRidePopUp(false), setRidePopUpPanel(false) ] } className='w-full mt-2 bg-red-500 text-white font-semibold p-2 rounded-lg cursor-pointer'> Cancel </button>
                    </form>
                </div>
            </div>
        </div>          
    )
}

export default ConfirmRidePopUp