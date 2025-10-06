import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import Subheading from "../components/Subheading";
import Button from '../components/Button';
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Header from "../components/Header";




export default function Signup() {
    let [firstName, setFirstName] = useState(null)
    let [lastName, setLastName] = useState(null)
    let [username, setUsername] = useState(null)
    let [password, setPassword] = useState(null)
    let [isDisabled, setIsDisabled] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="flex flex-col min-h-screen">
            <Header label={"Paytm App"}/>
            <div className="flex flex-1 w-screen justify-center items-center bg-gray-300 ">
                <div className="h-fit bg-white p-5 rounded-md max-w-sm">
                    <div className="text-center">
                        <Heading title={"Sign Up"} />
                        <Subheading subtitle={"Enter your information to create an account"} />
                    </div>
                    <InputBox onChange={(e) => { setFirstName(e.target.value) }} type="text" label="First Name" placeholder={"John"} />
                    <InputBox onChange={(e) => { setLastName(e.target.value) }} type="text" label="Last Name" placeholder={"Deep"} />
                    <InputBox onChange={(e) => { setUsername(e.target.value) }} type="text" label="Email" placeholder={"ayu123@gmail.com"} />
                    <InputBox onChange={(e) => { setPassword(e.target.value) }} type="password" label="Password" placeholder={"asdf1234"} />
                    <div className="text-center">
                        <Button disabled={isDisabled} label={"Submit"} onClick={async () => {
                            try {
                                setIsDisabled(true)
                                let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
                                    username, password, firstName, lastName
                                })
                                toast.success(response.data.message)
                                navigate("/signin")
                            } catch (err) {
                                console.log(err.message)
                                toast.error(err.response.data.message)
                            } finally {
                                setIsDisabled(false)
                            }

                        }} />
                    </div>
                    <BottomWarning message={"Already have an account?"} linkText={"sign in"} to={"/signin"} />
                </div>
            </div>
        </div>
    )
}