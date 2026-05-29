'use client';

interface CompCardProps {
  name: string;
  description: string;
  weakness: string;
}

export default function CompCard({ name, description, weakness }: CompCardProps) {
  return (
    <div style={{
      background: 'var(--bg2)',
      borderTop: '3px solid var(--purple3)',
      borderRight: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      borderLeft: '1px solid var(--border)',
      padding: '18px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
    }}>
      <div style={{
        fontFamily: 'var(--font-syne), sans-serif',
        fontSize: '20px',
        fontWeight: 800,
        color: 'var(--text)',
        lineHeight: 1.1,
        letterSpacing: '-0.3px',
      }}>
        {name}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.7 }}>
        {description}
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '10px 12px',
        background: 'rgba(212,83,126,0.06)',
        borderLeft: '2px solid var(--pink)',
      }}>
        <span style={{ fontSize: '10px', color: 'var(--pink)', flexShrink: 0, paddingTop: '1px' }}>⚠</span>
        <span style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.5 }}>{weakness}</span>
      </div>
    </div>
  );
}
