import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export const UserContext = createContext()



export function UserProvider({ children }) {
    let [isSignedIn, setIsSignedIn] = useState(false)
    let [user, setUser] = useState(null)
    let [loading, setLoading] = useState(true)

    async function fetchUser() {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, {
                withCredentials: true
            })
            setUser(response.data.user)
            setIsSignedIn(true)
        } catch (err) {
            console.log(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])


    return (
        <UserContext.Provider value={{ user, setUser, isSignedIn, setIsSignedIn, loading }}>
            {children}
        </UserContext.Provider>
    )
}