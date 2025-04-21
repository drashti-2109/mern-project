import React from "react";
import { BsChevronCompactDown } from "react-icons/bs";
import { BiSolidUser } from "react-icons/bi";

const VehicleOpen = ({ selectVehicle, fare, setVehiclePanel, setConfirmRidePanel }) => {
    return (
        <div>
            <div onClick={() => setVehiclePanel(false)} className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"> <BsChevronCompactDown className="text-3xl text-gray-300 cursor-pointer"/> </div>
            
            <h3 className="text-2xl font-semibold mb-3"> Choose a Vehicle </h3>
                    
            <div onClick={() => {
                    setConfirmRidePanel(true)
                    selectVehicle('car')
                }} 
                className="flex border-2 border-gray-300 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer">
                
                <img className="h-14" src="https://img.freepik.com/free-photo/view-3d-car_23-2150796896.jpg?ga=GA1.1.540963043.1743943015&semt=ais_hybrid&w=740" alt="Car image" />
                
                <div className="w-1/2 pl-2">
                    <h4 className="font-medium text-base flex items-center"> UberGo <span className="text-base mx-1 pl-2"> <BiSolidUser /> </span> 4 </h4>
                    <h5 className="font-medium text-sm"> 2 mins away </h5>
                    <p className="font-normal text-xs text-gray-600"> Affordable, Compact rides  </p>
                </div>
                
                <h2 className="text-xl font-semibold">${fare.car}</h2>
            </div>
                    
            <div onClick={() => {
                    setConfirmRidePanel(true)
                    selectVehicle('moto')    
                }} 
                className="flex border-2 border-gray-300 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer">
                
                <img className="h-13" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="Motorcycle image" />
                
                <div className="w-1/2 -ml-2 pl-4">
                    <h4 className="font-medium text-base flex items-center"> Moto <span className="text-base mx-1 pl-2"> <BiSolidUser /> </span> 1 </h4>
                    <h5 className="font-medium text-sm"> 3 mins away </h5>
                    <p className="font-normal text-xs text-gray-600"> Affordable, Motocycles rides  </p>
                </div>
                
                <h2 className="text-xl font-semibold">${fare.moto}</h2>
            </div>
                
            <div onClick={() => {
                    setConfirmRidePanel(true) 
                    selectVehicle('auto')
                }}
                className="flex border-2 border-gray-300 active:border-black mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer">
                
                <img className="h-13" src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="Auto image" />
                
                <div className="w-1/2 pl-2">
                    <h4 className="font-medium text-base flex items-center"> UberAuto <span className="text-base mx-1 pl-2"> <BiSolidUser /> </span> 3 </h4>
                    <h5 className="font-medium text-sm"> 3 mins away </h5>
                    <p className="font-normal text-xs text-gray-600"> Affordable, Auto rides  </p>
                </div>
                
                <h2 className="text-xl font-semibold">${fare.auto}</h2>
            </div>
        </div>
    )
}

export default VehicleOpen