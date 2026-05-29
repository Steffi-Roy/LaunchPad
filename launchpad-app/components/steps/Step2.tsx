'use client';

import { useLaunch } from '@/context/LaunchContext';
import Tag from '@/components/ui/Tag';
import ErrorBanner from '@/components/ui/ErrorBanner';

const toneOptions = ['raw / technical', 'conversational', 'bold', 'minimal', 'playful'];

export default function Step2() {
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
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20 Q4 14 12 14 Q20 14 20 20" fill="none" />
            <circle cx="12" cy="8" r="1.5" fill="#5DCAA5" stroke="none" />
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
            who is this for?
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', letterSpacing: '1px' }}>
            // pick your targets — override anytime
          </div>
        </div>
      </div>

      {/* Demographics */}
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
          // demographic
        </span>
        {state.demographics.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {state.demographics.map((demo) => (
              <Tag
                key={demo.label}
                label={demo.label}
                selected={demo.selected}
                onToggle={() => dispatch({ type: 'TOGGLE_DEMOGRAPHIC', payload: demo.label })}
              />
            ))}
          </div>
        ) : (
          <div style={{ color: 'var(--muted)', fontSize: '12px', fontStyle: 'italic' }}>
            // run competitive analysis first to load demographics
          </div>
        )}
      </div>

      {/* Tone */}
      <div style={{ marginBottom: '24px' }}>
        <span style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
          // messaging tone
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {toneOptions.map((tone) => (
            <Tag
              key={tone}
              label={tone}
              selected={state.tone === tone}
              onToggle={() => dispatch({ type: 'SET_TONE', payload: tone })}
            />
          ))}
        </div>
      </div>

      {/* Positioning statement */}
      {state.positioningStatement && (
        <div
          style={{
            border: '1px dashed var(--border)',
            padding: '16px',
            marginBottom: '24px',
            background: 'var(--bg2)',
          }}
        >
          <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '2px', marginBottom: '8px' }}>
            // positioning statement
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text)', lineHeight: 1.7 }}>
            {state.positioningStatement}
          </div>
          {state.tagline && (
            <div
              style={{
                marginTop: '12px',
                paddingTop: '10px',
                borderTop: '1px dashed var(--border)',
                fontSize: '12px',
                color: 'var(--purple)',
                letterSpacing: '0.5px',
              }}
            >
              &quot;{state.tagline}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
