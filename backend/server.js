// C:\Users\CBX\Desktop\New Journey\Payment-app\backend\server.js
// UPDATED server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const UAParser = require('ua-parser-js');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://pay-admin-z363.vercel.app',
  'https://pay-admin.vercel.app',
  'https://pay-admin.onrender.com'
];

// ✅ CORS options
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

// ✅ Apply CORS
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight

// ✅ Middleware
app.use(express.json());

// ✅ Serve frontend static files (Vite/React build)
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Optional: Fallback route for SPA (React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// --- Schemas ---
const SettingsSchema = new mongoose.Schema({
    spreadsheetId: String,
    apiKey: String,
    aiAgent: String,
    emailSettings: { senderEmail: String, senderName: String },
    themeSettings: { type: Object, default: {} },
    customerSetting: { type: Object, default: {} },
    userSetting: { type: Object, default: {} },
    permissionSettings: { type: Object, default: {} },
    timestamp: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userRole: { type: String, default: 'Minion' },
    phone: { type: String, required: true },
    department: String,
    allowLogin: { type: Boolean, default: true },
    status: { type: String, default: 'Active' },
    otpNeeded: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

const LoginLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    email: { type: String, required: true },
    status: { type: String, enum: ['success', 'fail'], required: true },
    ipAddress: String,
    userAgent: String,
    fingerprint: String,
    os: String,
    device: String,
    timestamp: { type: Date, default: Date.now },
});

const CustomerSchema = new mongoose.Schema({
    customerId: { type: String, ref: 'Customer', default: null },
    customerName: { type: String, required: true },
    customerType: { type: String, required: true },
    customerGSTIN: String,
    customerAddress: String,
    customerPhone: { type: String, required: true },
    customerSecondaryPhone: String,
    customerEmail: { type: String, required: true },
    customerPAN: String,
    customerWebsite: String,
    customerIndustry: String,
    customerCompanySize: String,
    customerRevenue: String,
    customerOpeningBalance: String,
    customerBalanceType: String,
    customerCreditLimit: String,
    customerPaymentDays: String,
    timestamp: { type: Date, default: Date.now },
});

const UserListSchema = new mongoose.Schema({
    userListParentId: { type: String, ref: 'UserList', default: null, required: true },
    userListId: { type: String, ref: 'UserList', default: null },
    userListFirstName: { type: String, required: true },
    userListLastName: { type: String, required: true },
    userListRole: { type: String, required: true, default: 'Viewer' },
    userListAddress: String,
    userListPhone: { type: String, required: true },
    userListSecondaryPhone: String,
    email: { type: String, required: true },
    userListPersonalEmail: { type: String },
    userListDepartment: String,
    userListAllowedDevices: { type: Array, default: 'All' },
    userListAllowedDevicesCount: { type: String, default: 1 },
    userListAllowLogin: { type: Boolean, default: true },
    password: { type: String, required: true },
    userListStatus: { type: String, default: 'Active' },
    userListLastLogin: { type: Date, default: null },
    userListOtpNeeded: { type: Boolean, default: false },
    timestamp: { type: Date, default: Date.now },
});

const Misc = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    nextCustomerId: { type: Number },
    nextUserId: { type: Number },
});

const LoginLog = mongoose.model('LoginLog', LoginLogSchema);
const Settings = mongoose.model('Settings', SettingsSchema);
const User = mongoose.model('User', UserSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const UserList = mongoose.model('UserList', UserListSchema);
const MiscData = mongoose.model('Misc', Misc);

const createLoginLog = async (logData) => {
    try {
        await LoginLog.create(logData);
        console.log(`📄 Login log saved: ${logData.status} for ${logData.userEmail}`);
    } catch (err) {
        console.error("❌ Failed to save login log:", err);
    }
};

// Save Settings
app.post('/api/settings/save', async (req, res) => {
    try {
        const existing = await Settings.findOne();
        if (existing) {
            await Settings.updateOne({}, req.body);
        } else {
            await Settings.create(req.body);
        }
        res.json({ success: true, message: "Settings saved" });
    } catch (err) {
        console.error("Error saving settings:", err);
        res.status(500).json({ success: false, message: "Error saving settings" });
    }
});

// Get Settings
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await Settings.findOne();
        res.json(settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching settings' });
    }
});

// User Signup
app.post('/api/user/signup', async (req, res) => {
    const { fullName, email, password, phone, department, allowLogin, status, otpNeeded } = req.body;
    const userRole = 'Minion';
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullName, email, phone, department, allowLogin, status, otpNeeded, password: hashedPassword, userRole });
        await newUser.save();
        res.status(201).json({ success: true, message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Error saving userList", error: err.message });
    }
});

// Minion Login with Fingerprint
app.post('/api/user/login', async (req, res) => {
    const { email, password, fingerprint } = req.body;
    const parser = new UAParser(req.headers['user-agent']);
    const uaResult = parser.getResult();
    const logDetails = {
        email,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: uaResult.browser.name + ' ' + uaResult.browser.version,
        os: uaResult.os.name + ' ' + uaResult.os.version,
        device: uaResult.device.type || 'Desktop',
        fingerprint,
    };
    try {
        const user = await User.findOne({ email });
        if (!user) {
            await createLoginLog({ ...logDetails, status: 'fail' });
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            await createLoginLog({ ...logDetails, status: 'fail', userId: user._id });
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        const lastSuccessfulLog = await LoginLog.findOne({ userId: user._id, status: 'success' }).sort({ timestamp: -1 });
        const lastLoginTimestamp = lastSuccessfulLog ? lastSuccessfulLog.timestamp : null;
        const lastLoginFormatted = lastLoginTimestamp
            ? new Date(lastLoginTimestamp).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            : new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

        const lastLoginLogs = await LoginLog.find({ userId: user._id }).sort({ timestamp: -1 }).limit(5);
        const lastLoginLogsFormatted = lastLoginLogs.map(log => ({
            os: log.os,
            device: log.device,
            status: log.status,
            timestamp: new Date(log.timestamp).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }),
            ipAddress: log.ipAddress,
            userAgent: log.userAgent,
        }));

        await createLoginLog({ ...logDetails, status: 'success', userId: user._id });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                userRole: 'Minion',
                department: user.department,
                mainUserId: user._id,
                token,
                lastLogin: lastLoginFormatted,
                lastLoginLogs: lastLoginLogsFormatted
            },
        });
    } catch (err) {
        console.error("🔥 Server error in login route:", err);
        await createLoginLog({ ...logDetails, status: 'fail' });
        res.status(500).json({ success: false, message: "Error saving userList", error: err.message });
    }
});

// User Login with Fingerprint
app.post('/api/userlists/login', async (req, res) => {
    const { email, password, fingerprint } = req.body;
    const parser = new UAParser(req.headers['user-agent']);
    const uaResult = parser.getResult();
    const logDetails = {
        email,
        ipAddress: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
        userAgent: uaResult.browser.name + ' ' + uaResult.browser.version,
        os: uaResult.os.name + ' ' + uaResult.os.version,
        device: uaResult.device.type || 'Desktop',
        fingerprint,
    };
    try {
        const user = await UserList.findOne({ email });
        if (!user) {
            await createLoginLog({ ...logDetails, status: 'fail' });
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = password === user.password;
        if (!isMatch) {
            await createLoginLog({ ...logDetails, status: 'fail', userId: user._id });
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id, email: user.email, role: user.userListRole }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        const lastSuccessfulLog = await LoginLog.findOne({ userId: user._id, status: 'success' }).sort({ timestamp: -1 });
        const lastLoginTimestamp = lastSuccessfulLog ? lastSuccessfulLog.timestamp : null;
        const lastLoginFormatted = lastLoginTimestamp
            ? new Date(lastLoginTimestamp).toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            : new Date().toLocaleString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

        const lastLoginLogs = await LoginLog.find({ userId: user._id }).sort({ timestamp: -1 }).limit(5);
        const lastLoginLogsFormatted = lastLoginLogs.map(log => ({
            os: log.os,
            device: log.device,
            status: log.status,
            timestamp: new Date(log.timestamp).toLocaleString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            }),
            ipAddress: log.ipAddress,
            userAgent: log.userAgent,
        }));

        await createLoginLog({ ...logDetails, status: 'success', userId: user._id });
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: {
                fullName: user.userListFirstName + ' ' + user.userListLastName,
                email: user.email,
                phone: user.userListPhone,
                userRole: user.userListRole,
                department: user.userListDepartment,
                mainUserId: user.userListParentId,
                token,
                lastLogin: lastLoginFormatted,
                lastLoginLogs: lastLoginLogsFormatted
            },
        });
    } catch (err) {
        console.error(" Server error in login route:", err);
        await createLoginLog({ ...logDetails, status: 'fail' });
        res.status(500).json({ success: false, message: "Error saving userList", error: err.message });
    }
});

// Save Customers
app.post('/api/customers/save', async (req, res) => {
    try {
        const { customerEmail, _id } = req.body;
        if (!customerEmail) {
            return res.status(400).json({ success: false, message: "Customer email is required." });
        }
        const existingCustomer = await Customer.findOne({ _id });
        if (existingCustomer) {
            await Customer.updateOne({ _id }, req.body);
            res.json({ success: true, message: "Customer updated successfully." });
        } else {
            const newCutomer = new Customer(req.body);
            await newCutomer.save();
            res.status(201).json({ success: true, message: "Customer created successfully." });
        }
    } catch (err) {
        console.error("❌ Error in saving customer:", err.message);
        res.status(500).json({ success: false, message: "Error saving customer" });
    }
});

// Get Settings
app.get('/api/customers', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.json(customers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching customers' });
    }
});

// Save UserLists
app.post('/api/userlists/save', async (req, res) => {
    try {
        const { email, _id } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "UserList email is required." });
        }
        const existingUserList = await UserList.findOne({ email });
        if (existingUserList) {
            await UserList.updateOne({ email }, req.body);
            res.json({ success: true, message: "UserList updated successfully." });
        } else {
            const newUser = new UserList(req.body);
            await newUser.save();
            res.status(201).json({ success: true, message: "UserList created successfully." });
        }
    } catch (err) {
        console.error("❌ Error in saving userList:", err);
        res.status(500).json({ success: false, message: "Error saving userList", error: err.message });
    }
});

// Get UserLists
app.get('/api/userlists', async (req, res) => {
    try {
        const userlists = await UserList.find();
        res.json(userlists);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching userlists' });
    }
});

app.post('/api/miscs/save', async (req, res) => {
    try {
        const existing = await MiscData.findOne();
        if (existing) {
            await MiscData.updateOne({}, req.body);
        } else {
            await MiscData.create(req.body);
        }
        res.json({ success: true, message: "Settings saved" });
    } catch (err) {
        console.error("Error saving settings:", err);
        res.status(500).json({ success: false, message: "Error saving settings" });
    }
});

app.get('/api/miscs', async (req, res) => {
    try {
        const settings = await MiscData.findOne();
        res.json(settings);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching settings' });
    }
});

// React SPA fallback
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
