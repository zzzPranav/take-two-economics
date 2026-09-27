/** Illustrative linear demand for the GTA VI launch window.
 *  Q = A - B P, with Q in millions of console units and P in dollars.
 *  Calibrated so that Q(69.99) = qAtOldPrice, and |ε| at $69.99 equals absElasticityAtOld.
 *  These are scenarios, not forecasts.
 */

export const OLD_PRICE = 69.99;
export const NEW_PRICE = 79.99;
export const ULTIMATE_PRICE = 99.99;

export type DemandScenario = {
  absElasticityAtOld: number;
  qAtOldPrice: number;
  A: number;
  B: number;
  chokePrice: number;
  qAtZeroPrice: number;
  qAtNewPrice: number;
  absElasticityAtNew: number;
  revenueAtOld: number;
  revenueAtNew: number;
  revenueDelta: number;
  /** Static monopoly price when marginal cost is zero. */
  staticMonopolyPrice: number;
  staticMonopolyQuantity: number;
};

export function demandScenario(
  absElasticityAtOld: number,
  qAtOldPrice: number,
): DemandScenario {
  const B = (absElasticityAtOld * qAtOldPrice) / OLD_PRICE;
  const A = qAtOldPrice + B * OLD_PRICE;
  const qAtNewPrice = A - B * NEW_PRICE;
  const revenueAtOld = qAtOldPrice * OLD_PRICE;
  const revenueAtNew = qAtNewPrice * NEW_PRICE;
  return {
    absElasticityAtOld,
    qAtOldPrice,
    A,
    B,
    chokePrice: A / B,
    qAtZeroPrice: A,
    qAtNewPrice,
    absElasticityAtNew: (B * NEW_PRICE) / qAtNewPrice,
    revenueAtOld,
    revenueAtNew,
    revenueDelta: revenueAtNew - revenueAtOld,
    staticMonopolyPrice: A / (2 * B),
    staticMonopolyQuantity: A / 2,
  };
}

/** |ε| at the old ceiling that makes the static zero-MC monopoly price equal the new sticker. */
export function elasticityThatJustifiesSticker(qAtOldPrice: number): number {
  // p* = A / (2B) = NEW_PRICE, A = q + B * OLD_PRICE
  // NEW = q/(2B) + OLD/2
  // q/(2B) = NEW - OLD/2
  const halfGap = NEW_PRICE - OLD_PRICE / 2;
  const B = qAtOldPrice / (2 * halfGap);
  return (B * OLD_PRICE) / qAtOldPrice;
}

export function priceAtQuantity(s: DemandScenario, q: number): number {
  return s.chokePrice - (s.chokePrice / s.qAtZeroPrice) * q;
}

export function quantityAtPrice(s: DemandScenario, p: number): number {
  return s.A - s.B * p;
}

/** Average total cost in dollars per unit. F is $ millions, q is millions of units, c is $ per unit. */
export function averageTotalCost(fixedCostMillions: number, variablePerUnit: number, q: number): number {
  if (q <= 0) return Number.POSITIVE_INFINITY;
  return fixedCostMillions / q + variablePerUnit;
}

export function breakEvenQuantity(
  fixedCostMillions: number,
  price: number,
  variablePerUnit: number,
): number {
  const margin = price - variablePerUnit;
  if (margin <= 0) return Number.POSITIVE_INFINITY;
  return fixedCostMillions / margin;
}

export function money(n: number, digits = 0): string {
  const sign = n < 0 ? "−" : "";
  const abs = Math.abs(n);
  return sign + "$" + abs.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function millions(n: number, digits = 1): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function pct(n: number, digits = 1): string {
  const sign = n > 0 ? "+" : n < 0 ? "−" : "";
  return sign + Math.abs(n * 100).toFixed(digits) + "%";
}
