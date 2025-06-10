import { useLocation, useNavigate } from "react-router";
import { useCurrentAuthenticated } from "../contexts/Authenticate.context";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const PrivateRoute = ({ children }: Props) => {
    const { isAuthenticated, isAppLoading } = useCurrentAuthenticated();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/auth", {
                state: { from: location },
                replace: true
            });
        }
    }, [isAuthenticated, isAppLoading, navigate, location]);

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
        navigate("/auth", {
            state: { from: location },
            replace: true
        });
        return null;
    }

    return <>{children}</>
}

export default PrivateRoute;