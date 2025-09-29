
export default function UserBalance({balance}) {
   
    return (
        <div>
            <span className="font-bold">My Balance</span>: {balance?`₹ ${balance}` : "....."}
        </div>
    )
}