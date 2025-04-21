import React, { useContext, useEffect, useRef, useState } from "react";
import axios from 'axios'
import { NavLink } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import CaptainDetails from "../Components/CaptainDetails";
import RidePopUp from "../Components/RidePopUp";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from "../Components/ConfirmRidePopUp";

import { SocketContext } from "../Context/socketContext";
import { CaptainDataContext } from "../Context/captainContext";

const CaptainHome = () => {
    const [ridePopUpPanel, setRidePopUpPanel] = useState(false)
    const [confirmRidePopUp, setConfirmRidePopUp] = useState(false)
    const [ride, setRide] = useState(null)

    const ridePopUpPanelRef = useRef(null)
    const confirmRidePopUpRef = useRef(null)

    useGSAP(() => {
        if(ridePopUpPanel){
            gsap.to(ridePopUpPanelRef.current, {
                transform : 'translateY(0)'
            })
        } else {
            gsap.to(ridePopUpPanelRef.current, {
                transform : 'translateY(180%)'
            })
        }
    }, [ridePopUpPanel])

    useGSAP(() => {
        if(confirmRidePopUp){
            gsap.to(confirmRidePopUpRef.current, {
                transform : 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopUpRef.current, {
                transform : 'translateY(180%)'
            })
        }
    }, [confirmRidePopUp])

    const { socket } = useContext(SocketContext)
    const { captain } = useContext(CaptainDataContext)

    useEffect(() => {
        if(captain){
            socket.emit('join', { userType : "captain", userId : captain._id })
            
            const updateLocation = () => {
                if(navigator.geolocation){
                    navigator.geolocation.getCurrentPosition(position => {
                        // console.log({ 
                        //     userId : captain._id, 
                        //     location : {
                        //         ltd : position.coords.latitude,
                        //         lng : position.coords.longitude
                        //     }})
                            
                        socket.emit('/update-captain-location', { 
                            userId : captain._id, 
                            location : {
                                ltd : position.coords.latitude,
                                lng : position.coords.longitude
                            }
                        })
                    })
                }
            }
            
            const locationInterval = setInterval(updateLocation, 10000)
            updateLocation()
        }
                
    }, [captain])

    socket.on('new-ride', (data) => {
        setRide(data)
        setRidePopUpPanel(true)
    })

    const confirmRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ride/confirm`, {
            rideId : ride._id,
            captainId : captain._id
        }, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('captainToken')}`
            }
        })

        setRidePopUpPanel(false)
        setConfirmRidePopUp(true)
    }

    return (
        <div className="h-screen relative">
            <img className="w-18 absolute left-8 top-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png" alt="Uber logo" />
            <NavLink to='/captain-logout' className='fixed z-1 right-4 top-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <LuLogOut />
            </NavLink>

            <div className="h-3/5">
                <img className="h-full w-full object-cover" src="https://camo.githubusercontent.com/e0debd25d05c84be78d89bf7a2858c65e3cfecd72e95bd22ec50e85fa1f84cfb/68747470733a2f2f322e62702e626c6f6773706f742e636f6d2f2d574f70483738393364526b2f5733527372626f476678492f41414141414141414356552f767a6b39683975526262415777485633366a5455644b4f555552795946322d6167434c63424741732f73313630302f73637265656e73686f74362e706e67" alt="Uber map image"/>
            </div>

            <div className="h-2/5 items p-4">
                <CaptainDetails />
            </div>

            <div ref={ridePopUpPanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-9">
                <RidePopUp confirmRide={confirmRide} ride={ride} setRidePopUpPanel={setRidePopUpPanel} setConfirmRidePopUp={setConfirmRidePopUp} />
            </div>

            <div ref={confirmRidePopUpRef} className="fixed w-full h-screen z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-9">
                <ConfirmRidePopUp ride={ride} setConfirmRidePopUp={setConfirmRidePopUp} setRidePopUpPanel={setRidePopUpPanel} />
            </div>
        </div>
    )
}

export default CaptainHome