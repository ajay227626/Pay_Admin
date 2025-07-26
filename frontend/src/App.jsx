// C:\Users\CBX\Desktop\New Journey\Payment-app\src\App.jsx
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Main from './components/Main/Main';
import { SettingsProvider, SignupProvider, LoginProvider, NotificationProvider, ModalProvider, CustomersProvider, NextIDProvider, UserListsProvider, PagesProvider, WAMessageProvider, EmailMessageProvider, EmailTemplatesProvider } from './components/SettingsProvider/SettingsProvider';
import WelcomeBox from "./components/Login/index";
import NotificationWrapper from './components/Notification/NotificationWrapper';
import ModalWrapper from './components/Modal/ModalWrapper';

function App() {
    return (
        <Router>
            <NotificationProvider>
                <ModalProvider>
                    <EmailTemplatesProvider>
                        <WAMessageProvider>
                            <EmailMessageProvider>
                                <SettingsProvider>
                                    <SignupProvider>
                                        <LoginProvider>
                                            <NextIDProvider>
                                                <CustomersProvider>
                                                    <PagesProvider>
                                                        <UserListsProvider>
                                                            <Routes>
                                                                <Route path="/admin/*" element={<AdminApp />} />
                                                                <Route path="/user/*" element={<UserApp />} />
                                                                <Route path="/" element={<Navigate to="/" replace />} />
                                                                <Route path="*" element={<Navigate to="/" replace />} />
                                                            </Routes>
                                                            <ModalWrapper />
                                                            <NotificationWrapper />
                                                        </UserListsProvider>
                                                    </PagesProvider>
                                                </CustomersProvider>
                                            </NextIDProvider>
                                        </LoginProvider>
                                    </SignupProvider>
                                </SettingsProvider>
                            </EmailMessageProvider>
                        </WAMessageProvider>
                    </EmailTemplatesProvider>
                </ModalProvider>
            </NotificationProvider>
        </Router>
    );
}

// Admin Application Component
function AdminApp() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isAdminLoggedIn = user?.token && user?.userRole === 'Minion';
    if (!isAdminLoggedIn) {
        return (
            <div className="welcome-container">
                <WelcomeBox userRole={'minion'} />
            </div>
        );
    }
    return (
        <>
            <Sidebar userRole={user?.userRole} />
            <Main userRole={user?.userRole} />
        </>
    );
}

// User Application Component
function UserApp() {
    const user = JSON.parse(localStorage.getItem('user'));
    const isUserLoggedIn = user?.token && user?.userRole !== 'Minion';
    if (!isUserLoggedIn) {
        return (
            <div className="welcome-container">
                <WelcomeBox userRole={'user'} />
            </div>
        );
    }
    return (
        <>
            <Sidebar userRole={user?.userRole} />
            <Main userRole={user?.userRole} />
        </>
    );
}

export default App;
