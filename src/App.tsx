import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientRoutes from "./routes/ClientRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ScrollToTop from "./utils/ScrollToTop";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: 5 * 60 * 1000 },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
          <Router>
            <ScrollToTop />
            <Toaster position="bottom-right" closeButton />
            <Routes>
              <Route path="/*" element={<ClientRoutes />} />
              <Route path="/admin" element={<AdminRoutes />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;