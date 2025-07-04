import React from 'react';
import './Modal.css';
import '../SettingsProvider/SettingsProvider';
import { useCustomers, useSettings, useUserLists } from '../SettingsProvider/SettingsProvider';

const Modal = ({ isActive, modalTitle, content, onClose1, buttonName1 = 'Cancel', onClose2, buttonName2 }) => {
    const { handleCustomerEntry, handleImportCustomerCSV, handleExportCustomerCSV } = useCustomers();
    const { handleSaveSettings, handleResetSettings } = useSettings();
    const { handleUserListEntry, handleImportUserListCSV, handleExportUserListCSV } = useUserLists();
    if (!isActive) return null;

    return (
        <div className="modal-overlay" onClick={onClose1}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">{modalTitle}</h2>
                <button className="modal-close" onClick={onClose1}>×</button>
                <div className="modal-body">
                    {typeof content === 'function' ? content() : content}
                </div>
                <div className="modal-buttons">
                    {buttonName2 && onClose2 && (
                        <button className="close-button" onClick={
                            onClose2 === 'newCustomerSave' ? handleCustomerEntry
                            : onClose2 === 'importCustomerSave' ? handleImportCustomerCSV
                            : onClose2 === 'exportCustomerSave' ? handleExportCustomerCSV
                            : onClose2 === 'resetSettingsSave' ? handleResetSettings
                            : onClose2 === 'saveSettingsSave' ? handleSaveSettings
                            : onClose2 === 'newUserListSave' ? handleUserListEntry
                            : onClose2 === 'exportUserListSave' ? handleExportUserListCSV
                            : onClose2 === 'importUserListSave' ? handleImportUserListCSV
                            : onClose2
                        }>{buttonName2}</button>
                    )}
                    <button className="close-button" onClick={onClose1}>{buttonName1}</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
