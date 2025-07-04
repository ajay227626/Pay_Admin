import React, { useContext } from "react";
import { Marginer } from "../marginer";
import { SettingsContext, useLogin } from "../../SettingsProvider/SettingsProvider";

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
                <input type="email" placeholder="Email" onInput={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} />
            </form>
            <Marginer direction="vertical" margin={10} />
            <a className="muted-link" href="#">Forget your password?</a>
            <Marginer direction="vertical" margin="1.6em" />
            <button className="submit-button" type="submit" onClick={(e) => {setIsLoaded(true); handleLogin(e, userRole);}}>Signin</button>
            <Marginer direction="vertical" margin="5px" />
            <p className="line-text">
                Don't have an accoun?{" "}
                <a className="bold-link" onClick={switchToSignup} href="#">Signup</a>
            </p>
        </div>
    );
}