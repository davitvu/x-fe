import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean; // Trạng thái có lỗi hay không
}

// ErrorBoundary component để bắt và xử lý lỗi trong React
class ErrorBoundary extends Component<Props, State> {
    // Khởi tạo state ban đầu
    public state: State = {
        hasError: false
    };

    // Phương thức tĩnh để cập nhật state khi có lỗi xảy ra
    public static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    // Ghi log lỗi ra console để debug
    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Có lỗi xảy ra:', error, errorInfo);
    }

    // Render UI tùy thuộc vào trạng thái lỗi
    public render() {
        // Nếu có lỗi, hiển thị thông báo lỗi
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <h1 className="text-2xl font-bold text-red-500">
                        Rất tiếc! Đã có lỗi xảy ra
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Vui lòng thử lại sau hoặc liên hệ hỗ trợ
                    </p>
                </div>
            );
        }

        // Nếu không có lỗi, render children bình thường
        return this.props.children;
    }
}

export default ErrorBoundary;