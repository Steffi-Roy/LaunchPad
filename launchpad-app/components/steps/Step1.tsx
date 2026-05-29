'use client';

import { useLaunch } from '@/context/LaunchContext';
import CompCard from '@/components/ui/CompCard';
import AngleBox from '@/components/ui/AngleBox';
import ErrorBanner from '@/components/ui/ErrorBanner';

export default function Step1() {
  const { state, dispatch } = useLaunch();

  return (
    <div>
      {state.error && (
        <ErrorBanner
          message={state.error}
          onDismiss={() => dispatch({ type: 'SET_ERROR', payload: null })}
        />
      )}

      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', flexShrink: 0, border: '1.5px dashed var(--purple3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Radar / scan icon */}
          <svg viewBox="0 0 24 24" fill="none" width="24" height="24">
            <circle cx="12" cy="12" r="9" stroke="#7F77DD" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="12" cy="12" r="5.5" stroke="#7F77DD" strokeWidth="1" strokeDasharray="2 2" />
            <circle cx="12" cy="12" r="2" fill="#c084fc" />
            <line x1="12" y1="12" x2="19" y2="5" stroke="#c084fc" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="19" cy="5" r="1.5" fill="#5DCAA5" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15 }}>
            competitive landscape
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', letterSpacing: '1px' }}>
            // {(state.competitors ?? []).length > 0 ? `${state.competitors.length} competitors identified` : 'scanning the web for similar tools...'}
          </div>
        </div>
      </div>

      {/* Competitor cards */}
      {(state.competitors ?? []).length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {state.competitors.map((comp, i) => (
            <CompCard key={i} name={comp.name} description={comp.description} weakness={comp.weakness} />
          ))}
        </div>
      ) : (
        <div
          style={{
            background: 'var(--bg2)',
            border: '1px dashed var(--border)',
            padding: '20px',
            marginBottom: '24px',
            color: 'var(--muted)',
            fontSize: '12px',
            textAlign: 'center',
          }}
        >
          // no competitors loaded yet — run analysis from step 0
        </div>
      )}

      {/* Angle box */}
      <AngleBox
        value={state.positioningAngle}
        onChange={v => dispatch({ type: 'SET_POSITIONING_ANGLE', payload: v })}
      />
    </div>
  );
}
