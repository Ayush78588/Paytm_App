export default function Button({label, onClick, disabled}){
    return (
        <button type="button" disabled={disabled} onClick={onClick} className="bg-gray-900 text-white font-bold rounded-md hover:bg-green-600 px-4 py-0.5 h-fit">{label}</button>
    )
}