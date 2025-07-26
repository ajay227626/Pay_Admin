import React, { useState } from 'react';
import { LoginForm } from './loginForm';
import { SignupForm } from './signupForm';
import { SettingsContext } from '../SettingsProvider/SettingsProvider';
import './accountbox.css';

export default function WelcomeBox({ userRole }) {
    const [isExpanded, setExpanded] = useState(false);
    const [active, setActive] = useState('signin');
    const [previousActive, setPreviousActive] = useState('signin'); // For direction detection

    const playExpandingAnimation = () => {
        setExpanded(true);
        setTimeout(() => {
            setExpanded(false);
        }, 800);
    };

    const switchToSignup = () => {
        setPreviousActive(active);
        playExpandingAnimation();
        setTimeout(() => {
            setActive('signup');
        }, 400);
    };

    const switchToSignin = () => {
        setPreviousActive(active);
        playExpandingAnimation();
        setTimeout(() => {
            setActive('signin');
        }, 400);
    };

    const contextValue = { switchToSignup, switchToSignin };

    // Determine animation direction
    const slideSideClass = active === 'signin' && previousActive === 'signup' ? 'slide-left' : active === 'signup' && previousActive === 'signin' ? 'slide-right' : '';
    const slideLoginClass = active === 'signin' && previousActive === 'signup' ? 'slide-right' : active === 'signup' && previousActive === 'signin' ? 'slide-left' : '';
    return (
        <SettingsContext.Provider value={contextValue}>
            <div className="welcome-screen" style={{ flexDirection: active === 'signin' ? 'row-reverse' : 'row' }}>
                <div className={`welcome-side-area ${slideSideClass}`}>
                    {active === 'signin' ? (
                        <>
                            <div className="welcome-text">Discover the Innovations at CEOITBOX</div>
                            <p style={{ textAlign: 'center' }}> Join us in exploring the cutting-edge solutions designed for tomorrow's challenges. Our platform offers unparalleled insights and tools to drive your business forward.</p>
                        </>
                    ) : (
                        <>
                            <div className="welcome-text">Welcome to CEOITBOX</div>
                            <p>Become a part of our community and start your journey towards innovation.</p>
                        </>
                    )}
                </div>
                <div className={`welcome-login-area  ${slideLoginClass}`}>
                    <div className="box-container">
                        <div className="top-container">
                            <div className={`backdrop ${isExpanded ? 'expanded' : 'collapsed'}`}></div>
                            <div className="header-container">
                                {active === 'signin' && (
                                    <>
                                        <div className="header-text">Welcome</div>
                                        <div className="header-text">Back</div>
                                        <div className="small-text">Please sign-in to continue!</div>
                                    </>
                                )}
                                {active === 'signup' && (
                                    <>
                                        <div className="header-text">Create</div>
                                        <div className="header-text">Account</div>
                                        <div className="small-text">Please sign-up to continue!</div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="inner-container">
                            {active === 'signin' && <LoginForm userRole={userRole} />}
                            {active === 'signup' && <SignupForm />}
                        </div>
                    </div>
                </div>
            </div>
        </SettingsContext.Provider>
    );
}
