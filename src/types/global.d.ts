export { };

declare global {
    interface FetchMe {
        _id: string,
        name: string,
        username: string,
        email: string,
        avatarUrl: string,
        tweetCount: number,
        role: string,
        checkMark: string,
        isActive: boolean,
        isBlock: boolean,
        createdAt: Date,
        updatedAt: Date,
    }
}