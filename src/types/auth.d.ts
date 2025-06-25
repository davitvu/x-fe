export { };

declare global {
    interface BackendAuthRes<T> {
        success: boolean;
        message: string;
        data?: T | null;
    }
    
    interface LoginResponse {
        accessToken: string;
    }
    
    interface SignUpResponse {
        accessToken: string;
    }
    
    interface UserId {
        userId: string;
    }
    
    interface UserProfile {
        userId: string,
        profileId: string,
        name: string,
        username: string,
        email: string,
        avatarUrl: string,
        headerPhotoUrl: string,
        bio: string,
        location: string,
        websiteUrl: string,
        birthday: Date,
        role: string,
        isActive: boolean,
        checkMark: string,
        isBlock: boolean,
        tweetCount: number,
        lastLogin: Date,
        isPrivate: boolean,
        pinnedTweet: Object | null,
        createdAt: Date,
        updatedAt: Date,
    }
}