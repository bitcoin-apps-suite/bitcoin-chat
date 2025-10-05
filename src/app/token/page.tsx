'use client';

import React from 'react';
import ChatHeader from '@/components/ChatHeader';
import Footer from '@/components/Footer';

export default function TokenPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '72px', background: '#0a0a0a' }}>
      <ChatHeader />
      
      <main style={{ flex: 1, color: '#ffffff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
          
          {/* Hero Section */}
          <section style={{ textAlign: 'center', marginBottom: '80px' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              marginBottom: '20px',
              background: 'linear-gradient(135deg, #ff6500 0%, #ff9500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              The $BCHAT Token
            </h1>
            <p style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '30px',
              lineHeight: '1.4'
            }}>
              Tokenized chat rooms where conversation creates value
            </p>
            <div style={{
              background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
              padding: '12px 24px',
              borderRadius: '24px',
              display: 'inline-block',
              fontSize: '18px',
              fontWeight: '600',
              marginBottom: '40px'
            }}>
              $BCHAT
            </div>
          </section>

          {/* Philosophy Section */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Revolutionary Chat Economics
            </h2>
            <div style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(255, 101, 0, 0.2)',
              borderRadius: '16px',
              padding: '40px'
            }}>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '30px'
              }}>
                Bitcoin Chat transforms conversations into <strong>tokenized businesses</strong>. Each chat room operates 
                like a company where token holders are shareholders, earning dividends from entry fees and message charges.
              </p>
              <p style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '30px'
              }}>
                The $BCHAT token represents our revolutionary approach to creating sustainable chat communities that 
                reward quality conversation and active participation through transparent revenue sharing.
              </p>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '30px',
                marginTop: '40px'
              }}>
                {[
                  { title: 'Pay-Per-Message', desc: 'Users pay small fees for each message, creating immediate value from engagement' },
                  { title: 'Entry Fees', desc: 'Premium chat rooms charge entry fees that are distributed to token holders' },
                  { title: 'Shareholder Governance', desc: 'Token holders vote on chat rules, moderation policies, and fee structures' }
                ].map((point, index) => (
                  <div key={index} style={{
                    background: 'rgba(255, 101, 0, 0.05)',
                    border: '1px solid rgba(255, 101, 0, 0.2)',
                    borderRadius: '12px',
                    padding: '24px',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ color: '#ff6500', fontSize: '18px', marginBottom: '12px' }}>{point.title}</h3>
                    <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>{point.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Token Model Section */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              The $BCHAT Token Model
            </h2>
            
            <div style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(255, 101, 0, 0.2)',
              borderRadius: '16px',
              padding: '40px',
              marginBottom: '30px'
            }}>
              <h3 style={{ color: '#ff6500', fontSize: '24px', marginBottom: '20px' }}>How It Works</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Each chat room issues its own tokens representing ownership shares',
                  'Users pay entry fees and per-message charges in BSV cryptocurrency',
                  'Revenue is automatically distributed to token holders as dividends',
                  'Token holders vote on chat governance, rules, and fee structures',
                  'Popular chat rooms appreciate in value as demand for tokens grows'
                ].map((item, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{
                      color: '#ff6500',
                      marginRight: '12px',
                      fontSize: '18px',
                      fontWeight: 'bold'
                    }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #2a1a0a 0%, #1a1100 100%)',
              border: '2px solid rgba(255, 180, 0, 0.3)',
              borderRadius: '16px',
              padding: '40px'
            }}>
              <h3 style={{ color: '#ffb400', fontSize: '24px', marginBottom: '20px' }}>⚠️ Important Legal Notice</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {[
                  'Token allocation is discretionary - no guaranteed distribution for any chat activity',
                  'Participation does not create employment or contractual relationships',
                  'This is not a public investment offering or capital raising activity',
                  'The Bitcoin Corporation LTD may offer regulated equity shares separately',
                  'Regulatory frameworks may evolve - conduct your own legal due diligence'
                ].map((notice, index) => (
                  <li key={index} style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '16px',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}>
                    <span style={{
                      color: '#ffb400',
                      marginRight: '12px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}>•</span>
                    {notice}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Revenue Model Section */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Chat Room Revenue Model
            </h2>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px',
              marginBottom: '40px'
            }}>
              {[
                {
                  title: 'Free Chat Rooms',
                  desc: 'Open community discussions',
                  price: '$0',
                  features: ['No entry fee', 'Basic moderation', 'Standard features', 'Community owned']
                },
                {
                  title: 'Premium Chat Rooms',
                  desc: 'Exclusive conversations with entry fees',
                  price: '$10-100',
                  features: ['Entry fee required', 'Enhanced features', 'Quality discussions', 'Token holder profits'],
                  featured: true
                },
                {
                  title: 'Enterprise Rooms',
                  desc: 'Corporate boardrooms & shareholder meetings',
                  price: '$500+',
                  features: ['High entry fees', 'Corporate governance', 'Voting mechanisms', 'Maximum dividends']
                }
              ].map((tier, index) => (
                <div key={index} style={{
                  background: tier.featured ? 
                    'linear-gradient(135deg, rgba(255, 101, 0, 0.2) 0%, rgba(255, 68, 0, 0.1) 100%)' :
                    'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
                  border: tier.featured ? '2px solid #ff6500' : '1px solid rgba(255, 101, 0, 0.2)',
                  borderRadius: '16px',
                  padding: '30px',
                  textAlign: 'center',
                  position: 'relative'
                }}>
                  {tier.featured && (
                    <div style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: '#ff6500',
                      padding: '6px 20px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      MOST POPULAR
                    </div>
                  )}
                  <h3 style={{ color: '#ff6500', fontSize: '20px', marginBottom: '10px' }}>{tier.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginBottom: '20px', fontSize: '14px' }}>{tier.desc}</p>
                  <div style={{ 
                    fontSize: '32px', 
                    fontWeight: '700', 
                    color: '#ffffff',
                    marginBottom: '20px'
                  }}>
                    {tier.price}
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
                    {tier.features.map((feature, idx) => (
                      <li key={idx} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                        fontSize: '14px',
                        color: 'rgba(255, 255, 255, 0.8)'
                      }}>
                        <span style={{ color: '#ff6500', marginRight: '8px' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(255, 101, 0, 0.2)',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center'
            }}>
              <h3 style={{ color: '#ff6500', fontSize: '24px', marginBottom: '20px' }}>Revenue Distribution</h3>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '20px',
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}>
                <span>Entry Fees + Message Charges</span>
                <span style={{ color: '#ff6500', fontSize: '20px' }}>→</span>
                <span>Chat Room Revenue</span>
                <span style={{ color: '#ff6500', fontSize: '20px' }}>→</span>
                <span>Token Holder Dividends</span>
                <span style={{ color: '#ff6500', fontSize: '20px' }}>→</span>
                <span>Shareholders Profit</span>
              </div>
            </div>
          </section>

          {/* Token Statistics */}
          <section style={{ marginBottom: '80px' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '40px',
              textAlign: 'center'
            }}>
              Token Statistics
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '30px'
            }}>
              {[
                { label: 'Total Chat Rooms', value: '∞', desc: 'Unlimited tokenized rooms' },
                { label: 'Platform Revenue', value: '2.5%', desc: 'Platform fee on all transactions' },
                { label: 'Blockchain', value: 'BSV', desc: 'Bitcoin SV network' },
                { label: 'Token Standard', value: 'BSV-20', desc: 'Native Bitcoin tokens' }
              ].map((stat, index) => (
                <div key={index} style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
                  border: '1px solid rgba(255, 101, 0, 0.2)',
                  borderRadius: '12px',
                  padding: '30px',
                  textAlign: 'center'
                }}>
                  <div style={{
                    fontSize: '36px',
                    fontWeight: '700',
                    color: '#ff6500',
                    marginBottom: '10px'
                  }}>
                    {stat.value}
                  </div>
                  <h3 style={{ color: '#ffffff', fontSize: '16px', marginBottom: '8px' }}>{stat.label}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>{stat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section style={{
            background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
            borderRadius: '20px',
            padding: '60px 40px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '20px'
            }}>
              Ready to Own Chat Rooms?
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Create tokenized chat rooms, earn from conversations, and build valuable community assets.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: '#ffffff',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '8px',
                color: '#ff6500',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Start a Chat Room
              </button>
              <button style={{
                background: 'transparent',
                border: '2px solid #ffffff',
                padding: '14px 30px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                Browse Exchange
              </button>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}