// Taskbar Component for Bitcoin Chat
class Taskbar {
    constructor() {
        this.apps = [
            { id: 'chat', name: 'Bitcoin Chat', icon: '💬', active: true },
            { id: 'wallet', name: 'BSV Wallet', icon: '₿', active: false },
            { id: 'explorer', name: 'Block Explorer', icon: '🔍', active: false },
            { id: 'terminal', name: 'Terminal', icon: '⚡', active: false }
        ];
        this.notifications = [];
        this.init();
    }

    init() {
        this.createElement();
        this.attachEventListeners();
        this.startClock();
    }

    createElement() {
        const taskbar = document.createElement('div');
        taskbar.className = 'taskbar';
        taskbar.innerHTML = `
            <div class="taskbar-left">
                <div class="start-button" data-action="start">
                    <span class="bitcoin-icon">₿</span>
                    <span class="start-text">Start</span>
                </div>
                <div class="app-buttons">
                    ${this.apps.map(app => `
                        <div class="app-button ${app.active ? 'active' : ''}" data-app="${app.id}">
                            <span class="app-icon">${app.icon}</span>
                            <span class="app-name">${app.name}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="taskbar-right">
                <div class="system-tray">
                    <div class="network-status" data-status="connected">
                        <span class="status-icon">🌐</span>
                        <span class="status-text">BSV Network</span>
                    </div>
                    <div class="notifications-icon" data-count="0">
                        <span class="notification-icon">🔔</span>
                        <span class="notification-count">0</span>
                    </div>
                    <div class="clock">
                        <span class="time"></span>
                        <span class="date"></span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(taskbar);
    }

    attachEventListeners() {
        const taskbar = document.querySelector('.taskbar');
        
        // Start button
        taskbar.querySelector('.start-button').addEventListener('click', () => {
            this.toggleStartMenu();
        });

        // App buttons
        taskbar.querySelectorAll('.app-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const appId = e.currentTarget.dataset.app;
                this.switchApp(appId);
            });
        });

        // Network status
        taskbar.querySelector('.network-status').addEventListener('click', () => {
            this.showNetworkInfo();
        });

        // Notifications
        taskbar.querySelector('.notifications-icon').addEventListener('click', () => {
            this.showNotifications();
        });
    }

    startClock() {
        const updateClock = () => {
            const now = new Date();
            const timeElement = document.querySelector('.taskbar .time');
            const dateElement = document.querySelector('.taskbar .date');
            
            if (timeElement && dateElement) {
                timeElement.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                dateElement.textContent = now.toLocaleDateString([], { month: 'short', day: 'numeric' });
            }
        };
        
        updateClock();
        setInterval(updateClock, 1000);
    }

    toggleStartMenu() {
        const existingMenu = document.querySelector('.start-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }

        const startMenu = document.createElement('div');
        startMenu.className = 'start-menu';
        startMenu.innerHTML = `
            <div class="start-menu-header">
                <div class="user-info">
                    <div class="user-avatar">₿</div>
                    <div class="user-details">
                        <div class="user-name">Bitcoin User</div>
                        <div class="user-balance">0.00123 BSV</div>
                    </div>
                </div>
            </div>
            <div class="start-menu-apps">
                <div class="app-category">
                    <h4>Bitcoin Apps</h4>
                    <div class="app-item" data-app="chat">
                        <span class="app-icon">💬</span>
                        <span class="app-name">Bitcoin Chat</span>
                    </div>
                    <div class="app-item" data-app="wallet">
                        <span class="app-icon">₿</span>
                        <span class="app-name">BSV Wallet</span>
                    </div>
                    <div class="app-item" data-app="explorer">
                        <span class="app-icon">🔍</span>
                        <span class="app-name">Block Explorer</span>
                    </div>
                </div>
                <div class="app-category">
                    <h4>Tools</h4>
                    <div class="app-item" data-app="terminal">
                        <span class="app-icon">⚡</span>
                        <span class="app-name">Terminal</span>
                    </div>
                    <div class="app-item" data-app="settings">
                        <span class="app-icon">⚙️</span>
                        <span class="app-name">Settings</span>
                    </div>
                </div>
            </div>
            <div class="start-menu-footer">
                <div class="power-options">
                    <button class="power-button" data-action="lock">🔒 Lock</button>
                    <button class="power-button" data-action="logout">🚪 Logout</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(startMenu);

        // Position the menu
        const taskbarRect = document.querySelector('.start-button').getBoundingClientRect();
        startMenu.style.bottom = '60px';
        startMenu.style.left = '10px';

        // Add event listeners for menu items
        startMenu.querySelectorAll('.app-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const appId = e.currentTarget.dataset.app;
                this.launchApp(appId);
                startMenu.remove();
            });
        });

        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!startMenu.contains(e.target) && !document.querySelector('.start-button').contains(e.target)) {
                    startMenu.remove();
                }
            }, { once: true });
        }, 100);
    }

    switchApp(appId) {
        // Update active app
        this.apps = this.apps.map(app => ({
            ...app,
            active: app.id === appId
        }));

        // Update UI
        document.querySelectorAll('.app-button').forEach(button => {
            button.classList.remove('active');
            if (button.dataset.app === appId) {
                button.classList.add('active');
            }
        });

        // Emit app switch event
        window.dispatchEvent(new CustomEvent('appSwitch', { detail: { appId } }));
    }

    launchApp(appId) {
        console.log(`Launching app: ${appId}`);
        this.switchApp(appId);
        
        // Emit app launch event
        window.dispatchEvent(new CustomEvent('appLaunch', { detail: { appId } }));
    }

    showNetworkInfo() {
        const networkInfo = document.createElement('div');
        networkInfo.className = 'network-info-popup';
        networkInfo.innerHTML = `
            <div class="popup-header">BSV Network Status</div>
            <div class="network-stats">
                <div class="stat">
                    <span class="stat-label">Block Height:</span>
                    <span class="stat-value">834,567</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Hash Rate:</span>
                    <span class="stat-value">120 EH/s</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Difficulty:</span>
                    <span class="stat-value">68.5T</span>
                </div>
                <div class="stat">
                    <span class="stat-label">Avg Block Time:</span>
                    <span class="stat-value">9.8 min</span>
                </div>
            </div>
        `;
        
        document.body.appendChild(networkInfo);
        
        // Position popup
        const networkStatus = document.querySelector('.network-status');
        const rect = networkStatus.getBoundingClientRect();
        networkInfo.style.bottom = '60px';
        networkInfo.style.right = '200px';
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            if (networkInfo.parentNode) {
                networkInfo.remove();
            }
        }, 5000);
        
        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!networkInfo.contains(e.target) && !networkStatus.contains(e.target)) {
                    networkInfo.remove();
                }
            }, { once: true });
        }, 100);
    }

    showNotifications() {
        if (this.notifications.length === 0) {
            this.addNotification('Welcome to Bitcoin Chat!', 'System');
            this.addNotification('New BSV block mined', 'Network');
        }

        const notificationPanel = document.createElement('div');
        notificationPanel.className = 'notification-panel';
        notificationPanel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <button class="clear-all">Clear All</button>
            </div>
            <div class="notification-list">
                ${this.notifications.map((notif, index) => `
                    <div class="notification-item" data-index="${index}">
                        <div class="notification-content">
                            <div class="notification-title">${notif.title}</div>
                            <div class="notification-body">${notif.message}</div>
                            <div class="notification-time">${notif.time}</div>
                        </div>
                        <button class="notification-close" data-index="${index}">×</button>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(notificationPanel);
        
        // Position panel
        notificationPanel.style.bottom = '60px';
        notificationPanel.style.right = '10px';
        
        // Event listeners
        notificationPanel.querySelector('.clear-all').addEventListener('click', () => {
            this.clearAllNotifications();
            notificationPanel.remove();
        });
        
        notificationPanel.querySelectorAll('.notification-close').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeNotification(index);
                e.target.closest('.notification-item').remove();
            });
        });
        
        // Close on click outside
        setTimeout(() => {
            document.addEventListener('click', (e) => {
                if (!notificationPanel.contains(e.target) && !document.querySelector('.notifications-icon').contains(e.target)) {
                    notificationPanel.remove();
                }
            }, { once: true });
        }, 100);
    }

    addNotification(message, title = 'Notification') {
        const notification = {
            id: Date.now(),
            title,
            message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        this.notifications.unshift(notification);
        this.updateNotificationCount();
        
        // Show toast notification
        this.showToastNotification(notification);
    }

    removeNotification(index) {
        this.notifications.splice(index, 1);
        this.updateNotificationCount();
    }

    clearAllNotifications() {
        this.notifications = [];
        this.updateNotificationCount();
    }

    updateNotificationCount() {
        const countElement = document.querySelector('.notification-count');
        if (countElement) {
            countElement.textContent = this.notifications.length;
            const iconElement = document.querySelector('.notifications-icon');
            iconElement.dataset.count = this.notifications.length;
        }
    }

    showToastNotification(notification) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-title">${notification.title}</div>
                <div class="toast-message">${notification.message}</div>
            </div>
            <button class="toast-close">×</button>
        `;
        
        document.body.appendChild(toast);
        
        // Position toast
        toast.style.bottom = '80px';
        toast.style.right = '20px';
        
        // Auto-close after 4 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 4000);
        
        // Close button
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.bitcoinTaskbar = new Taskbar();
    });
} else {
    window.bitcoinTaskbar = new Taskbar();
}