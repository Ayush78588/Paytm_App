import { useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"

export default function PublicRoute({children}){
    const {isSignedIn} = useContext(UserContext)
    
    return(
        <>
          {isSignedIn? <Navigate to={"/dashboard"}/>: children}  
        </>
    )
}