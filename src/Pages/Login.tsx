import { useState } from "react";
import "../styles/login.css";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");

    const showRegister = () => {
        setIsLogin(false);
        setMessage("");
    };

    const showLogin = () => {
        setIsLogin(true);
        setMessage("");
    };

    const register = () => {
        if (username === "" || password === "") {
            setMessage("How can you register without username and password? Please fill the details.");
            return;
        }

        localStorage.setItem("username", username);
        localStorage.setItem("password", password);

        setMessage("Registration successful! Now login.");

        setUsername("");
        setPassword("");
    };

    const login = () => {
        const storedUser = localStorage.getItem("username");
        const storedPass = localStorage.getItem("password");

        if (username === storedUser && password === storedPass) {
            sessionStorage.setItem("loggedInUser", username);

            setUsername("");
            setPassword("");


            window.location.href = "/home";
        } else {
            setMessage("Invalid credentials. Try again!");
        }
    };

    return (
        <div className="login-container">

            <div className="left">
                <div className="logo">FooodExpresss</div>
                <p className="tagline">
                    Delicious food delivered hot & fresh 🍕🍔🍟
                </p>
            </div>

            <div className="right">
                <div className="form-box">

                    {isLogin && (
                        <div>
                            <h2>Login</h2>

                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button onClick={login}>Login</button>

                            <p className="toggle-link" onClick={showRegister}>
                                Don’t have an account? Register
                            </p>

                            <p className="message">{message}</p>
                        </div>
                    )}
                    {/* register form */}
                    {!isLogin && (
                        <div>
                            <h2>Create Account</h2>

                            <input
                                type="text"
                                placeholder="Choose a Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />

                            <input
                                type="password"
                                placeholder="Choose a Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <button onClick={register}>Register</button>

                            <p className="toggle-link" onClick={showLogin}>
                                Already have an account? Login
                            </p>

                            <p className="message">{message}</p>
                        </div>
                    )}

                </div>
            </div>

        </div>
    );
}