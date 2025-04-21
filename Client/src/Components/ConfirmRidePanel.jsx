import React from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { ImLocation2 } from "react-icons/im";
import { RiMapPinUserFill } from "react-icons/ri";
import { TbCashRegister } from "react-icons/tb";

const vehicleImages = {
    car : "https://img.freepik.com/free-photo/view-3d-car_23-2150796896.jpg?ga=GA1.1.540963043.1743943015&semt=ais_hybrid&w=740",
    moto : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
}

const ConfirmRidePanel = ({ setConfirmRidePanel, setVehicleFound, createRide, trip, fare, vehicleType }) => {
    return (
        <div>
            <div onClick={() => setConfirmRidePanel(false)} className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"> <BsChevronCompactDown className="text-3xl text-gray-300 cursor-pointer"/> </div>
            <h3 className='text-2xl font-semibold mb-3'>Confirm your Ride</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <img className='h-30 pt-4' src={vehicleImages[vehicleType]} alt={`${vehicleType} image`} />
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <ImLocation2 className="text-lg" />
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {trip.start} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <RiMapPinUserFill className="text-lg"/>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'> {trip.end} </p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <TbCashRegister className="text-lg" />
                        <div>
                            <h3 className='text-lg font-medium'>${fare[vehicleType]}</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
                    </div>
                </div>
                <button onClick={() => [ setVehicleFound(true), setConfirmRidePanel(false), createRide() ]} className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg cursor-pointer'>Confirm</button>
            </div>
        </div>
    )
}

export default ConfirmRidePanel