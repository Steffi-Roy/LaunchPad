'use client';

interface TagProps {
  label: string;
  selected: boolean;
  onToggle: () => void;
}

export default function Tag({ label, selected, onToggle }: TagProps) {
  return (
    <button
      onClick={onToggle}
      style={{
        fontSize: '12px',
        padding: '6px 16px',
        cursor: 'pointer',
        border: selected ? '1.5px solid var(--teal)' : '1.5px dashed var(--border2)',
        borderRadius: '9999px',
        color: selected ? 'var(--teal)' : 'var(--muted)',
        background: selected ? 'rgba(93,202,165,0.06)' : 'transparent',
        fontFamily: 'var(--mono)',
        transition: 'all 0.15s',
      }}
    >
      {label}
    </button>
  );
}
