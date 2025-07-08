// C:\Users\CBX\Desktop\New Journey\Payment-app\src\components\SettingsProvider\SettingsProvider.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from "axios";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

import Papa from 'papaparse';
import * as XLSX from 'xlsx';
let fingerprint = '';
const fpPromise = FingerprintJS.load();
fpPromise.then(fp => fp.get()).then(result => {
    fingerprint = result.visitorId;
}).catch(error => {
    console.error('Error obtaining fingerprint:', error);
});
const hostUrl = 'https://pay-admin.onrender.com'; // process.env.REACT_APP_API || `http://localhost:5000`;

// Create a custom hook for easier access
export const useSettings = () => useContext(SettingsContext);
export const useSignup = () => useContext(SignupContext);
export const useLogin =() => useContext(LoginContext);
export const useNotification = () => useContext(NotificationContext);
export const useModal = () => useContext(ModalContext);
export const useCustomers = () => useContext(CustomersContext);
export const useUserLists = () => useContext(UserListsContext);
export const useNextID = () => useContext(NextIDContext);
export const usePages = () => useContext(PagesContext);

// 2. Create the context
export const SettingsContext = createContext();
export const SignupContext = createContext();
export const LoginContext = createContext();
export const NotificationContext = createContext();
export const ModalContext = createContext();
export const CustomersContext = createContext();
export const NextIDContext = createContext();
export const UserListsContext = createContext();
export const PagesContext = createContext();

// 3. Create the provider component
export const SettingsProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const { showModal, closeModal } = useModal();
    const [apiKey, setApiKey] = useState('');
    const [aiAgent, setAiAgent] = useState('');
    const [spreadsheetId, setSpreadsheetId] = useState('');
    const [emailSettings, setEmailSettings] = useState({
        senderEmail: '',
        senderName: ''
    });
    const [customerSetting, setCustomerSetting] = useState({
        customerIDPrefix: '',
        customerIDSeparator: '-',
        customerIDPadLength: 4,
        customerYearFormat: 'YYYY',
        customerIncludeFiscalYear: false,
        customerIncludeYear: false,
        customerIncludeDate: false,
        customerIDSuffix: '',
    });
    const [userSetting, setUserSetting] = useState({
        userIDPrefix: '',
        userIDSeparator: '-',
        userIDPadLength: 4,
        userYearFormat: 'YYYY',
        userIncludeFiscalYear: false,
        userIncludeYear: false,
        userIncludeDate: false,
        userIDSuffix: '',
    })
    const [themeSettings, setThemeSettings] = useState({
        primaryColor: '',
        secondaryColor: '',
        sidebarColor: '',
        successColor: '',
        warningColor: '',
        dangerColor: '',
        backgroundColor: '',
        surfaceColor: '',
        borderColor: '',
        fontFamily: ''
    });
    const [ permissionSettings, setPermissionSettings ] = useState({
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
    });
    const [isLoaded, setIsLoaded] = useState(false);
    const DEFAULT_SETTINGS = {
        spreadsheetId: '',
        apiKey: '',
        aiAgent: '',
        emailSettings: {
            senderEmail: '',
            senderName: '',
            resetOnLogout: false,
            resetOnInactivity: false
        },
        customerSetting: {
            prefix: 'CUST',
            startNumber: 1000
        },
        userSetting: {
            prefix: 'USER',
            startNumber: 500
        },
        themeSettings: {
            primaryColor: '#548827',
            secondaryColor: '#bbd116',
            sidebarColor: '#fdfc95',
            successColor: '#10b981',
            warningColor: '#f59e0b',
            dangerColor: '#ef4444',
            backgroundColor: '#f8fafc',
            surfaceColor: '#ffffff',
            borderColor: '#e2e8f0',
            fontFamily: "'Poppins', sans-serif"
        }
    };
    const handleResetSettings = async (e) => {
        const resetEmailSettings = {
            senderEmail: '',
            senderName: '',
            resetOnLogout: false,
            resetOnInactivity: false
        };
        const resetCustomerSetting = {
            customerIDPrefix: '',
            customerIDSeparator: '-',
            customerIDPadLength: 4,
            customerYearFormat: 'YYYY',
            customerIncludeFiscalYear: false,
            customerIncludeYear: false,
            customerIncludeDate: false,
            customerIDSuffix: '',
        };
        const resetUserSetting = {
            userIDPrefix: '',
            userIDSeparator: '-',
            userIDPadLength: 4,
            userYearFormat: 'YYYY',
            userIncludeFiscalYear: false,
            userIncludeYear: false,
            userIncludeDate: false,
            userIDSuffix: '',
        };
        const resetThemeSettings = DEFAULT_SETTINGS.themeSettings;
        const resetPayload = {
            spreadsheetId: '',
            apiKey: '',
            aiAgent: '',
            emailSettings: resetEmailSettings,
            customerSetting: resetCustomerSetting,
            userSetting: resetUserSetting,
            themeSettings: resetThemeSettings
        };
        // update states
        setSpreadsheetId('');
        setApiKey('');
        setAiAgent('');
        setEmailSettings(resetEmailSettings);
        setCustomerSetting(resetCustomerSetting);
        setUserSetting(resetUserSetting);
        setThemeSettings(resetThemeSettings);
        try {
            const res = await axios.post(`${hostUrl}/api/settings/save`, resetPayload);
            showNotification(res.data.success ? "Settings reset to default!" : "Failed to reset settings.", res.data.success ? "positive" : "negative");
            closeModal();
        } catch (error) {
            console.error("Reset error:", error);
            showNotification("Error resetting settings.", "negative");
        }
    };
    const hexToRGBA = (hex, alpha = 0.33) => {
        let r = 0, g = 0, b = 0;
        hex = hex.replace(/^#/, '');
        if (hex.length === 3) {
            r = parseInt(hex[0] + hex[0], 16);
            g = parseInt(hex[1] + hex[1], 16);
            b = parseInt(hex[2] + hex[2], 16);
        } else if (hex.length === 6) {
            r = parseInt(hex.slice(0, 2), 16);
            g = parseInt(hex.slice(2, 4), 16);
            b = parseInt(hex.slice(4, 6), 16);
        }
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    useEffect(() => {
        const root = document.documentElement;
        if (themeSettings) {
            Object.entries(themeSettings).forEach(([key, val]) => {
                if (key === 'fontFamily') {
                    root.style.setProperty('--font-family', val);
                } else {
                    let cssVar;
                    switch (key) {
                        case 'primaryColor':
                            cssVar = '--ceoitbox-dark-color';
                            root.style.setProperty('--ceoitbox-transparent-color', hexToRGBA(val, 0.33));
                            break;
                        case 'secondaryColor':
                            cssVar = '--ceoitbox-light-color';
                            break;
                        case 'successColor':
                            cssVar = '--success-color';
                            break;
                        case 'warningColor':
                            cssVar = '--warning-color';
                            break;
                        case 'sidebarColor':
                            cssVar = '--sidebar-color';
                            break;
                        case 'dangerColor':
                            cssVar = '--danger-color';
                            break;
                        case 'backgroundColor':
                            cssVar = '--background-color';
                            break;
                        case 'surfaceColor':
                            cssVar = '--surface-color';
                            break;
                        case 'borderColor':
                            cssVar = '--border-color';
                            break;
                        case 'fontFamily':
                            cssVar = '--font-family';
                            break;
                        default:
                            cssVar = '--' + key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
                    }
                    root.style.setProperty(cssVar, val);
                }
            });
        }
    }, [themeSettings]);
    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await axios.get(`${hostUrl}/api/settings`);
                if (res.data) {
                    setApiKey(res.data.apiKey || '');
                    setAiAgent(res.data.aiAgent || '');
                    setSpreadsheetId(res.data.spreadsheetId || '');
                    setEmailSettings({
                        senderEmail: res.data.emailSettings?.senderEmail || '',
                        senderName: res.data.emailSettings?.senderName || ''
                    });
                    setCustomerSetting(res.data.customerSetting || DEFAULT_SETTINGS.customerSetting);
                    setUserSetting(res.data.userSetting || DEFAULT_SETTINGS.userSetting);
                    setThemeSettings(res.data.themeSettings || DEFAULT_SETTINGS.themeSettings);
                }
            } catch (error) {
                console.error("Error loading settings:", error);
            } finally {
                setIsLoaded(true); // Mark loading as complete
            }
        };
        fetchSettings();
    }, []);
    const handleSaveSettings = async (e) => {
        e.preventDefault();
        const payload = { spreadsheetId, apiKey, aiAgent, emailSettings, customerSetting, userSetting, themeSettings, permissionSettings };
        try {
            const res = await axios.post(`${hostUrl}/api/settings/save`, payload);
            showNotification(res.data.success ? "Settings saved successfully!" : "Failed to save settings.", res.data.success ? "positive" : "negative");
            closeModal();
        } catch (error) {
            console.error("Save error:", error);
            showNotification("Error saving settings.", "negative");
        }
    };
    const value = {
        apiKey,
        setApiKey,
        aiAgent,
        setAiAgent,
        spreadsheetId,
        setSpreadsheetId,
        emailSettings,
        setEmailSettings,
        handleSaveSettings,
        customerSetting,
        setCustomerSetting,
        userSetting,
        setUserSetting,
        themeSettings,
        setThemeSettings,
        permissionSettings,
        setPermissionSettings,
        handleResetSettings,
        isLoaded
    };
    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

export const SignupProvider = ({ children }) => {
    const { showNotification } = useNotification();
    // States to be shared across the application
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [department, setDepartment] = useState('');
    const [allowLogin, setAllowLogin] = useState(true);
    const [status, setStatus] = useState('Inactive');
    const [otpNeeded, setOtpNeeded] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false); // For loading state
    
    const handleSignup = async (e) => {
        e.preventDefault();
        const field = !fullName ? 'full name' : !email ? 'email' : !password ? 'password' : !confirmPassword ? 'confirm password' : !phone ? 'phone' : !department ? 'department' : null;
        if (field) return showNotification(`Please enter your ${field}.`, "negative");
        if (password !== confirmPassword) return showNotification("Passwords do not match!", "negative");
        try {
            const payload = { fullName, email, password, phone, department, allowLogin, status, otpNeeded };
            const res = await axios.post(`${hostUrl}/api/user/signup`, payload);
            if (res.data.success) {
                showNotification("Signup successfully!", "positive");
            } else {
                showNotification("Failed to signup.", "negative");
            }
        } catch (error) {
            if (error.response?.status === 400) {
                showNotification(error.response.data.message || "User already exists!", "negative");
            } else {
                showNotification("Something went wrong.", "negative");
            }
            console.error("Signup error:", error);
        }
    };

    // 6. Value to be provided to all consuming components
    const value = {
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
    };

    return (
        <SignupContext.Provider value={value}>
            {children}
        </SignupContext.Provider>
    );
};

export const LoginProvider = ({ children }) => {
    const { showNotification } = useNotification();
    // States to be shared across the application
    const [loginStatus, setLoginStatus] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoaded, setIsLoaded] = useState(false); // For loading state

    const handleLogin = async (e, userRole = 'minion') => {
        console.log('userRole:', userRole);
        e.preventDefault();
        const field = !email ? 'email' : !password ? 'password' : null;
        if (field) return showNotification(`Please enter your ${field}.`, "negative");
        const apiEndpoint = userRole === 'minion' ? `${hostUrl}/api/user/login` : `${hostUrl}/api/userlists/login`;
        try {
            const payload = { email, password, fingerprint };
            const res = await axios.post(apiEndpoint, payload);
            setLoginStatus(res.data.success);
            if (res.data.success) {
                showNotification("Login successful!", "positive");
                localStorage.setItem("user", JSON.stringify(res.data.user));
                window.location.reload();
            } else {
                showNotification("Login failed.", "negative");
            }
        } catch (error) {
            setLoginStatus(false);
            if (error.response?.status === 400 || error.response?.status === 404) {
                showNotification(error.response.data.message, "negative");
            } else {
                showNotification("Server error.", "negative");
            }
            console.error("Login error:", error);
        }
    };

    // 6. Value to be provided to all consuming components
    const value = {
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
    };

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    );
}

export const NotificationProvider = ({ children }) => {
    // States to be shared across the application
    const [notification, setNotification] = useState({
        visible: false,
        message: '',
        type: '',
    });

    const showNotification = (message, type = 'positive') => {
        setNotification({ visible: true, message, type });
        setTimeout(() => {
            setNotification((prev) => ({ ...prev, visible: false }));
        }, 3000);
    };

    // 6. Value to be provided to all consuming components
    const value = {
        notification,
        setNotification,
        showNotification
    }

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}

export const ModalProvider = ({ children }) => {
    const [modal, setModal] = useState({
        visible: false,
        modalTitle: '',
        content: '',
        onClose1: null,
        buttonName1: 'Cancel',
        onClose2: null,
        buttonName2: ''
    });

    const showModal = (
        modalTitle,
        content,
        onClose1 = null,
        buttonName1 = 'Cancel',
        onClose2 = null,
        buttonName2 = ''
    ) => {
        setModal({
            visible: true,
            modalTitle,
            content,
            onClose1,
            buttonName1,
            onClose2,
            buttonName2
        });
    };

    const closeModal = () => {
        setModal({
            visible: false,
            modalTitle: '',
            content: '',
            onClose1: null,
            buttonName1: 'Cancel',
            onClose2: null,
            buttonName2: ''
        });
    };

    const value = { modal, showModal, closeModal };

    return (
        <ModalContext.Provider value={value}>
            {children}
        </ModalContext.Provider>
    );
};

export const CustomersProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const { closeModal } = useModal();
    const [isLoaded, setIsLoaded] = useState(false); // For loading state
    const [customerName, setCustomerName] = useState('');
    const [customerType, setCustomerType] = useState('');
    const [customerGSTIN, setCustomerGSTIN] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerSecondaryPhone, setCustomerSecondaryPhone] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPAN, setCustomerPAN] = useState('');
    const [customerWebsite, setCustomerWebsite] = useState('');
    const [customerIndustry, setCustomerIndustry] = useState('');
    const [customerCompanySize, setCustomerCompanySize] = useState('');
    const [customerRevenue, setCustomerRevenue] = useState('');
    const [customerOpeningBalance, setCustomerOpeningBalance] = useState('');
    const [customerBalanceType, setCustomerBalanceType] = useState('Dr');
    const [customerCreditLimit, setCustomerCreditLimit] = useState('');
    const [customerPaymentDays, setCustomerPaymentDays] = useState('30');
    const [customerID, setCustomerID] = useState('');
    const [downloadType, setDownloadType] = useState('csv');
    const [fileName, setFileName] = useState('Customers_List');
    const [customers, setCustomers] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const { nextCustomerID, setNextCustomerID } = useNextID();
    const { customerSetting } = useSettings();
    const [customerCount, setCustomerCount] = useState(0);

    const fetchCustomers = async () => {
        try {
            const res = await axios.get(`${hostUrl}/api/customers`);
            if (res.status === 200) {
                setIsLoaded(true);
                setCustomers(res.data?.customers || res.data);
                setFilteredData(res.data?.customers || res.data);
                setCustomerCount((res.data?.length > nextCustomerID ? res.data?.length : nextCustomerID) || 0);
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
            if (error.response?.status === 400 || error.response?.status === 404) {
                showNotification(error.response.data.message, "negative");
            } else {
                showNotification("Server error.", "negative");
            }
            return [];
        }
    };

    const clearForm = () => {
        setCustomerName('');
        setCustomerType('');
        setCustomerGSTIN('');
        setCustomerAddress('');
        setCustomerPhone('');
        setCustomerSecondaryPhone('');
        setCustomerEmail('');
        setCustomerPAN('');
        setCustomerWebsite('');
        setCustomerIndustry('');
        setCustomerCompanySize('');
        setCustomerRevenue('');
        setCustomerOpeningBalance('');
        setCustomerBalanceType('Dr');
        setCustomerCreditLimit('');
        setCustomerPaymentDays('30');
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleCustomerEntry = async (e) => {
        e.preventDefault();
        if (!customerName) return showNotification('Please fill Customer Name.', 'negative');
        if (!customerType) return showNotification('Please fill Customer Type.', 'negative');
        if (!customerPhone) return showNotification('Please fill Customer Phone.', 'negative');
        if (!customerEmail) return showNotification('Please fill Customer Email.', 'negative');
        const payload = {
            customerId: generateIDFromSettings(customerSetting, nextCustomerID, 'customer'),
            customerName,
            customerType,
            customerGSTIN,
            customerAddress,
            customerPhone,
            customerSecondaryPhone,
            customerEmail,
            customerPAN,
            customerWebsite,
            customerIndustry,
            customerCompanySize,
            customerRevenue,
            customerOpeningBalance,
            customerBalanceType,
            customerCreditLimit,
            customerPaymentDays
        };
        try {
            const res = await axios.post(`${hostUrl}/api/customers/save`, payload);
            if (res.status === 200 || res.status === 201) {
                showNotification('Customer added successfully.', 'positive');
                setNextCustomerID(nextCustomerID + 1);
                fetchCustomers(); // ✅ Refresh list
                closeModal();
                return true;
            } else {
                showNotification('Error adding customer.', 'negative');
                return false;
            }
        } catch (error) {
            console.error('Error adding customer:', error);
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'negative');
            } else {
                showNotification('Error adding customer.', 'negative');
            }
            return false;
        }
    };

    const handleImportCustomerCSV = async (e) => {
        e.preventDefault();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv, .xlsx'; // ✅ Accept both formats
        input.click();
        input.addEventListener('change', async () => {
            const file = input.files[0];
            if (!file) return;
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (fileExtension === 'csv') {
                // ✅ Parse CSV
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: async function (results) {
                        const json = results.data;
                        await processCustomers(json);
                    },
                    error: function (error) {
                        console.error("CSV Parsing Error:", error);
                        showNotification('Error parsing CSV file.', 'negative');
                    }
                });
            } else if (fileExtension === 'xlsx') {
                // ✅ Parse Excel
                const reader = new FileReader();
                reader.onload = async function (e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    await processCustomers(json);
                };
                reader.readAsArrayBuffer(file);
            } else {
                showNotification('Unsupported file format. Please upload CSV or Excel.', 'negative');
            }
        });
    };

    const processCustomers = async (json) => {
        let localID = nextCustomerID;
        for (const row of json) {
            const payload = {
                customerId: generateIDFromSettings(customerSetting, localID, 'customer'),
                customerName: row['Name'] || '',
                customerType: row['Type'] || '',
                customerGSTIN: row['GSTIN'] || '',
                customerAddress: row['Address'] || '',
                customerPhone: row['Phone'] || '',
                customerSecondaryPhone: row['Secondary Phone'] || '',
                customerEmail: row['Email'] || '',
                customerPAN: row['PAN'] || '',
                customerWebsite: row['Website'] || '',
                customerIndustry: row['Industry'] || '',
                customerCompanySize: row['Company Size'] || '',
                customerRevenue: row['Revenue'] || '',
                customerOpeningBalance: row['Opening Balance'] || '',
                customerBalanceType: row['Balance Type'] || 'Dr',
                customerCreditLimit: row['Credit Limit'] || '',
                customerPaymentDays: row['Payment Days'] || '30'
            };
            try {
                const res = await axios.post(`${hostUrl}/api/customers/save`, payload);
                if (res.status === 200 || res.status === 201) {
                    localID++;
                } else {
                    showNotification(`Failed to add ${payload.customerName}`, 'negative');
                }
            } catch (error) {
                console.error(`Error saving ${payload.customerName}:`, error);
                showNotification(`Error saving ${payload.customerName}`, 'negative');
            }
        }
        setNextCustomerID(localID);
        fetchCustomers();
        showNotification('All customer(s) processed.', 'positive');
        closeModal();
    };

    const handleExportCustomerCSV = async () => {
        const res = await axios.get(`${hostUrl}/api/customers`);
        const customers = res.data;

        const csvRows = customers.map((customer) => {
            return {
                Name: customer.customerName,
                Type: customer.customerType,
                GSTIN: customer.customerGSTIN,
                Address: customer.customerAddress,
                Phone: customer.customerPhone,
                'Secondary Phone': customer.customerSecondaryPhone,
                Email: customer.customerEmail,
                PAN: customer.customerPAN,
                Website: customer.customerWebsite,
                Industry: customer.customerIndustry,
                'Company Size': customer.customerCompanySize,
                Revenue: customer.customerRevenue,
                'Opening Balance': customer.customerOpeningBalance,
                'Balance Type': customer.customerBalanceType,
                'Credit Limit': customer.customerCreditLimit,
                'Payment Days': customer.customerPaymentDays
            };
        });

        if (downloadType === 'excel') {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(csvRows);
            XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `${fileName}_${new Date().toISOString()}.xlsx`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const csvData = Papa.unparse(csvRows);
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `${fileName}_${new Date().toISOString()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const value = {
        customerName,
        setCustomerName,
        customerType,
        setCustomerType,
        customerGSTIN,
        setCustomerGSTIN,
        customerAddress,
        setCustomerAddress,
        customerPhone,
        setCustomerPhone,
        customerSecondaryPhone,
        setCustomerSecondaryPhone,
        customerEmail,
        setCustomerEmail,
        customerPAN,
        setCustomerPAN,
        customerWebsite,
        setCustomerWebsite,
        customerIndustry,
        setCustomerIndustry,
        customerCompanySize,
        setCustomerCompanySize,
        customerRevenue,
        setCustomerRevenue,
        customerOpeningBalance,
        setCustomerOpeningBalance,
        customerBalanceType,
        setCustomerBalanceType,
        customerCreditLimit,
        setCustomerCreditLimit,
        customerPaymentDays,
        setCustomerPaymentDays,
        handleCustomerEntry,
        handleImportCustomerCSV,
        handleExportCustomerCSV,
        downloadType,
        setDownloadType,
        fileName,
        setFileName,
        customers,
        setCustomers,
        filteredData,
        setFilteredData,
        customerID,
        setCustomerID,
        fetchCustomers,
        clearForm, // Export clearForm function
        isLoaded
    };

    return (
        <CustomersContext.Provider value={value}>
            {children}
        </CustomersContext.Provider>
    );
};

export const NextIDProvider = ({ children }) => {
    const [nextCustomerID, setNextCustomerID] = useState(1);
    const [nextUserID, setNextUserID] = useState(1);
    useEffect(() => {
        const fetchInitialIDs = async () => {
            try {
                const res = await axios.get(`${hostUrl}/api/miscs`);
                if (res.data) {
                    setNextCustomerID(res.data.nextCustomerID || 1);
                    setNextUserID(res.data.nextUserID || 1);
                }
            } catch (error) {
                console.error('Error fetching initial IDs:', error);
            }
        };
        fetchInitialIDs();
    }, []);
    useEffect(() => {
        const handleIDSave = async () => {
            // Initial render par save na karein, jab tak ID set na ho
            if (nextCustomerID === 1 && nextUserID === 1) return; 

            try {
                await axios.post(`${hostUrl}/api/miscs/save`, {
                    nextCustomerId: nextCustomerID,
                    nextUserId: nextUserID
                });
            } catch (error) {
                console.error('Error saving next IDs:', error);
            }
        };
        handleIDSave();
    }, [nextCustomerID, nextUserID]);
    const value = {
        nextCustomerID,
        setNextCustomerID,
        nextUserID,
        setNextUserID
    };
    return (
        <NextIDContext.Provider value={ value }>
            {children}
        </NextIDContext.Provider>
    );
}

export const generateIDFromSettings = (settings, nextNumber = 1, type = 'customer') => {
    const prefix = settings[`${type}IDPrefix`] || (type === 'customer' ? 'CUST' : 'USER');
    const sep = settings[`${type}IDSeparator`] ?? '-';
    const padLength = settings[`${type}IDPadLength`] || 4;
    const pad = String(nextNumber).padStart(padLength, '0');
    const now = new Date();
    const yearFull = now.getFullYear();
    const yearShort = String(yearFull).slice(-2);
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const yearFormat = settings[`${type}YearFormat`] || 'YYYY';
    const finalYear = yearFormat === 'YY' ? yearShort : yearFull;
    let fiscalYear = '';
    if (settings[`${type}IncludeFiscalYear`]) {
        const fyStart = month >= 4 ? parseInt(finalYear) : parseInt(finalYear) - 1;
        const fyEnd = fyStart + 1;
        fiscalYear = `${fyStart}-${fyEnd}`;
    }
    let dateSegment = '';
    if (settings[`${type}IncludeDate`]) {
        dateSegment = `${String(day).padStart(2, '0')}${String(month).padStart(2, '0')}${finalYear}`;
    } else if (settings[`${type}IncludeYear`]) {
        dateSegment = finalYear;
    } else if (settings[`${type}IncludeFiscalYear`]) {
        dateSegment = fiscalYear;
    }
    let parts = [prefix];
    if (dateSegment) parts.push(dateSegment);
    parts.push(pad);
    if (settings[`${type}IDSuffix`]) parts.push(settings[`${type}IDSuffix`]);
    return parts.filter(Boolean).join(sep);
};

export const UserListsProvider = ({ children }) => {
    const { showNotification } = useNotification();
    const userInfo = JSON.parse(localStorage.getItem('user'));
    const [ userListParentId, setUserListParentId ] = useState(userInfo?.mainUserId || '');
    const { closeModal } = useModal();
    const [ isLoaded, setIsLoaded ] = useState(false); // For loading state
    const [ userListID, setUserListID ] = useState('');
    const [ userListFirstName, setUserListFirstName ] = useState('');
    const [ userListLastName, setUserListLastName ] = useState('');
    const [ userListRole, setUserListRole ] = useState('Normal');
    const [ userListAddress, setUserListAddress ] = useState('');
    const [ userListPhone, setUserListPhone ] = useState('');
    const [ userListSecondaryPhone, setUserListSecondaryPhone ] = useState('');
    const [ userListEmail, setUserListEmail ] = useState('');
    const [ userListPersonalEmail, setUserListPersonalEmail ] = useState('');
    const [ userListDepartment, setUserListDepartment ] = useState('');
    const [ userListAllowedDevices, setUserListAllowedDevices ] = useState('All');
    const [ userListAllowedDevicesCount, setUserListAllowedDevicesCount ] = useState(1);
    const [ userListAllowLogin, setUserListAllowLogin ] = useState(true);
    const [ userListPassword, setUserListPassword ] = useState('');
    const [ userListStatus, setUserListStatus ] = useState('Active');
    const [ userListLastLogin, setUserListLastLogin ] = useState(null);
    const [ userListOtpNeeded, setUserListOtpNeeded ] = useState(false);
    const [ downloadType, setDownloadType ] = useState('csv');
    const [ fileName, setFileName ] = useState('Users_List');
    const [ userLists, setUserLists ] = useState([]);
    const [ filteredData, setFilteredData ] = useState([]);
    const { nextUserID, setNextUserID } = useNextID();
    const { userSetting } = useSettings();
    const [ userListCount, setUserListCount ] = useState(0);

    const fetchUserLists = async () => {
        try {
            const res = await axios.get(`${hostUrl}/api/userlists`);
            if (res.status === 200) {
                setIsLoaded(true);
                setUserLists(res.data?.userLists || res.data);
                setFilteredData(res.data?.userLists || res.data);
                setUserListCount((res.data?.length > nextUserID ? res.data?.length : nextUserID) || 0);
            }
        } catch (error) {
            console.error('Error fetching userLists:', error);
            if (error.response?.status === 400 || error.response?.status === 404) {
                showNotification(error.response.data.message, "negative");
            } else {
                showNotification("Server error.", "negative");
            }
            return [];
        }
    };

    const clearForm = () => {
        setUserListID('');
        setUserListFirstName('');
        setUserListLastName('');
        setUserListRole('Viewer');
        setUserListAddress('');
        setUserListPhone('');
        setUserListSecondaryPhone('');
        setUserListEmail('');
        setUserListPersonalEmail('');
        setUserListDepartment('');
        setUserListAllowedDevices([]);
        setUserListAllowedDevicesCount(1);
        setUserListAllowLogin(true);
        setUserListPassword('');
        setUserListStatus('Active');
        setUserListLastLogin(null);
        setUserListOtpNeeded(false);
    };

    useEffect(() => {
        fetchUserLists();
    }, []);

    const handleUserListEntry = async (e) => {
        e.preventDefault();
        if (!userListFirstName) return showNotification('Please fill First Name.', 'negative');
        if (!userListLastName) return showNotification('Please fill Last Name.', 'negative');
        if (!userListRole) return showNotification('Please fill User Role.', 'negative');
        if (!userListPhone) return showNotification('Please fill User Phone.', 'negative');
        if (!userListEmail) return showNotification('Please fill User Email.', 'negative');
        const payload = {
            userListParentId,
            userListId: generateIDFromSettings(userSetting, nextUserID, 'user'),
            userListFirstName,
            userListLastName,
            userListRole,
            userListAddress,
            userListPhone,
            userListSecondaryPhone,
            email: userListEmail,
            userListPersonalEmail,
            userListDepartment,
            userListAllowedDevices,
            userListAllowLogin,
            userListAllowedDevicesCount,
            password: userListPassword || generateRandomPassword(),
            userListStatus,
            userListLastLogin,
            userListOtpNeeded
        };
        try {
            const res = await axios.post(`${hostUrl}/api/userlists/save`, payload);
            if (res.status === 200 || res.status === 201) {
                showNotification('UserList added successfully.', 'positive');
                setNextUserID(nextUserID + 1);
                fetchUserLists();
                closeModal();
                return true;
            } else {
                showNotification('Error adding userList.', 'negative');
                return false;
            }
        } catch (error) {
            console.error('Error adding userList:', error);
            if (error.response?.data?.message) {
                showNotification(error.response.data.message, 'negative');
            } else {
                showNotification('Error adding userList.', 'negative');
            }
            return false;
        }
    };

    const handleImportUserListCSV = async (e) => {
        e.preventDefault();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv, .xlsx'; // ✅ Accept both formats
        input.click();
        input.addEventListener('change', async () => {
            const file = input.files[0];
            if (!file) return;
            const fileExtension = file.name.split('.').pop().toLowerCase();
            if (fileExtension === 'csv') {
                // ✅ Parse CSV
                Papa.parse(file, {
                    header: true,
                    skipEmptyLines: true,
                    complete: async function (results) {
                        const json = results.data;
                        await processUserLists(json);
                    },
                    error: function (error) {
                        console.error("CSV Parsing Error:", error);
                        showNotification('Error parsing CSV file.', 'negative');
                    }
                });
            } else if (fileExtension === 'xlsx') {
                // ✅ Parse Excel
                const reader = new FileReader();
                reader.onload = async function (e) {
                    const data = new Uint8Array(e.target.result);
                    const workbook = XLSX.read(data, { type: 'array' });
                    const sheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[sheetName];
                    const json = XLSX.utils.sheet_to_json(worksheet);
                    await processUserLists(json);
                };
                reader.readAsArrayBuffer(file);
            } else {
                showNotification('Unsupported file format. Please upload CSV or Excel.', 'negative');
            }
        });
    };

    const processUserLists = async (json) => {
        let localID = nextUserID;
        for (const row of json) {
            const payload = {
                userListParentId,
                userListId: generateIDFromSettings(userListSetting, localID, 'userList'),
                userListFirstName: row['First Name'] || '',
                userListLastName: row['Last Name'] || '',
                userListRole: row['Role'] || '',
                userListAddress: row['Address'] || '',
                userListPhone: row['Phone'] || '',
                userListSecondaryPhone: row['Secondary Phone'] || '',
                email: row['Email'] || '',
                userListPersonalEmail: row['Personal Email'] || '',
                userListDepartment: row['Department'] || '',
                userListAllowedDevices: row['Allowed Devices'] || [],
                userListAllowedDevicesCount: row['Allowed Devices Count'] || 1,
                userListAllowLogin: row['Allow Login'] || true,
                password: row['Password'] || '',
                userListStatus: row['Status'] || 'Active',
                userListLastLogin: row['Last Login'] || '',
                userListOtpNeeded: row['OTP Needed'] || false
            };
            try {
                const res = await axios.post(`${hostUrl}/api/userlists/save`, payload);
                if (res.status === 200 || res.status === 201) {
                    localID++;
                } else {
                    showNotification(`Failed to add ${payload.userListFirstName}`, 'negative');
                }
            } catch (error) {
                console.error(`Error saving ${payload.userListFirstName}:`, error);
                showNotification(`Error saving ${payload.userListFirstName}`, 'negative');
            }
        }
        setNextUserID(localID);
        fetchUserLists();
        showNotification('All userList(s) processed.', 'positive');
        closeModal();
    };

    const handleExportUserListCSV = async () => {
        const res = await axios.get(`${hostUrl}/api/userlists`);
        const userLists = res.data;
        const csvRows = userLists.map((userList) => {
            return {
                'First Name': userList.userListFirstName,
                'Last Name': userList.userListLastName,
                Role: userList.userListRole,
                Address: userList.userListAddress,
                Phone: userList.userListPhone,
                'Secondary Phone': userList.userListSecondaryPhone,
                Email: userList.userListEmail,
                'Personal Email': userList.userListPersonalEmail,
                'Allowed Devices': userList.userListAllowedDevices,
                'Allowed Devices Count': userList.userListAllowedDevicesCount,
                'Allow Login': userList.userListAllowLogin,
                Password: '########',
                Status: userList.userListStatus,
                'Last Login': userList.userListLastLogin,
                'OTP Needed': userList.userListOtpNeeded
            };
        });

        if (downloadType === 'excel') {
            const workbook = XLSX.utils.book_new();
            const worksheet = XLSX.utils.json_to_sheet(csvRows);
            XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
            const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
            const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `${fileName}_${new Date().toISOString()}.xlsx`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            const csvData = Papa.unparse(csvRows);
            const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', `${fileName}_${new Date().toISOString()}.csv`);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const value = {
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
        handleImportUserListCSV,
        handleExportUserListCSV,
        downloadType,
        setDownloadType,
        fileName,
        setFileName,
        userLists,
        setUserLists,
        filteredData,
        setFilteredData,
        userListID,
        setUserListID,
        fetchUserLists,
        clearForm, // Export clearForm function
        isLoaded
    };

    return (
        <UserListsContext.Provider value={value}>
            {children}
        </UserListsContext.Provider>
    );
};

export const generateRandomPassword = (length = 10) => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[Math.floor(Math.random() * chars.length)];
  }
  return password;
};

export const PagesProvider = ({ children }) => {
    const [pages, setPages] = useState(localStorage.getItem('pages') || 'dashboard');
    const itemList = [
        { name: 'Dashboard', icon: 'fas fa-chart-line', id: 'dashboard-page', active: true, sidebar: true },
        { name: 'Payments', icon: 'fas fa-money-bill-wave', id: 'payments-page', active: false, sidebar: true },
        { name: 'Email Templates', icon: 'fas fa-envelope', id: 'templates-page', active: false, sidebar: true },
        { name: 'PDF Layouts', icon: 'fas fa-file-pdf', id: 'pdf-layouts-page', active: false, sidebar: true },
        { name: 'Signatures', icon: 'fas fa-signature', id: 'signatures-page', active: false, sidebar: true },
        { name: 'Customers', icon: 'fas fa-address-card', id: 'customers-page', active: false, sidebar: true },
        { name: 'Users', icon: 'fas fa-users', id: 'userLists-page', active: false, sidebar: true },
        { name: 'Settings', icon: 'fas fa-cog', id: 'settings-page', active: false, sidebar: true },
        { name: 'Email Template', icon: 'fas fa-envelope-open-text', id: 'email-template-page', active: false, sidebar: false },
        { name: 'PDF Template', icon: 'fas fa-file-pen', id: 'pdf-template-page', active: false, sidebar: false },
        { name: 'User Profile', icon: 'fas fa-user-alt', id: 'userProfile-page', active: false, sidebar: false },
    ];

    const value = { pages, setPages, itemList };
    return (
        <PagesContext.Provider value={value}>
            {children}
        </PagesContext.Provider>
    );
};