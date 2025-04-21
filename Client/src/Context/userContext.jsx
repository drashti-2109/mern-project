import React, { createContext, useContext, useState } from "react";

export const UserDataContext = createContext()

const UserContext = ({children}) => {
    const [user, setUser] = useState(null)
 
    return (
        <UserDataContext.Provider value={{user, setUser}}>
            {children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext)

export default UserContext