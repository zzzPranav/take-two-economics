"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { DemandShiftChart } from "@/components/charts/DemandShiftChart";
import { ItMonopolyChart } from "@/components/charts/ItMonopolyChart";
import { MixChart } from "@/components/charts/MixChart";
import { PlatformFigure } from "@/components/charts/PlatformFigure";
import { CostScaleChart } from "@/components/charts/CostScaleChart";

const notes = [
  "Open on the decision, not the company history. November 19, PlayStation 5 and Xbox, seventy-nine ninety-nine, and a hundred-dollar edition. The question for the next nine minutes is whether that price is for the copy or for the network.",
  "GTA V is the evidence. Premium launch, PC a year and a half later, then a live service that is still growing in year thirteen, past 230 million units. Fiscal 2027 is the firm trying to run that pattern again at a higher sticker.",
  "Do not present Take-Two as only GTA. Mobile is half of fiscal 2026 revenue. GTA was 12.4 percent, about 825 million dollars. The goodwill losses were the mobile acquisition. Cash flow turned positive. The product earns money. GAAP still shows a loss for other reasons.",
  "This is the chart to linger on if someone says live service is dying. Recurrent dollars stay near 5.2 billion. The share falls from 78 to 64 percent because the full game comes back. That is the hybrid, measured.",
  "Separate a shift of demand from a movement along it. New consoles, Online, and re-releases shift demand. The 10-K’s price cuts, three to nine months after launch, move along the curve. 230 million is cumulative. It is not a demand curve.",
  "Fourteen percent price increase. No published elasticity. On our linear scenario, 79.99 is the static monopoly price only if elasticity at 69.99 is about 0.78. More elastic, and the sticker is already too high. The lab in the memo moves this live.",
  "Walk the diagram in course order. Demand, marginal revenue at twice the slope, flat marginal cost, falling average cost. Quantity where MR equals MC. Price off the demand curve. The shaded gap to the right is players who value the game above cost and do not get it. Those players are also the network.",
  "Amortization is not marginal cost. The development budget is sunk when the sticker is chosen. A percentage storefront fee cuts profit and does not change the optimal retail price. The chart’s fixed cost is an assumption. The 2.15 billion dollar balance is every unreleased title, not a GTA VI budget.",
  "Name the market before the structure. This title is a copyright monopoly. Publishing is a differentiated oligopoly. Hours after launch are a multi-homing contest with Fortnite and Roblox. Perfect competition would put price near zero. That is not this shelf. Entry produces substitutes, not this good.",
  "One sticker is doing too many jobs. Ultimate is second degree. The later discount and the PC window are third degree. The pre-order pack is a zero-marginal-cost bundle. First degree fails on information, arbitrage, and resentment. Goldilocks would add a third version. Time is that third version.",
  "Launch day is still a pipeline. The platform is the second act, which is how GTA V actually worked. Creators are the subsidy side. Engaged players are the money side. Do not charge creators. Do not open the fiction so far that the copyright monopoly thins out.",
  "Zelnick’s benchmark, from a reported Bloomberg interview: PC can be 45 to 50 percent of a big title, and Rockstar serves the console core first. Per 10 million PC buyers, a delay with lost demand and a lower later price leaves hundreds of millions on the table. Double-dip is the upside, not the base.",
  "Read the four because-clauses. They are the grade. Price is a test. Name the PC date. Give tools away and charge players. Do not repair a recurrent share that fell because the hit returned.",
  "Stop on what would change our mind. If pre-orders and the first month show elasticity well below 0.78, the sticker can hold and even has room. If the PC share of comparable Rockstar games was tiny, the delay is cheap. Assumptions are in the memo, one table.",
  "If asked for the algebra: linear demand through 35 million at 69.99, monopoly price is the midpoint when marginal cost is zero. The fee proof is one line: maximizing one minus tau times R is the same as maximizing R.",
  "If asked why GAAP loses money: goodwill in prior years, then amortization, interest, stock pay, and a valuation allowance. Operating cash flow was 624 million in fiscal 2026 and is guided above a billion.",
  "If asked Cournot or Bertrand: Bertrand with identical goods would drive price to marginal cost. These goods are not identical. The release-date reaction of other publishers is the oligopoly fact. It is not the pricing model for this title.",
  "Tool used: Grok. No measured elasticity and no disclosed GTA VI budget. Both are labeled in the assumption table.",
];

export function Deck() {
  const [index, setIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [seconds, setSeconds] = useState(9 * 60);
  const [running, setRunning] = useState(false);
  const count = slides.length;

  const go = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(count - 1, next)));
  }, [count]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = Number(params.get("s"));
    if (Number.isFinite(requested) && requested >= 1) go(requested - 1);
  }, [go]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        event.preventDefault();
        go(index + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") go(index - 1);
      if (event.key === "Home") go(0);
      if (event.key === "End") go(count - 1);
      if (event.key.toLowerCase() === "n") setShowNotes((v) => !v);
      if (event.key.toLowerCase() === "t") setRunning((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, count]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setSeconds((s) => Math.max(0, s - 1)), 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const mins = String(Math.floor(seconds / 60)).padStart(1, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="stage">
      <div className="stage-bar">
        <Link href="/">Research memo</Link>
        <Link href="/Take-Two-GTA-VI.pptx">PowerPoint</Link>
        <div className="jump">
          <button type="button" onClick={() => go(index - 1)}>Previous</button>
          <span>{index + 1} / {count}</span>
          <button type="button" onClick={() => go(index + 1)}>Next</button>
          <button type="button" onClick={() => setShowNotes((v) => !v)}>{showNotes ? "Hide notes" : "Notes"}</button>
          <button type="button" onClick={() => setRunning((v) => !v)}>{running ? "Pause" : "Timer"} {mins}:{secs}</button>
        </div>
      </div>
      <div className="progress" aria-hidden>
        <span style={{ width: `${((index + 1) / count) * 100}%` }} />
      </div>
      <div className="slide-frame">
        <section className="slide" aria-live="polite">
          {slides[index]}
        </section>
      </div>
      {showNotes && <p className="notes">{notes[index]}</p>}
      <div className="stage-foot">
        <span>Arrows move. N notes. T timer. Nine minutes, then Q&amp;A. Appendix starts at slide 15.</span>
        <span>Take-Two · GTA VI · September 26, 2026</span>
      </div>
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return <p className="kicker">{children}</p>;
}

const slides = [
  <div key="s1" className="slide-body">
    <Kicker>Economics project · 9 minutes</Kicker>
    <h2>The eighty-dollar copy</h2>
    <p className="lead">Take-Two will sell Grand Theft Auto VI on November 19, 2026, at $79.99, with a $99.99 Ultimate Edition. GTA V already showed the pattern. The open question is whether this sticker prices the copy or the network.</p>
    <p>PlayStation 5 and Xbox Series X|S. No PC date. Single-player at launch. A free month of GTA+ on digital pre-orders.</p>
  </div>,
  <div key="s2" className="slide-body">
    <Kicker>Thesis</Kicker>
    <h2>A pipeline launch that learned to be a platform</h2>
    <p className="lead">GTA V launched at the standard price of its decade, reached PC about nineteen months later, and by August 2026 had sold in more than 230 million units, with Online spending still growing.</p>
    <p>Fiscal 2027 bookings of $8.0 to $8.2 billion assume the firm can restart that pattern at a higher price. Marginal cost of the next copy is near zero. The value of an extra player is not.</p>
  </div>,
  <div key="s3" className="slide-body">
    <Kicker>The firm · fiscal 2026, year ended March 31</Kicker>
    <h2>Bigger than the myth, still tied to the hit</h2>
    <div className="two">
      <table className="mini-table">
        <tbody>
          <tr><td>Net revenue</td><td>$6.66B</td></tr>
          <tr><td>Net bookings</td><td>$6.72B</td></tr>
          <tr><td>Gross margin</td><td>57.2%, up from 41.9% in FY24</td></tr>
          <tr><td>Recurrent share of revenue</td><td>78%</td></tr>
          <tr><td>Digital share</td><td>97%</td></tr>
          <tr><td>Mobile / console / PC</td><td>50% / 39% / 11%</td></tr>
          <tr><td>GTA share of revenue</td><td>12.4%, about $825M</td></tr>
          <tr><td>Operating cash flow</td><td>$624M, after two negative years</td></tr>
          <tr><td>GAAP net loss</td><td>$298M, no goodwill charge this year</td></tr>
        </tbody>
      </table>
      <div>
        <p className="call">Prior-year losses were mobile goodwill impairments, $2.3B then $3.5B. Fiscal 2027 guide: Rockstar 37%, Zynga 34%, 2K 29%.</p>
      </div>
    </div>
  </div>,
  <div key="s4" className="slide-body">
    <Kicker>Demand composition</Kicker>
    <h2>The recurrent share falls because the hit returns</h2>
    <MixChart />
  </div>,
  <div key="s5" className="slide-body">
    <Kicker>Lecture 2 · demand</Kicker>
    <h2>230 million units are a history of shifts</h2>
    <DemandShiftChart />
  </div>,
  <div key="s6" className="slide-body">
    <Kicker>Lecture 2 · elasticity · scenarios, not a forecast</Kicker>
    <h2>$79.99 is optimal only if fans are moderately inelastic</h2>
    <table className="mini-table">
      <thead>
        <tr><th>|ε| at $69.99</th><th>Units at $79.99</th><th>Revenue change</th><th>Static monopoly price</th></tr>
      </thead>
      <tbody>
        <tr><td>0.40</td><td>33.0M</td><td>+$190M</td><td>$122</td></tr>
        <tr><td>0.70</td><td>31.5M</td><td>+$70M</td><td>$85</td></tr>
        <tr><td>0.78</td><td>31.1M</td><td>+$38M, the peak</td><td>$80</td></tr>
        <tr><td>1.00</td><td>30.0M</td><td>−$50M</td><td>$70</td></tr>
        <tr><td>1.20</td><td>29.0M</td><td>−$130M</td><td>$64</td></tr>
      </tbody>
    </table>
    <p className="call">Anchor: 35 million console units at $69.99, linear demand, marginal cost zero. A storefront percentage fee does not change which row wins.</p>
  </div>,
  <div key="s7" className="slide-body">
    <Kicker>Lectures 4 and 5 · MR = MC</Kicker>
    <h2>One seller, a downward slope, a supply point</h2>
    <ItMonopolyChart elasticity={0.78} compact />
  </div>,
  <div key="s8" className="slide-body">
    <Kicker>Lectures 3 and 6 · costs of an information good</Kicker>
    <h2>Average cost falls. The budget is already sunk.</h2>
    <CostScaleChart />
  </div>,
  <div key="s9" className="slide-body">
    <Kicker>Lectures 4 and 5 · name the market first</Kicker>
    <h2>A copyright monopoly inside an oligopoly</h2>
    <table className="mini-table">
      <thead><tr><th>Market</th><th>Structure</th><th>Price implication</th></tr></thead>
      <tbody>
        <tr><td>This launch</td><td>Copyright monopoly</td><td>P above MC, where MR = MC</td></tr>
        <tr><td>Big-budget publishers</td><td>Differentiated oligopoly</td><td>Few firms, rising first-copy costs</td></tr>
        <tr><td>Hours after launch</td><td>Multi-homing platforms</td><td>Fortnite and Roblox cap the markup</td></tr>
      </tbody>
    </table>
    <p>Perfect competition fails: the good is differentiated, entry cannot copy the IP, and price is not marginal cost. Monopolistic competition’s zero-profit long run fits a mobile puzzle better than it fits GTA. Entrants ship substitutes. They do not inherit the network.</p>
  </div>,
  <div key="s10" className="slide-body">
    <Kicker>Lectures 6 and 7 · discrimination, bundling</Kicker>
    <h2>The menu, mapped to the three degrees</h2>
    <table className="mini-table">
      <tbody>
        <tr><td>First degree</td><td>Unavailable. Willingness to pay is hidden, codes move, and personalized prices create resentment.</td></tr>
        <tr><td>Second degree</td><td>Ultimate Edition, +$20, near-zero marginal cost extras. Players sort themselves.</td></tr>
        <tr><td>Third degree</td><td>Impatient buyers now. The 10-K’s cuts three to nine months later. PC later. Regional storefronts.</td></tr>
        <tr><td>Bundle</td><td>Vintage Vice City Pack plus a month of GTA+, both cheap to deliver once made.</td></tr>
        <tr><td>Razor and blade</td><td>Shark Cards and GTA+. Same person, both products. Resentment is already the constraint.</td></tr>
      </tbody>
    </table>
  </div>,
  <div key="s11" className="slide-body">
    <Kicker>Lectures 8 and 9 · which side is subsidized</Kicker>
    <h2>Charge players. Do not charge creators.</h2>
    <PlatformFigure />
  </div>,
  <div key="s12" className="slide-body">
    <Kicker>The console-first window</Kicker>
    <h2>Delay has a price, even when marginal cost is low</h2>
    <p>Reported management benchmark: PC can be 45–50% of a big title that releases there. GTA V waited about 19 months. Company-wide PC is only 11% of revenue because mobile is half the firm.</p>
    <table className="mini-table">
      <thead><tr><th>Of each 10M potential PC buyers</th><th>Later price</th><th>Revenue</th><th>Gap versus $80 now</th></tr></thead>
      <tbody>
        <tr><td>None lost, only delayed</td><td>$79.99</td><td>$800M later</td><td>Time, and a smaller launch network</td></tr>
        <tr><td>15% lost</td><td>$49.99</td><td>$425M</td><td>about $375M</td></tr>
        <tr><td>30% lost</td><td>$39.99</td><td>$280M</td><td>about $520M</td></tr>
      </tbody>
    </table>
  </div>,
  <div key="s13" className="slide-body">
    <Kicker>What the firm should do</Kicker>
    <h2>Four moves, each tied to a model</h2>
    <ol>
      <li>Because MC is near zero and |ε| must be about 1, treat $79.99 as a test and pre-commit the later cuts. Use Ultimate, not a higher base, for inelastic fans.</li>
      <li>Because a missing PC date shrinks the same-side network, name the window now and price that release lower.</li>
      <li>Because creators are the subsidy side, give Mission Creator away. Because differentiation protects the monopoly, do not become Roblox.</li>
      <li>Because recurrent dollars are guided flat, do not “fix” a share that falls from 78% to 64% when the full game returns.</li>
    </ol>
  </div>,
  <div key="s14" className="slide-body">
    <Kicker>Close</Kicker>
    <h2>What would change the recommendation</h2>
    <p className="lead">If the first sales month shows |ε| well below 0.78, the sticker has room and the test passed. If comparable Rockstar PC demand is small, the delay is cheap. If recurrent dollars fall, rather than hold flat, the portfolio warning in recommendation 4 gets sharper.</p>
    <p>Assumptions, filings, and the live elasticity diagram are in the memo. Appendix slides are for Q&amp;A.</p>
  </div>,
  <div key="a1" className="slide-body">
    <Kicker>Appendix · algebra</Kicker>
    <h2>Where 0.78 comes from</h2>
    <p>Q = A − B P, forced through Q(69.99) = 35. With MC = 0, MR = 0 at the midpoint, so p* = A / (2B).</p>
    <p>Set p* = 79.99 and solve. |ε| at $69.99 is about 0.78. The markup rule the course uses is (P − MC) / P = 1 / |ε|. At MC = 0 that is |ε| = 1, which for a linear curve is the midpoint.</p>
    <p>A fee that takes a share τ of revenue multiplies R by (1 − τ) at every price. The maximizing price does not move.</p>
  </div>,
  <div key="a2" className="slide-body">
    <Kicker>Appendix · reading the loss</Kicker>
    <h2>Cash turned. Accounting has not caught up.</h2>
    <table className="mini-table">
      <thead><tr><th></th><th>FY24</th><th>FY25</th><th>FY26</th><th>FY27 guide</th></tr></thead>
      <tbody>
        <tr><td>Revenue</td><td>5.35B</td><td>5.63B</td><td>6.66B</td><td>7.9–8.1B</td></tr>
        <tr><td>Goodwill impairment</td><td>2.34B</td><td>3.55B</td><td>—</td><td>—</td></tr>
        <tr><td>Net income</td><td>−3.74B</td><td>−4.48B</td><td>−0.30B</td><td>+0.10 to 0.14B</td></tr>
        <tr><td>Operating cash flow</td><td>−16M</td><td>−45M</td><td>+624M</td><td>above 1B</td></tr>
      </tbody>
    </table>
    <p>Q1 FY27: bookings $1.39B, down 3%. A $43M impairment of a cancelled third-party title. That write-off is the sunk-cost rule applied correctly.</p>
  </div>,
  <div key="a3" className="slide-body">
    <Kicker>Appendix · conduct</Kicker>
    <h2>Why this is not Cournot week</h2>
    <p>Publishers do react to each other. Other large games leave the week of November 19. That is a leader committing to a date, and rivals choosing quantities of attention around it.</p>
    <p>The price of GTA VI is not a guess about EA’s quantity. EA’s fiscal 2026 bookings were $8.03 billion, the scale Take-Two is guiding to by adding one game. The goods are differentiated, so a Bertrand race to marginal cost does not start. Copyright is the barrier that keeps it from starting.</p>
  </div>,
  <div key="a4" className="slide-body">
    <Kicker>Appendix · tools</Kicker>
    <h2>What was generated, and what was filed</h2>
    <p>Grok.</p>
    <p>Not from a filing, and labeled as such: the 35 million unit anchor, the elasticity cases, the illustrative fixed cost, the PC-delay scenarios, and press accounts of the May 2026 Bloomberg interview.</p>
  </div>,
];
