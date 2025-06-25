import type React from "react";
import LogoX from "../../../components/LogoX";
import { useCurrentAuthenticated } from "../../../contexts/Authenticate.context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useState } from "react";
import SidebarModal from "./SidebarModel";
import { useProfileContext } from "../../../contexts/ProfileContext";


const HeaderContainer = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="fixed top-0 left-0 right-0 h-header-height w-full px-4 py-[10px] bg-white/95 backdrop-blur-xs">
            {children}
        </div>
    )
}

const HeaderHome = () => {
    const { user } = useCurrentAuthenticated();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <HeaderContainer>
            <>
                <div>
                    <div className="flex justify-between">
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="w-8 h-8 overflow-hidden rounded-full cursor-pointer"
                        >
                            <img className="object-cover w-8 h-8 " src={user?.avatarUrl} alt="" />
                        </div>
                        <div className="absolute -translate-x-1/2 left-1/2">
                            <LogoX className="py-1 w-7" />
                        </div>
                        <div>
                            <button
                                onClick={() => toast("Có tiền méo đâu mà đòi premium", { icon: '😏' })}
                                className="h-9 rounded-full border text-[15px] font-bold border-light-blueish-gray text-near-black px-4 active:bg-light-blueish-gray"
                            >
                                Get Premium
                            </button>
                        </div>
                    </div>
                </div>

                {/* Sidebar Modal */}
                <SidebarModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    user={user}
                />
            </>
        </HeaderContainer>
    )
}

const HeaderProfile = () => {
    const navigate = useNavigate();
    const { profileData } = useProfileContext();

    return (
        <HeaderContainer>
            <>
                <div className="flex items-center">
                    <div
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center w-10 h-8 rounded-full active:bg-near-black-20-opa -translate-x-[4px]"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                        </svg>
                    </div>
                    <div className="ml-[28px] relative w-full h-[32px]">
                        <p className="absolute -top-[5px] left-0 text-[17px] text-near-black font-bold">{profileData?.name}</p>
                        <p className="absolute left-0 -bottom-[6px] text-[13px] text-dark-blueish-gray">{profileData?.tweetCount !== undefined ? `${profileData.tweetCount} posts` : ''}</p>
                    </div>
                    <div className="flex items-center justify-center w-10 h-8 rounded-full active:bg-near-black-20-opa -translate-x-[5px]">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path>
                        </svg>
                    </div>
                </div>
            </>
        </HeaderContainer>
    )
}

export { HeaderContainer, HeaderHome, HeaderProfile }