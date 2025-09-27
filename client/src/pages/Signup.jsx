import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from '../components/Button';
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";




export default function Signup() {
    let [firstName, setFirstName] = useState(null)
    let [lastName, setLastName] = useState(null)
    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    const navigate = useNavigate()
    
    return (
        <div className="flex min-h-screen w-screen justify-center items-center bg-gray-300 ">
            <div className="h-fit bg-white p-5 rounded-md max-w-sm">
                <div className="text-center">
                    <Heading title={"Signup"} />
                    <Subheading subtitle={"Enter your information to create an account"} />
                </div>
                <InputBox onChange={(e)=>{setFirstName(e.target.value)}} type="text" label="First Name" placeholder={"John"} />
                <InputBox onChange={(e)=>{setLastName(e.target.value)}} type="text" label="Last Name" placeholder={"Deep"} />
                <InputBox onChange={(e)=>{setUsername(e.target.value)}} type="text" label="Email" placeholder={"ayu123@gmail.com"} />
                <InputBox onChange={(e)=>{setPassword(e.target.value)}} type="password" label="Password" placeholder={"asdf1234"} />
                <div className="text-center">
                    <Button label={"Submit"} onClick={async () => {
                       try{
                         let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                           username, password, firstName, lastName 
                        })
                        alert(response.data.message)
                        navigate("/signin")
                       }catch(err){
                        console.log(err.message)
                        alert(err.response.data.message)
                       }
                        
                    }} />
                </div>
                <BottomWarning message={"Already have an account?"} linkText={"Signin"} to={"/signin"}/>
            </div>
        </div>
    )
}