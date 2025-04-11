import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ClientRoutes from "./routes/client/ClientRoutes";
import AdminRoutes from "./routes/admin/AdminRoutes";
import ScrollToTop from "./utils/ScrollToTop";
import { useEffect } from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false, staleTime: 5 * 60 * 1000 },
  },
});

function App() {
  useEffect(() => {
    const observer = new MutationObserver(() => {
      document.body.removeAttribute("data-scroll-locked");
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["data-scroll-locked"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Router>
            <ScrollToTop />
            <Toaster position="bottom-right" closeButton />
            <Routes>
              <Route path="/*" element={<ClientRoutes />} />
              <Route path="/admin/*" element={<AdminRoutes />} />
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
