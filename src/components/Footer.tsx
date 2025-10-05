'use client';

import React from 'react';
import { ExternalLink, Github, Twitter, Mail, Shield, Book } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
      borderTop: '1px solid rgba(255, 101, 0, 0.2)',
      padding: '40px 20px 20px',
      color: '#ffffff',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px'
      }}>
        {/* Brand Section */}
        <div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '16px',
            fontSize: '18px',
            fontWeight: '600',
            color: '#ff6500'
          }}>
            <span style={{ fontSize: '24px', marginRight: '8px' }}>₿</span>
            Bitcoin Chat
          </div>
          <p style={{ 
            color: 'rgba(255, 255, 255, 0.7)', 
            lineHeight: '1.6',
            marginBottom: '20px',
            fontSize: '14px'
          }}>
            Decentralized messaging platform built on Bitcoin SV blockchain. 
            Censorship-resistant communication with end-to-end encryption and 
            integrated payment capabilities.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a 
              href="https://github.com/bitcoin-apps-suite/bitcoin-chat" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                transition: 'color 0.2s ease',
                padding: '8px',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ff6500'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              <Github size={20} />
            </a>
            <a 
              href="https://twitter.com/b0ase" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                transition: 'color 0.2s ease',
                padding: '8px',
                borderRadius: '4px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#ff6500'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'}
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Product Links */}
        <div>
          <h4 style={{ 
            color: '#ffffff', 
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Product
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Browse Rooms', href: '/rooms' },
              { label: 'Create Room', href: '/rooms?create=true' },
              { label: 'Private Messages', href: '/messages' },
              { label: 'Settings', href: '/settings' },
              { label: 'Help & Support', href: '/help' }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                  padding: '4px 0'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ff6500'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bitcoin Apps */}
        <div>
          <h4 style={{ 
            color: '#ffffff', 
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Bitcoin Apps
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Bitcoin Drive', href: 'https://bitcoin-drive.vercel.app', color: '#22c55e' },
              { label: 'Bitcoin Writer', href: 'https://bitcoin-writer.vercel.app', color: '#ff9500' },
              { label: 'Bitcoin Spreadsheets', href: 'https://bitcoin-spreadsheet.vercel.app', color: '#3b82f6' },
              { label: 'Bitcoin Paint', href: '#', color: '#a855f7' },
              { label: 'View All Apps', href: '/apps', color: '#ff6500' }
            ].map((app) => (
              <a
                key={app.label}
                href={app.href}
                target={app.href.startsWith('http') ? '_blank' : undefined}
                rel={app.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                  padding: '4px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = app.color}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
              >
                <span style={{ 
                  color: app.color, 
                  marginRight: '8px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  ₿
                </span>
                {app.label}
                {app.href.startsWith('http') && (
                  <ExternalLink size={12} style={{ marginLeft: '4px', opacity: 0.6 }} />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 style={{ 
            color: '#ffffff', 
            marginBottom: '16px',
            fontSize: '16px',
            fontWeight: '600'
          }}>
            Resources
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'Documentation', href: '/docs', icon: Book },
              { label: 'API Reference', href: '/api/docs', icon: Book },
              { label: 'Privacy Policy', href: '/privacy', icon: Shield },
              { label: 'Terms of Service', href: '/terms', icon: Shield },
              { label: 'Contact Support', href: 'mailto:support@bitcoin-chat.com', icon: Mail }
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : (link.href.startsWith('http') ? '_blank' : undefined)}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease',
                  padding: '4px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ff6500'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
              >
                <link.icon size={14} style={{ marginRight: '8px', opacity: 0.6 }} />
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '40px',
        paddingTop: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ 
          color: 'rgba(255, 255, 255, 0.5)', 
          fontSize: '12px' 
        }}>
          © 2025 The Bitcoin Corporation LTD. All rights reserved. 
          <br />
          Registered in England and Wales • Company No. 16735102
        </div>
        <div style={{ 
          color: 'rgba(255, 255, 255, 0.5)', 
          fontSize: '12px',
          textAlign: 'right'
        }}>
          Built with ❤️ on Bitcoin SV
          <br />
          <span style={{ color: '#ff6500' }}>● </span>
          Network Status: Connected
        </div>
      </div>

      {/* Mobile Responsive */}
      <style jsx>{`
        @media (max-width: 768px) {
          footer > div:first-child {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          footer > div:last-child {
            flex-direction: column;
            text-align: center;
          }
          footer > div:last-child > div {
            text-align: center !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;