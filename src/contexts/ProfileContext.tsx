import { createContext, useContext, useState, type ReactNode } from "react";

interface ProfileContextType {
    profileData: UserProfile | null;
    setProfileData: (data: UserProfile | null) => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children } : { children: ReactNode }) => {
    const [profileData, setProfileData] = useState<UserProfile | null>(null);

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData }}>
            {children}
        </ProfileContext.Provider>
    )
};

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('useProfileContext must be used within ProfileProvider');
    }
    return context;
}