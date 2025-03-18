import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Toaster } from "sonner";

import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ScrollToTop from "./utils/ScrollToTop";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <ScrollToTop />
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
