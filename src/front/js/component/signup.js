import React, {useState} from "react";
import axios from "axios";

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.BACKEND_URL + "/signup", {email, password}); 
            setMessage(response.data.msg);
        } catch (error) {
            setMessage(error.response.data.msg);
        } 
    }; 
    return (
        <div>
            <h2>Signup</h2>
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
                <button type="submit">Signup</button>
            </form>
            <p>{message}</p>
        </div>
    )
}