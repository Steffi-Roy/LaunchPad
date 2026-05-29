'use client';

import { useLaunch } from '@/context/LaunchContext';
import ErrorBanner from '@/components/ui/ErrorBanner';

export default function Step0() {
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
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <line x1="3" y1="9" x2="21" y2="9" />
            <circle cx="7" cy="6" r="1" fill="#E24B4A" stroke="none" />
            <circle cx="11" cy="6" r="1" fill="#EF9F27" stroke="none" />
            <circle cx="15" cy="6" r="1" fill="#5DCAA5" stroke="none" />
            <line x1="7" y1="14" x2="17" y2="14" strokeWidth="1" />
            <line x1="7" y1="18" x2="13" y2="18" strokeWidth="1" />
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
            tell us what you built
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', letterSpacing: '1px' }}>
            // paste your repo + describe the thing
          </div>
        </div>
      </div>

      {/* GitHub URL field */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
          // github repo url
        </label>
        <input
          type="text"
          placeholder="https://github.com/you/your-project"
          value={state.repoUrl}
          onChange={e => dispatch({ type: 'SET_INPUT', payload: { repoUrl: e.target.value } })}
          style={{
            width: '100%',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderBottom: '2px solid var(--purple3)',
            color: 'var(--text)',
            padding: '12px 14px',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s',
            fontFamily: 'var(--mono)',
            borderRadius: 0,
          }}
        />
      </div>

      {/* Product description field */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ fontSize: '11px', color: 'var(--muted)', letterSpacing: '2px', display: 'block', marginBottom: '8px' }}>
          // README or pitch — what does it do?
        </label>
        <textarea
          rows={6}
          placeholder={'// describe your project, the problem it solves, who it\'s for...\n// or paste your README directly'}
          value={state.productDescription}
          onChange={e => dispatch({ type: 'SET_INPUT', payload: { productDescription: e.target.value } })}
          style={{
            width: '100%',
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderBottom: '2px solid var(--purple3)',
            color: 'var(--text)',
            padding: '12px 14px',
            fontSize: '13px',
            outline: 'none',
            transition: 'border-color 0.2s',
            resize: 'none',
            fontFamily: 'var(--mono)',
            borderRadius: 0,
          }}
        />
      </div>
    </div>
  );
}
