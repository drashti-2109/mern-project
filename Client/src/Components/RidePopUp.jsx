import React from "react";
import { BsChevronCompactDown } from 'react-icons/bs'
import { ImLocation2 } from "react-icons/im";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";

const RidePopUp = ({ confirmRide, ride, setRidePopUpPanel, setConfirmRidePopUp }) => {
    return (
        <div>
            <div onClick={() => setRidePopUpPanel(false)} className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"> <BsChevronCompactDown className="text-3xl text-gray-300 cursor-pointer"/> </div>
            <h3 className='text-2xl font-semibold mb-3'> New Ride Avaliable! </h3>

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

                <div className="flex mt-4 w-full items-center justify-between">
                    <button onClick={() => {
                        setConfirmRidePopUp(true)
                        confirmRide()    
                    }} className='bg-green-600 ml-13 text-white font-semibold p-3 px-8 rounded-lg cursor-pointer'> Accept </button>

                    <button onClick={() => setRidePopUpPanel(false)} className='bg-gray-300 mr-13 text-gray-700 font-semibold p-3 px-8 rounded-lg cursor-pointer'> Ignore </button>
                </div>
                
            </div>
        </div>        
    )
}

export default RidePopUp