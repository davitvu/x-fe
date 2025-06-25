import { ThemeProvider } from "./contexts/ThemeContext";
import { ModalProvider } from "./contexts/ModalContext";
import AppRoutes from "./routes/AppRoutes";
import { BrowserRouter } from "react-router";
import { AuthenticatedProvider } from "./contexts/Authenticate.context";
import ErrorBoundary from "./contexts/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "./contexts/ProfileContext";

function App() {

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <AuthenticatedProvider>
            <ModalProvider>
              <ProfileProvider>
                <AppRoutes />
              </ProfileProvider>
            </ModalProvider>
          </AuthenticatedProvider>
        </ThemeProvider>
      </BrowserRouter>
      <Toaster />
    </ErrorBoundary>
  );
}

export default App;
