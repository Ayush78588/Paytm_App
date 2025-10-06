import Header from "../components/Header"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import User from "../components/User"
import toast from "react-hot-toast"

export default function TransactionsDetail() {
    const queryParams = new URLSearchParams(window.location.search)
    const username = queryParams.get("username")
    const accountId = queryParams.get("accountId")
    const firstName = queryParams.get("firstName")
    const lastName = queryParams.get("lastName")


    let [transactions, setTransactions] = useState([])
    let [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/account/${accountId}/transactions`, {
            withCredentials: true
        })
            .then((res) => {
                setTransactions(res.data.transactions)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err.message)
                toast.error(err.response.data.message)
            })
    }, [])
    return (
        <div>
            <Header label={<div>
                <User props={{ username, firstName, lastName }} />
            </div>} />
            <div className=" font-bold flex flex-col items-center m-3" >
                {loading ?
                    <div >Loading...</div>
                    :
                    transactions.length ?
                        transactions.reverse().map((txn, i) => {
                            return (
                                <div key={i} className="bg-[#021270] m-2 p-3 rounded-md text-white text-sm w-full max-w-3xl" >

                                    <div className="flex justify-between">
                                        Amount:
                                        <div className={txn.type === "credit" ? "text-green-500" : "text-red-500"}>{"Rs. " + txn.amount.toFixed(2)}</div>
                                    </div>
                                    <div className="flex justify-between">
                                        <div>Type:</div>
                                        {txn.type}
                                    </div>
                                    {txn.type === "debit" ?
                                        <div className="flex justify-between">
                                            to:
                                            <div>{txn.counterAccountId.userId.username}</div>
                                        </div>
                                        :
                                        <div className="flex justify-between">
                                            from: <div>{txn.counterAccountId.userId.username}</div>
                                        </div>
                                    }
                                    <div className="flex justify-between">
                                        Date:
                                        <div> {new Date(txn.date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</div>
                                    </div>

                                </div>
                            )
                        })
                        :
                        <div className="p-3 text-red-700 font-bold">No transaction history!</div>

                }
            </div>

        </div>
    )
}