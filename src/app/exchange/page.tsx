'use client';

import React, { useState } from 'react';
import MinimalDock from '@/components/MinimalDock';

interface ChatToken {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  marketCap: number;
  holders: number;
  category: string;
  entryFee: number;
  messageCount: number;
  monthlyRevenue: number;
}

const mockTokens: ChatToken[] = [
  {
    id: '1',
    name: 'Bitcoin Traders Chat',
    symbol: 'BTCT',
    price: 2.45,
    change24h: 12.3,
    volume: 15420,
    marketCap: 245000,
    holders: 156,
    category: 'Trading',
    entryFee: 50,
    messageCount: 2341,
    monthlyRevenue: 1250
  },
  {
    id: '2',
    name: 'BSV Developers',
    symbol: 'BSVD',
    price: 1.89,
    change24h: -5.2,
    volume: 8930,
    marketCap: 189000,
    holders: 89,
    category: 'Development',
    entryFee: 25,
    messageCount: 1876,
    monthlyRevenue: 890
  },
  {
    id: '3',
    name: 'Metanet Café',
    symbol: 'META',
    price: 0.75,
    change24h: 8.7,
    volume: 5620,
    marketCap: 75000,
    holders: 234,
    category: 'General',
    entryFee: 10,
    messageCount: 4567,
    monthlyRevenue: 420
  },
  {
    id: '4',
    name: 'Ordinals Collectors',
    symbol: 'ORDC',
    price: 4.20,
    change24h: 23.1,
    volume: 32100,
    marketCap: 420000,
    holders: 67,
    category: 'NFTs',
    entryFee: 100,
    messageCount: 1543,
    monthlyRevenue: 2100
  }
];

export default function ExchangePage() {
  const [selectedTab, setSelectedTab] = useState<'all' | 'trending' | 'new'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Trading', 'Development', 'General', 'NFTs'];

  const filteredTokens = mockTokens.filter(token => 
    selectedCategory === 'All' || token.category === selectedCategory
  );

  return (
    <>
      <MinimalDock currentApp="bitcoin-exchange" />
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: '#ffffff'
      }}>
        <main style={{ 
          flex: 1, 
          paddingTop: '40px',
          marginLeft: '260px', /* Space for DevSidebar */
          marginRight: '60px', /* Space for collapsed TickerSidebar */
          transition: 'margin 0.3s ease'
        }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
          
          {/* Header */}
          <section style={{ marginBottom: '40px' }}>
            <h1 style={{
              fontSize: '42px',
              fontWeight: '700',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Chat Token Exchange
            </h1>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Trade chat room tokens, invest in conversations, and earn dividends from community engagement.
            </p>
            
            {/* Stats Bar */}
            <div style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '12px',
              padding: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px'
            }}>
              {[
                { label: 'Total Volume', value: '$62.1K', change: '+15.2%' },
                { label: 'Active Rooms', value: '47', change: '+3' },
                { label: 'Total Holders', value: '546', change: '+12%' },
                { label: 'Avg. Daily Revenue', value: '$4.66K', change: '+8.4%' }
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: '#ffffff', marginBottom: '4px' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)', marginBottom: '4px' }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: '11px', 
                    color: stat.change.startsWith('+') ? '#10b981' : '#ef4444',
                    fontWeight: '500'
                  }}>
                    {stat.change}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Filters */}
          <section style={{ marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              {/* Tab Filters */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {(['all', 'trending', 'new'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    style={{
                      padding: '10px 20px',
                      background: selectedTab === tab ? '#64c8ff' : 'transparent',
                      border: '1px solid rgba(100, 200, 255, 0.3)',
                      borderRadius: '6px',
                      color: selectedTab === tab ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Category Filter */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{
                    background: '#1a1a1a',
                    border: '1px solid rgba(100, 200, 255, 0.3)',
                    borderRadius: '6px',
                    padding: '8px 12px',
                    color: '#ffffff',
                    fontSize: '14px'
                  }}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Token List */}
          <section>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {/* Table Header */}
              <div style={{
                background: 'rgba(100, 200, 255, 0.1)',
                padding: '16px 20px',
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 120px',
                gap: '16px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.8)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                <div>Chat Room</div>
                <div>Price</div>
                <div>24h Change</div>
                <div>Volume</div>
                <div>Market Cap</div>
                <div>Revenue/Mo</div>
                <div style={{ textAlign: 'center' }}>Action</div>
              </div>

              {/* Token Rows */}
              {filteredTokens.map((token, index) => (
                <div
                  key={token.id}
                  style={{
                    padding: '20px',
                    borderBottom: index < filteredTokens.length - 1 ? '1px solid rgba(100, 200, 255, 0.1)' : 'none',
                    display: 'grid',
                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr 1fr 120px',
                    gap: '16px',
                    alignItems: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(100, 200, 255, 0.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  {/* Chat Room Info */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '16px',
                      fontWeight: '700'
                    }}>
                      {token.symbol.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>
                        {token.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                        ${token.symbol} • {token.holders} holders • Entry: ${token.entryFee}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>
                    ${token.price.toFixed(2)}
                  </div>

                  {/* 24h Change */}
                  <div style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: token.change24h >= 0 ? '#10b981' : '#ef4444'
                  }}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                  </div>

                  {/* Volume */}
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    ${token.volume.toLocaleString()}
                  </div>

                  {/* Market Cap */}
                  <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    ${token.marketCap.toLocaleString()}
                  </div>

                  {/* Monthly Revenue */}
                  <div style={{ fontSize: '14px', color: '#10b981', fontWeight: '600' }}>
                    ${token.monthlyRevenue.toLocaleString()}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{
                      background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      color: '#ffffff',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      Buy
                    </button>
                    <button style={{
                      background: 'transparent',
                      border: '1px solid rgba(100, 200, 255, 0.3)',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}>
                      Sell
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works Section */}
          <section style={{ marginTop: '80px', marginBottom: '40px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              How Chat Token Trading Works
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
              {[
                {
                  step: '1',
                  title: 'Browse Chat Rooms',
                  desc: 'Discover active chat rooms with established communities and revenue streams'
                },
                {
                  step: '2',
                  title: 'Analyze Performance',
                  desc: 'Review message volume, entry fees, monthly revenue, and token holder metrics'
                },
                {
                  step: '3',
                  title: 'Buy Tokens',
                  desc: 'Purchase chat room tokens to become a shareholder in the conversation'
                },
                {
                  step: '4',
                  title: 'Earn Dividends',
                  desc: 'Receive automatic payouts from entry fees and per-message charges'
                }
              ].map((item, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
                  border: '1px solid rgba(100, 200, 255, 0.3)',
                  borderRadius: '12px',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    fontSize: '20px',
                    fontWeight: '700'
                  }}>
                    {item.step}
                  </div>
                  <h3 style={{ color: '#64c8ff', fontSize: '18px', marginBottom: '12px' }}>{item.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        </main>
      </div>
    </>
  );
}