require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const UAParser = require('ua-parser-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ DEBUG WRAPPER TO TRACE BAD ROUTES
const originalUse = app.use;
app.use = function (pathOrFn, ...handlers) {
  console.log("🛠 Mounting route/middleware:", pathOrFn);
  return originalUse.call(this, pathOrFn, ...handlers);
};

const originalGet = app.get;
app.get = function (pathOrFn, ...handlers) {
  console.log("🛠 GET route:", pathOrFn);
  return originalGet.call(this, pathOrFn, ...handlers);
};

// ✅ Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
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

// ✅ Middleware
app.use(express.json());

// ✅ Serve frontend static files (Vite/React build)
app.use(express.static(path.join(__dirname, '../frontend', 'dist')));

// // ✅ Optional: Fallback route for SPA (React Router support)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
// });

// --- Schemas ---
const SettingsSchema = new mongoose.Schema({
    spreadsheetId: String,
    apiKey: String,
    aiAgent: String,
    emailSettings: { senderEmail: String, appPassword: String, senderName: String },
    waSettings: { waInstanseId: String, waApiKey: String, waFooter: String },
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
    parentUser: { type: String, ref: 'User', default: 'Ajay Barman' },
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
    userListCreatedBy: { type: String, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
});

const Misc = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    nextCustomerId: { type: Number },
    nextUserId: { type: Number },
});

const EmailTemplatesSchema = new mongoose.Schema({});

const LoginLog = mongoose.model('LoginLog', LoginLogSchema);
const Settings = mongoose.model('Settings', SettingsSchema);
const User = mongoose.model('User', UserSchema);
const Customer = mongoose.model('Customer', CustomerSchema);
const UserList = mongoose.model('UserList', UserListSchema);
const MiscData = mongoose.model('Misc', Misc);
const EmailTemplates = mongoose.model('EmailTemplates', EmailTemplatesSchema);

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
            ? new Date(lastLoginTimestamp).toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            : new Date().toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

        const lastLoginLogs = await LoginLog.find({ userId: user._id }).sort({ timestamp: -1 }).limit(5);
        const lastLoginLogsFormatted = lastLoginLogs.map(log => ({
            os: log.os,
            device: log.device,
            status: log.status,
            timestamp: new Date(log.timestamp).toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true}),
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
                parentUser: 'Ajay Barman',
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
            ? new Date(lastLoginTimestamp).toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })
            : new Date().toLocaleString('en-IN', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true });

        const lastLoginLogs = await LoginLog.find({ userId: user._id }).sort({ timestamp: -1 }).limit(5);
        const lastLoginLogsFormatted = lastLoginLogs.map(log => ({
            os: log.os,
            device: log.device,
            status: log.status,
            timestamp: new Date(log.timestamp).toLocaleString('en-IN', {
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
                parentUser: user.parentUser,
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
        const { email, userListParentId } = req.body;
        console.log('Received payload:', req.body);
        if (!email) {
            return res.status(400).json({ success: false, message: "User List email is required." });
        }
        const existingUserList = await UserList.findOne({ email, userListParentId });
        if (existingUserList) {
            await UserList.updateOne({ email, userListParentId }, req.body);
            res.json({ success: true, message: "User List updated successfully." });
        } else {
            const newUser = new UserList(req.body);
            await newUser.save();
            res.status(201).json({ success: true, message: "User List created successfully." });
        }
    } catch (err) {
        console.error("❌ Error in saving user list:", err);
        res.status(500).json({ success: false, message: "Error saving user list", error: err.message });
    }
});

// Get UserLists
app.get('/api/userlists', async (req, res) => {
    try {
        const userlists = await UserList.find();
        const userlistsFormatted = await Promise.all(userlists.map(async (userlist) => {
            const lastSuccessfulLog = await LoginLog.findOne({ userId: userlist._id, status: 'success' }).sort({ timestamp: -1 });
            const lastLoginFormatted = lastSuccessfulLog.timestamp || null;
            return { ...userlist.toObject(), lastLogin: lastLoginFormatted };
        }));
        res.json(userlistsFormatted);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching userlists', error: err.message });
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
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html'));
});

// --- Gemini API Routes (Keep these - they are in the correct place) ---
app.post('/api/generate-content', async (req, res) => {
    const { prompt, modelName = 'gemini-pro' } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ generatedText: text });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        if (error.response && error.response.status) {
            res.status(error.response.status).json({
                error: 'Error from Gemini API',
                details: error.response.statusText,
                data: error.response.data // If available
            });
        } else {
            res.status(500).json({ error: 'Internal server error', details: error.message });
        }
    }
});

app.post('/api/stream-content', async (req, res) => {
    const { prompt, modelName = 'gemini-pro' } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });
    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContentStream(prompt);
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Transfer-Encoding': 'chunked',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            res.write(chunkText);
        }
        res.end();
    } catch (error) {
        console.error('Error streaming from Gemini API:', error);
        res.status(500).end('Error processing stream');
    }
});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.GMAIL_APP_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function sendGenericEmail(toEmail, subject, htmlContent, senderName) {
    console.log('Sender Name:', senderName);
    const mailOptions = {
        from: `${senderName || 'Your App Name'} <${process.env.GMAIL_APP_EMAIL}>`,
        to: toEmail,
        subject: subject,
        html: htmlContent,
    };
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: %s', info.messageId);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        console.error('Error details:', error.response);
        return { success: false, error: error.message };
    }
}

app.post('/api/send-email', async (req, res) => {
    const { to, subject, html, senderName } = req.body;
    if (!to || !subject || !html) return res.status(400).json({ success: false, message: 'Missing required email parameters (to, subject, html).' });
    try {
        const result = await sendGenericEmail(to, subject, html, senderName);
        if (result.success) res.status(200).json({ success: true, message: 'Email sent successfully!', messageId: result.messageId });
        else res.status(500).json({ success: false, message: 'Failed to send email.', error: result.error });
    } catch (error) {
        console.error("API route error sending email:", error);
        res.status(500).json({ success: false, message: 'Internal server error while sending email.', error: error.message });
    }
});

app.post('/api/emailtemplates/save', async (req, res) => {
    try {
        const { _id } = req.body;
        const existingEmailTemplate = await EmailTemplates.findOne({ _id });
        if (existingEmailTemplate) {
            await EmailTemplates.updateOne({ _id }, req.body);
            res.json({ success: true, message: "Email Template updated successfully." });
        } else {
            const emailTemplate = new EmailTemplates(req.body);
            await emailTemplate.save();
            res.status(201).json({ success: true, message: "Email Template created successfully." });
        }
    } catch (err) {
        console.error("❌ Error in saving email template:", err.message);
        res.status(500).json({ success: false, message: "Error saving email template", error: err.message });
    }
});

app.get('/api/emailtemplates', async (req, res) => {
    try {
        const emailTemplates = await EmailTemplates.find();
        res.json(emailTemplates);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching email templates', error: err.message });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));