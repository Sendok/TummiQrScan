"use client";

import type React from 'react';

// This component can be used to wrap any global context providers in the future.
// For now, it just renders children.
export default function AppProviders({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
