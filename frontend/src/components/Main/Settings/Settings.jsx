import React from "react";
import Select, { components } from 'react-select';
import './Settings.css';
import EyeIcon from "../../EyeAnimation/EyeAnimation";
import { useSettings, generateIDFromSettings, useModal, useNextID, usePages } from '../../SettingsProvider/SettingsProvider';
import { outline } from "@cloudinary/url-gen/actions/effect";
import { border } from "@cloudinary/url-gen/qualifiers/background";
import { ico } from "@cloudinary/url-gen/qualifiers/format";

const roles = ['Admin', 'Accountant', 'View'];
const permissionLevels = [
    { value: 'edit', label: 'Edit', icon: <i className="fas fa-pencil-alt mr-2"></i> },
    { value: 'view', label: 'View', icon: <i className="fas fa-eye mr-2"></i> },
    { value: 'none', label: 'None', icon: <i className="fas fa-ban mr-2"></i> },
];

const CustomOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
        <div ref={innerRef} {...innerProps} className="option-custom">
        {data.icon}
        <span style={{ marginLeft: '10px' }}>{data.label}</span>
        </div>
    );
};
const shadow = '0 0 2px 0 transparent';
const surfaceColor = 'var(--surface-color)';
const ceoitboxDarkColor = 'var(--ceoitbox-dark-color)';

const customStyles = {
    control: (base, state) => ({
        ...base,
        backgroundColor: surfaceColor,
        borderColor: state.isFocused ? 'transparent' : 'transparent',
        borderRadius: '4px',
        fontSize: '0.875rem',
        padding: '0.1rem 0.25rem',
        minHeight: '30px',
        outline: 'none',
        cursor: 'pointer',
        boxShadow: state.isFocused ? shadow : shadow,
        '&:hover': {
            borderColor: ceoitboxDarkColor, // force your own hover border color
        },
        '& svg:hover': {
            color: ceoitboxDarkColor,
        },
        '& svg:active': {
            color: ceoitboxDarkColor,
        },
    }),
    menu: (base) => ({
        ...base,
        zIndex: 100,
        boxShadow: '0 0 2px 0 var(--ceoitbox-dark-color)',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        marginTop: '0.1rem',
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? ceoitboxDarkColor : surfaceColor,
        color: state.isFocused ? surfaceColor : ceoitboxDarkColor,
        fontSize: '0.875rem',
        textAlign: 'left',
        padding: '0.4rem 0.6rem',
        cursor: 'pointer',
    }),
};

const PagePermissionEditor = ({ initialPermissions = {}, onSave, pages }) => {
    const [ permissions, setPermissions ] = React.useState(initialPermissions);
    // console.log(permissions);
    const handleChange = (pageId, role, selected) => {
        console.log(pageId, role, selected);
        setPermissions(prev => ({ ...prev, [pageId]: { ...prev[pageId], [role]: selected.value, }, }));
    };
    const handleSave = () => {
        onSave(permissions);
    };
    return (
        <div className="page-permission-editor">
            <table className="permission-table">
                <thead>
                    <tr>
                        <th className="select-control">Page</th>
                        {roles.map(role => (
                            <th key={role} className="select-control">{role}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pages.map(page => (
                        <tr key={page.id}>
                            <td className="option-control">
                                <i className={`${page.icon} mr-2`} title={page.name}></i>
                            </td>
                            {roles.map(role => (
                                <td key={role} className="option-td-control">
                                    <Select
                                        value={permissionLevels.find(opt => opt.value === permissions[page.id]?.[role]) || permissionLevels[2]}
                                        onChange={(selected) => handleChange(page.id, role, selected)}
                                        options={permissionLevels}
                                        styles={customStyles}
                                        isSearchable={false}
                                        components={{ Option: CustomOption }}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                <button onClick={handleSave} className="btn btn-primary">Save Permissions</button>
            </div>
        </div>
    );
};

function Settings({ status }) {
    const [ showApiKey, setShowApiKey ] = React.useState(false);
    const [ isSheetSegmentOpen, setIsSheetSegmentOpen ] = React.useState(false);
    const [ isEmailSegmentOpen, setIsEmailSegmentOpen ] = React.useState(false);
    const [ isCustomerOpen, setIsCustomerOpen ] = React.useState(false);
    const [ isUserOpen, setIsUserOpen ] = React.useState(false);
    const [ isColorSegmentOpen, setIsColorSegmentOpen ] = React.useState(false);
    const [ isPermissionSegmentOpen, setIsPermissionSegmentOpen ] = React.useState(false);
    const toggleShowApiKey = () => setShowApiKey(!showApiKey);
    const { showModal, closeModal } = useModal();
    const { pages, setPages, itemList } = usePages();
    const {
        nextCustomerID,
        setNextCustomerID,
        nextUserID,
        setNextUserID,
        handleIDSave
    } = useNextID();
    const {
        apiKey,
        setApiKey,
        aiAgent,
        setAiAgent,
        spreadsheetId,
        setSpreadsheetId,
        emailSettings,
        setEmailSettings,
        customerSetting,
        setCustomerSetting,
        userSetting,
        setUserSetting,
        themeSettings,
        setThemeSettings,
        permissionSettings,
        setPermissionSettings,
        isLoaded
    } = useSettings();
    const openResetSettingsModal = () => {
        showModal(
            'RESET WARNING!',
            () => {
                return (
                    <>
                        <p>Are you sure you want to reset all settings?</p>
                        <p style={{ color: 'red', fontStyle: 'italic' }}>
                            NOTE: This will reset all settings to default values.
                        </p>
                    </>
                )
            },
            closeModal,
            'Cancel',
            'resetSettingsSave',
            'Reset Settings'
        )
    };
    const openSaveSettingsModal = () => {
        showModal(
            'SAVE CONFIRMATION!',
            () => {
                return (
                    <>
                        <p>Are you sure you want to save all settings?</p>
                        <p style={{ color: 'orange', fontStyle: 'italic' }}>
                            NOTE: This will change all settings.
                        </p>
                    </>
                )
            },
            closeModal,
            'Cancel',
            'saveSettingsSave',
            'Save Settings'
        )
    };
    const generateIDPreview = (settings, type = 'customer') => {
        return generateIDFromSettings(settings, 1, type);
    };
    React.useEffect(() => {
        const placeholderColor = getContrastingColor(themeSettings.surfaceColor);
        const styleTag = document.getElementById("dynamic-placeholder-style");
        if (styleTag) styleTag.remove();
        const style = document.createElement("style");
        style.id = "dynamic-placeholder-style";
        style.innerHTML = `
            .dynamic-placeholder::placeholder {
                color: ${placeholderColor} !important;
                opacity: 0.8;
            }
        `;
        document.head.appendChild(style);
    }, [themeSettings.surfaceColor]);
    const getContrastingColor = (color) => {
        let r, g, b;
        if (color.startsWith('rgb')) {
            const values = color.match(/\d+/g).map(Number);
            [r, g, b] = values;
        } else if (color.startsWith('#')) {
            color = color.replace('#', '');
            if (color.length === 3) color = color.split('').map(c => c + c).join('');
            r = parseInt(color.slice(0, 2), 16);
            g = parseInt(color.slice(2, 4), 16);
            b = parseInt(color.slice(4, 6), 16);
        } else {
            return '#FFFFFF';
        }
        const yiq = (r * 299 + g * 587 + b * 114) / 1000;
        return yiq >= 128 ? '#C2BABA' : '#FFFFFF';
    };
    const renderIDConfiguration = (label, settings, setSettings, type) => {
        return (
            <div className="card-view collapsible">
                <div className="collapsible-header" onClick={() => {
                    if (type === 'customer') {
                        setIsCustomerOpen(!isCustomerOpen);
                    } else if (type === 'user') {
                        setIsUserOpen(!isUserOpen);
                    }
                }}>
                    <h3>{label} ID Configuration</h3>
                    <span className="toggle-icon">{
                        (type === 'customer' ? isCustomerOpen : isUserOpen)
                            ? <i className="fas fa-chevron-up"></i>
                            : <i className="fas fa-chevron-down"></i>
                    }</span>
                </div>
                { (type === 'customer' ? isCustomerOpen : isUserOpen) && (
                    <div className="collapsible-content">
                        <div className="form-group dual-field">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor={`${type}IDPrefix`}>{label} ID Prefix</label>
                                <input
                                    type="text"
                                    id={`${type}IDPrefix`}
                                    placeholder={`Enter ${label.toLowerCase()} ID prefix`}
                                    value={settings[`${type}IDPrefix`]}
                                    className="dynamic-placeholder"
                                    onChange={(e) => setSettings({ ...settings, [`${type}IDPrefix`]: e.target.value })}
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`${type}IDSeparator`}>ID Separator</label>
                                <select
                                    id={`${type}IDSeparator`}
                                    value={settings[`${type}IDSeparator`]}
                                    onChange={(e) => setSettings({ ...settings, [`${type}IDSeparator`]: e.target.value })}
                                >
                                    <option value="-">Dash (-)</option>
                                    <option value="_">Underscore (_)</option>
                                    <option value="/">Slash (/)</option>
                                    <option value="">None</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group dual-field">
                            <div className="form-group" style={{ flex: 1 }}>
                                <label htmlFor={`${type}IDPadLength`}>Number Padding Length</label>
                                <input
                                    type="number"
                                    id={`${type}IDPadLength`}
                                    min="1"
                                    max="10"
                                    value={settings[`${type}IDPadLength`]}
                                    onChange={(e) => setSettings({ ...settings, [`${type}IDPadLength`]: parseInt(e.target.value) || 4 })}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor={`${type}YearFormat`}>Year Format</label>
                                <select
                                    id={`${type}YearFormat`}
                                    value={settings[`${type}YearFormat`]}
                                    onChange={(e) => setSettings({ ...settings, [`${type}YearFormat`]: e.target.value })}
                                >
                                    <option value="YYYY">4 Digit ({new Date().getFullYear()})</option>
                                    <option value="YY">2 Digit ({new Date().getFullYear().toString().slice(-2)})</option>
                                </select>
                            </div>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings[`${type}IncludeYear`]}
                                    onChange={(e) => setSettings({ ...settings, [`${type}IncludeYear`]: e.target.checked ? true : false, [`${type}IncludeDate`]: false, [`${type}IncludeFiscalYear`]: false })}
                                />
                                Include Year
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings[`${type}IncludeDate`]}
                                    onChange={(e) => setSettings({ ...settings, [`${type}IncludeYear`]: false, [`${type}IncludeDate`]: e.target.checked ? true : false, [`${type}IncludeFiscalYear`]: false })}
                                />
                                Include Full Date (DDMMYY)
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={settings[`${type}IncludeFiscalYear`]}
                                    onChange={(e) => setSettings({ ...settings, [`${type}IncludeYear`]: false, [`${type}IncludeDate`]: false, [`${type}IncludeFiscalYear`]: e.target.checked ? true : false })}
                                />
                                Include Fiscal Year
                            </label>
                        </div>

                        <div className="form-group">
                            <label htmlFor={`${type}IDSuffix`}>{label} ID Suffix (optional)</label>
                            <input
                                type="text"
                                id={`${type}IDSuffix`}
                                placeholder="e.g. IN, AJAY"
                                className="dynamic-placeholder"
                                value={settings[`${type}IDSuffix`]}
                                onChange={(e) => setSettings({ ...settings, [`${type}IDSuffix`]: e.target.value })}
                            />
                        </div>

                        <div className="form-group">
                            <label>Preview</label>
                            <p className="preview-text" style={{ fontWeight: "bold" }}>
                                Example ID: {generateIDPreview(settings, type)}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        );
    };
    const fetchedPermissions = {
        'dashboard-page': {
            'Super Admin': 'edit',
            'Admin': 'edit',
            'Accountant': 'view',
            'View': 'view'
        },
        'payments-page': {
            'Super Admin': 'edit',
            'Admin': 'edit',
            'Accountant': 'edit',
            'View': 'none'
        },
        'templates-page': {
            'Super Admin': 'edit',
            'Admin': 'view',
            'Accountant': 'none',
            'View': 'none'
        },
        'pdf-layouts-page': {
            'Super Admin': 'edit',
            'Admin': 'view',
            'Accountant': 'none',
            'View': 'none'
        },
        'signatures-page': {
            'Super Admin': 'edit',
            'Admin': 'view',
            'Accountant': 'none',
            'View': 'none'
        },
        'customers-page': {
            'Super Admin': 'edit',
            'Admin': 'edit',
            'Accountant': 'edit',
            'View': 'view'
        },
        'userlists-page': {
            'Super Admin': 'edit',
            'Admin': 'edit',
            'Accountant': 'none',
            'View': 'none'
        },
        'settings-page': {
            'Super Admin': 'edit',
            'Admin': 'view',
            'Accountant': 'none',
            'View': 'none'
        },
        'email-template-page': {
            'Super Admin': 'edit',
            'Admin': 'view',
            'Accountant': 'none',
            'View': 'none'
        },
        'pdf-template-page': {
            'Super Admin': 'edit',
            'Admin': 'view',
            'Accountant': 'none',
            'View': 'none'
        },
        'userprofile-page': {
            'Super Admin': 'edit',
            'Admin': 'edit',
            'Accountant': 'view',
            'View': 'view'
        }
    };

    return (
        <section id="settings-page" className={`page ${status}`}>
            <div className="page-header">
                <div className="page-title">
                    <h2>Settings</h2>
                    <p>Configure application settings</p>
                </div>
            </div>
            <div className="settings-grid">
                {/* Google Sheets Configuration */}
                <div className="settings-card">
                    <div className="card-view collapsible">
                        <div className="collapsible-header" onClick={() => { setIsSheetSegmentOpen(!isSheetSegmentOpen); }}>
                            <h3>Google Sheets Configuration</h3>
                            <span className="toggle-icon">{ isSheetSegmentOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</span>
                        </div>
                        { isSheetSegmentOpen &&
                            <div className="collapsible-content">
                                <div className="form-group">
                                    <div className="checkbox-group">
                                        <div className={`checkbox-child ${emailSettings.resetOnLogout ? 'checked' : ''}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <label htmlFor="resetOnLogout" style={{ whiteSpace: "nowrap", marginLeft: "15px" }}>Reset on Logout</label>
                                            <input 
                                                type="checkbox"
                                                id="resetOnLogout"
                                                style={{ width: "17px", height: "17px" }}
                                                checked={emailSettings.resetOnLogout || false}
                                                onChange={(e) => setEmailSettings({ ...emailSettings, resetOnLogout: e.target.checked })}
                                            />
                                        </div>
                                        <div className={`checkbox-child ${emailSettings.resetOnInactivity ? 'checked' : ''}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <label htmlFor="resetOnInactivity" style={{ whiteSpace: "nowrap", marginLeft: "15px" }}>Reset on Inactivity</label>
                                            <input
                                                type="checkbox"
                                                id="resetOnInactivity"
                                                style={{ width: "17px", height: "17px" }}
                                                checked={emailSettings.resetOnInactivity || false}
                                                onChange={(e) => setEmailSettings({ ...emailSettings, resetOnInactivity: e.target.checked })}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="spreadsheetId">Spreadsheet ID</label>
                                    <input
                                        type="text"
                                        id="spreadsheetId"
                                        placeholder="Enter Google Sheets ID"
                                        className="dynamic-placeholder"
                                        value={spreadsheetId}
                                        onChange={(e) => setSpreadsheetId(e.target.value)}
                                    />
                                </div>
                                <div className="form-group dual-field">
                                    <div className="form-group" style={{ flex: 1 }}>
                                        <label htmlFor="apiKey">API Key</label>
                                        <div className="input-group" style={{ position: "relative" }}>
                                            <input
                                                type={showApiKey ? "text" : "password"}
                                                id="apiKey"
                                                placeholder="Enter API Key"
                                                className="dynamic-placeholder"
                                                value={apiKey}
                                                onChange={(e) => setApiKey(e.target.value)}
                                            />
                                            <span className="input-group-addon" onClick={toggleShowApiKey}>
                                                <EyeIcon isVisible={showApiKey} />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="aiAgent">AI Agent</label>
                                        <select
                                            id="aiAgent"
                                            value={aiAgent}
                                            onChange={(e) => setAiAgent(e.target.value)}
                                        >
                                            <option value={""}>Select AI Agent</option>
                                            <option value={"Gemini"}>Gemini</option>
                                            <option value={"Claude"}>Claude</option>
                                            <option value={"ChatGPT"}>ChatGPT</option>
                                            <option value={"Llama"}>Llama</option>
                                            {/* <option value="Mistral">Mistral</option> */}
                                            {/* <option value="Cohere">Cohere</option> */}
                                            {/* <option value="Other">Other</option> */}
                                            {/* <option value="Custom">Custom</option> */}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* Email Configuration */}
                <div className="settings-card">
                    <div className="card-view collapsible">
                        <div className="collapsible-header" onClick={() => { setIsEmailSegmentOpen(!isEmailSegmentOpen); }}>
                            <h3>Email Configuration</h3>
                            <span className="toggle-icon">{ isEmailSegmentOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</span>
                        </div>
                        { isEmailSegmentOpen &&
                            <div className="collapsible-content">
                                <div className="form-group">
                                    <label htmlFor="senderEmail">Sender Email</label>
                                    <input
                                        type="email"
                                        id="senderEmail"
                                        placeholder="Enter sender email"
                                        className="dynamic-placeholder"
                                        value={emailSettings.senderEmail}
                                        onChange={(e) =>
                                            setEmailSettings({ ...emailSettings, senderEmail: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="senderName">Sender Name</label>
                                    <input
                                        type="text"
                                        id="senderName"
                                        placeholder="Enter sender name"
                                        className="dynamic-placeholder"
                                        value={emailSettings.senderName}
                                        onChange={(e) =>
                                            setEmailSettings({ ...emailSettings, senderName: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* Customer ID Configuration */}
                <div className="settings-card">
                    {renderIDConfiguration('Customer', customerSetting, setCustomerSetting, 'customer')}
                </div>

                {/* User ID Configuration */}
                <div className="settings-card">
                    {renderIDConfiguration('User', userSetting, setUserSetting, 'user')}
                </div>

                {/* Theme Settings */}
                <div className="settings-card">
                    <div className="card-view collapsible">
                        <div className="collapsible-header" onClick={() => { setIsColorSegmentOpen(!isColorSegmentOpen); }}>
                            <h3>Theme Settings</h3>
                            <span className="toggle-icon">{ isColorSegmentOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</span>
                        </div>
                        { isColorSegmentOpen &&
                            <div className="collapsible-content">
                                {[ 
                                    ['primaryColor', 'Primary Color'],
                                    ['primaryTextColor', 'Primary Text Color'],
                                    ['primaryBtnTextColor', 'Primary Button Text Color'],
                                    ['secondaryColor', 'Secondary Color'],
                                    ['secondaryTextColor', 'Secondary Text Color'],
                                    ['secondaryBtnTextColor', 'Secondary Button Text Color'],
                                    ['sidebarColor', 'Sidebar Color'],
                                    ['successColor', 'Success Color'],
                                    ['warningColor', 'Warning Color'],
                                    ['dangerColor', 'Danger Color'],
                                    ['backgroundColor', 'Background Color'],
                                    ['surfaceColor', 'Surface Color'],
                                    ['borderColor', 'Border Color'],
                                ].map(([key, label]) => (
                                    <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between', borderBottom: '1px dashed var(--border-color)', paddingBottom: '10px' }} key={key}>
                                        <label>{label}</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <input
                                                type="color"
                                                className="color-input"
                                                value={themeSettings[key] || ''}
                                                onChange={(e) =>
                                                    setThemeSettings({ ...themeSettings, [key]: e.target.value })
                                                }
                                                style={{ width: '80px', height: '25px', border: 'none', padding: 0, cursor: 'pointer', borderColor: 'var(--border-color)', borderRadius: '4px' }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="form-group">
                                    <label>Font Family</label>
                                    <select
                                        value={themeSettings.fontFamily || 'sans-serif'}
                                        onChange={(e) => setThemeSettings({ ...themeSettings, fontFamily: e.target.value })}
                                    >
                                        <option value="'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif">
                                            Poppins (Recommended Mix)
                                        </option>
                                        <option value="'Roboto', sans-serif">Roboto</option>
                                        <option value="'Open Sans', sans-serif">Open Sans</option>
                                        <option value="'Lato', sans-serif">Lato</option>
                                        <option value="'Inter', sans-serif">Inter</option>
                                        <option value="'Montserrat', sans-serif">Montserrat</option>
                                        <option value="'Raleway', sans-serif">Raleway</option>
                                        <option value="'Playfair Display', serif">Playfair Display</option>
                                        <option value="'Nunito', sans-serif">Nunito</option>
                                        <option value="sans-serif">Basic Sans-Serif</option>
                                        <option value="serif">Serif</option>
                                        <option value="monospace">Monospace</option>
                                        <option value="cursive">Cursive</option>
                                    </select>
                                    <p style={{ fontFamily: themeSettings.fontFamily, fontSize: '1rem', marginTop: '0.5rem' }}>
                                        The quick brown fox jumps over the lazy dog.
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                </div>

                {/* User Permissions Settings */}
                <div className="settings-card">
                    <div className="card-view collapsible">
                        <div className="collapsible-header" onClick={() => { setIsPermissionSegmentOpen(!isPermissionSegmentOpen); }}>
                            <h3>Permission Settings</h3>
                            <span className="toggle-icon">{ isPermissionSegmentOpen ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i> }</span>
                        </div>
                        { isPermissionSegmentOpen &&
                            <div className="collapsible-content">
                                <PagePermissionEditor initialPermissions={permissionSettings} onSave={(finalPermissions) => { console.log('Saving permissions:', finalPermissions); }} pages={itemList} />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
                <button className="btn btn-danger" style={{ marginRight: '1rem' }} onClick={openResetSettingsModal}>
                    Reset to Default
                </button>
                <button className="btn btn-primary" onClick={openSaveSettingsModal}>
                    Save All Settings
                </button>
            </div>
        </section>
    );
}

export default Settings;
