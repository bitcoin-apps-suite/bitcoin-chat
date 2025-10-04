// Developer Bar Component for Bitcoin Chat
class DevBar {
    constructor() {
        this.isVisible = localStorage.getItem('devbar-visible') === 'true' || false;
        this.position = localStorage.getItem('devbar-position') || 'bottom';
        this.logs = [];
        this.maxLogs = 100;
        this.filters = {
            error: true,
            warn: true,
            info: true,
            debug: true,
            network: true
        };
        this.init();
    }

    init() {
        this.createElement();
        this.attachEventListeners();
        this.interceptConsole();
        this.interceptNetwork();
        this.startPerformanceMonitoring();
        
        if (this.isVisible) {
            this.show();
        }
    }

    createElement() {
        const devbar = document.createElement('div');
        devbar.className = `devbar devbar-${this.position}`;
        devbar.innerHTML = `
            <div class="devbar-header">
                <div class="devbar-tabs">
                    <button class="devbar-tab active" data-tab="console">
                        <span class="tab-icon">🖥️</span>
                        <span class="tab-text">Console</span>
                        <span class="tab-badge" id="console-badge">0</span>
                    </button>
                    <button class="devbar-tab" data-tab="network">
                        <span class="tab-icon">🌐</span>
                        <span class="tab-text">Network</span>
                        <span class="tab-badge" id="network-badge">0</span>
                    </button>
                    <button class="devbar-tab" data-tab="performance">
                        <span class="tab-icon">⚡</span>
                        <span class="tab-text">Performance</span>
                    </button>
                    <button class="devbar-tab" data-tab="blockchain">
                        <span class="tab-icon">₿</span>
                        <span class="tab-text">Blockchain</span>
                    </button>
                </div>
                <div class="devbar-controls">
                    <div class="devbar-filters">
                        <button class="filter-btn ${this.filters.error ? 'active' : ''}" data-filter="error">
                            <span class="filter-color error"></span>
                            <span>Errors</span>
                        </button>
                        <button class="filter-btn ${this.filters.warn ? 'active' : ''}" data-filter="warn">
                            <span class="filter-color warn"></span>
                            <span>Warnings</span>
                        </button>
                        <button class="filter-btn ${this.filters.info ? 'active' : ''}" data-filter="info">
                            <span class="filter-color info"></span>
                            <span>Info</span>
                        </button>
                        <button class="filter-btn ${this.filters.debug ? 'active' : ''}" data-filter="debug">
                            <span class="filter-color debug"></span>
                            <span>Debug</span>
                        </button>
                    </div>
                    <button class="devbar-btn" id="clear-logs">🗑️</button>
                    <button class="devbar-btn" id="export-logs">📤</button>
                    <button class="devbar-btn" id="devbar-settings">⚙️</button>
                    <button class="devbar-btn" id="devbar-minimize">−</button>
                    <button class="devbar-btn" id="devbar-close">×</button>
                </div>
            </div>
            <div class="devbar-content">
                <div class="devbar-panel active" id="console-panel">
                    <div class="console-output" id="console-output"></div>
                    <div class="console-input">
                        <input type="text" id="console-command" placeholder="Enter JavaScript command..." autocomplete="off">
                        <button id="console-execute">▶</button>
                    </div>
                </div>
                <div class="devbar-panel" id="network-panel">
                    <div class="network-stats">
                        <div class="stat-item">
                            <span class="stat-label">Requests:</span>
                            <span class="stat-value" id="request-count">0</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Transferred:</span>
                            <span class="stat-value" id="data-transferred">0 KB</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-label">Load Time:</span>
                            <span class="stat-value" id="load-time">0ms</span>
                        </div>
                    </div>
                    <div class="network-requests" id="network-requests"></div>
                </div>
                <div class="devbar-panel" id="performance-panel">
                    <div class="performance-metrics">
                        <div class="metric-group">
                            <h4>Memory Usage</h4>
                            <div class="metric-bar">
                                <div class="metric-fill" id="memory-usage"></div>
                                <span class="metric-text" id="memory-text">0 MB</span>
                            </div>
                        </div>
                        <div class="metric-group">
                            <h4>CPU Usage</h4>
                            <div class="metric-bar">
                                <div class="metric-fill" id="cpu-usage"></div>
                                <span class="metric-text" id="cpu-text">0%</span>
                            </div>
                        </div>
                        <div class="metric-group">
                            <h4>Frame Rate</h4>
                            <div class="fps-display" id="fps-display">60 FPS</div>
                        </div>
                    </div>
                    <div class="performance-timeline" id="performance-timeline"></div>
                </div>
                <div class="devbar-panel" id="blockchain-panel">
                    <div class="blockchain-info">
                        <div class="blockchain-stat">
                            <span class="stat-icon">🔗</span>
                            <div class="stat-details">
                                <span class="stat-title">Latest Block</span>
                                <span class="stat-data" id="latest-block">Loading...</span>
                            </div>
                        </div>
                        <div class="blockchain-stat">
                            <span class="stat-icon">⛏️</span>
                            <div class="stat-details">
                                <span class="stat-title">Hash Rate</span>
                                <span class="stat-data" id="hash-rate">Loading...</span>
                            </div>
                        </div>
                        <div class="blockchain-stat">
                            <span class="stat-icon">💰</span>
                            <div class="stat-details">
                                <span class="stat-title">BSV Price</span>
                                <span class="stat-data" id="bsv-price">Loading...</span>
                            </div>
                        </div>
                        <div class="blockchain-stat">
                            <span class="stat-icon">📊</span>
                            <div class="stat-details">
                                <span class="stat-title">Market Cap</span>
                                <span class="stat-data" id="market-cap">Loading...</span>
                            </div>
                        </div>
                    </div>
                    <div class="transaction-monitor">
                        <h4>Recent Transactions</h4>
                        <div class="transaction-list" id="transaction-list">
                            <div class="transaction-item">
                                <span class="tx-hash">1A1zP1eP5QGefi2DMPTfTL...</span>
                                <span class="tx-amount">+0.001 BSV</span>
                                <span class="tx-time">2s ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="devbar-resize-handle"></div>
        `;
        
        document.body.appendChild(devbar);
        this.element = devbar;
    }

    attachEventListeners() {
        const devbar = this.element;
        
        // Tab switching
        devbar.querySelectorAll('.devbar-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.dataset.tab;
                this.switchTab(targetTab);
            });
        });

        // Filter buttons
        devbar.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.currentTarget.dataset.filter;
                this.toggleFilter(filter);
            });
        });

        // Control buttons
        devbar.querySelector('#clear-logs').addEventListener('click', () => this.clearLogs());
        devbar.querySelector('#export-logs').addEventListener('click', () => this.exportLogs());
        devbar.querySelector('#devbar-settings').addEventListener('click', () => this.showSettings());
        devbar.querySelector('#devbar-minimize').addEventListener('click', () => this.minimize());
        devbar.querySelector('#devbar-close').addEventListener('click', () => this.hide());

        // Console input
        const consoleInput = devbar.querySelector('#console-command');
        const executeBtn = devbar.querySelector('#console-execute');
        
        consoleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(consoleInput.value);
                consoleInput.value = '';
            }
        });
        
        executeBtn.addEventListener('click', () => {
            this.executeCommand(consoleInput.value);
            consoleInput.value = '';
        });

        // Resize handle
        this.attachResizeHandle();

        // Global keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.shiftKey) {
                switch (e.key) {
                    case 'D':
                        e.preventDefault();
                        this.toggle();
                        break;
                    case 'C':
                        e.preventDefault();
                        this.clearLogs();
                        break;
                }
            }
        });
    }

    attachResizeHandle() {
        const handle = this.element.querySelector('.devbar-resize-handle');
        let isResizing = false;

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
        });

        const resize = (e) => {
            if (!isResizing) return;
            
            const rect = this.element.getBoundingClientRect();
            const newHeight = window.innerHeight - e.clientY;
            
            if (newHeight >= 100 && newHeight <= window.innerHeight * 0.8) {
                this.element.style.height = newHeight + 'px';
            }
        };

        const stopResize = () => {
            isResizing = false;
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        };
    }

    interceptConsole() {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        const originalInfo = console.info;
        const originalDebug = console.debug;

        console.log = (...args) => {
            this.addLog('info', args.join(' '));
            originalLog.apply(console, args);
        };

        console.error = (...args) => {
            this.addLog('error', args.join(' '));
            originalError.apply(console, args);
        };

        console.warn = (...args) => {
            this.addLog('warn', args.join(' '));
            originalWarn.apply(console, args);
        };

        console.info = (...args) => {
            this.addLog('info', args.join(' '));
            originalInfo.apply(console, args);
        };

        console.debug = (...args) => {
            this.addLog('debug', args.join(' '));
            originalDebug.apply(console, args);
        };

        // Catch unhandled errors
        window.addEventListener('error', (e) => {
            this.addLog('error', `${e.message} at ${e.filename}:${e.lineno}:${e.colno}`);
        });

        window.addEventListener('unhandledrejection', (e) => {
            this.addLog('error', `Unhandled Promise Rejection: ${e.reason}`);
        });
    }

    interceptNetwork() {
        const originalFetch = window.fetch;
        let requestCount = 0;
        let totalTransferred = 0;

        window.fetch = async (...args) => {
            const startTime = Date.now();
            requestCount++;
            
            try {
                const response = await originalFetch.apply(this, args);
                const endTime = Date.now();
                const size = response.headers.get('content-length') || 0;
                
                totalTransferred += parseInt(size);
                
                this.addNetworkRequest({
                    url: args[0],
                    method: args[1]?.method || 'GET',
                    status: response.status,
                    size: parseInt(size),
                    time: endTime - startTime,
                    timestamp: new Date()
                });
                
                this.updateNetworkStats(requestCount, totalTransferred);
                return response;
            } catch (error) {
                const endTime = Date.now();
                this.addNetworkRequest({
                    url: args[0],
                    method: args[1]?.method || 'GET',
                    status: 'Failed',
                    size: 0,
                    time: endTime - startTime,
                    timestamp: new Date(),
                    error: error.message
                });
                throw error;
            }
        };
    }

    startPerformanceMonitoring() {
        if (!performance.memory) return;

        setInterval(() => {
            const memory = performance.memory;
            const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
            
            this.updatePerformanceMetrics({
                memory: {
                    used: Math.round(memory.usedJSHeapSize / 1024 / 1024),
                    total: Math.round(memory.jsHeapSizeLimit / 1024 / 1024),
                    percentage: memoryUsage
                }
            });
        }, 1000);

        // FPS monitoring
        let lastTime = performance.now();
        let frameCount = 0;
        
        const countFPS = () => {
            frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= lastTime + 1000) {
                const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
                document.getElementById('fps-display').textContent = `${fps} FPS`;
                frameCount = 0;
                lastTime = currentTime;
            }
            
            requestAnimationFrame(countFPS);
        };
        requestAnimationFrame(countFPS);
    }

    addLog(level, message) {
        const timestamp = new Date().toLocaleTimeString();
        const log = { level, message, timestamp, id: Date.now() };
        
        this.logs.unshift(log);
        if (this.logs.length > this.maxLogs) {
            this.logs.pop();
        }
        
        this.renderLogs();
        this.updateBadges();
    }

    addNetworkRequest(request) {
        const networkPanel = document.getElementById('network-requests');
        const requestElement = document.createElement('div');
        requestElement.className = `network-request ${request.status >= 400 ? 'error' : 'success'}`;
        requestElement.innerHTML = `
            <div class="request-method">${request.method}</div>
            <div class="request-url">${request.url}</div>
            <div class="request-status">${request.status}</div>
            <div class="request-size">${this.formatBytes(request.size)}</div>
            <div class="request-time">${request.time}ms</div>
        `;
        
        networkPanel.insertBefore(requestElement, networkPanel.firstChild);
        
        // Keep only last 20 requests
        while (networkPanel.children.length > 20) {
            networkPanel.removeChild(networkPanel.lastChild);
        }
    }

    updateNetworkStats(requestCount, totalTransferred) {
        document.getElementById('request-count').textContent = requestCount;
        document.getElementById('data-transferred').textContent = this.formatBytes(totalTransferred);
        
        if (performance.timing.loadEventEnd) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            document.getElementById('load-time').textContent = `${loadTime}ms`;
        }
    }

    updatePerformanceMetrics(metrics) {
        if (metrics.memory) {
            const memoryFill = document.getElementById('memory-usage');
            const memoryText = document.getElementById('memory-text');
            
            memoryFill.style.width = `${metrics.memory.percentage}%`;
            memoryText.textContent = `${metrics.memory.used}/${metrics.memory.total} MB`;
            
            // Color based on usage
            if (metrics.memory.percentage > 80) {
                memoryFill.className = 'metric-fill critical';
            } else if (metrics.memory.percentage > 60) {
                memoryFill.className = 'metric-fill warning';
            } else {
                memoryFill.className = 'metric-fill normal';
            }
        }
    }

    renderLogs() {
        const output = document.getElementById('console-output');
        const filteredLogs = this.logs.filter(log => this.filters[log.level]);
        
        output.innerHTML = filteredLogs.map(log => `
            <div class="console-log ${log.level}">
                <span class="log-time">${log.timestamp}</span>
                <span class="log-level">${log.level.toUpperCase()}</span>
                <span class="log-message">${this.escapeHtml(log.message)}</span>
            </div>
        `).join('');
        
        output.scrollTop = output.scrollHeight;
    }

    executeCommand(command) {
        if (!command.trim()) return;
        
        this.addLog('info', `> ${command}`);
        
        try {
            const result = eval(command);
            this.addLog('info', `< ${result}`);
        } catch (error) {
            this.addLog('error', `< Error: ${error.message}`);
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.devbar-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            }
        });
        
        // Update panels
        document.querySelectorAll('.devbar-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.getElementById(`${tabName}-panel`).classList.add('active');
        
        // Load blockchain data if switching to blockchain tab
        if (tabName === 'blockchain') {
            this.loadBlockchainData();
        }
    }

    toggleFilter(filter) {
        this.filters[filter] = !this.filters[filter];
        
        const btn = document.querySelector(`[data-filter="${filter}"]`);
        btn.classList.toggle('active', this.filters[filter]);
        
        this.renderLogs();
    }

    clearLogs() {
        this.logs = [];
        this.renderLogs();
        this.updateBadges();
    }

    exportLogs() {
        const logData = this.logs.map(log => 
            `[${log.timestamp}] ${log.level.toUpperCase()}: ${log.message}`
        ).join('\n');
        
        const blob = new Blob([logData], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `bitcoin-chat-logs-${new Date().toISOString()}.txt`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    updateBadges() {
        const errorCount = this.logs.filter(log => log.level === 'error').length;
        const totalCount = this.logs.length;
        
        document.getElementById('console-badge').textContent = totalCount;
        document.getElementById('network-badge').textContent = document.getElementById('request-count').textContent;
    }

    loadBlockchainData() {
        // Simulate loading blockchain data
        setTimeout(() => {
            document.getElementById('latest-block').textContent = '834,567';
            document.getElementById('hash-rate').textContent = '120.5 EH/s';
            document.getElementById('bsv-price').textContent = '$52.34';
            document.getElementById('market-cap').textContent = '$1.2B';
        }, 1000);
    }

    show() {
        this.element.classList.add('visible');
        this.isVisible = true;
        localStorage.setItem('devbar-visible', 'true');
    }

    hide() {
        this.element.classList.remove('visible');
        this.isVisible = false;
        localStorage.setItem('devbar-visible', 'false');
    }

    toggle() {
        if (this.isVisible) {
            this.hide();
        } else {
            this.show();
        }
    }

    minimize() {
        this.element.classList.toggle('minimized');
    }

    showSettings() {
        const settings = document.createElement('div');
        settings.className = 'devbar-settings-modal';
        settings.innerHTML = `
            <div class="settings-content">
                <h3>Developer Bar Settings</h3>
                <div class="setting-group">
                    <label>Position:</label>
                    <select id="position-select">
                        <option value="bottom" ${this.position === 'bottom' ? 'selected' : ''}>Bottom</option>
                        <option value="top" ${this.position === 'top' ? 'selected' : ''}>Top</option>
                    </select>
                </div>
                <div class="setting-group">
                    <label>Max Log Entries:</label>
                    <input type="number" id="max-logs" value="${this.maxLogs}" min="10" max="1000">
                </div>
                <div class="setting-actions">
                    <button id="save-settings">Save</button>
                    <button id="cancel-settings">Cancel</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(settings);
        
        settings.querySelector('#save-settings').addEventListener('click', () => {
            this.position = settings.querySelector('#position-select').value;
            this.maxLogs = parseInt(settings.querySelector('#max-logs').value);
            
            localStorage.setItem('devbar-position', this.position);
            localStorage.setItem('devbar-max-logs', this.maxLogs);
            
            this.element.className = `devbar devbar-${this.position} ${this.isVisible ? 'visible' : ''}`;
            settings.remove();
        });
        
        settings.querySelector('#cancel-settings').addEventListener('click', () => {
            settings.remove();
        });
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }
}

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.bitcoinDevBar = new DevBar();
    });
} else {
    window.bitcoinDevBar = new DevBar();
}