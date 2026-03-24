"use client";

export default function BasketballHoop() {
  return (
    <div className="relative w-[200px] h-[180px] sm:w-[260px] sm:h-[220px] mx-auto mb-6">
      <svg
        viewBox="0 0 260 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Backboard */}
        <rect
          x="80" y="20" width="100" height="60" rx="4"
          fill="#111827"
          stroke="rgba(0,26,161,0.5)"
          strokeWidth="2"
        />
        {/* Backboard inner square */}
        <rect
          x="110" y="35" width="40" height="30" rx="2"
          fill="none"
          stroke="rgba(0,26,161,0.3)"
          strokeWidth="1.5"
        />

        {/* Rim - left */}
        <line x1="105" y1="80" x2="80" y2="85" stroke="#FF6B2B" strokeWidth="3" strokeLinecap="round" />
        {/* Rim - right */}
        <line x1="155" y1="80" x2="180" y2="85" stroke="#FF6B2B" strokeWidth="3" strokeLinecap="round" />
        {/* Rim front arc */}
        <ellipse cx="130" cy="85" rx="50" ry="6" fill="none" stroke="#FF6B2B" strokeWidth="2.5" strokeDasharray="0" />

        {/* Net lines */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const x1 = 85 + i * 15;
          const x2 = 90 + i * 12;
          const sway = i % 2 === 0 ? 3 : -3;
          return (
            <line
              key={`net-${i}`}
              x1={x1}
              y1="90"
              x2={x2 + sway}
              y2="140"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          );
        })}
        {/* Net cross threads */}
        {[0, 1, 2].map((i) => (
          <ellipse
            key={`cross-${i}`}
            cx="130"
            cy={100 + i * 15}
            rx={40 - i * 8}
            ry="3"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
        ))}

        {/* Basketball - animated arc into hoop */}
        <circle r="14" fill="#FF6B2B" opacity="0.9">
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M 30,180 C 30,100 80,-20 130,75"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
            calcMode="spline"
          />
          <animate
            attributeName="opacity"
            values="0.9;0.9;0.9;0"
            keyTimes="0;0.7;0.85;1"
            dur="2.5s"
            repeatCount="indefinite"
          />
        </circle>
        {/* Ball seam lines */}
        <g>
          <animateMotion
            dur="2.5s"
            repeatCount="indefinite"
            path="M 30,180 C 30,100 80,-20 130,75"
            keyTimes="0;1"
            keySplines="0.4 0 0.2 1"
            calcMode="spline"
          />
          <line x1="-14" y1="0" x2="14" y2="0" stroke="#CC5520" strokeWidth="1" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.5;0.5;0" keyTimes="0;0.7;0.85;1" dur="2.5s" repeatCount="indefinite" />
          </line>
          <line x1="0" y1="-14" x2="0" y2="14" stroke="#CC5520" strokeWidth="1" opacity="0.5">
            <animate attributeName="opacity" values="0.5;0.5;0.5;0" keyTimes="0;0.7;0.85;1" dur="2.5s" repeatCount="indefinite" />
          </line>
        </g>

        {/* Ball dropping through net — appears after arc completes */}
        <circle r="13" fill="#FF6B2B" opacity="0">
          <animate
            attributeName="cy"
            values="85;145;160"
            keyTimes="0;0.6;1"
            dur="0.8s"
            begin="2s"
            repeatCount="indefinite"
            keySplines="0.4 0 1 1;0.4 0 1 1"
            calcMode="spline"
          />
          <animate
            attributeName="cx"
            values="130;130;130"
            dur="0.8s"
            begin="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0;0.85;0.85;0"
            keyTimes="0;0.05;0.7;1"
            dur="0.8s"
            begin="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="r"
            values="13;12;11"
            dur="0.8s"
            begin="2s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Rim glow */}
        <ellipse cx="130" cy="85" rx="50" ry="6" fill="none" stroke="#FF6B2B" strokeWidth="1" opacity="0.3">
          <animate attributeName="opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" />
        </ellipse>
      </svg>
    </div>
  );
}
