import axios from "axios";
import React from "react";
import { BsChevronCompactDown } from 'react-icons/bs'
import { ImLocation2 } from "react-icons/im";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const FinishRide = ({ rideData, setFinishRide }) => {
    const navigate = useNavigate()

    const endRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ride/end-ride`, {
            rideId : rideData._id
        }, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('captainToken')}`
            }
        })

        if(response.status === 200){
            navigate('/captain-home')
        }
    }

    return (
        <div>
            <div onClick={() => setFinishRide(false)} className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"> <BsChevronCompactDown className="text-3xl text-gray-300 cursor-pointer"/> </div>
            <h3 className='text-2xl font-semibold mb-3'> Finish this ride </h3>

            <div className="flex items-center justify-between p-3 bg-yellow-300 rounded-lg mt-4">
                <div className="flex items-center gap-3">
                    <img className="h-12 rounded-full object-cover w-12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXBZPudyJZuo7XRY9_1H2mMWbxTt4YrMDKSw&s" alt="User Image" />
                    <h2 className="text-lg font-medium capitalize"> {rideData?.user.fullname.firstname} {rideData?.user.fullname.lastname} </h2>
                </div>
                
                <h5 className="text-lg font-semibold"> 2.2 KM </h5>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <ImLocation2 className="text-lg" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {rideData?.start} </p>
                        </div>
                    </div>
                          
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <RiMapPinUserFill className="text-lg"/>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {rideData?.end} </p>
                        </div>
                    </div>
                                
                    <div className='flex items-center gap-5 p-3'>
                        <TbCashRegister className="text-lg" />
                        <div>
                            <h3 className='text-lg font-medium'>${rideData?.fare}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div> 

                <div className="mt-5 w-full">    
                    <button onClick={endRide} className='w-full flex justify-center mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg cursor-pointer'> Finish ride </button>
                    <p className="text-xs mt-6 text-center"> Click on finish ride button if you have completed the payment. </p>
                </div>
            </div>
        </div> 
    )
}

export default FinishRide