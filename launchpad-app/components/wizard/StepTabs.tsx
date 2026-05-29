'use client';

import { useLaunch } from '@/context/LaunchContext';

const TABS = [
  { label: 'input',    num: '01' },
  { label: 'research', num: '02' },
  { label: 'audience', num: '03' },
  { label: 'strategy', num: '04' },
  { label: 'content',  num: '05' },
  { label: 'artifact', num: '06' },
];

export default function StepTabs() {
  const { state, dispatch } = useLaunch();

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        borderBottom: '1px dashed var(--border)',
        overflowX: 'auto',
      }}
    >
      {TABS.map((tab, i) => {
        const isActive = state.currentStep === i;
        const isDone = state.completedSteps.includes(i);
        const isClickable = isDone || i === state.currentStep;

        return (
          <button
            key={i}
            onClick={() => {
              if (isClickable) dispatch({ type: 'GO_STEP', payload: i });
            }}
            disabled={!isClickable}
            style={{
              flex: 1,
              minWidth: '80px',
              padding: '12px 8px',
              textAlign: 'center',
              fontSize: '10px',
              color: isActive ? 'var(--purple)' : isDone ? 'var(--teal)' : 'var(--muted2)',
              letterSpacing: '1px',
              borderRight: i < TABS.length - 1 ? '1px dashed var(--border)' : 'none',
              borderTop: 'none',
              borderLeft: 'none',
              borderBottom: isActive ? '2px solid var(--purple)' : '2px solid transparent',
              background: isActive ? 'rgba(192,132,252,0.04)' : 'none',
              cursor: isClickable ? 'pointer' : 'default',
              transition: 'all 0.2s',
              position: 'relative',
              fontFamily: 'var(--mono)',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: '9px',
                color: isActive ? 'var(--purple)' : isDone ? 'var(--teal)' : 'var(--muted2)',
                marginBottom: '3px',
              }}
            >
              {tab.num}
            </span>
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
