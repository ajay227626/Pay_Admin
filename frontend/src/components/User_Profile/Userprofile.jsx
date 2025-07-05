// C:\Users\CBX\Desktop\New Journey\Payment-app\src\components\User_Profile\Userprofile.jsx
import React from "react";
import './userprofile.css'
import { useModal } from "../SettingsProvider/SettingsProvider"


const EditableField = ({ label, value, onChange, isEditing, setIsEditing }) => {
    const type = label === 'Email' ? "email" : label === 'Phone' ? "tel" : label.includes('Password') ? "password" : "text";
    const pattern = label === 'Email' ? "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" : label === 'Phone' ? "[0-9]{10}" : label.includes('Password') ? "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" : null;
    const title = label === 'Email' ? "Enter a valid email address" : label === 'Phone' ? "Enter a valid phone number" : label.includes('Password') ? "Must contain at least one uppercase letter, one lowercase letter, one number and one special character, and at least 8 or more characters" : `Enter ${label}`;
    const length = label === 'Phone' ? 10 : label.includes('Password') ? 20 : null;
    const capitalize = label === 'Name' ? "on" : "off";
    const autocomplete = label === 'Email' ? "email" : "off";
    const name = label?.replace(' ', '')[0].toLowerCase() + label?.replace(' ', '')?.slice(1);
    return (
        <div className="edit-field">
            <label>{label}</label>
            <input type={type} value={value} name={name} readOnly={!isEditing} onChange={(e) => onChange(e.target.value)} placeholder={label} pattern={pattern} title={title} maxLength={length} autoCapitalize={capitalize} autoComplete={autocomplete} />
            <span className={`edit-icon ${isEditing ? '' : 'active'}`} onClick={() => setIsEditing(!isEditing)}><i className="fas fa-pencil"></i></span>
            <span className={`save-icon ${isEditing ? 'active' : ''}`} onClick={() => setIsEditing(false)}><i className="fas fa-save"></i></span>
            <span className={`cross-icon ${isEditing ? 'active' : ''}`} onClick={() => setIsEditing(false)}><i className="fas fa-times"></i></span>
        </div>
    );
};

function UserProfile({ status, role = "Minion" }) {
    const { showModal, closeModal } = useModal();
    const [ isFirstNameEditing, setIsFirstNameEditing ] = React.useState(false);
    const [ isLastNameEditing, setIsLastNameEditing ] = React.useState(false);
    const [ isEmailEditing, setIsEmailEditing ] = React.useState(false);
    const [ isPhoneEditing, setIsPhoneEditing ] = React.useState(false);
    const [ isDepartmentEditing, setIsDepartmentEditing ] = React.useState(false);
    const [ isPasswordEditing, setIsPasswordEditing ] = React.useState(false);
    const [ isConfirmPasswordEditing, setIsConfirmPasswordEditing ] = React.useState(false);
    const isAdmin = role === "Minion";
    const image = "";
    const user = JSON.parse(localStorage.getItem('user'));
    const namePieces = `${user.fullName ? user.fullName[0] : 'U'}${user.fullName.split(' ')[1][0] ? user.fullName.split(' ')[1][0] : user.fullName[1]}`;
    const [ userFirstName, setUserFirstName ] = React.useState(user.fullName ? user.fullName?.split(' ')[0] : 'User');
    const [ userLastName, setUserLastName ] = React.useState(user.fullName ? user.fullName?.split(' ')[1] : '');
    const userStatus = 'Active';
    const [ userEmail, setUserEmail ] = React.useState(user.email || '');
    const [ userPhone, setUserPhone ] = React.useState(user.phone || '##########');
    const [ userRole, setUserRole ] = React.useState(user.userRole || '');
    const [ userDepartment, setUserDepartment ] = React.useState(user.department || '');
    const [ userLastLogins, setUserLastLogins ] = React.useState(user.lastLoginLogs || []);
    const [ newPassword, setNewPassword ] = React.useState('');
    const [ confirmPassword, setConfirmPassword ] = React.useState('');
    const switchTab = (event, profileName) => {
        const profileContents = document.querySelectorAll('.profile-content');
        profileContents.forEach(content => content.classList.remove('active'));
        const profileTabs = document.querySelectorAll('.profile-tab');
        profileTabs.forEach(tab => tab.classList.remove('active'));
        document.getElementById(profileName).classList.add('active');
        event.target.classList.add('active');
    }
    const openUserListsModal = () => {
        showModal(
            'LOGOUT WARNING',
            () => <p>Are you sure you want to save preferences?</p>,
            closeModal,
            "Cancel",
            'savePreferencesSave',
            "Logout"
        );
    };
    return (
        <section id="userProfile-page" className={`page ${status}`}>
            <div className="profile-page">
                <div className="container">
                    {/* Header */}
                    <div className="page-header">
                        <div className="page-title">
                            <h2>{isAdmin ? "Admin Dashboard" : "User Profile"}</h2>
                            <p>{isAdmin ? "Manage platform settings and monitor activity" : "View and manage your personal information"}</p>
                        </div>
                        <div className="page-actions">
                            <button className="btn btn-primary" id="savePreferencesBtn" onClick={openUserListsModal}><i className="fas fa-save"></i> Save Preferences</button>
                        </div>
                    </div>
                    <div className="profile-container">
                        <div className="profile-view-section">
                            {/* Profile Card */}
                            <div className="profile-card">
                                {
                                    image ? (
                                        <img src={image} alt="User" className="profile-image" />
                                    ) : (
                                        <div className="profile-initials">{namePieces}</div>
                                    )
                                }
                                <div className="profile-details">
                                    <h2 className="name">{user.fullName}</h2>
                                    <p className="role">{role || 'User'} | CEOITBOX</p>
                                    <p className="last-login">Last Login:<br /><span>{user.lastLogin}</span></p>
                                </div>
                            </div>
                            {/* Info Panels */}
                            <div className="info-panels">
                                <div className="profile-info-panel">
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                        <h3>Basic Info</h3>
                                        <span style={{ backgroundColor: userStatus === "Active" ? "var(--success-color)" : "var(--danger-color)", fontSize: "0.8rem", padding: "0.2rem 0.5rem", borderRadius: "5px" }}>{userStatus}</span>
                                    </div>
                                    <div className="info-panel-list">
                                        <div className="info-panel-li"><span><i className="fas fa-envelope"></i><strong>Email:</strong></span> {userEmail}</div>
                                        <div className="info-panel-li"><span><i className="fas fa-phone"></i><strong>Phone:</strong></span> +91 {userPhone}</div>
                                        <div className="info-panel-li"><span><i className="fas fa-user-tie"></i><strong>Role:</strong></span> {userRole === "Minion" ? "Super Admin" : userRole}</div>
                                        <div className="info-panel-li"><span><i className="fas fa-building"></i><strong>Department:</strong></span> {userDepartment}</div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile-edit-section">
                            <div className="profile-tabs">
                                <button className="profile-tab active" onClick={(e) => switchTab(e, 'profile')}><i className="fas fa-user"></i> Profile</button>
                                <button className="profile-tab" onClick={(e) => switchTab(e, 'activity')}><i className="fas fa-history"></i> Activity</button>
                                <button className="profile-tab" onClick={(e) => switchTab(e, 'security')}><i className="fas fa-lock"></i> Security</button>
                                <button className="profile-tab" onClick={(e) => switchTab(e, 'settings')}><i className="fas fa-cog"></i> Settings</button>
                            </div>
                            <div className="profile-content active" id="profile">
                                <div className="profile-details-edit">
                                    <h3>Basic Info</h3>
                                    <div className="question-grid">
                                        <EditableField label="First Name" value={userFirstName} onChange={setUserFirstName} isEditing={isFirstNameEditing} setIsEditing={setIsFirstNameEditing} id="userListFirstName" />
                                        <EditableField label="Last Name" value={userLastName} onChange={setUserLastName} isEditing={isLastNameEditing} setIsEditing={setIsLastNameEditing} id="userListLastName" />
                                    </div>
                                    <EditableField label="Email" value={userEmail} onChange={setUserEmail} isEditing={isEmailEditing} setIsEditing={setIsEmailEditing} id="userListEmail" />
                                    <div className="question-grid">
                                        <EditableField label="Phone" value={userPhone} onChange={setUserPhone} isEditing={isPhoneEditing} setIsEditing={setIsPhoneEditing} id="userListPhone" />
                                        <EditableField label="Department" value={userDepartment} onChange={setUserDepartment} isEditing={isDepartmentEditing} setIsEditing={setIsDepartmentEditing} id="userListDepartment" />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content" id="activity">
                                {isAdmin ? (
                                    <div className="info-panel">
                                        <h3>Admin Insights</h3>
                                        <div className="insight-list">
                                            <div>💼 Total Users: <strong>158</strong></div>
                                            <div>📦 Active Accounts: <strong>123</strong></div>
                                            <div>🧾 Monthly Reports Generated: <strong>89</strong></div>
                                            <div>🔒 Failed Login Attempts: <strong>7</strong></div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="info-panel">
                                        <h3>Recent Activity</h3>
                                        <div className="activity-list">
                                            {userLastLogins.map((login, index) => (
                                                <div key={index}>
                                                    <div className="activity-child">
                                                        <div>
                                                            <i className={login.status === "success" ? "fas fa-check" : "fas fa-times"} style={{ color: login.status === "success" ? 'var(--success-color)' : 'var(--danger-color)', marginRight: '0.5rem', fontWeight: '600' }}></i>
                                                            <span>
                                                                {login.status === 'success' ? 'Logged in' : 'Failed login '}
                                                                {login.userAgent?.includes("Chrome") && ' from Chrome '}
                                                                {login.userAgent?.includes("Firefox") && ' from Firefox '}
                                                                {login.userAgent?.includes("Edg") && ' from Edge '}
                                                            </span>
                                                            <span style={{ textTransform: 'capitalize' }}>{login.device}</span>
                                                        </div>
                                                        <div style={{ marginLeft: '1.5rem', fontSize: '0.85rem', color: '#888' }}>
                                                            {login.timestamp}
                                                            {/* <br />IP: {login.ipAddress} */}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="profile-content" id="security">
                                {/* Security */}
                                <div className="profile-details-edit">
                                    <h3>Security</h3>
                                    <div className="preference-options">
                                        <EditableField label="New Password" value={''} onChange={setNewPassword} isEditing={isPasswordEditing} setIsEditing={setIsPasswordEditing} id="userListPassword" />
                                        <EditableField label="Confirm Password" value={''} onChange={setConfirmPassword} isEditing={isConfirmPasswordEditing} setIsEditing={setIsConfirmPasswordEditing} id="userListConfirmPassword" />
                                    </div>
                                </div>
                            </div>
                            <div className="profile-content" id="settings">
                                {/* Settings */}
                                <div className="preferences">
                                    <h3>Settings</h3>
                                    <div className="preference-options">
                                        <label>
                                        <input type="checkbox" /> Email Notifications
                                        </label>
                                        <label>
                                        <input type="checkbox" /> Auto Logout after <input className="auto-logout" type="number" id="autoLogout" min="1" step="1" max="300" defaultValue="30" onInput={(e) => e.target.value = e.target.value > 300 ? 300 : e.target.value} /> min(s)
                                        </label>
                                        <label>
                                        <input type="checkbox" defaultChecked /> Show Ledger Summary on Dashboard
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserProfile;