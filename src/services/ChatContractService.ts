/**
 * Chat Contract Service
 * Manages chat creation, moderation, and community building contracts
 */

export interface ChatContract {
  contractId: string;
  type: 'chat_creation' | 'moderation' | 'community_building' | 'content_creation' | 'technical';
  title: string;
  description: string;
  requirements: string[];
  deliverables: string[];
  reward: {
    amount: number;
    currency: 'BSV' | 'BCHAT';
    displayText: string;
  };
  estimatedHours: number;
  duration: number; // days
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'available' | 'claimed' | 'in_progress' | 'submitted' | 'completed' | 'expired' | 'disputed';
  skills: string[];
  category: string;
  createdBy: {
    handCashHandle: string;
    chatRoomsOwned?: string[];
  };
  acceptedBy?: {
    handCashHandle: string;
    githubUsername?: string;
    claimedAt: Date;
    deadline: Date;
    estimatedCompletionDays: number;
  };
  submittedWork?: {
    submittedAt: Date;
    deliveryUrl?: string;
    description: string;
    evidence: string[];
  };
  contractTerms: {
    escrowRequired: boolean;
    disputeResolution: 'arbitration' | 'community_vote' | 'platform_decision';
    qualityStandards: string[];
    successMetrics: string[];
  };
  createdAt: Date;
  lastUpdated: Date;
}

export interface ContractMetrics {
  totalContracts: number;
  activeContracts: number;
  completedContracts: number;
  totalValueLocked: number;
  averageCompletionTime: number;
}

export class ChatContractService {
  private contracts: Map<string, ChatContract> = new Map();
  private readonly TOTAL_BCHAT_TOKENS = 1000000000; // 1 billion tokens

  constructor() {
    this.initializeSampleContracts();
  }

  /**
   * Create a new chat contract
   */
  async createContract(
    type: ChatContract['type'],
    title: string,
    description: string,
    requirements: string[],
    deliverables: string[],
    reward: ChatContract['reward'],
    estimatedHours: number,
    duration: number,
    priority: ChatContract['priority'],
    skills: string[],
    category: string,
    creatorHandle: string,
    contractTerms: ChatContract['contractTerms']
  ): Promise<ChatContract> {
    const contractId = `contract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const contract: ChatContract = {
      contractId,
      type,
      title,
      description,
      requirements,
      deliverables,
      reward,
      estimatedHours,
      duration,
      priority,
      status: 'available',
      skills,
      category,
      createdBy: {
        handCashHandle: creatorHandle
      },
      contractTerms,
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    this.contracts.set(contractId, contract);
    return contract;
  }

  /**
   * Accept/claim a contract
   */
  async claimContract(
    contractId: string,
    handCashHandle: string,
    githubUsername: string,
    estimatedCompletionDays: number
  ): Promise<ChatContract> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error('Contract not found');
    }

    if (contract.status !== 'available') {
      throw new Error('Contract not available for claiming');
    }

    const deadline = new Date();
    deadline.setDate(deadline.getDate() + estimatedCompletionDays);

    contract.acceptedBy = {
      handCashHandle,
      githubUsername,
      claimedAt: new Date(),
      deadline,
      estimatedCompletionDays
    };
    contract.status = 'claimed';
    contract.lastUpdated = new Date();

    this.contracts.set(contractId, contract);
    return contract;
  }

  /**
   * Submit completed work for a contract
   */
  async submitWork(
    contractId: string,
    deliveryUrl: string,
    description: string,
    evidence: string[]
  ): Promise<ChatContract> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error('Contract not found');
    }

    if (contract.status !== 'claimed' && contract.status !== 'in_progress') {
      throw new Error('Contract not in claimable state');
    }

    contract.submittedWork = {
      submittedAt: new Date(),
      deliveryUrl,
      description,
      evidence
    };
    contract.status = 'submitted';
    contract.lastUpdated = new Date();

    this.contracts.set(contractId, contract);
    return contract;
  }

  /**
   * Approve and complete a contract
   */
  async completeContract(contractId: string): Promise<ChatContract> {
    const contract = this.contracts.get(contractId);
    if (!contract) {
      throw new Error('Contract not found');
    }

    if (contract.status !== 'submitted') {
      throw new Error('Contract not in submitted state');
    }

    contract.status = 'completed';
    contract.lastUpdated = new Date();

    // Trigger payment distribution
    await this.distributePayment(contract);

    this.contracts.set(contractId, contract);
    return contract;
  }

  /**
   * Get all contracts
   */
  getAllContracts(): ChatContract[] {
    return Array.from(this.contracts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  /**
   * Get contracts by type
   */
  getContractsByType(type: ChatContract['type']): ChatContract[] {
    return this.getAllContracts().filter(contract => contract.type === type);
  }

  /**
   * Get contracts by status
   */
  getContractsByStatus(status: ChatContract['status']): ChatContract[] {
    return this.getAllContracts().filter(contract => contract.status === status);
  }

  /**
   * Get contract metrics
   */
  getMetrics(): ContractMetrics {
    const contracts = this.getAllContracts();
    const completed = contracts.filter(c => c.status === 'completed');
    
    return {
      totalContracts: contracts.length,
      activeContracts: contracts.filter(c => 
        ['claimed', 'in_progress', 'submitted'].includes(c.status)
      ).length,
      completedContracts: completed.length,
      totalValueLocked: contracts
        .filter(c => c.status !== 'completed' && c.status !== 'expired')
        .reduce((sum, c) => sum + c.reward.amount, 0),
      averageCompletionTime: completed.length > 0 
        ? completed.reduce((sum, c) => {
            if (c.acceptedBy && c.submittedWork) {
              const days = Math.ceil(
                (c.submittedWork.submittedAt.getTime() - c.acceptedBy.claimedAt.getTime()) 
                / (1000 * 60 * 60 * 24)
              );
              return sum + days;
            }
            return sum;
          }, 0) / completed.length
        : 0
    };
  }

  /**
   * Distribute payment for completed contract
   */
  private async distributePayment(contract: ChatContract): Promise<void> {
    console.log(`Distributing ${contract.reward.displayText} to ${contract.acceptedBy?.handCashHandle}`);
    
    // Mock implementation
    const payments = JSON.parse(
      localStorage.getItem('chat_contract_payments') || '[]'
    );
    
    payments.push({
      contractId: contract.contractId,
      recipient: contract.acceptedBy?.handCashHandle,
      amount: contract.reward.amount,
      currency: contract.reward.currency,
      timestamp: new Date().toISOString(),
      contractType: contract.type
    });
    
    localStorage.setItem('chat_contract_payments', JSON.stringify(payments));
  }

  /**
   * Initialize sample contracts for demonstration
   */
  private initializeSampleContracts(): void {
    const sampleContracts: Omit<ChatContract, 'contractId' | 'createdAt' | 'lastUpdated'>[] = [
      {
        type: 'chat_creation',
        title: 'Create "Bitcoin Ordinals Trading" Chat Room',
        description: 'Need an experienced moderator to create and establish a high-quality chat room focused on Bitcoin Ordinals trading. Must have deep knowledge of NFTs, BSV blockchain, and trading strategies.',
        requirements: [
          'Experience with Bitcoin Ordinals and NFT trading',
          'History of successful community management',
          'Available for at least 4 hours daily for first month',
          'Knowledge of BSV ecosystem and 1Sat Ordinals'
        ],
        deliverables: [
          'Fully configured chat room with rules and guidelines',
          'Initial 50+ quality members recruited',
          'Daily moderation for first 30 days',
          'Trading resources and educational content',
          'Integration with Ordinals marketplaces'
        ],
        reward: {
          amount: 0.05,
          currency: 'BSV',
          displayText: '0.05 BSV (~$2.50)'
        },
        estimatedHours: 40,
        duration: 30,
        priority: 'High',
        skills: ['Community Management', 'Bitcoin Ordinals', 'Trading', 'Moderation'],
        category: 'Chat Creation',
        createdBy: {
          handCashHandle: '$ordinals_investor'
        },
        status: 'available',
        contractTerms: {
          escrowRequired: true,
          disputeResolution: 'arbitration',
          qualityStandards: [
            'Minimum 50 active members within 30 days',
            'No spam or low-quality content',
            'Daily moderation activity',
            'Educational content posted weekly'
          ],
          successMetrics: [
            '50+ members recruited',
            '10+ daily active users',
            '5+ successful trades facilitated',
            'Zero major incidents or conflicts'
          ]
        }
      },
      {
        type: 'moderation',
        title: 'Professional Moderation for Developer Chat',
        description: 'Seeking a technical moderator for our active Bitcoin SV developer chat. Must understand coding, smart contracts, and be available during US business hours.',
        requirements: [
          'Programming experience (JavaScript, Python, or similar)',
          'Understanding of Bitcoin SV and smart contracts',
          'Available Monday-Friday 9 AM - 5 PM PST',
          'Experience with technical community moderation'
        ],
        deliverables: [
          'Daily active moderation during business hours',
          'Code review assistance for community projects',
          'Technical question answering and guidance',
          'Weekly community engagement reports',
          'Escalation of complex technical issues'
        ],
        reward: {
          amount: 15000,
          currency: 'BCHAT',
          displayText: '15,000 $BCHAT (~$67.50)'
        },
        estimatedHours: 160,
        duration: 30,
        priority: 'High',
        skills: ['Programming', 'BSV Development', 'Technical Moderation', 'Community Support'],
        category: 'Moderation',
        createdBy: {
          handCashHandle: '$bsv_devs',
          chatRoomsOwned: ['BSV Developers', 'Smart Contracts']
        },
        status: 'available',
        contractTerms: {
          escrowRequired: true,
          disputeResolution: 'community_vote',
          qualityStandards: [
            'Response time under 30 minutes during business hours',
            'Accurate technical guidance',
            'Professional communication',
            'Conflict resolution skills'
          ],
          successMetrics: [
            '95%+ positive community feedback',
            'Average response time under 30 minutes',
            'Zero unresolved escalations',
            'Increased developer activity in chat'
          ]
        }
      },
      {
        type: 'community_building',
        title: 'Grow "Women in Crypto" Community to 500 Members',
        description: 'Looking for an experienced community builder to grow our women-focused crypto chat from 50 to 500 active members. Must understand the unique challenges women face in crypto.',
        requirements: [
          'Experience building women-focused communities',
          'Strong social media presence',
          'Understanding of crypto and gender dynamics',
          'Proven track record of community growth'
        ],
        deliverables: [
          'Growth from 50 to 500 members within 60 days',
          'Weekly events and AMAs organized',
          'Social media campaigns across platforms',
          'Partnership outreach to women crypto leaders',
          'Mentorship program implementation'
        ],
        reward: {
          amount: 0.1,
          currency: 'BSV',
          displayText: '0.1 BSV (~$5.00)'
        },
        estimatedHours: 80,
        duration: 60,
        priority: 'Medium',
        skills: ['Community Building', 'Social Media Marketing', 'Event Planning', 'Diversity & Inclusion'],
        category: 'Community Growth',
        createdBy: {
          handCashHandle: '$crypto_women'
        },
        status: 'available',
        contractTerms: {
          escrowRequired: true,
          disputeResolution: 'arbitration',
          qualityStandards: [
            'Minimum 450 members (90% of target)',
            'High engagement rates (20%+ weekly activity)',
            'Quality member retention',
            'Positive community sentiment'
          ],
          successMetrics: [
            '500+ active members',
            '100+ weekly active users',
            '5+ events organized',
            '20+ industry partnerships'
          ]
        }
      },
      {
        type: 'content_creation',
        title: 'Create Trading Education Content Series',
        description: 'Need an expert trader to create comprehensive educational content for our Bitcoin trading chat. Must cover basics to advanced strategies with real examples.',
        requirements: [
          'Proven Bitcoin trading track record (2+ years)',
          'Experience creating educational content',
          'Strong communication and teaching skills',
          'Knowledge of technical analysis and market psychology'
        ],
        deliverables: [
          '10-part educational series covering trading fundamentals',
          'Live trading sessions with commentary',
          'Weekly market analysis posts',
          'Interactive Q&A sessions',
          'Trading strategy templates and guides'
        ],
        reward: {
          amount: 25000,
          currency: 'BCHAT',
          displayText: '25,000 $BCHAT (~$112.50)'
        },
        estimatedHours: 60,
        duration: 45,
        priority: 'Medium',
        skills: ['Bitcoin Trading', 'Technical Analysis', 'Content Creation', 'Education'],
        category: 'Content Creation',
        createdBy: {
          handCashHandle: '$trade_master'
        },
        status: 'claimed',
        acceptedBy: {
          handCashHandle: '$crypto_educator',
          githubUsername: 'crypto-educator',
          claimedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
          deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000), // 40 days from now
          estimatedCompletionDays: 45
        },
        contractTerms: {
          escrowRequired: true,
          disputeResolution: 'community_vote',
          qualityStandards: [
            'Professional quality content',
            'Accurate market information',
            'Engaging presentation style',
            'Timely delivery of content'
          ],
          successMetrics: [
            '10+ educational posts completed',
            '5+ live sessions conducted',
            '80%+ positive community feedback',
            'Increased trading discussion activity'
          ]
        }
      },
      {
        type: 'technical',
        title: 'Integrate 1Sat Ordinals API into Chat Platform',
        description: 'Seeking a skilled developer to integrate 1Sat Ordinals API into our chat platform to display NFT collections and enable trading discussions with real-time data.',
        requirements: [
          'Full-stack development experience',
          'Experience with APIs and real-time data',
          'Knowledge of Bitcoin Ordinals and NFTs',
          'React/TypeScript proficiency'
        ],
        deliverables: [
          'API integration with 1Sat Ordinals marketplace',
          'Real-time NFT price feeds in chat',
          'Collection showcase functionality',
          'Trading alerts and notifications',
          'Mobile-responsive implementation'
        ],
        reward: {
          amount: 0.08,
          currency: 'BSV',
          displayText: '0.08 BSV (~$4.00)'
        },
        estimatedHours: 32,
        duration: 14,
        priority: 'High',
        skills: ['React', 'TypeScript', 'API Integration', 'Bitcoin Ordinals', 'Real-time Data'],
        category: 'Technical Development',
        createdBy: {
          handCashHandle: '$nft_chat_admin'
        },
        status: 'available',
        contractTerms: {
          escrowRequired: true,
          disputeResolution: 'platform_decision',
          qualityStandards: [
            'Code quality and documentation',
            'Mobile responsiveness',
            'Performance optimization',
            'Error handling and testing'
          ],
          successMetrics: [
            'Full API integration working',
            'Real-time data display',
            'Zero critical bugs',
            'Positive user feedback'
          ]
        }
      },
      {
        type: 'moderation',
        title: 'Moderate High-Volume Trading Chat (24/7)',
        description: 'Need experienced moderators for our busiest trading chat. Fast-paced environment with 500+ daily messages. Must handle conflicts and maintain quality discussions.',
        requirements: [
          'Previous trading chat moderation experience',
          'Available for 8-hour shifts (rotating schedule)',
          'Quick decision-making abilities',
          'Fluent in English and trading terminology'
        ],
        deliverables: [
          '24/7 moderation coverage (team-based)',
          'Real-time spam and scam prevention',
          'Conflict resolution and de-escalation',
          'Quality discussion facilitation',
          'Daily moderation reports'
        ],
        reward: {
          amount: 0.12,
          currency: 'BSV',
          displayText: '0.12 BSV (~$6.00)'
        },
        estimatedHours: 240,
        duration: 30,
        priority: 'Critical',
        skills: ['High-Volume Moderation', 'Trading Knowledge', 'Conflict Resolution', 'Spam Detection'],
        category: 'Moderation',
        createdBy: {
          handCashHandle: '$trading_central'
        },
        status: 'in_progress',
        acceptedBy: {
          handCashHandle: '$mod_team_lead',
          githubUsername: 'mod-team-lead',
          claimedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
          deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
          estimatedCompletionDays: 30
        },
        contractTerms: {
          escrowRequired: true,
          disputeResolution: 'arbitration',
          qualityStandards: [
            'Response time under 5 minutes for urgent issues',
            'Professional communication',
            'Consistent rule enforcement',
            'High community satisfaction'
          ],
          successMetrics: [
            '99%+ uptime coverage',
            '90%+ user satisfaction rating',
            'Reduced spam incidents by 80%',
            'Increased quality discussion metrics'
          ]
        }
      }
    ];

    // Add contracts to the service
    sampleContracts.forEach(contractData => {
      const contractId = `sample_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const contract: ChatContract = {
        ...contractData,
        contractId,
        createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last week
        lastUpdated: new Date()
      };
      this.contracts.set(contractId, contract);
    });
  }
}

// Singleton instance
export const chatContractService = new ChatContractService();