import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/login", { email, password });
            const token = response.data.access_token;
            sessionStorage.setItem("token", token); 
            navigate("/private"); 
        } catch (error) {
            setMessage(error.response.data.msg);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p>{message}</p>
        </div>
    );
};