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
  const [isConnected, setIsConnected] = useState(false);
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
      { id: '5', name: 'diana', status: 'offline' }
    ];

    setMessages(demoMessages);
    setUsers(demoUsers);
    setIsConnected(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
    const colors = ['#ff6500', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];
    const hash = username.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="chat-container">
      {/* Chat Header */}
      <div className="chat-header">
        <div className="chat-room-info">
          <h2>#{roomId}</h2>
          <span className="user-count">{users.filter(u => u.status === 'online').length} online</span>
        </div>
        <div className="chat-actions">
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
        {/* Messages Area */}
        <div className="messages-area">
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
                      {message.user}
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
        </div>

        {/* Sidebar - User List */}
        <div className="users-sidebar">
          <h3>Online Users</h3>
          <div className="users-list">
            {users.map((user) => (
              <div key={user.id} className={`user-item ${user.status}`}>
                <div className="user-avatar" style={{ backgroundColor: getUserColor(user.name) }}>
                  {user.name[0].toUpperCase()}
                </div>
                <span className="user-name">{user.name}</span>
                <div className={`status-indicator ${user.status}`}></div>
              </div>
            ))}
          </div>
        </div>
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
  );
};

export default Chat;