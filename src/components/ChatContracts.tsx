'use client';

import React, { useState } from 'react';

// Import interface for bitcoin-writer shares
interface BitcoinWriterShare {
  title: string;
  author: string;
  sharesAvailable: number;
  totalShares: number;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  dividendPerShare: number;
  category: string;
  contentType: 'book' | 'article' | 'blog';
}

// Chat room share interface
interface ChatShare {
  id: string;
  topic: string;
  creator: string;
  sharesAvailable: number;
  totalShares: number;
  currentPrice: number;
  priceChange24h: number;
  marketCap: number;
  members: number;
  messageCount: number;
  dailyRevenue: number;
  category: 'imported' | 'native' | 'trending';
  source?: 'bitcoin-writer' | 'bitcoin-chat';
  originalAsset?: string;
}

const mockBitcoinWriterShares: BitcoinWriterShare[] = [
  {
    title: "The Bitcoin Prophecy",
    author: "Sarah Chen",
    sharesAvailable: 45,
    totalShares: 1000,
    currentPrice: 125.50,
    priceChange24h: 15.2,
    marketCap: 125500,
    dividendPerShare: 31.25,
    category: "Fiction",
    contentType: "book"
  },
  {
    title: "Neon Nights in Neo Tokyo", 
    author: "Marcus Blake",
    sharesAvailable: 150,
    totalShares: 750,
    currentPrice: 95.50,
    priceChange24h: -15.0,
    marketCap: 71625,
    dividendPerShare: 23.33,
    category: "Fiction",
    contentType: "book"
  },
  {
    title: "Building on Bitcoin SV",
    author: "David Miller",
    sharesAvailable: 200,
    totalShares: 500,
    currentPrice: 45.00,
    priceChange24h: 8.7,
    marketCap: 22500,
    dividendPerShare: 12.50,
    category: "Technical",
    contentType: "article"
  }
];

const mockChatShares: ChatShare[] = [
  {
    id: "1",
    topic: "UK Digital ID Debate",
    creator: "PolicyWatcher",
    sharesAvailable: 500,
    totalShares: 1000,
    currentPrice: 89.50,
    priceChange24h: 34.2,
    marketCap: 89500,
    members: 234,
    messageCount: 4567,
    dailyRevenue: 2340,
    category: "trending",
    source: "bitcoin-chat"
  },
  {
    id: "2", 
    topic: "The Bitcoin Prophecy Book Club",
    creator: "BookShareBot",
    sharesAvailable: 45,
    totalShares: 1000,
    currentPrice: 125.50,
    priceChange24h: 15.2,
    marketCap: 125500,
    members: 156,
    messageCount: 892,
    dailyRevenue: 1255,
    category: "imported",
    source: "bitcoin-writer",
    originalAsset: "The Bitcoin Prophecy"
  },
  {
    id: "3",
    topic: "BSV Developers Lounge",
    creator: "CryptoBuilder",
    sharesAvailable: 100,
    totalShares: 300,
    currentPrice: 67.00,
    priceChange24h: 12.8,
    marketCap: 20100,
    members: 89,
    messageCount: 2341,
    dailyRevenue: 890,
    category: "native",
    source: "bitcoin-chat"
  }
];

const mockTrendingTopics = [
  { topic: "Brexit Impact on Tech", potential: "High", interest: "£50M+" },
  { topic: "Climate Change Policy", potential: "Very High", interest: "£200M+" },
  { topic: "AI Regulation Framework", potential: "Extreme", interest: "£1B+" },
  { topic: "Crypto Taxation Updates", potential: "High", interest: "£75M+" },
  { topic: "Remote Work Future", potential: "Medium", interest: "£25M+" }
];

interface ChatContractsProps {
  onJoinChat?: (chatId: string) => void;
  onImportShare?: (share: BitcoinWriterShare) => void;
  onCreateChat?: (topic: string) => void;
  tickerSidebarOpen?: boolean;
}

const ChatContracts: React.FC<ChatContractsProps> = ({
  onJoinChat,
  onImportShare,
  onCreateChat,
  tickerSidebarOpen = false
}) => {
  const [activeTab, setActiveTab] = useState<'chats' | 'import' | 'trending'>('chats');

  return (
    <div style={{
      width: '320px',
      background: 'linear-gradient(135deg, rgba(10, 20, 50, 0.9) 0%, rgba(20, 30, 60, 0.8) 100%)',
      borderLeft: '1px solid rgba(100, 200, 255, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 90,
      backdropFilter: 'blur(10px)',
      transform: tickerSidebarOpen ? 'translateX(-280px)' : 'translateX(0)',
      transition: 'transform 0.3s ease'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px 12px',
        borderBottom: '1px solid rgba(100, 200, 255, 0.3)',
        background: 'linear-gradient(135deg, rgba(20, 30, 60, 0.8) 0%, rgba(30, 40, 70, 0.6) 100%)'
      }}>
        <h3 style={{
          color: '#64c8ff',
          fontSize: '14px',
          fontWeight: '600',
          margin: '0',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          Chat Investments
        </h3>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(100, 200, 255, 0.2)'
      }}>
        {(['chats', 'import', 'trending'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px 8px',
              background: activeTab === tab ? 'rgba(100, 200, 255, 0.15)' : 'transparent',
              border: 'none',
              color: activeTab === tab ? '#64c8ff' : 'rgba(255, 255, 255, 0.7),'
              fontSize: '11px',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab === 'chats' ? 'My Chats' : tab === 'import' ? 'Import' : 'Trending'}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {activeTab === 'chats' && (
          <div style={{ padding: '16px 12px' }}>
            <h4 style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '12px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Shareholder Meetings
            </h4>
            
            {mockChatShares.map((chat) => (
              <div
                key={chat.id}
                style={{
                  background: 'rgba(100, 200, 255, 0.05)',
                  border: '1px solid rgba(100, 200, 255, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onJoinChat?.(chat.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(100, 200, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)';
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: chat.category === 'imported' ? '#3b82f6' : 
                               chat.category === 'trending' ? '#10b981' : '#64c8ff',
                    marginRight: '8px'
                  }} />
                  <div style={{
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#ffffff',
                    flex: 1
                  }}>
                    {chat.topic}
                  </div>
                </div>
                
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '6px'
                }}>
                  {chat.category === 'imported' && `📖 From ${chat.originalAsset}`}
                  {chat.category === 'trending' && `🔥 Trending Topic`}
                  {chat.category === 'native' && `💬 Native Chat`}
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <div>Price: ${chat.currentPrice.toFixed(2)}</div>
                  <div style={{
                    color: chat.priceChange24h >= 0 ? '#10b981' : '#ef4444'
                  }}>
                    {chat.priceChange24h >= 0 ? '+' : ''}{chat.priceChange24h.toFixed(1)}%
                  </div>
                  <div>{chat.members} members</div>
                  <div>${chat.dailyRevenue} revenue</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'import' && (
          <div style={{ padding: '16px 12px' }}>
            <h4 style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Bitcoin Writer Shares
            </h4>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              Import your book/article shares to create shareholder meeting chats
            </p>
            
            {mockBitcoinWriterShares.map((share, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(59, 130, 246, 0.05)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onImportShare?.(share)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }}
              >
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  {share.title}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '8px'
                }}>
                  by {share.author} • {share.contentType}
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}>
                  <div>Own: {share.totalShares - share.sharesAvailable}/{share.totalShares}</div>
                  <div>Price: ${share.currentPrice.toFixed(2)}</div>
                  <div style={{
                    color: share.priceChange24h >= 0 ? '#10b981' : '#ef4444'
                  }}>
                    {share.priceChange24h >= 0 ? '+' : ''}{share.priceChange24h.toFixed(1)}%
                  </div>
                  <div>Dividend: ${share.dividendPerShare.toFixed(2)}</div>
                </div>
                
                <button style={{
                  width: '100%',
                  marginTop: '8px',
                  padding: '6px',
                  background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Create Chat Room
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'trending' && (
          <div style={{ padding: '16px 12px' }}>
            <h4 style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '12px',
              fontWeight: '600',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Trending Investment Topics
            </h4>
            <p style={{
              fontSize: '10px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '16px',
              lineHeight: '1.4'
            }}>
              Create tokenized chats around trending topics and become the majority shareholder
            </p>
            
            {mockTrendingTopics.map((topic, index) => (
              <div
                key={index}
                style={{
                  background: 'rgba(16, 185, 129, 0.05)',
                  border: '1px solid rgba(16, 185, 129, 0.2)',
                  borderRadius: '8px',
                  padding: '12px',
                  marginBottom: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => onCreateChat?.(topic.topic)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(16, 185, 129, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.2)';
                }}
              >
                <div style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#ffffff',
                  marginBottom: '4px'
                }}>
                  {topic.topic}
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                  fontSize: '10px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  marginBottom: '8px'
                }}>
                  <div>Potential: {topic.potential}</div>
                  <div>Interest: {topic.interest}</div>
                </div>
                
                <button style={{
                  width: '100%',
                  padding: '6px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '4px',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Start Investment Chat
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContracts;