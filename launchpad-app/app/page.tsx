'use client';

import { useState } from 'react';
import { LaunchProvider } from '@/context/LaunchContext';
import IntroAnimation from '@/components/intro/IntroAnimation';
import Wizard from '@/components/wizard/Wizard';
import Stars from '@/components/Stars';

export default function Home() {
  const [showWizard, setShowWizard] = useState(false);

  return (
    <LaunchProvider>
      <Stars />
      {!showWizard ? (
        <IntroAnimation onEnter={() => setShowWizard(true)} />
      ) : (
        <Wizard />
      )}
    </LaunchProvider>
  );
}
