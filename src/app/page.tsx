'use client';

import React from 'react';
import Chat from '@/components/Chat';

export default function HomePage() {
  return (
    <div className="home-page">
      <Chat roomId="general" />
    </div>
  );
}