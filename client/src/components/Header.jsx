import Button from "./Button";
import Heading from "./Heading";
import Signout from "./Signout";

export default function Header() {
    return (
        <div className="bg-gray-900 p-2 flex justify-between items-center ">
            <h1 className="text-white font-bold text-3xl">Paytm App</h1>
            <Signout/>
            
        </div>
    )
}