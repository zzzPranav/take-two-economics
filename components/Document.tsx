import Link from "next/link";
import { CostLab } from "@/components/CostLab";
import { DemandShiftChart } from "@/components/charts/DemandShiftChart";
import { MixChart } from "@/components/charts/MixChart";
import { PlatformFigure } from "@/components/charts/PlatformFigure";
import { ElasticityLab } from "@/components/ElasticityLab";
import { company, fy26Cost, industry, outlook, prices, q1, sources } from "@/lib/figures";

export function Document() {
  return (
    <article className="memo">
      <header className="mast">
        <p className="kicker">Economics research memo · September 26, 2026</p>
        <h1>The eighty-dollar copy, and the ten-year platform</h1>
        <p className="deck">
          Take-Two Interactive is about to sell Grand Theft Auto VI at $79.99, ten dollars above the ceiling that top games held for years, with a $99.99 Ultimate Edition beside it. Grand Theft Auto V already showed what happens after a premium launch: the copy becomes a network, and the network keeps selling. This memo uses that pattern, the company&apos;s filings, and the course models to decide whether the new sticker prices the copy or the platform.
        </p>
        <div className="mast-meta">
          <span>Prepared for a 9-minute group presentation</span>
          <Link href="/present">Open the slide deck</Link>
        </div>
      </header>

      <nav className="toc" aria-label="Contents">
        <a href="#decision">Decision</a>
        <a href="#path">Path</a>
        <a href="#company">The firm</a>
        <a href="#financials">Financials</a>
        <a href="#demand">Demand</a>
        <a href="#elasticity">Elasticity</a>
        <a href="#costs">Costs</a>
        <a href="#structure">Market structure</a>
        <a href="#pricing">Pricing</a>
        <a href="#platform">Platform</a>
        <a href="#pattern">GTA V to VI</a>
        <a href="#moves">Recommendations</a>
        <a href="#assumptions">Assumptions</a>
        <a href="#sources">Sources</a>
        <a href="#ai">AI appendix</a>
      </nav>

      <section id="decision">
        <h2>The decision, in one page</h2>
        <p>
          Rockstar will release Grand Theft Auto VI on November 19, 2026, for PlayStation 5 and Xbox Series X|S. The standard edition is $79.99. The Ultimate Edition is $99.99. Purchases before November 20 include the Vintage Vice City Pack, and digital pre-orders include a free month of GTA+. The launch build is a single-player game. No PC date has been announced.
        </p>
        <p>
          The course gives a clean way to read that menu. A digital copy, once the game exists, has a very low marginal cost, so a firm with market power sets price where demand is unit-elastic: (P − MC) / P = 1 / |ε|, and MC near zero means |ε| near 1. A platform with same-side network effects should price below that static point, because an extra player raises everyone else&apos;s willingness to pay. Versioning, a later PC release, and a subscription are how the firm collects surplus from impatient and high-willingness fans while keeping the base price closer to the network price.
        </p>
        <p>
          GTA V is the evidence, not a metaphor. It launched in September 2013 at $59.99 on the prior console generation, reached PC about nineteen months later, and by the August 7, 2026 earnings call had sold in more than 230 million units. Recurrent spending on the series was still growing in fiscal 2026 and again in the first quarter of fiscal 2027. The profitable object was not the opening weekend. It was a falling average-cost curve, walked for thirteen years, with a live service on top.
        </p>
        <p>
          Three moves follow. Hold $79.99 only as a test of elasticity, and pre-commit the later price cuts the 10-K already describes. Name a PC window now, and price that later release below the console launch. Give creator tools away, and charge engaged players for currency and GTA+. A fourth point keeps the group honest in Q&amp;A: fiscal 2027&apos;s guided drop in the recurrent-spending share, from 78 percent of bookings to 64 percent, is the full game coming back, not a strategy failure.
        </p>
      </section>

      <section id="path">
        <h2>The path this memo takes</h2>
        <p>
          The assignment allows a wide cut. This one stays on the launch decision: the sticker, the edition, the console-first window, and the live service that GTA V turned into a platform. Company financials are the constraint on that story. They show where the cash comes from, which costs are sunk, and why a GAAP loss can sit next to a rising gross margin.
        </p>
        <p>
          Two other cuts would also satisfy the brief, and the group can still switch if it wants a different presentation.
        </p>
        <ol>
          <li>
            <strong>Zynga first.</strong> Mobile is half of fiscal 2026 net revenue, and Apple, Google, Sony, and Microsoft each account for more than 10 percent of sales. That paper would be about platform fees, player-acquisition costs, and direct-to-consumer margins. GTA would be the contrast, a premium good with a lower fee burden.
          </li>
          <li>
            <strong>A policy cut.</strong> Storefront fees are a percentage of revenue. Under the model below, a percentage fee does not change the monopoly price when other marginal cost is zero. It does change profit, and it does change bargaining between publishers and console owners. That is a policymaker memo more than a firm memo.
          </li>
        </ol>
        <p>
          The recommendations touch both ideas only where they change the GTA price.
        </p>
      </section>

      <section id="company">
        <h2>What the firm actually is</h2>
        <p>
          Take-Two develops and publishes through three labels. Rockstar makes a few very large games — Grand Theft Auto, Red Dead Redemption — and then runs them for years. 2K ships annual sports products, especially NBA 2K, plus series such as WWE, Borderlands, and Civilization. Zynga runs a mobile portfolio: Toon Blast, Match Factory!, Empires &amp; Puzzles, Words With Friends, and others. Fiscal 2027 net bookings are guided at roughly 37 percent Rockstar, 34 percent Zynga, and 29 percent 2K.
        </p>
        <p>
          That mix is the first correction to the myth. In fiscal 2026, Grand Theft Auto products were 12.4 percent of net revenue, about $825 million, up $115 million from the prior year. The five best-selling franchises together were 54.3 percent. Mobile was 50.1 percent of revenue. A presentation that treats Take-Two as “the GTA company” will miss the cash engines that fund the fixed cost of the next Rockstar game, and it will misread a year in which GTA VI makes Rockstar&apos;s share jump.
        </p>
        <p>
          Distribution is already digital. Digital online channels were 97.0 percent of fiscal 2026 net revenue. Physical retail was 3.0 percent, and that share has fallen for three years. The $79.99 price is a digital price with a thin disc tail. The economic marginal cost of one more download is the right cost concept. The accounting cost of goods, 42.8 percent of revenue, is not that concept. The cost section separates them.
        </p>
      </section>

      <section id="financials">
        <h2>The financial record</h2>
        <p>
          Figures below are from the Form 10-K for the year ended March 31, 2026, and the August 7, 2026 earnings release for the quarter ended June 30, 2026. Dollars are millions.
        </p>
        <h3>Statement of operations</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th> </th>
                <th>FY2024</th>
                <th>FY2025</th>
                <th>FY2026</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Net revenue</td><td>5,350</td><td>5,634</td><td>6,656</td></tr>
              <tr><td>Cost of revenue</td><td>3,108</td><td>2,571</td><td>2,847</td></tr>
              <tr><td>Gross profit</td><td>2,242</td><td>3,062</td><td>3,810</td></tr>
              <tr><td>Gross margin</td><td>41.9%</td><td>54.3%</td><td>57.2%</td></tr>
              <tr><td>Selling and marketing</td><td>1,550</td><td>1,684</td><td>1,771</td></tr>
              <tr><td>Research and development</td><td>948</td><td>1,005</td><td>1,075</td></tr>
              <tr><td>General and administrative</td><td>716</td><td>883</td><td>874</td></tr>
              <tr><td>Goodwill impairment</td><td>2,342</td><td>3,545</td><td>—</td></tr>
              <tr><td>Operating loss</td><td>3,591</td><td>4,391</td><td>104</td></tr>
              <tr><td>Net loss</td><td>3,744</td><td>4,479</td><td>298</td></tr>
              <tr><td>Operating cash flow</td><td>(16)</td><td>(45)</td><td>624</td></tr>
              <tr><td>Net bookings</td><td>—</td><td>5,648</td><td>6,721</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The loss that dominates fiscal 2024 and fiscal 2025 is a goodwill impairment, concentrated in the mobile business Take-Two bought with Zynga. Fiscal 2026 has no goodwill impairment. Gross margin rose from 41.9 percent to 57.2 percent over the two years. Operating cash flow turned from about zero to $624 million. The product is earning cash. The GAAP loss that remains, $298 million, is what is left after amortization, interest, stock-based pay, and a tax valuation allowance. It is a poor measure of whether players want the games.
        </p>
        <h3>Where revenue comes from, fiscal 2026</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Cut</th><th>$ millions</th><th>Share</th><th>What moved it</th></tr>
            </thead>
            <tbody>
              <tr><td>Recurrent consumer spending</td><td>5,197</td><td>78.1%</td><td>+$722M, led by NBA 2K and Color Block Jam</td></tr>
              <tr><td>Full game and other</td><td>1,460</td><td>21.9%</td><td>+$301M, Borderlands, GTA, Mafia</td></tr>
              <tr><td>Mobile</td><td>3,333</td><td>50.1%</td><td>Color Block Jam, Toon Blast</td></tr>
              <tr><td>Console</td><td>2,597</td><td>39.0%</td><td>NBA 2K, Borderlands</td></tr>
              <tr><td>PC and other</td><td>726</td><td>10.9%</td><td>Borderlands, GTA, NBA 2K</td></tr>
              <tr><td>Digital online</td><td>6,460</td><td>97.0%</td><td>The business is already a digital cost curve</td></tr>
              <tr><td>Physical retail</td><td>197</td><td>3.0%</td><td>Down from 4.4% in FY2024</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Recurrent consumer spending, in the company&apos;s definition, is virtual currency, add-on content, in-game purchases, and in-game advertising. On net bookings it grew 17 percent in fiscal 2026 and was 78 percent of bookings. Inside that, management said NBA 2K grew more than 30 percent, mobile grew 13 percent, and Grand Theft Auto Online grew 6 percent. The largest single revenue increase in the year was NBA 2K, at $417 million. GTA&apos;s $115 million increase mattered. It did not carry the year. That is useful: the firm already knows how to monetize a live service, on a sports game, with less brand risk than pushing the same tools harder inside GTA.
        </p>
        <h3>Cost of revenue is mostly not marginal cost</h3>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>FY2026 cost of revenue</th><th>$ millions</th><th>Share of revenue</th><th>In the pricing decision?</th></tr>
            </thead>
            <tbody>
              <tr><td>Product costs</td><td>{fy26Cost.product.toFixed(0)}</td><td>13.0%</td><td>The variable part, yes: discs, payment, platform fees</td></tr>
              <tr><td>Game intangibles</td><td>{fy26Cost.gameIntangibles.toFixed(0)}</td><td>9.9%</td><td>Sunk acquisition cost. Ignore for the sticker</td></tr>
              <tr><td>Licenses</td><td>{fy26Cost.licenses.toFixed(0)}</td><td>7.0%</td><td>Variable for NBA and WWE. Not the GTA cost</td></tr>
              <tr><td>Software development and royalties</td><td>{fy26Cost.softwareDev.toFixed(0)}</td><td>6.6%</td><td>Amortization of a sunk build. Ignore for the sticker</td></tr>
              <tr><td>Internal royalties</td><td>{fy26Cost.internalRoyalties.toFixed(0)}</td><td>6.3%</td><td>A transfer inside the firm</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Research and development expense was another $1,075 million, the period cost of work that is not yet capitalized. Selling and marketing was $1,771 million, a mix of launch campaigns and mobile player acquisition. Headcount at March 31, 2026 was 12,909, of which 9,998 sit in development studios. Senior notes outstanding were $2.5 billion. Interest expense was $151 million. None of the development payroll changes the marginal cost of the next download of a game that already exists.
        </p>
        <p>
          Capitalized software development costs and licenses were $2.35 billion at year end, and $2.15 billion of the long-term portion related to titles that have not been released. By June 30, 2026 the long-term balance was $2.40 billion. GTA VI is inside that number. The filing does not say how much of it. For the launch-price decision the correct treatment is the one the course gives sunk cost: the money is spent, recovery does not depend on charging a higher sticker, and a project that will not earn its cost back should be written down rather than “made up” on price. The company did that in the first quarter, taking a $43 million impairment on an unannounced third-party title it chose not to finish.
        </p>
        <h3>The quarter before the launch, and the year of the launch</h3>
        <p>
          Fiscal first quarter 2027 net bookings were $1.39 billion, down 3 percent from $1.42 billion, and slightly above the company&apos;s own range. Recurrent bookings dipped 1 percent and were 84 percent of bookings. GAAP revenue rose to $1.53 billion. The net loss widened to $34 million from $12 million, and the impairment above is most of that swing. Management called out NBA 2K and the GTA series as the beat versus guidance. GTA recurrent spending grew 3 percent in the quarter, on the company&apos;s slides.
        </p>
        <p>
          For the year ending March 31, 2027, Take-Two reiterated net bookings of $8.0 to $8.2 billion, about 20 percent growth at the $8.1 billion midpoint. GAAP net revenue is guided at $7.9 to $8.1 billion, GAAP net income at $104 to $143 million, and operating cash flow above $1 billion. That would be the first GAAP profit year in this three-year window, and it is conditional on shipping GTA VI on November 19.
        </p>
        <p>
          Recurrent spending is guided flat in dollars, and down to 64 percent of bookings. On the midpoint, recurrent bookings are about $5.18 billion, against about $5.24 billion in fiscal 2026. Full-game bookings rise from about $1.48 billion to about $2.92 billion. The share falls because a hit came back, while the live-service base holds. Reading the 64 percent as “players are abandoning live services” reverses the arithmetic.
        </p>
        <figure>
          <MixChart />
          <figcaption>
            Recurrent dollars stay near $5.2 billion. The gold segment is the full game. Fiscal 2027 bars use the bookings midpoint and the company&apos;s 64 percent recurrent guide. Earlier GAAP bars are reported revenue.
          </figcaption>
        </figure>
        <p>
          One accounting wedge matters for Q&amp;A. Net bookings count the sale when it happens. For games with an online service, GAAP revenue is deferred and recognized over an estimated service period, generally five to fifteen months. The quarter with the biggest economic demand, the holiday launch, is not guaranteed to be the quarter with the biggest GAAP revenue. Deferred revenue on June 30, 2026 was $988 million, before GTA VI is in the number. Management&apos;s line that the company can “sustain this new level of scale” is partly this deferral rolling into fiscal 2028, and partly the live service that GTA V showed can last a decade.
        </p>
        <p>
          Customers are concentrated. The five largest were 80.6 percent of fiscal 2026 net revenue, and Apple, Sony, Google, and Microsoft each exceeded 10 percent. Revenue earned outside the United States was 40.8 percent. The firm is a price maker on its own games and a price taker on the stores that sell them.
        </p>
        <h3>The industry around the launch</h3>
        <p>
          Newzoo&apos;s 2026 market report, as covered in September 2026, puts global games revenue at $213.9 billion: mobile $121.1 billion, console $46.9 billion, PC $45.9 billion. The same coverage says console revenue would be expected to decline this year without GTA VI. That is a demand-shift claim at industry scale. It is a secondary source, and it belongs in the talk as context, with the primary evidence kept on Take-Two&apos;s own bookings guide.
        </p>
        <p>
          Electronic Arts, on the same March 31 fiscal year, reported net bookings of $8.03 billion and net revenue of $7.53 billion, of which live services were $5.38 billion. EA is the cleanest public comparable: a diversified publisher, a heavy recurrent mix, and no single Rockstar-style launch in that year. Take-Two&apos;s fiscal 2027 guide, $8.0 to $8.2 billion of bookings, is EA&apos;s scale, reached by adding one game. Microsoft, Sony, and Nintendo are larger or differently shaped, and they are also the platform owners who take a fee. Roblox and Fortnite are the attention platforms that compete for hours after launch. They are mapped in the market-structure section as different kinds of rival, because lumping them into one “competitor” list is how groups lose the market-definition question.
        </p>
      </section>

      <section id="demand">
        <h2>Demand, and what GTA V revealed</h2>
        <p>
          A demand curve is the quantity players will buy at each price in a period, holding income, other prices, and preferences fixed. Willingness to pay is the reservation price. Consumer surplus is the gap between that reservation price and the price paid. GTA&apos;s history is a lesson in keeping those ideas apart.
        </p>
        <p>
          The 230 million units are cumulative sold-in units from 2013 through the August 2026 call. The 10-K, filed in May, still said “over 225 million,” and the franchise as a whole “over 465 million.” Cumulative units are not a demand curve. They are the sum of many periods, on many platforms, at many prices. Using 230 million as “Q at $60” would invent a curve the data do not support.
        </p>
        <p>
          What the path does support is a series of demand shifts, plus later movements along the new curves.
        </p>
        <ul>
          <li>September 2013: PlayStation 3 and Xbox 360, at the then-standard $59.99. Demand is limited by that generation&apos;s install base.</li>
          <li>November 2014: a current-generation re-release. The install base of a new console shifts demand out.</li>
          <li>April 2015: PC, about nineteen months after the original release. A new group of buyers, with its own reservation prices.</li>
          <li>The years after: GTA Online content, Shark Cards, and later GTA+. Same-side network effects shift demand, because the game is more valuable when friends are in it.</li>
          <li>The 10-K&apos;s own commercial practice: wholesale prices are reduced during a product&apos;s life, typically three to nine months after launch, to keep selling. That is a movement along demand, done on purpose.</li>
        </ul>
        <figure>
          <DemandShiftChart />
          <figcaption>
            A teaching diagram, not a fitted curve. The gray line is launch-window demand. The blue line is demand after the shifts. The red arrow is a later discount. The green arrow is the shift itself.
          </figcaption>
        </figure>
        <p>
          Recent evidence that demand for this franchise has not sagged while the industry waited:
        </p>
        <ul>
          <li>Fiscal 2026 GTA net revenue up $115 million.</li>
          <li>GTA Online recurrent spending up 6 percent in fiscal 2026, and the series&apos; recurrent spending up 3 percent in the first quarter of fiscal 2027.</li>
          <li>Management, on August 7, describing an exceptional start to pre-orders, and reiterating an $8.0 to $8.2 billion year that depends on the November 19 ship date.</li>
        </ul>
        <p>
          Substitutes in the narrow market — a authored, cinematic, open-world crime game — are weak. Red Dead Redemption is the closest, and Take-Two owns it. Cyberpunk, Watch Dogs, and older crime sandboxes are imperfect substitutes. Substitutes in the wide market — an hour of a player&apos;s evening — are strong: Fortnite, Roblox, Call of Duty, a sports game, a streaming service. The narrow market is why a markup is possible on launch night. The wide market is why the markup cannot be maintained by ignoring the network.
        </p>
        <p>
          Complements constrain the buyer pool. A player needs a PlayStation 5 or an Xbox Series console. Management has said, in earlier comments, that a large Rockstar release has historically pulled hardware sales forward. The 10-K lists the installed base of those consoles as a key assumption under the outlook. Hardware supply and hardware prices are a complement shift: if consoles are scarce or expensive, GTA&apos;s demand curve sits further left than the reservation prices alone would put it. Skipping PC at launch leaves that complement, the PC, out of the launch window on purpose. That choice is priced in the platform section.
        </p>
      </section>

      <section id="elasticity">
        <h2>Elasticity, and whether $79.99 is the monopoly price</h2>
        <p>
          Elasticity is the percent change in quantity divided by the percent change in price, at a point on the curve. The step from $69.99 to $79.99 is a 14.3 percent price increase. Nobody has published a credible elasticity for GTA VI. The honest method is a scenario on a stated curve, which is what the lab below does.
        </p>
        <p>
          The curve is linear, Q = A − B P, with Q in millions of console units over the launch window. It is forced through one anchor: 35 million units would sell at $69.99. That anchor is a scale so revenues have a readable magnitude. Change it. The ranking of prices is what the elasticity determines; the anchor mostly scales the dollars.
        </p>
        <p>
          For a linear curve and marginal cost of zero, the static monopoly price is the midpoint, where |ε| = 1. On this anchor, that midpoint equals $79.99 only when |ε| at the old $69.99 ceiling is about 0.78. That is the number to remember.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>|ε| at $69.99</th>
                <th>Units at $79.99</th>
                <th>Retail revenue at $69.99</th>
                <th>Retail revenue at $79.99</th>
                <th>Static p*, MC = 0</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0.40</td><td>33.0M</td><td>$2.45B</td><td>$2.64B</td><td>$122</td></tr>
              <tr><td>0.70</td><td>31.5M</td><td>$2.45B</td><td>$2.52B</td><td>$85</td></tr>
              <tr><td>0.78</td><td>31.1M</td><td>$2.45B</td><td>$2.49B</td><td>$80</td></tr>
              <tr><td>1.00</td><td>30.0M</td><td>$2.45B</td><td>$2.40B</td><td>$70</td></tr>
              <tr><td>1.20</td><td>29.0M</td><td>$2.45B</td><td>$2.32B</td><td>$64</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          At that 0.78 elasticity, moving from $69.99 to $79.99 adds about $38 million of retail revenue, and that price is the peak: a higher sticker lowers revenue. If fans are more inelastic, $79.99 still raises launch revenue and sits below the static optimum, so a still higher price would raise it more. If demand at $69.99 is already unit-elastic, $79.99 is past the optimum: revenue falls by about $50 million on this anchor, and the lost units are exactly the players a network would want. The pre-order anecdotes cannot settle this. Strong pre-orders are what an inelastic fan base produces, and they are also what a well-marketed unit-elastic base produces in the first weeks, before the patient buyers show up.
        </p>
        <figure>
          <ElasticityLab />
          <figcaption>
            Drag elasticity. The blue curve is demand, the red curve is marginal revenue, with twice the slope, as on a linear demand curve. The green line is a low, flat marginal cost. The gold curve is average total cost for an illustrative $1.5 billion fixed cost. The monopoly quantity is where MR meets MC. Price is read off demand.
          </figcaption>
        </figure>
        <p>
          The platform fee does not rescue a price that fails this test. Sony and Microsoft take a percentage of digital sales. If the firm receives (1 − τ) times retail revenue and other marginal cost is about zero, maximizing (1 − τ) R is the same problem as maximizing R. The fee cuts profit. It does not move the price that maximizes profit. A per-unit cost does move it: discs, refunds, support. At a $8 variable cost the optimum is a little below the zero-MC price, not above it. The fee is a reason to care about a PC launcher, where more of the surplus stays with the publisher. It is not a reason to print a higher console sticker.
        </p>
        <p>
          Network effects push the other way, and they are the part a static diagram leaves out. Same-side effects mean the demand curve itself depends on the quantity sold. The static MR = MC point ignores the extra surplus an additional player creates for the people already in. The platform-aware price is below the static monopoly price. Even in the case where |ε| ≈ 0.78 and $79.99 is statically optimal, a firm that expects a decade of Online spending should be reluctant to buy that last dollar of launch revenue with a smaller network.
        </p>
        <p>
          That is why the Ultimate Edition exists. It is the tool for the inelastic fan. The base sticker is the tool for the size of the network. Raising the base and adding a $100 edition does both jobs with the same instrument, and the jobs want different prices.
        </p>
      </section>

      <section id="costs">
        <h2>Costs, scale, and why this is not a manufacturing curve</h2>
        <p>
          In the short run a fixed cost does not vary with output, and a variable cost does. In the long run every input is variable, and the shape of long-run average cost is returns to scale. The lecture&apos;s manufacturing picture is a U: average cost falls, then rises as a fixed plant gets crowded and marginal cost climbs. Information goods break that picture. The first copy absorbs the cost. Further copies add very little. Average total cost falls toward marginal cost and stays there. Marginal cost lies below average cost over the whole relevant range. Producing more lowers average cost, so the cost structure itself favors a large firm.
        </p>
        <p>
          GTA fits the information-good cost curve, with two qualifications that keep the model honest.
        </p>
        <p>
          First, the fixed cost is sunk by the time the sticker is chosen. Technological feasibility is the accounting line Take-Two uses: after that point, direct development cost is capitalized and later amortized against revenue. Amortization is an allocation of a sunk cost. It belongs in the financial statements. It does not belong in marginal cost. The shutdown rule is the short-run one: produce if price covers average variable cost. A digital price of $80 covers a few dollars of variable cost with room to spare, even in a scenario where the full development budget is never earned back. The decision to have started GTA VI was a long-run decision, made when the fixed cost was still avoidable. The decision to charge $80 is a short-run decision, made after that cost is sunk.
        </p>
        <p>
          Second, marginal cost is low, and it is not a pure zero. Bandwidth, payment processing, customer support, and a physical disc for a small share of units are real. The platform fee is mostly a percentage, which, as above, does not change the optimal retail price. Calling MC zero is the right classroom approximation for the shape of the curve. Quoting it as a measured zero would overclaim.
        </p>
        <figure>
          <CostLab />
          <figcaption>
            Average total cost falls toward marginal cost. The red guide marks the quantity at which ATC equals the sticker. Past that quantity, additional units are contribution. GTA V&apos;s 230 million lifetime units sit far to the right of any plausible break-even on this chart.
          </figcaption>
        </figure>
        <p>
          A worked illustration, labeled as such: a $1.5 billion fixed cost and an $8 variable cost need about 21 million units at $79.99 before the copy alone covers the fixed cost. At a $2.5 billion fixed cost the figure is about 35 million. Both are inside the range a GTA launch is discussed in, and both are below what GTA V eventually sold. The company has not disclosed the budget. Contemporary estimates put GTA V&apos;s development above $137 million, and development plus marketing near $265 million, in 2013 dollars. The strategic change since then is the scale of the first copy. A larger first copy raises the minimum volume at which average cost is low, which is one reason this market does not collapse into perfect competition. It does not, by itself, justify a higher price. Price is a demand-side object. Volume is how the firm slides down the average-cost curve the price makes possible.
        </p>
        <p>
          Recurrent spending changes the break-even arithmetic in the firm&apos;s favor. Shark Cards and GTA+ are extra revenue against a world that has already been built. The full-game unit count above is an upper bound on what the sticker must do. GTA V is the proof: a game launched at $59.99 was still producing growing Online spending in its thirteenth year. The supply curve of a competitive industry does not look like that. There is no upward-sloping supply of “one more GTA.” There is a supply point, the monopoly quantity, and then a long tail of near-zero-cost units.
        </p>
        <p>
          Opportunity cost is the other cost the launch window hides. The next best use of a finished PC port at launch is the PC sales and the larger day-one network that a delay gives up. The next best use of a development dollar inside Take-Two might have been another 2K or mobile live service, which is why the impairment of the cancelled third-party title is economically healthy: a sunk project that will not recover should be stopped. The opportunity cost of keeping GTA VI&apos;s price high is the players, and the months of their spending, left outside the network.
        </p>
        <p>
          Returns to scale, stated in the course&apos;s language: increasing returns on the supply side, because doubling output does not double cost once the first copy exists, and increasing returns on the demand side, because value rises with the number of players. The platforms lecture draws those as two different diagrams. GTA has both. That combination is rare, and it is the reason a single title can still be a large share of an entire console year.
        </p>
      </section>

      <section id="structure">
        <h2>Market structure</h2>
        <p>
          The market has to be named before the structure can be named. Three nests, each with a different model:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Market</th><th>Who is in it</th><th>Model that fits</th><th>What fails if we pick the wrong one</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>This game, this launch</td>
                <td>Players who want GTA VI specifically</td>
                <td>Copyright monopoly. One seller, downward-sloping demand, a supply point where MR = MC</td>
                <td>A perfect-competition story predicts price equal to marginal cost, near zero. That is not the shelf.</td>
              </tr>
              <tr>
                <td>Big-budget publishing</td>
                <td>Take-Two, EA, Microsoft (Activision), Sony, Nintendo, Tencent and a few others</td>
                <td>Differentiated oligopoly. Few sellers, huge first-copy costs, IP and talent as barriers</td>
                <td>A monopolistic-competition story predicts long-run profit near zero. These firms&apos; franchises do not behave that way.</td>
              </tr>
              <tr>
                <td>Hours and wallets after launch</td>
                <td>GTA Online, Fortnite, Roblox, Call of Duty, NBA 2K, streaming</td>
                <td>Differentiated competition with multi-homing. Platforms, not a winner-take-all of all games</td>
                <td>A pure-monopoly story of “video games” ignores the substitutes that cap the markup.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Perfect competition asks for many sellers, a homogeneous good, free entry, and price-taking. GTA fails each one. The good is not homogeneous: the lecture&apos;s own examples of differentiation — location, quality, taste — apply, and Hotelling&apos;s line here is taste, from simulation sport, to a creator sandbox, to a scripted crime epic. Entry is not free. A rival can ship a crime game. A rival cannot ship this crime game. Copyright is the barrier, reinforced by a first copy so expensive that only a firm expecting a large share of the narrow market will pay it. Information is good enough that players know the price, which removes one friction, and leaves the others standing.
        </p>
        <p>
          The long-run competitive prediction is the part to argue carefully, because a sharp classmate will ask it. Under free entry, profit invites entry until price equals minimum average cost. Entry into “open-world action” has happened for twenty years. Profit on this title has not been competed to zero, because the entrants produce substitutes, and the demand curve for GTA shifts left a little and stays steep. Monopolistic competition is the model in which entry flattens each firm&apos;s demand until profit is zero and price sits above minimum average cost. That model fits a restaurant block. It fits a mobile puzzle game better than it fits GTA. Zynga&apos;s mature titles, which management expects to moderate, look more like that long run. Rockstar&apos;s output does not.
        </p>
        <p>
          Oligopoly conduct — Cournot quantities, Bertrand prices, Stackelberg leadership — is the right argument for the publishers&apos; rivalry, and a weak argument for this launch. Bertrand, with identical goods and constant marginal cost, drives price to marginal cost. Publishers do not sell identical goods, so the Bertrand paradox does not close. They also do not set GTA&apos;s price by guessing EA&apos;s quantity. The closest oligopoly fact is the release calendar: other large games move off November 19, which is a Stackelberg flavor, a leader committing to a date and everyone else reacting. That is competitive conduct around the monopoly product. It is not the pricing model for the product itself.
        </p>
        <p>
          Barriers that keep the structure in place: the copyright and trademarks; the capitalized pipeline, already above $2 billion for unreleased titles; 10,000 developers; license deals with Sony and Microsoft; and the network inside GTA Online, which a new crime game does not inherit. The 10-K is frank that a few hit products are a large share of revenue, and that this concentration is a risk. Concentration is also the barrier.
        </p>
        <p>
          Likely long-run evolution: the narrow monopoly is renewed at each Rockstar release and then slowly shared with the firm&apos;s own past games. GTA V will be a substitute for GTA VI, including among players who do not want to buy a new console. That is competition from the installed base, the same logic the lecture used for Windows. The wide market gets more platform-like, with Roblox and Fortnite able to envelop hours even when they cannot envelop the fiction. The publishing oligopoly stays concentrated because first-copy costs are rising, which is the opposite of the cost path that turned encyclopedias and phone books into free commodities in the pricing lectures.
        </p>
      </section>

      <section id="pricing">
        <h2>Pricing: one sticker is doing too many jobs</h2>
        <p>
          Market power is what makes discrimination possible. Take-Two has it on this title. The three degrees, plus bundling and the subscription, are all present in the launch menu. So are the three pitfalls from the lecture: resentment, arbitrage, and the cost of implementing the scheme.
        </p>
        <h3>First degree</h3>
        <p>
          Personalized prices would capture every player&apos;s reservation price and leave consumer surplus at zero. Take-Two cannot see willingness to pay, players would not report it, and a digital code can be moved. The Amazon experiment in the lecture is the resentment case. First degree is the wrong tool here, and the firm is not using it. Dynamic storefront discounts later in the life of the game are a crude step toward it, applied to groups over time rather than to named people.
        </p>
        <h3>Second degree: the Ultimate Edition</h3>
        <p>
          The seller cannot tell a high-willingness fan from a story-only buyer, so it offers a menu and lets them sort themselves. Standard is $79.99. Ultimate is $99.99, a $20 gap, for vehicles, weapons, apparel, and story-threaded extras. The marginal cost of those extras, once authored, is about zero. That is the information-good condition in which versioning is attractive: the premium version is cheap to deliver, and the standard version is the degraded one.
        </p>
        <p>
          The self-selection constraint is the whole design. High types must prefer Ultimate at $100 to Standard at $80. Low types must prefer the reverse. If the extras are worth $40 to a fan and $5 to a story player, a $20 gap sorts them. If the extras are worth $12 to almost everyone, the $100 edition sells only to people who misread the menu, and resentment does the rest. The lecture&apos;s Goldilocks point is that three versions often beat two, because buyers avoid the extremes. Rockstar shipped two. A third, middle edition would add a version and also add confusion on a product whose brand is a single world. The cleaner third version is time: full price now, a lower price in the window the 10-K already uses, three to nine months later. Patience becomes the characteristic that sorts buyers, which is third degree as much as second.
        </p>
        <p>
          On the 35 million unit scale, if one buyer in five takes Ultimate, the extra $20 is about $140 million of retail revenue, before fees. That figure moves one for one with the take-up rate. It is the right order of magnitude for a versioning conversation, and it is not a forecast.
        </p>
        <h3>Third degree: time, platform, and place</h3>
        <p>
          Group pricing charges different observable groups different prices for the same good, and it requires that resale across groups be limited. Three groups are in play.
        </p>
        <ul>
          <li>
            <strong>Impatient console players versus patient players.</strong> The 10-K says the company cuts wholesale prices through the life of a product, typically three to nine months after launch. High-willingness, impatient buyers pay $79.99 in November. More elastic buyers pay less later. That is the GTA V pattern, and it is already company policy. Pre-committing the path makes it look like a design. Discovering it after a soft launch makes it look like a mistake, which is the resentment pitfall.
          </li>
          <li>
            <strong>Console now, PC later.</strong> Strauss Zelnick, in a May 2026 Bloomberg interview reported by the press, said Rockstar starts on console in order to serve the core player first, that this is Rockstar&apos;s pattern rather than a Sony exclusivity deal, and that PC can be 45 to 50 percent of sales for a big title that releases there. He also left open the possibility of two sales moments. GTA V&apos;s PC release, about nineteen months after consoles, is the historical lag. A later, lower PC price is third-degree discrimination by platform and by patience. A later PC price at the same $79.99 is mostly a delay, and the discrimination is weak.
          </li>
          <li>
            <strong>Geography.</strong> Forty percent of revenue is already outside the United States. Regional storefront prices are the industry&apos;s usual third-degree tool. Arbitrage — region-hopping on an account, grey-market keys — is the constraint. With physical goods down to 3 percent of revenue, disc importation is a small leak. Account region is the leak that matters.
          </li>
        </ul>
        <h3>Bundling and the subscription</h3>
        <p>
          The pre-order bundle puts a near-zero-marginal-cost pack and a month of GTA+ next to the game. The lecture&apos;s bundling arithmetic is built for this: when valuations of the pieces are negatively correlated, or simply heterogeneous, a bundle extracts more than separate prices, and a zero marginal cost means there is little reason to leave a digital extra out. The Vintage Vice City Pack is also a complement in the ordinary sense, items that are worth more inside this world than outside it.
        </p>
        <p>
          The free month of GTA+ is a hook into a subscription the player can keep. Marginal cost of the month is about zero, so the question is conversion versus cannibalization. Some pre-order buyers would have paid for GTA+ anyway. They receive a transfer. Others try a product they would have skipped, and a fraction stay. GTA+ also bundles older Rockstar games, which is the low-marginal-cost catalog bundle, the same logic as a streaming library. It is aimed, in the launch window, at GTA V and the existing Online, because GTA VI itself ships as a single-player game. The firm is using the old platform to season demand for the new copy.
        </p>
        <p>
          Shark Cards, the virtual currency, are the razor-blade half of a strategy the lecture distinguishes from two-sided pricing. The same person buys the game and the currency. That is a complement sold to one customer, like a printer and ink. It is not, by itself, a subsidy to one side of a market in order to charge the other side. Resentment is already part of this design: visible in-game wealth, bought rather than earned, is a standing complaint around GTA Online. A more aggressive currency shop inside GTA VI would raise recurrent spending and flatten the demand of players who experience it as a tax on the $80 they already paid. 2K&apos;s card economy shows the firm knows how far this can be pushed. Rockstar&apos;s brand is less able to survive the same push.
        </p>
      </section>

      <section id="platform">
        <h2>Pipeline, platform, and who should be subsidized</h2>
        <p>
          A pipeline moves value in a line: the firm makes the good and sells it. A platform is a set of rules and architecture that lets more than one group interact, and it can scale without owning every input those groups produce. Take-Two is both, in different businesses, and GTA VI&apos;s launch day is still the pipeline.
        </p>
        <figure>
          <PlatformFigure />
          <figcaption>
            Money flows from players. Tools, if the firm follows the platforms lecture, flow free to creators. The launch copy sits underneath, a pipeline product that feeds the network.
          </figcaption>
        </figure>
        <p>
          Zynga is the closest thing in the company to an attention platform: players, a catalog, and advertisers, with a take rate shared with Apple and Google. The 10-K says mobile gross margin is lower than console or PC because of those fees, and that the company is expanding direct-to-consumer commerce to improve it. 2K&apos;s annual sports games are products with a live-service layer. Rockstar is a closed production studio that discovered, after GTA V shipped, that the ongoing world was a platform with one dominant side.
        </p>
        <p>
          GTA Online&apos;s network effects, in the lecture&apos;s four-cell map:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th></th><th>Players</th><th>Creators, via Mission Creator</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Players</td>
                <td>Same-side positive. Heists, friends, a shared economy. A split between PlayStation, Xbox, and a later PC shrinks this.</td>
                <td>Cross-side positive. More good missions raise the value of staying.</td>
              </tr>
              <tr>
                <td>Creators</td>
                <td>Cross-side positive. More players raise the audience for a mission.</td>
                <td>Same-side can turn negative. Creators compete for attention, and low-quality missions are clutter, the lecture&apos;s negative cross-side in another costume.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Mission Creator, called out on the August 2026 call as a new toolset for player-made missions, is the first real opening of production. It is still early, and it sits in GTA V&apos;s Online, not in a GTA VI online mode. Rockstar has been explicit that GTA VI launches as a single-player experience. The sequence is the GTA V sequence: ship the authored world, then open the service. That is a deliberate pipeline-first launch of a product the firm intends to run as a platform. It is the opposite of trying to be Roblox on day one.
        </p>
        <p>
          Should it try? The winner-take-all conditions in the lecture are a useful brake.
        </p>
        <ul>
          <li>Supply-side and demand-side scale are both large inside GTA. They are not large enough to make one game the only game people play.</li>
          <li>Multi-homing costs across games are low. A player can be in Fortnite and in GTA in the same week. Multi-homing costs inside a friend group, for a specific mode, are higher. The network that matters is the friend group, not the global player count.</li>
          <li>Differentiation is high. A crime epic is a niche with its own taste. Niches are how markets escape winner-take-all.</li>
        </ul>
        <p>
          So GTA can be winner-take-most of the cinematic crime sandbox, and it will not be winner-take-all of play. Envelopment, the threat in Eisenmann, Parker, and Van Alstyne, is real for hours and weak for the fiction. Fortnite can host a concert and absorb an evening. It cannot absorb Los Santos. The strategic error would be to open the world so far, in pursuit of a creator platform, that the fiction becomes a template and the copyright monopoly thins out. The strategic error in the other direction is to keep the world so closed that the same-side effect never compounds, and the firm leaves the decade of recurrent spending that paid for GTA V.
        </p>
        <p>
          Pricing a two-sided network means choosing a subsidy side. The lecture&apos;s rule: subsidize the side that creates more surplus on the other side, and do not charge creators for access. Adobe gave the reader away. Microsoft gave developers the tools. Console makers historically subsidized the box and taxed the game. GTA&apos;s money side is the engaged player, through currency and GTA+. The subsidy side is the marginal player, through a base price that does not chase the last dollar, and the creator, through free tools. Charging creators a fee to publish missions would repeat the mistake the lecture attributes to firms that taxed the side they needed for free. The free month of GTA+ is a small subsidy to players, spent to move them onto the money side of the old platform before the new one exists.
        </p>
        <p>
          The console-first window cuts this network at the moment it is most valuable to start. A player on PC cannot join a friend on PlayStation in November. Same-side value at launch is the console population only. The benefit of the delay, in Zelnick&apos;s reported framing, is serving the core player at the quality bar Rockstar is judged on, plus a second sales moment later, plus a launch window with less PC piracy exposure. The cost is forgone PC demand, a smaller network, and resentment among a group the CEO himself describes as large.
        </p>
        <p>
          A compact way to hold both sides in Q&amp;A, per 10 million potential launch-window PC buyers, before any double-dip:
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Share permanently lost</th>
                <th>Price charged to the rest, later</th>
                <th>Revenue from those 10 million</th>
                <th>Versus selling all 10 million at $79.99 now</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>0%</td><td>$79.99, only delayed</td><td>$800M, later</td><td>Time value, and a smaller launch network</td></tr>
              <tr><td>15%</td><td>$49.99</td><td>$425M</td><td>About $375M less, plus time</td></tr>
              <tr><td>30%</td><td>$39.99</td><td>$280M</td><td>About $520M less, plus time</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          Double-dip sales from console owners are a credit against that cost. They require a player to buy the game twice. Some will, for a second household or a later PC community. The filings show a company whose players already multi-home across a portfolio; they do not show a habit of paying twice for the same Rockstar world. Treat a large double-dip as the upside case, not the base case. The 45 to 50 percent PC share is Zelnick&apos;s benchmark for a big title that does release on PC, not a measured GTA V mix, and not a GTA VI forecast. Company-wide, PC was 10.9 percent of fiscal 2026 revenue because mobile is half the firm.
        </p>
      </section>

      <section id="pattern">
        <h2>What to copy from GTA V, and what has changed</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th></th><th>GTA V, the revealed pattern</th><th>GTA VI, the live decision</th></tr>
            </thead>
            <tbody>
              <tr><td>Launch price</td><td>$59.99 in 2013, the standard of that decade</td><td>$79.99, a new ceiling, with $99.99 beside it</td></tr>
              <tr><td>Platforms at launch</td><td>Two consoles of the prior generation</td><td>Two consoles of the current generation. No PC date</td></tr>
              <tr><td>PC lag</td><td>About 19 months</td><td>Undeclared. Management says the core comes first</td></tr>
              <tr><td>Day-one design</td><td>Single-player world, Online attached and then expanded for a decade</td><td>Single-player at launch, by the company&apos;s own release</td></tr>
              <tr><td>Later monetization</td><td>Re-releases, discounts, Shark Cards, GTA+, creator tools late in life</td><td>The same menu, available to be switched on, plus a free month of GTA+ at pre-order</td></tr>
              <tr><td>Scale of the first copy</td><td>Contemporary estimates around the low hundreds of millions, with marketing</td><td>Undisclosed, inside a $2.15B unreleased capitalized balance. The first copy is larger</td></tr>
              <tr><td>What the units did</td><td>230 million sold-in, and Online spending still growing in year thirteen</td><td>The bookings guide assumes the pattern can be restarted at a higher price</td></tr>
            </tbody>
          </table>
        </div>
        <p>
          The traditional expectation for an information good, from the pricing lectures, is that competition drives price toward marginal cost and the good becomes free, funded by ads or by a complement. Phone books and encyclopedias took that path because they became homogeneous. GTA did not. Copyright, taste, and the network kept price above marginal cost, and the firm added recurrent spending on top of the copy instead of replacing the copy. Fiscal 2027&apos;s mix — recurrent dollars flat, full-game dollars up sharply — is that hybrid, measured. The new monetization did not abolish the old one. The old one is being repriced, in a market where the first copy costs more than it did in 2013 and the tail lasts longer than a manufacturing product ever did.
        </p>
      </section>

      <section id="moves">
        <h2>Recommendations</h2>
        <p>
          Each move is something the firm can do, and each one cites the model that forces it. Four is the maximum the assignment asks for. The first three are the presentation. The fourth is the Q&amp;A defense.
        </p>
        <ol className="moves">
          <li>
            <h3>Treat $79.99 as a measured test, and publish the later price path.</h3>
            <p>
              Because marginal cost of a digital copy is near zero, the static markup rule puts the launch price where |ε| is about 1. On a linear curve anchored at 35 million units and $69.99, that price is $79.99 only if elasticity at the old ceiling is about 0.78. If the true elasticity is higher, the sticker is already too high, and the lost units are the network. Because same-side effects make an extra player valuable to other players, the platform-aware price sits below that static point even when 0.78 is the right elasticity. Because the 10-K already cuts wholesale prices three to nine months after launch, pre-commit those steps now. A planned cut is third-degree discrimination by patience. An unplanned cut is a confession. Use the Ultimate Edition, not a higher base price, to collect surplus from inelastic fans: the extras have a marginal cost near zero, which is when versioning works.
            </p>
          </li>
          <li>
            <h3>Name the PC window during the console pre-order period, and price that release below $79.99.</h3>
            <p>
              Because GTA V reached PC about nineteen months later and went on to a 230 million unit life, delay can be survived. Because management&apos;s own benchmark is that PC can be 45 to 50 percent of a big multiplatform title, the opportunity cost of silence is a large group of reservation prices and a smaller same-side network at the moment the network is formed. The announcement is cheap. The port is not, and that cost is real. A lower later PC price is third-degree discrimination the storefronts can enforce. Counting on players to buy the game twice is the upside case, not the case that should set the policy. Every month the date stays unannounced, wishlists and resentment accumulate, and neither shows up in the static MR = MC diagram.
            </p>
          </li>
          <li>
            <h3>Give Mission Creator away. Charge the same players for currency and GTA+. Do not turn the world into an open platform.</h3>
            <p>
              Because GTA VI launches as a pipeline, the platform is the second act, which is the GTA V sequence and the right one. Because creators attract players, they are the subsidy side, and the lecture&apos;s rule is to subsidize that side rather than tax it. Because the money side is the engaged player, Shark Cards and GTA+ remain the price, with a hard limit set by resentment: the firm has already seen that limit on GTA Online, and NBA 2K is the warning of how far a currency shop can go before it becomes the product. Because differentiation is what keeps long-run profit above the monopolistic-competition outcome, an open user-generated world would spend the copyright monopoly to chase a winner-take-all market that multi-homing says GTA will not win.
            </p>
          </li>
          <li>
            <h3>Do not “repair” a recurrent-spending share that falls from 78 percent to 64 percent.</h3>
            <p>
              Because the guide holds recurrent dollars roughly flat, near $5.2 billion, while full-game bookings rise by about $1.4 billion at the midpoint. The share falls because the hit returned. A strategy that chased the old share would mean holding back the full game or loading the new world with currency on day one, which taxes the network the cost curve needs. The cash that funds the next first copy is the rest of the portfolio: about 34 percent Zynga and 29 percent 2K on the same guide. The mobile fee problem is real — the 10-K says platform fees leave mobile with a lower gross margin, and direct-to-consumer is the firm&apos;s response — and it should be solved on mobile, not by adding another ten dollars to GTA.
            </p>
          </li>
        </ol>
      </section>

      <section id="assumptions">
        <h2>Assumptions, in one place</h2>
        <p>Anything in the models that is not a filing figure is listed here. If a classmate breaks one of these, the diagram moves and the recommendation should be restated, not defended.</p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Assumption</th><th>Value used</th><th>What changes if it is wrong</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Launch-window console demand at $69.99</td>
                <td>35 million units, a scale anchor</td>
                <td>Dollar gaps scale. The elasticity that justifies $79.99 stays near 0.78 on a linear curve.</td>
              </tr>
              <tr>
                <td>Shape of demand</td>
                <td>Linear</td>
                <td>A constant-elasticity curve does not have a finite choke price, and the “midpoint” rule changes. The markup rule (P − MC) / P = 1 / |ε| still holds.</td>
              </tr>
              <tr>
                <td>Marginal cost of one more digital copy</td>
                <td>Low and flat. Illustrative $8 when a number is required. Platform fee treated as a percentage of revenue.</td>
                <td>A large per-unit cost lowers the optimal price. A percentage fee does not, when other MC is zero.</td>
              </tr>
              <tr>
                <td>Fixed cost of GTA VI</td>
                <td>Not disclosed. Slider runs from $0.4B to $3.0B. Balance-sheet fact: $2.15B capitalized unreleased software for all titles at March 31, 2026.</td>
                <td>Break-even volume moves. The pricing rule does not, because this cost is sunk at launch.</td>
              </tr>
              <tr>
                <td>Ultimate take-up</td>
                <td>Illustrated at 20 percent</td>
                <td>The versioning revenue moves one for one. The self-selection logic does not.</td>
              </tr>
              <tr>
                <td>PC share and loss from delay</td>
                <td>Scenarios of 0, 15, and 30 percent permanent loss per 10 million potential PC buyers. 45–50 percent is a reported management benchmark for big titles, not a GTA mix.</td>
                <td>The value of naming a PC date scales with the lost share and with the same-side effect, which we do not have a number for.</td>
              </tr>
              <tr>
                <td>Fiscal 2027 recurrent share</td>
                <td>64 percent of bookings, company guidance, applied to the $8.1B midpoint</td>
                <td>If recurrent dollars fall rather than hold flat, recommendation 4 changes.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sources">
        <h2>Sources</h2>
        <ul className="sources">
          <li>{sources.tenK} Revenue, cost, platform, and customer tables; capitalized software; employees; price-protection language; deferral policy; GTA at 12.4 percent of revenue and “over 225 million” units as of the filing.</li>
          <li>{sources.fy26Release} Net bookings of $6.72 billion; recurrent bookings up 17 percent and 78 percent of bookings; GTA Online up 6 percent; NBA 2K up more than 30 percent.</li>
          <li>{sources.q1Release} {sources.q1Slides} Net bookings $1.39 billion; outlook $8.0 to $8.2 billion; GAAP net income guide $104 to $143 million; operating cash flow above $1 billion; recurrent spending guided flat and 64 percent of bookings; label mix roughly 37 / 34 / 29; GTA V “over 230 million” units on the call; $43.4 million impairment.</li>
          <li>{sources.preorder} November 19, 2026; PlayStation 5 and Xbox Series X|S; $79.99 and $99.99; Vintage Vice City Pack; a free month of GTA+ on digital pre-orders; single-player at launch.</li>
          <li>{sources.bloomberg} PC as 45 to 50 percent of a big title; console-first as a Rockstar choice; two sales moments left open.</li>
          <li>{sources.newzoo} Industry size and the claim that console revenue would decline in 2026 without GTA VI. Secondary.</li>
          <li>{sources.ea} Comparable publisher scale.</li>
          <li>{sources.gtaVCost}</li>
          <li>Course: Varian, as assigned, on demand, cost, competition, monopoly, and price discrimination. Shapiro and Varian, chapters assigned on information-good pricing. Eisenmann, Parker, and Van Alstyne, “Strategies for Two-Sided Markets.” Lecture sequence on pipelines, platforms, network effects, and which side to subsidize.</li>
        </ul>
        <p>
          Grand Theft Auto V&apos;s original release date, September 17, 2013, the current-generation re-release in November 2014, and the PC release on April 14, 2015 are public release history. The nineteen-month PC lag is the distance between those dates.
        </p>
      </section>

      <section id="ai">
        <h2>Appendix: tools</h2>
        <p>Grok.</p>
      </section>

      <footer className="colophon">
        <p>
          Figures as filed or as guided on August 7, 2026. {company.gtaUnitsCall} million is the earnings-call unit count. The May 10-K still read “over {company.gtaUnitsTenK} million.” Prices: ${prices.standard} and ${prices.ultimate}. Industry total ${industry.market2026} billion is Newzoo via secondary coverage. Operating cash flow guide is above ${outlook.ocf} million. Q1 impairment ${q1.impairment} million.
        </p>
        <p>
          <Link href="/present">Present the 9-minute deck</Link>
        </p>
      </footer>
    </article>
  );
}
