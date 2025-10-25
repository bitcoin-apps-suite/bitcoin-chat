'use client';

import React from 'react';
import Link from 'next/link';

interface PocBarProps {
  color?: string;
}

export default function PocBar({ color = '#64c8ff' }: PocBarProps) {
  return (
    <div 
      className="poc-banner"
      style={{
        position: 'fixed',
        top: 0, // Above taskbar
        left: 0,
        right: 0,
        height: '40px',
        background: 'linear-gradient(135deg, #64c8ff 0%, #8B5FBF 50%, #6B46C1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Left aligned
        zIndex: 9999,
        fontSize: '13px',
        fontWeight: '500',
        color: 'white',
        letterSpacing: '0.5px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        borderBottom: '1px solid rgba(100, 200, 255, 0.3)',
        padding: '0 12px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '12px' }}>💬</span>
        <span style={{ fontWeight: '600' }}>PROOF OF CONCEPT:</span>
        <span style={{ opacity: 0.9 }}>This is a demonstration version of Bitcoin Chat.</span>
        <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', fontSize: '12px' }}>
          <Link 
            href="/features" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '400',
              transition: 'all 0.2s ease'
            }}
          >
            Features
          </Link>
          <Link 
            href="/docs" 
            style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '400',
              transition: 'all 0.2s ease'
            }}
          >
            Docs
          </Link>
          <a 
            href="https://github.com/bitcoin-apps-suite/bitcoin-chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              textDecoration: 'underline',
              textDecorationColor: 'rgba(255, 255, 255, 0.6)',
              fontWeight: '400',
              transition: 'all 0.2s ease'
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}