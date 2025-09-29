import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import TransactionsDetail from "./pages/TransactionsDetail";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/signin"}/>}/>
        <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/signin"} element={<Signin/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>
        <Route path={"/send"} element={<SendMoney/>}/>
        <Route path={"/transactions"} element={<TransactionsDetail/>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
