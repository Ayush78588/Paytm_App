import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserContext"
export default function Signout(){
    const navigate = useNavigate()
    const {setUser, setIsSignedIn} = useContext(UserContext)
    return (
        <div>
            <button onClick={async()=>{
                try{
                    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {}, {
                        withCredentials: true
                    })
                    alert(response.data.message)
                    navigate("/signin")
                    setIsSignedIn(false)
                    setUser(null)

                }catch(err){
                    console.log(err.message)
                    alert(err.response.data.message)
                }
            }}  className="bg-red-600 p-1 rounded-md text-white font-bold hover:bg-red-500">Signout</button>
        </div>
    )
}