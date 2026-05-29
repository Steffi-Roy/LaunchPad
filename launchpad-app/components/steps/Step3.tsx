'use client';

import { useLaunch } from '@/context/LaunchContext';
import ChannelRow from '@/components/ui/ChannelRow';
import ErrorBanner from '@/components/ui/ErrorBanner';

export default function Step3() {
  const { state, dispatch } = useLaunch();

  const sortedChannels = [...state.channels].sort((a, b) => a.priority - b.priority);

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
        <div
          style={{
            width: '48px',
            height: '48px',
            flexShrink: 0,
            border: '1.5px dashed var(--purple3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5" width="24" height="24">
            <polyline points="3,17 8,12 13,14 21,6" />
            <line x1="3" y1="21" x2="21" y2="21" />
            <circle cx="21" cy="6" r="1.5" fill="#c084fc" stroke="none" />
          </svg>
        </div>
        <div>
          <div
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '24px',
              fontWeight: 700,
              color: 'var(--text)',
              lineHeight: 1.15,
            }}
          >
            your launch strategy
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', letterSpacing: '1px' }}>
            // where to spend your energy first
          </div>
        </div>
      </div>

      {/* Channels */}
      {sortedChannels.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {sortedChannels.map((ch, i) => (
            <ChannelRow
              key={i}
              name={ch.name}
              icon={ch.icon}
              why={ch.why}
              priority={ch.priority}
              isPrimary={ch.isPrimary}
            />
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
          // no channels loaded yet — complete previous steps first
        </div>
      )}

      {/* GitHub tips */}
      {state.githubTips.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
          {state.githubTips.map((tip, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 16px',
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
              }}
            >
              <span style={{ fontSize: '10px', color: 'var(--purple)', letterSpacing: '1px', flexShrink: 0, paddingTop: '2px' }}>
                → 0{i + 1}
              </span>
              <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>
                {tip}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Opportunity note */}
      {state.opportunityNote && (
        <div
          style={{
            background: 'rgba(239,159,39,0.06)',
            border: '1px solid rgba(239,159,39,0.3)',
            padding: '16px',
            marginBottom: '24px',
          }}
        >
          <div style={{ fontSize: '10px', color: 'var(--amber)', letterSpacing: '2px', marginBottom: '8px' }}>
            // opportunity
          </div>
          <div style={{ fontSize: '12px', color: 'var(--amber)', lineHeight: 1.7 }}>
            {state.opportunityNote}
          </div>
        </div>
      )}
    </div>
  );
}
