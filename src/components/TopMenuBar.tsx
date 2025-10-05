'use client';

import React, { useState, useEffect, useRef } from 'react';
import '../styles/TopMenuBar.css';
import { 
  MessageSquare, 
  Settings, 
  Users, 
  Phone, 
  Video, 
  FileText,
  DollarSign,
  Share2,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

interface MenuItem {
  label?: string;
  action?: () => void;
  href?: string;
  shortcut?: string;
  divider?: boolean;
  external?: boolean;
}

interface Menu {
  label: string;
  items: MenuItem[];
}

interface TopMenuBarProps {
  onOpenApp?: (app: string) => void;
}

const TopMenuBar: React.FC<TopMenuBarProps> = ({ onOpenApp }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showBitcoinApps, setShowBitcoinApps] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Bitcoin Apps from the ecosystem
  const bitcoinApps = [
    { name: 'Bitcoin Chat', color: '#ff6500', url: 'https://bitcoin-chat.vercel.app', current: true },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' },
    { name: 'Bitcoin Spreadsheets', color: '#3b82f6', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: '#' },
    { name: 'Bitcoin Exchange', color: '#10b981', url: '#' },
    { name: 'Bitcoin Email', color: '#ef4444', url: '#' },
  ];

  const menus: Menu[] = [
    {
      label: 'Chat',
      items: [
        { label: 'New Room', shortcut: '⌘N', action: () => console.log('New room') },
        { label: 'Join Room', shortcut: '⌘J', action: () => console.log('Join room') },
        { divider: true },
        { label: 'Settings', shortcut: '⌘,', action: () => window.location.href = '/settings' },
        { divider: true },
        { label: 'Quit Chat', shortcut: '⌘Q', action: () => console.log('Quit') },
      ]
    },
    {
      label: 'Edit',
      items: [
        { label: 'Undo', shortcut: '⌘Z', action: () => document.execCommand('undo') },
        { label: 'Redo', shortcut: '⇧⌘Z', action: () => document.execCommand('redo') },
        { divider: true },
        { label: 'Cut', shortcut: '⌘X', action: () => document.execCommand('cut') },
        { label: 'Copy', shortcut: '⌘C', action: () => document.execCommand('copy') },
        { label: 'Paste', shortcut: '⌘V', action: () => document.execCommand('paste') },
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Reload', shortcut: '⌘R', action: () => window.location.reload() },
        { label: 'Toggle Fullscreen', shortcut: '⌃⌘F', action: () => document.documentElement.requestFullscreen() },
        { divider: true },
        { label: 'Show Sidebar', action: () => console.log('Toggle sidebar') },
        { label: 'Show Users', action: () => console.log('Toggle users') },
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', action: () => console.log('Minimize') },
        { label: 'Close', shortcut: '⌘W', action: () => console.log('Close') },
        { divider: true },
        { label: 'All Rooms', action: () => window.location.href = '/rooms' },
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'About Bitcoin Chat', action: () => console.log('About') },
        { label: 'Keyboard Shortcuts', action: () => console.log('Shortcuts') },
        { divider: true },
        { label: 'Documentation', href: 'https://docs.bitcoin-chat.vercel.app', external: true },
        { label: 'GitHub', href: 'https://github.com/bitcoin-apps-suite/bitcoin-chat', external: true },
        { label: 'Report Issue', href: 'https://github.com/bitcoin-apps-suite/bitcoin-chat/issues', external: true },
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setShowBitcoinApps(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveMenu(null);
        setShowBitcoinApps(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={menuRef} className="bitcoin-os-taskbar">
      {/* Bitcoin Logo with Apps Menu */}
      <div className="taskbar-section left">
        <button 
          className={`bitcoin-logo ${showBitcoinApps ? 'active' : ''}`}
          onClick={() => {
            setShowBitcoinApps(!showBitcoinApps);
            setActiveMenu(null);
          }}
          title="Bitcoin Apps"
        >
          ₿
        </button>

        {showBitcoinApps && (
          <div className="dropdown bitcoin-apps-menu">
            <div className="dropdown-header">Bitcoin Apps</div>
            {bitcoinApps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                className={`bitcoin-app-item ${app.current ? 'current' : ''}`}
                target={app.url.startsWith('http') ? '_blank' : undefined}
                rel={app.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                onClick={() => setShowBitcoinApps(false)}
              >
                <span className="app-icon" style={{ color: app.color }}>₿</span>
                <span className="app-name">{app.name}</span>
                {app.current && <span className="current-indicator">●</span>}
              </a>
            ))}
          </div>
        )}

        {/* Menu Items */}
        <div className="menu-items">
          {menus.map((menu) => (
            <div key={menu.label} className="menu-item">
              <button
                className={`menu-button ${activeMenu === menu.label ? 'active' : ''}`}
                onClick={() => {
                  setActiveMenu(activeMenu === menu.label ? null : menu.label);
                  setShowBitcoinApps(false);
                }}
                onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
              >
                {menu.label}
              </button>

              {activeMenu === menu.label && (
                <div className="dropdown">
                  {menu.items.map((item, index) => (
                    item.divider ? (
                      <div key={index} className="dropdown-divider" />
                    ) : item.href ? (
                      <a
                        key={index}
                        href={item.href}
                        className="dropdown-item"
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        onClick={() => setActiveMenu(null)}
                      >
                        <span className="item-label">{item.label}</span>
                        {item.external && <ExternalLink size={12} className="external-icon" />}
                        {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                      </a>
                    ) : (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={() => {
                          item.action?.();
                          setActiveMenu(null);
                        }}
                      >
                        <span className="item-label">{item.label}</span>
                        {item.shortcut && <span className="shortcut">{item.shortcut}</span>}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Status and Links */}
      <div className="taskbar-section right">
        <a 
          href="https://github.com/bitcoin-apps-suite/bitcoin-chat" 
          target="_blank" 
          rel="noopener noreferrer"
          className="taskbar-link"
          title="View on GitHub"
        >
          GitHub
        </a>
        <a 
          href="/docs" 
          className="taskbar-link"
          title="Documentation"
        >
          Docs
        </a>
      </div>
    </div>
  );
};

export default TopMenuBar;