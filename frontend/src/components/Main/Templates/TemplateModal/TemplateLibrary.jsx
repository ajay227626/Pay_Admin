import React, { useState } from 'react';
import { Search, Star, Download, Eye, Copy, Trash2, Plus, Filter } from 'lucide-react';

const TemplateLibrary = ({ onTemplateSelect, onError }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [templateLibraryCollapsed, setTemplateLibraryCollapsed] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [templates] = useState([
        {
            id: 1,
            name: 'Professional Welcome Email',
            category: 'onboarding',
            subject: '🎉 Welcome aboard! Let\'s get you started',
            content: `
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f7; padding:20px 0;">
                    <tr>
                        <td align="center">
                            <table width="650" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff; font-family: Arial, sans-serif;">
                                <!-- HEADER -->
                                <tr>
                                    <td align="center" style="background-color:#667eea; padding:40px 20px; color:#ffffff;">
                                        <div style="width:80px; height:80px; background-color:rgba(255,255,255,0.2); border-radius:50%; margin:0 auto; text-align:center; line-height:80px; font-size:36px;">✨</div>
                                        <h1 style="margin:20px 0 10px; font-size:28px; font-weight:bold;">Welcome to the Team!</h1>
                                        <p style="margin:0; font-size:16px;">We're thrilled to have you join our community</p>
                                    </td>
                                </tr>
                                
                                <!-- BODY -->
                                <tr>
                                    <td style="padding:30px;">
                                        <p style="font-size:16px; line-height:1.6; color:#333;">Hello and welcome! 👋</p>
                                        <p style="font-size:16px; line-height:1.6; color:#555;">
                                            We're absolutely delighted to welcome you to our platform. You've just taken the first step towards an amazing journey, and we're here to support you every step of the way.
                                        </p>

                                        <!-- GETTING STARTED BOX -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f8fafc; padding:20px; margin:20px 0; border-radius:4px;">
                                            <tr>
                                                <td>
                                                    <h2 style="font-size:18px; color:#2d3748; margin:0 0 15px;">🚀 Let’s get you started in 3 easy steps:</h2>
                                                    <p style="margin:0 0 10px; font-size:15px; color:#4a5568;">
                                                        <strong>1.</strong> Complete your profile and personalize your experience
                                                    </p>
                                                    <p style="margin:0 0 10px; font-size:15px; color:#4a5568;">
                                                        <strong>2.</strong> Explore our powerful features and tools
                                                    </p>
                                                    <p style="margin:0; font-size:15px; color:#4a5568;">
                                                        <strong>3.</strong> Connect with our vibrant community
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- CTA BUTTON -->
                                        <table align="center" cellpadding="0" cellspacing="0" border="0" style="margin:30px auto;">
                                            <tr>
                                                <td align="center" bgcolor="#667eea" style="border-radius:25px;">
                                                    <a href="#" style="display:inline-block; padding:15px 30px; font-size:16px; color:#ffffff; text-decoration:none; font-weight:bold;">
                                                        Get Started Now →
                                                    </a>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- SUPPORT -->
                                        <hr style="border:none; border-top:1px solid #e2e8f0; margin:30px 0;">
                                        <p style="font-size:15px; line-height:1.6; color:#555;">
                                            Need help getting started? Our support team is available 24/7.
                                        </p>
                                        <p style="margin:10px 0;">
                                            <a href="#" style="color:#667eea; text-decoration:none;">📚 Help Center</a> &nbsp;|&nbsp;
                                            <a href="#" style="color:#667eea; text-decoration:none;">💬 Live Chat</a> &nbsp;|&nbsp;
                                            <a href="#" style="color:#667eea; text-decoration:none;">📧 Contact Support</a>
                                        </p>
                                    </td>
                                </tr>

                                <!-- FOOTER -->
                                <tr>
                                    <td align="center" style="background-color:#f7fafc; padding:20px; font-size:14px; color:#718096;">
                                        <p style="margin:0 0 8px; font-weight:bold; color:#4a5568;">Welcome to the family!</p>
                                        <p style="margin:0 0 10px;">The [Your Company Name] Team</p>
                                        
                                        <!-- SOCIAL LINKS -->
                                        <p style="margin:10px 0;">
                                            <a href="#" style="margin:0 8px; text-decoration:none; color:#a0aec0;">📘</a>
                                            <a href="#" style="margin:0 8px; text-decoration:none; color:#a0aec0;">🐦</a>
                                            <a href="#" style="margin:0 8px; text-decoration:none; color:#a0aec0;">💼</a>
                                            <a href="#" style="margin:0 8px; text-decoration:none; color:#a0aec0;">📷</a>
                                        </p>
                                        
                                        <p style="margin:10px 0; font-size:12px; color:#a0aec0;">
                                            You're receiving this email because you recently created an account.<br>
                                            If you didn’t create an account, please <a href="#" style="color:#667eea; text-decoration:none;">let us know</a>.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            thumbnail: 'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
            rating: 4.9,
            downloads: 2480,
            isFavorite: true
        }, {
            id: 2,
            name: 'Premium Newsletter Template',
            category: 'newsletter',
            subject: '📰 Your Weekly Digest - Exciting Updates Inside!',
            content: `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <!-- Main Container -->
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                                
                                <!-- Header -->
                                <tr>
                                    <td style="background-color: #3b82f6; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <div style="background-color: rgba(255,255,255,0.2); width: 60px; height: 60px; border-radius: 30px; margin: 0 auto 15px; line-height: 60px; text-align: center;">
                                                        <span style="font-size: 24px;">📰</span>
                                                    </div>
                                                    <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: bold;">Weekly Newsletter</h1>
                                                    <p style="margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your curated dose of insights and updates</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td style="padding: 40px 30px;">
                                        
                                        <!-- Section Title -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 30px;">
                                            <tr>
                                                <td align="center">
                                                    <h2 style="color: #1f2937; margin: 0; font-size: 22px; font-weight: bold;">This Week's Highlights</h2>
                                                    <div style="width: 60px; height: 3px; background-color: #3b82f6; margin: 12px auto;"></div>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Feature Update Card -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 8px; margin: 25px 0; border-left: 5px solid #3b82f6;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td width="50" style="vertical-align: top; padding-right: 15px;">
                                                                <div style="background-color: #3b82f6; color: #ffffff; width: 40px; height: 40px; border-radius: 20px; line-height: 40px; text-align: center;">
                                                                    <span style="font-size: 16px;">🚀</span>
                                                                </div>
                                                            </td>
                                                            <td style="vertical-align: top;">
                                                                <h3 style="margin: 0 0 8px 0; color: #1e40af; font-size: 18px; font-weight: bold;">Major Feature Update</h3>
                                                                <p style="margin: 0 0 10px 0; color: #4b5563; line-height: 1.5; font-size: 15px;">We've rolled out powerful new functionality designed to streamline your workflow and boost productivity. Experience enhanced performance like never before.</p>
                                                                <a href="#" style="color: #3b82f6; text-decoration: none; font-weight: bold; font-size: 14px;">Learn more →</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Community Spotlight Card -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f0fdf4; border-radius: 8px; margin: 25px 0; border-left: 5px solid #10b981;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td width="50" style="vertical-align: top; padding-right: 15px;">
                                                                <div style="background-color: #10b981; color: #ffffff; width: 40px; height: 40px; border-radius: 20px; line-height: 40px; text-align: center;">
                                                                    <span style="font-size: 16px;">✨</span>
                                                                </div>
                                                            </td>
                                                            <td style="vertical-align: top;">
                                                                <h3 style="margin: 0 0 8px 0; color: #059669; font-size: 18px; font-weight: bold;">Community Spotlight</h3>
                                                                <p style="margin: 0 0 10px 0; color: #4b5563; line-height: 1.5; font-size: 15px;">Discover amazing creations from our community members this week. From innovative solutions to creative implementations - our users continue to inspire us daily.</p>
                                                                <a href="#" style="color: #10b981; text-decoration: none; font-weight: bold; font-size: 14px;">View showcase →</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Weekly Stats -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 8px; margin: 30px 0;">
                                            <tr>
                                                <td style="padding: 25px;">
                                                    <h3 style="margin: 0 0 20px 0; color: #374151; font-size: 18px; font-weight: bold; text-align: center;">Weekly Stats</h3>
                                                    
                                                    <!-- Stats Row -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td width="33.33%" align="center">
                                                                <div style="font-size: 22px; font-weight: bold; color: #3b82f6; margin-bottom: 5px;">2.5K+</div>
                                                                <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">New Users</div>
                                                            </td>
                                                            <td width="33.33%" align="center">
                                                                <div style="font-size: 22px; font-weight: bold; color: #10b981; margin-bottom: 5px;">98.2%</div>
                                                                <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Uptime</div>
                                                            </td>
                                                            <td width="33.33%" align="center">
                                                                <div style="font-size: 22px; font-weight: bold; color: #f59e0b; margin-bottom: 5px;">15K+</div>
                                                                <div style="font-size: 11px; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px;">Messages</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f8fafc; padding: 25px 30px; text-align: center; border-top: 1px solid #e5e7eb; border-radius: 0 0 8px 8px;">
                                        <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">
                                            Thanks for being part of our community!
                                        </p>
                                        <div style="margin: 15px 0;">
                                            <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 10px; font-size: 12px;">Unsubscribe</a>
                                            <span style="color: #d1d5db;">|</span>
                                            <a href="#" style="color: #6b7280; text-decoration: none; margin: 0 10px; font-size: 12px;">Update Preferences</a>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            thumbnail: 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
            rating: 4.8,
            downloads: 1450,
            isFavorite: true
        }, {
            id: 3,
            name: 'Premium Product Launch',
            category: 'marketing',
            subject: '🚀 Revolutionary Product Launch - Be Among the First!',
            content: `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <!-- Main Container -->
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                
                                <!-- Hero Section -->
                                <tr>
                                    <td style="background-color: #667eea; padding: 50px 30px; text-align: center;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <div style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 40px; margin: 0 auto 25px; line-height: 80px; text-align: center;">
                                                        <span style="font-size: 36px;">🚀</span>
                                                    </div>
                                                    <h1 style="margin: 0; color: #ffffff; font-size: 34px; font-weight: bold;">Product Launch</h1>
                                                    <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.9); font-size: 18px;">The future is here, and it's extraordinary!</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Content Section -->
                                <tr>
                                    <td style="padding: 50px 40px;">
                                        
                                        <!-- Introduction -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 40px;">
                                            <tr>
                                                <td align="center">
                                                    <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 26px; font-weight: bold;">Introducing Our Latest Innovation</h2>
                                                    <div style="width: 80px; height: 4px; background-color: #667eea; margin: 0 auto 25px; border-radius: 2px;"></div>
                                                    <p style="color: #4b5563; line-height: 1.6; font-size: 16px; margin: 0; max-width: 500px;">We're thrilled to unveil our groundbreaking product that will revolutionize your workflow and transform the way you approach your daily challenges.</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Feature Cards -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 40px 0;">
                                            <tr>
                                                <td width="48%" style="vertical-align: top; background-color: #f0f9ff; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #e0f2fe;">
                                                    <div style="font-size: 28px; margin-bottom: 15px;">⚡</div>
                                                    <h3 style="margin: 0 0 10px 0; color: #0369a1; font-size: 18px; font-weight: bold;">Lightning Fast</h3>
                                                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Experience unprecedented speed and efficiency</p>
                                                </td>
                                                <td width="4%"></td>
                                                <td width="48%" style="vertical-align: top; background-color: #f0fdf4; padding: 25px; border-radius: 8px; text-align: center; border: 1px solid #dcfce7;">
                                                    <div style="font-size: 28px; margin-bottom: 15px;">🎯</div>
                                                    <h3 style="margin: 0 0 10px 0; color: #059669; font-size: 18px; font-weight: bold;">Precision Built</h3>
                                                    <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Engineered for accuracy and reliability</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- CTA Section -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border-radius: 12px; margin: 40px 0; border: 1px solid #e2e8f0;">
                                            <tr>
                                                <td style="padding: 35px; text-align: center;">
                                                    <h3 style="margin: 0 0 15px 0; color: #1e293b; font-size: 20px; font-weight: bold;">Ready to Transform Your Experience?</h3>
                                                    <p style="margin: 0 0 25px 0; color: #475569; font-size: 16px;">Join thousands of satisfied customers who have already made the switch.</p>
                                                    
                                                    <!-- Buttons -->
                                                    <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                                        <tr>
                                                            <td style="padding-right: 15px;">
                                                                <a href="#" style="background-color: #667eea; color: #ffffff; padding: 15px 35px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block;">Get Started Now</a>
                                                            </td>
                                                            <td>
                                                                <a href="#" style="background-color: #ffffff; color: #667eea; padding: 13px 33px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 16px; display: inline-block; border: 2px solid #667eea;">Learn More</a>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Social Proof -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 35px; padding-top: 30px; border-top: 1px solid #e5e7eb;">
                                            <tr>
                                                <td align="center">
                                                    <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 14px;">Trusted by industry leaders worldwide</p>
                                                    
                                                    <!-- Company Names -->
                                                    <table border="0" cellspacing="0" cellpadding="0" style="margin: 0 auto;">
                                                        <tr>
                                                            <td style="color: #9ca3af; font-weight: bold; font-size: 16px; padding: 0 15px;">Company A</td>
                                                            <td style="color: #d1d5db; font-size: 12px;">•</td>
                                                            <td style="color: #9ca3af; font-weight: bold; font-size: 16px; padding: 0 15px;">Company B</td>
                                                            <td style="color: #d1d5db; font-size: 12px;">•</td>
                                                            <td style="color: #9ca3af; font-weight: bold; font-size: 16px; padding: 0 15px;">Company C</td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                    </td>
                                </tr>
                                
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            thumbnail: 'https://images.pexels.com/photos/1591061/pexels-photo-1591061.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
            rating: 4.9,
            downloads: 3250,
            isFavorite: true
        }, {
            id: 4,
            name: 'Premium Event Invitation',
            category: 'events',
            subject: '🎉 Exclusive Invitation - Reserve Your Spot Today!',
            content: `
                <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f4f4f4;">
                    <tr>
                        <td align="center" style="padding: 20px 0;">
                            <!-- Main Container -->
                            <table width="600" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                                
                                <!-- Header -->
                                <tr>
                                    <td style="background-color: #f59e0b; padding: 40px 30px; text-align: center;">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                            <tr>
                                                <td align="center">
                                                    <div style="background-color: rgba(255,255,255,0.2); width: 70px; height: 70px; border-radius: 35px; margin: 0 auto 20px; line-height: 70px; text-align: center;">
                                                        <span style="font-size: 32px;">🎉</span>
                                                    </div>
                                                    <h1 style="margin: 0; color: #ffffff; font-size: 30px; font-weight: bold;">You're Invited!</h1>
                                                    <p style="margin: 12px 0 0 0; color: rgba(255,255,255,0.9); font-size: 18px;">Join us for an unforgettable experience</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Content -->
                                <tr>
                                    <td style="padding: 45px 35px;">
                                        
                                        <!-- Introduction -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 35px;">
                                            <tr>
                                                <td align="center">
                                                    <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 24px; font-weight: bold;">Exclusive Industry Summit 2024</h2>
                                                    <div style="width: 70px; height: 3px; background-color: #f59e0b; margin: 0 auto 20px; border-radius: 2px;"></div>
                                                    <p style="color: #4b5563; line-height: 1.6; font-size: 16px; margin: 0;">Don't miss this exceptional opportunity to network with industry pioneers, discover cutting-edge trends, and gain insights that will shape the future.</p>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- Event Details Card -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #fef3c7; border-radius: 12px; margin: 30px 0; border: 1px solid #fde68a;">
                                            <tr>
                                                <td style="padding: 30px;">
                                                    <h3 style="margin: 0 0 25px 0; color: #92400e; font-size: 20px; font-weight: bold; text-align: center;">Event Details</h3>
                                                    
                                                    <!-- Date -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                                                        <tr>
                                                            <td width="50" style="vertical-align: top;">
                                                                <div style="background-color: #f59e0b; color: #ffffff; width: 40px; height: 40px; border-radius: 20px; line-height: 40px; text-align: center;">
                                                                    <span style="font-size: 16px;">📅</span>
                                                                </div>
                                                            </td>
                                                            <td style="vertical-align: top; padding-left: 15px;">
                                                                <div style="font-weight: bold; color: #92400e; margin-bottom: 2px;">Date</div>
                                                                <div style="color: #a16207; font-size: 15px;">March 15, 2024</div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Time -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 20px;">
                                                        <tr>
                                                            <td width="50" style="vertical-align: top;">
                                                                <div style="background-color: #f59e0b; color: #ffffff; width: 40px; height: 40px; border-radius: 20px; line-height: 40px; text-align: center;">
                                                                    <span style="font-size: 16px;">🕕</span>
                                                                </div>
                                                            </td>
                                                            <td style="vertical-align: top; padding-left: 15px;">
                                                                <div style="font-weight: bold; color: #92400e; margin-bottom: 2px;">Time</div>
                                                                <div style="color: #a16207; font-size: 15px;">6:00 PM - 9:00 PM</div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- Location -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td width="50" style="vertical-align: top;">
                                                                <div style="background-color: #f59e0b; color: #ffffff; width: 40px; height: 40px; border-radius: 20px; line-height: 40px; text-align: center;">
                                                                    <span style="font-size: 16px;">📍</span>
                                                                </div>
                                                            </td>
                                                            <td style="vertical-align: top; padding-left: 15px;">
                                                                <div style="font-weight: bold; color: #92400e; margin-bottom: 2px;">Location</div>
                                                                <div style="color: #a16207; font-size: 15px;">Grand Convention Center<br>Downtown Business District</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- What to Expect -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 35px 0;">
                                            <tr>
                                                <td align="center">
                                                    <h3 style="color: #374151; font-size: 20px; font-weight: bold; margin: 0 0 20px 0;">What to Expect</h3>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tr>
                                                            <td width="33.33%" align="center" style="padding: 20px;">
                                                                <div style="font-size: 24px; margin-bottom: 10px;">🎯</div>
                                                                <div style="color: #374151; font-weight: bold; font-size: 14px;">Expert Keynotes</div>
                                                            </td>
                                                            <td width="33.33%" align="center" style="padding: 20px;">
                                                                <div style="font-size: 24px; margin-bottom: 10px;">🤝</div>
                                                                <div style="color: #374151; font-weight: bold; font-size: 14px;">Premium Networking</div>
                                                            </td>
                                                            <td width="33.33%" align="center" style="padding: 20px;">
                                                                <div style="font-size: 24px; margin-bottom: 10px;">🍽️</div>
                                                                <div style="color: #374151; font-weight: bold; font-size: 14px;">Gourmet Catering</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>

                                        <!-- CTA Section -->
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 40px 0;">
                                            <tr>
                                                <td align="center">
                                                    <!-- Urgency Box -->
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 25px;">
                                                        <tr>
                                                            <td style="padding: 25px; text-align: center;">
                                                                <p style="margin: 0 0 15px 0; color: #374151; font-size: 16px; font-weight: bold;">Limited seats available - Secure your spot today!</p>
                                                                <div style="color: #f59e0b; font-weight: bold; font-size: 14px;">⏰ Early bird pricing ends soon</div>
                                                            </td>
                                                        </tr>
                                                    </table>

                                                    <!-- CTA Button -->
                                                    <a href="#" style="background-color: #f59e0b; color: #ffffff; padding: 18px 40px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 18px; display: inline-block;">Reserve My Seat →</a>
                                                    
                                                    <p style="margin: 20px 0 0 0; color: #6b7280; font-size: 13px;">
                                                        Can't attend? <a href="#" style="color: #f59e0b; text-decoration: none;">Register for virtual access</a>
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <!-- Footer -->
                                <tr>
                                    <td style="background-color: #f9fafb; padding: 25px 35px; text-align: center; border-top: 1px solid #e5e7eb;">
                                        <p style="margin: 0 0 10px 0; color: #374151; font-size: 15px; font-weight: bold;">Questions? We're here to help!</p>
                                        <p style="margin: 0; color: #6b7280; font-size: 13px;">
                                            Contact us at <a href="mailto:events@company.com" style="color: #f59e0b; text-decoration: none;">events@company.com</a> or call (555) 123-4567
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            thumbnail: 'https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
            rating: 4.8,
            downloads: 980,
            isFavorite: true
        }, {
            id: 5,
            name: 'Premium Thank You Email',
            category: 'transactional',
            subject: '🙏 Thank You! Your Order is Confirmed - What\'s Next?',
            content: `
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
                    <!-- Header -->
                    <tr>
                        <td style="background-color: #10b981; padding: 40px 30px; text-align: center; position: relative;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="text-align: center;">
                                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="background-color: rgba(255,255,255,0.2); width: 80px; height: 80px; border-radius: 50%; text-align: center; vertical-align: middle;">
                                                    <span style="font-size: 36px;">✅</span>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; padding-top: 20px;">
                                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Thank You!</h1>
                                        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Your order has been successfully confirmed</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <!-- Success Message -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 30px;">
                                        <h2 style="color: #1f2937; margin: 0 0 15px 0; font-size: 22px; font-weight: bold;">We're Processing Your Order</h2>
                                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="width: 50px; height: 3px; background-color: #10b981; border-radius: 2px;"></td>
                                            </tr>
                                        </table>
                                        <p style="color: #4b5563; line-height: 1.6; font-size: 14px; margin: 15px 0 0 0;">Thank you for choosing us! We truly appreciate your business and trust in our products. Your satisfaction is our top priority.</p>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Order Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0fdf4; border-radius: 8px; border: 1px solid #bbf7d0; margin: 20px 0;">
                                <tr>
                                    <td style="padding: 25px;">
                                        <h3 style="margin: 0 0 20px 0; color: #059669; font-size: 18px; font-weight: bold; text-align: center;">Order Summary</h3>
                                        
                                        <!-- Order Number -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 6px; border: 1px solid #d1fae5; margin-bottom: 12px;">
                                            <tr>
                                                <td style="padding: 12px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width: 30px; vertical-align: middle;">
                                                                <table cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td style="background-color: #10b981; color: #ffffff; width: 28px; height: 28px; border-radius: 4px; text-align: center; vertical-align: middle; font-size: 12px; font-weight: bold;">#</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="padding-left: 12px; vertical-align: middle;">
                                                                <div style="font-weight: bold; color: #059669; font-size: 14px;">Order Number</div>
                                                                <div style="color: #047857; font-size: 12px;">Reference for tracking</div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle;">
                                                                <span style="font-weight: bold; color: #1f2937; font-size: 14px;">#ORD-12345</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Order Date -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 6px; border: 1px solid #d1fae5; margin-bottom: 12px;">
                                            <tr>
                                                <td style="padding: 12px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width: 30px; vertical-align: middle;">
                                                                <table cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td style="background-color: #10b981; color: #ffffff; width: 28px; height: 28px; border-radius: 4px; text-align: center; vertical-align: middle; font-size: 12px;">📅</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="padding-left: 12px; vertical-align: middle;">
                                                                <div style="font-weight: bold; color: #059669; font-size: 14px;">Order Date</div>
                                                                <div style="color: #047857; font-size: 12px;">When you placed the order</div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle;">
                                                                <span style="font-weight: bold; color: #1f2937; font-size: 14px;">March 10, 2024</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                        
                                        <!-- Total Amount -->
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border-radius: 6px; border: 1px solid #d1fae5;">
                                            <tr>
                                                <td style="padding: 12px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width: 30px; vertical-align: middle;">
                                                                <table cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td style="background-color: #10b981; color: #ffffff; width: 28px; height: 28px; border-radius: 4px; text-align: center; vertical-align: middle; font-size: 12px;">💳</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="padding-left: 12px; vertical-align: middle;">
                                                                <div style="font-weight: bold; color: #059669; font-size: 14px;">Total Amount</div>
                                                                <div style="color: #047857; font-size: 12px;">Including taxes & shipping</div>
                                                            </td>
                                                            <td style="text-align: right; vertical-align: middle;">
                                                                <span style="font-weight: bold; color: #1f2937; font-size: 16px;">$99.99</span>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Next Steps -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                                <tr>
                                    <td style="text-align: center; padding-bottom: 20px;">
                                        <h3 style="color: #374151; font-size: 18px; font-weight: bold; margin: 0;">What Happens Next?</h3>
                                    </td>
                                </tr>
                                
                                <!-- Step 1 -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981;">
                                            <tr>
                                                <td style="padding: 15px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width: 35px; vertical-align: top;">
                                                                <table cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td style="background-color: #10b981; color: #ffffff; width: 25px; height: 25px; border-radius: 50%; text-align: center; vertical-align: middle; font-size: 12px; font-weight: bold;">1</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="padding-left: 12px; vertical-align: top;">
                                                                <div style="font-weight: bold; color: #374151; margin-bottom: 5px; font-size: 14px;">Order Processing</div>
                                                                <div style="color: #6b7280; font-size: 13px; line-height: 1.4;">Your order is being prepared and will be processed within 24 hours.</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Step 2 -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #3b82f6;">
                                            <tr>
                                                <td style="padding: 15px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width: 35px; vertical-align: top;">
                                                                <table cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td style="background-color: #3b82f6; color: #ffffff; width: 25px; height: 25px; border-radius: 50%; text-align: center; vertical-align: middle; font-size: 12px; font-weight: bold;">2</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="padding-left: 12px; vertical-align: top;">
                                                                <div style="font-weight: bold; color: #374151; margin-bottom: 5px; font-size: 14px;">Shipping Notification</div>
                                                                <div style="color: #6b7280; font-size: 13px; line-height: 1.4;">You'll receive tracking information once your order ships.</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <!-- Step 3 -->
                                <tr>
                                    <td style="padding-bottom: 15px;">
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; border-radius: 8px; border-left: 4px solid #f59e0b;">
                                            <tr>
                                                <td style="padding: 15px;">
                                                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                                        <tr>
                                                            <td style="width: 35px; vertical-align: top;">
                                                                <table cellpadding="0" cellspacing="0" border="0">
                                                                    <tr>
                                                                        <td style="background-color: #f59e0b; color: #ffffff; width: 25px; height: 25px; border-radius: 50%; text-align: center; vertical-align: middle; font-size: 12px; font-weight: bold;">3</td>
                                                                    </tr>
                                                                </table>
                                                            </td>
                                                            <td style="padding-left: 12px; vertical-align: top;">
                                                                <div style="font-weight: bold; color: #374151; margin-bottom: 5px; font-size: 14px;">Delivery & Enjoy</div>
                                                                <div style="color: #6b7280; font-size: 13px; line-height: 1.4;">Your order will arrive within 3-5 business days. Enjoy!</div>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- CTA Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; margin: 30px 0;">
                                <tr>
                                    <td style="padding: 25px; text-align: center;">
                                        <h3 style="margin: 0 0 10px 0; color: #1e293b; font-size: 18px; font-weight: bold;">Track Your Order</h3>
                                        <p style="margin: 0 0 20px 0; color: #475569; font-size: 14px;">Stay updated on your order status and delivery progress.</p>
                                        
                                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 8px 0 0;">
                                                    <a href="#" style="background-color: #10b981; color: #ffffff; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block;">Track Order →</a>
                                                </td>
                                                <td style="padding: 0 0 0 8px;">
                                                    <a href="#" style="background-color: #ffffff; color: #10b981; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold; font-size: 14px; display: inline-block; border: 2px solid #10b981;">View Receipt</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Support Section -->
                            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fef9e7; border-radius: 8px; border: 1px solid #fde68a; margin: 25px 0;">
                                <tr>
                                    <td style="padding: 20px; text-align: center;">
                                        <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px; font-weight: bold;">Need Help?</h3>
                                        <p style="margin: 0 0 15px 0; color: #a16207; font-size: 13px; line-height: 1.4;">Our customer support team is here to assist you with any questions or concerns.</p>
                                        <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                                            <tr>
                                                <td style="padding: 0 15px;">
                                                    <a href="#" style="color: #d97706; text-decoration: none; font-weight: bold; font-size: 13px;">💬 Live Chat</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="#" style="color: #d97706; text-decoration: none; font-weight: bold; font-size: 13px;">📧 Email Support</a>
                                                </td>
                                                <td style="padding: 0 15px;">
                                                    <a href="#" style="color: #d97706; text-decoration: none; font-weight: bold; font-size: 13px;">📞 Call Us</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
                            <p style="margin: 0 0 10px 0; color: #374151; font-size: 14px; font-weight: bold;">Thank you for choosing us! 💚</p>
                            <p style="margin: 0 0 15px 0; color: #6b7280; font-size: 13px;">We appreciate your business and look forward to serving you again.</p>
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                                <tr>
                                    <td style="padding: 0 8px;">
                                        <a href="#" style="color: #6b7280; text-decoration: none; font-size: 11px;">Order Policy</a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="#" style="color: #6b7280; text-decoration: none; font-size: 11px;">Returns & Exchanges</a>
                                    </td>
                                    <td style="padding: 0 8px;">
                                        <a href="#" style="color: #6b7280; text-decoration: none; font-size: 11px;">Customer Support</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            `,
            thumbnail: 'https://images.pexels.com/photos/1591058/pexels-photo-1591058.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
            rating: 4.9,
            downloads: 2650,
            isFavorite: true
        },
    ]);

    const handleCollapsed = (type) => {
        const el = document.getElementById(type);
        switch (type) {
            case 'templateLibrary':
                setTemplateLibraryCollapsed(!templateLibraryCollapsed);
                el.classList.toggle('hidden');
                break;
        }
    }

    const categories = [
        { value: 'all', label: 'All Templates' },
        { value: 'onboarding', label: 'Onboarding' },
        { value: 'newsletter', label: 'Newsletter' },
        { value: 'marketing', label: 'Marketing' },
        { value: 'events', label: 'Events' },
        { value: 'transactional', label: 'Transactional' }
    ];

    const filteredTemplates = templates.filter(template => {
        const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) || template.subject.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleTemplateSelect = (template) => { onTemplateSelect(template); };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />);
        }
        if (hasHalfStar) stars.push(<Star key="half" className="w-3 h-3 fill-yellow-400 text-yellow-400" style={{ clipPath: 'inset(0 50% 0 0)' }} />);
        const emptyStars = 5 - Math.ceil(rating);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />);
        }
        return stars;
    };

    return (
        <div className="p-4 space-y-4">
            {/* Header */}
            <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-800 flex items-center flex justify-between">
                    <span> 📚 Template Library </span>
                    <span onClick={() => handleCollapsed('templateLibrary')} className="border border-transparent hover:border-gray-300 hover:bg-gray-100 rounded-full px-2 py-1 cursor-pointer">{templateLibraryCollapsed ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}</span>
                </h3>
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search templates..." className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" />
                </div>
                {/* Category Filter */}
                <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none">{categories.map(category => (<option key={category.value} value={category.value}>{category.label}</option>))}</select>
                </div>
            </div>
            {/* Templates Grid */}
            <div className="space-y-3 max-h-96 overflow-y-auto" id='templateLibrary'>
                {filteredTemplates.map(template => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                        {/* Template Thumbnail */}
                        <div className="relative h-24 bg-gray-100">
                            <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2 flex space-x-1">{template.isFavorite && (<Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}</div>
                        </div>
                        {/* Template Info */}
                        <div className="p-3">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-medium text-gray-800 truncate">{template.name}</h4>
                                    <p className="text-xs text-gray-500 truncate">{template.subject}</p>
                                </div>
                            </div>
                            {/* Rating and Stats */}
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-1">{renderStars(template.rating)}
                                    <span className="text-xs text-gray-500 ml-1">{template.rating}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                    <span className="flex items-center"><Download className="w-3 h-3 mr-1" />{template.downloads}</span>
                                </div>
                            </div>
                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                                <button onClick={() => handleTemplateSelect(template)} className="flex-1 px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"> Use Template </button>
                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded"><Eye className="w-4 h-4" /></button>
                                <button className="p-1 text-gray-400 hover:text-gray-600 rounded"><Copy className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* No Results */}
            {filteredTemplates.length === 0 && (
                <div className="text-center py-8">
                    <div className="text-gray-400 mb-2">📭</div>
                    <p className="text-sm text-gray-500">No templates found</p>
                    <p className="text-xs text-gray-400">Try adjusting your search or filter</p>
                </div>
            )}
            {/* Create New Template */}
            <div className="border-t border-gray-200 pt-4">
                <button className="w-full flex items-center justify-center px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Plus className="w-4 h-4 mr-2" /> Create New Template
                </button>
            </div>
            {/* Quick Stats */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="text-xs text-purple-700">
                    <strong>Library Stats:</strong> {templates.length} templates available
                </div>
            </div>
        </div>
    );
};

export default TemplateLibrary;