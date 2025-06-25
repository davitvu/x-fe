import { useParams } from "react-router";
import { useCurrentAuthenticated } from "../contexts/Authenticate.context";
import { useEffect, useState } from "react";
import { getUserIdByUsername, getUserProfile } from "../services/auth.service";
import { useProfileContext } from "../contexts/ProfileContext";
import toast from "react-hot-toast";

const ProfilePage = () => {
    const { isAuthenticated, user } = useCurrentAuthenticated();
    const { setProfileData } = useProfileContext();
    const { username } = useParams<{ username: string }>();
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [userData, setUserData] = useState<UserProfile | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"Posts" | "Replies" | "Media" | "Likes">("Posts");

    useEffect(() => {
        fetchUserProfile();
    }, [username, isAuthenticated, user]);

    const fetchUserProfile = async () => {
        if (!username) {
            setError("Không tìm thấy username");
            return;
        }

        let userId: string | null = user?._id || null;

        // da dang nhap thi gan luon userId do phai truy van
        if (isAuthenticated && user?._id && user.username === username) {
            userId = user._id;
        }

        try {
            // Truong hop chua dang nhap thi phai di truy van userId
            if (user?.username !== username) {
                try {
                    const res = await getUserIdByUsername(username);
                    if (res.data.success && res.data.data && res.data.data.userId) {
                        userId = res.data.data.userId;
                        setCurrentUserId(userId);
                    } else {
                        setError("Không tìm thấy userId");
                        return;
                    }
                } catch (error: any) {
                    setError("Lỗi khi tìm người dùng");
                    return;
                }
            }

            // truy van data profile
            if (userId) {
                try {
                    const res = await getUserProfile(userId);
                    console.log("hihi", res);

                    if (res.data.success && res.data.data) {
                        setUserData(res.data.data);
                        setProfileData(res.data.data);
                    } else {
                        setUserData(null);
                        setProfileData(null);
                        setError("Không thể tải dữ liệu người dùng");
                    }

                } catch (error: any) {
                    setError("Đã có lỗi xảy ra khi tải profile");
                }
            }

        } catch (error: any) {
            setError("Đã có lỗi xảy ra");
        }
    }
    
    const isOwnProfile = user?.username === username;

    // if (error) {
    //     return (
    //         <div className="flex items-center justify-center min-h-screen">
    //             <div className="text-center">
    //                 <h1 className="mb-2 text-2xl font-bold text-red-500">Có lỗi xảy ra</h1>
    //                 <p className="mb-4 text-gray-600">{error}</p>
    //                 <button
    //                     onClick={() => {
    //                         setError(null);
    //                         fetchUserProfile();
    //                     }}
    //                     className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
    //                 >
    //                     Thử lại
    //                 </button>
    //             </div>
    //         </div>
    //     );
    // }

    if (!userData) {
        return (
            <>
                <h1>Khong tim thay nguoi dung</h1>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="w-8 h-8 border-4 rounded-full border-X-blue border-t-transparent animate-spin"></div>
                </div>
            </>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Header Photo */}
            <div className="relative bg-gray-200 h-44 dark:bg-gray-800">
                {userData.headerPhotoUrl ? (
                    <img
                        src={userData.headerPhotoUrl}
                        alt="Header photo"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-800"></div>
                )}
            </div>

            {/* Profile Info */}
            <div className="px-4 pb-4">
                {/* Avatar & Action Buttons */}
                <div className="sticky flex items-start justify-between mb-3 -mt-16">
                    <div className="w-32 h-32 overflow-hidden bg-gray-200 border-white rounded-full border-3 dark:border-black dark:bg-gray-800">
                        {userData.avatarUrl ? (
                            <img
                                src={userData.avatarUrl}
                                alt="Avatar"
                                className="object-cover w-full h-full"
                                onError={(e) => {
                                    const img = e.target as HTMLImageElement;
                                    img.src = '/avatar/random/default.jpg';
                                }}
                            />
                        ) : (
                            <div className="flex items-center justify-center w-full h-full bg-gray-400 dark:bg-gray-600">
                                <svg className="w-16 h-16 text-gray-600 dark:text-gray-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.168c-.272 2.024-.008 3.46.806 4.392.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.423-.54.567-1.248.395-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path>
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex mt-20 space-x-2">
                        {isOwnProfile ? (
                            <button className="px-4 py-1.5 border border-gray-300 dark:border-gray-600 rounded-full text-near-black dark:text-white font-bold text-sm hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                                Edit profile
                            </button>
                        ) : (
                            <>
                                <button 
                                    onClick={() => toast("Tính năng đang đang phát triển DumaSaigon", { icon: '🥰' })}
                                    className="p-2 transition-colors border border-gray-300 rounded-full dark:border-gray-600 text-near-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5v13c0 1.381-1.119 2.5-2.5 2.5h-15c-1.381 0-2.5-1.119-2.5-2.5v-13zm2.5-.5c-.276 0-.5.224-.5.5v2.764l8 3.638 8-3.636V5.5c0-.276-.224-.5-.5-.5h-15zm15.5 5.463l-8 3.636-8-3.638V18.5c0 .276.224.5.5.5h15c.276 0 .5-.224.5-.5v-8.037z"></path>
                                    </svg>
                                </button>
                                <button 
                                    onClick={() => toast("Tính năng đang đang phát triển DumaSaigon", { icon: '🥰' })}
                                    className="px-4 py-1.5 active:bg-X-blue bg-near-black dark:bg-white text-white dark:text-black rounded-full font-bold text-sm hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                    Follow
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* User Info */}
                <div className="mb-3">
                    <h1 className="text-xl font-bold text-near-black dark:text-white">{userData.name}</h1>
                    <p className="text-dark-blueish-gray">@{userData.username}</p>
                </div>

                {/* Bio */}
                {userData.bio && (
                    <p className="text-near-black dark:text-white mb-3 text-[15px] leading-5">
                        {userData.bio}
                    </p>
                )}

                {/* Location & Join Date */}
                <div className="flex flex-wrap items-center gap-4 mb-3 text-dark-blueish-gray text-[15px]">
                    {userData.location && (
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
                            </svg>
                            <span>{userData.location}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 4V3h2v1h6V3h2v1h1.5C19.89 4 21 5.12 21 6.5v12c0 1.38-1.11 2.5-2.5 2.5h-13C4.12 21 3 19.88 3 18.5v-12C3 5.12 4.12 4 5.5 4H7zm0 2H5.5c-.27 0-.5.22-.5.5v12c0 .28.23.5.5.5h13c.28 0 .5-.22.5-.5v-12c0-.28-.22-.5-.5-.5H17v1h-2V6H9v1H7V6zm0 6h2v-2H7v2zm0 4h2v-2H7v2zm4-4h2v-2h-2v2zm0 4h2v-2h-2v2zm4-4h2v-2h-2v2z"></path>
                        </svg>
                        <span>Joined {new Date(userData.createdAt || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                    </div>
                </div>

                {/* Following & Followers */}
                <div className="flex gap-4 mb-4 text-[15px]">
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-near-black dark:text-white">0</span>
                        <span className="text-dark-blueish-gray">Following</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-near-black dark:text-white">0</span>
                        <span className="text-dark-blueish-gray">Followers</span>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-extra-light-gray dark:border-gray-800">
                <div className="flex">
                    {(["Posts", "Replies", "Media", "Likes"] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="relative flex-1 py-4 text-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                        >
                            <span className={`text-[15px] font-medium ${activeTab === tab
                                ? 'text-near-black dark:text-white font-bold'
                                : 'text-dark-blueish-gray'
                                }`}>
                                {tab}
                            </span>
                            {activeTab === tab && (
                                <div className="absolute bottom-0 w-12 h-1 transform -translate-x-1/2 rounded-full left-1/2 bg-X-blue"></div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <div className="min-h-96">
                {activeTab === "Posts" && (
                    <div className="flex flex-col items-center justify-center px-8 py-16">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full dark:bg-gray-800">
                            <svg className="w-8 h-8 text-dark-blueish-gray" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M7 4V2c0-.55-.45-1-1-1s-1 .45-1 1v2H3c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h1v13c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7h1c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1h-2V2c0-.55-.45-1-1-1s-1 .45-1 1v2H7z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-near-black dark:text-white">
                            {isOwnProfile ? "You haven't posted anything yet" : `@${userData.username} hasn't posted`}
                        </h3>
                        <p className="text-center text-dark-blueish-gray">
                            {isOwnProfile ? "When you post, it'll show up here." : "When they post, it'll show up here."}
                        </p>
                    </div>
                )}

                {activeTab === "Replies" && (
                    <div className="flex flex-col items-center justify-center px-8 py-16">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full dark:bg-gray-800">
                            <svg className="w-8 h-8 text-dark-blueish-gray" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-near-black dark:text-white">
                            {isOwnProfile ? "You haven't replied to any posts yet" : `@${userData.username} hasn't replied to any posts`}
                        </h3>
                        <p className="text-center text-dark-blueish-gray">
                            {isOwnProfile ? "When you reply to a post, it'll show up here." : "When they reply to a post, it'll show up here."}
                        </p>
                    </div>
                )}

                {activeTab === "Media" && (
                    <div className="flex flex-col items-center justify-center px-8 py-16">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full dark:bg-gray-800">
                            <svg className="w-8 h-8 text-dark-blueish-gray" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-near-black dark:text-white">
                            {isOwnProfile ? "You haven't posted any photos or videos yet" : `@${userData.username} hasn't posted any photos or videos`}
                        </h3>
                        <p className="text-center text-dark-blueish-gray">
                            {isOwnProfile ? "When you send photos or videos, they will appear here." : "When they send photos or videos, they will appear here."}
                        </p>
                    </div>
                )}

                {activeTab === "Likes" && (
                    <div className="flex flex-col items-center justify-center px-8 py-16">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full dark:bg-gray-800">
                            <svg className="w-8 h-8 text-dark-blueish-gray" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-2xl font-bold text-near-black dark:text-white">
                            {isOwnProfile ? "You don't have any likes yet" : `@${userData.username} doesn't have any likes yet`}
                        </h3>
                        <p className="text-center text-dark-blueish-gray">
                            {isOwnProfile ? "Tap the heart on any post to show it some love. When you do, it'll show up here." : "When they like a post, it'll show up here."}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePage;