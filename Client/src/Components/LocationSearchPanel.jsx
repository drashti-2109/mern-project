import React from "react";
import { IoLocationOutline } from "react-icons/io5";

const LocationSearchPanel = ({ suggestions, setTrip, activeField }) => {
    const handleSuggestionClick = (suggestion) => {
        setTrip((prev) => ({
            ...prev,
            [activeField]: suggestion
        }))
    }

    return (
        <div className="mt-17">
            {suggestions.map((currElm, index) => {
                return (
                    <div key={index} onClick={() => handleSuggestionClick(currElm)} className="flex gap-4 border-2 border-gray-50 active:border-black p-2 ml-10 mr-10 rounded-xl items-center my-2 justify-start">
                        <div className="pl-4"> <IoLocationOutline className="text-2xl" /> </div>
                        <h4 className="font-medium"> {currElm} </h4>
                    </div>
                )
            })}
        </div>
    )
}

export default LocationSearchPanel