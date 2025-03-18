import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { Provider } from "react-redux";

import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import { store } from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Toaster position="bottom-right" closeButton />
          <Routes>
            <Route path="/*" element={<ClientRoutes />} />
            <Route path="/admin" element={<AdminRoutes />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
