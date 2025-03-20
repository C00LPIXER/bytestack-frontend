import { Dashboard } from "@/pages/client/Dashboard";
import LandingPage from "@/pages/client/Landing";
import Login from "@/pages/client/Login";
import Signup from "@/pages/client/Signup";
import { Route, Routes } from "react-router-dom";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/" element={<LandingPage />}></Route>
      <Route path="/home" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default ClientRoutes;
