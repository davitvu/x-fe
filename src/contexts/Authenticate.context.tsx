import { createContext, useContext, useEffect, useState } from "react";
import { fetchMe } from "../services/auth.service";
import LoadingWithLogo from "../components/Loading/LoadingWithLogo";
interface AuthenContext {
    isAuthenticated: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setUser: (value: User | null) => void;
    user: User | null;
    isAppLoading: boolean;
    setIsAppLoading: (value: boolean) => void;
}

const CurrentAuthenContext = createContext<AuthenContext | null>(null);

type Props = {
    children: React.ReactNode;
}

export const AuthenticatedProvider = (props: Props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isAppLoading, setIsAppLoading] = useState<boolean>(true);

    useEffect(() => {
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

        fetchUser();
    }, []);

    return (
        <>
            {isAppLoading ?
                <LoadingWithLogo />
                // <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                //     <GiSpinalCoil className="animate-spin text-[#36d6b4] text-4xl" />
                // </div>
                :
                <CurrentAuthenContext.Provider value={{
                    isAuthenticated, user, setIsAuthenticated, setUser,
                    isAppLoading, setIsAppLoading
                }}>
                    {props.children}
                </CurrentAuthenContext.Provider>
            }

        </>
    )
}


export const useCurrentAuthenticated = () => {
    const currentAuthenContext = useContext(CurrentAuthenContext);

    if (!currentAuthenContext) {
        throw new Error(
            "useCurrentApp has to be used within <CurrentAuthenContext.Provider>"
        );
    }

    return currentAuthenContext;
};
