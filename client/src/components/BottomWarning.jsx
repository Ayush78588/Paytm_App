import { Link } from "react-router-dom"
export default function BottomWarning({message, linkText, to}){
    return(
        <div className="pt-2 text-sm" >
            {message+" "} 
            <Link to={to}>
                <span className="hover:text-green-600 font-bold text-black">{linkText}</span>
            </Link>
        </div>

    )
}