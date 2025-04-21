import React, { useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { LuLogOut } from "react-icons/lu"
import { BsChevronCompactUp } from 'react-icons/bs'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FinishRide from "../Components/FinishRide"
import LiveTracking from "../Components/LiveTracking";

const CaptainRiding = () => {
    const [finishRide, setFinishRide] = useState(false)
    const finishRideRef = useRef(null)
    
    const location = useLocation()
    const rideData = location.state?.ride

    useGSAP(() => {
        if(finishRide){
            gsap.to(finishRideRef.current, {
                transform : 'translateY(0)'
            })
        } else {
            gsap.to(finishRideRef.current, {
                transform : 'translateY(180%)'
            })
        }
    }, [finishRide])

    return (
        <div className="h-screen relative flex flex-col justify-end">
            <div className="fixed z-[500] p-3 top-0 flex pt-6 pl-80 items-center justify-between w-screen">
                <img className="w-18 absolute left-8 top-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png" alt="Uber logo" />
                <NavLink to='/captain-home' className='fixed z-1 right-4 top-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                    <LuLogOut />
                </NavLink>
            </div>

            <div className="h-screen w-screen fixed">
                <LiveTracking />
            </div>

            <div onClick={() => setFinishRide(true)} className="h-1/5 p-6 flex items-center justify-between relative bg-yellow-400">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50"> <BsChevronCompactUp className="text-3xl cursor-pointer"/> </div>
                <h4 className="text-xl font-semibold mt-7"> 4 KM away </h4>
                <button className='bg-green-600 ml-13 mt-8 text-white font-semibold p-3 px-8 rounded-lg cursor-pointer'> Complete Ride </button>
            </div>

            <div ref={finishRideRef} className="fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-4 pt-9">
                <FinishRide rideData={rideData} setFinishRide={setFinishRide} />
            </div>
        </div>    
    )
}

export default CaptainRiding