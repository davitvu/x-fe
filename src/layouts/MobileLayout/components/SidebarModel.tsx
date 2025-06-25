import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Link, useNavigate } from "react-router";
import { logout } from "../../../services/auth.service";
import toast from "react-hot-toast";
import { useCurrentAuthenticated } from "../../../contexts/Authenticate.context";

interface SidebarModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
}

const SidebarModal = ({ isOpen, onClose, user }: SidebarModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
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
                        navigate("/");
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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex">
            {/* Overlay */}
            <div
                className="fixed inset-0 transition-opacity duration-300 bg-black/50"
                onClick={onClose}
            />

            {/* Modal Sidebar */}
            <div
                ref={modalRef}
                className={`relative w-[280px] h-screen bg-white dark:bg-black shadow-2xl animate-left-to-right`}
            >
                <div className="flex flex-col h-full">
                    {/* User Info */}
                    <div className="p-4">
                        <div className="flex items-center mb-4 space-x-3">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <img
                                    className="object-cover w-full h-full"
                                    src={user?.avatarUrl}
                                    alt={user?.name}
                                />
                            </div>
                            <div>
                                <p className="font-bold text-near-black dark:text-white">{user?.name}</p>
                                <p className="text-sm text-dark-blueish-gray">@{user?.username}</p>
                            </div>
                        </div>

                        <div className="flex space-x-4 text-sm">
                            <div>
                                <span className="font-bold text-near-black dark:text-white">{user?.followingCount || 0}</span>
                                <span className="ml-1 text-dark-blueish-gray">Following</span>
                            </div>
                            <div>
                                <span className="font-bold text-near-black dark:text-white">{user?.followersCount || 0}</span>
                                <span className="ml-1 text-dark-blueish-gray">Followers</span>
                            </div>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className="flex-1 overflow-y-auto">
                        <nav className="px-2">
                            <Link
                                to={`/${user?.username}`}
                                onClick={onClose}
                                className="flex items-center px-3 py-3 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.168c-.272 2.024-.008 3.46.806 4.392.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.423-.54.567-1.248.395-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                                </svg>
                                <span>Profile</span>
                            </Link>

                            <Link
                                to="/lists"
                                onClick={onClose}
                                className="flex items-center px-3 py-3 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 4.5C3 3.12 4.12 2 5.5 2h13C19.88 2 21 3.12 21 4.5v15c0 1.38-1.12 2.5-2.5 2.5h-13C4.12 22 3 20.88 3 19.5v-15zM5.5 4c-.28 0-.5.22-.5.5v15c0 .28.22.5.5.5h13c.28 0 .5-.22.5-.5v-15c0-.28-.22-.5-.5-.5h-13zM16 10H8V8h8v2zm0 2H8v2h8v-2z"></path>
                                </svg>
                                <span>Lists</span>
                            </Link>

                            <div className="my-2 border-t border-gray-200 dark:border-gray-800"></div>

                            <button
                                onClick={() => {
                                    // Logout logic here
                                    handleLogout();
                                    onClose();
                                }}
                                className="flex items-center w-full px-3 py-3 text-left transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                            >
                                <svg className="w-6 h-6 mr-4" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M16 13v-2H7V8l-5 4 5 4v-3z"></path>
                                    <path d="M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"></path>
                                </svg>
                                <span>Logout</span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>,
        document.body // Render trực tiếp vào body
    );
}

export default SidebarModal;