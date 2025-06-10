import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import AppRoutes from "./routes/AppRoutes";
import LoadingIntro from "./pages/Loading/LoadingIntro";
import { BrowserRouter } from "react-router";
import { AuthenticatedProvider } from "./contexts/Authenticate.context";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthenticatedProvider>
          <ModalProvider>
            {loading ? <LoadingIntro /> : <AppRoutes />}
          </ModalProvider>
        </AuthenticatedProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
