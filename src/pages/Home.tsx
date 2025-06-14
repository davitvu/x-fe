import toast from "react-hot-toast";
import { useCurrentAuthenticated } from "../contexts/Authenticate.context";
import { logout } from "../services/auth.service";


const HomePage = () => {
    const { user } = useCurrentAuthenticated();
    const { setUser, setIsAuthenticated } = useCurrentAuthenticated();

    const handleLogout = async () => {
        toast.promise(
            new Promise(async (resolve, reject) => {
                try {
                    const res = await logout();
                    if (res?.data?.success) {
                        // Clear auth data
                        localStorage.removeItem('accessToken');
                        setUser(null);
                        setIsAuthenticated(false);
                        resolve('Đăng xuất thành công');
                    } else {
                        reject(res?.data?.message || 'Đăng xuất thất bại');
                    }
                } catch (error: any) {
                    reject(error.response?.data?.message || 'Lỗi hệ thống');
                }
            }),
            {
                loading: 'Đang đăng xuất...',
                success: <b>Đăng xuất thành công!</b>,
                error: (error) => <b>{error as string}</b>,
            }
        );
    }

    // Thêm base URL cho avatar
    const avatarBaseUrl = "avatar/random";

    // Format date helper
    const formatDate = (date: string) => {
        return new Date(date).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Update UserInfoField to handle different value types
    const UserInfoField = ({ label, value }: { label: string; value: any }) => (
        <div className="flex border-b dark:border-gray-700 pb-3 last:border-b-0">
            <span className="font-medium w-1/3 text-gray-600 dark:text-gray-300 capitalize">
                {label}:
            </span>
            <span className="text-gray-800 dark:text-gray-100 flex-1">
                {typeof value === 'boolean'
                    ? value ? 'Yes' : 'No'
                    : value || 'N/A'}
            </span>
        </div>
    );


    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                    HomePage
                </h1>

                <div className="flex items-center flex-col justify-center">
                    {/* Avatar Section */}
                    <div className="mb-6">
                        <img
                            src={user?.avatarUrl ? `${avatarBaseUrl}/${user.avatarUrl}.jpg` : '/default-avatar.jpg'}
                            alt="User avatar"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                            onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                img.src = '/default-avatar.jpg';
                            }}
                        />
                    </div>

                    {/* User Info Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
                        <div className="space-y-4">
                            {/* Name & Username section */}
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                                    {user?.name || 'N/A'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    @{user?.username || 'N/A'}
                                </p>
                            </div>

                            {/* All user fields */}
                            <UserInfoField label="Email" value={user?.email} />
                            <UserInfoField label="Role" value={user?.role} />
                            <UserInfoField label="Avatar URL" value={user?.avatarUrl} />
                            {/* <UserInfoField label="Is Admin" value={user?.isAdmin} /> */}
                            {/* <UserInfoField label="Is Active" value={user?.isActive} /> */}
                            {/* <UserInfoField label="Phone" value={user?.phone} /> */}
                            {/* <UserInfoField label="Address" value={user?.address} /> */}
                            {/* <UserInfoField label="Bio" value={user?.bio} /> */}
                            <UserInfoField
                                label="Created At"
                                value={user?.createdAt ? formatDate(user.createdAt) : null}
                            />
                            <UserInfoField
                                label="Updated At"
                                value={user?.updatedAt ? formatDate(user.updatedAt) : null}  // Now using updatedAt
                            />
                            {/* <UserInfoField label="Last Login"
                                value={user?.lastLogin ? formatDate(user.lastLogin) : null}
                            /> */}
                        </div>
                    </div>

                    {/* Logout Button */}
                    <div className="mt-6">
                        <button
                            onClick={handleLogout}
                            className="px-6 cursor-pointer py-2 bg-red-500 text-white rounded-md hover:bg-red-600 
                                     transition-colors duration-200 flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd"
                                    d="M3 3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H3zm11 4a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V7z"
                                    clipRule="evenodd" />
                            </svg>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default HomePage;