'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';

interface MenuItem {
  label?: string;
  action?: () => void;
  href?: string;
  divider?: boolean;
  shortcut?: string;
}

interface MenuData {
  label: string;
  items: MenuItem[];
}

interface ChatHeaderProps {
  isAuthenticated?: boolean;
  currentUser?: any;
  onLogout?: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ 
  isAuthenticated = false, 
  currentUser = null, 
  onLogout 
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showBitcoinSuite, setShowBitcoinSuite] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
        setShowBitcoinSuite(false);
        setShowMobileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const menus: MenuData[] = [
    {
      label: 'Bitcoin Chat',
      items: [
        { label: 'Home', action: () => { window.location.href = '/'; }},
        { divider: true },
        { label: 'About Bitcoin Chat', action: () => alert(
          'Bitcoin Chat v1.0\n\n' +
          'Decentralized messaging platform on Bitcoin SV\n\n' +
          '© 2025 The Bitcoin Corporation LTD\n' +
          'Registered in England and Wales • Company No. 16735102\n' +
          'All rights reserved\n\n' +
          'Built with HandCash integration'
        ) },
        { label: 'Features', action: () => {
          const event = new CustomEvent('showFeaturesPage');
          window.dispatchEvent(event);
        }},
        { divider: true },
        { label: 'Preferences...', shortcut: '⌘,', action: () => window.location.href = '/settings' },
        { label: 'Connection Settings...', action: () => console.log('Connection settings') },
        { divider: true },
        { label: 'Hide Bitcoin Chat', shortcut: '⌘H', action: () => console.log('Hide') },
        { label: 'Hide Others', shortcut: '⌥⌘H', action: () => console.log('Hide Others') },
        { divider: true },
        { label: isAuthenticated ? 'Sign Out' : 'Sign In', shortcut: '⌘Q', action: isAuthenticated ? onLogout : () => console.log('Sign in') }
      ]
    },
    {
      label: 'Chat',
      items: [
        { label: 'New Room', shortcut: '⌘N', action: () => console.log('New room') },
        { label: 'Join Room...', shortcut: '⌘J', action: () => window.location.href = '/rooms' },
        { label: 'Private Message', shortcut: '⌘P', action: () => console.log('Private message') },
        { divider: true },
        { label: 'Send File...', shortcut: '⌘O', action: () => console.log('Send file') },
        { label: 'Send Payment...', shortcut: '⌘$', action: () => console.log('Send payment') },
        { divider: true },
        { label: 'Export Chat...', shortcut: '⌘E', action: () => console.log('Export chat') },
        { label: 'Clear History', action: () => console.log('Clear history') },
        { divider: true },
        { label: 'Share Room Link', shortcut: '⌘L', action: () => {
          navigator.clipboard.writeText(window.location.href);
          alert('Room link copied to clipboard!');
        }}
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
        { divider: true },
        { label: 'Select All', shortcut: '⌘A', action: () => document.execCommand('selectAll') },
        { label: 'Find in Chat...', shortcut: '⌘F', action: () => console.log('Find in chat') }
      ]
    },
    {
      label: 'Blockchain',
      items: [
        { label: 'Send BSV', action: () => console.log('Send BSV') },
        { label: 'Request Payment', action: () => console.log('Request payment') },
        { label: 'Payment History', action: () => console.log('Payment history') },
        { divider: true },
        { label: 'Set Paywall', action: () => console.log('Set paywall') },
        { label: 'Tip Settings', action: () => console.log('Tip settings') },
        { divider: true },
        { label: 'Wallet Balance', action: () => console.log('Wallet balance') },
        { label: 'Transaction Explorer', href: 'https://whatsonchain.com', action: () => window.open('https://whatsonchain.com') }
      ]
    },
    {
      label: 'Rooms',
      items: [
        { label: 'Browse Rooms', shortcut: '⌥⌘R', action: () => window.location.href = '/rooms' },
        { label: 'Create Room...', action: () => console.log('Create room') },
        { label: 'Join Private Room...', action: () => console.log('Join private room') },
        { divider: true },
        { label: 'Room Settings...', action: () => console.log('Room settings') },
        { label: 'Invite Users...', action: () => console.log('Invite users') },
        { label: 'Manage Permissions...', action: () => console.log('Manage permissions') },
        { divider: true },
        { label: 'Leave Room', action: () => console.log('Leave room') },
        { label: 'Archive Room', action: () => console.log('Archive room') }
      ]
    },
    {
      label: 'Social',
      items: [
        { label: 'Share on X', action: () => window.open(`https://twitter.com/intent/tweet?text=Join me on Bitcoin Chat&url=${window.location.href}`) },
        { label: 'Share on LinkedIn', action: () => console.log('LinkedIn share') },
        { label: 'Send to WhatsApp', action: () => window.open(`https://wa.me/?text=Join me on Bitcoin Chat: ${window.location.href}`) },
        { label: 'Send via Email', action: () => window.location.href = `mailto:?subject=Bitcoin Chat Invitation&body=Join me on Bitcoin Chat: ${window.location.href}` },
        { divider: true },
        { label: 'Generate QR Code', action: () => console.log('Generate QR') },
        { label: 'Embed Widget', action: () => console.log('Generate embed code') }
      ]
    },
    {
      label: 'View',
      items: [
        { label: 'Reload', shortcut: '⌘R', action: () => window.location.reload() },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: () => document.documentElement.requestFullscreen() },
        { divider: true },
        { label: 'Show Sidebar', shortcut: '⌥⌘S', action: () => console.log('Toggle sidebar') },
        { label: 'Show User List', shortcut: '⌥⌘U', action: () => console.log('Toggle user list') },
        { divider: true },
        { label: 'Zoom In', shortcut: '⌘+', action: () => (document.body.style as any).zoom = '110%' },
        { label: 'Zoom Out', shortcut: '⌘-', action: () => (document.body.style as any).zoom = '90%' },
        { label: 'Actual Size', shortcut: '⌘0', action: () => (document.body.style as any).zoom = '100%' }
      ]
    },
    {
      label: 'Tools',
      items: [
        { label: 'Voice Call', action: () => console.log('Voice call') },
        { label: 'Video Call', action: () => console.log('Video call') },
        { label: 'Screen Share', action: () => console.log('Screen share') },
        { divider: true },
        { label: 'File Transfer', action: () => console.log('File transfer') },
        { label: 'Message Encryption', action: () => console.log('Message encryption') },
        { divider: true },
        { label: 'Network Status', action: () => console.log('Network status') },
        { label: 'Debug Console', action: () => console.log('Debug console') }
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', action: () => console.log('Minimize') },
        { label: 'Close', shortcut: '⌘W', action: () => console.log('Close') },
        { divider: true },
        { label: 'All Rooms', action: () => window.location.href = '/rooms' },
        { label: 'Settings', action: () => window.location.href = '/settings' },
        { divider: true },
        { label: 'Bring All to Front', action: () => console.log('Bring to front') }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Bitcoin Chat Help', shortcut: '⌘?', action: () => console.log('Help') },
        { label: 'Keyboard Shortcuts', action: () => console.log('Shortcuts') },
        { label: 'Getting Started', action: () => console.log('Getting started') },
        { divider: true },
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api/docs' },
        { label: 'BSV Documentation', href: 'https://docs.bsvblockchain.org' },
        { divider: true },
        { label: 'What\'s New', action: () => alert('New Features:\n\n• P2P Video Calls\n• File Encryption\n• Payment Channels\n• Multi-room Support\n• Mobile App') },
        { divider: true },
        { label: 'Report Issue', href: 'https://github.com/bitcoin-apps-suite/bitcoin-chat/issues' },
        { label: 'GitHub Repository', href: 'https://github.com/bitcoin-apps-suite/bitcoin-chat' },
        { label: 'Contact Support', href: 'https://twitter.com/b0ase' }
      ]
    }
  ];

  return (
    <div 
      ref={menuRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        height: '32px',
        background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
        borderBottom: '1px solid #1a1a1a',
        fontSize: '13px',
        fontWeight: '500',
        color: '#ffffff',
        userSelect: 'none',
        position: 'fixed',
        top: isMobile ? (window.innerWidth <= 480 ? '68px' : '72px') : '40px',
        left: 0,
        right: 0,
        zIndex: 10000
      }}
    >
      {/* Desktop Layout */}
      {!isMobile && (
        <>
          {/* Left side - Bitcoin Logo and menus */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            {/* Bitcoin Logo */}
            <button
              onClick={() => {
                setShowBitcoinSuite(!showBitcoinSuite);
                setActiveMenu(null);
              }}
              style={{
                background: showBitcoinSuite ? 'rgba(255, 101, 0, 0.2)' : 'transparent',
                border: 'none',
                color: '#ff6500',
                fontSize: '16px',
                fontWeight: '700',
                padding: '0 12px',
                height: '32px',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              ₿
            </button>

            {/* Bitcoin Suite Dropdown */}
            {showBitcoinSuite && (
              <div style={{
                position: 'absolute',
                top: '32px',
                left: 0,
                minWidth: '220px',
                background: '#1a1a1a',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                padding: '8px 0',
                zIndex: 1000
              }}>
                <div style={{
                  padding: '8px 16px',
                  fontSize: '12px',
                  color: '#ff6500',
                  fontWeight: '600',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                  marginBottom: '4px'
                }}>
                  Bitcoin Apps
                </div>
                
                {bitcoinApps.map((app) => (
                  <a
                    key={app.name}
                    href={app.url}
                    target={app.url.startsWith('http') ? '_blank' : undefined}
                    rel={app.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '6px 16px',
                      color: app.current ? '#ffffff' : '#ffffff',
                      background: app.current ? 'rgba(255, 101, 0, 0.1)' : 'transparent',
                      textDecoration: 'none',
                      fontSize: '13px',
                      transition: 'background 0.15s ease',
                      cursor: 'pointer',
                      fontWeight: app.current ? '600' : '400'
                    }}
                    onClick={() => setShowBitcoinSuite(false)}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = app.current ? 'rgba(255, 101, 0, 0.1)' : 'transparent'}
                  >
                    <span style={{ 
                      color: app.color,
                      marginRight: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>
                      ₿
                    </span>
                    <span>
                      {app.name}
                      {app.current && <span style={{ marginLeft: '8px', fontSize: '11px', opacity: 0.6 }}>(current)</span>}
                    </span>
                  </a>
                ))}
              </div>
            )}

            {/* Menu Items */}
            {menus.map((menu) => (
              <div key={menu.label} style={{ position: 'relative' }}>
                <button
                  onClick={() => {
                    setActiveMenu(activeMenu === menu.label ? null : menu.label);
                    setShowBitcoinSuite(false);
                  }}
                  onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
                  style={{
                    padding: '0 12px',
                    height: '32px',
                    background: activeMenu === menu.label ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    border: 'none',
                    color: '#ffffff',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'background 0.15s ease'
                  }}
                >
                  {menu.label}
                </button>

                {/* Dropdown Menu */}
                {activeMenu === menu.label && (
                  <div style={{
                    position: 'absolute',
                    top: '32px',
                    left: 0,
                    minWidth: '200px',
                    background: '#1a1a1a',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
                    padding: '4px 0',
                    zIndex: 9999,
                    overflow: 'hidden'
                  }}>
                    {menu.items.map((item, index) => (
                      item.divider ? (
                        <div 
                          key={index}
                          style={{
                            height: '1px',
                            background: 'rgba(255, 255, 255, 0.1)',
                            margin: '4px 0'
                          }}
                        />
                      ) : item.href ? (
                        <a
                          key={index}
                          href={item.href}
                          target={item.href?.startsWith('http') ? '_blank' : undefined}
                          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '4px 12px',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontSize: '13px',
                            cursor: 'pointer',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 101, 0, 0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                          onClick={() => setActiveMenu(null)}
                        >
                          <span>{item.label}</span>
                          {item.href?.startsWith('http') && <ExternalLink size={12} style={{ marginLeft: '8px', opacity: 0.6 }} />}
                          {item.shortcut && <span style={{ opacity: 0.6, fontSize: '12px' }}>{item.shortcut}</span>}
                        </a>
                      ) : (
                        <button
                          key={index}
                          onClick={() => {
                            item.action?.();
                            setActiveMenu(null);
                          }}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            padding: '4px 12px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '13px',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            textAlign: 'left',
                            transition: 'background 0.15s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 101, 0, 0.2)'}
                          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                          <span>{item.label}</span>
                          {item.shortcut && <span style={{ opacity: 0.6, fontSize: '12px' }}>{item.shortcut}</span>}
                        </button>
                      )
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right side - Status and Links */}
          <div style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            paddingRight: '16px',
            fontSize: '12px'
          }}>
            <a href="/docs" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>Docs</a>
            <a href="https://github.com/bitcoin-apps-suite/bitcoin-chat" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none' }}>GitHub</a>
            <span style={{ color: isAuthenticated ? '#ff6500' : '#ff4444' }}>
              {isAuthenticated ? '●' : '○'} {isAuthenticated ? 'Connected' : 'Not Connected'}
            </span>
          </div>
        </>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <>
          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              padding: '0 12px',
              height: '32px',
              cursor: 'pointer'
            }}
          >
            {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
          </button>

          <div style={{ 
            flex: 1, 
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: '600',
            color: '#ff6500'
          }}>
            ₿ Bitcoin Chat
          </div>

          {/* Mobile Menu Overlay */}
          {showMobileMenu && (
            <div style={{
              position: 'fixed',
              top: '32px',
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0, 0, 0, 0.95)',
              backdropFilter: 'blur(16px)',
              zIndex: 9999,
              overflowY: 'auto',
              padding: '16px'
            }}>
              {menus.map((menu) => (
                <div key={menu.label} style={{
                  marginBottom: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#ffffff',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {menu.label}
                  </div>
                  <div style={{ padding: '8px' }}>
                    {menu.items.map((item, index) => (
                      item.divider ? (
                        <div key={index} style={{
                          height: '1px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          margin: '8px 0'
                        }} />
                      ) : item.href ? (
                        <a
                          key={index}
                          href={item.href}
                          target={item.href?.startsWith('http') ? '_blank' : undefined}
                          rel={item.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                          onClick={() => setShowMobileMenu(false)}
                          style={{
                            display: 'block',
                            padding: '10px 12px',
                            color: '#ffffff',
                            textDecoration: 'none',
                            fontSize: '13px',
                            borderRadius: '4px'
                          }}
                        >
                          {item.label}
                        </a>
                      ) : (
                        <button
                          key={index}
                          onClick={() => {
                            item.action?.();
                            setShowMobileMenu(false);
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            textAlign: 'left',
                            padding: '10px 12px',
                            background: 'transparent',
                            border: 'none',
                            color: '#ffffff',
                            fontSize: '13px',
                            cursor: 'pointer',
                            borderRadius: '4px'
                          }}
                        >
                          {item.label}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatHeader;