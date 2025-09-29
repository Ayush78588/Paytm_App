import { Link } from "react-router-dom";
import Button from "./Button";
import Heading from "./Heading";
import Signout from "./Signout";

export default function Header({ label }) {
    return (
        <div className="bg-gray-900 p-3 flex justify-between items-center text-white font-bold ">
            <h1 className="text-2xl">{label}</h1>
            <div className="flex gap-10 items-center"> 
                <Link to={"/dashboard"} className="hover:text-green-600">Dashboard</Link>
                <Signout />
            </div>

        </div>
    )
}