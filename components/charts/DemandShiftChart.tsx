export function DemandShiftChart() {
  const w = 720;
  const h = 420;
  const left = 56;
  const top = 36;
  const plotW = 640;
  const plotH = 330;
  const X = (q: number) => left + (q / 100) * plotW;
  const Y = (p: number) => top + (1 - p / 100) * plotH;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Demand shift diagram comparing the GTA V launch curve with later demand" className="w-full h-auto">
      <rect width={w} height={h} fill="#fbf8f1" />
      <line x1={left} x2={left} y1={top} y2={top + plotH} stroke="#1c1915" strokeWidth="1.4" />
      <line x1={left} x2={left + plotW} y1={top + plotH} y2={top + plotH} stroke="#1c1915" strokeWidth="1.4" />

      <path d={`M ${X(8)} ${Y(92)} L ${X(48)} ${Y(8)}`} fill="none" stroke="#8d8678" strokeWidth="2.4" />
      <path d={`M ${X(28)} ${Y(94)} L ${X(92)} ${Y(10)}`} fill="none" stroke="#1d3557" strokeWidth="2.8" />

      <path d={`M ${X(22)} ${Y(70)} L ${X(46)} ${Y(70)}`} fill="none" stroke="#8f2d2d" strokeWidth="1.6" />
      <polygon points={`${X(46)},${Y(70)} ${X(40)},${Y(73)} ${X(40)},${Y(67)}`} fill="#8f2d2d" />

      <path d={`M ${X(34)} ${Y(78)} C ${X(48)} ${Y(70)}, ${X(58)} ${Y(62)}, ${X(70)} ${Y(52)}`} fill="none" stroke="#1e4d3a" strokeWidth="1.6" />
      <polygon points={`${X(70)},${Y(52)} ${X(64)},${Y(56)} ${X(66)},${Y(60)}`} fill="#1e4d3a" />

      <text x={left + 4} y={18} fill="#8f2d2d" fontSize="13">Red: movement along demand</text>
      <text x={left + 250} y={18} fill="#1e4d3a" fontSize="13">Green: shift from consoles and Online</text>

      <circle cx={X(26)} cy={Y(62)} r="4" fill="#8d8678" />
      <text x={X(14)} y={Y(70)} fill="#4a453c" fontSize="12">
        2013 launch
      </text>
      <text x={X(14)} y={Y(64)} fill="#4a453c" fontSize="12">
        $59.99
      </text>

      <text x={X(8)} y={Y(96)} fill="#8d8678" fontSize="13" fontWeight="600">
        D, launch window
      </text>
      <text x={X(70)} y={Y(28)} fill="#1d3557" fontSize="13" fontWeight="600">
        D, thirteen years on
      </text>

      <text x={left + plotW / 2} y={h - 16} textAnchor="middle" fill="#6f685c" fontSize="12">
        Quantity in a period. Cumulative 230 million units are not themselves a demand curve.
      </text>
      <text x="16" y={top + plotH / 2} fill="#6f685c" fontSize="12" transform={`rotate(-90 16 ${top + plotH / 2})`}>
        Price
      </text>
    </svg>
  );
}
