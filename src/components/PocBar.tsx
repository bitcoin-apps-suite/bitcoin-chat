'use client';

import React from 'react';
import Link from 'next/link';

interface PocBarProps {
  color?: string;
}

export default function PocBar({ color = '#ff6500' }: PocBarProps) {
  return (
    <div 
      className="poc-banner"
      style={{
        position: 'fixed',
        top: 0, // Above taskbar
        left: 0,
        right: 0,
        height: '40px',
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Left aligned
        zIndex: 9999,
        fontSize: '13px',
        fontWeight: '500',
        color: 'black',
        letterSpacing: '0.5px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        borderBottom: '1px solid rgba(0,0,0,0.2)',
        padding: '0 12px',
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
              color: 'black', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Features
          </Link>
          <Link 
            href="/docs" 
            style={{ 
              color: 'black', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            Docs
          </Link>
          <a 
            href="https://github.com/bitcoin-apps-suite/bitcoin-chat"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              color: 'black', 
              textDecoration: 'underline',
              opacity: 0.9,
              fontWeight: '400'
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}