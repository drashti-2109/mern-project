import React, { useContext } from "react";
import { CaptainDataContext } from '../Context/captainContext'

import { TbBrandSpeedtest } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { RiBookletLine } from "react-icons/ri";

const CaptainDetails = () => {
    const { captain } = useContext(CaptainDataContext)
    
    return (
        <div>
            <div className="flex items-center justify-between">
                <div className="flex items-center justify-start gap-3">
                    <img className="w-10 h-10 rounded-full object-cover" src="https://img.freepik.com/free-photo/front-view-smiley-woman-with-earbuds_23-2148613052.jpg" alt="User Image" />
                    <h4 className="text-lg font-medium capitalize"> {captain?.fullname?.firstname} {captain?.fullname?.lastname} </h4>
                </div>
            
                <div>
                    <h4 className="text-xl font-semibold"> $295.20 </h4>
                    <p className="text-medium text-gray-500"> Earned </p>
                </div>

            </div>
            
            <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-5">
                <div className="text-center">
                    <IoMdTime className="text-2xl font-thin ml-7 mb-1" />
                    <h5 className="text-lg font-medium"> 10.2 </h5>
                    <p className="text-sm text-gray-600"> Hours Online </p>
                </div>
        
                <div className="text-center">
                    <TbBrandSpeedtest className="text-2xl font-thin ml-7 mb-1" />
                    <h5 className="text-lg font-medium"> 10.2 </h5>
                    <p className="text-sm text-gray-600"> Hours Online </p>
                </div>
    
                <div className="text-center">
                    <RiBookletLine className="text-2xl font-thin ml-7 mb-1" />
                    <h5 className="text-lg font-medium"> 10.2 </h5>
                    <p className="text-sm text-gray-600"> Hours Online </p>
                </div>
            </div>            
        </div>
    )
}

export default CaptainDetails