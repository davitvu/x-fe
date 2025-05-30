import { useEffect, useState } from "react";
import { ThemeProvider } from "./contexts/ThemeContext";
import AppRoutes from "./routes/AppRoutes";
import LoadingIntro from "./pages/Loading/LoadingIntro";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  

  return (
    <ThemeProvider>
      {loading ? <LoadingIntro /> : <AppRoutes />}
    </ThemeProvider>
  )
}

export default App
