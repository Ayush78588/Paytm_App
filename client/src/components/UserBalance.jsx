import { useEffect, useState } from "react"
import axios from "axios"

export default function UserBalance() {
    let [balance, setBalance] = useState(null)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`, { withCredentials: true })
            .then((res) => {
                setBalance(res.data.balance)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }, [])
    return (
        <div>
            <span className="font-bold">My Balance</span>: {balance?`₹ ${balance}` : "....."}
        </div>
    )
}