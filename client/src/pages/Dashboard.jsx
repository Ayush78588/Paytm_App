import UserBalance from "../components/userBalance"
import Users from "../components/Users"
import Header from "../components/Header"
import User from "../components/User"
import { useEffect, useState } from "react"
import axios from "axios"
import Subheading from "../components/Subheading"

export default function Dashboard(){
    let [user, setUser] = useState(null)
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, {withCredentials: true})
        .then((res)=>{
            setUser(res.data.user)
        })
        .catch((err)=>{
            console.log(err.message)
            alert(err.response.data.message)
        })
    },[])
    return(
        <div className="">
            <Header/>
            <div className="m-3 p-3 bg-[oklch(0.83_0.1_231.47)] rounded-md">
                {user? <User props={user}/> : "Loading..."}
                <UserBalance/>
            </div>
            
            <Users/>


        </div>
    )
}