"use client";

import { useMemo, useState } from "react";
import { ItMonopolyChart } from "@/components/charts/ItMonopolyChart";
import {
  demandScenario,
  elasticityThatJustifiesSticker,
  money,
  millions,
  NEW_PRICE,
  OLD_PRICE,
} from "@/lib/model";

const presets = [0.4, 0.7, 0.78, 1, 1.2];

export function ElasticityLab() {
  const [elasticity, setElasticity] = useState(0.78);
  const [anchor, setAnchor] = useState(35);
  const scenario = useMemo(() => demandScenario(elasticity, anchor), [elasticity, anchor]);
  const threshold = elasticityThatJustifiesSticker(anchor);

  return (
    <div className="lab">
      <div className="lab-controls">
        <label>
          <span>Elasticity at ${OLD_PRICE.toFixed(2)}, absolute value</span>
          <strong>{elasticity.toFixed(2)}</strong>
          <input
            type="range"
            min={0.25}
            max={1.8}
            step={0.01}
            value={elasticity}
            onChange={(e) => setElasticity(Number(e.target.value))}
          />
        </label>
        <label>
          <span>Units at ${OLD_PRICE.toFixed(2)}, millions, an assumption</span>
          <strong>{anchor.toFixed(0)} million</strong>
          <input
            type="range"
            min={15}
            max={60}
            step={1}
            value={anchor}
            onChange={(e) => setAnchor(Number(e.target.value))}
          />
        </label>
        <div className="preset-row">
          {presets.map((p) => (
            <button key={p} type="button" onClick={() => setElasticity(p)} className={Math.abs(elasticity - p) < 0.011 ? "on" : ""}>
              |ε| = {p}
            </button>
          ))}
        </div>
      </div>

      <ItMonopolyChart elasticity={elasticity} qAnchor={anchor} />

      <div className="stat-grid">
        <Stat label="Static monopoly price, MC = 0" value={money(scenario.staticMonopolyPrice, 0)} note="Where MR = 0 on this curve" />
        <Stat label={`Units at ${money(NEW_PRICE, 2)}`} value={`${millions(scenario.qAtNewPrice)}M`} note={`${millions((scenario.qAtNewPrice - anchor) / anchor * 100, 1)}% versus the anchor`} />
        <Stat label="Retail revenue, old price" value={money(scenario.revenueAtOld) + "M"} note={`${millions(anchor, 0)}M units × $${OLD_PRICE}`} />
        <Stat label="Retail revenue, new price" value={money(scenario.revenueAtNew) + "M"} note={`Change ${money(scenario.revenueDelta, 0)}M`} />
        <Stat label={`|ε| at $${NEW_PRICE}`} value={scenario.absElasticityAtNew.toFixed(2)} note="Markup rule wants this near 1 if MC is 0" />
        <Stat label="|ε| that makes $79.99 optimal" value={threshold.toFixed(2)} note="On this anchor and a linear curve" />
      </div>
      <p className="fine">
        Retail revenue, before the storefront fee. A percentage fee scales revenue at every price by the same factor, so it does not change which sticker wins. The anchor quantity is a scale assumption so the class can read dollar differences. It is not a sales forecast.
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
