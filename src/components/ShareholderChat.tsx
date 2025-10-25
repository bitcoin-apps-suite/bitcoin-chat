'use client';

import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Vote, BookOpen } from 'lucide-react';

interface ShareholderInfo {
  totalShares: number;
  ownedShares: number;
  sharePrice: number;
  dividendsPaid: number;
  votingPower: number;
  marketCap: number;
}

interface VotingProposal {
  id: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  totalVotes: number;
  timeLeft: string;
  status: 'active' | 'passed' | 'rejected';
}

const mockShareholderInfo: ShareholderInfo = {
  totalShares: 1000,
  ownedShares: 125,
  sharePrice: 125.50,
  dividendsPaid: 3125.00,
  votingPower: 12.5,
  marketCap: 125500
};

const mockProposals: VotingProposal[] = [
  {
    id: '1',
    title: 'Increase Message Fee to $0.05',
    description: 'Proposal to increase per-message fee from $0.02 to $0.05 to boost revenue',
    votesFor: 750,
    votesAgainst: 125,
    totalVotes: 875,
    timeLeft: '2 days',
    status: 'active'
  },
  {
    id: '2',
    title: 'Add Premium Features',
    description: 'Introduce voice messages and file sharing for additional revenue streams',
    votesFor: 580,
    votesAgainst: 95,
    totalVotes: 675,
    timeLeft: '5 days',
    status: 'active'
  }
];

interface ShareholderChatProps {
  chatTitle: string;
  isImported?: boolean;
  originalAsset?: string;
}

const ShareholderChat: React.FC<ShareholderChatProps> = ({
  chatTitle,
  isImported = false,
  originalAsset
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'governance' | 'dividends'>('overview');

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
      border: '1px solid rgba(255, 101, 0, 0.2)',
      borderRadius: '12px',
      padding: '20px',
      margin: '20px 0',
      color: '#ffffff'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '16px',
        borderBottom: '1px solid rgba(255, 101, 0, 0.2)'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          background: isImported ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: '12px'
        }}>
          {isImported ? <BookOpen size={20} /> : <Users size={20} />}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{
            fontSize: '18px',
            fontWeight: '600',
            margin: '0 0 4px 0',
            color: '#ffffff'
          }}>
            {chatTitle}
          </h3>
          <p style={{
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.6)',
            margin: 0
          }}>
            {isImported 
              ? `📖 Imported from ${originalAsset} • Shareholder Meeting`
              : `💬 Native Chat • Shareholder Meeting`
            }
          </p>
        </div>
        <div style={{
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          padding: '4px 12px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#10b981'
        }}>
          Shareholder
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '1px solid rgba(255, 101, 0, 0.1)'
      }}>
        {(['overview', 'governance', 'dividends'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              flex: 1,
              padding: '12px 16px',
              background: activeTab === tab ? 'rgba(255, 101, 0, 0.1)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === tab ? '2px solid #ff6500' : '2px solid transparent',
              color: activeTab === tab ? '#ff6500' : 'rgba(255, 255, 255, 0.7)',
              fontSize: '14px',
              fontWeight: '600',
              textTransform: 'capitalize',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'rgba(255, 101, 0, 0.05)',
              border: '1px solid rgba(255, 101, 0, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#ff6500', marginBottom: '4px' }}>
                {mockShareholderInfo.ownedShares}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Shares Owned
              </div>
            </div>
            
            <div style={{
              background: 'rgba(16, 185, 129, 0.05)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#10b981', marginBottom: '4px' }}>
                ${mockShareholderInfo.sharePrice.toFixed(2)}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Share Price
              </div>
            </div>
            
            <div style={{
              background: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#3b82f6', marginBottom: '4px' }}>
                {mockShareholderInfo.votingPower}%
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Voting Power
              </div>
            </div>
            
            <div style={{
              background: 'rgba(245, 158, 11, 0.05)',
              border: '1px solid rgba(245, 158, 11, 0.2)',
              borderRadius: '8px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '24px', fontWeight: '700', color: '#f59e0b', marginBottom: '4px' }}>
                ${mockShareholderInfo.dividendsPaid.toFixed(0)}
              </div>
              <div style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.6)' }}>
                Total Dividends
              </div>
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 101, 0, 0.05)',
            border: '1px solid rgba(255, 101, 0, 0.2)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px', color: '#ff6500' }}>Your Investment Performance</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Portfolio Value: <strong>${(mockShareholderInfo.ownedShares * mockShareholderInfo.sharePrice).toLocaleString()}</strong>
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Monthly Dividends: <strong>${(mockShareholderInfo.dividendsPaid / 12).toFixed(2)}</strong>
                </div>
              </div>
              <TrendingUp size={32} style={{ color: '#10b981' }} />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'governance' && (
        <div>
          <h4 style={{ fontSize: '16px', marginBottom: '16px', color: '#ff6500' }}>Active Proposals</h4>
          {mockProposals.map((proposal) => (
            <div
              key={proposal.id}
              style={{
                background: 'rgba(255, 101, 0, 0.05)',
                border: '1px solid rgba(255, 101, 0, 0.2)',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px'
              }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '12px'
              }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                    {proposal.title}
                  </h5>
                  <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.7)', marginBottom: '8px' }}>
                    {proposal.description}
                  </p>
                </div>
                <div style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  padding: '4px 8px',
                  fontSize: '10px',
                  fontWeight: '600',
                  color: '#10b981'
                }}>
                  {proposal.timeLeft} left
                </div>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '12px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  marginBottom: '4px'
                }}>
                  <span>For: {proposal.votesFor}</span>
                  <span>Against: {proposal.votesAgainst}</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div
                    style={{
                      width: `${(proposal.votesFor / proposal.totalVotes) * 100}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)'
                    }}
                  />
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{
                  flex: 1,
                  padding: '8px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Vote For
                </button>
                <button style={{
                  flex: 1,
                  padding: '8px',
                  background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                  border: 'none',
                  borderRadius: '6px',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Vote Against
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dividends' && (
        <div>
          <div style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px', color: '#10b981' }}>Dividend History</h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
              gap: '12px'
            }}>
              {[
                { month: 'Jan 2025', amount: 260.42 },
                { month: 'Dec 2024', amount: 245.18 },
                { month: 'Nov 2024', amount: 298.75 },
                { month: 'Oct 2024', amount: 187.93 }
              ].map((dividend, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(16, 185, 129, 0.1)',
                    borderRadius: '6px',
                    padding: '12px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#10b981',
                    marginBottom: '4px'
                  }}>
                    ${dividend.amount.toFixed(2)}
                  </div>
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(255, 255, 255, 0.6)'
                  }}>
                    {dividend.month}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            background: 'rgba(255, 101, 0, 0.05)',
            border: '1px solid rgba(255, 101, 0, 0.2)',
            borderRadius: '8px',
            padding: '16px'
          }}>
            <h4 style={{ fontSize: '16px', marginBottom: '12px', color: '#ff6500' }}>Next Dividend Payment</h4>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Estimated Amount: <strong>$275.30</strong>
                </div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Payment Date: <strong>Feb 1, 2025</strong>
                </div>
              </div>
              <DollarSign size={32} style={{ color: '#f59e0b' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareholderChat;