export interface BackendAuthRes<T> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T | null;
}

export interface LoginResponse {
    accessToken: string;
    user: {
        id: string,
        username: string,
        email: string,
        role: string
    }
}

export interface SignUpResponse {
    accessToken: string;
}