'use client';

import React from 'react';
import PocBar from './PocBar';
import Dock from './Dock';
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
      {!isInOS && <Dock />}
    </>
  );
};

export default BitcoinOSWrapper;