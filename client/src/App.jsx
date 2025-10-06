import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import TransactionsDetail from "./pages/TransactionsDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Navigate to={"/signin"}/>}/>
        <Route path={"/signup"} element={<PublicRoute><Signup/></PublicRoute>}/>
        <Route path={"/signin"} element={<PublicRoute><Signin/></PublicRoute>}/>
        <Route path={"/dashboard"} element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        <Route path={"/send"} element={<ProtectedRoute><SendMoney/></ProtectedRoute>}/>
        <Route path={"/transactions"} element={<ProtectedRoute><TransactionsDetail/></ProtectedRoute>}/>
      
      </Routes>
    </BrowserRouter>
  )
}

export default App
