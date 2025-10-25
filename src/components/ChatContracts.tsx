'use client';

import React, { useState, useEffect } from 'react';
import { chatContractService, ChatContract } from '../services/ChatContractService';

interface ChatContractsProps {
  tickerSidebarOpen?: boolean;
}

interface ClaimForm {
  handCashHandle: string;
  githubUsername: string;
  estimatedDays: number;
  proposedChanges?: string;
}

const ChatContracts: React.FC<ChatContractsProps> = ({
  tickerSidebarOpen = false
}) => {
  const [activeTab, setActiveTab] = useState<ChatContract['type'] | 'all' | 'metrics'>('all');
  const [selectedContract, setSelectedContract] = useState<ChatContract | null>(null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [contracts, setContracts] = useState<ChatContract[]>([]);
  const [metrics, setMetrics] = useState<any>({});
  const [claimForm, setClaimForm] = useState<ClaimForm>({
    handCashHandle: '',
    githubUsername: '',
    estimatedDays: 7
  });

  useEffect(() => {
    loadContracts();
    loadMetrics();
  }, []);

  const loadContracts = () => {
    const allContracts = chatContractService.getAllContracts();
    setContracts(allContracts);
  };

  const loadMetrics = () => {
    const contractMetrics = chatContractService.getMetrics();
    setMetrics(contractMetrics);
  };

  const filteredContracts = activeTab === 'all' 
    ? contracts 
    : contracts.filter(c => c.type === activeTab);

  const getStatusColor = (status: ChatContract['status']) => {
    switch (status) {
      case 'available': return '#22c55e';
      case 'claimed': return '#f59e0b';
      case 'in_progress': return '#3b82f6';
      case 'submitted': return '#8b5cf6';
      case 'completed': return '#6b7280';
      case 'expired': return '#ef4444';
      case 'disputed': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getPriorityColor = (priority: ChatContract['priority']) => {
    switch (priority) {
      case 'Critical': return '#dc2626';
      case 'High': return '#ea580c';
      case 'Medium': return '#d97706';
      case 'Low': return '#65a30d';
      default: return '#6b7280';
    }
  };

  const formatTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return 'Expired';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    return '<1h';
  };

  const handleClaimContract = async () => {
    if (!selectedContract || !claimForm.handCashHandle) {
      alert('Please fill in HandCash handle');
      return;
    }

    try {
      await chatContractService.claimContract(
        selectedContract.contractId,
        claimForm.handCashHandle,
        claimForm.githubUsername || 'anonymous',
        claimForm.estimatedDays
      );
      
      alert(`Contract claimed! ${claimForm.estimatedDays} days to complete.`);
      loadContracts();
      setShowClaimModal(false);
      setSelectedContract(null);
      setClaimForm({ handCashHandle: '', githubUsername: '', estimatedDays: 7 });
    } catch (error) {
      alert(`Failed: ${error}`);
    }
  };

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
          Contract Marketplace
        </h3>
        <p style={{
          fontSize: '10px',
          color: 'rgba(255, 255, 255, 0.6)',
          margin: '4px 0 0',
          lineHeight: '1.3'
        }}>
          Offer & accept contracts for chat services
        </p>
      </div>

      {/* Quick Metrics */}
      {activeTab === 'metrics' ? (
        <div style={{ padding: '16px 12px', flex: 1, overflow: 'auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '16px'
          }}>
            <div style={{
              background: 'rgba(100, 200, 255, 0.1)',
              border: '1px solid rgba(100, 200, 255, 0.3)',
              borderRadius: '6px',
              padding: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#64c8ff' }}>
                {metrics.totalContracts || 0}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Total
              </div>
            </div>
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '6px',
              padding: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#22c55e' }}>
                {metrics.activeContracts || 0}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Active
              </div>
            </div>
            <div style={{
              background: 'rgba(107, 114, 128, 0.1)',
              border: '1px solid rgba(107, 114, 128, 0.3)',
              borderRadius: '6px',
              padding: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#6b7280' }}>
                {metrics.completedContracts || 0}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.7)' }}>
                Done
              </div>
            </div>
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '6px',
              padding: '8px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#f59e0b' }}>
                {(metrics.totalValueLocked || 0).toFixed(2)}
              </div>
              <div style={{ fontSize: '9px', color: 'rgba(255, 255, 255, 0.7)' }}>
                BSV Locked
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <h4 style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '11px',
              fontWeight: '600',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Contract Types
            </h4>
            
            {[
              { type: 'chat_creation', label: 'Chat Creation', count: contracts.filter(c => c.type === 'chat_creation').length },
              { type: 'moderation', label: 'Moderation', count: contracts.filter(c => c.type === 'moderation').length },
              { type: 'community_building', label: 'Community Building', count: contracts.filter(c => c.type === 'community_building').length },
              { type: 'content_creation', label: 'Content Creation', count: contracts.filter(c => c.type === 'content_creation').length },
              { type: 'technical', label: 'Technical', count: contracts.filter(c => c.type === 'technical').length }
            ].map(item => (
              <div key={item.type} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '4px 0',
                fontSize: '10px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <span>{item.label}</span>
                <span style={{ color: '#64c8ff', fontWeight: 'bold' }}>{item.count}</span>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontSize: '11px',
              fontWeight: '600',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Recent Activity
            </h4>
            
            {contracts.slice(0, 3).map(contract => (
              <div key={contract.contractId} style={{
                background: 'rgba(100, 200, 255, 0.05)',
                border: '1px solid rgba(100, 200, 255, 0.2)',
                borderRadius: '4px',
                padding: '6px',
                marginBottom: '6px',
                fontSize: '9px'
              }}>
                <div style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '2px' }}>
                  {contract.title.length > 25 ? contract.title.substring(0, 25) + '...' : contract.title}
                </div>
                <div style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {contract.reward.displayText} • {contract.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            borderBottom: '1px solid rgba(100, 200, 255, 0.2)',
            padding: '8px 12px 0'
          }}>
            {[
              { key: 'all', label: 'All', count: contracts.length },
              { key: 'chat_creation', label: 'Create', count: contracts.filter(c => c.type === 'chat_creation').length },
              { key: 'moderation', label: 'Moderate', count: contracts.filter(c => c.type === 'moderation').length },
              { key: 'community_building', label: 'Build', count: contracts.filter(c => c.type === 'community_building').length },
              { key: 'metrics', label: '📊', count: 0 }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                style={{
                  background: activeTab === tab.key ? 'rgba(100, 200, 255, 0.2)' : 'transparent',
                  border: 'none',
                  color: activeTab === tab.key ? '#64c8ff' : 'rgba(255, 255, 255, 0.7)',
                  padding: '6px 8px',
                  fontSize: '9px',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  cursor: 'pointer',
                  borderRadius: '4px 4px 0 0',
                  marginRight: '2px',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span style={{
                    background: activeTab === tab.key ? '#64c8ff' : 'rgba(255, 255, 255, 0.3)',
                    color: activeTab === tab.key ? '#ffffff' : 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '8px',
                    padding: '1px 4px',
                    fontSize: '8px',
                    fontWeight: 'bold',
                    minWidth: '14px',
                    textAlign: 'center'
                  }}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Contracts List */}
          <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
            {filteredContracts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                color: 'rgba(255, 255, 255, 0.6)',
                fontSize: '11px',
                marginTop: '40px'
              }}>
                No contracts found
              </div>
            ) : (
              filteredContracts.map(contract => (
                <div
                  key={contract.contractId}
                  style={{
                    background: 'rgba(100, 200, 255, 0.05)',
                    border: '1px solid rgba(100, 200, 255, 0.2)',
                    borderRadius: '8px',
                    padding: '10px',
                    marginBottom: '10px',
                    cursor: contract.status === 'available' ? 'pointer' : 'default',
                    opacity: contract.status === 'available' ? 1 : 0.7,
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                  onClick={() => contract.status === 'available' && setSelectedContract(contract)}
                  onMouseEnter={(e) => {
                    if (contract.status === 'available') {
                      e.currentTarget.style.background = 'rgba(100, 200, 255, 0.1)';
                      e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(100, 200, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(100, 200, 255, 0.2)';
                  }}
                >
                  {/* Priority badge */}
                  <div style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    background: getPriorityColor(contract.priority),
                    color: 'white',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    fontSize: '7px',
                    fontWeight: 'bold'
                  }}>
                    {contract.priority.charAt(0)}
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '6px'
                  }}>
                    <div style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: getStatusColor(contract.status),
                      marginRight: '6px'
                    }} />
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '600',
                      color: '#ffffff',
                      flex: 1,
                      marginRight: '16px'
                    }}>
                      {contract.title.length > 30 ? contract.title.substring(0, 30) + '...' : contract.title}
                    </div>
                  </div>
                  
                  <div style={{
                    fontSize: '9px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: '6px',
                    lineHeight: '1.3'
                  }}>
                    {contract.description.length > 60 ? contract.description.substring(0, 60) + '...' : contract.description}
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '6px'
                  }}>
                    <span style={{ 
                      color: '#64c8ff', 
                      fontWeight: 'bold',
                      fontSize: '10px'
                    }}>
                      {contract.reward.displayText}
                    </span>
                    <span style={{ 
                      color: 'rgba(255, 255, 255, 0.6)', 
                      fontSize: '8px'
                    }}>
                      {contract.estimatedHours}h • {contract.duration}d
                    </span>
                  </div>

                  {/* Progress info for claimed contracts */}
                  {contract.acceptedBy && (
                    <div style={{
                      background: 'rgba(100, 200, 255, 0.1)',
                      border: '1px solid rgba(100, 200, 255, 0.3)',
                      borderRadius: '4px',
                      padding: '4px 6px',
                      marginBottom: '6px',
                      fontSize: '8px'
                    }}>
                      <div style={{ color: '#64c8ff', fontWeight: 'bold', marginBottom: '1px' }}>
                        {contract.acceptedBy.handCashHandle}
                      </div>
                      <div style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                        {formatTimeRemaining(contract.acceptedBy.deadline)} left
                      </div>
                    </div>
                  )}
                  
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '3px'
                  }}>
                    {contract.skills.slice(0, 2).map(skill => (
                      <span 
                        key={skill} 
                        style={{
                          background: 'rgba(100, 200, 255, 0.2)',
                          color: '#64c8ff',
                          padding: '1px 4px',
                          borderRadius: '3px',
                          fontSize: '7px'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                    {contract.skills.length > 2 && (
                      <span style={{
                        color: 'rgba(255, 255, 255, 0.5)',
                        fontSize: '7px'
                      }}>
                        +{contract.skills.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Contract Detail Modal */}
      {selectedContract && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(10, 20, 50, 0.95) 0%, rgba(20, 30, 60, 0.95) 100%)',
            border: '1px solid rgba(100, 200, 255, 0.3)',
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '500px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ color: '#64c8ff', margin: 0, marginBottom: '6px', fontSize: '16px' }}>
                  {selectedContract.title}
                </h3>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{
                    background: getStatusColor(selectedContract.status),
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: '4px',
                    fontSize: '10px',
                    textTransform: 'uppercase'
                  }}>
                    {selectedContract.status.replace('_', ' ')}
                  </span>
                  <span style={{
                    background: getPriorityColor(selectedContract.priority),
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: '4px',
                    fontSize: '10px'
                  }}>
                    {selectedContract.priority}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setSelectedContract(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.4', fontSize: '13px' }}>
                {selectedContract.description}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px', fontSize: '12px' }}>
              <div>
                <strong style={{ color: '#64c8ff' }}>Reward:</strong>
                <div style={{ color: 'white', fontWeight: 'bold' }}>
                  {selectedContract.reward.displayText}
                </div>
              </div>
              <div>
                <strong style={{ color: '#64c8ff' }}>Duration:</strong>
                <div style={{ color: 'white' }}>{selectedContract.duration} days</div>
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#64c8ff', marginBottom: '6px', fontSize: '12px' }}>Requirements</h4>
              <ul style={{ color: 'rgba(255, 255, 255, 0.8)', paddingLeft: '16px', fontSize: '11px', margin: 0 }}>
                {selectedContract.requirements.slice(0, 3).map((req, i) => (
                  <li key={i} style={{ marginBottom: '2px' }}>{req}</li>
                ))}
                {selectedContract.requirements.length > 3 && (
                  <li style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    +{selectedContract.requirements.length - 3} more requirements
                  </li>
                )}
              </ul>
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <h4 style={{ color: '#64c8ff', marginBottom: '6px', fontSize: '12px' }}>Skills</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {selectedContract.skills.map(skill => (
                  <span 
                    key={skill} 
                    style={{
                      background: 'rgba(100, 200, 255, 0.2)',
                      color: '#64c8ff',
                      padding: '3px 6px',
                      borderRadius: '4px',
                      fontSize: '10px'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {selectedContract.status === 'available' && (
              <button
                style={{
                  background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
                onClick={() => setShowClaimModal(true)}
              >
                Claim Contract
              </button>
            )}
          </div>
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && selectedContract && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1002
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(10, 20, 50, 0.95) 0%, rgba(20, 30, 60, 0.95) 100%)',
            border: '1px solid rgba(100, 200, 255, 0.3)',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '400px',
            width: '90%'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: '#64c8ff', margin: 0, fontSize: '14px' }}>Claim Contract</h3>
              <button 
                onClick={() => setShowClaimModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  fontSize: '16px',
                  cursor: 'pointer'
                }}
              >
                ×
              </button>
            </div>
            
            <form onSubmit={(e) => { e.preventDefault(); handleClaimContract(); }}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#64c8ff', marginBottom: '4px', fontSize: '11px' }}>
                  HandCash Handle *
                </label>
                <input
                  type="text"
                  value={claimForm.handCashHandle}
                  onChange={(e) => setClaimForm({...claimForm, handCashHandle: e.target.value})}
                  placeholder="$yourhandle"
                  required
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(100, 200, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '12px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', color: '#64c8ff', marginBottom: '4px', fontSize: '11px' }}>
                  GitHub Username
                </label>
                <input
                  type="text"
                  value={claimForm.githubUsername}
                  onChange={(e) => setClaimForm({...claimForm, githubUsername: e.target.value})}
                  placeholder="github-username"
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(100, 200, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '12px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', color: '#64c8ff', marginBottom: '4px', fontSize: '11px' }}>
                  Days to Complete *
                </label>
                <select
                  value={claimForm.estimatedDays}
                  onChange={(e) => setClaimForm({...claimForm, estimatedDays: parseInt(e.target.value)})}
                  style={{
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(100, 200, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: 'white',
                    fontSize: '12px'
                  }}
                >
                  <option value={3}>3 days</option>
                  <option value={7}>7 days</option>
                  <option value={14}>14 days</option>
                  <option value={30}>30 days</option>
                </select>
              </div>
              
              <button 
                type="submit" 
                style={{
                  background: 'linear-gradient(135deg, #64c8ff 0%, #3b82f6 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '10px 16px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  width: '100%'
                }}
              >
                Claim Contract
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatContracts;