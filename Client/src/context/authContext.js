import React, { createContext, useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext({
    user: null,
    loadingUser: false,
    signOut: () => { },
    login: () => { },
});

const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);


    const signOut = () => {

        setUser(null);
    };

    const login = (token) => {
        setLoadingUser(true);
        axios.get(`/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                setLoadingUser(false);
            });
    }
    const authContextValue = useMemo(() => ({ user, signOut, login, loadingUser }), [
        user,
        loadingUser,
    ]);

    return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthContextProvider.');
    }
    return context;
};

export { AuthContextProvider, useAuth };