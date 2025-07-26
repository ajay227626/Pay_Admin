import React from 'react';
import { useEmailMessage, useModal } from '../../../SettingsProvider/SettingsProvider';

const QuickActionsFooter = ({ onSave, onCancel, isDirty, onTest, onExport, templateContent, templateSubject, templateStyles, type }) => {
    const { showModal, closeModal } = useModal();
    const [ editorContent, setEditorContent ] = React.useState(templateContent);
    const { recipient, setRecipient, subject, setSubject , body, setBody } = useEmailMessage();
    const handleSendTest = () => {
        setSubject(templateSubject || 'Email Template Test');
        setBody(templateContent);
        showModal(
            'Test Message',
            '',
            () => {
                return (
                    <div className="flex flex-col gap-4">
                        <div className="input-group">
                            <input
                                type="email"
                                placeholder="Enter email address"
                                defaultValue={recipient || ''}
                                onChange={(e) => setRecipient(e.target.value)}
                            />
                            <label className="form-input-label">Enter email address</label>
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                placeholder="Enter email subject"
                                defaultValue={templateSubject || ''}
                                onChange={(e) => setSubject(e.target.value)}
                            />
                            <label className="form-input-label">Enter email subject</label>
                        </div>
                        <div className="input-group">
                            <textarea
                                type="text"
                                placeholder="Enter message"
                                defaultValue={templateContent || ''}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            <label className="form-input-label">Enter message</label>
                        </div>
                    </div>
                );
            },
            closeModal,
            'Cancel',
            'sendTestEmailMessage',
            'Send'
        )
    };

    const handleExport = () => {
        const exportData = {
            subject: templateSubject,
            content: templateContent,
            styles: templateStyles,
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${templateSubject || 'email-template'}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleCopyHTML = () => {
        navigator.clipboard.writeText(templateContent);
        alert('HTML copied to clipboard!');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: templateSubject || 'Email Template',
                text: 'Check out this email template',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Template link copied to clipboard!');
        }
    };

    return (
        <div className="bg-white border-t border-gray-200 px-3 sm:px-6 py-3 shadow-lg">
            {/* Left Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between space-y-3 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto">
                    <button onClick={handleSendTest} className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-cbx-transparent hover:text-cbx-dark transition-colors flex-shrink-0">
                        <i className="fas fa-envelope w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Send Test</span>
                        <span className="sm:hidden">Test</span>
                    </button>
                    <button onClick={handleExport} className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-cbx-transparent hover:text-cbx-dark transition-colors flex-shrink-0">
                        <i className="fas fa-download w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Export JSON</span>
                        <span className="sm:hidden">Export</span>
                    </button>
                    <button onClick={handleCopyHTML} className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-cbx-transparent hover:text-cbx-dark transition-colors flex-shrink-0">
                        <i className="fas fa-copy w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Copy HTML</span>
                        <span className="sm:hidden">Copy</span>
                    </button>
                    <button onClick={handleShare} className="flex items-center px-2 sm:px-3 py-2 text-xs sm:text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-cbx-transparent hover:text-cbx-dark transition-colors flex-shrink-0">
                        <i className="fas fa-share w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Share</span>
                        <span className="sm:hidden">Share</span>
                    </button>
                </div>
                {/* Right Actions */}
                <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
                    {/* <button
                        onClick={onCancel}
                        className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <i className="fas fa-times w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Cancel</span>
                        <span className="sm:hidden">Cancel</span>
                    </button> */}
                    { type === 'edit' && (
                        <button onClick={onSave} disabled={!isDirty} className={`flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm rounded-lg transition-colors ${ isDirty ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed' }`}>
                            <i className="fas fa-save w-4 h-4 mr-2" />
                            <span className="hidden sm:inline">Save Changes</span>
                            <span className="sm:hidden">Save</span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QuickActionsFooter;