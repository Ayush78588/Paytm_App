import {useId} from "react"
export default function InputBox({label, placeholder, type, onChange}){
    const id = useId()
    return (
        <div className="flex flex-col gap-1 pb-3">
            <label htmlFor={id} className="w-2xl">{label}</label> 
            <input onChange={onChange} id={id} type={type} placeholder={placeholder} required className=" border-gray-300 border-2 p-1 text-xs  outline-gray-400 rounded-sm"/> 
        </div>
    )
}