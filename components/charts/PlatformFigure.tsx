export function PlatformFigure() {
  return (
    <svg viewBox="0 0 720 250" role="img" aria-label="GTA as a pipeline opening into a two-sided platform" className="w-full h-auto">
      <rect width="720" height="250" fill="#fbf8f1" />

      <text x="360" y="22" textAnchor="middle" fill="#1d3557" fontSize="13">
        Cross-side: more missions make the player base more valuable, and more players make missions worth building
      </text>

      <rect x="24" y="40" width="200" height="72" rx="6" fill="#f4efe4" stroke="#1c1915" />
      <text x="124" y="68" textAnchor="middle" fill="#1c1915" fontSize="16" fontWeight="600">Players</text>
      <text x="124" y="90" textAnchor="middle" fill="#8f2d2d" fontSize="13">Money side</text>

      <rect x="260" y="40" width="200" height="72" rx="6" fill="#1d3557" />
      <text x="360" y="68" textAnchor="middle" fill="#fbf8f1" fontSize="16" fontWeight="600">Rockstar</text>
      <text x="360" y="90" textAnchor="middle" fill="#d5deea" fontSize="12">Owns the world and the price</text>

      <rect x="496" y="40" width="200" height="72" rx="6" fill="#f4efe4" stroke="#1e4d3a" />
      <text x="596" y="68" textAnchor="middle" fill="#1c1915" fontSize="16" fontWeight="600">Creators</text>
      <text x="596" y="90" textAnchor="middle" fill="#1e4d3a" fontSize="13">Subsidy side</text>

      <text x="124" y="132" textAnchor="middle" fill="#8f2d2d" fontSize="12">Pay $79.99, Ultimate, GTA+</text>
      <text x="360" y="132" textAnchor="middle" fill="#8a5a12" fontSize="12">Ships a single-player pipeline first</text>
      <text x="596" y="132" textAnchor="middle" fill="#1e4d3a" fontSize="12">Mission Creator stays free</text>

      <rect x="150" y="156" width="420" height="44" rx="6" fill="#f4efe4" stroke="#8a5a12" />
      <text x="360" y="183" textAnchor="middle" fill="#1c1915" fontSize="14">
        Same-side among players is positive. A console-only launch cuts that network on day one.
      </text>
      <text x="360" y="228" textAnchor="middle" fill="#6f685c" fontSize="13">
        Among creators, same-side effects can turn negative if missions compete for attention.
      </text>
    </svg>
  );
}
