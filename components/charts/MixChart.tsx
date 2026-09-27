const rows = [
  { label: "FY24 revenue", rcs: 4213.5, full: 1136.1 },
  { label: "FY25 revenue", rcs: 4474.6, full: 1159.0 },
  { label: "FY26 revenue", rcs: 5196.6, full: 1459.8 },
  { label: "FY26 bookings", rcs: 0.78 * 6721, full: 0.22 * 6721 },
  { label: "FY27 guide", rcs: 0.64 * 8100, full: 0.36 * 8100 },
];

export function MixChart() {
  const w = 720;
  const h = 310;
  const left = 130;
  const top = 16;
  const rowH = 34;
  const max = 8200;
  const barW = 300;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Recurrent spending and full-game revenue" className="w-full h-auto">
      <rect width={w} height={h} fill="#fbf8f1" />
      {rows.map((row, i) => {
        const y = top + i * (rowH + 10);
        const rcsW = (row.rcs / max) * barW;
        const fullW = (row.full / max) * barW;
        return (
          <g key={row.label}>
            <text x={left - 12} y={y + 22} textAnchor="end" fill="#1c1915" fontSize="13">
              {row.label}
            </text>
            <rect x={left} y={y} width={rcsW} height={28} fill="#1d3557" />
            <rect x={left + rcsW} y={y} width={fullW} height={28} fill="#8a5a12" />
            <text x={left + rcsW + fullW + 8} y={y + 18} fill="#1c1915" fontSize="12">
              ${Math.round(row.rcs).toLocaleString()}M + ${Math.round(row.full).toLocaleString()}M
            </text>
          </g>
        );
      })}
      <g transform={`translate(${left}, ${h - 28})`}>
        <rect width="14" height="14" fill="#1d3557" />
        <text x="20" y="12" fill="#4a453c" fontSize="12">
          Recurrent consumer spending
        </text>
        <rect x="230" width="14" height="14" fill="#8a5a12" />
        <text x="250" y="12" fill="#4a453c" fontSize="12">
          Full game and other
        </text>
      </g>
    </svg>
  );
}
