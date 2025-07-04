// C:\Users\CBX\Desktop\New Journey\Payment-app\src\components\Sidebar\Sidebar.jsx
import React, { useEffect } from 'react';
import './Sidebar.css';
import { usePages } from '../SettingsProvider/SettingsProvider';

function showHideSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('sidebarToggle');

    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
        toggleButton.classList.remove('active');
    } else {
        sidebar.classList.add('collapsed');
        toggleButton.classList.remove('active');
        toggleButton.classList.add('active');
    }
}

function Sidebar({ userRole }) {
    const { pages, setPages, itemList } = usePages();

    // Update page title when pages change
    useEffect(() => {
        const currentItem = itemList.find(item => item.name.toLowerCase() === pages);
        if (currentItem) {
            const pageTitle = document.getElementById('pageTitle');
            if (pageTitle) {
                pageTitle.innerText = currentItem.name;
            }
        }
    }, [pages, itemList]);

    const handleNavItemClick = (item) => {
        localStorage.setItem('pages', item.name.toLowerCase());
        setPages(item.name.toLowerCase());
    };

    return (
        <aside className="sidebar" id="sidebar">
            <div className="sidebar-header">
                <h2><i className="fas fa-credit-card"></i> PayAdmin</h2>
                <button className="sidebar-toggle" id="sidebarToggle" onClick={showHideSidebar}>
                    <span className="sr-only">Toggle Sidebar</span>
                    <i className="fas fa-bars"></i>
                </button>
            </div>
            
            <nav className="sidebar-nav">
                <ul>
                    {itemList.map((item, index) => (
                        item.sidebar && (
                            <li 
                                key={index} 
                                className={`nav-item ${pages === item.name.toLowerCase() ? 'active' : ''}`}
                                id={item.id} 
                                data-page={item.name.toLowerCase()} 
                                onClick={() => handleNavItemClick(item)}
                            >
                                <i className={item.icon}></i>
                                <span>{item.name}</span>
                            </li>
                        )
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;