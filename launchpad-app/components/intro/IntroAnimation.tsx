'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface IntroAnimationProps {
  onEnter: () => void;
}

const SUBTEXTS = [
  "now let's get it out there.",
  'find your gap. own your angle.',
  'your launch engine is ready.',
  'replies, upvotes, messages — captured.',
  'download it. share it. launch.',
];

const SCENE_DURATION = 3200;
const TOTAL_SCENES = 5;

function useTypewriter(text: string, active: boolean, delay = 650, speed = 36) {
  const [displayed, setDisplayed] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplayed('');
      return;
    }
    setDisplayed('');
    let i = 0;
    const startTimer = setTimeout(() => {
      const tick = () => {
        setDisplayed(text.slice(0, i));
        i++;
        if (i <= text.length) {
          timerRef.current = setTimeout(tick, speed);
        }
      };
      tick();
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, active, delay, speed]);

  return displayed;
}

/* Scene SVGs */
function Scene1Svg() {
  return (
    <svg width="260" height="190" viewBox="0 0 260 190" style={{ animation: 'floatSlow 5s ease-in-out infinite' }}>
      <rect x="40" y="18" width="180" height="114" rx="5" fill="#13131a" stroke="#2a2a34" strokeWidth="1.5" />
      <rect x="50" y="30" width="160" height="92" rx="3" fill="#0d0d10" />
      <circle cx="62" cy="23" r="3.5" fill="#E24B4A" />
      <circle cx="75" cy="23" r="3.5" fill="#EF9F27" />
      <circle cx="88" cy="23" r="3.5" fill="#5DCAA5" />
      <text x="60" y="50" fontFamily="Space Mono,monospace" fontSize="8" fill="#2a2a3a">~/projects/my-app</text>
      <text x="60" y="64" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5">$ git push origin main</text>
      <text x="60" y="77" fontFamily="Space Mono,monospace" fontSize="8" fill="#2a2a3a">Writing objects: 100%</text>
      <text x="60" y="90" fontFamily="Space Mono,monospace" fontSize="8" fill="#c084fc">Branch main updated.</text>
      <text x="60" y="106" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5">$ </text>
      <rect x="95" y="132" width="70" height="9" rx="2" fill="#1a1a22" />
      <rect x="75" y="141" width="110" height="5" rx="2" fill="#141418" />
      <circle cx="16" cy="56" r="1.5" fill="#c084fc" style={{ animation: 'starTwinkle 3s .2s infinite' }} />
      <circle cx="246" cy="40" r="1.5" fill="#5DCAA5" style={{ animation: 'starTwinkle 3s .9s infinite' }} />
      <circle cx="242" cy="148" r="1" fill="#7F77DD" style={{ animation: 'starTwinkle 3s 1.5s infinite' }} />
      <circle cx="12" cy="140" r="1" fill="#5DCAA5" style={{ animation: 'starTwinkle 3s .6s infinite' }} />
    </svg>
  );
}

function Scene2Svg() {
  return (
    <svg width="270" height="200" viewBox="0 0 270 200" style={{ animation: 'floatSlow 5s .5s ease-in-out infinite' }}>
      <circle cx="135" cy="98" r="74" fill="none" stroke="#16161e" strokeWidth="1" />
      <circle cx="135" cy="98" r="54" fill="none" stroke="#1e1e28" strokeWidth="1" strokeDasharray="4,3" />
      <circle cx="135" cy="98" r="34" fill="none" stroke="#252532" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="135" y1="24" x2="135" y2="172" stroke="#141420" strokeWidth="0.5" />
      <line x1="61" y1="98" x2="209" y2="98" stroke="#141420" strokeWidth="0.5" />
      <rect x="50" y="26" width="60" height="26" rx="3" fill="#1a0f2e" stroke="#534AB7" strokeWidth="1" />
      <text x="80" y="43" fontFamily="Space Mono,monospace" fontSize="8" fill="#c084fc" textAnchor="middle">Linear</text>
      <rect x="164" y="46" width="60" height="26" rx="3" fill="#0d1f1a" stroke="#0F6E56" strokeWidth="1" />
      <text x="194" y="63" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5" textAnchor="middle">Notion</text>
      <rect x="164" y="136" width="60" height="26" rx="3" fill="#1f1200" stroke="#854F0B" strokeWidth="1" />
      <text x="194" y="153" fontFamily="Space Mono,monospace" fontSize="8" fill="#EF9F27" textAnchor="middle">Trello</text>
      <rect x="48" y="136" width="60" height="26" rx="3" fill="#1a1228" stroke="#993556" strokeWidth="1" />
      <text x="78" y="153" fontFamily="Space Mono,monospace" fontSize="8" fill="#ED93B1" textAnchor="middle">Asana</text>
      <circle cx="135" cy="98" r="11" fill="#1a0f2e" stroke="#c084fc" strokeWidth="1.5" />
      <text x="135" y="102" fontFamily="Space Mono,monospace" fontSize="7" fill="#c084fc" textAnchor="middle">YOU</text>
      <line x1="135" y1="98" x2="80" y2="39" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.5" />
      <line x1="135" y1="98" x2="194" y2="59" stroke="#0F6E56" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.5" />
      <line x1="135" y1="98" x2="194" y2="149" stroke="#854F0B" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.5" />
      <line x1="135" y1="98" x2="78" y2="149" stroke="#993556" strokeWidth="0.5" strokeDasharray="3,2" opacity="0.5" />
      <circle cx="135" cy="98" r="74" fill="none" stroke="#c084fc" strokeWidth="0.5" strokeDasharray="2,8" opacity="0.25" style={{ animation: 'scanPulse 3s ease-in-out infinite' }} />
    </svg>
  );
}

function Scene3Svg() {
  return (
    <svg width="220" height="210" viewBox="0 0 220 210">
      <circle cx="110" cy="192" r="1" fill="#c084fc">
        <animate attributeName="r" from="6" to="40" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="192" r="1" fill="#7F77DD">
        <animate attributeName="r" from="6" to="40" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      <g style={{ animation: 'rocketHover 3.2s ease-in-out infinite', transformOrigin: '110px 115px' }}>
        <path d="M110 22 C110 22 86 64 86 104 L86 154 L110 142 L134 154 L134 104 C134 64 110 22 110 22 Z" fill="#1a0f2e" stroke="#c084fc" strokeWidth="1.5" />
        <path d="M110 22 C110 22 94 62 94 100 L126 100 C126 62 110 22 110 22 Z" fill="#261540" />
        <circle cx="110" cy="92" r="14" fill="#0d0d14" stroke="#5DCAA5" strokeWidth="1.5" />
        <circle cx="110" cy="92" r="8" fill="#0a2a1e" stroke="#5DCAA5" strokeWidth="1" />
        <circle cx="110" cy="92" r="3.5" fill="#5DCAA5" opacity="0.7" />
        <path d="M86 104 C86 104 68 114 64 132 C64 132 74 130 86 124 Z" fill="#7F77DD" stroke="#534AB7" strokeWidth="1" />
        <path d="M134 104 C134 104 152 114 156 132 C156 132 146 130 134 124 Z" fill="#7F77DD" stroke="#534AB7" strokeWidth="1" />
        <rect x="100" y="136" width="20" height="18" rx="2" fill="#13131a" stroke="#2a2a34" strokeWidth="1" />
        <g style={{ transformOrigin: '110px 154px', animation: 'flameFlicker1 0.24s ease-in-out infinite' }}>
          <path d="M100 154 Q105 180 110 187 Q115 180 120 154 Z" fill="#EF9F27" />
        </g>
        <g style={{ transformOrigin: '110px 154px', animation: 'flameFlicker2 0.17s ease-in-out infinite' }}>
          <path d="M103 154 Q107 172 110 177 Q113 172 117 154 Z" fill="#FAC775" />
        </g>
        <path d="M107 154 Q109 163 110 165 Q111 163 113 154 Z" fill="white" opacity="0.75" />
      </g>
      <circle cx="28" cy="42" r="1.5" fill="#c084fc" style={{ animation: 'starTwinkle 2.5s 0s infinite' }} />
      <circle cx="196" cy="28" r="1.5" fill="#5DCAA5" style={{ animation: 'starTwinkle 2.5s .5s infinite' }} />
      <circle cx="200" cy="96" r="1" fill="#7F77DD" style={{ animation: 'starTwinkle 2.5s 1s infinite' }} />
      <circle cx="18" cy="110" r="1" fill="#5DCAA5" style={{ animation: 'starTwinkle 2.5s .7s infinite' }} />
      <circle cx="190" cy="160" r="1.5" fill="#c084fc" style={{ animation: 'starTwinkle 2.5s 1.3s infinite' }} />
      <circle cx="36" cy="162" r="1" fill="#EF9F27" style={{ animation: 'starTwinkle 2.5s .3s infinite' }} />
    </svg>
  );
}

function Scene4Svg() {
  return (
    <svg width="280" height="205" viewBox="0 0 280 205" style={{ animation: 'floatSlow 5s 1s ease-in-out infinite' }}>
      <circle cx="140" cy="102" r="34" fill="#1a0f2e" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4,2" />
      <text x="140" y="98" fontFamily="Space Mono,monospace" fontSize="8" fill="#c084fc" textAnchor="middle">your</text>
      <text x="140" y="110" fontFamily="Space Mono,monospace" fontSize="8" fill="#c084fc" textAnchor="middle">product</text>
      <g style={{ animation: 'notifPop 0.6s 0.1s ease both' }}>
        <rect x="174" y="38" width="80" height="32" rx="4" fill="#13131a" stroke="#5DCAA5" strokeWidth="1" />
        <text x="214" y="53" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5" textAnchor="middle">twitter</text>
        <text x="214" y="64" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e3a" textAnchor="middle">+14 replies</text>
        <line x1="174" y1="54" x2="168" y2="82" stroke="#5DCAA5" strokeWidth="0.5" strokeDasharray="3,2" />
      </g>
      <g style={{ animation: 'notifPop 0.6s 0.4s ease both' }}>
        <rect x="28" y="34" width="80" height="32" rx="4" fill="#13131a" stroke="#EF9F27" strokeWidth="1" />
        <text x="68" y="49" fontFamily="Space Mono,monospace" fontSize="8" fill="#EF9F27" textAnchor="middle">reddit</text>
        <text x="68" y="60" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e3a" textAnchor="middle">+28 upvotes</text>
        <line x1="108" y1="50" x2="115" y2="80" stroke="#EF9F27" strokeWidth="0.5" strokeDasharray="3,2" />
      </g>
      <g style={{ animation: 'notifPop 0.6s 0.7s ease both' }}>
        <rect x="28" y="148" width="80" height="32" rx="4" fill="#13131a" stroke="#7F77DD" strokeWidth="1" />
        <text x="68" y="162" fontFamily="Space Mono,monospace" fontSize="7" fill="#7F77DD" textAnchor="middle">product hunt</text>
        <text x="68" y="173" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e3a" textAnchor="middle">+62 upvotes</text>
        <line x1="108" y1="164" x2="115" y2="126" stroke="#7F77DD" strokeWidth="0.5" strokeDasharray="3,2" />
      </g>
      <g style={{ animation: 'notifPop 0.6s 1s ease both' }}>
        <rect x="174" y="148" width="80" height="32" rx="4" fill="#13131a" stroke="#D4537E" strokeWidth="1" />
        <text x="214" y="162" fontFamily="Space Mono,monospace" fontSize="8" fill="#D4537E" textAnchor="middle">discord</text>
        <text x="214" y="173" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e3a" textAnchor="middle">+7 messages</text>
        <line x1="174" y1="164" x2="168" y2="126" stroke="#D4537E" strokeWidth="0.5" strokeDasharray="3,2" />
      </g>
    </svg>
  );
}

function Scene5Svg() {
  return (
    <svg width="270" height="200" viewBox="0 0 270 200" style={{ animation: 'floatSlow 5s .8s ease-in-out infinite' }}>
      <g style={{ animation: 'docReveal 0.8s 0.1s ease both' }}>
        <rect x="55" y="12" width="160" height="158" rx="5" fill="#13131a" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="4,2" />
        <rect x="55" y="12" width="160" height="36" rx="5" fill="#1a0f2e" />
        <rect x="55" y="36" width="160" height="12" fill="#1a0f2e" />
        <text x="135" y="33" fontFamily="Space Mono,monospace" fontSize="9" fontWeight="700" fill="#c084fc" textAnchor="middle">launch_strategy.pdf</text>
        <text x="135" y="51" fontFamily="Space Mono,monospace" fontSize="7" fill="#3a2060" textAnchor="middle">generated by LaunchPad AI</text>
        <line x1="67" y1="60" x2="203" y2="60" stroke="#1e1e2a" strokeWidth="1" />
        <text x="67" y="74" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e46">// channels</text>
        <text x="67" y="86" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5">01  twitter / X</text>
        <text x="67" y="98" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5">02  r/SideProject</text>
        <text x="67" y="110" fontFamily="Space Mono,monospace" fontSize="8" fill="#5DCAA5">03  product hunt</text>
        <line x1="67" y1="118" x2="203" y2="118" stroke="#1e1e2a" strokeWidth="1" />
        <text x="67" y="132" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e46">// audience</text>
        <text x="67" y="144" fontFamily="Space Mono,monospace" fontSize="8" fill="#7F77DD">solo founders · indie hackers</text>
        <text x="67" y="156" fontFamily="Space Mono,monospace" fontSize="7" fill="#2e2e46">// angle: lightweight, no bloat</text>
        <polyline
          points="186,152 196,163 214,140"
          fill="none"
          stroke="#5DCAA5"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="40"
          strokeDashoffset="40"
          style={{ animation: 'checkDraw 0.5s 0.9s ease forwards' }}
        />
        <circle cx="200" cy="154" r="16" fill="none" stroke="#5DCAA5" strokeWidth="1" opacity="0.25" />
      </g>
      <circle cx="22" cy="36" r="1.5" fill="#c084fc" style={{ animation: 'starTwinkle 3s 0s infinite' }} />
      <circle cx="248" cy="24" r="1.5" fill="#5DCAA5" style={{ animation: 'starTwinkle 3s .7s infinite' }} />
      <circle cx="250" cy="168" r="1" fill="#7F77DD" style={{ animation: 'starTwinkle 3s 1.2s infinite' }} />
      <circle cx="18" cy="166" r="1" fill="#EF9F27" style={{ animation: 'starTwinkle 3s .4s infinite' }} />
    </svg>
  );
}

const SCENE_TAGS = [
  '// 01   the builder',
  '// 02   scanning the market',
  '// 03   ignition',
  '// 04   the world responds',
  '// 05   your launch plan',
];

const TITLES = [
  'you built something.',
  'scanning the landscape.',
  'LaunchPad AI',
  'the world responds.',
  'your plan is ready.',
];

const SCENE_SVGS = [Scene1Svg, Scene2Svg, Scene3Svg, Scene4Svg, Scene5Svg];

export default function IntroAnimation({ onEnter }: IntroAnimationProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goToScene = useCallback((n: number) => {
    setTitleVisible(false);
    setTimeout(() => {
      setCurrent(n);
      setTitleVisible(true);
    }, 50);
  }, []);

  const scheduleNext = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrent(prev => {
        if (prev < TOTAL_SCENES - 1) {
          const next = prev + 1;
          setTitleVisible(false);
          setTimeout(() => {
            setCurrent(next);
            setTitleVisible(true);
          }, 50);
          return prev; // will update via setTimeout
        }
        return prev;
      });
    }, SCENE_DURATION);
  }, []);

  useEffect(() => {
    if (!paused && current < TOTAL_SCENES - 1) {
      scheduleNext();
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, paused, scheduleNext]);

  const handleSkipTo = (n: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    goToScene(n);
    if (n < TOTAL_SCENES - 1 && !paused) {
      setTimeout(() => scheduleNext(), 100);
    }
  };

  const subtitle = useTypewriter(SUBTEXTS[current], titleVisible, 650, 36);
  const SceneSvg = SCENE_SVGS[current];

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px 80px',
        position: 'relative',
        zIndex: 1,
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => {
        setPaused(false);
        if (current < TOTAL_SCENES - 1) scheduleNext();
      }}
    >
      {/* Scene */}
      <div
        key={current}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: '520px',
          animation: 'sceneIn 0.5s ease',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            letterSpacing: '3px',
            color: 'var(--muted2)',
            marginBottom: '20px',
            fontFamily: 'var(--mono)',
          }}
        >
          {SCENE_TAGS[current]}
        </div>

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
          <SceneSvg />
        </div>

        <div
          style={{
            fontFamily: 'var(--font-syne), sans-serif',
            fontSize: 'clamp(26px, 5vw, 36px)',
            fontWeight: 800,
            color: 'var(--purple)',
            letterSpacing: '-1px',
            textAlign: 'center',
            opacity: titleVisible ? 1 : 0,
            transition: 'opacity 0.7s ease',
            marginBottom: '10px',
          }}
        >
          {TITLES[current]}
        </div>

        <div
          style={{
            fontSize: '12px',
            color: 'var(--muted)',
            textAlign: 'center',
            minHeight: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--mono)',
          }}
        >
          {subtitle}
          <span
            style={{
              display: 'inline-block',
              width: '7px',
              height: '13px',
              background: 'var(--purple)',
              marginLeft: '1px',
              verticalAlign: 'middle',
              animation: 'blink 1s step-end infinite',
            }}
          />
        </div>

        {/* Enter button on last scene */}
        {current === TOTAL_SCENES - 1 && (
          <button
            onClick={onEnter}
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '14px',
              fontWeight: 700,
              background: 'var(--purple)',
              color: '#0a0a0c',
              border: 'none',
              padding: '13px 32px',
              marginTop: '20px',
              cursor: 'pointer',
              letterSpacing: '-0.3px',
              transition: 'background 0.2s',
            }}
            onMouseOver={e => { (e.target as HTMLButtonElement).style.background = '#a855f7'; }}
            onMouseOut={e => { (e.target as HTMLButtonElement).style.background = '#c084fc'; }}
          >
            enter launchpad ↗
          </button>
        )}
      </div>

      {/* Controls */}
      <div
        style={{
          position: 'fixed',
          bottom: '28px',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 10,
        }}
      >
        {/* Dots */}
        <div style={{ display: 'flex', gap: '10px' }}>
          {Array.from({ length: TOTAL_SCENES }).map((_, i) => (
            <button
              key={i}
              onClick={() => handleSkipTo(i)}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: current === i ? 'var(--purple)' : 'var(--border2)',
                border: 'none',
                cursor: 'pointer',
                transform: current === i ? 'scale(1.4)' : 'scale(1)',
                transition: 'background 0.3s, transform 0.2s',
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* Skip */}
        {current < TOTAL_SCENES - 1 && (
          <button
            onClick={() => handleSkipTo(TOTAL_SCENES - 1)}
            style={{
              fontSize: '10px',
              color: 'var(--muted2)',
              background: 'none',
              border: 'none',
              letterSpacing: '1px',
              transition: 'color 0.2s',
              cursor: 'pointer',
              fontFamily: 'var(--mono)',
            }}
            onMouseOver={e => { (e.target as HTMLButtonElement).style.color = 'var(--purple)'; }}
            onMouseOut={e => { (e.target as HTMLButtonElement).style.color = 'var(--muted2)'; }}
          >
            skip intro
          </button>
        )}

        {/* Pause indicator */}
        {paused && (
          <div style={{ fontSize: '9px', color: 'var(--muted2)', letterSpacing: '2px', fontFamily: 'var(--mono)' }}>
            // paused
          </div>
        )}
      </div>
    </div>
  );
}
