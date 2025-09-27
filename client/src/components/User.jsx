import Button from "./Button";

export default function User({ props }) {

    return (
        
            <div className="flex gap-1 pb-2">
                <div className="w-10 h-10 rounded-full bg-gray-900 text-white text-xl flex justify-center items-center font-bold ">{props.firstName[0]}</div>
                <div>
                    <div>{props.firstName} {props.lastName}</div>
                    <div className="text-xs">{props.username}</div>
                 </div>
            </div>
        
        
    )
}