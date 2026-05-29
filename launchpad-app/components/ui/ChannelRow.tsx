'use client';

interface ChannelRowProps {
  name: string;
  icon: string;
  why: string;
  priority?: number;
  isPrimary: boolean;
}

export default function ChannelRow({ name, icon, why, priority, isPrimary }: ChannelRowProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        padding: '14px 16px',
        background: 'var(--bg2)',
        borderLeft: isPrimary ? '3px solid var(--purple)' : '3px solid var(--border)',
        transition: 'border-color 0.2s',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          flexShrink: 0,
          border: isPrimary ? '1.5px dashed var(--purple)' : '1.5px dashed var(--border2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          fontFamily: 'var(--mono)',
          fontWeight: 700,
          color: isPrimary ? 'var(--purple)' : 'var(--muted)',
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: '15px',
            fontWeight: 600,
            color: 'var(--text)',
          }}
        >
          {name}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--muted)', marginTop: '4px', lineHeight: 1.6 }}>
          {why}
        </div>
      </div>
      {priority !== undefined && (
        <span
          style={{
            marginLeft: 'auto',
            fontSize: '11px',
            color: 'var(--purple)',
            border: '1px dashed var(--purple)',
            padding: '4px 12px',
            flexShrink: 0,
            letterSpacing: '1px',
          }}
        >
          #{priority}
        </span>
      )}
    </div>
  );
}
