import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "../services/auth.service";
import LoadingWithLogo from "../components/Loading/LoadingWithLogo";
interface AuthenticateContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setUser: (value: User | null) => void;
    user: User | null;
    isAppLoading: boolean;
    setIsAppLoading: (value: boolean) => void;
    refetchUser: () => Promise<void>;
}

const CurrentAuthenticateContext = createContext<AuthenticateContext | null>(null);

type Props = {
    children: React.ReactNode;
}

export const AuthenticatedProvider = (props: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    const fetchUser = async () => {
        try {
            const res = await fetchMe();
            if (res?.data?.data) {
                setUser(res.data.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setIsAppLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return (
        <>
            {isAppLoading ?
                <LoadingWithLogo />
                :
                <CurrentAuthenticateContext.Provider value={{
                    isAuthenticated, user, setIsAuthenticated, setUser,
                    isAppLoading, setIsAppLoading, refetchUser: fetchUser
                }}>
                    {props.children}
                </CurrentAuthenticateContext.Provider>
            }
        </>
    )
}

export const useCurrentAuthenticated = () => {
    const currentAuthenticateContext = useContext(CurrentAuthenticateContext);

    if (!currentAuthenticateContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAuthenticateContext.Provider>"
        );
    }

    return currentAuthenticateContext;
};
