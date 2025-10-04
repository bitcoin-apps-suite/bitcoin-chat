'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  MessageSquare, 
  Users, 
  Settings, 
  FileText, 
  DollarSign, 
  GitBranch, 
  Bug, 
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Zap,
  Package,
  Terminal,
  Activity,
  Phone,
  Shield,
  Wifi
} from 'lucide-react';
import './DevSidebar.css';

interface DevSidebarProps {
  onCollapsedChange?: (collapsed: boolean) => void;
}

const DevSidebar: React.FC<DevSidebarProps> = ({ onCollapsedChange }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Default to collapsed if no preference is saved
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      return saved !== null ? saved === 'true' : true;
    }
    return true;
  });
  const [issueCount, setIssueCount] = useState<number>(0);
  const [onlineUsers, setOnlineUsers] = useState<number>(0);
  const pathname = usePathname();

  useEffect(() => {
    // Load collapsed state from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      if (saved !== null) {
        setIsCollapsed(saved === 'true');
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('devSidebarCollapsed', isCollapsed.toString());
    }
    onCollapsedChange?.(isCollapsed);
  }, [isCollapsed, onCollapsedChange]);

  useEffect(() => {
    // Fetch GitHub issue count for bitcoin-chat
    fetch('https://api.github.com/repos/bitcoin-apps-suite/bitcoin-chat/issues?state=open')
      .then(res => res.json())
      .then(issues => setIssueCount(Array.isArray(issues) ? issues.length : 0))
      .catch(() => setIssueCount(0));

    // Simulate online users count
    setOnlineUsers(Math.floor(Math.random() * 100) + 50);
  }, []);

  const menuItems: Array<{
    path?: string;
    icon?: React.ComponentType<{ size?: number }>;
    label?: string;
    badge?: string;
    divider?: boolean;
    external?: boolean;
  }> = [
    { path: '/rooms', icon: MessageSquare, label: 'Chat Rooms', badge: '15' },
    { path: '/users', icon: Users, label: 'Users Online', badge: onlineUsers.toString() },
    { path: '/calls', icon: Phone, label: 'Video Calls', badge: '3' },
    { path: '/settings', icon: Settings, label: 'Settings' },
    { divider: true },
    { path: '/docs', icon: BookOpen, label: 'Documentation' },
    { path: '/api', icon: Package, label: 'API Reference' },
    { path: '/privacy', icon: Shield, label: 'Privacy & Security' },
    { divider: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-chat', icon: GitBranch, label: 'GitHub', external: true },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-chat/issues', icon: Bug, label: 'Issues', external: true, badge: issueCount > 0 ? String(issueCount) : undefined },
    { path: 'https://github.com/bitcoin-apps-suite/bitcoin-chat/pulls', icon: Terminal, label: 'Pull Requests', external: true },
    { divider: true },
    { path: '/network', icon: Wifi, label: 'Network Status', badge: '🟢' },
    { path: '/status', icon: Activity, label: 'System Status', badge: '🟢' }
  ];

  const stats = {
    totalRooms: '25',
    activeChats: '12',
    onlineUsers: onlineUsers.toString(),
    messagesPerDay: '2.5K'
  };

  return (
    <div className={`dev-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="dev-sidebar-header">
        {!isCollapsed && (
          <div className="dev-sidebar-title">
            <MessageSquare className="dev-sidebar-logo" />
            <span>Chat Hub</span>
          </div>
        )}
        <button 
          className="dev-sidebar-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="dev-sidebar-nav">
        {menuItems.map((item, index) => {
          if (item.divider) {
            return <div key={index} className="dev-sidebar-divider" />;
          }

          const Icon = item.icon;
          const isActive = pathname === item.path;

          if (item.external) {
            return (
              <a
                key={item.path}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                {Icon && <Icon size={20} />}
                {!isCollapsed && (
                  <>
                    <span className="dev-sidebar-label">{item.label}</span>
                    {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                  </>
                )}
              </a>
            );
          }

          return (
            <Link
              key={item.path}
              href={item.path || '/'}
              className={`dev-sidebar-item ${isActive ? 'active' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              {Icon && <Icon size={20} />}
              {!isCollapsed && (
                <>
                  <span className="dev-sidebar-label">{item.label}</span>
                  {item.badge && <span className="dev-sidebar-badge">{item.badge}</span>}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      {!isCollapsed && (
        <div className="dev-sidebar-stats">
          <h4>Chat Stats</h4>
          <div className="dev-stat">
            <span className="dev-stat-label">Total Rooms</span>
            <span className="dev-stat-value">{stats.totalRooms}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Active Chats</span>
            <span className="dev-stat-value">{stats.activeChats}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Online Users</span>
            <span className="dev-stat-value">{stats.onlineUsers}</span>
          </div>
          <div className="dev-stat">
            <span className="dev-stat-label">Messages/Day</span>
            <span className="dev-stat-value">{stats.messagesPerDay}</span>
          </div>
        </div>
      )}

      {!isCollapsed && (
        <div className="dev-sidebar-footer">
          <div className="dev-sidebar-cta">
            <p>Join the Community</p>
            <Link href="/rooms" className="dev-sidebar-cta-button">
              Browse Rooms
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevSidebar;