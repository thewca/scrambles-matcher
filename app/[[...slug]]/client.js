'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const Entrypoint = dynamic(() => import('../components/App/Entrypoint'), {
  ssr: false,
});

export function ClientOnly() {
  return <Entrypoint />;
}
