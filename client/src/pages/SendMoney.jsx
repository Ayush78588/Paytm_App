import { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import User from "../components/User";
import axios from "axios";
import {useNavigate} from "react-router-dom"

export default function SendMoney() {
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get("username");
    const firstName = queryParams.get("firstName");
    const lastName = queryParams.get("lastName");
    
    const id = queryParams.get("id");
    let [amount, setAmount] = useState(0)
    

    return (
        <div className="bg-gray-200 h-screen flex justify-center items-center ">
            <div className="bg-white h-fit px-8 pb-7 max-w-md">
                <div className="text-center"><Heading title={"Send Money"} /></div>
                <User props={{ firstName, lastName, username }} />
                <InputBox placeholder={"INR"} label={"Enter amount"} type={"number"} onChange={(event)=>{
                    setAmount(event.target.value)
                }} />
                <Button label={"Send"} onClick={async ()=>{
                    try{
                        const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/account/balance/transfer`,{
                        to: id,
                        amount: amount
                    },{
                        withCredentials: true
                    })
                    alert(response.data.message)
                    navigate("/dashboard")
                    } catch(err){
                        console.log(err);
                        alert(err.response.data.message)
                    }
                }}/>
            </div>
        </div>
    )
}