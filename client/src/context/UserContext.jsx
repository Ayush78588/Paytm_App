import { createContext, useEffect, useState } from "react";


export const UserContext = createContext()



export function UserProvider({ children }) {
    let [isSignedIn, setIsSignedIn] = useState(false)
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)

    useEffect(()=>{
        const storedUser = localStorage.getItem("user")
        if(storedUser){
            setIsSignedIn(true)
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    },[])

    useEffect(() => {
        if (user){
            localStorage.setItem("user", JSON.stringify(user))
            
        }
        else
            localStorage.removeItem("user")
    }, [user])

    return (
        <UserContext.Provider value={{ user, setUser, isSignedIn, setIsSignedIn, loading }}>
            {children}
        </UserContext.Provider>
    )
}