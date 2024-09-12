import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const PrivateRoute = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        axios
            .get(process.env.BACKEND_URL + "/private", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data.logged_in_as);
            })
            .catch(() => {
                setIsAuthenticated(false);
            });
    }, []);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <h1>Welcome, {user}</h1>;
};