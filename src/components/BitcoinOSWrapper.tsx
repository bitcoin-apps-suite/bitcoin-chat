'use client';

import React from 'react';
import PocBar from './PocBar';
import MinimalDock from './MinimalDock';
import { useBitcoinOS } from '@/lib/utils/useBitcoinOS';

interface BitcoinOSWrapperProps {
  children: React.ReactNode;
}

const BitcoinOSWrapper: React.FC<BitcoinOSWrapperProps> = ({ children }) => {
  const { isInOS } = useBitcoinOS();

  return (
    <>
      {!isInOS && <PocBar />}
      {children}
      {!isInOS && <MinimalDock currentApp="bitcoin-chat" />}
    </>
  );
};

export default BitcoinOSWrapper;