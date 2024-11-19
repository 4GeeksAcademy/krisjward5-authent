import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate;

    function sumbitRequest() {
        actions.addUser(email, password);
    }


    return (
        <form>
            <div className="mb-3">
                <label for="email" className="form-label">Email Address</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    class="form-control" id="email" aria-describedby="emailHelp"
                    required
                />
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Email"
                    class="form-control" id="password" aria-describedby="passwordHelp"
                    required
                />
            </div>
            <div id="passwordHelp" className="form-text">
                We will never share your password with anyone!
            </div>
            <Link to="/login">
                <button type="submit" className="btn btn-primary" onClick={sumbitRequest}>Sign Up</button>
            </Link>
        </form>
    )
}