/**
 * Primary figures from Take-Two filings and the August 7, 2026 earnings release.
 * Dollars are millions unless noted. Fiscal year ends March 31.
 */

export const sources = {
  tenK:
    "Take-Two Interactive Software, Inc., Form 10-K for the fiscal year ended March 31, 2026, filed May 22, 2026.",
  fy26Release:
    "Take-Two Interactive Software, Inc., earnings release for the fourth quarter and fiscal year 2026, May 2026.",
  q1Release:
    "Take-Two Interactive Software, Inc., earnings release for the fiscal first quarter of 2027, August 7, 2026 (quarter ended June 30, 2026).",
  q1Slides:
    "Take-Two Interactive Software, Inc., Q1 FY2027 results summary slides, August 7, 2026.",
  preorder:
    "Rockstar Games / Take-Two news release, pre-orders for Grand Theft Auto VI, June 2026.",
  newzoo:
    "Newzoo, Global Games Market Report 2026, as reported by Variety, September 10, 2026.",
  ea: "Electronic Arts Inc., fiscal 2026 earnings release (year ended March 31, 2026).",
  bloomberg:
    "Strauss Zelnick, comments reported from a Bloomberg interview, May 2026, via press accounts. Secondary source.",
  gtaVCost:
    "Contemporary estimates of Grand Theft Auto V's budget: analyst estimate above $137 million for development; press estimate around $265 million including marketing. Not disclosed by Take-Two.",
} as const;

export const fy = {
  years: ["FY2024", "FY2025", "FY2026"] as const,
  revenue: [5349.6, 5633.6, 6656.4],
  costOfRevenue: [3107.8, 2571.4, 2846.7],
  grossProfit: [2241.8, 3062.2, 3809.7],
  grossMargin: [0.419, 0.543, 0.572],
  selling: [1550.2, 1683.7, 1770.8],
  rd: [948.2, 1005.2, 1074.6],
  ga: [716.1, 883.3, 874.4],
  da: [171.2, 229.4, 198.5],
  goodwill: [2342.1, 3545.2, 0],
  operatingIncome: [-3590.6, -4391.1, -104.2],
  netIncome: [-3744.2, -4478.9, -298.2],
  ocf: [-16.1, -45.2, 624.3],
  bookings: [null, 5648, 6721] as (number | null)[],
  rcs: [4213.5, 4474.6, 5196.6],
  fullGame: [1136.1, 1159.0, 1459.8],
  mobile: [2748.0, 2942.0, 3333.0],
  console: [2167.3, 2099.1, 2597.3],
  pc: [434.3, 592.5, 726.1],
  digital: [5112.2, 5431.8, 6459.7],
  physical: [237.4, 201.8, 196.7],
};

export const fy26Cost = {
  product: 863.8,
  gameIntangibles: 662.2,
  licenses: 463.5,
  softwareDev: 439.8,
  internalRoyalties: 417.4,
  total: 2846.7,
};

export const company = {
  gtaShareOfFy26Revenue: 0.124,
  gtaRevenueFy26: 0.124 * 6656.4,
  gtaRevenueChangeFy26: 115.1,
  fiveFranchiseShare: 0.543,
  customerConcentration: 0.806,
  outsideUs: 0.408,
  employees: 12909,
  developers: 9998,
  seniorNotes: 2500,
  cashRestrictedFy26: 1638.1,
  shortTermInvestments: 443.8,
  unreleasedCapitalized: 2149.7,
  capitalizedSoftwareFy26: 68.8 + 2277.5,
  interestExpense: 151.4,
  digitalShare: 0.97,
  physicalShare: 0.03,
  rcsShareRevenue: 0.781,
  rcsShareBookings: 0.78,
  gtaUnitsCall: 230,
  gtaUnitsTenK: 225,
  franchiseUnitsTenK: 465,
};

export const q1 = {
  bookings: 1386,
  bookingsPrior: 1420,
  bookingsRounded: 1390,
  revenue: 1533.9,
  revenuePrior: 1503.8,
  costOfRevenue: 651.4,
  impairment: 43.4,
  netLoss: 34.1,
  rd: 273.8,
  selling: 369.7,
  opex: 918.0,
  deferredRevenue: 988.4,
  rcsShare: 0.84,
  capitalizedNoncurrent: 2395.0,
};

export const outlook = {
  bookingsLow: 8000,
  bookingsHigh: 8200,
  bookingsMid: 8100,
  revenueLow: 7900,
  revenueHigh: 8100,
  netIncomeLow: 104,
  netIncomeHigh: 143,
  ocf: 1000,
  capex: 290,
  rcsShare: 0.64,
  rockstar: 0.37,
  zynga: 0.34,
  twoK: 0.29,
};

export const prices = {
  standard: 79.99,
  ultimate: 99.99,
  priorCeiling: 69.99,
  gtaVLaunch: 59.99,
};

export const industry = {
  market2026: 213.9,
  mobile: 121.1,
  pc: 45.9,
  console: 46.9,
  eaBookings: 8.026,
  eaRevenue: 7.531,
  eaLive: 5.383,
};
