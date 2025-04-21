import React, { useState, useRef, useContext, useEffect } from "react";
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom";

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { IoIosArrowDown } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";

import LocationSearchPanel from "../Components/LocationSearchPanel";
import VehicleOpen from "../Components/VehicleOpen";
import ConfirmRidePanel from "../Components/ConfirmRidePanel";
import LookingForDriver from "../Components/LookingForDriver";
import WaitingForDriver from "../Components/WaitingForDriver";
import LiveTracking from "../Components/LiveTracking";

import { SocketContext } from "../Context/socketContext";
import { UserDataContext } from "../Context/userContext";

const Home = () => {
    const [trip, setTrip] = useState({
        start : "",
        end : ""
    })

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)
    
    const [panelOpen, setPanelOpen] = useState(false)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const [vehicleFound, setVehicleFound] = useState(false)
    const [waitingForDriver, setWaitingForDriver] = useState(false)
    
    const [activeField, setActiveField] = useState(null)
    const [startSuggestions, setStartSuggestions] = useState([])
    const [endSuggestions, setEndSuggestions] = useState([])
    const [fare, setFare] = useState({})
    const [vehicleType, setVehicleType] = useState(null)
    const [ride, setRide] = useState(null)

    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    
    const navigate = useNavigate()

    socket.on('ride-confirmed', (ride) => {
        setVehiclePanel(false)
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', () => {
        setWaitingForDriver(false)
        navigate('/riding', {state : { ride }})
    })

    useGSAP(() => {
        if(panelOpen){
            gsap.to(panelRef.current, {
                height:'70%'
            })
            gsap.to(panelCloseRef.current, {
                opacity:'1'
            })
        } else {
            gsap.to(panelRef.current, {
                height:'0%'
            })   
            gsap.to(panelCloseRef.current, {
                opacity:'0'
            })     
        }
    }, [panelOpen])

    useGSAP(() => {
        if(vehiclePanel){
            gsap.to(vehiclePanelRef.current, {
                transform : "translateY(0)"
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform : "translateY(100%)"
            })
        }
    }, [vehiclePanel])

    useGSAP(() => {
        if(confirmRidePanel){
            gsap.to(confirmRidePanelRef.current, {
                transform : "translateY(0)"
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform : "translateY(100%)"
            })
        }
    }, [confirmRidePanel])

    useGSAP(() => {
        if(vehicleFound){
            gsap.to(vehicleFoundRef.current, {
                transform : "translateY(0)"
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform : "translateY(100%)"
            })
        }
    }, [vehicleFound])

    useGSAP(() => {
        if(waitingForDriver){
            gsap.to(waitingForDriverRef.current, {
                transform : "translateY(0)"
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform : "translateY(100%)"
            })
        }
    }, [waitingForDriver])

    const handleChange = async (event) => {
        const { name, value } = event.target

        setTrip((prev) => ({
            ...prev,
            [name]: value
        }))

        if (value.trim().length < 2) return;    

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/map/get-suggestions`, {
                params: { input : value },
                headers: {
                    Authorization : `Bearer ${localStorage.getItem('userToken')}`
                }
            })

            if(name === 'start'){
                setStartSuggestions(response.data)
            } else if (name === 'end'){
                setEndSuggestions(response.data)
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault()
    }

    const findTrip = async () => {
        setPanelOpen(false)
        setVehiclePanel(true)

        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/ride/get-fare`, {
            params : { start : trip.start, end : trip.end },
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        })

        setFare(response.data)
    }

    const createRide = async () => {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/ride/create`, {
            start : trip.start, 
            end : trip.end, 
            vehicleType
        }, {
            headers : {
                Authorization : `Bearer ${localStorage.getItem('userToken')}`
            }
        })
    }


    useEffect(() => {
        if (user?.users?._id) {
            socket.emit('join', { userType : "user", userId : user.users._id})
        }        
    }, [user])

    return (
        <div className="h-screen relative">
            <img className="w-18 z-1 absolute left-8 top-8" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1920px-Uber_logo_2018.svg.png" alt="Uber logo" />
            <NavLink to='/logout' className='fixed z-1 right-4 top-6 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <LuLogOut />
            </NavLink>
            
            <div className="absolute inset-0 z-0">
                <LiveTracking />
            </div>

            <div className="flex flex-col justify-end h-screen absolute top-0 w-full pointer-events-none">
                <div className="h-[30%] bg-white p-6 z-2 relative pointer-events-auto">
                    <div ref={panelCloseRef} onClick={() => setPanelOpen(false)} className="absolute opacity-0 right-7 top-7 text-2xl">
                        <IoIosArrowDown />
                    </div>
                    <h4 className="text-2xl font-semibold"> Find a trip </h4>
                    <form className="relative" onSubmit={handleSubmit}>
                        <div className="line absolute h-14 w-1 top-[34%] left-6 bg-gray-500 rounded-full"></div>
                        <input 
                            type="text" 
                            name="start"
                            placeholder="Add a start point" 
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5"
                            value={trip.start}
                            onChange={handleChange}
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('start')
                            }}
                        />     
                        <input 
                            type="text"
                            name="end" 
                            placeholder="Enter your end point" 
                            className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3" 
                            value={trip.end}
                            onChange={handleChange}
                            onClick={() => {
                                setPanelOpen(true)
                                setActiveField('end')
                            }}
                        />
                    </form>

                    <button onClick={findTrip} className="bg-black text-white px-4 py-2 rounded-lg mt-6 w-full cursor-pointer">
                        Find Trip
                    </button>
                </div>

                <div className="h-[0] bg-white pointer-events-auto" ref={panelRef}>
                    <LocationSearchPanel 
                        suggestions = {activeField === 'start' ? startSuggestions : endSuggestions }
                        setTrip={setTrip}
                        activeField={activeField}    
                    />
                </div>
            </div>

            {vehiclePanel && (                
            <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-9">
                <VehicleOpen selectVehicle={setVehicleType} fare={fare} setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div> )}

            {confirmRidePanel && (    
            <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-9">
                <ConfirmRidePanel trip={trip} fare={fare} vehicleType={vehicleType} createRide={createRide} setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
            </div>)}

            {vehicleFound && (        
            <div ref={vehicleFoundRef} className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-4 pt-9">
                <LookingForDriver trip={trip} fare={fare} vehicleType={vehicleType} setVehicleFound={setVehicleFound} />
            </div>)}

            {waitingForDriver && (    
            <div ref={waitingForDriverRef} className="fixed w-full z-10 bottom-0 bg-white px-3 py-4 pt-9">
                <WaitingForDriver ride={ride} vehicleType={vehicleType} setWaitingForDriver={setWaitingForDriver} />
            </div>)}
        </div>
    )
}

export default Home