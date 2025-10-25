'use client';

import React, { useState, useEffect } from 'react';
import DevSidebar from './DevSidebar';
import ChatHeader from './ChatHeader';
import Footer from './Footer';
import { useBitcoinOS } from '@/lib/utils/useBitcoinOS';

interface DevLayoutProps {
  children: React.ReactNode;
}

const DevLayout: React.FC<DevLayoutProps> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { isInOS, setTitle } = useBitcoinOS();

  useEffect(() => {
    // Check if sidebar is collapsed from localStorage on mount
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('devSidebarCollapsed');
      setIsCollapsed(saved === 'true');
    }
    
    // Set app title when running in Bitcoin OS
    if (isInOS) {
      setTitle('Bitcoin Chat');
    }
  }, [isInOS, setTitle]);

  const handleCollapsedChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      paddingTop: isInOS ? '0' : '72px' // Account for header height
    }}>
      {!isInOS && <ChatHeader />}
      <DevSidebar onCollapsedChange={handleCollapsedChange} />
      
      <div className={`app-container ${isInOS ? '' : (isCollapsed ? 'with-dev-sidebar-collapsed' : 'with-dev-sidebar')}`} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '0' // Remove bottom padding so footer can sit properly
      }}>
        <main style={{ flex: 1 }}>
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DevLayout;