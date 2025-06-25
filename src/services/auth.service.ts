import axios from "./axios.customize";

const authApiPart = "/api/v1/auth";

const signup = async (name: string, username: string, email: string, password: string) => {
    try {
        const res = await axios.post<BackendAuthRes<SignUpResponse>>(authApiPart + "/signup", { name, username, email, password });
        return res;
    } catch (error) {
        throw error;
    }
}

const login = async (username: string, password: string) => {
    try {
        const res = await axios.post<BackendAuthRes<LoginResponse>>(authApiPart + "/login", { username, password });
        return res;
    } catch (error) {
        throw error;
    }
}

const findUsername = async (username: string) => {
    try {
        const res = await axios.get<BackendAuthRes<UserId>>(authApiPart + "/checkusername", { params: { username } });
        return res;
    } catch (error) {
        throw error;
    }
}

const fetchMe = async () => {
    try {
        const res = await axios.get<BackendAuthRes<FetchMe>>(authApiPart + "/me");
        return res;
    } catch (error) {
        throw error;
    }
}

const refreshToken = async () => {
    try {
        const res = await axios.post<BackendAuthRes<SignUpResponse>>(authApiPart + "/refresh");
        return res;
    } catch (error) {
        throw error;
    }
}

const logout = async () => {
    try {
        const res = await axios.post<BackendAuthRes<null>>(authApiPart + "/logout");
        return res;
    } catch (error) {
        throw error;
    }
}

const getUserIdByUsername = async (username: string) => {
    try {
        const res = await axios.get<BackendAuthRes<UserId>>(authApiPart + `/${username}`);
        return res;
    } catch (error) {
        throw error;
    }
}

const getUserProfile = async (userId: string) => {
    try {
        const res = await axios.get<BackendAuthRes<UserProfile>>(authApiPart + `/data-profile/${userId}`);
        return res;
    } catch (error) {
        throw error;
    }
}

export { signup, login, findUsername, fetchMe, refreshToken, logout, getUserIdByUsername, getUserProfile }