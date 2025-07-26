import './payments.css';
import React from 'react';
import { useNotification, useSettings } from "../../SettingsProvider/SettingsProvider";

function Payments({ status, role = "Minion" }) {
    const isAdmin = role === "Minion";
    const { permissionSettings } = useSettings();
    const permission = permissionSettings['payments-page']?.[role];
    const { 
        notification,
        setNotification,
        showNotification
    } = useNotification();

    const handleCLick = () => {
        showNotification("Add New User button clicked", "positive");
    }

    return (
        // Payments Page
        <section id="payments-page" className={`page ${status}`}>
            <div className="page-header">
                <div className="page-title">
                    <h2>Advance Payments</h2>
                    <p>Manage and track all payment records</p>
                </div>
                {(isAdmin || permission === 'add') && (
                    <div className="page-actions">
                        <button className="btn btn-secondary" id="exportBtn">
                            <i className="fas fa-download"></i> Export
                        </button>
                        <button className="btn btn-primary" id="addPaymentBtn" onClick={handleCLick}>
                            <i className="fas fa-plus"></i> Add Payment
                        </button>
                    </div>
                )}
            </div>
            
            <div className="filters-bar">
                <div className="filter-group">
                    <input style={{ fontSize: '0.875rem', lineHeight: 'normal' }} type="text" placeholder="Search payments..." id="paymentSearch" className="search-input" />
                </div>
                <div className="filter-group">
                    <div className="filter-group">
                        <select id="statusFilter" className="filter-select">
                            <option value="">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="sent">Sent</option>
                            <option value="signed">Signed</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <input style={{ lineHeight: 'normal' }} type="date" id="dateFilter" className="filter-input" />
                    </div>
                    <button style={{
                        lineHeight: 'normal' }} className="btn btn-secondary" id="clearFilters">
                        <i className="fas fa-times"></i> Clear
                    </button>
                </div>
            </div>
            
            <div className="table-container">
                <div className="table-header">
                    <div className="bulk-actions">
                        <input type="checkbox" id="selectAll" />
                        <span id="selectedCount">0 selected</span>
                        <button className="btn btn-sm btn-primary" id="bulkSendBtn" disabled>
                            <i className="fas fa-paper-plane"></i> Send Selected
                        </button>
                    </div>
                </div>
                
                <table className="data-table" id="paymentsTable">
                    <thead>
                        <tr>
                            <th><input type="checkbox" id="selectAllHeader" /></th>
                            <th>ID</th>
                            <th>Client</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody id="paymentsTableBody">
                        {/* Payment rows will be loaded here */}
                    </tbody>
                </table>
                
                <div className="table-footer">
                    <div className="pagination">
                        <button className="btn btn-sm" id="prevPage" disabled>
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <span id="pageInfo">Page 1 of 1</span>
                        <button className="btn btn-sm" id="nextPage" disabled>
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    
                    <div className="page-size">
                        <label>Show:</label>
                        <select id="pageSize">
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                        </select>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Payments;