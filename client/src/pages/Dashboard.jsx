import UserBalance from "../components/userBalance"
import FilterUsers from "../components/FilterUsers"
import Header from "../components/Header"
import User from "../components/User"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import toast from "react-hot-toast"
import { UserContext } from "../context/UserContext"

export default function Dashboard() {

    let [accountId, setAccountId] = useState(null)
    let [balance, setBalance] = useState(null)

    const { user } = useContext(UserContext)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`, { withCredentials: true })
            .then((res) => {
                setBalance(res.data.balance)
                setAccountId(res.data.accountId)
            })
            .catch((err) => {
                console.log(err.message)
                toast.error(err.response.data.message)
            })
    }, [])

    return (
        <div className="">
            <Header label={"Paytm App"} />
            <div className="m-3 p-3 bg-[oklch(0.83_0.1_231.47)] rounded-md">
                {user ? <User props={user} /> : "Loading..."}
                <div className="flex justify-between">
                    <UserBalance balance={balance} />
                    {accountId && <Link to={`/transactions?accountId=${accountId}`} className="font-bold underline hover:text-blue-700">Transactions</Link>}
                </div>
            </div>

            <FilterUsers />


        </div>
    )
}