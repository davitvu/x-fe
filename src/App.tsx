import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router";
import { AuthenticatedProvider } from "./contexts/Authenticate.context";
import ErrorBoundary from "./contexts/ErrorBoundary";

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthenticatedProvider>
            <ModalProvider>
              <AppRoutes />
            </ModalProvider>
          </AuthenticatedProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
