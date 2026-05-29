'use client';

import { useState } from 'react';
import { useLaunch } from '@/context/LaunchContext';
import { generatePDF } from '@/lib/api';
import ErrorBanner from '@/components/ui/ErrorBanner';

const Section = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div style={{ marginBottom: '28px' }}>
    <div style={{ fontSize: '10px', color: 'var(--muted2)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: 'var(--mono)' }}>
      // {label}
    </div>
    {children}
  </div>
);

export default function Step5() {
  const { state, dispatch } = useLaunch();
  const [pdfLoading, setPdfLoading] = useState(false);

  const selectedDemos = state.demographics.filter(d => d.selected);
  const sortedChannels = [...state.channels].sort((a, b) => a.priority - b.priority);
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toLowerCase();
  const projectName = state.repoName || 'your_project';

  const handleDownloadPDF = async () => {
    setPdfLoading(true);
    try {
      const blob = await generatePDF(state);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${projectName}_strategy.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      dispatch({ type: 'SET_ERROR', payload: err instanceof Error ? err.message : 'Failed to generate PDF' });
    } finally {
      setPdfLoading(false);
    }
  };

  return (
    <div>
      {state.error && (
        <ErrorBanner message={state.error} onDismiss={() => dispatch({ type: 'SET_ERROR', payload: null })} />
      )}

      {/* Page hero */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '40px' }}>
        <div style={{ width: '48px', height: '48px', flexShrink: 0, border: '1.5px dashed var(--purple3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.5" width="24" height="24">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="13" x2="12" y2="19" />
            <polyline points="9 16 12 19 15 16" />
          </svg>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '24px', fontWeight: 700, color: 'var(--text)', lineHeight: 1.15 }}>
            your launch plan is ready
          </div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '5px', letterSpacing: '1px' }}>
            // {projectName} · {dateStr}
          </div>
        </div>
      </div>

      {/* Tagline hero block */}
      {state.tagline && (
        <div style={{
          background: 'linear-gradient(135deg, #1a0f2e 0%, #0d0d14 100%)',
          border: '1px solid rgba(192,132,252,0.3)',
          padding: '32px 28px',
          marginBottom: '32px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--purple), transparent)' }} />
          <div style={{ fontSize: '10px', color: 'var(--purple3)', letterSpacing: '3px', marginBottom: '12px', fontFamily: 'var(--mono)' }}>// tagline</div>
          <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 800, color: 'var(--purple)', lineHeight: 1.2, letterSpacing: '-0.5px' }}>
            {state.tagline}
          </div>
          {state.positioningStatement && (
            <div style={{ fontSize: '13px', color: 'var(--muted)', marginTop: '12px', lineHeight: 1.7, maxWidth: '560px' }}>
              {state.positioningStatement}
            </div>
          )}
        </div>
      )}

      {/* Positioning angle */}
      {state.positioningAngle && (
        <div style={{ border: '1.5px dashed var(--purple3)', padding: '20px 22px', marginBottom: '32px', background: 'rgba(127,119,221,0.04)', position: 'relative' }}>
          <span style={{ position: 'absolute', top: '-2px', left: '-2px', width: '8px', height: '8px', borderTop: '2px solid var(--purple3)', borderLeft: '2px solid var(--purple3)', display: 'block' }} />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', borderTop: '2px solid var(--purple3)', borderRight: '2px solid var(--purple3)', display: 'block' }} />
          <span style={{ position: 'absolute', bottom: '-2px', left: '-2px', width: '8px', height: '8px', borderBottom: '2px solid var(--purple3)', borderLeft: '2px solid var(--purple3)', display: 'block' }} />
          <span style={{ position: 'absolute', bottom: '-2px', right: '-2px', width: '8px', height: '8px', borderBottom: '2px solid var(--purple3)', borderRight: '2px solid var(--purple3)', display: 'block' }} />
          <div style={{ fontSize: '10px', color: 'var(--purple3)', letterSpacing: '3px', marginBottom: '10px', fontFamily: 'var(--mono)' }}>// your angle</div>
          <div style={{ fontSize: '15px', color: 'var(--purple)', lineHeight: 1.7, fontFamily: 'var(--mono)' }}>{state.positioningAngle}</div>
        </div>
      )}

      {/* Channels */}
      {sortedChannels.length > 0 && (
        <Section label="launch channels">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {sortedChannels.map((ch, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                padding: '14px 16px',
                background: 'var(--bg2)',
                borderLeft: ch.isPrimary ? '3px solid var(--purple)' : '3px solid var(--border)',
              }}>
                <div style={{
                  width: '40px', height: '40px', flexShrink: 0,
                  border: ch.isPrimary ? '1.5px dashed var(--purple)' : '1.5px dashed var(--border2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 700, fontFamily: 'var(--mono)',
                  color: ch.isPrimary ? 'var(--purple)' : 'var(--muted)',
                }}>
                  {ch.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-syne), sans-serif', fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                    {ch.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.6 }}>{ch.why}</div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--purple)', border: '1px dashed var(--purple)', padding: '3px 10px', flexShrink: 0, letterSpacing: '1px' }}>
                  #{ch.priority}
                </span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Two-col: audience + tone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {selectedDemos.length > 0 && (
          <div>
            <div style={{ fontSize: '10px', color: 'var(--muted2)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: 'var(--mono)' }}>
              // audience
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {selectedDemos.map((d, i) => (
                <span key={i} style={{
                  fontSize: '12px', padding: '5px 14px',
                  border: '1.5px solid var(--teal)',
                  color: 'var(--teal)', background: 'rgba(93,202,165,0.06)',
                  borderRadius: '9999px',
                }}>
                  {d.label}
                </span>
              ))}
            </div>
          </div>
        )}
        {state.tone && (
          <div>
            <div style={{ fontSize: '10px', color: 'var(--muted2)', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '14px', fontFamily: 'var(--mono)' }}>
              // messaging tone
            </div>
            <span style={{
              fontSize: '13px', padding: '6px 18px',
              border: '1.5px solid var(--purple3)',
              color: 'var(--purple3)', background: 'rgba(127,119,221,0.08)',
              borderRadius: '9999px', fontFamily: 'var(--mono)',
            }}>
              {state.tone}
            </span>
          </div>
        )}
      </div>

      {/* GitHub tips */}
      {state.githubTips.length > 0 && (
        <Section label="github moves">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {state.githubTips.map((tip, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '14px 16px', background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '11px', color: 'var(--purple)', letterSpacing: '1px', flexShrink: 0, paddingTop: '1px' }}>→ 0{i + 1}</span>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.6 }}>{tip}</div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Opportunity note */}
      {state.opportunityNote && (
        <div style={{ background: '#1a1200', border: '1px solid #854F0B', padding: '18px 20px', marginBottom: '32px' }}>
          <div style={{ fontSize: '10px', color: 'var(--amber)', letterSpacing: '3px', marginBottom: '10px', fontFamily: 'var(--mono)' }}>// opportunity</div>
          <div style={{ fontSize: '13px', color: 'var(--amber)', lineHeight: 1.7 }}>{state.opportunityNote}</div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          style={{
            flex: 2, minWidth: '160px', padding: '14px 20px',
            fontSize: '13px', letterSpacing: '1px', fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            background: pdfLoading ? 'var(--purple2)' : 'var(--purple)',
            border: 'none', color: '#0a0a0c',
            fontFamily: 'var(--font-syne), sans-serif',
            cursor: pdfLoading ? 'wait' : 'pointer',
            transition: 'background 0.15s',
            opacity: pdfLoading ? 0.8 : 1,
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="12" y1="13" x2="12" y2="19" />
            <polyline points="9 16 12 19 15 16" />
          </svg>
          {pdfLoading ? 'generating...' : 'download PDF'}
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          style={{
            flex: 1, minWidth: '120px', padding: '14px 20px',
            fontSize: '12px', letterSpacing: '1px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'var(--bg2)', border: '1px dashed var(--border2)',
            color: 'var(--muted)', fontFamily: 'var(--mono)', cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          ↺ start over
        </button>
      </div>
    </div>
  );
}
