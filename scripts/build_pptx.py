#!/usr/bin/env python3
"""Build the course deck as an editable PowerPoint file."""

from pathlib import Path

import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyArrowPatch, Polygon
from pptx import Presentation
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_ANCHOR, PP_ALIGN
from pptx.oxml.ns import qn
from pptx.util import Emu, Inches, Pt

ROOT = Path(__file__).resolve().parents[1]
CHARTS = Path("/tmp/pptx-charts")
CHARTS.mkdir(parents=True, exist_ok=True)
OUT = ROOT / "public" / "Take-Two-GTA-VI.pptx"

PAPER = RGBColor(0xF3, 0xEF, 0xE4)
INK = RGBColor(0x1C, 0x19, 0x15)
SOFT = RGBColor(0x4A, 0x45, 0x3C)
MUTED = RGBColor(0x6F, 0x68, 0x5C)
ACCENT = RGBColor(0x8F, 0x2D, 0x2D)
GREEN = RGBColor(0x1E, 0x4D, 0x3A)
BLUE = RGBColor(0x1D, 0x35, 0x57)
GOLD = RGBColor(0x8A, 0x5A, 0x12)
WHITE = RGBColor(0xFB, 0xF8, 0xF1)
LINE = RGBColor(0xD4, 0xCC, 0xBB)
HEADER = RGBColor(0xEF, 0xEA, 0xE0)

W = Inches(13.333)
H = Inches(7.5)

NOTES = [
    "Open on the decision, not the company history. November 19, PlayStation 5 and Xbox, seventy-nine ninety-nine, and a hundred-dollar edition. The question for the next nine minutes is whether that price is for the copy or for the network.",
    "GTA V is the evidence. Premium launch, PC a year and a half later, then a live service that is still growing in year thirteen, past 230 million units. Fiscal 2027 is the firm trying to run that pattern again at a higher sticker.",
    "Do not present Take-Two as only GTA. Mobile is half of fiscal 2026 revenue. GTA was 12.4 percent, about 825 million dollars. The goodwill losses were the mobile acquisition. Cash flow turned positive. The product earns money. GAAP still shows a loss for other reasons.",
    "This is the chart to linger on if someone says live service is dying. Recurrent dollars stay near 5.2 billion. The share falls from 78 to 64 percent because the full game comes back. That is the hybrid, measured.",
    "Separate a shift of demand from a movement along it. New consoles, Online, and re-releases shift demand. The 10-K’s price cuts, three to nine months after launch, move along the curve. 230 million is cumulative. It is not a demand curve.",
    "Fourteen percent price increase. No published elasticity. On our linear scenario, 79.99 is the static monopoly price only if elasticity at 69.99 is about 0.78. More elastic, and the sticker is already too high.",
    "Walk the diagram in course order. Demand, marginal revenue at twice the slope, flat marginal cost, falling average cost. Quantity where MR equals MC. Price off the demand curve. The shaded gap to the right is players who value the game above cost and do not get it. Those players are also the network.",
    "Amortization is not marginal cost. The development budget is sunk when the sticker is chosen. A percentage storefront fee cuts profit and does not change the optimal retail price. The chart’s fixed cost is an assumption. The 2.15 billion dollar balance is every unreleased title, not a GTA VI budget.",
    "Name the market before the structure. This title is a copyright monopoly. Publishing is a differentiated oligopoly. Hours after launch are a multi-homing contest with Fortnite and Roblox. Perfect competition would put price near zero. That is not this shelf. Entry produces substitutes, not this good.",
    "One sticker is doing too many jobs. Ultimate is second degree. The later discount and the PC window are third degree. The pre-order pack is a zero-marginal-cost bundle. First degree fails on information, arbitrage, and resentment. Time is the third version.",
    "Launch day is still a pipeline. The platform is the second act, which is how GTA V actually worked. Creators are the subsidy side. Engaged players are the money side. Do not charge creators. Do not open the fiction so far that the copyright monopoly thins out.",
    "Zelnick’s benchmark, from a reported Bloomberg interview: PC can be 45 to 50 percent of a big title, and Rockstar serves the console core first. Per 10 million PC buyers, a delay with lost demand and a lower later price leaves hundreds of millions on the table. Double-dip is the upside, not the base.",
    "Read the four because-clauses. They are the grade. Price is a test. Name the PC date. Give tools away and charge players. Do not repair a recurrent share that fell because the hit returned.",
    "Stop on what would change our mind. If pre-orders and the first month show elasticity well below 0.78, the sticker can hold and even has room. If the PC share of comparable Rockstar games was tiny, the delay is cheap. Assumptions are in the memo, one table.",
    "If asked for the algebra: linear demand through 35 million at 69.99, monopoly price is the midpoint when marginal cost is zero. The fee proof is one line: maximizing one minus tau times R is the same as maximizing R.",
    "If asked why GAAP loses money: goodwill in prior years, then amortization, interest, stock pay, and a valuation allowance. Operating cash flow was 624 million in fiscal 2026 and is guided above a billion.",
    "If asked Cournot or Bertrand: Bertrand with identical goods would drive price to marginal cost. These goods are not identical. The release-date reaction of other publishers is the oligopoly fact. It is not the pricing model for this title.",
    "Tool used: Grok. No measured elasticity and no disclosed GTA VI budget. Both are labeled in the assumption table.",
]


def rgb(hex_color):
    hex_color = hex_color.lstrip("#")
    return tuple(int(hex_color[i : i + 2], 16) / 255 for i in (0, 2, 4))


def style_axes(ax):
    ax.set_facecolor("#fbf8f1")
    for spine in ax.spines.values():
        spine.set_color("#1c1915")
        spine.set_linewidth(1.1)
    ax.tick_params(colors="#6f685c", labelsize=11)
    ax.grid(True, axis="y", color="#e4dccb", linewidth=0.8)
    ax.set_axisbelow(True)


def save_fig(fig, name):
    path = CHARTS / name
    fig.savefig(path, dpi=160, bbox_inches="tight", facecolor=fig.get_facecolor())
    plt.close(fig)
    return str(path)


def chart_mix():
    rows = [
        ("FY24 revenue", 4213.5, 1136.1),
        ("FY25 revenue", 4474.6, 1159.0),
        ("FY26 revenue", 5196.6, 1459.8),
        ("FY26 bookings", 0.78 * 6721, 0.22 * 6721),
        ("FY27 guide", 0.64 * 8100, 0.36 * 8100),
    ]
    fig, ax = plt.subplots(figsize=(11.6, 4.6))
    fig.patch.set_facecolor("#fbf8f1")
    ax.set_facecolor("#fbf8f1")
    y = np.arange(len(rows))[::-1]
    rcs = [r[1] for r in rows]
    full = [r[2] for r in rows]
    ax.barh(y, rcs, color="#1d3557", height=0.62, label="Recurrent consumer spending")
    ax.barh(y, full, left=rcs, color="#8a5a12", height=0.62, label="Full game and other")
    for i, (label, a, b) in enumerate(rows):
        yy = y[i]
        ax.text(a + b + 80, yy, f"${a:,.0f}M + ${b:,.0f}M", va="center", fontsize=11, color="#1c1915")
    ax.set_yticks(y)
    ax.set_yticklabels([r[0] for r in rows], fontsize=12, color="#1c1915")
    ax.set_xlim(0, 10800)
    ax.set_xlabel("")
    ax.tick_params(axis="x", colors="#6f685c")
    for spine in ("top", "right"):
        ax.spines[spine].set_visible(False)
    ax.spines["left"].set_color("#1c1915")
    ax.spines["bottom"].set_color("#1c1915")
    ax.legend(frameon=False, loc="lower center", bbox_to_anchor=(0.42, 1.02), ncol=2, fontsize=11)
    fig.tight_layout(rect=(0, 0, 1, 0.92))
    return save_fig(fig, "mix.png")


def chart_demand():
    fig, ax = plt.subplots(figsize=(11.6, 4.7))
    fig.patch.set_facecolor("#fbf8f1")
    style_axes(ax)
    ax.grid(False)
    ax.plot([8, 48], [92, 8], color="#8d8678", lw=2.4, label="D, launch window")
    ax.plot([28, 92], [94, 10], color="#1d3557", lw=2.8, label="D, thirteen years on")
    ax.annotate(
        "",
        xy=(46, 70),
        xytext=(22, 70),
        arrowprops=dict(arrowstyle="-|>", color="#8f2d2d", lw=1.6),
    )
    ax.annotate(
        "",
        xy=(70, 52),
        xytext=(34, 78),
        arrowprops=dict(arrowstyle="-|>", color="#1e4d3a", lw=1.6, connectionstyle="arc3,rad=-0.2"),
    )
    ax.scatter([22], [70], s=28, color="#8d8678", zorder=5)
    ax.text(10, 62, "2013 launch\n$59.99", color="#4a453c", fontsize=11)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.set_xlabel("Quantity in a period. Cumulative 230 million units are not a demand curve.", color="#6f685c")
    ax.set_ylabel("Price", color="#6f685c")
    ax.legend(frameon=False, loc="upper right", fontsize=11)
    fig.text(0.13, 0.93, "Red arrow: movement along demand", color="#8f2d2d", fontsize=11)
    fig.text(0.48, 0.93, "Green arrow: shift from consoles and Online", color="#1e4d3a", fontsize=11)
    fig.tight_layout(rect=(0, 0, 1, 0.92))
    return save_fig(fig, "demand.png")


def chart_monopoly():
    old, e, q70 = 69.99, 0.78, 35.0
    b = e * q70 / old
    a = q70 + b * old
    choke = a / b
    q_max = a
    slope = choke / q_max
    q = np.linspace(0, q_max, 300)
    p = choke - slope * q
    q_star = a / 2
    p_star = a / (2 * b)
    q_mr = np.linspace(0, q_star, 200)
    mr = choke - 2 * slope * q_mr
    q_atc = np.linspace(q_max * 0.08, q_max * 0.98, 250)
    atc = 1500 / q_atc + 8
    mc = 8
    q_comp = (choke - mc) / slope
    fig, ax = plt.subplots(figsize=(11.6, 4.8))
    fig.patch.set_facecolor("#fbf8f1")
    style_axes(ax)
    atc_star = 1500 / q_star + 8
    ax.fill_between([0, q_star], [atc_star, atc_star], [p_star, p_star], color="#1e4d3a", alpha=0.13)
    tri_q = np.linspace(q_star, q_comp, 40)
    tri_p = choke - slope * tri_q
    ax.fill_between(tri_q, mc, tri_p, color="#8f2d2d", alpha=0.13)
    ax.plot(q, p, color="#1d3557", lw=2.6, label="Demand")
    ax.plot(q_mr, mr, color="#8f2d2d", lw=2.2, label="MR")
    ax.axhline(mc, color="#1e4d3a", lw=2, label="MC $8")
    ax.plot(q_atc, np.clip(atc, 0, choke * 1.02), color="#8a5a12", lw=2, label="ATC")
    ax.plot([q_star, q_star], [0, p_star], ls="--", color="#1c1915", lw=0.8)
    ax.plot([0, q_star], [p_star, p_star], ls="--", color="#1c1915", lw=0.8)
    ax.scatter([q_star], [p_star], s=36, color="#1d3557", zorder=5)
    ax.text(1.2, p_star + 4, f"p* ${p_star:.0f}", color="#1c1915", fontsize=12)
    ax.text(q_star + 0.6, 3, f"q* {q_star:.1f}", color="#1c1915", fontsize=12)
    ax.set_xlim(0, q_max * 1.02)
    ax.set_ylim(0, choke * 1.02)
    ax.set_xlabel("Quantity, million console units in the launch window", color="#6f685c")
    ax.set_ylabel("Price ($)", color="#6f685c")
    ax.legend(frameon=False, ncol=4, loc="upper right", fontsize=11)
    fig.tight_layout()
    return save_fig(fig, "monopoly.png")


def chart_cost():
    f, c, price = 1500, 8, 79.99
    q = np.linspace(11, 78, 300)
    atc = f / q + c
    q_be = f / (price - c)
    fig, ax = plt.subplots(figsize=(11.6, 4.7))
    fig.patch.set_facecolor("#fbf8f1")
    style_axes(ax)
    ax.plot(q, atc, color="#8a5a12", lw=2.6, label="ATC = F/q + MC")
    ax.axhline(c, color="#1e4d3a", lw=2.2, label="MC, flat")
    ax.axhline(price, color="#1d3557", lw=1.6, ls="--", label="Sticker $79.99")
    ax.axvline(q_be, color="#8f2d2d", lw=1, ls=":")
    ax.scatter([q_be], [price], s=36, color="#8f2d2d", zorder=5, label="Red mark: cost covered")
    ax.set_xlim(0, 80)
    ax.set_ylim(0, 160)
    ax.set_xlabel("Million units. F = $1,500 million, an assumption, not a disclosed GTA VI budget.", color="#6f685c")
    ax.set_ylabel("$ per unit", color="#6f685c")
    ax.legend(frameon=False, ncol=4, loc="upper right", fontsize=10)
    fig.tight_layout()
    return save_fig(fig, "cost.png")


def set_run(run, text, size, bold=False, color=INK, font="Calibri", italic=False):
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    run.font.name = font


def add_text(slide, l, t, w, h, text, size=16, bold=False, color=INK, font="Calibri", align=PP_ALIGN.LEFT, italic=False):
    box = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    set_run(p.add_run(), text, size, bold, color, font, italic)
    return box


def add_runs(slide, l, t, w, h, paragraphs):
    """paragraphs: list of list of (text, size, bold, color, font)."""
    box = slide.shapes.add_textbox(Inches(l), Inches(t), Inches(w), Inches(h))
    tf = box.text_frame
    tf.word_wrap = True
    for i, runs in enumerate(paragraphs):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.space_after = Pt(8)
        for text, size, bold, color, font in runs:
            set_run(p.add_run(), text, size, bold, color, font)
    return box


def blank(prs):
    slide = prs.slides.add_slide(prs.slide_layouts[6])
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = PAPER
    return slide


def chrome(slide, kicker, title, number, total=18):
    add_text(slide, 0.55, 0.28, 10, 0.28, kicker.upper(), 12, True, ACCENT, "Calibri")
    add_text(slide, 0.55, 0.52, 12.2, 0.85, title, 30, False, INK, "Georgia")
    line = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.55), Inches(7.18), Inches(12.2), Emu(9525))
    line.fill.solid()
    line.fill.fore_color.rgb = LINE
    line.line.fill.background()
    add_text(slide, 0.55, 7.2, 8, 0.26, "Take-Two  ·  GTA VI  ·  economics project", 11, False, MUTED)
    add_text(slide, 10.4, 7.2, 2.35, 0.26, f"{number}  /  {total}", 11, False, MUTED, align=PP_ALIGN.RIGHT)


def notes(slide, text):
    slide.notes_slide.notes_text_frame.text = text


def shade_cell(cell, color):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    solid = tc_pr.makeelement(qn("a:solidFill"), {})
    srgb = solid.makeelement(qn("a:srgbClr"), {"val": f"{color[0]:02X}{color[1]:02X}{color[2]:02X}"})
    solid.append(srgb)
    # cell fill lives in tcPr as a:solidFill is wrong namespace; use cNv / tcBdr approach via cell.fill
    cell.fill.solid()
    cell.fill.fore_color.rgb = RGBColor(*color)


def write_cell(cell, text, size=13, bold=False, color=INK, fill=None):
    cell.text = ""
    tf = cell.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    set_run(p.add_run(), text, size, bold, color)
    cell.vertical_anchor = MSO_ANCHOR.MIDDLE
    if fill:
        cell.fill.solid()
        cell.fill.fore_color.rgb = RGBColor(*fill)
    else:
        cell.fill.solid()
        cell.fill.fore_color.rgb = WHITE


def add_table(slide, l, t, w, h, headers, rows, col_widths=None, font=13):
    table_shape = slide.shapes.add_table(len(rows) + (1 if headers else 0), len(rows[0]), Inches(l), Inches(t), Inches(w), Inches(h))
    table = table_shape.table
    if col_widths:
        for i, cw in enumerate(col_widths):
            table.columns[i].width = Inches(cw)
    offset = 0
    if headers:
        for j, head in enumerate(headers):
            write_cell(table.cell(0, j), head, font, True, SOFT, (0xEF, 0xEA, 0xE0))
        offset = 1
    for r, row in enumerate(rows):
        bg = (0xFB, 0xF8, 0xF1) if r % 2 == 0 else (0xF4, 0xEF, 0xE4)
        for c, value in enumerate(row):
            write_cell(table.cell(r + offset, c), value, font, False, INK, bg)
    return table_shape


def callout(slide, l, t, w, h, text, size=15):
    shape = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(l), Inches(t), Inches(0.06), Inches(h))
    shape.fill.solid()
    shape.fill.fore_color.rgb = ACCENT
    shape.line.fill.background()
    add_text(slide, l + 0.18, t, w - 0.18, h, text, size, False, SOFT)


def build():
    mix = chart_mix()
    demand = chart_demand()
    monopoly = chart_monopoly()
    cost = chart_cost()

    prs = Presentation()
    prs.slide_width = W
    prs.slide_height = H
    prs.core_properties.title = "Take-Two Interactive: The Eighty-Dollar Copy"
    prs.core_properties.subject = "Economics project deck on Grand Theft Auto VI"
    prs.core_properties.category = "Economics"

    # 1
    s = blank(prs)
    chrome(s, "Economics project  ·  9 minutes", "The eighty-dollar copy", 1)
    add_text(
        s, 0.55, 1.7, 12.1, 1.8,
        "Take-Two will sell Grand Theft Auto VI on November 19, 2026, at $79.99, with a $99.99 Ultimate Edition. GTA V already showed the pattern. The open question is whether this sticker prices the copy or the network.",
        22, False, SOFT, "Georgia",
    )
    add_text(s, 0.55, 3.7, 12.1, 0.8, "PlayStation 5 and Xbox Series X|S. No PC date. Single-player at launch. A free month of GTA+ on digital pre-orders.", 18)
    notes(s, NOTES[0])

    # 2
    s = blank(prs)
    chrome(s, "Thesis", "A pipeline launch that learned to be a platform", 2)
    add_text(
        s, 0.55, 1.7, 12.1, 1.7,
        "GTA V launched at the standard price of its decade, reached PC about nineteen months later, and by August 2026 had sold in more than 230 million units, with Online spending still growing.",
        22, False, SOFT, "Georgia",
    )
    add_text(
        s, 0.55, 3.6, 12.1, 1.2,
        "Fiscal 2027 bookings of $8.0 to $8.2 billion assume the firm can restart that pattern at a higher price. Marginal cost of the next copy is near zero. The value of an extra player is not.",
        18,
    )
    notes(s, NOTES[1])

    # 3
    s = blank(prs)
    chrome(s, "The firm  ·  fiscal 2026, year ended March 31", "Bigger than the myth, still tied to the hit", 3)
    add_table(
        s, 0.55, 1.65, 7.6, 4.9,
        None,
        [
            ["Net revenue", "$6.66B"],
            ["Net bookings", "$6.72B"],
            ["Gross margin", "57.2%, up from 41.9% in FY24"],
            ["Recurrent share of revenue", "78%"],
            ["Digital share", "97%"],
            ["Mobile / console / PC", "50% / 39% / 11%"],
            ["GTA share of revenue", "12.4%, about $825M"],
            ["Operating cash flow", "$624M, after two negative years"],
            ["GAAP net loss", "$298M, no goodwill charge this year"],
        ],
        [3.1, 4.5],
        14,
    )
    callout(s, 8.4, 1.7, 4.4, 2.4, "Prior-year losses were mobile goodwill impairments, $2.3B then $3.5B. Fiscal 2027 guide: Rockstar 37%, Zynga 34%, 2K 29%.", 16)
    notes(s, NOTES[2])

    # 4
    s = blank(prs)
    chrome(s, "Demand composition", "The recurrent share falls because the hit returns", 4)
    s.shapes.add_picture(mix, Inches(0.45), Inches(1.55), Inches(12.4), Inches(5.35))
    notes(s, NOTES[3])

    # 5
    s = blank(prs)
    chrome(s, "Lecture 2  ·  demand", "230 million units are a history of shifts", 5)
    s.shapes.add_picture(demand, Inches(0.4), Inches(1.5), Inches(12.5), Inches(5.45))
    notes(s, NOTES[4])

    # 6
    s = blank(prs)
    chrome(s, "Lecture 2  ·  elasticity  ·  scenarios, not a forecast", "$79.99 is optimal only if fans are moderately inelastic", 6)
    add_table(
        s, 0.55, 1.65, 12.2, 3.5,
        ["|ε| at $69.99", "Units at $79.99", "Revenue change", "Static monopoly price"],
        [
            ["0.40", "33.0M", "+$190M", "$122"],
            ["0.70", "31.5M", "+$70M", "$85"],
            ["0.78", "31.1M", "+$38M, the peak", "$80"],
            ["1.00", "30.0M", "−$50M", "$70"],
            ["1.20", "29.0M", "−$130M", "$64"],
        ],
        [3.05, 3.05, 3.05, 3.05],
        15,
    )
    callout(s, 0.55, 5.45, 12.2, 1.15, "Anchor: 35 million console units at $69.99, linear demand, marginal cost zero. A storefront percentage fee does not change which row wins.", 16)
    notes(s, NOTES[5])

    # 7
    s = blank(prs)
    chrome(s, "Lectures 4 and 5  ·  MR = MC", "One seller, a downward slope, a supply point", 7)
    s.shapes.add_picture(monopoly, Inches(0.4), Inches(1.5), Inches(12.5), Inches(5.45))
    notes(s, NOTES[6])

    # 8
    s = blank(prs)
    chrome(s, "Lectures 3 and 6  ·  costs of an information good", "Average cost falls. The budget is already sunk.", 8)
    s.shapes.add_picture(cost, Inches(0.4), Inches(1.5), Inches(12.5), Inches(5.45))
    notes(s, NOTES[7])

    # 9
    s = blank(prs)
    chrome(s, "Lectures 4 and 5  ·  name the market first", "A copyright monopoly inside an oligopoly", 9)
    add_table(
        s, 0.55, 1.6, 12.2, 2.3,
        ["Market", "Structure", "Price implication"],
        [
            ["This launch", "Copyright monopoly", "P above MC, where MR = MC"],
            ["Big-budget publishers", "Differentiated oligopoly", "Few firms, rising first-copy costs"],
            ["Hours after launch", "Multi-homing platforms", "Fortnite and Roblox cap the markup"],
        ],
        [3.3, 4.2, 4.7],
        14,
    )
    add_text(
        s, 0.55, 4.2, 12.2, 2.4,
        "Perfect competition fails: the good is differentiated, entry cannot copy the IP, and price is not marginal cost. Monopolistic competition’s zero-profit long run fits a mobile puzzle better than it fits GTA. Entrants ship substitutes. They do not inherit the network.",
        18,
    )
    notes(s, NOTES[8])

    # 10
    s = blank(prs)
    chrome(s, "Lectures 6 and 7  ·  discrimination, bundling", "The menu, mapped to the three degrees", 10)
    add_table(
        s, 0.55, 1.6, 12.2, 5.1,
        None,
        [
            ["First degree", "Unavailable. Willingness to pay is hidden, codes move, and personalized prices create resentment."],
            ["Second degree", "Ultimate Edition, +$20, near-zero marginal cost extras. Players sort themselves."],
            ["Third degree", "Impatient buyers now. The 10-K’s cuts three to nine months later. PC later. Regional storefronts."],
            ["Bundle", "Vintage Vice City Pack plus a month of GTA+, both cheap to deliver once made."],
            ["Razor and blade", "Shark Cards and GTA+. Same person, both products. Resentment is already the constraint."],
        ],
        [2.6, 9.6],
        15,
    )
    notes(s, NOTES[9])

    # 11 platform as shapes
    s = blank(prs)
    chrome(s, "Lectures 8 and 9  ·  which side is subsidized", "Charge players. Do not charge creators.", 11)
    add_text(s, 0.7, 1.55, 12, 0.35, "Cross-side: more missions make the player base more valuable, and more players make missions worth building", 14, False, BLUE, align=PP_ALIGN.CENTER)

    def card(l, t, w, h, title, sub, fill, title_color, sub_color, border):
        shape = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(l), Inches(t), Inches(w), Inches(h))
        shape.fill.solid()
        shape.fill.fore_color.rgb = fill
        shape.line.color.rgb = border
        tf = shape.text_frame
        tf.word_wrap = True
        tf.paragraphs[0].alignment = PP_ALIGN.CENTER
        set_run(tf.paragraphs[0].add_run(), title, 18, True, title_color, "Georgia")
        p2 = tf.add_paragraph()
        p2.alignment = PP_ALIGN.CENTER
        set_run(p2.add_run(), sub, 13, False, sub_color)
        tf.paragraphs[0].space_before = Pt(10)

    card(0.7, 2.1, 3.5, 1.35, "Players", "Money side", WHITE, INK, ACCENT, INK)
    card(4.9, 2.1, 3.5, 1.35, "Rockstar", "Owns the world and the price", BLUE, WHITE, RGBColor(0xD5, 0xDE, 0xEA), BLUE)
    card(9.1, 2.1, 3.5, 1.35, "Creators", "Subsidy side", WHITE, INK, GREEN, GREEN)
    add_text(s, 0.7, 3.55, 3.5, 0.4, "Pay $79.99, Ultimate, GTA+", 13, False, ACCENT, align=PP_ALIGN.CENTER)
    add_text(s, 4.9, 3.55, 3.5, 0.4, "Ships a single-player pipeline first", 13, False, GOLD, align=PP_ALIGN.CENTER)
    add_text(s, 9.1, 3.55, 3.5, 0.4, "Mission Creator stays free", 13, False, GREEN, align=PP_ALIGN.CENTER)
    box = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.3), Inches(4.35), Inches(8.7), Inches(0.85))
    box.fill.solid()
    box.fill.fore_color.rgb = WHITE
    box.line.color.rgb = GOLD
    tf = box.text_frame
    tf.word_wrap = True
    tf.paragraphs[0].alignment = PP_ALIGN.CENTER
    set_run(tf.paragraphs[0].add_run(), "Same-side among players is positive. A console-only launch cuts that network on day one.", 15, False, INK)
    add_text(s, 0.7, 5.4, 12, 0.5, "Among creators, same-side effects can turn negative if missions compete for attention.", 15, False, MUTED, align=PP_ALIGN.CENTER)
    notes(s, NOTES[10])

    # 12
    s = blank(prs)
    chrome(s, "The console-first window", "Delay has a price, even when marginal cost is low", 12)
    add_text(s, 0.55, 1.55, 12.2, 0.9, "Reported management benchmark: PC can be 45–50% of a big title that releases there. GTA V waited about 19 months. Company-wide PC is only 11% of revenue because mobile is half the firm.", 16)
    add_table(
        s, 0.55, 2.6, 12.2, 2.6,
        ["Of each 10M potential PC buyers", "Later price", "Revenue", "Gap versus $80 now"],
        [
            ["None lost, only delayed", "$79.99", "$800M later", "Time, and a smaller launch network"],
            ["15% lost", "$49.99", "$425M", "about $375M"],
            ["30% lost", "$39.99", "$280M", "about $520M"],
        ],
        [3.6, 2.0, 2.2, 4.4],
        14,
    )
    notes(s, NOTES[11])

    # 13
    s = blank(prs)
    chrome(s, "What the firm should do", "Four moves, each tied to a model", 13)
    items = [
        "1   Because MC is near zero and |ε| must be about 1, treat $79.99 as a test and pre-commit the later cuts. Use Ultimate, not a higher base, for inelastic fans.",
        "2   Because a missing PC date shrinks the same-side network, name the window now and price that release lower.",
        "3   Because creators are the subsidy side, give Mission Creator away. Because differentiation protects the monopoly, do not become Roblox.",
        "4   Because recurrent dollars are guided flat, do not “fix” a share that falls from 78% to 64% when the full game returns.",
    ]
    top = 1.65
    for item in items:
        add_text(s, 0.55, top, 12.2, 1.15, item, 18)
        top += 1.2
    notes(s, NOTES[12])

    # 14
    s = blank(prs)
    chrome(s, "Close", "What would change the recommendation", 14)
    add_text(
        s, 0.55, 1.7, 12.1, 2.2,
        "If the first sales month shows |ε| well below 0.78, the sticker has room and the test passed. If comparable Rockstar PC demand is small, the delay is cheap. If recurrent dollars fall, rather than hold flat, the portfolio warning in recommendation 4 gets sharper.",
        22, False, SOFT, "Georgia",
    )
    add_text(s, 0.55, 4.2, 12.1, 0.8, "Assumptions, filings, and the live elasticity diagram are in the memo. Appendix slides are for Q&A.", 18)
    notes(s, NOTES[13])

    # 15
    s = blank(prs)
    chrome(s, "Appendix  ·  algebra", "Where 0.78 comes from", 15)
    add_text(s, 0.55, 1.7, 12.1, 1.1, "Q = A − B P, forced through Q(69.99) = 35. With MC = 0, MR = 0 at the midpoint, so p* = A / (2B).", 20)
    add_text(s, 0.55, 3.0, 12.1, 1.3, "Set p* = 79.99 and solve. |ε| at $69.99 is about 0.78. The markup rule the course uses is (P − MC) / P = 1 / |ε|. At MC = 0 that is |ε| = 1, which for a linear curve is the midpoint.", 20)
    add_text(s, 0.55, 4.5, 12.1, 1.1, "A fee that takes a share τ of revenue multiplies R by (1 − τ) at every price. The maximizing price does not move.", 20)
    notes(s, NOTES[14])

    # 16
    s = blank(prs)
    chrome(s, "Appendix  ·  reading the loss", "Cash turned. Accounting has not caught up.", 16)
    add_table(
        s, 0.55, 1.6, 12.2, 3.2,
        ["", "FY24", "FY25", "FY26", "FY27 guide"],
        [
            ["Revenue", "5.35B", "5.63B", "6.66B", "7.9–8.1B"],
            ["Goodwill impairment", "2.34B", "3.55B", "—", "—"],
            ["Net income", "−3.74B", "−4.48B", "−0.30B", "+0.10 to 0.14B"],
            ["Operating cash flow", "−16M", "−45M", "+624M", "above 1B"],
        ],
        [3.0, 2.3, 2.3, 2.3, 2.3],
        15,
    )
    add_text(s, 0.55, 5.15, 12.2, 1.2, "Q1 FY27: bookings $1.39B, down 3%. A $43M impairment of a cancelled third-party title. That write-off is the sunk-cost rule applied correctly.", 18)
    notes(s, NOTES[15])

    # 17
    s = blank(prs)
    chrome(s, "Appendix  ·  conduct", "Why this is not Cournot week", 17)
    add_text(s, 0.55, 1.7, 12.1, 1.6, "Publishers do react to each other. Other large games leave the week of November 19. That is a leader committing to a date, and rivals choosing quantities of attention around it.", 20)
    add_text(s, 0.55, 3.5, 12.1, 2.0, "The price of GTA VI is not a guess about EA’s quantity. EA’s fiscal 2026 bookings were $8.03 billion, the scale Take-Two is guiding to by adding one game. The goods are differentiated, so a Bertrand race to marginal cost does not start. Copyright is the barrier that keeps it from starting.", 20)
    notes(s, NOTES[16])

    # 18
    s = blank(prs)
    chrome(s, "Appendix  ·  tools", "What was generated, and what was filed", 18)
    add_text(s, 0.55, 1.8, 12.1, 0.6, "Grok.", 28, False, INK, "Georgia")
    add_text(s, 0.55, 2.8, 12.1, 1.6, "Not from a filing, and labeled as such: the 35 million unit anchor, the elasticity cases, the illustrative fixed cost, the PC-delay scenarios, and press accounts of the May 2026 Bloomberg interview.", 20)
    notes(s, NOTES[17])

    OUT.parent.mkdir(parents=True, exist_ok=True)
    prs.save(OUT)
    print(OUT, OUT.stat().st_size)


if __name__ == "__main__":
    build()
