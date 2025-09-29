
export default function UserBalance({balance}) {
   
    return (
        <div>
            <span className="font-bold">My Balance</span>: {balance?`Rs. ${balance.toFixed(2)}` : "....."}
        </div>
    )
}