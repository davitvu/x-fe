export { };

declare global {
    interface User {
        _id: string,
        name: string,
        username: string,
        email: string,
        role: string,
        avatarUrl: string,
        createdAt: string,
        updatedAt: string
    }
}