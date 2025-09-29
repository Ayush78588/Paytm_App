import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from '../components/Button';
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Signin() {
    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [isDisabled, setIsDisabled] = useState(false)
    const navigate = useNavigate()
    
    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-300">
            <div className=" h-fit p-2 bg-white max-w-sm rounded-md">
                <div className="text-center">
                    <Heading title={"Sign In"} />
                    <Subheading subtitle={"Please enter your credentials to sign in"} />
                </div>
                <InputBox onChange={(e) => { setUsername(e.target.value) }} type="text" label={"Email"} placeholder={"ayu123@gmail.com"} />
                <InputBox onChange={(e) => { setPassword(e.target.value) }} type="text" label={"Password"} placeholder={"asdf1234"} />
                <div className="text-center">
                    <Button disabled={isDisabled} label="Submit" onClick={async () => {
                        try {
                            setIsDisabled(true)
                            let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                                username, password
                            }, {
                                withCredentials: true
                            })
                            alert(response.data.message)
                            navigate("/dashboard")
                        } catch (err) {
                            console.log(err.message)
                            alert(err.response.data.message)
                        } finally{
                            setIsDisabled(false)
                        }

                    }} />
                </div>
                <BottomWarning message={"New user?"} linkText={"sign up"} to={"/signup"} />
            </div>
        </div>

    )
}