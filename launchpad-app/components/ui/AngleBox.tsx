'use client';

interface AngleBoxProps {
  value: string;
  onChange: (v: string) => void;
}

export default function AngleBox({ value, onChange }: AngleBoxProps) {
  return (
    <div
      style={{
        border: '1.5px dashed var(--purple3)',
        padding: '16px 18px',
        background: 'rgba(127,119,221,0.04)',
        marginBottom: '24px',
        position: 'relative',
      }}
    >
      {/* Corner brackets */}
      <span
        style={{
          position: 'absolute',
          top: '-2px',
          left: '-2px',
          width: '8px',
          height: '8px',
          borderTop: '2px solid var(--purple3)',
          borderLeft: '2px solid var(--purple3)',
          display: 'block',
        }}
      />
      <span
        style={{
          position: 'absolute',
          top: '-2px',
          right: '-2px',
          width: '8px',
          height: '8px',
          borderTop: '2px solid var(--purple3)',
          borderRight: '2px solid var(--purple3)',
          display: 'block',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '-2px',
          left: '-2px',
          width: '8px',
          height: '8px',
          borderBottom: '2px solid var(--purple3)',
          borderLeft: '2px solid var(--purple3)',
          display: 'block',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '-2px',
          right: '-2px',
          width: '8px',
          height: '8px',
          borderBottom: '2px solid var(--purple3)',
          borderRight: '2px solid var(--purple3)',
          display: 'block',
        }}
      />

      <div
        style={{
          fontSize: '11px',
          color: 'var(--purple3)',
          letterSpacing: '2px',
          marginBottom: '10px',
          fontFamily: 'var(--mono)',
        }}
      >
        // your angle — edit if needed
      </div>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          background: 'transparent',
          border: 'none',
          borderBottom: '1px dashed var(--purple3)',
          color: 'var(--purple)',
          fontFamily: 'var(--mono)',
          fontSize: '14px',
          lineHeight: '1.6',
          padding: '4px 0',
          outline: 'none',
          resize: 'vertical',
        }}
      />
    </div>
  );
}
