import React, { useContext } from "react";
import { ImLocation2 } from "react-icons/im";
import { TbCashRegister } from "react-icons/tb";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { RiHome4Line } from "react-icons/ri";
import { SocketContext } from "../Context/socketContext";
import LiveTracking from "../Components/LiveTracking";

const vehicleImages = {
    car : "https://img.freepik.com/free-photo/view-3d-car_23-2150796896.jpg?ga=GA1.1.540963043.1743943015&semt=ais_hybrid&w=740",
    moto : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png",
    auto : "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
}

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {}    

    const navigate = useNavigate()
    const { socket } = useContext(SocketContext)

    socket.on('ride-ended', () => {
        navigate('/home')
    })

    return (
        <div className="h-screen relative flex flex-col justify-end">
            <NavLink to='/home' className='fixed right-4 z-[500] top-5 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <RiHome4Line />
            </NavLink>

            <div className="h-screen w-screen fixed top-0 left-0 z-0">
                <LiveTracking />
            </div>

            <div className="h-1/2 p-4 z-10 relative bg-white/90 backdrop-blur-md">
                <div className="flex items-center justify-between">
                    <img className='h-30 pt-4' src={vehicleImages[ride?.captain.vehicle.vehicleType]} alt={`${ride?.captain.vehicle.vehicleType} image`} />
                
                    <div className="text-right">
                        <h2 className="text-lg font-medium capitalize"> {ride?.captain.fullname.firstname} {ride?.captain.fullname.lastname} </h2>
                        <h4 className="text-xl font-semibold -mt-1 -mb-1"> {ride?.captain.vehicle.plate} </h4>
                        <p className="text-medium text-gray-600"> BMW A420 </p>
                    </div>
            </div>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='w-full mt-2'>
                    <div className='flex items-center gap-5 p-2 border-b-2 border-gray-300'>
                        <ImLocation2 className="text-lg" />
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
            </div>                
            
            <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg cursor-pointer'> Make a Payment </button>
            </div>
        </div>
    )
}

export default Riding