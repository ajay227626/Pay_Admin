// C:\Users\CBX\Desktop\New Journey\Payment-app\src\components\Main\Main.jsx
import React from "react";
import './Main.css';
import Dashboard from "./Dashboard/Dashboard";
import Payments from "./Payments/Payments";
import PDFLayouts from "./PDF_Layouts/PDF_Layouts";
import Settings from "./Settings/Settings";
import Templates from "./Templates/Templates";
import Template_Page from "./Templates/Template_Page";
import Signatures from "./Signatures/Signatures";
import Customers from "./Customers/Customers";
import UserLists from "./Userlist/UserLists";
import { useNotification, useModal, usePages } from "../SettingsProvider/SettingsProvider";
import UserProfile from "../User_Profile/Userprofile"

function Main({ userRole }) {
    const { showModal, closeModal } = useModal();
    const { pages, setPages, itemList } = usePages();
    const { showNotification } = useNotification();
    // Move welcome notification to useEffect to avoid running on every render
    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.fullName) {
            showNotification(`Welcome back ${user.fullName.split(" ")[0]}!`, "positive");
        }
    }, []);

    const openLogoutModal = () => {
        showModal(
            'LOGOUT WARNING',
            () => <p>Are you sure you want to logout?</p>,
            closeModal,
            "Cancel",
            () => {
                localStorage.removeItem("user");
                window.location.reload();
            },
            "Logout"
        );
    };

    const userMenuAction = (event) => {
        event.stopPropagation();
        const userMenu = event.currentTarget.closest('.user-menu');
        const userMenuOptions = document.querySelector('.user-menu-options');
        const actionIcon = userMenu.querySelector('.user-menu i');
        const sidebar = document.querySelector('.sidebar');
        let sidebarWidth = 260;
        if (sidebar) {
            if (sidebar.classList.contains('collapsed')) sidebarWidth = sidebar.offsetWidth * 0.25;
            else sidebarWidth = sidebar.offsetWidth;
        }
        userMenuOptions.style.zIndex = 10;
        userMenuOptions.classList.toggle('active');
        actionIcon.classList.toggle('active');

        const otherActions = document.querySelectorAll('.user-menu-options.active');
        otherActions.forEach(action => {
            if (action !== userMenuOptions) action.classList.remove('active');
        });

        const otherIcons = document.querySelectorAll('.btn-action.active');
        otherIcons.forEach(icon => {
            if (icon !== actionIcon) icon.classList.remove('active');
        });

        document.addEventListener('click', (e) => {
            if (!userMenu.contains(e.target)) {
                userMenuOptions.classList.remove('active');
                actionIcon.classList.remove('active');
            }
        }, { once: true });
    };

    const renderPage = () => {
        const currPage = pages.toLowerCase();
        const currentPage = localStorage.getItem('pages');
        document.querySelectorAll('.page').forEach(page => {
            if (currPage === currentPage) page.classList.add('active');
            else page.classList.remove('active');
        });

        switch (currPage) {
            case 'dashboard': return <Dashboard status="active" />;
            case 'payments': return <Payments status="active" />;
            case 'pdf layouts': return <PDFLayouts status="active" />;
            case 'email templates': return <Templates status="active" />;
            case 'signatures': return <Signatures status="active" />;
            case 'customers': return <Customers status="active" />;
            case 'users': return <UserLists status="active" />;
            case 'settings': return <Settings status="active" />;
            case 'user profile': return <UserProfile status="active" role={userRole} />;
            case 'email template':
            case 'pdf template': return <Template_Page status="active" />;
            default: return <Dashboard status="active" />;
        }
    }
    const image = "";
    const user = JSON.parse(localStorage.getItem('user'));
    const namePieces = `${user.fullName ? user.fullName[0] : 'U'}${user.fullName.split(' ')[1][0] ? user.fullName.split(' ')[1][0] : user.fullName[1]}`;

    return (
        <main className="main-content">
            <header className="header">
                <div className="header-left">
                    <button className="mobile-menu-btn" id="mobileMenuBtn">
                        <i className="fas fa-bars"></i>
                    </button>
                    <h1 id="pageTitle">Dashboard</h1>
                </div>
                <div className="header-right">
                    <div className="search-box">
                        <i className="fas fa-search"></i>
                        <input type="text" placeholder="Search..." id="globalSearch" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className="notifications">
                            <button className="notification-btn">
                                <i className="fas fa-bell tada-hover"></i>
                                <span className="notification-badge">3</span>
                            </button>
                        </div>
                        <div className="user-menu" onClick={userMenuAction}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {
                                    image ? (
                                        <img src={image} alt="User" className="profile-image" />
                                    ) : (
                                        <div className="user-name-initial">{namePieces}</div>
                                    )
                                }
                                <span className="user-name">{JSON.parse(localStorage.getItem("user"))?.fullName || 'Admin User'}</span>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                            <div id="userMenuOptions" className="user-menu-options">
                                <div className="user-menu-options-arrow" />
                                <div className="user-menu-option" onClick={() => setPages('user profile')}>
                                    <i className="fas fa-user"></i> User Profile
                                </div>
                                <div className="user-menu-option" onClick={openLogoutModal}>
                                    <i className="fas fa-sign-out-alt"></i> Log Out
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="page-content">
                {renderPage()}
            </div>
        </main>
    );
}

export default Main;