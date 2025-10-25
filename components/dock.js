// Dock Component for Bitcoin Chat
class Dock {
    constructor() {
        this.apps = [
            {
                id: 'chat',
                name: 'Bitcoin Chat',
                icon: '💬',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            },
            {
                id: 'wallet',
                name: 'BSV Wallet',
                icon: '₿',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            },
            {
                id: 'explorer',
                name: 'Block Explorer',
                icon: '🔍',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            },
            {
                id: 'terminal',
                name: 'Terminal',
                icon: '⚡',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            },
            {
                id: 'calculator',
                name: 'BSV Calculator',
                icon: '🧮',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            },
            {
                id: 'files',
                name: 'File Manager',
                icon: '📁',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            },
            {
                id: 'settings',
                name: 'Settings',
                icon: '⚙️',
                isRunning: false,
                hasNotifications: false,
                notificationCount: 0
            }
        ];
        
        this.isHidden = false;
        this.animationDuration = 300;
        this.hoverTimeout = null;
        this.position = localStorage.getItem('dock-position') || 'bottom';
        this.size = localStorage.getItem('dock-size') || 'medium';
        
        this.init();
    }

    init() {
        this.createElement();
        this.attachEventListeners();
        this.setupAutoHide();
        this.startAnimations();
    }

    createElement() {
        const dock = document.createElement('div');
        dock.className = `dock dock-${this.position} dock-${this.size}`;
        dock.innerHTML = `
            <div class="dock-container">
                <div class="dock-background"></div>
                <div class="dock-apps">
                    ${this.apps.map(app => this.createAppElement(app)).join('')}
                </div>
                <div class="dock-separator"></div>
                <div class="dock-system">
                    <div class="dock-app system-app" data-app="trash">
                        <div class="app-icon-container">
                            <span class="app-icon">🗑️</span>
                            <div class="app-reflection"></div>
                        </div>
                        <div class="app-tooltip">Trash</div>
                        <div class="app-indicator"></div>
                    </div>
                </div>
                <div class="dock-controls">
                    <button class="dock-control" data-action="preferences">
                        <span class="control-icon">⚙️</span>
                    </button>
                    <button class="dock-control" data-action="minimize">
                        <span class="control-icon">−</span>
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dock);
        this.element = dock;
    }

    createAppElement(app) {
        return `
            <div class="dock-app ${app.isRunning ? 'running' : ''}" data-app="${app.id}">
                <div class="app-icon-container">
                    <span class="app-icon">${app.icon}</span>
                    <div class="app-reflection"></div>
                    ${app.hasNotifications ? `<div class="notification-badge">${app.notificationCount > 0 ? app.notificationCount : ''}</div>` : ''}
                </div>
                <div class="app-tooltip">${app.name}</div>
                <div class="app-indicator ${app.isRunning ? 'visible' : ''}"></div>
                <div class="app-bounce-effect"></div>
            </div>
        `;
    }

    attachEventListeners() {
        const dock = this.element;
        
        // App launching
        dock.querySelectorAll('.dock-app').forEach(appElement => {
            appElement.addEventListener('click', (e) => {
                const appId = e.currentTarget.dataset.app;
                this.launchApp(appId);
            });
            
            // Hover effects
            appElement.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.currentTarget);
                this.animateHover(e.currentTarget, true);
            });
            
            appElement.addEventListener('mouseleave', (e) => {
                this.hideTooltip(e.currentTarget);
                this.animateHover(e.currentTarget, false);
            });
            
            // Right-click context menu
            appElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, appId);
            });
        });

        // Dock controls
        dock.querySelector('[data-action="preferences"]').addEventListener('click', () => {
            this.showPreferences();
        });
        
        dock.querySelector('[data-action="minimize"]').addEventListener('click', () => {
            this.toggleMinimize();
        });

        // Global events
        window.addEventListener('appLaunch', (e) => {
            this.updateAppStatus(e.detail.appId, { isRunning: true });
        });
        
        window.addEventListener('appClose', (e) => {
            this.updateAppStatus(e.detail.appId, { isRunning: false });
        });
        
        window.addEventListener('appNotification', (e) => {
            this.updateAppStatus(e.detail.appId, { 
                hasNotifications: true, 
                notificationCount: e.detail.count || 1 
            });
        });

        // Dock hover for auto-hide
        dock.addEventListener('mouseenter', () => {
            if (this.isHidden) {
                this.show();
            }
        });
        
        dock.addEventListener('mouseleave', () => {
            if (this.autoHideEnabled) {
                this.startAutoHideTimer();
            }
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.updatePosition();
        });
    }

    setupAutoHide() {
        this.autoHideEnabled = localStorage.getItem('dock-autohide') === 'true';
        
        if (this.autoHideEnabled) {
            this.startAutoHideTimer();
        }
    }

    startAutoHideTimer() {
        clearTimeout(this.autoHideTimeout);
        this.autoHideTimeout = setTimeout(() => {
            if (this.autoHideEnabled && !this.element.matches(':hover')) {
                this.hide();
            }
        }, 2000);
    }

    startAnimations() {
        // Breathing animation for notifications
        setInterval(() => {
            const appsWithNotifications = this.element.querySelectorAll('.dock-app .notification-badge');
            appsWithNotifications.forEach(badge => {
                badge.style.animation = 'none';
                setTimeout(() => {
                    badge.style.animation = 'notification-pulse 2s ease-in-out infinite';
                }, 10);
            });
        }, 3000);

        // Floating animation
        this.element.style.animation = 'dock-float 4s ease-in-out infinite';
    }

    launchApp(appId) {
        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        // Special handling for system apps
        if (appId === 'trash') {
            this.openTrash();
            return;
        }

        // Bounce animation
        const appElement = this.element.querySelector(`[data-app="${appId}"]`);
        this.animateBounce(appElement);

        // Update app status
        this.updateAppStatus(appId, { isRunning: true });

        // Clear notifications
        this.updateAppStatus(appId, { hasNotifications: false, notificationCount: 0 });

        // Emit launch event
        window.dispatchEvent(new CustomEvent('appLaunch', { 
            detail: { appId, appName: app.name } 
        }));

        console.log(`Launching ${app.name}...`);
    }

    updateAppStatus(appId, status) {
        const appIndex = this.apps.findIndex(a => a.id === appId);
        if (appIndex === -1) return;

        this.apps[appIndex] = { ...this.apps[appIndex], ...status };
        
        const appElement = this.element.querySelector(`[data-app="${appId}"]`);
        if (!appElement) return;

        // Update running indicator
        if (status.isRunning !== undefined) {
            appElement.classList.toggle('running', status.isRunning);
            const indicator = appElement.querySelector('.app-indicator');
            indicator.classList.toggle('visible', status.isRunning);
        }

        // Update notifications
        if (status.hasNotifications !== undefined) {
            let notificationBadge = appElement.querySelector('.notification-badge');
            
            if (status.hasNotifications) {
                if (!notificationBadge) {
                    notificationBadge = document.createElement('div');
                    notificationBadge.className = 'notification-badge';
                    appElement.querySelector('.app-icon-container').appendChild(notificationBadge);
                }
                notificationBadge.textContent = status.notificationCount > 0 ? status.notificationCount : '';
                notificationBadge.style.animation = 'notification-appear 0.3s ease-out';
            } else if (notificationBadge) {
                notificationBadge.style.animation = 'notification-disappear 0.3s ease-out';
                setTimeout(() => {
                    if (notificationBadge.parentNode) {
                        notificationBadge.remove();
                    }
                }, 300);
            }
        }
    }

    animateBounce(element) {
        element.style.animation = 'dock-app-bounce 0.6s ease-out';
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }

    animateHover(element, isHovering) {
        const scale = isHovering ? 1.2 : 1;
        const iconContainer = element.querySelector('.app-icon-container');
        iconContainer.style.transform = `scale(${scale})`;
        iconContainer.style.transition = 'transform 0.2s ease-out';
    }

    showTooltip(appElement) {
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = setTimeout(() => {
            const tooltip = appElement.querySelector('.app-tooltip');
            tooltip.classList.add('visible');
        }, 500);
    }

    hideTooltip(appElement) {
        clearTimeout(this.tooltipTimeout);
        const tooltip = appElement.querySelector('.app-tooltip');
        tooltip.classList.remove('visible');
    }

    showContextMenu(event, appId) {
        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        // Remove existing context menu
        const existingMenu = document.querySelector('.dock-context-menu');
        if (existingMenu) {
            existingMenu.remove();
        }

        const contextMenu = document.createElement('div');
        contextMenu.className = 'dock-context-menu';
        contextMenu.innerHTML = `
            <div class="context-menu-item" data-action="open">
                <span class="menu-icon">▶️</span>
                <span class="menu-text">Open</span>
            </div>
            ${app.isRunning ? `
                <div class="context-menu-item" data-action="close">
                    <span class="menu-icon">❌</span>
                    <span class="menu-text">Close</span>
                </div>
            ` : ''}
            <div class="context-menu-separator"></div>
            <div class="context-menu-item" data-action="info">
                <span class="menu-icon">ℹ️</span>
                <span class="menu-text">Get Info</span>
            </div>
            <div class="context-menu-item" data-action="remove">
                <span class="menu-icon">🗑️</span>
                <span class="menu-text">Remove from Dock</span>
            </div>
        `;

        document.body.appendChild(contextMenu);

        // Position menu
        contextMenu.style.left = `${event.clientX}px`;
        contextMenu.style.top = `${event.clientY - contextMenu.offsetHeight}px`;

        // Add event listeners
        contextMenu.querySelectorAll('.context-menu-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const action = e.currentTarget.dataset.action;
                this.handleContextAction(action, appId);
                contextMenu.remove();
            });
        });

        // Close on outside click
        setTimeout(() => {
            document.addEventListener('click', () => {
                contextMenu.remove();
            }, { once: true });
        }, 100);
    }

    handleContextAction(action, appId) {
        switch (action) {
            case 'open':
                this.launchApp(appId);
                break;
            case 'close':
                this.updateAppStatus(appId, { isRunning: false });
                window.dispatchEvent(new CustomEvent('appClose', { detail: { appId } }));
                break;
            case 'info':
                this.showAppInfo(appId);
                break;
            case 'remove':
                this.removeApp(appId);
                break;
        }
    }

    showAppInfo(appId) {
        const app = this.apps.find(a => a.id === appId);
        if (!app) return;

        const infoModal = document.createElement('div');
        infoModal.className = 'app-info-modal';
        infoModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${app.name}</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="app-info-icon">${app.icon}</div>
                    <div class="app-info-details">
                        <p><strong>Application:</strong> ${app.name}</p>
                        <p><strong>Status:</strong> ${app.isRunning ? 'Running' : 'Not Running'}</p>
                        <p><strong>Notifications:</strong> ${app.notificationCount}</p>
                        <p><strong>Version:</strong> 1.0.0</p>
                        <p><strong>Developer:</strong> Bitcoin Corporation</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(infoModal);

        infoModal.querySelector('.modal-close').addEventListener('click', () => {
            infoModal.remove();
        });

        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                infoModal.remove();
            }
        });
    }

    removeApp(appId) {
        this.apps = this.apps.filter(app => app.id !== appId);
        this.refreshDock();
    }

    refreshDock() {
        const appsContainer = this.element.querySelector('.dock-apps');
        appsContainer.innerHTML = this.apps.map(app => this.createAppElement(app)).join('');
        
        // Reattach event listeners for new elements
        this.attachAppEventListeners();
    }

    attachAppEventListeners() {
        const dock = this.element;
        dock.querySelectorAll('.dock-app').forEach(appElement => {
            const appId = appElement.dataset.app;
            
            appElement.addEventListener('click', () => this.launchApp(appId));
            appElement.addEventListener('mouseenter', (e) => {
                this.showTooltip(e.currentTarget);
                this.animateHover(e.currentTarget, true);
            });
            appElement.addEventListener('mouseleave', (e) => {
                this.hideTooltip(e.currentTarget);
                this.animateHover(e.currentTarget, false);
            });
            appElement.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showContextMenu(e, appId);
            });
        });
    }

    openTrash() {
        const trashModal = document.createElement('div');
        trashModal.className = 'trash-modal';
        trashModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>🗑️ Trash</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="trash-content">
                        <div class="trash-empty">
                            <span class="trash-icon">🗑️</span>
                            <p>Trash is empty</p>
                        </div>
                    </div>
                    <div class="trash-actions">
                        <button class="trash-action" disabled>Empty Trash</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(trashModal);

        trashModal.querySelector('.modal-close').addEventListener('click', () => {
            trashModal.remove();
        });
    }

    showPreferences() {
        const prefsModal = document.createElement('div');
        prefsModal.className = 'dock-preferences-modal';
        prefsModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Dock Preferences</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="pref-group">
                        <label>Position:</label>
                        <select id="dock-position">
                            <option value="bottom" ${this.position === 'bottom' ? 'selected' : ''}>Bottom</option>
                            <option value="left" ${this.position === 'left' ? 'selected' : ''}>Left</option>
                            <option value="right" ${this.position === 'right' ? 'selected' : ''}>Right</option>
                        </select>
                    </div>
                    <div class="pref-group">
                        <label>Size:</label>
                        <select id="dock-size">
                            <option value="small" ${this.size === 'small' ? 'selected' : ''}>Small</option>
                            <option value="medium" ${this.size === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="large" ${this.size === 'large' ? 'selected' : ''}>Large</option>
                        </select>
                    </div>
                    <div class="pref-group">
                        <label>
                            <input type="checkbox" id="dock-autohide" ${this.autoHideEnabled ? 'checked' : ''}>
                            Auto-hide
                        </label>
                    </div>
                    <div class="pref-actions">
                        <button id="save-prefs">Save</button>
                        <button id="cancel-prefs">Cancel</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(prefsModal);

        prefsModal.querySelector('#save-prefs').addEventListener('click', () => {
            this.position = prefsModal.querySelector('#dock-position').value;
            this.size = prefsModal.querySelector('#dock-size').value;
            this.autoHideEnabled = prefsModal.querySelector('#dock-autohide').checked;

            localStorage.setItem('dock-position', this.position);
            localStorage.setItem('dock-size', this.size);
            localStorage.setItem('dock-autohide', this.autoHideEnabled);

            this.element.className = `dock dock-${this.position} dock-${this.size}`;
            this.updatePosition();

            if (this.autoHideEnabled) {
                this.startAutoHideTimer();
            }

            prefsModal.remove();
        });

        prefsModal.querySelector('#cancel-prefs').addEventListener('click', () => {
            prefsModal.remove();
        });

        prefsModal.querySelector('.modal-close').addEventListener('click', () => {
            prefsModal.remove();
        });
    }

    toggleMinimize() {
        this.element.classList.toggle('minimized');
    }

    show() {
        this.element.classList.remove('hidden');
        this.isHidden = false;
    }

    hide() {
        this.element.classList.add('hidden');
        this.isHidden = true;
    }

    updatePosition() {
        // Recalculate dock position based on screen size and position setting
        this.element.style.position = 'fixed';
        this.element.style.width = '380px';
        
        switch (this.position) {
            case 'bottom':
                this.element.style.bottom = '10px';
                this.element.style.left = '50%';
                this.element.style.transform = 'translateX(-50%)';
                this.element.style.top = 'auto';
                this.element.style.right = 'auto';
                break;
            case 'left':
                this.element.style.left = '10px';
                this.element.style.top = '50%';
                this.element.style.transform = 'translateY(-50%)';
                this.element.style.bottom = 'auto';
                this.element.style.right = 'auto';
                break;
            case 'right':
                this.element.style.right = '10px';
                this.element.style.top = '50%';
                this.element.style.transform = 'translateY(-50%)';
                this.element.style.bottom = 'auto';
                this.element.style.left = 'auto';
                break;
        }
    }

    // Public methods for external interaction
    addApp(app) {
        this.apps.push(app);
        this.refreshDock();
    }

    removeAppById(appId) {
        this.removeApp(appId);
    }

    setAppNotification(appId, count = 1) {
        this.updateAppStatus(appId, { hasNotifications: true, notificationCount: count });
    }

    clearAppNotification(appId) {
        this.updateAppStatus(appId, { hasNotifications: false, notificationCount: 0 });
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.bitcoinDock = new Dock();
    });
} else {
    window.bitcoinDock = new Dock();
}