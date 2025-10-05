'use client';

import React from 'react';
import ChatHeader from '@/components/ChatHeader';
import Footer from '@/components/Footer';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '72px' }}>
      <ChatHeader />
      
      <main style={{ flex: 1, background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)' }}>
        {/* Hero Section */}
        <section style={{
          padding: '80px 20px 60px',
          textAlign: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
          borderBottom: '1px solid rgba(255, 101, 0, 0.2)'
        }}>
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              <span style={{ color: '#ff6500' }}>Bitcoin</span> Chat
            </h1>
            <p style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '30px',
              lineHeight: '1.4'
            }}>
              Tokenized chat rooms where conversation creates value
            </p>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.6)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Join exclusive chat rooms, pay per message, and earn dividends from the conversations you help create. 
              Each chat room is a tokenized business where members become shareholders.
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button style={{
                background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
                border: 'none',
                padding: '16px 32px',
                borderRadius: '8px',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(255, 101, 0, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(255, 101, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(255, 101, 0, 0.3)';
              }}>
                Start Chatting
              </button>
              <button style={{
                background: 'transparent',
                border: '2px solid rgba(255, 101, 0, 0.5)',
                padding: '14px 30px',
                borderRadius: '8px',
                color: '#ff6500',
                fontSize: '18px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 101, 0, 0.1)';
                e.currentTarget.style.borderColor = '#ff6500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.borderColor = 'rgba(255, 101, 0, 0.5)';
              }}>
                View Token Info
              </button>
            </div>
          </div>
        </section>

        {/* Revenue Model Section */}
        <section style={{ padding: '80px 20px', background: '#0a0a0a' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '60px'
            }}>
              How Bitcoin Chat Creates Value
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 101, 0, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  🎫
                </div>
                <h3 style={{ color: '#ff6500', fontSize: '22px', marginBottom: '15px' }}>Entry Fees</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                  Premium chat rooms charge an entry fee in BSV. These fees are distributed to chat token holders as dividends.
                </p>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 101, 0, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  💬
                </div>
                <h3 style={{ color: '#ff6500', fontSize: '22px', marginBottom: '15px' }}>Message Fees</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                  Users pay a small fee per message. Quality conversations generate revenue that flows to chat shareholders.
                </p>
              </div>
              
              <div style={{
                background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 100%)',
                padding: '30px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 101, 0, 0.2)',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px'
                }}>
                  📈
                </div>
                <h3 style={{ color: '#ff6500', fontSize: '22px', marginBottom: '15px' }}>Token Trading</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
                  Chat tokens are tradeable on our exchange. Popular chat rooms appreciate in value as demand grows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section style={{ padding: '80px 20px', background: '#111111' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '60px'
            }}>
              Shareholder Chat Rooms
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '30px'
            }}>
              {[
                { icon: '🏢', title: 'Corporate Governance', desc: 'Chat rooms function like company board meetings with voting rights' },
                { icon: '💰', title: 'Revenue Distribution', desc: 'Automatic dividend payments to token holders from chat revenue' },
                { icon: '🗳️', title: 'Democratic Decisions', desc: 'Token holders vote on chat rules, moderation, and fee structures' },
                { icon: '📊', title: 'Transparent Analytics', desc: 'Real-time revenue, user metrics, and token performance tracking' }
              ].map((feature, index) => (
                <div key={index} style={{
                  background: 'rgba(255, 101, 0, 0.05)',
                  border: '1px solid rgba(255, 101, 0, 0.2)',
                  borderRadius: '12px',
                  padding: '30px 20px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 101, 0, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 101, 0, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 101, 0, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 101, 0, 0.2)';
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '15px' }}>{feature.icon}</div>
                  <h3 style={{ color: '#ff6500', fontSize: '18px', marginBottom: '10px' }}>{feature.title}</h3>
                  <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px', lineHeight: '1.5' }}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '80px 20px',
          background: 'linear-gradient(135deg, #ff6500 0%, #ff4500 100%)',
          textAlign: 'center'
        }}>
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '600',
              color: '#ffffff',
              marginBottom: '20px'
            }}>
              Ready to Own a Piece of the Conversation?
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}>
              Join exclusive chat rooms, become a shareholder, and earn from the conversations you help create.
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}>
                Explore Chat Rooms
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
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}>
                View Exchange
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}