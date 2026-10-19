Title: Live Content

Description: Fetched live

Source: https://raw.githubusercontent.com/Leonxlnx/taste-skill/main/skills/taste-skill/references/research.md

---

# The study

Everything numeric in this skill comes from here. Cite these figures; do not round them up or invent
others.

## Contents

1. Method and its limits
2. Scores
3. Where the idea comes from
4. Headlines
5. Type
6. Devices: what separates strong from weak, and what does not
7. Colour and shape
8. Imagery and page structure
9. What the inspector says about the gallery itself
10. The 25 highest-scored sites and their ideas
11. How the skill was tested

## 1. Method and its limits

- **Sample.** 248 sites collected on 5 October 2026: 156 from One Page Love (the latest gallery pages
  and the category listings) and 92 Awwwards Sites of the Day (the three most recent listing pages).
  247 loaded; 246 were re-measured with the final probe.
- **Capture.** Headless Chrome at 1440×900 and 390×844. For each site: the first viewport, five more
  frames while scrolling with real wheel input, the mobile first viewport, and a measurement pass in
  the page (computed styles, text geometry, colours, fonts actually loaded).
- **Panel.** 21 model reviewers each studied about 12 sites from the screenshots and the measurements,
  described them (idea, hero, type, colour, imagery, layout, sections) and scored them the Awwwards
  way: design 40%, usability 30%, creativity 20%, content 10%. These are model judgements from still
  frames, not human jurors and not the real Awwwards scores. Batches mixed both sources so each
  reviewer saw a spread.
- **Usable sets.** 235 sites were usable for the panel (12 showed only a preloader, an entry gate or a
  bot wall). 202 were measurable for typography (a page with at least 25 words and a detectable
  headline). "Top" below means panel score 7.5 or higher (82 measurable sites); "weak" means under 6.5
  (23 measurable sites).
- **Limits.** One capture per site on one day. Some heroes were caught mid-animation or behind a cookie
  notice. WebGL-heavy sites are under-described by text measurements. The eyebrow detector counts any
  small short label directly above a large heading, so it over-counts against the panel's stricter
  reading (60% measured against 35% observed). Motion was inferred from frames, not watched. The sample
  is whatever the two galleries had recently featured; it is fashion as much as quality.

## 2. Scores

| | All 235 | One Page Love (151) | Awwwards (84) |
| --- | --- | --- | --- |
| Median overall | 7.2 | 7.1 | 7.5 |
| Middle half | 6.8–7.6 | | |
| 8.0 or higher | 25 sites (11%) | | |
| 7.5 or higher | 90 sites (38%) | | |
| Under 6.5 | 29 sites | | |

Median by criterion: design 8, usability 7, creativity 7, content 7. Among the top 25: design 9,
usability 7, creativity 8, content 8. Usability is the one line that does not rise with the rest: the
best sites are no easier to use than the average one. Do not copy their gates, preloaders, tiny text
or hidden navigation.

## 3. Where the idea comes from

The clearest pattern in the panel's notes: high scores go with a concept taken from the subject, and
low scores go with its absence. The weakest entries' ideas were recorded in words like "none beyond the
standard dark SaaS launch formula", "no visual idea beyond clarity", "no strong idea". The strongest
were sentences only that subject could own (section 10).

Recurring engines among the 7.3+ sites, each the basis of a direction in the library:

- **The product demonstrates itself.** A colour picker's loupe reads the page's own background; a list
  tool is sold with tiny working lists; a photo app's page is a wall of its own output.
- **The page is an artefact from the subject's world.** A wedding site that is the invitation; an
  archive as tabbed folders; a coupon with a cut line; a portfolio as a contact sheet.
- **The name is the hero.** Wordmarks as wide as the screen, a photograph set inside the name like a
  letter, a name split to opposite corners with the page between.
- **One motif from the subject drives everything.** A tool's octagonal section as button, mask and
  loader; two circles for two accounts; a café's stripes.
- **Dressed as another category.** A money app as a streetwear drop; an industrial roaster as a design
  object; a parcel service as a fairground.
- **The place carries it.** One full-bleed view and a name along the bottom edge.
- **A fixed stage.** A title or object stays put while content swaps beneath it.
- **One section, one colour.** Flat fields as chapters.
- **Radical understatement.** A 27px headline and tiny live demonstrations, carried through completely.

Hero types, by the panel's classification (top sites against weak sites): full-bleed media with type
over it 16% / 10%; giant wordmark 14% / 0%; typographic poster 13% / 7%; text beside media 10% / 3%;
**centred statement with media below 7% / 24%**. The centred headline over a screenshot is the weak
sites' signature layout.

## 4. Headlines

| Hero headline | All | Top | Weak |
| --- | --- | --- | --- |
| Words, median | 5 | 5 | 5 |
| Words, middle half | 3–9 | 2–8 | 3–8 |
| Characters, median | 32 | | |
| One line at 1440 | 47% | | |
| Two lines or fewer at 1440 | 70% | 71% | 83% |
| Two lines or fewer at 390 | 57% | | |
| Three lines or fewer at 390 | 82% | | |

Awwwards heroes are shorter (median 4 words, 76% within two lines) than One Page Love's (6 words, 66%).
Section headings have a median of 3 words. Length does not separate strong from weak; nearly everyone
in the gallery writes short headlines. The two-line limit in this skill is a house rule that most of
the gallery already meets on desktop and that takes care to meet on a phone.

## 5. Type

| | All | Top | Weak |
| --- | --- | --- | --- |
| Hero size, median | 72px (5.0vw) | 6.0vw | 4.7vw |
| Hero size, middle half | 3.0–7.6vw | 2.5–9.7vw | 2.7–6.1vw |
| Largest text on the page, median | 6.4vw | 8.4vw | 5.0vw |
| Largest text, upper quarter starts at | 10.4vw | 12.5vw | 6.7vw |
| Hero on a phone, median | 40px | | |
| Hero tracking, median (middle half) | -0.01em (-0.03 to 0) | | |
| Hero leading, median (middle half) | 1.0 (0.95–1.1) | | |
| Body size, median (middle half) | 16px (14–18) | | |
| Headline ÷ body, median | 4.3 | 4.7 | 4.0 |
| Typefaces carrying 3%+ of text | one 31%, two 45%, three 22% | | |
| Distinct font sizes, median | 8 | | |

Hero weight: regular 48%, medium 18%, semibold 6%, bold or heavier 22%, light 6%. Capitals 24%.
Centred 39% overall, 52% on weak sites. Display classes by the panel: neo-grotesk 48%, transitional
serif 11%, geometric sans 10%, condensed 6%, extended 6%, old-style serif 4%, custom lettering 4%.

Strong sites push the extremes: their biggest type is bigger and their range is wider. Weak sites
cluster in the middle.

## 6. Devices: what separates strong from weak, and what does not

Measured in the page unless marked (panel).

**More common on weak sites (the data supports avoiding them):**

| Device | Top | Weak |
| --- | --- | --- |
| Icon-topped feature cards (panel) | 1% | 28% |
| Rows of identical cards with a small icon (measured) | 7% | 26% |
| Pill badges (panel) | 14% | 34% |
| Pill-shaped label above a heading (measured) | 5% | 26% |
| Tiny uppercase letter-spaced labels, any | 16% | 57% |
| Tiny uppercase letter-spaced labels, three or more | 6% | 43% |
| Gradient fills (not counting scrims) | 22% | 52% |
| Gradient text | 2% | 13% |
| Shadows on resting elements, any | 24% | 48% |
| Shadows, five or more | 10% | 30% |
| Emoji in the page | 10% | 26% |
| Eyebrow labels (panel) | 32% | 45% |

**No real difference:**

| Device | Top | Weak |
| --- | --- | --- |
| Backdrop blur anywhere | 32% | 39% |
| Italic-serif accent word (panel) | 4% | 7% |
| Thin rules, any | 61% | 52% |

**More common on strong sites (banned here anyway, as house style):**

| Device | Top | Weak |
| --- | --- | --- |
| Monospace labels (panel) | 44% | 24% |
| Monospace anywhere outside code (measured) | 45% | 26% |
| Index numbering (panel) | 38% | 21% |

Monospace captions, index numbers and ruled grids are the present fashion of award sites. They are
excluded from this skill by the owner's choice, not by the data: they are the devices generators copy
first, and a page that cannot lean on them has to find structure in space, tone and scale.

## 7. Colour and shape

- Dark page ground 41%; pure white 25%; pure black 12%; a warm off-white 13%.
- Scheme (panel): monochrome plus one accent 23%, light neutral 22%, dark neutral 14%, several flat
  colours 13%, two-tone 12%, photographic 9%, one colour field 6%.
- Primary buttons are neutral (black, white, grey) on 52% of sites. One site in 246 has a terracotta
  button; none has a violet one.
- Median number of distinct section grounds: 2 on top sites, 1 on weak sites.
- Button shape: top sites square (0–2px) 52%, fully round 23%, small r

