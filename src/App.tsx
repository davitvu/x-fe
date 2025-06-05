import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import AppRoutes from "./routes/AppRoutes";
import LoadingIntro from "./pages/Loading/LoadingIntro";
import { BrowserRouter } from "react-router";

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
        <ModalProvider>
          {loading ? <LoadingIntro /> : <AppRoutes />}
        </ModalProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
