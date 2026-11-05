// Pill Portfolio Design System Generator (Figma Plugin v3)
// Explicit Width Architecture - Clean 1320px Grid - No Narrow Collapsing

async function run() {
  figma.notify("Generating formatted Pill Design System...", { timeout: 1500 });

  // 1. Remove previous artboard
  const existing = figma.currentPage.findOne(node => node.name === "❖ Pill Portfolio Design System");
  if (existing) {
    existing.remove();
  }

  // 2. Load Fonts
  try {
    await Promise.all([
      figma.loadFontAsync({ family: "Inter", style: "Regular" }),
      figma.loadFontAsync({ family: "Inter", style: "Medium" }),
      figma.loadFontAsync({ family: "Inter", style: "Semi Bold" }),
      figma.loadFontAsync({ family: "Inter", style: "Bold" })
    ]);
  } catch (err) {
    console.error("Font error:", err);
  }

  // 3. Helper Functions
  function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    return {
      r: parseInt(clean.substring(0, 2), 16) / 255,
      g: parseInt(clean.substring(2, 4), 16) / 255,
      b: parseInt(clean.substring(4, 6), 16) / 255
    };
  }

  function createText(text, size, weight, colorHex, opacity = 1) {
    const t = figma.createText();
    t.fontName = { family: "Inter", style: weight };
    t.characters = text;
    t.fontSize = size;
    t.fills = [{
      type: "SOLID",
      color: hexToRgb(colorHex),
      opacity: opacity
    }];
    return t;
  }

  // 4. Safe Positioning: place to the right of all existing screens
  let safeX = 0;
  for (const node of figma.currentPage.children) {
    if ('x' in node && 'width' in node) {
      safeX = Math.max(safeX, node.x + node.width);
    }
  }
  safeX += 120; // 120px clean gap

  const BOARD_WIDTH = 1320;
  const INNER_WIDTH = BOARD_WIDTH - 128; // 1192px

  // 5. Main Artboard with FIXED WIDTH
  const artboard = figma.createFrame();
  artboard.name = "❖ Pill Portfolio Design System";
  artboard.layoutMode = "VERTICAL";
  artboard.primaryAxisSizingMode = "AUTO"; // height hugs content
  artboard.counterAxisSizingMode = "FIXED"; // fixed width 1320px
  artboard.resize(BOARD_WIDTH, 100);
  artboard.itemSpacing = 56;
  artboard.paddingTop = 64;
  artboard.paddingBottom = 64;
  artboard.paddingLeft = 64;
  artboard.paddingRight = 64;
  artboard.cornerRadius = 32;
  artboard.fills = [{ type: "SOLID", color: hexToRgb("091B2E") }];
  artboard.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.15 }];
  artboard.strokeWeight = 1;
  artboard.x = safeX;
  artboard.y = 0;
  figma.currentPage.appendChild(artboard);

  // -------------------------------------------------------------
  // HEADER
  // -------------------------------------------------------------
  const header = figma.createFrame();
  header.name = "Header";
  header.layoutMode = "VERTICAL";
  header.layoutAlign = "STRETCH";
  header.itemSpacing = 12;
  header.fills = [];

  const titleRow = figma.createFrame();
  titleRow.layoutMode = "HORIZONTAL";
  titleRow.itemSpacing = 16;
  titleRow.primaryAxisAlignItems = "CENTER";
  titleRow.fills = [];

  titleRow.appendChild(createText("PILL PORTFOLIO DESIGN SYSTEM", 36, "Bold", "FFFFFF"));

  const badge = figma.createFrame();
  badge.layoutMode = "HORIZONTAL";
  badge.paddingTop = 6;
  badge.paddingBottom = 6;
  badge.paddingLeft = 14;
  badge.paddingRight = 14;
  badge.cornerRadius = 9999;
  badge.fills = [{ type: "SOLID", color: hexToRgb("3384FB"), opacity: 0.25 }];
  badge.strokes = [{ type: "SOLID", color: hexToRgb("3384FB") }];
  badge.strokeWeight = 1;
  badge.appendChild(createText("Figma 102 Compliant", 13, "Semi Bold", "FFFFFF"));
  titleRow.appendChild(badge);

  header.appendChild(titleRow);
  header.appendChild(createText("Foundations, Tokens, Physical Switches, Apple Pure Glass, and Mobile 0-Gap Stack (Frame 11 Parity)", 16, "Regular", "FFFFFF", 0.65));
  artboard.appendChild(header);

  // Divider
  function createDivider() {
    const d = figma.createRectangle();
    d.resize(INNER_WIDTH, 1);
    d.layoutAlign = "STRETCH";
    d.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.12 }];
    return d;
  }

  artboard.appendChild(createDivider());

  // -------------------------------------------------------------
  // SECTION 1: Color Tokens (6 Swatches Grid)
  // -------------------------------------------------------------
  const sec1 = figma.createFrame();
  sec1.name = "01. Color Palette";
  sec1.layoutMode = "VERTICAL";
  sec1.layoutAlign = "STRETCH";
  sec1.itemSpacing = 20;
  sec1.fills = [];

  sec1.appendChild(createText("01. COLOR & SURFACE TOKENS", 20, "Bold", "FFFFFF"));

  const swatchesRow = figma.createFrame();
  swatchesRow.name = "Swatches Grid";
  swatchesRow.layoutMode = "HORIZONTAL";
  swatchesRow.primaryAxisSizingMode = "AUTO";
  swatchesRow.itemSpacing = 20;
  swatchesRow.fills = [];

  const tokenList = [
    { name: "Canvas BG", hex: "091B2E", desc: "#091B2E - Dark Navy" },
    { name: "Track Off", hex: "B0B7C3", desc: "#B0B7C3 - Neutral Cavity" },
    { name: "Chassis Pure", hex: "FFFFFF", desc: "#FFFFFF - 18px Frame" },
    { name: "Ungdomskort", hex: "3384FB", desc: "#3384FB - Blue Accent" },
    { name: "X-Bit", hex: "4CCF59", desc: "#4CCF59 - Green Accent" },
    { name: "I Pupi Siciliani", hex: "3D382E", desc: "#3D382E - Dark Bronze" }
  ];

  for (const item of tokenList) {
    const card = figma.createFrame();
    card.name = item.name;
    card.layoutMode = "VERTICAL";
    card.itemSpacing = 10;
    card.paddingTop = 14;
    card.paddingBottom = 14;
    card.paddingLeft = 14;
    card.paddingRight = 14;
    card.cornerRadius = 16;
    card.resize(182, 170);
    card.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.05 }];
    card.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.12 }];
    card.strokeWeight = 1;

    const swatch = figma.createRectangle();
    swatch.resize(154, 88);
    swatch.cornerRadius = 10;
    swatch.fills = [{ type: "SOLID", color: hexToRgb(item.hex) }];
    card.appendChild(swatch);

    card.appendChild(createText(item.name, 14, "Semi Bold", "FFFFFF"));
    card.appendChild(createText(item.desc, 11, "Regular", "FFFFFF", 0.6));
    swatchesRow.appendChild(card);
  }
  sec1.appendChild(swatchesRow);
  artboard.appendChild(sec1);

  artboard.appendChild(createDivider());

  // -------------------------------------------------------------
  // SECTION 2: Atoms (Knobs)
  // -------------------------------------------------------------
  const sec2 = figma.createFrame();
  sec2.name = "02. Atoms: Physical Knobs";
  sec2.layoutMode = "VERTICAL";
  sec2.layoutAlign = "STRETCH";
  sec2.itemSpacing = 20;
  sec2.fills = [];
  sec2.appendChild(createText("02. ATOMS: PHYSICAL SKEUOMORPHIC KNOBS", 20, "Bold", "FFFFFF"));

  const knobRow = figma.createFrame();
  knobRow.layoutMode = "HORIZONTAL";
  knobRow.primaryAxisSizingMode = "AUTO";
  knobRow.itemSpacing = 32;
  knobRow.fills = [];

  function buildKnobCard(size, label, specs) {
    const card = figma.createFrame();
    card.name = `Knob / ${label}`;
    card.layoutMode = "HORIZONTAL";
    card.primaryAxisAlignItems = "CENTER";
    card.itemSpacing = 28;
    card.paddingTop = 24;
    card.paddingBottom = 24;
    card.paddingLeft = 32;
    card.paddingRight = 32;
    card.cornerRadius = 24;
    card.resize(size > 150 ? 600 : 540, 240);
    card.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.04 }];
    card.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.10 }];
    card.strokeWeight = 1;

    const knob = figma.createFrame();
    knob.name = "Physical Knob";
    knob.resize(size, size);
    knob.cornerRadius = size / 2;
    knob.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF") }];

    knob.effects = [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.24 }, offset: { x: 0, y: 20 }, radius: 48, spread: 0, visible: true, blendMode: "NORMAL" },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.14 }, offset: { x: 0, y: 6 }, radius: 14, spread: 0, visible: true, blendMode: "NORMAL" },
      { type: "INNER_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: -8 }, radius: 16, spread: 0, visible: true, blendMode: "NORMAL" },
      { type: "INNER_SHADOW", color: { r: 1, g: 1, b: 1, a: 0.90 }, offset: { x: 0, y: 4 }, radius: 8, spread: 0, visible: true, blendMode: "NORMAL" }
    ];

    const meta = figma.createFrame();
    meta.layoutMode = "VERTICAL";
    meta.itemSpacing = 8;
    meta.fills = [];
    meta.appendChild(createText(label, 18, "Semi Bold", "FFFFFF"));
    meta.appendChild(createText(`Size: ${size} x ${size} px (1:1)`, 13, "Medium", "FFFFFF", 0.7));
    meta.appendChild(createText("Layers: 2x Drop Shadow (Ambient+Key) + 2x Inner (Top Specular + Bottom Inset)", 12, "Regular", "FFFFFF", 0.5));

    card.appendChild(knob);
    card.appendChild(meta);
    return card;
  }

  knobRow.appendChild(buildKnobCard(180, "Desktop Knob", "Main stage switch"));
  knobRow.appendChild(buildKnobCard(110, "Mobile Knob", "Stacked capsule"));
  sec2.appendChild(knobRow);
  artboard.appendChild(sec2);

  artboard.appendChild(createDivider());

  // -------------------------------------------------------------
  // SECTION 3: Giant Switches (Side by Side Row)
  // -------------------------------------------------------------
  const sec3 = figma.createFrame();
  sec3.name = "03. Giant Switches";
  sec3.layoutMode = "VERTICAL";
  sec3.layoutAlign = "STRETCH";
  sec3.itemSpacing = 20;
  sec3.fills = [];
  sec3.appendChild(createText("03. GIANT PHYSICAL SWITCHES (CHASSIS BORDER 18PX)", 20, "Bold", "FFFFFF"));

  function buildSwitch(width, height, trackColorHex, state, label) {
    const chassis = figma.createFrame();
    chassis.name = `${label} [${state}]`;
    chassis.resize(width, height);
    chassis.cornerRadius = 1000;
    chassis.fills = [];
    chassis.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF") }];
    chassis.strokeWeight = 16;
    chassis.strokeAlign = "INSIDE";

    const track = figma.createFrame();
    track.name = "Track Cavity";
    track.resize(width - 32, height - 32);
    track.x = 16;
    track.y = 16;
    track.cornerRadius = 1000;
    track.fills = [{ type: "SOLID", color: hexToRgb(state === "ON" ? trackColorHex : "B0B7C3") }];
    track.effects = [{
      type: "INNER_SHADOW",
      color: { r: 0, g: 0, b: 0, a: 0.22 },
      offset: { x: 0, y: 8 },
      radius: 20,
      spread: 0,
      visible: true,
      blendMode: "NORMAL"
    }];

    const pad = 14;
    const knobSize = height - 32 - (pad * 2);
    const knob = figma.createFrame();
    knob.name = "Knob";
    knob.resize(knobSize, knobSize);
    knob.cornerRadius = knobSize / 2;
    knob.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF") }];
    knob.y = pad;
    knob.x = state === "ON" ? (track.width - knobSize - pad) : pad;

    knob.effects = [
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.24 }, offset: { x: 0, y: 16 }, radius: 36, spread: 0, visible: true, blendMode: "NORMAL" },
      { type: "DROP_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.14 }, offset: { x: 0, y: 6 }, radius: 12, spread: 0, visible: true, blendMode: "NORMAL" },
      { type: "INNER_SHADOW", color: { r: 0, g: 0, b: 0, a: 0.12 }, offset: { x: 0, y: -6 }, radius: 12, spread: 0, visible: true, blendMode: "NORMAL" },
      { type: "INNER_SHADOW", color: { r: 1, g: 1, b: 1, a: 0.90 }, offset: { x: 0, y: 3 }, radius: 6, spread: 0, visible: true, blendMode: "NORMAL" }
    ];

    track.appendChild(knob);
    chassis.appendChild(track);
    return chassis;
  }

  const switchesRow = figma.createFrame();
  switchesRow.name = "Switches Row";
  switchesRow.layoutMode = "HORIZONTAL";
  switchesRow.primaryAxisSizingMode = "AUTO";
  switchesRow.itemSpacing = 28;
  switchesRow.fills = [];

  switchesRow.appendChild(buildSwitch(378, 180, "3384FB", "OFF", "Ungdomskort"));
  switchesRow.appendChild(buildSwitch(378, 180, "3384FB", "ON", "Ungdomskort"));
  switchesRow.appendChild(buildSwitch(378, 180, "4CCF59", "ON", "X-Bit"));
  sec3.appendChild(switchesRow);
  artboard.appendChild(sec3);

  artboard.appendChild(createDivider());

  // -------------------------------------------------------------
  // SECTION 4: Hero Glass Capsule
  // -------------------------------------------------------------
  const sec4 = figma.createFrame();
  sec4.name = "04. Hero Glass Capsule";
  sec4.layoutMode = "VERTICAL";
  sec4.layoutAlign = "STRETCH";
  sec4.itemSpacing = 20;
  sec4.fills = [];
  sec4.appendChild(createText("04. HERO GLASS CAPSULE (PURE TRANSLUCENCY - NO BLUR)", 20, "Bold", "FFFFFF"));

  const heroCapsule = figma.createFrame();
  heroCapsule.name = "Hero Capsule Preview";
  heroCapsule.layoutMode = "VERTICAL";
  heroCapsule.primaryAxisAlignItems = "CENTER";
  heroCapsule.counterAxisAlignItems = "CENTER";
  heroCapsule.itemSpacing = 32;
  heroCapsule.paddingTop = 48;
  heroCapsule.paddingBottom = 48;
  heroCapsule.paddingLeft = 64;
  heroCapsule.paddingRight = 64;
  heroCapsule.resize(INNER_WIDTH, 290);
  heroCapsule.cornerRadius = 1000;
  heroCapsule.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.12 }];
  heroCapsule.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.35 }];
  heroCapsule.strokeWeight = 2;
  heroCapsule.effects = [
    { type: "DROP_SHADOW", color: { r: 0, g: 10/255, b: 30/255, a: 0.45 }, offset: { x: 0, y: 25 }, radius: 65, spread: 0, visible: true, blendMode: "NORMAL" },
    { type: "INNER_SHADOW", color: { r: 1, g: 1, b: 1, a: 0.50 }, offset: { x: 0, y: 1 }, radius: 2, spread: 0, visible: true, blendMode: "NORMAL" }
  ];

  // Floating Nav Pill
  const navPill = figma.createFrame();
  navPill.name = "Floating Nav Pill";
  navPill.layoutMode = "HORIZONTAL";
  navPill.itemSpacing = 24;
  navPill.paddingTop = 10;
  navPill.paddingBottom = 10;
  navPill.paddingLeft = 24;
  navPill.paddingRight = 24;
  navPill.cornerRadius = 9999;
  navPill.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.85 }];
  navPill.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.40 }];
  navPill.strokeWeight = 1;

  navPill.appendChild(createText("Home", 13, "Bold", "171717"));
  navPill.appendChild(createText("Work & Archive", 13, "Medium", "6B7280"));
  navPill.appendChild(createText("About", 13, "Medium", "6B7280"));
  navPill.appendChild(createText("Contact", 13, "Medium", "6B7280"));
  heroCapsule.appendChild(navPill);

  const heroText = createText("Hi, I'm Herald :) I design digital products that simplify people's lives", 28, "Bold", "FFFFFF");
  heroText.textAlignHorizontal = "CENTER";
  heroCapsule.appendChild(heroText);

  sec4.appendChild(heroCapsule);
  artboard.appendChild(sec4);

  artboard.appendChild(createDivider());

  // -------------------------------------------------------------
  // SECTION 5: Mobile 0-Gap Stack (Frame 11 Parity)
  // -------------------------------------------------------------
  const sec5 = figma.createFrame();
  sec5.name = "05. Mobile Stack Parity";
  sec5.layoutMode = "VERTICAL";
  sec5.layoutAlign = "STRETCH";
  sec5.itemSpacing = 20;
  sec5.fills = [];
  sec5.appendChild(createText("05. MOBILE 0-GAP STACK (FRAME 11 PARITY)", 20, "Bold", "FFFFFF"));

  const mobileRow = figma.createFrame();
  mobileRow.layoutMode = "HORIZONTAL";
  mobileRow.itemSpacing = 48;
  mobileRow.primaryAxisAlignItems = "CENTER";
  mobileRow.fills = [];

  const mobilePhone = figma.createFrame();
  mobilePhone.name = "Mobile Frame (390px)";
  mobilePhone.layoutMode = "VERTICAL";
  mobilePhone.itemSpacing = 0; // ZERO GAP
  mobilePhone.paddingTop = 20;
  mobilePhone.paddingBottom = 20;
  mobilePhone.paddingLeft = 16;
  mobilePhone.paddingRight = 16;
  mobilePhone.resize(390, 420);
  mobilePhone.cornerRadius = 44;
  mobilePhone.fills = [{ type: "SOLID", color: hexToRgb("050E18") }];
  mobilePhone.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.20 }];
  mobilePhone.strokeWeight = 2;

  for (let i = 1; i <= 3; i++) {
    const pill = figma.createFrame();
    pill.name = `Mobile Capsule 0${i}`;
    pill.layoutMode = "HORIZONTAL";
    pill.primaryAxisAlignItems = "CENTER";
    pill.counterAxisAlignItems = "CENTER";
    pill.resize(358, 120);
    pill.cornerRadius = 1000;
    pill.fills = [{ type: "SOLID", color: hexToRgb("FFFFFF"), opacity: 0.12 }];
    pill.strokes = [{ type: "SOLID", color: hexToRgb("FFFFFF") }];
    pill.strokeWeight = 2;
    pill.appendChild(createText(`Mobile Capsule 0${i} (Zero Gap)`, 15, "Semi Bold", "FFFFFF"));
    mobilePhone.appendChild(pill);
  }

  const stackNotes = figma.createFrame();
  stackNotes.layoutMode = "VERTICAL";
  stackNotes.itemSpacing = 12;
  stackNotes.fills = [];
  stackNotes.appendChild(createText("Frame 11 Parity Rules:", 16, "Semi Bold", "FFFFFF"));
  stackNotes.appendChild(createText("- 0 Padding & 0 Gap between consecutive pills", 14, "Regular", "FFFFFF", 0.75));
  stackNotes.appendChild(createText("- 2px pure white borders (border-2 border-white)", 14, "Regular", "FFFFFF", 0.75));
  stackNotes.appendChild(createText("- No blur on 3D Vanta background (bg-white/12%)", 14, "Regular", "FFFFFF", 0.75));

  mobileRow.appendChild(mobilePhone);
  mobileRow.appendChild(stackNotes);
  sec5.appendChild(mobileRow);
  artboard.appendChild(sec5);

  // Zoom into view
  figma.viewport.scrollAndZoomIntoView([artboard]);
  figma.notify("✨ Clean wide Pill Design System generated!", { timeout: 3000 });
  figma.closePlugin();
}

run();
