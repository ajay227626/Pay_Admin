import React from "react";
import './pdf_layouts.css';
import { useNotification } from "../../SettingsProvider/SettingsProvider";

function PDFLayouts({ status }) {
    const { 
        notification,
        setNotification,
        showNotification
    } = useNotification();

    const handleCLick = () => {
        showNotification("Add New User button clicked", "positive");
    }

    return (
        // PDF Layouts Page
        <section id="pdf-layouts-page" className={`page ${status}`}>
            <div className="page-header">
                <div className="page-title">
                    <h2>PDF Layouts</h2>
                    <p>Design and manage PDF document layouts</p>
                </div>
                
                <div className="page-actions">
                    <button className="btn btn-primary" id="newLayoutBtn" onClick={handleCLick}>
                        <i className="fas fa-plus"></i> New Layout
                    </button>
                </div>
            </div>
            
            <div className="layouts-grid" id="layoutsGrid">
                {/* Layout cards will be loaded here */}
            </div>
        </section>
    );
}

export default PDFLayouts;