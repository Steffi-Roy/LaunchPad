'use client';

interface LoadingOverlayProps {
  message: string;
}

export default function LoadingOverlay({ message }: LoadingOverlayProps) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(10,10,12,0.88)',
        backdropFilter: 'blur(6px)',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: '44px',
          height: '44px',
          border: '2px solid var(--border)',
          borderTopColor: 'var(--purple)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          color: 'var(--muted)',
          letterSpacing: '1px',
          textAlign: 'center',
          maxWidth: '280px',
        }}
      >
        {message}
      </div>
    </div>
  );
}
