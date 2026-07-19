import { useContext, useEffect } from "react";
import { AuthContext } from "../auth..context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (err) {
            console.error("Login failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            // FIXED: Added the missing 'await' keyword here
            const data = await register({ username, email, password });
            setUser(data.user);
        } catch (err) {
            console.error("Registration failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.error("Logout failed:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getMe();
                // Check if data and user exist before setting
                if (data && data.user) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                // Safely catch the 401 Unauthorized error when logged out
                setUser(null);
            } finally {
                // FIXED: Changed loading(false) to setLoading(false)
                setLoading(false); 
            }
        };
        
        getAndSetUser();
    }, [setUser, setLoading]);

    return { user, loading, handleRegister, handleLogin, handleLogout };
};