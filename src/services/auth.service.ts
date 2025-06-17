import axios from "./axios.customize";
import type { BackendAuthRes, LoginResponse, SignUpResponse } from "../types/auth";

const authApiPart = "/api/auth";

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
        const res = await axios.get<BackendAuthRes<null>>(authApiPart + "/checkusername", { params: { username } });
        return res;
    } catch (error) {
        throw error;
    }
}

const fetchMe = async () => {
    try {
        const res = await axios.get<BackendAuthRes<User>>(authApiPart + "/me");
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

export { signup, login, findUsername, fetchMe, refreshToken, logout }