import { averageTotalCost, demandScenario } from "@/lib/model";

type Props = {
  elasticity: number;
  qAnchor?: number;
  fixedCost?: number;
  variableCost?: number;
  compact?: boolean;
};

export function ItMonopolyChart({
  elasticity,
  qAnchor = 35,
  fixedCost = 1500,
  variableCost = 8,
  compact = false,
}: Props) {
  const s = demandScenario(elasticity, qAnchor);
  const width = compact ? 560 : 720;
  const height = compact ? 340 : 420;
  const left = 58;
  const right = 18;
  const top = 36;
  const bottom = 46;
  const plotW = width - left - right;
  const plotH = height - top - bottom;

  const pMax = Math.max(s.chokePrice * 1.02, 100);
  const qMax = s.qAtZeroPrice * 1.04;

  const X = (q: number) => left + (q / qMax) * plotW;
  const Y = (p: number) => top + (1 - p / pMax) * plotH;

  const qStar = s.staticMonopolyQuantity;
  const pStar = s.staticMonopolyPrice;
  const atcStar = averageTotalCost(fixedCost, variableCost, qStar);
  const qComp = (s.chokePrice - variableCost) * (s.qAtZeroPrice / s.chokePrice);

  const demandPath = `M ${X(0)} ${Y(s.chokePrice)} L ${X(s.qAtZeroPrice)} ${Y(0)}`;
  const mrPath = `M ${X(0)} ${Y(s.chokePrice)} L ${X(qStar)} ${Y(0)}`;

  const atcSamples = Array.from({ length: 48 }, (_, i) => {
    const q = qMax * 0.04 + ((qMax * 0.96) * i) / 47;
    return [X(q), Y(Math.min(averageTotalCost(fixedCost, variableCost, q), pMax))] as const;
  });
  const atcPath = atcSamples.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");

  const profitPositive = pStar > atcStar;
  const boxTop = Y(Math.max(pStar, atcStar));
  const boxBot = Y(Math.min(pStar, atcStar));

  const dwl = `
    M ${X(qStar)} ${Y(pStar)}
    L ${X(qComp)} ${Y(variableCost)}
    L ${X(qStar)} ${Y(variableCost)}
    Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Monopoly diagram with demand, marginal revenue, marginal cost, and falling average total cost"
      className="w-full h-auto"
    >
      <rect x="0" y="0" width={width} height={height} fill="#fbf8f1" />
      {[0.25, 0.5, 0.75].map((t) => (
        <line
          key={t}
          x1={left}
          x2={left + plotW}
          y1={top + plotH * (1 - t)}
          y2={top + plotH * (1 - t)}
          stroke="#e4dccb"
          strokeWidth="1"
        />
      ))}
      <line x1={left} x2={left} y1={top} y2={top + plotH} stroke="#1c1915" strokeWidth="1.4" />
      <line x1={left} x2={left + plotW} y1={top + plotH} y2={top + plotH} stroke="#1c1915" strokeWidth="1.4" />

      <path d={dwl} fill="#8f2d2d" opacity="0.13" />
      <rect
        x={X(0)}
        y={boxTop}
        width={Math.max(X(qStar) - X(0), 0)}
        height={Math.max(boxBot - boxTop, 0)}
        fill={profitPositive ? "#1e4d3a" : "#8f2d2d"}
        opacity="0.13"
      />

      <path d={atcPath} fill="none" stroke="#8a5a12" strokeWidth="2" />
      <line
        x1={left}
        x2={left + plotW}
        y1={Y(variableCost)}
        y2={Y(variableCost)}
        stroke="#1e4d3a"
        strokeWidth="2"
      />
      <path d={mrPath} fill="none" stroke="#8f2d2d" strokeWidth="2.2" />
      <path d={demandPath} fill="none" stroke="#1d3557" strokeWidth="2.6" />

      <line x1={X(qStar)} x2={X(qStar)} y1={Y(pStar)} y2={top + plotH} stroke="#1c1915" strokeDasharray="3 3" strokeWidth="1" />
      <line x1={left} x2={X(qStar)} y1={Y(pStar)} y2={Y(pStar)} stroke="#1c1915" strokeDasharray="3 3" strokeWidth="1" />
      <circle cx={X(qStar)} cy={Y(pStar)} r="4.5" fill="#1d3557" />

      <text x="14" y={top + 12} fill="#6f685c" fontSize="11" transform={`rotate(-90 14 ${top + plotH / 2})`}>
        Price ($)
      </text>
      <text x={left + plotW / 2} y={height - 10} textAnchor="middle" fill="#6f685c" fontSize="11">
        Quantity, million console units in the launch window
      </text>

      <text x={left + 8} y={Y(pStar) - 8} fill="#1c1915" fontSize="12">
        p* ${pStar.toFixed(0)}
      </text>
      <text x={X(qStar) + 8} y={top + plotH - 8} fill="#1c1915" fontSize="12">
        q* {qStar.toFixed(1)}
      </text>
      <g fontSize="12">
        <rect x={left} y={10} width="14" height="3" fill="#1d3557" />
        <text x={left + 18} y={16} fill="#1d3557">Demand</text>
        <rect x={left + 84} y={10} width="14" height="3" fill="#8f2d2d" />
        <text x={left + 102} y={16} fill="#8f2d2d">MR</text>
        <rect x={left + 140} y={10} width="14" height="3" fill="#1e4d3a" />
        <text x={left + 158} y={16} fill="#1e4d3a">MC ${variableCost}</text>
        <rect x={left + 220} y={10} width="14" height="3" fill="#8a5a12" />
        <text x={left + 238} y={16} fill="#8a5a12">ATC</text>
      </g>
    </svg>
  );
}
