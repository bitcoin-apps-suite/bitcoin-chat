'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Send, Paperclip, Phone, Video, Users, Settings } from 'lucide-react';

interface Message {
  id: string;
  user: string;
  text: string;
  timestamp: Date;
  type: 'text' | 'system' | 'payment';
  amount?: number;
}

interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
}

interface Group {
  id: string;
  name: string;
  color: string;
  userCount: number;
}

interface ChatProps {
  roomId?: string;
  currentUser?: User;
}

const Chat: React.FC<ChatProps> = ({ 
  roomId = 'general', 
  currentUser = { id: '1', name: 'Anonymous', status: 'online' }
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [isConnected, setIsConnected] = useState(false);
  const [tickerSidebarCollapsed, setTickerSidebarCollapsed] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with demo messages
  useEffect(() => {
    const demoMessages: Message[] = [
      {
        id: '1',
        user: 'satoshi',
        text: 'Welcome to Bitcoin Chat! This is a decentralized P2P messaging platform.',
        timestamp: new Date(Date.now() - 3600000),
        type: 'system'
      },
      {
        id: '2',
        user: 'alice',
        text: 'Hey everyone! Excited to try out this new chat platform.',
        timestamp: new Date(Date.now() - 1800000),
        type: 'text'
      },
      {
        id: '3',
        user: 'bob',
        text: 'The Bitcoin SV integration looks amazing! 🚀',
        timestamp: new Date(Date.now() - 900000),
        type: 'text'
      },
      {
        id: '4',
        user: 'alice',
        text: 'Just sent 0.001 BSV to test payments',
        timestamp: new Date(Date.now() - 300000),
        type: 'payment',
        amount: 0.001
      }
    ];

    const demoUsers: User[] = [
      { id: '1', name: 'satoshi', status: 'online' },
      { id: '2', name: 'alice', status: 'online' },
      { id: '3', name: 'bob', status: 'online' },
      { id: '4', name: 'charlie', status: 'away' },
      { id: '5', name: 'diana', status: 'offline' },
      { id: '6', name: 'eve', status: 'online' },
      { id: '7', name: 'frank', status: 'away' },
      { id: '8', name: 'grace', status: 'online' }
    ];

    const demoGroups: Group[] = [
      { id: 'all', name: 'All Users', color: '#ff6500', userCount: demoUsers.length },
      { id: 'online', name: 'Online', color: '#10b981', userCount: demoUsers.filter(u => u.status === 'online').length },
      { id: 'developers', name: 'Developers', color: '#3b82f6', userCount: 4 },
      { id: 'moderators', name: 'Moderators', color: '#8b5cf6', userCount: 2 },
      { id: 'traders', name: 'Traders', color: '#f59e0b', userCount: 3 }
    ];

    setMessages(demoMessages);
    setUsers(demoUsers);
    setGroups(demoGroups);
    setIsConnected(true);
  }, []);

  // Track previous message count to detect new messages
  const prevMessageCount = useRef<number>(0);
  
  useEffect(() => {
    // Only scroll when new messages are added (not on initial load)
    if (messages.length > prevMessageCount.current && prevMessageCount.current > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
    prevMessageCount.current = messages.length;
  }, [messages]);

  // Listen for ticker sidebar toggle events
  useEffect(() => {
    const handleTickerToggle = (event: CustomEvent) => {
      setTickerSidebarCollapsed(event.detail);
    };

    window.addEventListener('tickerToggled', handleTickerToggle as EventListener);
    return () => {
      window.removeEventListener('tickerToggled', handleTickerToggle as EventListener);
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: currentUser.name,
      text: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getUserColor = (username: string) => {
    const colors = ['#8B5FBF', '#6B46C1', '#7C3AED', '#8B5A2B', '#5B21B6', '#6366F1'];
    const hash = username.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div style={{ marginTop: '-72px' }}> {/* Offset DevLayout's paddingTop */}
      {/* Main App Header */}
      <div style={{
        padding: '12px 0',
        borderBottom: '1px solid rgba(100, 200, 255, 0.3)',
        background: 'linear-gradient(135deg, rgba(10, 20, 50, 0.8) 0%, rgba(20, 30, 60, 0.6) 100%)',
        backdropFilter: 'blur(20px)',
        marginRight: tickerSidebarCollapsed ? '60px' : '280px',
        transition: 'margin-right 0.3s ease',
        textAlign: 'center'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '4px',
          justifyContent: 'center'
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            fontWeight: '400',
            color: '#ffffff'
          }}>
            💬
          </div>
          <span style={{
            fontSize: '24px',
            fontWeight: '300',
            color: '#64c8ff',
            letterSpacing: '0.5px'
          }}>Bitcoin</span>
          <span style={{
            fontSize: '24px',
            fontWeight: '300',
            color: '#ffffff',
            letterSpacing: '0.5px'
          }}>Chat</span>
        </div>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.7)',
          margin: '0',
          letterSpacing: '0.3px',
          fontWeight: '300'
        }}>
          Paid, tokenised shareholder meetings. Trade access, value and community on Bitcoin
        </p>
      </div>

      <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-room-info">
          <h2>#{roomId}</h2>
          <span className="user-count">{users.filter(u => u.status === 'online').length} online</span>
        </div>
        <div 
          className="chat-actions"
          style={{
            marginRight: tickerSidebarCollapsed ? '60px' : '280px',
            transition: 'margin-right 0.3s ease'
          }}
        >
          <button className="chat-action-btn" title="Voice Call">
            <Phone size={18} />
          </button>
          <button className="chat-action-btn" title="Video Call">
            <Video size={18} />
          </button>
          <button className="chat-action-btn" title="User List">
            <Users size={18} />
          </button>
          <button className="chat-action-btn" title="Settings">
            <Settings size={18} />
          </button>
        </div>
      </div>

      <div className="chat-body">
        {/* Left Sidebar - User List with Groups */}
        <div className="users-sidebar-left">
          <div className="users-sidebar-header">
            <h3>Users & Groups</h3>
          </div>
          
          {/* Group Selector */}
          <div className="groups-section">
            <div className="groups-list">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setSelectedGroup(group.id)}
                  className={`group-item ${selectedGroup === group.id ? 'active' : ''}`}
                  style={{
                    borderLeft: selectedGroup === group.id ? `3px solid ${group.color}` : '3px solid transparent'
                  }}
                >
                  <div className="group-indicator" style={{ backgroundColor: group.color }}></div>
                  <span className="group-name">{group.name}</span>
                  <span className="group-count">{group.userCount}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Users List */}
          <div className="users-section">
            <div className="users-list">
              {users
                .filter(user => {
                  if (selectedGroup === 'all') return true;
                  if (selectedGroup === 'online') return user.status === 'online';
                  // For other groups, show all users for demo
                  return true;
                })
                .map((user) => (
                <div key={user.id} className={`user-item ${user.status}`}>
                  <div className="user-avatar" style={{ backgroundColor: getUserColor(user.name) }}>
                    {user.name[0].toUpperCase()}
                  </div>
                  <span className="user-name">${user.name}</span>
                  <div className={`status-indicator ${user.status}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div 
          className="messages-area"
          style={{
            marginRight: tickerSidebarCollapsed ? '60px' : '280px',
            transition: 'margin-right 0.3s ease'
          }}
        >
          <div className="messages-list">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`message ${message.type}`}
              >
                <div className="message-avatar" style={{ backgroundColor: getUserColor(message.user) }}>
                  {message.user[0].toUpperCase()}
                </div>
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-user" style={{ color: getUserColor(message.user) }}>
                      ${message.user}
                    </span>
                    <span className="message-time">{formatTime(message.timestamp)}</span>
                  </div>
                  <div className="message-text">
                    {message.type === 'payment' ? (
                      <div className="payment-message">
                        💰 Sent {message.amount} BSV
                      </div>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message Input */}
          <div className="message-input-area">
            <div className="message-input-container">
              <button className="attach-btn" title="Attach File">
                <Paperclip size={18} />
              </button>
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Message #${roomId}...`}
                className="message-input"
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                className="send-btn"
                disabled={!newMessage.trim()}
              >
                <Send size={18} />
              </button>
            </div>
            <div className="connection-status">
              <div className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></div>
              <span>{isConnected ? 'Connected to P2P network' : 'Connecting...'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Chat;