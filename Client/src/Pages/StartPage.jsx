import React from "react";
import { NavLink } from "react-router-dom"

const StartPage = () => {
    return (
        <div className="relative h-screen w-full bg-white pt-8 flex flex-col justify-between">
            <img 
                src="https://img.freepik.com/premium-vector/auto-location-icon-car-position-pin-symbol-navigation-map-sign-car-rent-leasing-illustration_1231005-442.jpg" 
                alt="Map location pin" 
                className="absolute inset-0 w-full h-full object-contain object-center z-0" 
            />

            <img 
                className="w-18 ml-8 z-10" 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png" 
                alt="Uber logo" 
            />

            <div className="bg-white px-4 z-10">
                <h2 className="text-2xl pb-3 py-2 font-bold">Get Started with Uber</h2>
                <NavLink 
                    to="/login" 
                    className="w-full bg-black text-white py-3 mb-4 rounded mt-4 flex justify-center items-center cursor-pointer"
                > 
                    Continue 
                </NavLink>
            </div>
        </div>
    )
}

export default StartPage