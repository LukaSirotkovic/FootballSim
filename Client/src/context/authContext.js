import React, { createContext, useEffect, useMemo, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext({
    user: null,
    loadingUser: false,
    signOut: () => { },
    login: () => { },
    updateUser: ()  => {}
});

const AuthContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(false);

    const [number, setNumber] = useState(0);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            login(token);
        }
    }, [])

    // Ovdje mozes staviti da ti se updat
    const updateUser = (avatar, newUsername) => {
        setUser({
            ...user,
            avatar: avatar,
            username: newUsername
        })
    };




    const signOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
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
                localStorage.removeItem('token');
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                setLoadingUser(false);
            });
    }
    const authContextValue = useMemo(() => ({ user, signOut, login, loadingUser, updateUser }), [
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