'use client';

import { useState } from 'react';
import { useLaunch } from '@/context/LaunchContext';
import ErrorBanner from '@/components/ui/ErrorBanner';

type Platform = 'twitter' | 'instagram' | 'reddit' | 'discord' | 'hackernews';

const PLATFORMS: {
  key: Platform;
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: React.ReactNode;
  hint: string;
}[] = [
  {
    key: 'twitter',
    label: 'Twitter / X',
    color: '#e8e8f0',
    bg: '#0a0a0a',
    border: '#333',
    hint: 'thread',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.63L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    color: '#ffffff',
    bg: 'linear-gradient(135deg, #1a0a2e 0%, #2d0a1a 100%)',
    border: '#833AB4',
    hint: 'caption',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <circle cx="12" cy="12" r="4.5"/>
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    key: 'reddit',
    label: 'Reddit',
    color: '#ffffff',
    bg: '#0d0805',
    border: '#FF4500',
    hint: 'show HN style',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#FF4500"/>
        <path fill="white" d="M20 12c0-1.1-.9-2-2-2-.5 0-1 .2-1.4.5C15 9.5 13.6 9 12 9l.7-3.3 2.2.5c0 .6.5 1 1.1 1s1.1-.5 1.1-1.1-.5-1.1-1.1-1.1c-.4 0-.8.2-1 .6l-2.4-.5c-.1 0-.3.1-.3.2L11.4 9c-1.5.1-2.9.6-4 1.5C7 10.2 6.5 10 6 10c-1.1 0-2 .9-2 2 0 .8.4 1.4 1 1.8 0 .2-.1.4-.1.6 0 2.2 2.7 4 6.1 4s6.1-1.8 6.1-4c0-.2 0-.4-.1-.6.6-.4 1-1 1-1.8zm-10 1.5c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1zm5.6 2.5c-.7.7-2 1-3.6 1s-2.9-.3-3.6-1c-.2-.2-.2-.4 0-.6.2-.2.4-.2.6 0 .5.5 1.6.8 3 .8s2.5-.3 3-.8c.2-.2.4-.2.6 0 .2.2.2.5 0 .6zm-.5-1.4c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1 1.1.5 1.1 1.1-.5 1.1-1.1 1.1z"/>
      </svg>
    ),
  },
  {
    key: 'discord',
    label: 'Discord',
    color: '#ffffff',
    bg: '#0b0d14',
    border: '#5865F2',
    hint: 'message',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
      </svg>
    ),
  },
  {
    key: 'hackernews',
    label: 'Hacker News',
    color: '#ffffff',
    bg: '#0d0a05',
    border: '#FF6600',
    hint: 'Show HN',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#FF6600">
        <rect width="24" height="24" rx="2"/>
        <path fill="white" d="M12 13.5L7.5 5h1.8l2.7 5.6L14.7 5h1.8L12 13.5V19h-1.5v-5.5z"/>
      </svg>
    ),
  },
];

function PlatformCard({ platform, content, onChange }: {
  platform: typeof PLATFORMS[0];
  content: string;
  onChange: (v: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div style={{
      border: `1px solid ${platform.border}`,
      overflow: 'hidden',
      marginBottom: '16px',
    }}>
      {/* Platform header */}
      <div style={{
        background: typeof platform.bg === 'string' && platform.bg.startsWith('linear') ? platform.bg : platform.bg,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: `1px solid ${platform.border}`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: platform.color }}>
          {platform.icon}
          <span style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '14px', fontWeight: 700, color: platform.color }}>
            {platform.label}
          </span>
          <span style={{ fontSize: '10px', color: platform.border, border: `1px solid ${platform.border}`, padding: '2px 8px', letterSpacing: '1px', fontFamily: 'var(--mono)' }}>
            {platform.hint}
          </span>
        </div>
        <button
          onClick={handleCopy}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            fontSize: '11px', color: copied ? '#5DCAA5' : platform.border,
            background: 'none', border: 'none', cursor: 'pointer',
            letterSpacing: '1px', fontFamily: 'var(--mono)',
            transition: 'color 0.2s',
          }}
        >
          {copied ? '✓ copied' : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              copy
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <textarea
        value={content}
        onChange={e => onChange(e.target.value)}
        rows={content ? Math.max(4, content.split('\n').length + 1) : 4}
        placeholder={`// ${platform.label.toLowerCase()} content will appear here`}
        style={{
          width: '100%',
          background: 'var(--bg2)',
          border: 'none',
          padding: '16px',
          fontSize: '13px',
          color: 'var(--text)',
          lineHeight: 1.8,
          fontFamily: 'var(--mono)',
          outline: 'none',
          resize: 'vertical',
          borderRadius: 0,
          display: 'block',
        }}
      />
    </div>
  );
}

export default function Step4() {
  const { state, dispatch } = useLaunch();

  return (
    <div>
      {state.error && (
        <ErrorBanner message={state.error} onDismiss={() => dispatch({ type: 'SET_ERROR', payload: null })} />
      )}

      {/* Hero */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '32px' }}>
        <div style={{ width: '48px', height: '48px', flexShrink: 0, border: '1.5px dashed var(--purple3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5" width="24" height="24">
            <rect x="3" y="3" width="8" height="10" rx="1"/>
            <rect x="13" y="3" width="8" height="10" rx="1"/>
            <line x1="3" y1="17" x2="21" y2="17"/>
            <line x1="3" y1="20" x2="16" y2="20"/>
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15 }}>
            content, ready to ship
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', letterSpacing: '1px' }}>
            // tailored per platform — copy and paste
          </div>
        </div>
      </div>

      {/* Platform cards */}
      {PLATFORMS.map(platform => (
        <PlatformCard
          key={platform.key}
          platform={platform}
          content={state.content[platform.key]}
          onChange={v => dispatch({ type: 'SET_CONTENT', payload: { ...state.content, [platform.key]: v } })}
        />
      ))}
    </div>
  );
}
