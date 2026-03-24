"use client";

// NBA-logo-style silhouette dividers
type Pose = "dunk" | "shooter" | "layup" | "crossover";

const silhouettes: Record<Pose, string> = {
  // Dunking player silhouette - arm extended up with ball
  dunk: "M 50,10 C 48,8 46,6 48,3 C 50,0 54,0 56,3 C 58,6 56,8 54,10 L 55,14 L 62,10 L 65,12 L 57,18 L 56,28 L 62,38 L 58,42 L 52,32 L 48,42 L 44,38 L 50,28 L 49,18 L 42,14 L 44,10 Z",
  // Three-point shooter - jumping, ball released high
  shooter: "M 50,12 C 48,10 46,8 48,5 C 50,2 54,2 56,5 C 58,8 56,10 54,12 L 55,16 L 60,10 L 63,12 L 58,18 L 56,26 L 62,22 L 64,25 L 56,30 L 54,40 L 58,48 L 55,50 L 50,40 L 46,50 L 43,48 L 48,38 L 46,28 L 40,22 L 42,18 Z",
  // Layup - reaching forward
  layup: "M 55,10 C 53,8 51,6 53,3 C 55,0 59,0 61,3 C 63,6 61,8 59,10 L 60,14 L 66,8 L 69,10 L 62,18 L 61,26 L 66,36 L 63,40 L 57,30 L 53,30 L 48,40 L 44,38 L 50,28 L 52,18 L 46,14 L 48,10 Z",
  // Crossover dribble
  crossover: "M 50,12 C 48,10 46,8 48,5 C 50,2 54,2 56,5 C 58,8 56,10 54,12 L 54,16 L 58,14 L 62,18 L 56,20 L 55,28 L 60,38 L 56,42 L 52,32 L 48,42 L 44,38 L 50,28 L 48,20 L 40,24 L 38,20 L 46,16 Z",
};

export default function SilhouetteDivider({
  pose = "dunk",
  flip = false,
}: {
  pose?: Pose;
  flip?: boolean;
}) {
  return (
    <div className="relative py-4 flex items-center justify-center overflow-hidden">
      {/* Three-point arc line */}
      <svg
        viewBox="0 0 1200 60"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M 0,55 Q 600,-15 1200,55"
          stroke="rgba(0,26,161,0.2)"
          strokeWidth="1.5"
          fill="none"
        />
        {/* Glow version */}
        <path
          d="M 0,55 Q 600,-15 1200,55"
          stroke="rgba(0,26,161,0.08)"
          strokeWidth="6"
          fill="none"
        />
      </svg>

      {/* Silhouette in the center */}
      <div
        className="relative z-10"
        style={{ transform: flip ? "scaleX(-1)" : undefined }}
      >
        <svg
          viewBox="30 -2 50 55"
          className="w-10 h-10 sm:w-12 sm:h-12"
          fill="none"
        >
          <path
            d={silhouettes[pose]}
            fill="rgba(0,26,161,0.35)"
          />
          {/* Subtle glow behind */}
          <path
            d={silhouettes[pose]}
            fill="rgba(0,26,161,0.15)"
            filter="blur(3px)"
          />
        </svg>
      </div>
    </div>
  );
}
