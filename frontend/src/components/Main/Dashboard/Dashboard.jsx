import react from 'react';
import './Dashboard.css';

function Dashboard({ status }) {
    return (
        <section id="dashboard-page" className={`page ${status}`}>
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-money-bill-wave"></i>
                    </div>
                    <div className="stat-content">
                        <h3 id="totalPayments">0</h3>
                        <p>Total Payments</p>
                        <span className="stat-change positive">+12%</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div className="stat-content">
                        <h3 id="pendingSignatures">0</h3>
                        <p>Pending Signatures</p>
                        <span className="stat-change negative">-5%</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div className="stat-content">
                        <h3 id="completedPayments">0</h3>
                        <p>Completed</p>
                        <span className="stat-change positive">+8%</span>
                    </div>
                </div>
                
                <div className="stat-card">
                    <div className="stat-icon">
                        <i className="fas fa-dollar-sign"></i>
                    </div>
                    <div className="stat-content">
                        <h3 id="totalRevenue">₹0</h3>
                        <p>Total Revenue</p>
                        <span className="stat-change positive">+15%</span>
                    </div>
                </div>
            </div>
            
            <div className="dashboard-grid">
                <div className="chart-container">
                    <h3>Payment Trends</h3>
                    <canvas id="paymentChart"></canvas>
                </div>
                
                <div className="recent-activity">
                    <h3>Recent Activity</h3>
                    <div className="activity-list" id="activityList">
                        {/* Activity items will be loaded here */}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;