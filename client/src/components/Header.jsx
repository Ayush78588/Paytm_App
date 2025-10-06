import { Link } from "react-router-dom";
import Button from "./Button";
import Heading from "./Heading";
import Signout from "./Signout";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";


export default function Header({ label }) {
    const {isSignedIn} = useContext(UserContext)
    return (
        <div className="bg-gray-900 p-3 flex justify-between items-center text-white font-bold ">
            <h1 className="text-2xl">{label}</h1>
            <div className="flex gap-10 items-center"> 
                {isSignedIn && <Link to={"/dashboard"} className="hover:text-green-600">Dashboard</Link>}
                {isSignedIn && <Signout />}
            </div>

        </div>
    )
}