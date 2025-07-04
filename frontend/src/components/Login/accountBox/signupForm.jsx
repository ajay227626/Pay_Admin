import React, { useContext, useEffect } from "react";
import { Marginer } from "../marginer";
import { SettingsContext, useSignup } from "../../SettingsProvider/SettingsProvider";

export function SignupForm(props) {
    const {
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        phone,
        setPhone,
        department,
        setDepartment,
        handleSignup,
        isLoaded,
        setIsLoaded
    } = useSignup();

    const { switchToSignin } = useContext(SettingsContext);
    return (
        <div className="boxs-container">
            <form className="form-container">
                <input type="text" name="fullName" placeholder="Full name" onInput={(e) => setFullName(e.target.value)} required />
                <input type="email" name="email" placeholder="Email" onInput={(e) => setEmail(e.target.value)} required/>
                <input type="password" name="password" placeholder="Password" onInput={(e) => setPassword(e.target.value)} required />
                <input type="password" name="confirmPassword" placeholder="Confirm password" onInput={(e) => setConfirmPassword(e.target.value)} required />
                <input type="text" name="phone" placeholder="Phone" onInput={(e) => setPhone(e.target.value)} required />
                <select name="department" placeholder="Department" onChange={(e) => setDepartment(e.target.value)} required>
                    <option value="">Select Department</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Sales">Sales</option>
                    <option value="Marketing">Marketing</option>
                </select>
            </form>
            <Marginer direction="vertical" margin={10} />
            <button className="submit-button" type="submit" onClick={(e) => {setIsLoaded(true); handleSignup(e);}} disabled={isLoaded}>Signup</button>
            <Marginer direction="vertical" margin="5px" />
            <p className="line-text">
                Already have an account?{" "}
                <a className="bold-link" onClick={switchToSignin} href="#">Signin</a>
            </p>
        </div>
    );
}