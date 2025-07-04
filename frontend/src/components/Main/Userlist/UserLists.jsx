import "./userlist.css";
import React, { use, useEffect, useState } from "react";
import { useNotification, useUserLists, useModal, generateRandomPassword } from "../../SettingsProvider/SettingsProvider";
import { set } from "mongoose";

function UserListsList({ userListData, setAllCheckboxSelected, switchTab, setUserListID }) {
    const [userListCount, setUserListCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { showModal, closeModal } = useModal();
    const {
        userListFirstName,
        setUserListFirstName,
        userListLastName,
        setUserListLastName,
        userListRole,
        setUserListRole,
        userListAddress,
        setUserListAddress,
        userListPhone,
        setUserListPhone,
        userListSecondaryPhone,
        setUserListSecondaryPhone,
        userListEmail,
        setUserListEmail,
        userListPersonalEmail,
        setUserListPersonalEmail,
        userListDepartment,
        setUserListDepartment,
        userListAllowedDevices,
        setUserListAllowedDevices,
        userListAllowedDevicesCount,
        setUserListAllowedDevicesCount,
        userListAllowLogin,
        setUserListAllowLogin,
        userListPassword,
        setUserListPassword,
        userListStatus,
        setUserListStatus,
        userListLastLogin,
        setUserListLastLogin,
        userListOtpNeeded,
        setUserListOtpNeeded,
        handleUserListEntry,
        downloadType,
        setDownloadType,
        fileName,
        setFileName,
        userLists,
        setUserLists,
        filteredData,
        setFilteredData,
        userListID,
        isLoaded
    } = useUserLists();

    useEffect(() => {
        setUserListCount(userListData.length);
        setTotalPages(Math.ceil(userListCount / rowsPerPage))
    });

    const viewUserListModal = (userList) => {
        return (
            <div className="userList-modal-container disabled">
                <div className="modal-tabs">
                    <button className="tab-button active" onClick={(e) => switchTab(e, 'userInfo')}>
                        <i className="fas fa-user"></i> User Info
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'contactInfo')}>
                        <i className="fas fa-phone"></i> User Contact
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'moderation')}>
                        <i className="fas fa-ban"></i> Moderation
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'security')}>
                        <i className="fas fa-lock"></i> Security
                    </button>
                </div>
                <div id="newUserListForm">
                    {/* Basic Info Tab */}
                    <div id="basic" className="tab-content active">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListFirstName">First Name <span className="required">*</span></label>
                                <input type="text" id="userListFirstName" readOnly value={userList.userListFirstName} name="firstName" placeholder="First name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListLastName">Last Name <span className="required">*</span></label>
                                <input type="text" id="userListLastName" readOnly value={userList.userListLastName} name="lastName" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListRole">Role <span className="required">*</span></label>
                                <input id="userListRole" name="type" readOnly value={userList.userListRole} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListDepartment">Department</label>
                                <input id="userListDepartment" readOnly value={userList.userListDepartment} name="contact_info.department" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListAddress">Address</label>
                            <textarea id="userListAddress" readOnly value={userList.userListAddress} name="address" placeholder="Complete address" rows="3"></textarea>
                        </div>
                    </div>
                    {/* Contact Tab */}
                    <div id="contactInfo" className="tab-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListPhone">Primary Phone <span className="required">*</span></label>
                                <input type="tel" id="userListPhone" readOnly value={userList.userListPhone} name="contact_info.phone" required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListSecondaryPhone">Secondary Phone</label>
                                <input type="tel" id="userListSecondaryPhone" readOnly value={userList.userListSecondaryPhone} name="contact_info.secondary_phone" placeholder="+91 9876543210" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListEmail">Email Address <span className="required">*</span></label>
                            <input type="email" id="userListEmail" readOnly value={userList.userListEmail} name="contact_info.email" required placeholder="userList@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListPersonalEmail">Personal Email</label>
                            <input type="email" id="userListPersonalEmail" readOnly value={userList.userListPersonalEmail} name="contact_info.personal_email" placeholder="userList@example.com" />
                        </div>
                    </div>
                    {/* Moderation Tab */}
                    <div id="moderation" className="tab-content">
                        <div className="form-group">
                            <label htmlFor="userListAllowedDevices">Allowed Devices</label>
                            <input type="number" id="userListAllowedDevices" readOnly value={userList.userListAllowedDevices} name="contact_info.allowed_devices" placeholder="0" />
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListAllowedDevicesCount">Allowed Devices Count</label>
                                <input id="userListAllowedDevicesCount" readOnly value={userList.userListAllowedDevicesCount} name="contact_info.allowed_devices_count" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListAllowLogin">Allow Login</label>
                                <input id="userListAllowLogin" readOnly value={userList.userListAllowLogin ? 'Yes' : 'No'} name="contact_info.allow_login" />
                            </div>
                        </div>
                    </div>
                    {/* Security Tab */}
                    <div id="security" className="tab-content">
                        <div className="form-group">
                            <label htmlFor="userListPassword">Password</label>
                            <input type="password" id="userListPassword" readOnly value={userList.userListPassword} name="contact_info.password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListStatus">Status</label>
                            <input id="userListStatus" readOnly value={userList.userListStatus} name="contact_info.status" />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const openViewModal = (userList) => {
        showModal(
            'View User Details',
            viewUserListModal(userList),
            closeModal,
            'Close'
        )
    }

    const generatePassword = () => {
        const password = generateRandomPassword(12);
        console.log(password);
        document.getElementById('userListPassword').value = password;
    }

    const editUserListModal = (userList) => {
        return (
            <div className="userList-modal-container">
                <div className="modal-tabs">
                    <button className="tab-button active" onClick={(e) => switchTab(e, 'userInfo')}>
                        <i className="fas fa-user"></i> User Info
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'contactInfo')}>
                        <i className="fas fa-phone"></i> User Contact
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'moderation')}>
                        <i className="fas fa-ban"></i> Moderation
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'security')}>
                        <i className="fas fa-lock"></i> Security
                    </button>
                </div>
                <div id="newUserListForm">
                    {/* User Info Tab */}
                    <div id="userInfo" className="tab-content active">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListFirstName">First Name <span className="required">*</span></label>
                                <input type="text" id="userListFirstName" defaultValue={userList.userListFirstName} onChange={(e) => { setUserListFirstName(e.target.value?.trim()), handleUserListEntry(e) }} name="firstName" placeholder="First name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListLastName">Last Name <span className="required">*</span></label>
                                <input type="text" id="userListLastName" defaultValue={userList.userListLastName} onChange={(e) => { setUserListLastName(e.target.value?.trim()), handleUserListEntry(e) }} name="lastName" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListRole">Role <span className="required">*</span></label>
                                <select id="userListRole" name="role" defaultValue={userList.userListRole} onChange={(e) => { setUserListRole(e.target.value), handleUserListEntry(e) }} required>
                                    <option value="">Select User Role</option>
                                    <option value="Viewer">Viewer</option>
                                    <option value="Accountant">Accountant</option>
                                    {/* <option value="Manager">Manager</option> */}
                                    <option value="Admin">Admin</option>
                                    <option value="Super Admin">Super Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListDepartment">Department</label>
                                <select id="userListDepartment" defaultValue={userList.userListDepartment} onChange={(e) => setUserListDepartment(e.target.value)} name="moderation.department">
                                    <option value="">Select Department</option>
                                    <option value="Sales">Sales</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="HR">HR</option>
                                    <option value="IT">IT</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Operations">Operations</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListAddress">Address</label>
                            <textarea id="userListAddress" defaultValue={userList.userListAddress} onChange={(e) => setUserListAddress(e.target.value?.trim())} name="address" placeholder="Complete address" rows="3"></textarea>
                        </div>
                    </div>
                    {/* Contact Tab */}
                    <div id="contactInfo" className="tab-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListPhone">Primary Phone <span className="required">*</span></label>
                                <input type="tel" id="userListPhone" defaultValue={userList.userListPhone} onChange={(e) => setUserListPhone(e.target.value?.trim())} name="contact_info.phone" required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListSecondaryPhone">Secondary Phone</label>
                                <input type="tel" id="userListSecondaryPhone" defaultValue={userList.userListSecondaryPhone} onChange={(e) => setUserListSecondaryPhone(e.target.value?.trim())} name="contact_info.secondary_phone" placeholder="+91 9876543210" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListEmail">Email Address <span className="required">*</span></label>
                            <input type="email" id="userListEmail" defaultValue={userList.userListEmail} onChange={(e) => setUserListEmail(e.target.value?.trim())} name="contact_info.email" required placeholder="userList@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListPersonalEmail">Personal Email Address <span className="required">*</span></label>
                            <input type="email" id="userListPersonalEmail" defaultValue={userList.userListPersonalEmail} onChange={(e) => setUserListPersonalEmail(e.target.value?.trim())} name="contact_info.email" required placeholder="userList@example.com" />
                        </div>
                    </div>
                    {/* Moderation Tab */}
                    <div id="moderation" className="tab-content">
                        <div className="form-group" style={{marginBottom: '16px'}}>
                            <label htmlFor="userListAllowedDevices">Allowed Devices</label>
                            <select id="userListAllowedDevices" defaultValue={userList.userListAllowedDevices} onChange={(e) => setUserListAllowedDevices(e.target.value)} name="moderation.allowed_devices">
                                <option value="">Select Devices</option>
                                <option value="All">All</option>
                                <option value="Desktop">Desktop</option>
                                <option value="Mobile">Mobile</option>
                                <option value="Tablet">Tablet</option>
                                {/* <option value="Other">Other</option> */}
                            </select>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListAllowedDevicesCount">Number of Allowed Devices</label>
                                <select id="userListAllowedDevicesCount" defaultValue={userList.userListAllowedDevicesCount} onChange={(e) => setUserListAllowedDevicesCount(e.target.value)} name="moderation.allowed_devices_count">
                                    <option value="">Select Devices</option>
                                    <option value="All">All</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListAllowLogin">Allow Login</label>
                                <select id="userListAllowLogin" defaultValue={userList.userListAllowLogin} onChange={(e) => setUserListAllowLogin(e.target.value)} name="moderation.allow_login">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Security Tab */}
                    <div id="security" className="tab-content">
                        <div className="form-grid" style={{marginBottom: '16px'}}>
                            <div className="form-group">
                                <label htmlFor="userListPassword">Generate Password</label>
                                <div className="password-container">
                                    <input type="password" id="userListPassword" onChange={(e) => setUserListPassword(e.target.value.trim || userList.userListPassword)} name="password"  placeholder="Set Password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="Must contain at least one uppercase letter, one lowercase letter, one number and one special character, and at least 8 or more characters" maxLength="20" autoComplete="new-password" autoCapitalize="off" autoCorrect="off"></input>
                                    <button type="button" title="Generate Password" onClick={generatePassword}><i className="fa fa-key"></i></button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListStatus">Set Status</label>
                                <select id="userListStatus" defaultValue={userList.userListStatus} onChange={(e) => setUserListStatus(e.target.value)} name="status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListOtpNeeded">Set OTP Needed</label>
                            <select id="userListOtpNeeded" defaultValue={userList.userListOtpNeeded} onChange={(e) => setUserListOtpNeeded(e.target.value)} name="security.otp_needed">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const openEditModal = (userList) => {
        showModal(
            'Edit UserList Details',
            editUserListModal(userList),
            closeModal,
            'Close',
            'newUserListSave',
            'Update'
        )
    }
    
    const showHidePassword = (e) => {
        const target = e.target.closest('button');
        if (!target) return;
        e.preventDefault();
        const input = target.previousElementSibling;
        const isPasswordVisible = input.type === 'text';
        input.type = isPasswordVisible ? 'password' : 'text';
        target.classList.toggle('show', !isPasswordVisible);
    }
    return (
        <>
            <div className="userList-list-container">
                <table className="userList-list">
                    <thead className="userList-list-header">
                        <tr>
                            <th></th>
                            <th className="user-field-header show">SR#</th>
                            <th className="user-field-header show">First Name</th>
                            <th className="user-field-header show">Last Name</th>
                            <th className="user-field-header show">Role</th>
                            <th className="user-field-header show">Department</th>
                            <th className="user-field-header show">Address</th>
                            <th className="user-field-header show">Phone</th>
                            <th className="user-field-header show">Secondary Phone</th>
                            <th className="user-field-header show">Email</th>
                            <th className="user-field-header show">Personal Email</th>
                            <th className="user-field-header show">Allowed Devices</th>
                            <th className="user-field-header show">Allowed Device Count</th>
                            <th className="user-field-header show">Allow Login</th>
                            <th className="user-field-header show">Password</th>
                            <th className="user-field-header show">Status</th>
                            <th className="user-field-header show">OTP Needed?</th>
                            <th className="user-field-header show">Last Login</th>
                            <th className="user-field-header show">Created On</th>
                            <th className="user-field-header show">Created By</th>
                            <th className="user-field-header show">Action</th>
                        </tr>
                    </thead>
                    <tbody className="userList-list-body">
                        {userListCount > 0 ? (
                            userListData.map((userList, index) =>
                                (index < rowsPerPage * currentPage && index >= rowsPerPage * (currentPage - 1)) ? (
                                    <tr className="userList-list-row" key={index}>
                                        <td style={{ alignContent: 'end', padding: 'var(--padding)' }}><input type="checkbox" /></td>
                                        <td className="user-field-data show">{index + 1}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListFirstName || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListLastName || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListRole || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListDepartment || '-'}</td>
                                        <td className="user-field-data show" style={ userList.userListAddress ? { textTransform: 'capitalize' } : { textAlign: 'center' }}>{userList.userListAddress || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListPhone || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListSecondaryPhone || '-'}</td>
                                        <td className="user-field-data show" style={ userList.userListEmail ? { textTransform: 'lowercase' } : { textAlign: 'center' }}>{userList.userListEmail || '-'}</td>
                                        <td className="user-field-data show" style={ userList.userListPersonalEmail ? { textTransform: 'lowercase' } : { textAlign: 'center' }}>{userList.userListPersonalEmail || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListAllowedDevices || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListAllowedDevicesCount || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListAllowLogin ? 'Yes' : 'No'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>
                                            <input type="password" style={{ border: 'none', color: 'var(--text-primary)', backgroundColor: 'var(--surface-color)', width: '9rem', textAlign: 'center' }} value={userList.userListPassword} disabled />
                                            <button className="btn btn-primary" style={{ borderRadius: '50%', padding: '0.3rem', backgroundColor: 'var(--surface-color)', border: 'none', color: 'var(--ceoitbox-dark-color)', cursor: 'pointer' }} onClick={showHidePassword}><i className="fa fa-eye"></i></button>
                                        </td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}><button className={`btn ${userList.userListStatus === 'Active' ? 'btn-active' : userList.userListStatus === 'Inactive' ? 'btn-inactive' : 'btn-blocked'}`}>{userList.userListStatus || '-'}</button></td>
                                        <td className="user-field-data show" style={{ textAlign: 'center', alignContent: 'end' }}><input type="checkbox" style={{ accentColor: 'var(--ceoitbox-dark-color)' }} checked={userList.userListOtpNeeded} {...userList.userListOtpNeeded ? { readOnly: true } : { disabled: true }} /></td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListLastLogin || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListCreatedOn || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center' }}>{userList.userListCreatedBy || '-'}</td>
                                        <td className="user-field-data show" style={{ textAlign: 'center', display: 'flex', gap: '5px' }}>
                                            <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%'}} onClick={() => { openViewModal(userList) }}><i className="fas fa-eye"></i></button>
                                            <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%'}} onClick={() => { openEditModal(userList) }}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-danger" style={{ padding: '0.5rem', borderRadius: '50%'}}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ) : null
                            )) : (
                                <tr className="userList-list-row">
                                    <td colSpan="18" className="text-center" style={{ padding: "2rem" }}>
                                        <i className="fas fa-inbox" style={{ fontSize: "2rem", color: "var(--ceoitbox-dark-color)", marginBottom: "1rem" }}></i>
                                        <p style={{ color: "var(--ceoitbox-dark-color)" }}>No userLists found</p>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="list-pagination">
                <div className="pagination">
                    <button className={`btn btn-${currentPage === 1 ? 'secondary' : 'primary'}`} onClick={() => {
                        setCurrentPage(currentPage - 1),
                        setAllCheckboxSelected(false)
                    }} disabled={currentPage === 1}><i className="fas fa-angle-left"></i></button>
                    <p>Page <span className="current-page">{currentPage}</span> of <span className="page-count">{totalPages}</span></p>
                    <button className={`btn btn-${currentPage === totalPages ? 'secondary' : 'primary'}`} onClick={() => {
                        setCurrentPage(currentPage + 1),
                        setAllCheckboxSelected(false)
                    }} disabled={currentPage === totalPages}><i className="fas fa-angle-right"></i></button>
                </div>
                <div className="results-per-page-container">
                    <div className="results-per-page">
                        <p>Show:</p>
                        <select name="results-per-page" id="results-per-page" onChange={(e) => {
                            setRowsPerPage(e.target.value),
                            setTotalPages(Math.ceil(userListCount / rowsPerPage))
                        }} disabled={userListCount === 0} defaultValue={10}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

function UserListsGrid({ userListData }) {
    return (
        <div className="userList-grid-container">
            {
                userListData.map((userList, index) => (
                    <div className="userList-grid" key={index}>
                        {userList.userListFirstName && <div className="userList-grid-name" title={'Full Name'}><i className="fas fa-user facolor"></i>{userList.userListFirstName} {userList.userListLastName}</div>}
                        {userList.userListRole && <div className="userList-grid-role" title={'Role'}><i className="fas fa-user-tag facolor"></i>{userList.userListRole}</div>}
                        {userList.userListDepartment && <div className="userList-grid-department" title={'Department'}><i className="fas fa-user-tag facolor"></i>{userList.userListDepartment}</div>}
                        {userList.userListAddress && <div className="userList-grid-address" title={'Address'}><i className="fas fa-map-marker-alt facolor"></i>{userList.userListAddress}</div>}
                        {userList.userListPhone && <div className="userList-grid-phone" title={'Phone'}><i className="fas fa-phone facolor"></i>{userList.userListPhone}</div>}
                        {userList.email && <div className="userList-grid-email" title={'Email'}><i className="fas fa-envelope facolor"></i>{userList.email}</div>}
                    </div>
                ))
            }
        </div>
    );
}

function UserLists({ status }) {
    const [userTableHeaders, setUserTableHeaders] = React.useState([]);
    const [colData, setColData] = React.useState('');
    const [currentView, setCurrentView] = React.useState('list');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [uniqueValues, setUniqueValues] = React.useState([]);
    const [allCheckboxSelected, setAllCheckboxSelected] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const [visibleColumns, setVisibleColumns] = useState(() => {
        const saved = localStorage.getItem("userColumnVisibility");
        return saved ? JSON.parse(saved) : Array(userTableHeaders.length).fill(true); // all visible by default
    });

    const { showModal, closeModal } = useModal();
    const {
        userListFirstName,
        setUserListFirstName,
        userListLastName,
        setUserListLastName,
        userListRole,
        setUserListRole,
        userListAddress,
        setUserListAddress,
        userListPhone,
        setUserListPhone,
        userListSecondaryPhone,
        setUserListSecondaryPhone,
        userListEmail,
        setUserListEmail,
        userListPersonalEmail,
        setUserListPersonalEmail,
        userListDepartment,
        setUserListDepartment,
        userListAllowedDevices,
        setUserListAllowedDevices,
        userListAllowedDevicesCount,
        setUserListAllowedDevicesCount,
        userListAllowLogin,
        setUserListAllowLogin,
        userListPassword,
        setUserListPassword,
        userListStatus,
        setUserListStatus,
        userListLastLogin,
        setUserListLastLogin,
        userListOtpNeeded,
        setUserListOtpNeeded,
        handleUserListEntry,
        downloadType,
        setDownloadType,
        fileName,
        setFileName,
        userLists,
        setUserLists,
        filteredData,
        setFilteredData,
        fetchUserLists,
        userListID,
        setUserListID,
        isLoaded
    } = useUserLists();

    const switchTab = (event, tabName) => {
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');
    }

    const generatePassword = () => {
        const password = generateRandomPassword(12);
        console.log(password);
        document.getElementById('userListPassword').value = password;
    }

    const newUserListModal = () => {
        return (
            <div className="userList-modal-container">
                <div className="modal-tabs">
                    <button className="tab-button active" onClick={(e) => switchTab(e, 'userInfo')}>
                        <i className="fas fa-user"></i> User Info
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'contactInfo')}>
                        <i className="fas fa-phone"></i> User Contact
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'moderation')}>
                        <i className="fas fa-ban"></i> Moderation
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'security')}>
                        <i className="fas fa-lock"></i> Security
                    </button>
                </div>
                <div id="newUserListForm">
                    {/* User Info Tab */}
                    <div id="userInfo" className="tab-content active">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListFirstName">First Name <span className="required">*</span></label>
                                <input type="text" id="userListFirstName" onChange={(e) => { setUserListFirstName(e.target.value?.trim()), handleUserListEntry(e) }} name="firstName" placeholder="First name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListLastName">Last Name <span className="required">*</span></label>
                                <input type="text" id="userListLastName" onChange={(e) => { setUserListLastName(e.target.value?.trim()), handleUserListEntry(e) }} name="lastName" placeholder="Last name" />
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListRole">Role <span className="required">*</span></label>
                                <select id="userListRole" name="role" defaultValue='Selected UserList Role' onChange={(e) => { setUserListRole(e.target.value), handleUserListEntry(e) }} required>
                                    <option value="">Select User Role</option>
                                    <option value="Viewer">Viewer</option>
                                    <option value="Accountant">Accountant</option>
                                    {/* <option value="Manager">Manager</option> */}
                                    <option value="Admin">Admin</option>
                                    <option value="Super Admin">Super Admin</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListDepartment">Department</label>
                                <select id="userListDepartment" onChange={(e) => setUserListDepartment(e.target.value)} name="moderation.department">
                                    <option value="">Select Department</option>
                                    <option value="Sales">Sales</option>
                                    <option value="HR">HR</option>
                                    <option value="IT">IT</option>
                                    <option value="Finance">Finance</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListAddress">Address</label>
                            <textarea id="userListAddress" onChange={(e) => setUserListAddress(e.target.value?.trim())} name="address" placeholder="Complete address" rows="3"></textarea>
                        </div>
                    </div>
                    {/* Contact Tab */}
                    <div id="contactInfo" className="tab-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListPhone">Primary Phone <span className="required">*</span></label>
                                <input type="tel" id="userListPhone" onChange={(e) => setUserListPhone(e.target.value?.trim())} name="contact_info.phone" required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListSecondaryPhone">Secondary Phone</label>
                                <input type="tel" id="userListSecondaryPhone" onInput={(e) => setUserListSecondaryPhone(e.target.value?.trim())} name="contact_info.secondary_phone" placeholder="+91 9876543210" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListEmail">Email Address <span className="required">*</span></label>
                            <input type="email" id="userListEmail" onInput={(e) => setUserListEmail(e.target.value?.trim())} name="contact_info.email" required placeholder="userList@example.com" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListPersonalEmail">Personal Email Address <span className="required">*</span></label>
                            <input type="email" id="userListPersonalEmail" onInput={(e) => setUserListPersonalEmail(e.target.value?.trim())} name="contact_info.email" required placeholder="userList@example.com" />
                        </div>
                    </div>
                    {/* Moderation Tab */}
                    <div id="moderation" className="tab-content">
                        <div className="form-grid" style={{marginBottom: '16px'}}>
                            <div className="form-group">
                                <label htmlFor="userListAllowedDevices">Allowed Devices</label>
                                <select id="userListAllowedDevices" onChange={(e) => setUserListAllowedDevices(e.target.value)} name="moderation.allowed_devices">
                                    <option value="">Select Devices</option>
                                    <option value="All">All</option>
                                    <option value="Desktop">Desktop</option>
                                    <option value="Mobile">Mobile</option>
                                    <option value="Tablet">Tablet</option>
                                    {/* <option value="Other">Other</option> */}
                                </select>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="userListAllowedDevicesCount">Number of Allowed Devices</label>
                                <select id="userListAllowedDevicesCount" onChange={(e) => setUserListAllowedDevicesCount(e.target.value)} name="moderation.allowed_devices_count">
                                    <option value="">Select Devices</option>
                                    <option value="All">All</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListAllowLogin">Allow Login</label>
                                <select id="userListAllowLogin" onChange={(e) => setUserListAllowLogin(e.target.value)} name="moderation.allow_login">
                                    <option value="Yes">Yes</option>
                                    <option value="No">No</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Security Tab */}
                    <div id="security" className="tab-content">
                        <div className="form-grid" style={{marginBottom: '16px'}}>
                            <div className="form-group">
                                <label htmlFor="userListPassword">Generate Password</label>
                                <div className="password-container">
                                    <input type="password" id="userListPassword" onInput={(e) => setUserListPassword(e.target.value || 0)} name="password"  placeholder="Set Password" required pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$" title="Must contain at least one uppercase letter, one lowercase letter, one number and one special character, and at least 8 or more characters" maxLength="20" autoComplete="new-password" autoCapitalize="off" autoCorrect="off" />
                                    <button type="button" title="Generate Password" onClick={generatePassword}><i className="fa fa-key"></i></button>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="userListStatus">Set Status</label>
                                <select id="userListStatus" onChange={(e) => setUserListStatus(e.target.value)} name="status">
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="userListOtpNeeded">Set OTP Needed</label>
                            <select id="userListOtpNeeded" onChange={(e) => setUserListOtpNeeded(e.target.value)} name="security.otp_needed">
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const openUserListsModal = () => {
        showModal(
            'Add New UserList',
            newUserListModal(),
            closeModal,               // Cancel Button
            "Cancel",
            'newUserListSave',       // Save Button
            "Add UserList"
        );
    };

    const { showNotification } = useNotification();
    const handleCLick = () => {
        showNotification("Add New UserList button clicked", "positive");
    }

    const handleView = () => {
        const view = currentView === 'list' ? 'grid' : 'list';
        setCurrentView(view);
        showNotification(`View changed to ${view}`, "positive");
        document.querySelectorAll('.view-group > button').forEach(button => button.classList.remove('active'));
        document.getElementById(`${view}ViewBtn`).classList.add('active');
    }

    useEffect(() => {
        const headers = document.querySelectorAll('.user-field-header');
        const headerNames = Array.from(headers).map(header => header.textContent);
        setUserTableHeaders(headerNames);
    }, []);

    useEffect(() => {
        if (colData === '') return;
        const colNo = userTableHeaders.indexOf(colData);
        const rows = document.querySelectorAll('.userList-list-body tr');
        const colValues = Array.from(rows).map(row => row.children[colNo + 1].textContent);
        setUniqueValues([...new Set(colValues)]);
    }, [colData, userTableHeaders]);

    const handleReset = () => {
        setColData('');
        showNotification("Column reset", "positive");
        document.querySelector('.search-bar input').value = '';
        handleSearch('');
        document.querySelector('select[name=status]').selectedIndex = 0;
        document.querySelector('select[name=type]').selectedIndex = 0;
        setUniqueValues([]);
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filterData = value === '' ? userLists :
    userLists.filter(userList => {
            const rowText = Object.values(userList).join(' ').toLowerCase();
            const searchTerm = value.toLowerCase();
            return rowText.includes(searchTerm);
        });
        console.log('filterData', filterData)
        setFilteredData(filterData);
    }

    const handleHeaderFIlter = (value) => {
        setColData(value);
        document.querySelector('select[name=type]').selectedIndex = 0;
        handleSearch('');
    }

    const handleSelectAll = () => {
        setAllCheckboxSelected(!allCheckboxSelected);
        const checkboxes = document.querySelectorAll('.user-field-data input[type=checkbox]');
        checkboxes.forEach(row => {
            row.checked = !allCheckboxSelected;
        });
    }

    const importCSVPromt = () => {
        return (
            <>  
                <p>Please click on the below link to download the CSV template incase you don't have one</p>
                <a className="linkText" href="/UserList_Template.csv"><i className="fas fa-download"></i> Download CSV Template</a>
            </>
        );
    } 

    const handleImport = () => {
        showModal(
            'Import UserLists',
            importCSVPromt(),
            closeModal,               // Cancel Button
            "Cancel",
            'importUserListSave',     // Save Button
            "Import UserList"
        );
    }

    const exportCSVPromt = () => {
        return (
            <div className="form-group">
                <label htmlFor="fileName">Please enter the file name (optional)</label>
                <input type="text" id="fileName" name="fileName" onChange={(e) => setFileName(e.target.value)} placeholder="File Name" />
                <label htmlFor="downloadType">Please select the file type</label>
                <select name="downloadType" id="downloadType" onChange={(e) => setDownloadType(e.target.value)} required>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                </select>
            </div>
        );
    }

    const handleUserListExport = () => {
        showModal(
            'Export UserLists',
            exportCSVPromt(),
            closeModal,               // Cancel Button
            "Cancel",
            'exportUserListSave',     // Save Button
            "Export User List"
        );
    }

    useEffect(() => {
        const table = document.querySelector('.userList-list');
        if (!table) return;
        const headerRow = table.querySelector('thead tr');
        const rows = table.querySelectorAll('tbody tr');
        visibleColumns.forEach((visible, index) => {
            const colIndex = index + 1; // offset for checkbox column
            const headerCell = headerRow?.children[colIndex];
            if (headerCell) {
            headerCell.classList.toggle('show', visible);
            }
            rows.forEach(row => {
            const cell = row.children[colIndex];
            if (cell) {
                cell.classList.toggle('show', visible);
            }
            });
        });
    }, [visibleColumns]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const columnOptions = document.querySelector('.column-options');
            const button = document.querySelector('.column-group');
            const crossMark = document.querySelector('.cross');
            if ( columnOptions && !crossMark.contains(e.target) && !columnOptions.contains(e.target) && !button.contains(e.target) ) {
                columnOptions.classList.remove('open');
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleColumnSelect = (e) => {
        const target = e.target.closest('.selectable-option');
        if (!target) return;
        const columnIndex = Array.from(target.parentNode.children).indexOf(target);
        const adjustedIndex = columnIndex + 1;
        const table = document.querySelector('.userList-list');
        if (!table) return;
        const headerRow = table.querySelector('thead tr');
        const headerCell = headerRow?.children[adjustedIndex];
        if (!headerCell) return;
        headerCell.classList.toggle('show');
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            const cell = row.children[adjustedIndex];
            if (cell) cell.classList.toggle('show');
        });
        target.classList.toggle('selected');
        if (target.classList.contains('selected')) {
            if (!target.querySelector('span')) {
            target.insertAdjacentHTML(
                'beforeend',
                `<span class="cross"><i class="fas fa-times" style="font-size: 1rem; padding: 5px;"></i></span>`
            );
            }
        } else {
            const cross = target.querySelector('span');
            if (cross) cross.remove();
        }
        const updatedVisibility = [...visibleColumns];
        updatedVisibility[columnIndex] = !updatedVisibility[columnIndex];
        setVisibleColumns(updatedVisibility);
        localStorage.setItem('userColumnVisibility', JSON.stringify(updatedVisibility));
    };

    return (
        <section id="userLists-page" className={`page ${status}`}>
            <div className="page-header">
                <div className="page-title">
                    <h2>Users</h2>
                    <p>Manage and track all users list records</p>
                </div>
                <div className="page-actions">
                    <button className="btn btn-primary" id="importUserListsBtn" onClick={handleImport}>
                        <i className="fas fa-upload"></i> Import
                    </button>
                    <button className="btn btn-primary" id="exportUserListsBtn" onClick={handleUserListExport}>
                        <i className="fas fa-download"></i> Export
                    </button>
                    <button className="btn btn-primary" id="newUserListBtn" onClick={openUserListsModal}>
                        <i className="fas fa-plus"></i> New User
                    </button>
                </div>
            </div>
            <div className="page-filters">
                <div className="search-bar">
                    <input type="text" onInput={(e) => handleSearch(e.target.value)} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
                </div>
                <div className="filter-group">
                    <select id="selectTableHeader" onChange={(e) => handleHeaderFIlter(e.target.value)} name="status">
                        <option value="">Select Column</option>
                        {userTableHeaders.map((header, index) => (
                            <option key={index} value={header}>{header}</option>
                        ))}
                    </select>
                    <select id="valueOftheHeader" onChange={(e) => handleSearch(e.target.value)} name="type" disabled={uniqueValues.length === 0}>
                        <option value="">Select Field</option>
                        {uniqueValues.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                    <button className="btn btn-primary" id="refreshBtn" onClick={handleReset} title="Reset Search and Filters"><i className="fas fa-rotate-left"></i></button>
                    <button className="btn btn-primary" id="selectAllBtn" onClick={handleSelectAll} title={allCheckboxSelected ? 'Unselect All' : 'Select All'}>{allCheckboxSelected ? <i className="fas fa-square-xmark"></i> : <i className="fas fa-check-double"></i> }</button>
                </div>
                <div className="action-side">
                    <div className="column-group">
                        <button className="btn btn-primary" id="showColumnsBtn" style={{ borderRadius: '50%', padding: '0.5rem'}} onClick={() => {
                            const columnOptions = document.querySelector('.column-options');
                            columnOptions.classList.toggle('open');
                        }} title="Show/Hide Columns"><i className="fas fa-columns"></i></button>
                        <div className="column-options">
                            <div className="selectable-options-arrow" />
                            <div className="selectable-options" id="selectColumns">
                                {userTableHeaders.map((header, index) => (
                                    <div key={index} className={`selectable-option ${!visibleColumns[index] ? 'selected' : ''}`} onClick={handleColumnSelect}>
                                        {header}
                                        {!visibleColumns[index] && (
                                        <span className="cross"><i className="fas fa-times" style={{ fontSize: '1rem', padding: '5px' }}></i></span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <button className="btn btn-primary" id="reloadData" style={{ borderRadius: '50%', padding: '0.5rem'}} onClick={() => {
                        fetchUserLists();
                        handleReset();
                        showNotification("UserLists reloaded", "positive");
                    }}><i className="fas fa-sync"></i></button>
                    <div className="view-group">
                        <button className="btn btn-primary active" id="listViewBtn" onClick={handleView}>
                            <i className="fas fa-list"></i>
                        </button>
                        <button className="btn btn-primary" id="gridViewBtn" onClick={handleView}>
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="content-area">
                {currentView === 'list' ?
                    <UserListsList
                    userListData={filteredData}
                        setAllCheckboxSelected={setAllCheckboxSelected}
                        switchTab={switchTab}
                        setUserListID={setUserListID}
                    /> :
                    <UserListsGrid
                    userListData={filteredData || []}
                    />}
            </div>
        </section>
    );
}

export default UserLists;