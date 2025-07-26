import React, { useContext } from "react";
import { SettingsContext, useLogin } from "../SettingsProvider/SettingsProvider";

export function LoginForm({ userRole}) {
    const {
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        handleLogin,
        isLoaded,
        setIsLoaded,
        loginStatus
    } = useLogin();

    const { switchToSignup } = useContext(SettingsContext);

    return (
        <div className="boxs-container">
            <form className="form-container">
                <div className="input-group">
                    <input type="email" placeholder="Email" onInput={(e) => setEmail(e.target.value)} autoComplete="new-password" autoCapitalize="off" />
                    <label className="form-label">Login as {userRole === 'minion' ? 'Box' : 'User'}</label>
                </div>
                <div className="input-group">
                    <input type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} autoComplete="new-password" autoCapitalize="off" />
                    <label className="form-label">Password</label>
                </div>
            </form>
            <span style={{ display: "flex", margin: "0.5rem" }} />
            <a className="muted-link" href="#">Forget your password?</a>
            <span style={{ display: "flex", margin: "1rem" }} />
            <button className="submit-button" type="submit" onClick={(e) => {setIsLoaded(true); handleLogin(e, userRole);}}>Signin</button>
            <p className="line-text">
                Don't have an accoun?{" "}
                <a className="bold-link" onClick={switchToSignup} href="#">Signup</a>
            </p>
            <p className="line-text">
                Go to <a className="bold-link" href={userRole === 'minion' ? "/user" : "/admin"}>{userRole === 'minion' ? "User" : "Box"} Login</a> page
            </p>
            <span style={{ display: "flex", margin: "10px" }} />
        </div>
    );
}