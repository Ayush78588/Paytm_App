import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import axios from "axios";
import User from "./User";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function FilterUsers() {
    
    let [filter, setFilter] = useState("")
    let [users, setUsers] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchUsers() {
            try{
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/filter`, {
                params: { filter },
                withCredentials: true
            }) // API call to fetch users based on filter
            setUsers(response.data.users)
            }catch(err){
                console.log(err.message);
            }
        }
        fetchUsers()
    }, [filter])

    return (
        <div className="px-2">
            <InputBox onChange={(e) => { setFilter(e.target.value) }} type={"text"} placeholder={"Search User By Name"} />
            {users.length>0 && users.map((user,i)=>{
                return (
                    <div className="flex justify-between items-center m-3 p-3 bg-[oklch(0.86_0.03_230.74)] rounded-md" key={i} >
                        <User props={user}/>
                        <Button label={"Send"} onClick={()=>{
                            navigate("/send?id="+user._id+"&firstName="+user.firstName+"&lastName="+user.lastName+"&username="+user.username)
                        }}/>
                    </div>
                )
            })}
            


        
            
            




        </div>
    )
}