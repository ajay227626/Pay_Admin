// C:\Users\CBX\Desktop\New Journey\Payment-app\src\components\Main\Customers\Customers.jsx
import React, { use, useEffect, useState } from "react";
import "./Customers.css";
import { useNotification, useCustomers, useModal } from "../../SettingsProvider/SettingsProvider";
import { set } from "mongoose";
import axios from "axios";

function CustomersList({ customerData, setAllCheckboxSelected, switchTab, setCustomerID }) {
    const [customerCount, setCustomerCount] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { showModal, closeModal } = useModal();
    const {
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
        downloadType,
        setDownloadType,
        fileName,
        setFileName,
        customers,
        setCustomers,
        filteredData,
        setFilteredData,
        customerID,
        isLoaded
    } = useCustomers();

    useEffect(() => {
        setCustomerCount(customerData.length);
        setTotalPages(Math.ceil(customerCount / rowsPerPage))
    });

    const viewCustomerModal = (customer) => {
        return (
            <div className="customer-modal-container disabled">
                <div className="modal-tabs">
                    <button className="tab-button active" onClick={(e) => switchTab(e, 'basic')}>
                        <i className="fas fa-user"></i> Basic Info
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'contact')}>
                        <i className="fas fa-phone"></i> Contact
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'business')}>
                        <i className="fas fa-building"></i> Business
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'financial')}>
                        <i className="fas fa-dollar-sign"></i> Financial
                    </button>
                </div>
                <div id="newCustomerForm">
                    {/* Basic Info Tab */}
                    <div id="basic" className="tab-content active">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerName">Name <span className="required">*</span></label>
                                <input type="text" id="customerName" readOnly value={customer.customerName} name="name" placeholder="Customer/Vendor name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerType">Type <span className="required">*</span></label>
                                <select id="customerType" name="type" readOnly value={customer.customerType}>
                                    <option value="">Select Customer Type</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerGSTIN">GSTIN</label>
                            <input type="text" id="customerGSTIN" readOnly value={customer.customerGSTIN} name="gstin" placeholder="22AAAAA0000A1Z5" pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerAddress">Address</label>
                            <textarea id="customerAddress" readOnly value={customer.customerAddress} name="address" placeholder="Complete address" rows="3"></textarea>
                        </div>
                    </div>
                    {/* Contact Tab */}
                    <div id="contact" className="tab-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerPhone">Primary Phone <span className="required">*</span></label>
                                <input type="tel" id="customerPhone" readOnly value={customer.customerPhone} name="contact_info.phone" required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerSecondaryPhone">Secondary Phone</label>
                                <input type="tel" id="customerSecondaryPhone" readOnly value={customer.customerSecondaryPhone} name="contact_info.secondary_phone" placeholder="+91 9876543210" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerEmail">Email Address <span className="required">*</span></label>
                            <input type="email" id="customerEmail" readOnly value={customer.customerEmail} name="contact_info.email" required placeholder="customer@example.com" />
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerPAN">PAN Number</label>
                                <input type="text" id="customerPAN" readOnly value={customer.customerPAN} name="contact_info.pan" placeholder="ABCDE1234F" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerWebsite">Website</label>
                                <input type="url" id="customerWebsite" readOnly value={customer.customerWebsite} name="contact_info.website" placeholder="https://company.com" />
                            </div>
                        </div>
                    </div>
                    {/* Business Tab */}
                    <div id="business" className="tab-content">
                        <div className="form-group" style={{marginBottom: '16px'}}>
                            <label htmlFor="customerIndustry">Industry</label>
                            <select id="customerIndustry" readOnly value={customer.customerIndustry} name="business_details.industry">
                                <option value="">Select Industry</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Retail">Retail</option>
                                <option value="Services">Services</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Technology">Technology</option>
                                <option value="Construction">Construction</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerCompanySize">Company Size</label>
                                <select id="customerCompanySize" readOnly value={customer.customerCompanySize} name="business_details.company_size">
                                    <option value="">Select Size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="500+">500+ employees</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerRevenue">Annual Revenue</label>
                                <select id="customerRevenue" readOnly value={customer.customerRevenue} name="business_details.annual_revenue">
                                    <option value="">Select Range</option>
                                    <option value="<1L">Less than ₹1 Lakh</option>
                                    <option value="1L-10L">₹1-10 Lakhs</option>
                                    <option value="10L-1Cr">₹10 Lakhs - 1 Crore</option>
                                    <option value="1Cr-10Cr">₹1-10 Crores</option>
                                    <option value="10Cr+">₹10+ Crores</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Financial Tab */}
                    <div id="financial" className="tab-content">
                        <div className="balance-group" style={{marginBottom: '16px'}}>
                            <div className="form-group">
                                <label htmlFor="customerOpeningBalance">Opening Balance</label>
                                <input type="number" id="customerOpeningBalance" readOnly value={customer.customerOpeningBalance} name="opening_balance" step="0.01" placeholder="0.00" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerBalanceType">Balance Type</label>
                                <select id="customerBalanceType" readOnly value={customer.customerBalanceType} name="balance_type">
                                    <option value="Dr">Debit (Dr)</option>
                                    <option value="Cr">Credit (Cr)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerCreditLimit">Credit Limit</label>
                                <input type="number" id="customerCreditLimit" readOnly value={customer.customerCreditLimit} name="payment_terms.credit_limit" step="0.01" placeholder="0.00" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerPaymentDays">Payment Terms (Days)</label>
                                <select id="customerPaymentDays" readOnly value={customer.customerPaymentDays} name="payment_terms.payment_days">
                                    <option value="0">Cash on Delivery</option>
                                    <option value="7">7 Days</option>
                                    <option value="15">15 Days</option>
                                    <option value="30">30 Days</option>
                                    <option value="45">45 Days</option>
                                    <option value="60">60 Days</option>
                                    <option value="90">90 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const openViewModal = (customer) => {
        showModal(
            'View Customer Details',
            viewCustomerModal(customer),
            closeModal,
            'Close'
        )
    }

    const editCustomerModal = (customer) => {
        return (
            <div className="customer-modal-container">
                <div className="modal-tabs">
                    <button className="tab-button active" onClick={(e) => switchTab(e, 'basic')}>
                        <i className="fas fa-user"></i> Basic Info
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'contact')}>
                        <i className="fas fa-phone"></i> Contact
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'business')}>
                        <i className="fas fa-building"></i> Business
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'financial')}>
                        <i className="fas fa-dollar-sign"></i> Financial
                    </button>
                </div>
                <div id="newCustomerForm">
                    {/* Basic Info Tab */}
                    <div id="basic" className="tab-content active">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerName">Name <span className="required">*</span></label>
                                <input type="text" id="customerName" defaultValue={customer.customerName} onChange={(e) => { setCustomerName(e.target.value?.trim()) }} name="name" placeholder="Customer/Vendor name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerType">Type <span className="required">*</span></label>
                                <select id="customerType" name="type" defaultValue={customer.customerType} onChange={(e) => { setCustomerType(e.target.value) }}>
                                    <option value="">Select Customer Type</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerGSTIN">GSTIN</label>
                            <input type="text" id="customerGSTIN" defaultValue={customer.customerGSTIN} onChange={(e) => { setCustomerGSTIN(e.target.value?.trim()) }} name="gstin" placeholder="22AAAAA0000A1Z5" pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerAddress">Address</label>
                            <textarea id="customerAddress" defaultValue={customer.customerAddress} onChange={(e) => { setCustomerAddress(e.target.value?.trim()) }} name="address" placeholder="Complete address" rows="3"></textarea>
                        </div>
                    </div>
                    {/* Contact Tab */}
                    <div id="contact" className="tab-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerPhone">Primary Phone <span className="required">*</span></label>
                                <input type="tel" id="customerPhone" defaultValue={customer.customerPhone} onChange={(e) => { setCustomerPhone(e.target.value?.trim()) }} name="contact_info.phone" required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerSecondaryPhone">Secondary Phone</label>
                                <input type="tel" id="customerSecondaryPhone" defaultValue={customer.customerSecondaryPhone} onChange={(e) => { setCustomerSecondaryPhone(e.target.value?.trim()) }} name="contact_info.secondary_phone" placeholder="+91 9876543210" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerEmail">Email Address <span className="required">*</span></label>
                            <input type="email" id="customerEmail" defaultValue={customer.customerEmail} onChange={(e) => { setCustomerEmail(e.target.value?.trim()) }} name="contact_info.email" required placeholder="customer@example.com" />
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerPAN">PAN Number</label>
                                <input type="text" id="customerPAN" defaultValue={customer.customerPAN} onChange={(e) => { setCustomerPAN(e.target.value?.trim()) }} name="contact_info.pan" placeholder="ABCDE1234F" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerWebsite">Website</label>
                                <input type="url" id="customerWebsite" defaultValue={customer.customerWebsite} onChange={(e) => { setCustomerWebsite(e.target.value?.trim()) }} name="contact_info.website" placeholder="https://company.com" />
                            </div>
                        </div>
                    </div>
                    {/* Business Tab */}
                    <div id="business" className="tab-content">
                        <div className="form-group" style={{marginBottom: '16px'}}>
                            <label htmlFor="customerIndustry">Industry</label>
                            <select id="customerIndustry" defaultValue={customer.customerIndustry} onChange={(e) => { setCustomerIndustry(e.target.value) }} name="business_details.industry">
                                <option value="">Select Industry</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Retail">Retail</option>
                                <option value="Services">Services</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Technology">Technology</option>
                                <option value="Construction">Construction</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerCompanySize">Company Size</label>
                                <select id="customerCompanySize" defaultValue={customer.customerCompanySize} onChange={(e) => { setCustomerCompanySize(e.target.value) }} name="business_details.company_size">
                                    <option value="">Select Size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="500+">500+ employees</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerRevenue">Annual Revenue</label>
                                <select id="customerRevenue" defaultValue={customer.customerRevenue} onChange={(e) => { setCustomerRevenue(e.target.value) }} name="business_details.annual_revenue">
                                    <option value="">Select Range</option>
                                    <option value="<1L">Less than ₹1 Lakh</option>
                                    <option value="1L-10L">₹1-10 Lakhs</option>
                                    <option value="10L-1Cr">₹10 Lakhs - 1 Crore</option>
                                    <option value="1Cr-10Cr">₹1-10 Crores</option>
                                    <option value="10Cr+">₹10+ Crores</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Financial Tab */}
                    <div id="financial" className="tab-content">
                        <div className="balance-group" style={{marginBottom: '16px'}}>
                            <div className="form-group">
                                <label htmlFor="customerOpeningBalance">Opening Balance</label>
                                <input type="number" id="customerOpeningBalance" defaultValue={customer.customerOpeningBalance} onChange={(e) => { setCustomerOpeningBalance(e.target.value?.trim()) }} name="opening_balance" step="0.01" placeholder="0.00" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerBalanceType">Balance Type</label>
                                <select id="customerBalanceType" defaultValue={customer.customerBalanceType} onChange={(e) => { setCustomerBalanceType(e.target.value) }} name="balance_type">
                                    <option value="Dr">Debit (Dr)</option>
                                    <option value="Cr">Credit (Cr)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerCreditLimit">Credit Limit</label>
                                <input type="number" id="customerCreditLimit" defaultValue={customer.customerCreditLimit} onChange={(e) => { setCustomerCreditLimit(e.target.value?.trim()) }} name="payment_terms.credit_limit" step="0.01" placeholder="0.00" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerPaymentDays">Payment Terms (Days)</label>
                                <select id="customerPaymentDays" defaultValue={customer.customerPaymentDays} onChange={(e) => { setCustomerPaymentDays(e.target.value) }} name="payment_terms.payment_days">
                                    <option value="0">Cash on Delivery</option>
                                    <option value="7">7 Days</option>
                                    <option value="15">15 Days</option>
                                    <option value="30">30 Days</option>
                                    <option value="45">45 Days</option>
                                    <option value="60">60 Days</option>
                                    <option value="90">90 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const openEditModal = (customer) => {
        setCustomerID(customer.customerID);
        setCustomerName(customer.customerName);
        setCustomerType(customer.customerType);
        setCustomerGSTIN(customer.customerGSTIN);
        setCustomerAddress(customer.customerAddress);
        setCustomerPhone(customer.customerPhone);
        setCustomerSecondaryPhone(customer.customerSecondaryPhone);
        setCustomerEmail(customer.customerEmail);
        setCustomerPAN(customer.customerPAN);
        setCustomerWebsite(customer.customerWebsite);
        setCustomerIndustry(customer.customerIndustry);
        setCustomerCompanySize(customer.customerCompanySize);
        setCustomerRevenue(customer.customerRevenue);
        setCustomerOpeningBalance(customer.customerOpeningBalance);
        setCustomerBalanceType(customer.customerBalanceType);
        setCustomerCreditLimit(customer.customerCreditLimit);
        setCustomerPaymentDays(customer.customerPaymentDays);
        showModal(
            'Edit Customer Details',
            editCustomerModal(customer),
            closeModal,
            'Close',
            'newCustomerSave',
            'Update'
        )
    }
    return (
        <>
            <div className="customer-list-container">
                <table className="customer-list">
                    <thead className="customer-list-header">
                        <tr>
                            <th></th>
                            <th className="field-header show">SR#</th>
                            <th className="field-header show">Name</th>
                            <th className="field-header show">Type</th>
                            <th className="field-header show">GSTIN</th>
                            <th className="field-header show">Address</th>
                            <th className="field-header show">Phone</th>
                            <th className="field-header show">Secondary Phone</th>
                            <th className="field-header show">Email</th>
                            <th className="field-header show">PAN</th>
                            <th className="field-header show">Website</th>
                            <th className="field-header show">Industry</th>
                            <th className="field-header show">Company Size</th>
                            <th className="field-header show">Revenue</th>
                            <th className="field-header show">Opening Balance</th>
                            <th className="field-header show">Credit Limit</th>
                            <th className="field-header show">Payment Days</th>
                            <th className="field-header show">Action</th>
                        </tr>
                    </thead>
                    <tbody className="customer-list-body">
                        {customerCount > 0 ? (
                            customerData.map((customer, index) =>
                                (index < rowsPerPage * currentPage && index >= rowsPerPage * (currentPage - 1)) ? (
                                    <tr className="customer-list-row" key={index}>
                                        <td className="field-data show"><input type="checkbox" /></td>
                                        <td className="field-data show">{index + 1}</td>
                                        <td className="field-data show" style={ customer.customerName ? {} : { textAlign: 'center' }}>{customer.customerName || '-'}</td>
                                        <td className="field-data show" style={ customer.customerType ? {} : { textAlign: 'center' }}>{customer.customerType || '-'}</td>
                                        <td className="field-data show" style={ customer.customerGSTIN ? { textTransform: 'uppercase' } : { textAlign: 'center' }}>{customer.customerGSTIN || '-'}</td>
                                        <td className="field-data show" style={ customer.customerAddress ? { textTransform: 'capitalize' } : { textAlign: 'center' }}>{customer.customerAddress || '-'}</td>
                                        <td className="field-data show" style={ customer.customerPhone ? {} : { textAlign: 'center' }}>{customer.customerPhone || '-'}</td>
                                        <td className="field-data show" style={ customer.customerSecondaryPhone ? {} : { textAlign: 'center' }}>{customer.customerSecondaryPhone || '-'}</td>
                                        <td className="field-data show" style={ customer.customerEmail ? { textTransform: 'lowercase' } : { textAlign: 'center' }}>{customer.customerEmail || '-'}</td>
                                        <td className="field-data show" style={ customer.customerPAN ? { textTransform: 'uppercase' } : { textAlign: 'center' }}>{customer.customerPAN || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center', textTransform: 'lowercase' }}>{customer.customerWebsite || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center' }}>{customer.customerIndustry || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center' }}>{customer.customerCompanySize || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center' }}>{customer.customerRevenue || '-'}</td>
                                        <td className="field-data show" style={ customer.customerOpeningBalance ? { textAlign: 'right' } : { textAlign: 'center' }}>{customer.customerOpeningBalance || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center' }}>{customer.customerCreditLimit || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center' }}>{customer.customerPaymentDays || '-'}</td>
                                        <td className="field-data show" style={{ textAlign: 'center', display: 'flex', gap: '5px', alignItems: 'center' }}>
                                            <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%'}} onClick={() => { openViewModal(customer) }}><i className="fas fa-eye"></i></button>
                                            <button className="btn btn-primary" style={{ padding: '0.5rem', borderRadius: '50%'}} onClick={() => { openEditModal(customer) }}><i className="fas fa-edit"></i></button>
                                            <button className="btn btn-danger" style={{ padding: '0.5rem', borderRadius: '50%'}}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ) : null
                            )) : (
                                <tr className="customer-list-row">
                                    <td colSpan="18" className="text-center" style={{ padding: "2rem" }}>
                                        <i className="fas fa-inbox" style={{ fontSize: "2rem", color: "var(--ceoitbox-dark-color)", marginBottom: "1rem" }}></i>
                                        <p style={{ color: "var(--ceoitbox-dark-color)" }}>No customers found</p>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className="list-pagination">
                <div className="pagination">
                    <button className={`btn btn-${currentPage === 1 ? 'secondary' : 'primary'}`} onClick={() => {
                        setCurrentPage(currentPage - 1),
                        setAllCheckboxSelected(false)
                    }} disabled={currentPage === 1}><i className="fas fa-angle-left"></i></button>
                    <p>Page <span className="current-page">{currentPage}</span> of <span className="page-count">{totalPages}</span></p>
                    <button className={`btn btn-${currentPage === totalPages ? 'secondary' : 'primary'}`} onClick={() => {
                        setCurrentPage(currentPage + 1),
                        setAllCheckboxSelected(false)
                    }} disabled={currentPage === totalPages}><i className="fas fa-angle-right"></i></button>
                </div>
                <div className="results-per-page-container">
                    <div className="results-per-page">
                        <p>Show:</p>
                        <select name="results-per-page" id="results-per-page" onChange={(e) => {
                            setRowsPerPage(e.target.value),
                            setTotalPages(Math.ceil(customerCount / rowsPerPage))
                        }} disabled={customerCount === 0} defaultValue={10}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}

function CustomersGrid({ customerData }) {
    return (
        <div className="customer-grid-container">
            {
                customerData.map((customer, index) => (
                    <div className="customer-grid" key={index}>
                        {customer.customerName && <div className="customer-grid-name" title={'Customer Name'}><i className="fas fa-user facolor"></i>{customer.customerName}</div>}
                        {customer.customerType && <div className="customer-grid-type" title={'Customer Type'}><i className="fas fa-user-tag facolor"></i>{customer.customerType}</div>}
                        {customer.customerGSTIN && <div className="customer-grid-gstin" title={'GSTIN'}><i className="fas fa-hashtag facolor"></i>{customer.customerGSTIN}</div>}
                        {customer.customerAddress && <div className="customer-grid-address" title={'Address'}><i className="fas fa-map-marker-alt facolor"></i>{customer.customerAddress}</div>}
                        {customer.customerPhone && <div className="customer-grid-phone" title={'Phone'}><i className="fas fa-phone facolor"></i>{customer.customerPhone}</div>}
                        {customer.customerEmail && <div className="customer-grid-email" title={'Email'}><i className="fas fa-envelope facolor"></i>{customer.customerEmail}</div>}
                    </div>
                ))
            }
        </div>
    );
}

function Customers({ status }) {
    const [tableHeaders, setTableHeaders] = React.useState([]);
    const [colData, setColData] = React.useState('');
    const [currentView, setCurrentView] = React.useState('list');
    const [searchTerm, setSearchTerm] = React.useState('');
    const [uniqueValues, setUniqueValues] = React.useState([]);
    const [allCheckboxSelected, setAllCheckboxSelected] = React.useState(false);
    const [loading, setLoading] = useState(true);
    const { showModal, closeModal } = useModal();
    const {
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
        downloadType,
        setDownloadType,
        fileName,
        setFileName,
        customers,
        setCustomers,
        filteredData,
        setFilteredData,
        fetchCustomers,
        customerID,
        setCustomerID,
        isLoaded
    } = useCustomers();

    const switchTab = (event, tabName) => {
        const tabContents = document.querySelectorAll('.tab-content');
        tabContents.forEach(content => content.classList.remove('active'));
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => button.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
        event.target.classList.add('active');
    }

    const newCustomerModal = () => {
        return (
            <div className="customer-modal-container">
                <div className="modal-tabs">
                    <button className="tab-button active" onClick={(e) => switchTab(e, 'basic')}>
                        <i className="fas fa-user"></i> Basic Info
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'contact')}>
                        <i className="fas fa-phone"></i> Contact
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'business')}>
                        <i className="fas fa-building"></i> Business
                    </button>
                    <button className="tab-button" onClick={(e) => switchTab(e, 'financial')}>
                        <i className="fas fa-dollar-sign"></i> Financial
                    </button>
                </div>
                <div id="newCustomerForm">
                    {/* Basic Info Tab */}
                    <div id="basic" className="tab-content active">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerName">Name <span className="required">*</span></label>
                                <input type="text" id="customerName" onInput={(e) => { setCustomerName(e.target.value?.trim()), handleCustomerEntry(e) }} name="name" required placeholder="Customer/Vendor name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerType">Type <span className="required">*</span></label>
                                <select id="customerType" name="type" defaultValue='Selected Customer Type' onChange={(e) => { setCustomerType(e.target.value), handleCustomerEntry(e) }} required>
                                    <option value="">Select Customer Type</option>
                                    <option value="Customer">Customer</option>
                                    <option value="Vendor">Vendor</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Cash">Cash</option>
                                    <option value="Employee">Employee</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerGSTIN">GSTIN</label>
                            <input type="text" id="customerGSTIN" onInput={(e) => setCustomerGSTIN(e.target.value?.trim())} name="gstin" placeholder="22AAAAA0000A1Z5" pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerAddress">Address</label>
                            <textarea id="customerAddress" onInput={(e) => setCustomerAddress(e.target.value?.trim())} name="address" placeholder="Complete address" rows="3"></textarea>
                        </div>
                    </div>
                    {/* Contact Tab */}
                    <div id="contact" className="tab-content">
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerPhone">Primary Phone <span className="required">*</span></label>
                                <input type="tel" id="customerPhone" onInput={(e) => setCustomerPhone(e.target.value?.trim())} name="contact_info.phone" required placeholder="+91 9876543210" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerSecondaryPhone">Secondary Phone</label>
                                <input type="tel" id="customerSecondaryPhone" onInput={(e) => setCustomerSecondaryPhone(e.target.value?.trim())} name="contact_info.secondary_phone" placeholder="+91 9876543210" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="customerEmail">Email Address <span className="required">*</span></label>
                            <input type="email" id="customerEmail" onInput={(e) => setCustomerEmail(e.target.value?.trim())} name="contact_info.email" required placeholder="customer@example.com" />
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerPAN">PAN Number</label>
                                <input type="text" id="customerPAN" onInput={(e) => setCustomerPAN(e.target.value?.trim())} name="contact_info.pan" placeholder="ABCDE1234F" pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerWebsite">Website</label>
                                <input type="url" id="customerWebsite" onInput={(e) => setCustomerWebsite(e.target.value?.trim())} name="contact_info.website" placeholder="https://company.com" />
                            </div>
                        </div>
                    </div>
                    {/* Business Tab */}
                    <div id="business" className="tab-content">
                        <div className="form-group" style={{marginBottom: '16px'}}>
                            <label htmlFor="customerIndustry">Industry</label>
                            <select id="customerIndustry" onChange={(e) => setCustomerIndustry(e.target.value)} name="business_details.industry">
                                <option value="">Select Industry</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Retail">Retail</option>
                                <option value="Services">Services</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Technology">Technology</option>
                                <option value="Construction">Construction</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerCompanySize">Company Size</label>
                                <select id="customerCompanySize" onChange={(e) => setCustomerCompanySize(e.target.value)} name="business_details.company_size">
                                    <option value="">Select Size</option>
                                    <option value="1-10">1-10 employees</option>
                                    <option value="11-50">11-50 employees</option>
                                    <option value="51-200">51-200 employees</option>
                                    <option value="201-500">201-500 employees</option>
                                    <option value="500+">500+ employees</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerRevenue">Annual Revenue</label>
                                <select id="customerRevenue" onChange={(e) => setCustomerRevenue(e.target.value)} name="business_details.annual_revenue">
                                    <option value="">Select Range</option>
                                    <option value="<1L">Less than ₹1 Lakh</option>
                                    <option value="1L-10L">₹1-10 Lakhs</option>
                                    <option value="10L-1Cr">₹10 Lakhs - 1 Crore</option>
                                    <option value="1Cr-10Cr">₹1-10 Crores</option>
                                    <option value="10Cr+">₹10+ Crores</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* Financial Tab */}
                    <div id="financial" className="tab-content">
                        <div className="balance-group" style={{marginBottom: '16px'}}>
                            <div className="form-group">
                                <label htmlFor="customerOpeningBalance">Opening Balance</label>
                                <input type="number" id="customerOpeningBalance" onInput={(e) => setCustomerOpeningBalance(e.target.value || 0)} name="opening_balance" step="0.01" placeholder="0.00" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerBalanceType">Balance Type</label>
                                <select id="customerBalanceType" onChange={(e) => setCustomerBalanceType(e.target.value)} name="balance_type">
                                    <option value="Dr">Debit (Dr)</option>
                                    <option value="Cr">Credit (Cr)</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-grid">
                            <div className="form-group">
                                <label htmlFor="customerCreditLimit">Credit Limit</label>
                                <input type="number" id="customerCreditLimit" onInput={(e) => setCustomerCreditLimit(e.target.value || 0)} name="payment_terms.credit_limit" step="0.01" placeholder="0.00" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="customerPaymentDays">Payment Terms (Days)</label>
                                <select id="customerPaymentDays" defaultValue="30" onChange={(e) => setCustomerPaymentDays(e.target.value)} name="payment_terms.payment_days">
                                    <option value="0">Cash on Delivery</option>
                                    <option value="7">7 Days</option>
                                    <option value="15">15 Days</option>
                                    <option value="30">30 Days</option>
                                    <option value="45">45 Days</option>
                                    <option value="60">60 Days</option>
                                    <option value="90">90 Days</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const openCustomersModal = () => {
        showModal(
            'Add New Customer',
            newCustomerModal(),
            closeModal,               // Cancel Button
            "Cancel",
            'newCustomerSave',       // Save Button
            "Add Customer"
        );
    };

    const { showNotification } = useNotification();
    const handleCLick = () => {
        showNotification("Add New Customer button clicked", "positive");
    }

    const handleView = () => {
        const view = currentView === 'list' ? 'grid' : 'list';
        setCurrentView(view);
        showNotification(`View changed to ${view}`, "positive");
        document.querySelectorAll('.view-group > button').forEach(button => button.classList.remove('active'));
        document.getElementById(`${view}ViewBtn`).classList.add('active');
    }

    useEffect(() => {
        const headers = document.querySelectorAll('.field-header');
        const headerNames = Array.from(headers).map(header => header.textContent);
        setTableHeaders(headerNames);
    }, []);

    useEffect(() => {
        if (colData === '') return;
        const colNo = tableHeaders.indexOf(colData);
        const rows = document.querySelectorAll('.customer-list-body tr');
        const colValues = Array.from(rows).map(row => row.children[colNo + 1].textContent);
        setUniqueValues([...new Set(colValues)]);
    }, [colData, tableHeaders]);

    const handleReset = () => {
        setColData('');
        showNotification("Column reset", "positive");
        document.querySelector('.search-bar input').value = '';
        handleSearch('');
        document.querySelector('select[name=status]').selectedIndex = 0;
        document.querySelector('select[name=type]').selectedIndex = 0;
        setUniqueValues([]);
    }

    const handleSearch = (value) => {
        setSearchTerm(value);
        const filterData = value === '' ? customers :
        customers.filter(customer => {
            const rowText = Object.values(customer).join(' ').toLowerCase();
            const searchTerm = value.toLowerCase();
            return rowText.includes(searchTerm);
        });
        console.log('filterData', filterData)
        setFilteredData(filterData);
    }

    const handleHeaderFIlter = (value) => {
        setColData(value);
        document.querySelector('select[name=type]').selectedIndex = 0;
        handleSearch('');
    }

    const handleSelectAll = () => {
        setAllCheckboxSelected(!allCheckboxSelected);
        const checkboxes = document.querySelectorAll('.field-data input[type=checkbox]');
        checkboxes.forEach(row => {
            row.checked = !allCheckboxSelected;
        });
    }

    const importCSVPromt = () => {
        return (
            <>  
                <p>Please click on the below link to download the CSV template incase you don't have one</p>
                <a className="linkText" href="/Customer_Template.csv"><i className="fas fa-download"></i> Download CSV Template</a>
            </>
        );
    } 

    const handleImport = () => {
        showModal(
            'Import Customers',
            importCSVPromt(),
            closeModal,               // Cancel Button
            "Cancel",
            'importCustomerSave',     // Save Button
            "Import Customer"
        );
    }

    const exportCSVPromt = () => {
        return (
            <div className="form-group">
                <label htmlFor="fileName">Please enter the file name (optional)</label>
                <input type="text" id="fileName" name="fileName" onChange={(e) => setFileName(e.target.value)} placeholder="File Name" />
                <label htmlFor="downloadType">Please select the file type</label>
                <select name="downloadType" id="downloadType" onChange={(e) => setDownloadType(e.target.value)} required>
                    <option value="csv">CSV</option>
                    <option value="excel">Excel</option>
                </select>
            </div>
        );
    }

    const handleExport = () => {
        showModal(
            'Export Customers',
            exportCSVPromt(),
            closeModal,               // Cancel Button
            "Cancel",
            'exportCustomerSave',     // Save Button
            "Export Customer"
        );
    }

    return (
        <section id="customers-page" className={`page ${status}`}>
            <div className="page-header">
                <div className="page-title">
                    <h2>Customers</h2>
                    <p>Manage and track all customer records</p>
                </div>
                <div className="page-actions">
                    <button className="btn btn-primary" id="importCustomersBtn" onClick={handleImport}>
                        <i className="fas fa-upload"></i> Import
                    </button>
                    <button className="btn btn-primary" id="exportCustomersBtn" onClick={handleExport}>
                        <i className="fas fa-download"></i> Export
                    </button>
                    <button className="btn btn-primary" id="newCustomerBtn" onClick={openCustomersModal}>
                        <i className="fas fa-plus"></i> New Customer
                    </button>
                </div>
            </div>
            <div className="page-filters">
                <div className="search-bar">
                    <input type="text" onInput={(e) => handleSearch(e.target.value)} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search..." />
                </div>
                <div className="filter-group">
                    <select id="selectTableHeader" onChange={(e) => handleHeaderFIlter(e.target.value)} name="status">
                        <option value="">Select Column</option>
                        {tableHeaders.map((header, index) => (
                            <option key={index} value={header}>{header}</option>
                        ))}
                    </select>
                    <select id="valueOftheHeader" onChange={(e) => handleSearch(e.target.value)} name="type" disabled={uniqueValues.length === 0}>
                        <option value="">Select Field</option>
                        {uniqueValues.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                    <button className="btn btn-primary" id="refreshBtn" onClick={handleReset}><i className="fas fa-rotate-left"></i></button>
                    <button className="btn btn-primary" id="selectAllBtn" onClick={handleSelectAll} title={allCheckboxSelected ? 'Unselect All' : 'Select All'}>{allCheckboxSelected ? <i className="fas fa-square-xmark"></i> : <i className="fas fa-check-double"></i>}</button>
                </div>
                <div className="action-side">
                    <button className="btn btn-primary" id="reloadData" style={{ padding: '0.5rem', borderRadius: '50%' }} onClick={() => {
                        fetchCustomers();
                        handleReset();
                        showNotification("Customers reloaded", "positive");
                    }}><i className="fas fa-sync"></i></button>
                    <div className="view-group">
                        <button className="btn btn-primary active" id="listViewBtn" onClick={handleView}>
                            <i className="fas fa-list"></i>
                        </button>
                        <button className="btn btn-primary" id="gridViewBtn" onClick={handleView}>
                            <i className="fas fa-th-large"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="content-area">
                {currentView === 'list' ?
                    <CustomersList
                        customerData={filteredData}
                        setAllCheckboxSelected={setAllCheckboxSelected}
                        switchTab={switchTab}
                        setCustomerID={setCustomerID}
                    /> :
                    <CustomersGrid
                        customerData={filteredData || []}
                    />}
            </div>
        </section>
    );
}

export default Customers;