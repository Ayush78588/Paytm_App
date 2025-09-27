import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/signin"}/>}/>
        <Route path={"/signup"} element={<Signup/>}/>
        <Route path={"/signin"} element={<Signin/>}/>
        <Route path={"/dashboard"} element={<Dashboard/>}/>
        <Route path={"/send"} element={<SendMoney/>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
