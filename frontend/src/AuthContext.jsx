import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            // Set axios default header for stored user
            if (userData.token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
            }
        }
        setLoading(false);
    }, []);

    const loginHelper = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, setUser: loginHelper, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};