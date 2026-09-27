import { averageTotalCost, breakEvenQuantity } from "@/lib/model";

type Props = {
  fixedCost?: number;
  variableCost?: number;
  price?: number;
};

export function CostScaleChart({
  fixedCost = 1500,
  variableCost = 8,
  price = 79.99,
}: Props) {
  const w = 720;
  const h = 330;
  const left = 58;
  const top = 40;
  const plotW = 630;
  const plotH = 330;
  const qMax = 80;
  const pMax = 160;
  const X = (q: number) => left + (q / qMax) * plotW;
  const Y = (p: number) => top + (1 - Math.min(p, pMax) / pMax) * plotH;

  const samples = Array.from({ length: 60 }, (_, i) => {
    const q = 11 + (67 * i) / 59;
    return [q, averageTotalCost(fixedCost, variableCost, q)] as const;
  });
  const atc = samples.map((p, i) => `${i === 0 ? "M" : "L"} ${X(p[0])} ${Y(p[1])}`).join(" ");
  const qBe = breakEvenQuantity(fixedCost, price, variableCost);

  return (
    <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Falling average total cost against a flat marginal cost" className="w-full h-auto">
      <rect width={w} height={h} fill="#fbf8f1" />
      {[40, 80, 120].map((p) => (
        <g key={p}>
          <line x1={left} x2={left + plotW} y1={Y(p)} y2={Y(p)} stroke="#e4dccb" />
          <text x={left - 8} y={Y(p) + 4} textAnchor="end" fill="#6f685c" fontSize="11">
            {p}
          </text>
        </g>
      ))}
      <line x1={left} x2={left} y1={top} y2={top + plotH} stroke="#1c1915" strokeWidth="1.4" />
      <line x1={left} x2={left + plotW} y1={top + plotH} y2={top + plotH} stroke="#1c1915" strokeWidth="1.4" />
      <path d={atc} fill="none" stroke="#8a5a12" strokeWidth="2.6" />
      <line x1={left} x2={left + plotW} y1={Y(variableCost)} y2={Y(variableCost)} stroke="#1e4d3a" strokeWidth="2.2" />
      <line x1={left} x2={left + plotW} y1={Y(price)} y2={Y(price)} stroke="#1d3557" strokeWidth="1.6" strokeDasharray="5 4" />
      {qBe < qMax && (
        <>
          <line x1={X(qBe)} x2={X(qBe)} y1={Y(price)} y2={top + plotH} stroke="#8f2d2d" strokeDasharray="3 3" />
          <circle cx={X(qBe)} cy={Y(price)} r="4.5" fill="#8f2d2d" />
        </>
      )}
      <g fontSize="12">
        <rect x={left} y={14} width="14" height="3" fill="#8a5a12" />
        <text x={left + 18} y={20} fill="#8a5a12">ATC = F/q + MC</text>
        <rect x={left + 160} y={14} width="14" height="3" fill="#1e4d3a" />
        <text x={left + 178} y={20} fill="#1e4d3a">MC, flat</text>
        <rect x={left + 260} y={14} width="14" height="3" fill="#1d3557" />
        <text x={left + 278} y={20} fill="#1d3557">Sticker ${price.toFixed(2)}</text>
        <text x={left + 400} y={20} fill="#8f2d2d">Red mark: cost covered</text>
      </g>
      <text x={left + plotW / 2} y={h - 14} textAnchor="middle" fill="#6f685c" fontSize="12">
        Million units. F = ${fixedCost.toLocaleString()} million, an assumption, not a disclosed GTA VI budget.
      </text>
      <text x="14" y={top + plotH / 2} fill="#6f685c" fontSize="11" transform={`rotate(-90 14 ${top + plotH / 2})`}>
        $ per unit
      </text>
    </svg>
  );
}
