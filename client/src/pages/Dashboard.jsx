import UserBalance from "../components/userBalance"
import FilterUsers from "../components/FilterUsers"
import Header from "../components/Header"
import User from "../components/User"
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function Dashboard() {
    let [user, setUser] = useState(null)
    let [accountId, setAccountId] = useState(null)
     let [balance, setBalance] = useState(null)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`, { withCredentials: true })
            .then((res) => {
                setBalance(res.data.balance)
                setAccountId(res.data.accountId)
            })
            .catch((err) => {
                console.log(err.message)
                alert(err.response.data.message)
            })
    }, [])
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/user/me`, { withCredentials: true })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                console.log(err.message)
                alert(err.response.data.message)
            })
    }, [])
    return (
        <div className="">
            <Header label={"Paytm App"} />
            <div className="m-3 p-3 bg-[oklch(0.83_0.1_231.47)] rounded-md">
                {user ? <User props={user} /> : "Loading..."}
                <div className="flex justify-between">
                    <UserBalance balance={balance}/>
                    {accountId && <Link to={`/transactions?accountId=${accountId}&username=${user.username}&firstName=${user.firstName}&lastName=${user.lastName}`} className="font-bold underline hover:text-blue-700">Transactions</Link>}
                </div>
            </div>

            <FilterUsers />


        </div>
    )
}