'use client';

interface RocketSvgProps {
  width?: number;
  height?: number;
}

export default function RocketSvg({ width = 220, height = 210 }: RocketSvgProps) {
  return (
    <svg width={width} height={height} viewBox="0 0 220 210">
      {/* Blast rings */}
      <circle cx="110" cy="192" r="1" fill="#c084fc">
        <animate attributeName="r" from="6" to="40" dur="1.8s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.5" to="0" dur="1.8s" repeatCount="indefinite" />
      </circle>
      <circle cx="110" cy="192" r="1" fill="#7F77DD">
        <animate attributeName="r" from="6" to="40" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" begin="0.6s" repeatCount="indefinite" />
      </circle>
      {/* Rocket */}
      <g style={{ animation: 'rocketHover 3.2s ease-in-out infinite', transformOrigin: '110px 115px' }}>
        {/* Body */}
        <path
          d="M110 22 C110 22 86 64 86 104 L86 154 L110 142 L134 154 L134 104 C134 64 110 22 110 22 Z"
          fill="#1a0f2e"
          stroke="#c084fc"
          strokeWidth="1.5"
        />
        {/* Body highlight */}
        <path
          d="M110 22 C110 22 94 62 94 100 L126 100 C126 62 110 22 110 22 Z"
          fill="#261540"
        />
        {/* Porthole */}
        <circle cx="110" cy="92" r="14" fill="#0d0d14" stroke="#5DCAA5" strokeWidth="1.5" />
        <circle cx="110" cy="92" r="8" fill="#0a2a1e" stroke="#5DCAA5" strokeWidth="1" />
        <circle cx="110" cy="92" r="3.5" fill="#5DCAA5" opacity="0.7" />
        {/* Left fin */}
        <path
          d="M86 104 C86 104 68 114 64 132 C64 132 74 130 86 124 Z"
          fill="#7F77DD"
          stroke="#534AB7"
          strokeWidth="1"
        />
        {/* Right fin */}
        <path
          d="M134 104 C134 104 152 114 156 132 C156 132 146 130 134 124 Z"
          fill="#7F77DD"
          stroke="#534AB7"
          strokeWidth="1"
        />
        {/* Nozzle */}
        <rect x="100" y="136" width="20" height="18" rx="2" fill="#13131a" stroke="#2a2a34" strokeWidth="1" />
        {/* Outer flame */}
        <g style={{ transformOrigin: '110px 154px', animation: 'flameFlicker1 0.24s ease-in-out infinite' }}>
          <path d="M100 154 Q105 180 110 187 Q115 180 120 154 Z" fill="#EF9F27" />
        </g>
        {/* Inner flame */}
        <g style={{ transformOrigin: '110px 154px', animation: 'flameFlicker2 0.17s ease-in-out infinite' }}>
          <path d="M103 154 Q107 172 110 177 Q113 172 117 154 Z" fill="#FAC775" />
        </g>
        {/* Core flame */}
        <path d="M107 154 Q109 163 110 165 Q111 163 113 154 Z" fill="white" opacity="0.75" />
      </g>
      {/* Stars */}
      <circle cx="28" cy="42" r="1.5" fill="#c084fc" style={{ animation: 'starTwinkle 2.5s 0s infinite' }} />
      <circle cx="196" cy="28" r="1.5" fill="#5DCAA5" style={{ animation: 'starTwinkle 2.5s .5s infinite' }} />
      <circle cx="200" cy="96" r="1" fill="#7F77DD" style={{ animation: 'starTwinkle 2.5s 1s infinite' }} />
      <circle cx="18" cy="110" r="1" fill="#5DCAA5" style={{ animation: 'starTwinkle 2.5s .7s infinite' }} />
      <circle cx="190" cy="160" r="1.5" fill="#c084fc" style={{ animation: 'starTwinkle 2.5s 1.3s infinite' }} />
      <circle cx="36" cy="162" r="1" fill="#EF9F27" style={{ animation: 'starTwinkle 2.5s .3s infinite' }} />
    </svg>
  );
}
