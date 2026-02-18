import {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef,
    ReactNode,
} from "react";
import axios from "axios";

//types

export interface User {
    id: number;
    email: string;
    displayName?: string;
    [key: string]: unknown;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    isAuthenticated: boolean;
    signInWithGoogle: (idToken: string) => Promise<void>;
    logOut: () => void;
}

// session helpers

const KEYS = {
    ACCESS: "st_access",
    REFRESH: "st_refresh",
    USER: "st_user",
} as const;

export const getAccessToken  = (): string | null => sessionStorage.getItem(KEYS.ACCESS);
export const getRefreshToken = (): string | null => sessionStorage.getItem(KEYS.REFRESH);

export const setTokens = (access: string, refresh: string): void => {
    sessionStorage.setItem(KEYS.ACCESS, access);
    sessionStorage.setItem(KEYS.REFRESH, refresh);
};

export const clearSession = (): void => {
    sessionStorage.removeItem(KEYS.ACCESS);
    sessionStorage.removeItem(KEYS.REFRESH);
    sessionStorage.removeItem(KEYS.USER);
};

// token refreshing

let _refreshPromise: Promise<string> | null = null;

export const refreshAccessToken = async (): Promise<string> => {
    if (_refreshPromise) return _refreshPromise;

    _refreshPromise = (async () => {
        const refresh = getRefreshToken();
        if (!refresh) throw new Error("No refresh token available");

        const res = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/token/refresh/`,
            { refresh },
        );

        const newAccess: string = res.data.access;
        const newRefresh: string = res.data.refresh ?? refresh;
        setTokens(newAccess, newRefresh);
        return newAccess;
    })();

    try {
        return await _refreshPromise;
    } finally {
        _refreshPromise = null;
    }
};

//context

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

// provider

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

   //restoring session on page reload

    useEffect(() => {
        const savedUser   = sessionStorage.getItem(KEYS.USER);
        const savedAccess = getAccessToken();

        if (savedUser && savedAccess) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                clearSession(); // corrupt data — start fresh
            }
        }

        setLoading(false);
    }, []);

    //google impl

    const signInWithGoogle = async (idToken: string) => {
        setLoading(true);
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/auth_app/google/`,
                { id_token: idToken },
                { headers: { "Content-Type": "application/json" } },
            );

            const { access, refresh, user } = res.data as {
                access: string;
                refresh: string;
                user: User;
            };

            setTokens(access, refresh);
            sessionStorage.setItem(KEYS.USER, JSON.stringify(user));
            setUser(user);
        } finally {
            setLoading(false);
        }
    };

    // logout

    const logOut = () => {
        clearSession();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                signInWithGoogle,
                logOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};