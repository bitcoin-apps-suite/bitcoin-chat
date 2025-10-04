'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession, signOut } from '@/components/Providers'
import { Menu, X } from 'lucide-react'

interface DropdownItem {
  label?: string
  action?: () => void
  href?: string
  divider?: boolean
  shortcut?: string
  target?: string
}

interface DropdownMenu {
  label: string
  items: DropdownItem[]
}

export default function Taskbar() {
  const { data: session } = useSession()
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [showBitcoinSuite, setShowBitcoinSuite] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const handleOpenRooms = () => {
    window.location.href = '/rooms'
  }

  const handleOpenSettings = () => {
    window.location.href = '/settings'
  }

  const menus: DropdownMenu[] = [
    {
      label: 'Bitcoin Chat',
      items: [
        { label: 'Home', shortcut: '⌘H', action: () => window.location.href = '/' },
        { divider: true },
        { label: 'About Bitcoin Chat', action: () => alert(
          'Bitcoin Chat v1.0.0\n\n' +
          'Decentralized Messaging Platform\n\n' +
          '© 2025 The Bitcoin Corporation LTD.\n' +
          'Registered in England and Wales\n' +
          'Company No. 16735102\n\n' +
          'Built with:\n' +
          '• Next.js 15.5\n' +
          '• Bitcoin SV (BSV) Blockchain\n' +
          '• P2P WebRTC Connections\n' +
          '• End-to-End Encryption\n\n' +
          'Features:\n' +
          '• Decentralized peer-to-peer messaging\n' +
          '• Bitcoin SV payment integration\n' +
          '• Censorship-resistant communication\n' +
          '• Multi-room support\n' +
          '• File sharing with BSV storage\n\n' +
          'License: Open BSV License Version 5\n\n' +
          'Website: https://bitcoin-chat.vercel.app\n' +
          'GitHub: github.com/bitcoin-apps-suite/bitcoin-chat'
        ) },
        { divider: true },
        { label: 'Preferences...', shortcut: '⌘,', action: handleOpenSettings },
        { label: 'Connection Settings...', action: () => console.log('Connection settings') },
        { divider: true },
        { label: session ? 'Sign Out' : 'Sign In', shortcut: '⌘Q', action: session ? () => signOut() : () => document.querySelector<HTMLButtonElement>('[data-signin]')?.click() }
      ]
    },
    {
      label: 'Chat',
      items: [
        { label: 'New Room', shortcut: '⌘N', action: () => alert('Creating new chat room') },
        { label: 'Join Room', shortcut: '⌘J', action: () => console.log('Join room') },
        { label: 'Private Message', shortcut: '⌘P', action: () => console.log('Private message') },
        { divider: true },
        { label: 'Send File', shortcut: '⌘O', action: () => document.getElementById('file-input')?.click() },
        { label: 'Send Payment', shortcut: '⌘$', action: () => console.log('Send payment') },
        { divider: true },
        { label: 'Export Chat', shortcut: '⌘E', action: () => console.log('Export chat') },
        { label: 'Clear History', action: () => console.log('Clear history') },
        { divider: true },
        { label: 'Share Room Link', shortcut: '⌘L', action: () => {
          navigator.clipboard.writeText(window.location.href)
          alert('Room link copied to clipboard!')
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
      label: 'View',
      items: [
        { label: 'Compact Mode', shortcut: '⌘1', action: () => console.log('Compact mode') },
        { label: 'Comfortable Mode', shortcut: '⌘2', action: () => console.log('Comfortable mode') },
        { label: 'Detailed Mode', shortcut: '⌘3', action: () => console.log('Detailed mode') },
        { divider: true },
        { label: 'Show Sidebar', shortcut: '⌥⌘S', action: () => console.log('Toggle sidebar') },
        { label: 'Show User List', shortcut: '⌥⌘U', action: () => console.log('Toggle user list') },
        { divider: true },
        { label: 'Enter Full Screen', shortcut: '⌃⌘F', action: () => document.documentElement.requestFullscreen() },
        { divider: true },
        { label: 'Zoom In', shortcut: '⌘+', action: () => (document.body.style as { zoom: string }).zoom = '110%' },
        { label: 'Zoom Out', shortcut: '⌘-', action: () => (document.body.style as { zoom: string }).zoom = '90%' },
        { label: 'Actual Size', shortcut: '⌘0', action: () => (document.body.style as { zoom: string }).zoom = '100%' }
      ]
    },
    {
      label: 'Rooms',
      items: [
        { label: 'Browse Rooms', shortcut: '⌥⌘R', action: handleOpenRooms },
        { label: 'Create Room', action: () => console.log('Create room') },
        { divider: true },
        { label: 'Room Settings', action: () => console.log('Room settings') },
        { label: 'Invite Users', action: () => console.log('Invite users') },
        { divider: true },
        { label: 'Leave Room', action: () => console.log('Leave room') },
        { label: 'Archive Room', action: () => console.log('Archive room') }
      ]
    },
    {
      label: 'Payments',
      items: [
        { label: 'Send BSV', action: () => console.log('Send BSV') },
        { label: 'Request Payment', action: () => console.log('Request payment') },
        { label: 'Payment History', action: () => console.log('Payment history') },
        { divider: true },
        { label: 'Set Paywall', action: () => console.log('Set paywall') },
        { label: 'Tip Settings', action: () => console.log('Tip settings') },
        { divider: true },
        { label: 'Wallet Balance', action: () => console.log('Wallet balance') },
        { label: 'Transaction Explorer', href: 'https://whatsonchain.com', target: '_blank' }
      ]
    },
    {
      label: 'Share',
      items: [
        { label: 'Copy Room Link', shortcut: '⌥⌘L', action: () => {
          navigator.clipboard.writeText(window.location.href)
          alert('Room link copied!')
        }},
        { label: 'Generate QR Code', action: () => console.log('Generate QR') },
        { divider: true },
        { label: 'Share on X', action: () => window.open(`https://twitter.com/intent/tweet?text=Join me on Bitcoin Chat&url=${window.location.href}`) },
        { label: 'Share on LinkedIn', action: () => console.log('LinkedIn share') },
        { label: 'Send to WhatsApp', action: () => window.open(`https://wa.me/?text=Join me on Bitcoin Chat: ${window.location.href}`) },
        { label: 'Send via Email', action: () => window.location.href = `mailto:?subject=Bitcoin Chat Invitation&body=Join me on Bitcoin Chat: ${window.location.href}` },
        { divider: true },
        { label: 'Embed Widget', action: () => console.log('Generate embed code') }
      ]
    },
    {
      label: 'Window',
      items: [
        { label: 'Minimize', shortcut: '⌘M', action: () => console.log('Minimize') },
        { label: 'Zoom', action: () => console.log('Zoom') },
        { divider: true },
        { label: 'All Rooms', action: handleOpenRooms },
        { label: 'Settings', action: handleOpenSettings },
        { divider: true },
        { label: 'Bring All to Front', action: () => console.log('Bring to front') }
      ]
    },
    {
      label: 'Help',
      items: [
        { label: 'Bitcoin Chat Help', shortcut: '⌘?', action: () => alert(
          'Bitcoin Chat Help\n\n' +
          'Quick Start:\n' +
          '1. Join or create a chat room\n' +
          '2. Connect your BSV wallet\n' +
          '3. Start messaging with end-to-end encryption\n' +
          '4. Send files and payments directly in chat\n' +
          '5. Invite others with room links\n\n' +
          'Features:\n' +
          '• Peer-to-peer messaging via WebRTC\n' +
          '• Bitcoin SV payment integration\n' +
          '• File sharing with blockchain storage\n' +
          '• Multi-room support\n' +
          '• Censorship resistance\n\n' +
          'Privacy:\n' +
          '• End-to-end encryption\n' +
          '• No central servers for messages\n' +
          '• BSV blockchain for payments only\n\n' +
          'Support:\n' +
          '• Documentation: /docs\n' +
          '• GitHub Issues: github.com/bitcoin-apps-suite/bitcoin-chat/issues\n' +
          '• Twitter: @b0ase'
        ) },
        { label: 'Keyboard Shortcuts', action: () => console.log('Show shortcuts') },
        { divider: true },
        { label: 'API Documentation', href: '/api/docs', target: '_blank' },
        { label: 'BSV Documentation', href: 'https://docs.bsvblockchain.org', target: '_blank' },
        { label: 'WebRTC Documentation', href: 'https://webrtc.org/getting-started/', target: '_blank' },
        { divider: true },
        { label: 'What\'s New', action: () => alert('New Features:\n\n• P2P Video Calls\n• File Encryption\n• Payment Channels\n• Multi-room Support\n• Mobile App') },
        { divider: true },
        { label: 'Report Issue', href: 'https://github.com/bitcoin-apps-suite/bitcoin-chat/issues', target: '_blank' },
        { label: 'GitHub Repository', href: 'https://github.com/bitcoin-apps-suite/bitcoin-chat', target: '_blank' },
        { label: 'Contact Support', href: 'https://twitter.com/b0ase', target: '_blank' }
      ]
    }
  ]

  const bitcoinApps = [
    { name: 'Bitcoin Auth', color: '#ef4444', url: '#' },
    { name: 'Bitcoin Chat', color: '#ff6500', url: 'https://bitcoin-chat.vercel.app', current: true },
    { name: 'Bitcoin Domains', color: '#eab308', url: '#' },
    { name: 'Bitcoin Draw', color: '#10b981', url: '#' },
    { name: 'Bitcoin Drive', color: '#22c55e', url: 'https://bitcoin-drive.vercel.app' },
    { name: 'Bitcoin Email', color: '#06b6d4', url: '#' },
    { name: 'Bitcoin Exchange', color: '#3b82f6', url: '#' },
    { name: 'Bitcoin Music', color: '#8b5cf6', url: '#' },
    { name: 'Bitcoin Paint', color: '#a855f7', url: '#' },
    { name: 'Bitcoin Pics', color: '#ec4899', url: '#' },
    { name: 'Bitcoin Registry', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Shares', color: '#f43f5e', url: '#' },
    { name: 'Bitcoin Spreadsheets', color: '#3b82f6', url: 'https://bitcoin-spreadsheet.vercel.app' },
    { name: 'Bitcoin Video', color: '#65a30d', url: '#' },
    { name: 'Bitcoin Wallet', color: '#f59e0b', url: '#' },
    { name: 'Bitcoin Writer', color: '#ff9500', url: 'https://bitcoin-writer.vercel.app' }
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null)
        setShowBitcoinSuite(false)
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div 
      ref={menuRef}
      className="taskbar"
      style={{
        position: 'fixed',
        top: '40px', // Below PocBar
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '28px',
        background: 'linear-gradient(180deg, rgba(40, 20, 0, 0.95) 0%, rgba(30, 15, 0, 0.95) 100%)',
        borderBottom: '1px solid rgba(255, 101, 0, 0.2)',
        fontSize: '13px',
        fontWeight: '500',
        color: '#ffffff',
        userSelect: 'none',
        zIndex: 10000
      }}
    >
      {/* Left side - Bitcoin Logo and menus */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Mobile Bitcoin Logo (no dropdown) */}
        <div className="sm:hidden" style={{ 
          padding: '0 12px',
          fontSize: '18px',
          fontWeight: 'bold',
          color: '#ff6500'
        }}>
          ₿
        </div>

        {/* Bitcoin Logo container - Desktop only with dropdown */}
        <div className="hidden sm:block" style={{ position: 'relative' }}>
          <button
            onClick={() => {
              setShowBitcoinSuite(!showBitcoinSuite)
              setActiveMenu(null)
            }}
            onDoubleClick={() => {
              window.location.href = '/'
            }}
            style={{
              padding: '0 12px',
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#ff6500',
              display: 'flex',
              alignItems: 'center',
              height: '28px',
              background: showBitcoinSuite ? 'rgba(255, 101, 0, 0.1)' : 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
            title="Bitcoin Suite Apps (double-click for home)"
          >
            ₿
          </button>

          {/* Bitcoin Suite Dropdown */}
          {showBitcoinSuite && (
            <div style={{
              position: 'absolute',
              top: '28px',
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
                  background: 'transparent',
                  textDecoration: 'none',
                  fontSize: '13px',
                  transition: 'background 0.15s ease',
                  cursor: 'pointer',
                  fontWeight: app.current ? '600' : '400'
                }}
                onClick={() => setShowBitcoinSuite(false)}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <span 
                  style={{ 
                    color: app.color,
                    marginRight: '12px',
                    fontSize: '16px',
                    fontWeight: 'bold'
                  }}
                >
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
        </div>

        {/* Menu Items - Hidden on mobile */}
        <div className="hidden sm:flex" style={{ alignItems: 'center', height: '100%' }}>
        {menus.map((menu) => (
          <div key={menu.label} style={{ position: 'relative' }}>
            <button
              onClick={() => {
                setActiveMenu(activeMenu === menu.label ? null : menu.label)
                setShowBitcoinSuite(false)
              }}
              onMouseEnter={() => activeMenu && setActiveMenu(menu.label)}
              style={{
                padding: '0 12px',
                height: '24px',
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
                top: '28px',
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
                      target={item.target || '_blank'}
                      rel="noopener noreferrer"
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 101, 0, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span style={{ opacity: 0.6, fontSize: '12px' }}>{item.shortcut}</span>
                      )}
                    </a>
                  ) : (
                    <button
                      key={index}
                      onClick={() => {
                        item.action?.()
                        setActiveMenu(null)
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
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 101, 0, 0.2)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span>{item.label}</span>
                      {item.shortcut && (
                        <span style={{ opacity: 0.6, fontSize: '12px' }}>{item.shortcut}</span>
                      )}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>
        ))}
        </div>
      </div>

      {/* Mobile: Center title */}
      <button 
        className="sm:hidden flex-1 text-center" 
        onClick={() => {
          window.location.href = '/'
        }}
        style={{ 
          fontSize: '14px',
          fontWeight: '600',
          color: '#ff6500',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          height: '28px'
        }}
        title="Return to home"
      >
        Bitcoin Chat
      </button>

      {/* Mobile Menu Button */}
      <button
        className="block sm:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        style={{
          padding: '0 12px',
          height: '28px',
          background: 'transparent',
          border: 'none',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer'
        }}
      >
        {showMobileMenu ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Right side - Status items */}
      <div className="hidden sm:flex" style={{
        marginLeft: 'auto',
        alignItems: 'center',
        gap: '16px',
        paddingRight: '16px',
        fontSize: '12px',
        color: 'rgba(255, 255, 255, 0.8)'
      }}>
        <button
          onClick={() => window.location.href = '/rooms'}
          style={{
            background: 'linear-gradient(90deg, #ff6500, #ff4400)',
            color: '#fff',
            border: 'none',
            padding: '4px 12px',
            borderRadius: '100px',
            fontSize: '11px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 101, 0, 0.3)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          title="Browse Chat Rooms"
        >
          ROOMS
        </button>
        {session ? (
          <>
            <span>{session.user?.email || 'Connected'}</span>
            <span style={{ color: '#ff6500' }}>●</span>
          </>
        ) : (
          <>
            <span>Not Connected</span>
            <span style={{ color: '#ff4444', opacity: 0.6 }}>●</span>
          </>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div 
          className="sm:hidden"
          style={{
            position: 'fixed',
            top: '28px',
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            overflowY: 'auto'
          }}
        >
          <div style={{ padding: '16px' }}>
            {/* User Status */}
            <div style={{
              padding: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              {session ? (
                <>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>{session.user?.email || 'Connected'}</span>
                  <span style={{ color: '#ff6500' }}>●</span>
                </>
              ) : (
                <>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>Not Connected</span>
                  <span style={{ color: '#ff4444', opacity: 0.6 }}>●</span>
                </>
              )}
            </div>

            {/* Menu Sections */}
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
                      <div 
                        key={index}
                        style={{
                          height: '1px',
                          background: 'rgba(255, 255, 255, 0.1)',
                          margin: '8px 0'
                        }}
                      />
                    ) : item.href ? (
                      <a
                        key={index}
                        href={item.href}
                        target={item.target || '_blank'}
                        rel="noopener noreferrer"
                        onClick={() => setShowMobileMenu(false)}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          color: '#ffffff',
                          textDecoration: 'none',
                          fontSize: '13px',
                          borderRadius: '4px',
                          transition: 'background 0.15s ease'
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 101, 0, 0.2)'
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <button
                        key={index}
                        onClick={() => {
                          item.action?.()
                          setShowMobileMenu(false)
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
                          borderRadius: '4px',
                          transition: 'background 0.15s ease'
                        }}
                        onTouchStart={(e) => {
                          e.currentTarget.style.background = 'rgba(255, 101, 0, 0.2)'
                        }}
                        onTouchEnd={(e) => {
                          e.currentTarget.style.background = 'transparent'
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
        </div>
      )}
    </div>
  )
}