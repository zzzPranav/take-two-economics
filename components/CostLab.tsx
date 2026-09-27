"use client";

import { useState } from "react";
import { CostScaleChart } from "@/components/charts/CostScaleChart";
import { averageTotalCost, breakEvenQuantity, money } from "@/lib/model";

export function CostLab() {
  const [fixedCost, setFixedCost] = useState(1500);
  const [variableCost, setVariableCost] = useState(8);
  const [price, setPrice] = useState(79.99);
  const be = breakEvenQuantity(fixedCost, price, variableCost);
  const atc30 = averageTotalCost(fixedCost, variableCost, 30);
  const atc230 = averageTotalCost(fixedCost, variableCost, 230);

  return (
    <div className="lab">
      <div className="lab-controls">
        <label>
          <span>Illustrative fixed cost, $ millions</span>
          <strong>{money(fixedCost, 0)}M</strong>
          <input type="range" min={400} max={3000} step={50} value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value))} />
        </label>
        <label>
          <span>Variable cost per digital copy</span>
          <strong>{money(variableCost, 0)}</strong>
          <input type="range" min={0} max={25} step={1} value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} />
        </label>
        <div className="preset-row">
          <button type="button" className={price === 69.99 ? "on" : ""} onClick={() => setPrice(69.99)}>
            Price at $69.99
          </button>
          <button type="button" className={price === 79.99 ? "on" : ""} onClick={() => setPrice(79.99)}>
            Price at $79.99
          </button>
        </div>
      </div>
      <CostScaleChart fixedCost={fixedCost} variableCost={variableCost} price={price} />
      <div className="stat-grid">
        <Stat label="Units to cover fixed cost" value={Number.isFinite(be) ? `${be.toFixed(1)}M` : "—"} note="Where ATC equals the sticker" />
        <Stat label="ATC at 30 million units" value={money(atc30, 0)} note="Launch-scale volume" />
        <Stat label="ATC at 230 million units" value={money(atc230, 2)} note="GTA V's lifetime sold-in, as a scale check" />
      </div>
      <p className="fine">
        Take-Two does not disclose a GTA VI budget. The $2.15 billion of capitalized unreleased software on the March 31, 2026 balance sheet covers every unreleased title, not this one. Move the fixed-cost slider to see how the break-even volume changes. Online spending sits on top of these full-game economics, so the unit count here is an upper bound on what the copy alone must sell.
      </p>
    </div>
  );
}

function Stat({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
      <em>{note}</em>
    </div>
  );
}
