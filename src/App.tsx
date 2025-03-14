import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";

function App() {
  return (
    <>
      <Router>
        <Toaster position="bottom-right" />
        <Routes>
          <Route path="/*" element={<ClientRoutes />} />
          <Route path="/admin" element={<AdminRoutes />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
