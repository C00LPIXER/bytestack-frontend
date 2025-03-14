import Signup from "@/pages/client/Signup";
import { Route, Routes } from "react-router-dom";

function ClientRoutes() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default ClientRoutes;
