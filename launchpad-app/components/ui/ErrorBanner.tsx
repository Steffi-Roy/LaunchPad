'use client';

interface ErrorBannerProps {
  message: string;
  onDismiss: () => void;
}

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div
      style={{
        background: 'rgba(212,83,126,0.08)',
        border: '1px dashed var(--pink)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '12px',
        marginBottom: '20px',
        borderRadius: 0,
      }}
    >
      <div style={{ fontSize: '12px', color: 'var(--pink)', lineHeight: '1.6', flex: 1 }}>
        <span style={{ fontFamily: 'var(--mono)', letterSpacing: '1px' }}>// error: </span>
        {message}
      </div>
      <button
        onClick={onDismiss}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--pink)',
          fontSize: '16px',
          cursor: 'pointer',
          padding: '0 4px',
          lineHeight: 1,
          flexShrink: 0,
        }}
        aria-label="Dismiss error"
      >
        ×
      </button>
    </div>
  );
}
