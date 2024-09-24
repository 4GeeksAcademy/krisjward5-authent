import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        actions.login(email, password)
    };

    if (store.token && store.token !== "" && store.token !== undefined) {
        navigate("/private")
    }

    return (
        <div>
            <div className="container">
                {(store.token && store.token !== "" && store.token !== undefined) ?
                "you are logged in with token"+store.token

                :
                <>
                <input type="text" placeholder="email" onChange={e=>setEmail(e.target.value)} value={email}/>
                <input type="text" placeholder="password" onChange={e=>setPassword(e.target.value)} value={password}/>
                <button onClick={handleLogin}>Log in!</button>
                </>
                    }
            </div>
        </div>
    )
}