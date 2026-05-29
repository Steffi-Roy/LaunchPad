'use client';

import { useLaunch } from '@/context/LaunchContext';
import StepTabs from './StepTabs';
import WizNav from './WizNav';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import ErrorBanner from '@/components/ui/ErrorBanner';
import Step0 from '@/components/steps/Step0';
import Step1 from '@/components/steps/Step1';
import Step2 from '@/components/steps/Step2';
import Step3 from '@/components/steps/Step3';
import Step4 from '@/components/steps/Step4';
import Step5 from '@/components/steps/Step5';

const STEPS = [Step0, Step1, Step2, Step3, Step4, Step5];

export default function Wizard() {
  const { state, dispatch } = useLaunch();
  const ActiveStep = STEPS[state.currentStep];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      {state.loading && <LoadingOverlay message={state.loadingMessage} />}

      {/* Error modal — always above loading overlay */}
      {state.error && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 300,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          background: 'rgba(10,10,12,0.7)',
          backdropFilter: 'blur(4px)',
        }}>
          <div style={{ width: '100%', maxWidth: '480px' }}>
            <ErrorBanner
              message={state.error}
              onDismiss={() => dispatch({ type: 'SET_ERROR', payload: null })}
            />
          </div>
        </div>
      )}

      {/* Topbar */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '14px 32px',
          borderBottom: '1px dashed var(--border)',
          position: 'sticky',
          top: 0,
          background: 'rgba(10,10,12,0.92)',
          backdropFilter: 'blur(8px)',
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '16px',
            fontWeight: 800,
            color: 'var(--purple)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--purple)',
              animation: 'blink 2s ease-in-out infinite',
            }}
          />
          LaunchPad AI
        </div>
      </div>

      {/* Step tabs */}
      <StepTabs />

      {/* Wizard body */}
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          margin: '0 auto',
          padding: '40px 32px 120px',
        }}
      >
        <ActiveStep />
      </div>

      {/* Bottom nav */}
      <WizNav />
    </div>
  );
}
