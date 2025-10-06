import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }) {
    const { isSignedIn, loading } = useContext(UserContext)

    return (
        <>
            {loading ?
                "Loading..."
                :
                isSignedIn ? children : <Navigate to={"/signin"} />
            }
        </>

    )
} 