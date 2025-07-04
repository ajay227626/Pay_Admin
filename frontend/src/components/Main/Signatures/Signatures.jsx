import React from "react";
import './signatures.css';
import { useNotification } from "../../SettingsProvider/SettingsProvider";

function Signatures({ status }) {
    const { 
        notification,
        setNotification,
        showNotification
    } = useNotification();

    const handleCLick = () => {
        showNotification("Add New User button clicked", "positive");
    }

    return (
        // Signatures Page
        <section id="signatures-page" className={`page ${status}`}>
            <div className="page-header">
                <div className="page-title">
                    <h2>Digital Signatures</h2>
                    <p>Track and manage document signatures</p>
                </div>
                <div className="page-actions">
                    <button className="btn btn-primary" id="newSignatureBtn" onClick={handleCLick}>
                        <i className="fas fa-plus"></i> New Signature
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Signatures;