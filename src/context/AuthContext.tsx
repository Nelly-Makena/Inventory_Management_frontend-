import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";
import api from "@/api/axios";
 // Import configured axios instance

interface User {
  id: number;
  email: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signInWithGoogle: (idToken: string) => Promise<void>;
  logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

interface Props {
  children: ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore tokens and user on refresh
    const access = localStorage.getItem("access_token");
    const userData = localStorage.getItem("user");

    if (access && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.clear();
      }
    }

    setLoading(false);
  }, []);

  const signInWithGoogle = async (idToken: string) => {
    setLoading(true);
    try {
      // Use base axios for login (no token needed yet)
      const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/auth_app/google/`,
          { id_token: idToken },
          { headers: { "Content-Type": "application/json" } }
      );

      const { access, refresh, user } = res.data;

      // Store tokens and user data
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);
    } catch (error) {
      console.error("Google sign-in failed:", error);
      throw error; // Re-throw so calling component can handle it
    } finally {
      setLoading(false);
    }
  };

  const logOut = () => {
    localStorage.clear();
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

// Export the configured api instance for use in other components
export { api };