import { useCurrentAuthenticated } from "../contexts/Authenticate.context";
import AuthPage from "../pages/Auth/AuthPage";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated, isAppLoading } = useCurrentAuthenticated();

    if (isAppLoading) {
        return null;
    }

    /**
        nếu thằng navigate này không chạy thì test thằng windows.location.href = ""
        và window.location.replace("/home"); // Điều hướng và thay thế entry trong lịch sử trình duyệt
        hoặc history.push(), history.replace()
        history.push("/home"): Thêm một entry vào lịch sử trình duyệt, cho phép người dùng quay lại trang trước đó.
        history.replace("/home"): Thay thế entry hiện tại trong lịch sử trình duyệt, ngăn người dùng quay lại trang trước đó.
     */
    if (!isAuthenticated) {
        return <AuthPage />
    }

    return <>{children}</>
}

export default PrivateRoute;