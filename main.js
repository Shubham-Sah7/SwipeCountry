/* ============================================================
   Budarina — roofs of the world
   A floating roof sheds a curtain of characters that sway and
   part around the cursor. Vanilla JS + canvas verlet strands.
   ============================================================ */

// ---------------------------------------------------------- data

const DESTS = {
  china: {
    name: "China",
    kicker: "缘分 (Yuánfèn) A destined meeting",
    headline: "China —— golden courtyards, silk-road myths, roofs that refuse gravity",
    blurb: "Wander forbidden gardens, painted eaves, and stories older than the maps that tried to hold them.",
    leftLabel: "Vietnam", leftIcon: "vietnam",
    rightLabel: "Japan", rightIcon: "japan",
    chars: "千里之行始于足下上善若水水善利万物而不争天下莫柔弱于水而攻坚强者莫之能胜知人者智自知者明胜人者有力自胜者强知足者富强行者有志不失其所者久大方无隅大器晚成大音希声大象无形道隐无名夫唯道善贷且成人法地地法天天法道道法自然江山如画一时多少豪杰月落乌啼霜满天江枫渔火对愁眠",
    charFont: '"Songti SC","STSong","Noto Serif SC",serif',
    charSize: 13,
    anchorInset: 0.17, anchorLift: 0.12, anchorArch: 0.10,
    roofWidthVW: 44, roofTopVH: 6,
  },
  japan: {
    name: "Japan",
    kicker: "一期一会 (Ichigo ichie) One time, one\nmeeting",
    headline: "Japan —— red eaves in the mist, stone paths, and patience as architecture",
    blurb: "Pass under vermilion gates, cedar shade, and rooms where silence is part of the design.",
    leftLabel: "China", leftIcon: "china",
    rightLabel: "Kazakhstan", rightIcon: "kazakhstan",
    chars: "一期一会花鳥風月侘び寂び幽玄もののあはれ古池や蛙飛び込む水の音静けさや岩にしみ入る蝉の声月日は百代の過客にして行きかふ年もまた旅人なり夏草や兵どもが夢の跡雪とけて村いっぱいの子どもかな柿くへば鐘が鳴るなり法隆寺旅に病んで夢は枯野をかけ廻る名月や池をめぐりて夜もすがら",
    charFont: '"Hiragino Mincho ProN","Songti SC","Noto Serif JP",serif',
    charSize: 13,
    anchorInset: 0.18, anchorLift: 0.12, anchorArch: 0.05,
    roofWidthVW: 42, roofTopVH: 10,
  },
  kazakhstan: {
    name: "Kazakhstan",
    kicker: "Жол (Jol) The open road",
    headline: "Kazakhstan —— steppe wind, shanyrak light, and a home that moves with you",
    blurb: "Cross grass without edge, warm felt interiors, and patterns that outrun every border.",
    leftLabel: "Japan", leftIcon: "japan",
    rightLabel: "Russia", rightIcon: "russia",
    chars: "жол дала жүрек көңіл шаңырақ керегең кең болсын атамекен туған жер көк аспан жібек жолы қонақ дәстүр өнер домбыра күй аңыз батыр көш керуен сахара бостандық еркіндік атамұра қымыз бесік жырау толғау айтыс сарын құт береке ырыс ",
    charFont: '"IBM Plex Mono",monospace',
    charSize: 11,
    anchorInset: 0.16, anchorLift: 0.08, anchorArch: 0.15,
    roofWidthVW: 36, roofTopVH: 8,
  },
};

const ORDER = ["china", "japan", "kazakhstan"];

// ---------------------------------------------------------- roof art

function chinaRoofSVG() {
  const upper = "M136,140 C210,112 252,84 224,60 L416,60 C388,84 430,112 504,140 C450,172 390,186 320,186 C250,186 190,172 136,140 Z";
  const lower = "M48,222 C130,196 184,198 196,212 L444,212 C456,198 510,196 592,222 C520,268 420,294 320,294 C220,294 120,268 48,222 Z";
  let ribsU = "", ribsL = "";
  for (let x = 148; x <= 492; x += 12) ribsU += `M${x},58 L${x},188 `;
  for (let x = 58; x <= 582; x += 12) ribsL += `M${x},196 L${x},296 `;
  return {
    viewBox: "0 0 640 340",
    aspect: 340 / 640,
    silhouette: [upper, lower, "M206,178 L434,178 L434,214 L206,214 Z"],
    art: `
    <defs>
      <linearGradient id="cnGold" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f0bc41"/><stop offset="0.55" stop-color="#d59a1e"/><stop offset="1" stop-color="#a9740e"/>
      </linearGradient>
      <linearGradient id="cnGold2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#f4c34c"/><stop offset="0.6" stop-color="#d79c20"/><stop offset="1" stop-color="#ab760f"/>
      </linearGradient>
      <clipPath id="cnClipU"><path d="${upper}"/></clipPath>
      <clipPath id="cnClipL"><path d="${lower}"/></clipPath>
    </defs>
    <!-- wall band between tiers -->
    <rect x="206" y="178" width="228" height="36" fill="#6e2a1a"/>
    <g fill="#c98f2c">${[...Array(10)].map((_, i) => `<rect x="${218 + i * 21.5}" y="192" width="8" height="8" rx="1"/>`).join("")}</g>
    <rect x="206" y="178" width="228" height="4" fill="#4c1c10"/>
    <!-- lower tier -->
    <path d="M50,224 q-17,-6 -21,-26 q15,5 23,16 Z" fill="#9a6a0a"/>
    <path d="M590,224 q17,-6 21,-26 q-15,5 -23,16 Z" fill="#9a6a0a"/>
    <path d="${lower}" fill="url(#cnGold)"/>
    <g clip-path="url(#cnClipL)">
      <path d="${ribsL}" stroke="rgba(122,80,10,0.32)" stroke-width="2.6" fill="none"/>
      <path d="M48,222 C130,196 184,198 196,212 L444,212 C456,198 510,196 592,222" fill="none" stroke="rgba(255,230,160,0.55)" stroke-width="7"/>
    </g>
    <path d="M48,222 C120,268 220,294 320,294 C420,294 520,268 592,222" fill="none" stroke="#8a5c08" stroke-width="4"/>
    <path d="M50,223 C122,268 221,293 320,293 C419,293 518,268 590,223" fill="none" stroke="#7c4f06" stroke-width="7" stroke-linecap="round" stroke-dasharray="0 12.7"/>
    <!-- upper tier -->
    <path d="M138,142 q-15,-5 -19,-23 q13,4 21,14 Z" fill="#9a6a0a"/>
    <path d="M502,142 q15,-5 19,-23 q-13,4 -21,14 Z" fill="#9a6a0a"/>
    <path d="${upper}" fill="url(#cnGold2)"/>
    <g clip-path="url(#cnClipU)">
      <path d="${ribsU}" stroke="rgba(122,80,10,0.32)" stroke-width="2.6" fill="none"/>
      <path d="M136,140 C210,112 252,84 224,60 L416,60 C388,84 430,112 504,140" fill="none" stroke="rgba(255,230,160,0.4)" stroke-width="5"/>
    </g>
    <path d="M136,140 C190,172 250,186 320,186 C390,186 450,172 504,140" fill="none" stroke="#8a5c08" stroke-width="4"/>
    <path d="M138,141 C192,171 251,185 320,185 C389,185 448,171 502,141" fill="none" stroke="#7c4f06" stroke-width="6.5" stroke-linecap="round" stroke-dasharray="0 12.2"/>
    <!-- main ridge with chiwen ends -->
    <path d="M212,60 Q196,56 194,34 Q210,38 218,48 Z" fill="#7a4c08"/>
    <path d="M428,60 Q444,56 446,34 Q430,38 422,48 Z" fill="#7a4c08"/>
    <rect x="210" y="44" width="220" height="18" rx="3" fill="#8a5808"/>
    <rect x="210" y="44" width="220" height="6" rx="3" fill="#75470a"/>
    <circle cx="320" cy="38" r="7" fill="#7a4c08"/>
    <!-- side light -->
    <linearGradient id="cnShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.45" stop-color="rgba(255,240,200,0.08)"/><stop offset="0.62" stop-color="rgba(120,80,20,0)"/><stop offset="1" stop-color="rgba(96,60,10,0.2)"/>
    </linearGradient>
    <path d="${upper}" fill="url(#cnShade)"/>
    <path d="${lower}" fill="url(#cnShade)"/>`,
  };
}

function japanRoofSVG() {
  const body = "M55,196 C132,132 208,90 213,62 L427,62 C432,90 508,132 585,196 C478,214 162,214 55,196 Z";
  let rakes = "";
  for (let x = 70; x <= 570; x += 11) rakes += `M${x},60 L${x},212 `;
  return {
    viewBox: "0 0 640 240",
    aspect: 240 / 640,
    silhouette: [body, "M195,74 Q186,42 206,38 L214,58 L426,58 L434,38 Q454,42 445,74 Z"],
    art: `
    <defs>
      <linearGradient id="jpRed" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#d24a35"/><stop offset="0.5" stop-color="#bb2f24"/><stop offset="1" stop-color="#8f1f18"/>
      </linearGradient>
      <clipPath id="jpClip"><path d="${body}"/></clipPath>
    </defs>
    <path d="${body}" fill="url(#jpRed)"/>
    <g clip-path="url(#jpClip)">
      <path d="${rakes}" stroke="rgba(70,10,8,0.22)" stroke-width="1.6" fill="none"/>
      <path d="M55,196 C132,132 208,90 213,62 L427,62 C432,90 508,132 585,196" fill="none" stroke="rgba(255,180,140,0.35)" stroke-width="5"/>
    </g>
    <path d="M55,196 C162,214 478,214 585,196" fill="none" stroke="#33261f" stroke-width="7"/>
    <path d="M57,197 C163,214 477,214 583,197" fill="none" stroke="#241a15" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 12.4"/>
    <path d="M55,196 q-18,-2 -28,-18 q16,0 28,8 Z" fill="#33261f"/>
    <path d="M585,196 q18,-2 28,-18 q-16,0 -28,8 Z" fill="#33261f"/>
    <path d="M195,74 Q186,42 206,38 L214,58 L426,58 L434,38 Q454,42 445,74 Z" fill="#2e2823"/>
    <rect x="210" y="52" width="220" height="14" rx="3" fill="#3a322c"/>
    <circle cx="206" cy="42" r="6" fill="#c9a24a"/>
    <circle cx="434" cy="42" r="6" fill="#c9a24a"/>
    <circle cx="320" cy="50" r="5.5" fill="#c9a24a"/>
    <linearGradient id="jpShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.45" stop-color="rgba(255,200,160,0.10)"/><stop offset="0.6" stop-color="rgba(70,10,8,0)"/><stop offset="1" stop-color="rgba(50,8,6,0.25)"/>
    </linearGradient>
    <path d="${body}" fill="url(#jpShade)"/>`,
  };
}

function yurtRoofSVG() {
  const dome = "M60,238 C82,140 186,68 280,68 C374,68 478,140 500,238 C420,258 140,258 60,238 Z";
  // ribs fan from crown to rim
  let ribs = "";
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    const rx = 78 + t * (482 - 78);
    const ry = 238 + Math.sin(t * Math.PI) * 14;
    const sx = 280 + (rx - 280) * 0.13;
    ribs += `M${sx},92 Q${280 + (rx - 280) * 0.55},${150 + Math.sin(t * Math.PI) * 8} ${rx},${ry} `;
  }
  // ornament zigzag on the band
  let zig = "M78,242 ";
  for (let x = 78; x <= 482; x += 17) zig += `L${x + 8.5},${x % 34 === 78 % 34 ? 232 : 252} L${x + 17},242 `;
  const band = "M60,238 C140,258 420,258 500,238 C500,252 496,262 490,266 C400,284 160,284 70,266 C64,262 60,252 60,238 Z";
  return {
    viewBox: "0 0 560 300",
    aspect: 300 / 560,
    silhouette: [dome, band],
    art: `
    <defs>
      <linearGradient id="kzFelt" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#faf5e8"/><stop offset="0.7" stop-color="#e9dfc8"/><stop offset="1" stop-color="#d4c6a8"/>
      </linearGradient>
      <clipPath id="kzClip"><path d="${dome}"/></clipPath>
    </defs>
    <path d="${dome}" fill="url(#kzFelt)"/>
    <g clip-path="url(#kzClip)">
      <path d="${ribs}" stroke="rgba(95,75,55,0.45)" stroke-width="2.2" fill="none"/>
      <path d="M60,238 C82,140 186,68 280,68 C374,68 478,140 500,238" fill="none" stroke="rgba(95,75,55,0.5)" stroke-width="3"/>
    </g>
    <!-- ornamental band -->
    <path d="${band}" fill="#8e3b2e"/>
    <path d="${zig}" fill="none" stroke="#e9dcc2" stroke-width="2.4" opacity="0.9" transform="translate(0,14)"/>
    <path d="M63,241 C142,260 418,260 497,241" fill="none" stroke="#5f2418" stroke-width="2.5"/>
    <path d="M70,268 C160,285 400,285 490,268" fill="none" stroke="#5f2418" stroke-width="3"/>
    <!-- shanyrak crown -->
    <ellipse cx="280" cy="86" rx="46" ry="17" fill="#e7dcc4" stroke="#7c3a26" stroke-width="5"/>
    <path d="M240,84 Q280,74 320,84 M240,90 Q280,100 320,90 M258,78 Q280,96 302,78 M258,95 Q280,77 302,95" stroke="#7c3a26" stroke-width="2.4" fill="none"/>
    <linearGradient id="kzShade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0.5" stop-color="rgba(255,252,240,0.25)"/><stop offset="0.65" stop-color="rgba(120,95,65,0)"/><stop offset="1" stop-color="rgba(110,88,60,0.28)"/>
    </linearGradient>
    <path d="${dome}" fill="url(#kzShade)"/>`,
  };
}

const ROOFS = { china: chinaRoofSVG(), japan: japanRoofSVG(), kazakhstan: yurtRoofSVG() };

function roofMarkup(key) {
  const r = ROOFS[key];
  return `<svg viewBox="${r.viewBox}" xmlns="http://www.w3.org/2000/svg">${r.art}</svg>`;
}
function shadowMarkup(key) {
  const r = ROOFS[key];
  return `<svg viewBox="${r.viewBox}" xmlns="http://www.w3.org/2000/svg">${r.silhouette
    .map((d) => `<path d="${d}" fill="#5c4e37"/>`)
    .join("")}</svg>`;
}

// mini icons for the side cards
const MINI = {
  china: `<svg viewBox="0 0 44 26"><path d="M8,16 C14,8 30,8 36,16 C30,20 14,20 8,16 Z" fill="#c9971f"/><path d="M4,24 C12,14 32,14 40,24 C32,28 12,28 4,24 Z" fill="#c9971f"/><rect x="17" y="4" width="10" height="3" rx="1" fill="#7a4c08"/></svg>`,
  japan: `<svg viewBox="0 0 44 26"><path d="M4,22 C12,10 18,6 18,4 L26,4 C26,6 32,10 40,22 C30,25 14,25 4,22 Z" fill="#b32b21"/><rect x="15" y="1" width="14" height="3.4" rx="1.4" fill="#2e2823"/></svg>`,
  kazakhstan: `<svg viewBox="0 0 44 26"><path d="M6,20 C8,8 16,3 22,3 C28,3 36,8 38,20 C30,23 14,23 6,20 Z" fill="#efe6d0" stroke="#8a7a5e" stroke-width="1"/><path d="M6,20 C14,23 30,23 38,20 L37,24 C29,26.5 15,26.5 7,24 Z" fill="#8e3b2e"/><ellipse cx="22" cy="5.5" rx="4.5" ry="1.8" fill="none" stroke="#7c3a26" stroke-width="1.4"/></svg>`,
  vietnam: `<svg viewBox="0 0 44 26"><path d="M4,14 C10,20 34,20 40,14 C38,22 30,25 22,25 C14,25 6,22 4,14 Z" fill="#4a3b2b"/><path d="M8,12 C16,17 28,17 36,12" fill="none" stroke="#4a3b2b" stroke-width="2"/></svg>`,
  russia: `<svg viewBox="0 0 44 26"><path d="M22,2 C30,8 34,14 34,20 L10,20 C10,14 14,8 22,2 Z" fill="#b3442b"/><rect x="8" y="20" width="28" height="4" fill="#6e4a2e"/></svg>`,
};

// ---------------------------------------------------------- curtain physics

const canvas = document.getElementById("curtain");
const ctx = canvas.getContext("2d");
let DPR = Math.min(window.devicePixelRatio || 1, 2);
let VW = 0, VH = 0;

const mouse = { x: -9999, y: -9999, vx: 0, vy: 0, px: -9999, py: -9999 };
let agitation = 0; // slow envelope: how disturbed the curtain is overall
let stir = 0;      // fast envelope: how hard this exact frame is stirring
window.addEventListener("mousemove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
window.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

function mulberry(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

class StrandSystem {
  // getAnchor(): {x0, x1, y} — span the strands hang from (live, follows the roof)
  constructor(dest, getAnchor, scale = 1) {
    this.dest = dest;
    this.getAnchor = getAnchor;
    this.scale = scale;
    this.alpha = 1;
    this.spacing = 11.5 * scale;
    this.segLen = 14 * scale;
    this.fontSize = dest.charSize * scale;
    this.strands = [];
    this.time = Math.random() * 100;
    this.build();
  }

  pinY(a, xN) {
    return a.y - (a.arch || 0) * (1 - Math.sin(xN * Math.PI));
  }

  build() {
    const a = this.getAnchor();
    const span = a.x1 - a.x0;
    const n = Math.max(4, Math.floor(span / this.spacing));
    const rnd = mulberry(1234);
    this.strands = [];
    for (let s = 0; s < n; s++) {
      const xN = n === 1 ? 0.5 : s / (n - 1);
      const base = 19 + Math.sin(xN * Math.PI) * 6;
      const count = Math.round(base + rnd() * 9);
      const pts = [];
      const x = a.x0 + xN * span;
      const y0 = this.pinY(a, xN);
      for (let i = 0; i < count; i++) {
        pts.push({ x, y: y0 + i * this.segLen, px: x, py: y0 + i * this.segLen });
      }
      const chars = [], alphas = [];
      for (let i = 0; i < count; i++) {
        const idx = (i * n + s) % this.dest.chars.length;
        chars.push(this.dest.chars[idx]);
        alphas.push(0.48 + rnd() * 0.4);
      }
      this.strands.push({ xN, pts, chars, alphas, phase: xN * 2.6 });
    }
  }

  step() {
    this.time += 0.016;
    const a = this.getAnchor();
    const span = a.x1 - a.x0;
    const R = 95, R2 = R * R;
    const g = 0.55;

    for (const st of this.strands) {
      const pts = st.pts;
      // pin the root to the roof
      pts[0].x = a.x0 + st.xN * span;
      pts[0].y = this.pinY(a, st.xN);
      pts[0].px = pts[0].x; pts[0].py = pts[0].y;

      for (let i = 1; i < pts.length; i++) {
        const p = pts[i];
        let nx = p.x + (p.x - p.px) * 0.91;
        let ny = p.y + (p.y - p.py) * 0.91;
        ny += g;
        // straighten back under the anchor
        nx += (pts[i - 1].x - p.x) * 0.035;
        // gentle breeze
        nx += Math.sin(this.time * 0.7 + st.phase + p.y * 0.004) * 0.015;
        // cursor repulsion + drag
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = (1 - d / R);
          const mvx = Math.max(-22, Math.min(22, mouse.vx));
          const mvy = Math.max(-22, Math.min(22, mouse.vy));
          nx += (dx / d) * f * 3.2 + mvx * f * 0.28;
          ny += (dy / d) * f * 1.2 + mvy * f * 0.2;
          agitation += f * (0.003 + (Math.abs(mvx) + Math.abs(mvy)) * 0.0004);
          stir += f * (Math.abs(mvx) + Math.abs(mvy)) * 0.0003;
        }
        p.px = p.x; p.py = p.y;
        p.x = nx; p.y = ny;
      }
      // distance constraints
      for (let k = 0; k < 3; k++) {
        for (let i = 1; i < pts.length; i++) {
          const p0 = pts[i - 1], p1 = pts[i];
          let dx = p1.x - p0.x, dy = p1.y - p0.y;
          const d = Math.sqrt(dx * dx + dy * dy) || 0.0001;
          const diff = (d - this.segLen) / d;
          if (i === 1) {
            p1.x -= dx * diff; p1.y -= dy * diff;
          } else {
            p1.x -= dx * diff * 0.5; p1.y -= dy * diff * 0.5;
            p0.x += dx * diff * 0.5; p0.y += dy * diff * 0.5;
          }
        }
        pts[0].x = a.x0 + st.xN * span; pts[0].y = this.pinY(a, st.xN);
      }
    }
  }

  draw() {
    if (this.alpha <= 0.01) return;
    ctx.font = `${this.fontSize}px ${this.dest.charFont}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const st of this.strands) {
      const pts = st.pts;
      for (let i = 1; i < pts.length; i++) {
        const ch = st.chars[i];
        if (!ch || ch === " ") continue;
        const p = pts[i], q = pts[i - 1];
        const ang = Math.atan2(p.y - q.y, p.x - q.x) - Math.PI / 2;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(ang);
        ctx.fillStyle = `rgba(58,48,36,${st.alphas[i] * this.alpha})`;
        ctx.fillText(ch, 0, 0);
        ctx.restore();
      }
    }
  }
}

// ---------------------------------------------------------- roof placement

const roofLayer = document.getElementById("roofLayer");
const shadowLayer = document.getElementById("shadowLayer");
const wraps = {
  A: { el: document.getElementById("roofA"), shadowNear: null, shadowFar: null, key: null, offset: 0, system: null, visible: false },
  B: { el: document.getElementById("roofB"), shadowNear: null, shadowFar: null, key: null, offset: 0, system: null, visible: false },
};

for (const id of ["A", "B"]) {
  const near = document.createElement("div");
  near.className = "roof-shadow";
  const far = document.createElement("div");
  far.className = "roof-shadow";
  far.style.filter = "blur(46px)";
  shadowLayer.appendChild(far);
  shadowLayer.appendChild(near);
  wraps[id].shadowNear = near;
  wraps[id].shadowFar = far;
}

function roofBaseRect(key) {
  const d = DESTS[key];
  const w = Math.min((d.roofWidthVW / 100) * VW, 720);
  const r = ROOFS[key];
  return { w, h: w * r.aspect, x: (VW - w) / 2, y: (d.roofTopVH / 100) * VH };
}

function assignRoof(wrap, key) {
  wrap.key = key;
  wrap.el.innerHTML = roofMarkup(key);
  wrap.shadowNear.innerHTML = shadowMarkup(key);
  wrap.shadowFar.innerHTML = shadowMarkup(key);
  const base = roofBaseRect(key);
  wrap.el.style.width = base.w + "px";
  wrap.el.style.left = base.x + "px";
  wrap.el.style.top = base.y + "px";
  for (const s of [wrap.shadowNear, wrap.shadowFar]) {
    s.style.width = base.w + "px";
    s.style.left = base.x + "px";
    s.style.top = base.y + "px";
  }
  wrap.shadowNear.style.opacity = 0.22;
  wrap.shadowFar.style.opacity = 0.16;

  const d = DESTS[key];
  wrap.system = new StrandSystem(d, () => {
    const b = roofBaseRect(wrap.key);
    const x = b.x + wrap.offset;
    return {
      x0: x + b.w * d.anchorInset,
      x1: x + b.w * (1 - d.anchorInset),
      y: b.y + b.h * (1 - d.anchorLift),
      arch: b.h * (d.anchorArch || 0),
    };
  });
  applyWrapTransform(wrap);
}

function applyWrapTransform(wrap) {
  wrap.el.style.transform = `translateX(${wrap.offset}px)`;
  wrap.el.style.opacity = wrap.visible ? 1 : 0;
  const b = roofBaseRect(wrap.key || "china");
  wrap.shadowNear.style.transform =
    `translate(${wrap.offset + b.w * 0.09}px, ${b.h * 0.16}px) skewX(-14deg)`;
  wrap.shadowFar.style.transform =
    `translate(${wrap.offset + b.w * 0.28}px, ${b.h * 0.52}px) skewX(-24deg) scale(1.12, 1.6)`;
  const op = wrap.visible ? 1 : 0;
  wrap.shadowNear.style.opacity = 0.20 * op;
  wrap.shadowFar.style.opacity = 0.17 * op;
}

// ---------------------------------------------------------- hero UI

const heroUI = document.getElementById("heroUI");
const kickerEl = document.getElementById("kicker");
const headlineEl = document.getElementById("headline");
const blurbEl = document.getElementById("blurb");
const prevCard = document.getElementById("prevCard");
const nextCard = document.getElementById("nextCard");

function setCopy(key, animateIn = true) {
  const d = DESTS[key];
  kickerEl.innerHTML = d.kicker.replace(
    /^([^\s(]+)/,
    '<span class="cjk">$1</span>'
  ).replace(/\n/g, "<br>");
  blurbEl.textContent = d.blurb;

  headlineEl.innerHTML = d.headline
    .split(" ")
    .map((w) => `<span class="word">${w}</span>`)
    .join(" ");
  const words = headlineEl.querySelectorAll(".word");
  if (animateIn) {
    words.forEach((w, i) =>
      setTimeout(() => requestAnimationFrame(() => w.classList.add("in")), 60 + i * 55)
    );
  } else {
    words.forEach((w) => w.classList.add("in"));
  }

  prevCard.querySelector(".side-card-icon").innerHTML = MINI[d.leftIcon];
  prevCard.querySelector(".side-card-name").textContent = d.leftLabel;
  nextCard.querySelector(".side-card-icon").innerHTML = MINI[d.rightIcon];
  nextCard.querySelector(".side-card-name").textContent = d.rightLabel;
}

// ---------------------------------------------------------- state / transitions

let currentIndex = 0;
let activeWrap = "A";
let animating = false;
let view = "home";

const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function navigate(dir) {
  if (animating || view !== "home") return;
  animating = true;

  const nextIndex = (currentIndex + dir + ORDER.length) % ORDER.length;
  const out = wraps[activeWrap];
  const inn = wraps[activeWrap === "A" ? "B" : "A"];

  assignRoof(inn, ORDER[nextIndex]);
  inn.offset = dir * VW * 0.8;
  inn.visible = true;
  applyWrapTransform(inn);

  heroUI.classList.add("fade-out");
  headlineEl.querySelectorAll(".word").forEach((w, i) =>
    setTimeout(() => w.classList.remove("in"), i * 22)
  );

  const D = 1250;
  const t0 = performance.now();
  const outFrom = out.offset;

  function tick(now) {
    const t = Math.min(1, (now - t0) / D);
    const e = easeInOut(t);
    out.offset = outFrom - dir * VW * 0.95 * e;
    inn.offset = dir * VW * 0.8 * (1 - e);
    applyWrapTransform(out);
    applyWrapTransform(inn);
    if (t < 1) requestAnimationFrame(tick);
    else {
      out.visible = false;
      out.system = null;
      applyWrapTransform(out);
      activeWrap = activeWrap === "A" ? "B" : "A";
      currentIndex = nextIndex;
      heroUI.classList.remove("fade-out");
      setCopy(ORDER[currentIndex]);
      animating = false;
    }
  }
  requestAnimationFrame(tick);
}

prevCard.addEventListener("click", () => navigate(-1));
nextCard.addEventListener("click", () => navigate(1));
window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") navigate(-1);
  if (e.key === "ArrowRight") navigate(1);
});

// ---------------------------------------------------------- destinations view

const destRow = document.getElementById("destRow");
const destItems = [...destRow.querySelectorAll(".dest-item")];
let destSystems = [];
const destShadows = [];

function layoutDestRow() {
  const w = VW * 0.21;
  const xs = [VW * 0.085, VW * 0.395, VW * 0.705];
  destItems.forEach((item, i) => {
    const key = item.dataset.dest;
    const r = ROOFS[key];
    item.style.width = w + "px";
    item.style.left = xs[i] + "px";
    item.style.top = VH * 0.16 + "px";
    item.innerHTML = roofMarkup(key);
    if (!destShadows[i]) {
      const s = document.createElement("div");
      s.className = "roof-shadow";
      shadowLayer.appendChild(s);
      destShadows[i] = s;
    }
    const s = destShadows[i];
    s.innerHTML = shadowMarkup(key);
    s.style.width = w + "px";
    s.style.left = xs[i] + "px";
    s.style.top = VH * 0.16 + "px";
    s.style.transform = `translate(${w * 0.09}px, ${w * r.aspect * 0.12}px) skewX(-14deg)`;
    s.style.opacity = 0;
  });
}

function buildDestSystems() {
  destSystems = destItems.map((item) => {
    const key = item.dataset.dest;
    const d = DESTS[key];
    const sys = new StrandSystem(d, () => {
      const b = item.getBoundingClientRect();
      return {
        x0: b.left + b.width * d.anchorInset,
        x1: b.right - b.width * d.anchorInset,
        y: b.top + b.height * (1 - d.anchorLift),
        arch: b.height * (d.anchorArch || 0),
      };
    }, 0.62);
    sys.alpha = 0;
    return sys;
  });
}

function setView(next) {
  if (animating || next === view) return;
  view = next;
  document.querySelectorAll(".menu-link").forEach((l) =>
    l.classList.toggle("active", l.dataset.view === next)
  );
  if (next === "destinations") {
    heroUI.classList.add("fade-out");
    setTimeout(() => heroUI.classList.add("hidden"), 500);
    const w = wraps[activeWrap];
    w.visible = false;
    applyWrapTransform(w);
    layoutDestRow();
    buildDestSystems();
    destItems.forEach((it, i) => setTimeout(() => {
      it.classList.add("in");
      destShadows[i].style.opacity = 0.2;
    }, 150 + i * 140));
  } else if (next === "home") {
    destItems.forEach((it, i) => {
      it.classList.remove("in");
      if (destShadows[i]) destShadows[i].style.opacity = 0;
    });
    setTimeout(() => { destSystems = []; }, 600);
    heroUI.classList.remove("hidden");
    requestAnimationFrame(() => heroUI.classList.remove("fade-out"));
    const w = wraps[activeWrap];
    w.visible = true;
    if (!w.system) assignRoof(w, ORDER[currentIndex]);
    applyWrapTransform(w);
    setCopy(ORDER[currentIndex]);
  }
}

document.querySelectorAll(".menu-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const v = link.dataset.view;
    if (v === "community") return; // not in the film
    setView(v);
  });
});

// ---------------------------------------------------------- sound

const soundToggle = document.getElementById("soundToggle");
const sound = {
  ctx: null, buffer: null, gain: null, on: false, timer: null,
  sources: new Set(), level: 0,
  master: null, rustle: null, filter: null, noiseSrc: null,
};

async function initAudio() {
  sound.ctx = new (window.AudioContext || window.webkitAudioContext)();
  sound.master = sound.ctx.createGain();
  sound.master.gain.value = 0;
  sound.master.connect(sound.ctx.destination);

  // ambience bed (swells softly with overall disturbance)
  sound.gain = sound.ctx.createGain();
  sound.gain.gain.value = 0;
  sound.gain.connect(sound.master);

  // thread rustle: looped noise through a bandpass, gained by stir speed
  const sr = sound.ctx.sampleRate;
  const nb = sound.ctx.createBuffer(1, sr * 2, sr);
  const ch = nb.getChannelData(0);
  for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
  sound.noiseBuffer = nb;
  sound.filter = sound.ctx.createBiquadFilter();
  sound.filter.type = "bandpass";
  sound.filter.frequency.value = 2000;
  sound.filter.Q.value = 0.7;
  sound.rustle = sound.ctx.createGain();
  sound.rustle.gain.value = 0;
  sound.filter.connect(sound.rustle);
  sound.rustle.connect(sound.master);

  const res = await fetch("ambience.m4a");
  sound.buffer = await sound.ctx.decodeAudioData(await res.arrayBuffer());
}

// one soft pluck as the cursor crosses a thread; pitch follows its position
const PENTA = [0, 2, 4, 7, 9, 12, 14, 16, 19, 21, 24];
function pluckNote(xN) {
  const t = sound.ctx.currentTime;
  const speed = Math.min(24, Math.abs(mouse.vx) + Math.abs(mouse.vy));
  const vel = 0.015 + speed * 0.0032;
  const freq = 392 * Math.pow(2, PENTA[Math.round(xN * (PENTA.length - 1))] / 12);
  const o = sound.ctx.createOscillator();
  o.type = "sine";
  o.frequency.value = freq;
  const g = sound.ctx.createGain();
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(vel, t + 0.006);
  g.gain.exponentialRampToValueAtTime(0.0006, t + 0.45);
  o.connect(g); g.connect(sound.master);
  o.start(t); o.stop(t + 0.5);
  const o2 = sound.ctx.createOscillator();
  o2.type = "sine";
  o2.frequency.value = freq * 2.01;
  const g2 = sound.ctx.createGain();
  g2.gain.setValueAtTime(0, t);
  g2.gain.linearRampToValueAtTime(vel * 0.28, t + 0.005);
  g2.gain.exponentialRampToValueAtTime(0.0005, t + 0.25);
  o2.connect(g2); g2.connect(sound.master);
  o2.start(t); o2.stop(t + 0.3);
}

// which threads did the cursor sweep across since last frame?
let lastMX = -9999;
function strum(sys) {
  const a = sys.getAnchor();
  const n = sys.strands.length;
  const yMax = a.y + sys.strands[0].pts.length * sys.segLen * 1.2;
  if (mouse.y < a.y - 20 || mouse.y > yMax) return;
  const x0 = Math.min(mouse.x, lastMX), x1 = Math.max(mouse.x, lastMX);
  if (x1 - x0 < 0.5 || lastMX === -9999) return;
  const now = performance.now();
  let played = 0;
  for (let k = 0; k < n; k++) {
    const xN = n === 1 ? 0.5 : k / (n - 1);
    const sx = a.x0 + xN * (a.x1 - a.x0);
    if (sx >= x0 && sx <= x1) {
      const st = sys.strands[k];
      if (!st.lastPluck || now - st.lastPluck > 160) {
        st.lastPluck = now;
        if (played++ < 4) pluckNote(xN);
      }
    }
  }
}

// two overlapping sources with an equal-power crossfade = gapless loop
function scheduleLoop(when) {
  const FADE = 1.6;
  const dur = sound.buffer.duration;
  const src = sound.ctx.createBufferSource();
  src.buffer = sound.buffer;
  const g = sound.ctx.createGain();
  src.connect(g);
  g.connect(sound.gain);
  g.gain.setValueAtTime(0, when);
  g.gain.linearRampToValueAtTime(1, when + FADE);
  g.gain.setValueAtTime(1, when + dur - FADE);
  g.gain.linearRampToValueAtTime(0, when + dur);
  src.start(when);
  sound.sources.add(src);
  src.onended = () => sound.sources.delete(src);
  const next = when + dur - FADE;
  sound.timer = setTimeout(
    () => { if (sound.on) scheduleLoop(next); },
    (next - sound.ctx.currentTime - 0.35) * 1000
  );
}

async function toggleSound() {
  if (!sound.ctx) await initAudio();
  if (sound.ctx.state === "suspended") await sound.ctx.resume();
  sound.on = !sound.on;
  soundToggle.classList.toggle("on", sound.on);
  const t = sound.ctx.currentTime;
  sound.master.gain.cancelScheduledValues(t);
  if (sound.on) {
    // stays silent until the cursor stirs the threads (see frame loop)
    scheduleLoop(t + 0.05);
    sound.gain.gain.setValueAtTime(0, t);
    sound.rustle.gain.setValueAtTime(0, t);
    sound.master.gain.setValueAtTime(0, t);
    sound.master.gain.linearRampToValueAtTime(1, t + 0.3);
    sound.level = 0;
    sound.noiseSrc = sound.ctx.createBufferSource();
    sound.noiseSrc.buffer = sound.noiseBuffer;
    sound.noiseSrc.loop = true;
    sound.noiseSrc.connect(sound.filter);
    sound.noiseSrc.start(t);
  } else {
    clearTimeout(sound.timer);
    soundToggle.classList.remove("audible");
    sound.master.gain.setValueAtTime(sound.master.gain.value, t);
    sound.master.gain.linearRampToValueAtTime(0, t + 0.4);
    setTimeout(() => {
      sound.sources.forEach((s) => { try { s.stop(); } catch (e) {} });
      sound.sources.clear();
      if (sound.noiseSrc) { try { sound.noiseSrc.stop(); } catch (e) {} sound.noiseSrc = null; }
    }, 500);
  }
}
soundToggle.addEventListener("click", toggleSound);

// ---------------------------------------------------------- main loop

function resize() {
  VW = window.innerWidth;
  VH = window.innerHeight;
  DPR = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = VW * DPR;
  canvas.height = VH * DPR;
  canvas.style.width = VW + "px";
  canvas.style.height = VH + "px";
  for (const id of ["A", "B"]) {
    const w = wraps[id];
    if (w.key && w.visible) assignRoof(w, w.key);
  }
  if (view === "destinations") { layoutDestRow(); buildDestSystems(); destSystems.forEach(s => s.alpha = 1); destItems.forEach((it, i) => { it.classList.add("in"); destShadows[i].style.opacity = 0.2; }); }
}
window.addEventListener("resize", resize);

function frame() {
  // smoothed mouse velocity
  mouse.vx += ((mouse.x - mouse.px) - mouse.vx) * 0.5;
  mouse.vy += ((mouse.y - mouse.py) - mouse.vy) * 0.5;
  mouse.px = mouse.x; mouse.py = mouse.y;

  // sound follows the threads: swells while you brush them, fades when you stop
  agitation = Math.min(1.4, agitation * 0.92);
  if (sound.on && sound.ctx) {
    const t = sound.ctx.currentTime;
    const target = Math.min(1, agitation);
    sound.level += (target - sound.level) * (target > sound.level ? 0.25 : 0.045);
    sound.gain.gain.setTargetAtTime(sound.level * 0.5, t, 0.08);
    // rustle rides the instantaneous stir, brighter when you move faster
    const speed = Math.min(24, Math.abs(mouse.vx) + Math.abs(mouse.vy));
    sound.rustle.gain.setTargetAtTime(Math.min(0.2, stir * 1.5), t, 0.055);
    sound.filter.frequency.setTargetAtTime(1400 + speed * 90, t, 0.1);
    soundToggle.classList.toggle("audible", sound.level > 0.04 || stir > 0.01);
  }
  stir = 0;

  ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  ctx.clearRect(0, 0, VW, VH);

  const canStrum = sound.on && sound.ctx;
  if (view === "home") {
    for (const id of ["A", "B"]) {
      const w = wraps[id];
      if (w.visible && w.system) {
        w.system.step(); w.system.draw();
        if (canStrum) strum(w.system);
      }
    }
  } else {
    for (const s of destSystems) {
      s.alpha = Math.min(1, s.alpha + 0.03);
      s.step(); s.draw();
      if (canStrum) strum(s);
    }
  }
  lastMX = mouse.x;
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------- boot

resize();
assignRoof(wraps.A, ORDER[0]);
wraps.A.visible = true;
applyWrapTransform(wraps.A);
setCopy(ORDER[0]);
requestAnimationFrame(frame);
