/* BOLT Steuerung – Welten (Themes). Jede Welt = Farben + Roboter-Figur + Deko. */
const D = css => `<div style="position:absolute;${css}"></div>`;
const C = (x, y, s, bg, extra = '') => D(`left:${x}px;top:${y}px;width:${s}px;height:${s}px;border-radius:50%;background:${bg};${extra}`);

/* Grundwerte (gelten, wenn eine Welt nichts anderes sagt) */
const BASE = {
  '--font-ui': "'Nunito',system-ui,sans-serif", '--font-head': "'Nunito',system-ui,sans-serif",
  '--headw': '800', '--h1': '21px', '--h1lh': '1.05', '--tabsize': '16px', '--bubsize': '15px', '--bubnum': '18px',
  '--pr': '999px', '--padring': 'transparent', '--knobfill': '#ffffff',
  '--sliderbg': 'transparent', '--padshadow': '0 8px 0 rgba(0,0,0,.2)', '--secshadow': 'none',
  '--dialsize': '22px'
};

/* ---- Roboter-Figuren (viewBox 0 0 120 120, ohne Ids, ohne Mund) ---- */
function ledBall() {
  let dots = '';
  const lit = new Set(['2,1', '2,2', '3,1', '3,2', '2,5', '2,6', '3,5', '3,6']);
  for (let j = 0; j < 8; j++) for (let i = 0; i < 8; i++) {
    const x = (37.25 + i * 6.5).toFixed(2), y = (37.25 + j * 6.5).toFixed(2), on = lit.has(j + ',' + i);
    dots += `<circle cx="${x}" cy="${y}" r="${on ? 2.9 : 2.4}" fill="${on ? '#7dffc4' : '#1f5f99'}"/>`;
  }
  return `<circle cx="60" cy="60" r="54" fill="#7fd8f6" stroke="#0f6bb5" stroke-width="3"/>
<circle cx="60" cy="60" r="46" fill="#bdeeff" opacity=".6"/>
<rect x="32" y="32" width="56" height="56" rx="16" fill="#0b3b6b" stroke="#0a2f57" stroke-width="2"/>${dots}
<circle cx="23" cy="74" r="5.5" fill="#ff9ec0" fill-opacity=".85"/><circle cx="97" cy="74" r="5.5" fill="#ff9ec0" fill-opacity=".85"/>
<ellipse cx="34" cy="23" rx="14" ry="6.5" transform="rotate(-35 34 23)" fill="#fff" fill-opacity=".7"/>
<circle cx="60" cy="102" r="4.5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`;
}
const DOT = '<circle cx="60" cy="106" r="5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>';
const B = {
  std: ledBall(),
  space: `<ellipse cx="60" cy="60" rx="66" ry="15" fill="none" stroke="#ffd84d" stroke-width="5" transform="rotate(-25 60 60)"/>
<line x1="60" y1="8" x2="60" y2="-10" stroke="#c9ccff" stroke-width="4"/><circle cx="60" cy="-14" r="7" fill="#ffd84d"/>
<circle cx="60" cy="60" r="54" fill="#e6e9ff" stroke="#7b5cff" stroke-width="4"/><circle cx="40" cy="28" r="9" fill="#fff" opacity=".7"/>
<rect x="30" y="34" width="60" height="52" rx="22" fill="#1a1458"/>
<circle cx="45" cy="60" r="8.5" fill="#5ee7ff"/><circle cx="75" cy="60" r="8.5" fill="#5ee7ff"/><circle cx="48" cy="57" r="2.8" fill="#fff"/><circle cx="78" cy="57" r="2.8" fill="#fff"/>
<circle cx="20" cy="72" r="6" fill="#ff8fd0"/><circle cx="100" cy="72" r="6" fill="#ff8fd0"/>${DOT.replace('cy="106"', 'cy="104"')}
<path d="M-4 60 A64 15 0 0 0 124 60" fill="none" stroke="#ffd84d" stroke-width="5" transform="rotate(-25 60 60)"/>`,
  ocean: `<rect x="54" y="-4" width="12" height="16" rx="4" fill="#e0a800"/><rect x="54" y="-8" width="26" height="10" rx="5" fill="#e0a800"/>
<circle cx="60" cy="60" r="54" fill="#ffd84d" stroke="#e0a800" stroke-width="4"/>
<ellipse cx="34" cy="24" rx="13" ry="6" transform="rotate(-35 34 24)" fill="#fff" opacity=".7"/>
<circle cx="60" cy="58" r="34" fill="#bdeeff" stroke="#0b6aa8" stroke-width="6"/><circle cx="60" cy="58" r="27" fill="#0b3b6b"/>
<circle cx="49" cy="58" r="7.5" fill="#7dffc4"/><circle cx="71" cy="58" r="7.5" fill="#7dffc4"/><circle cx="51.5" cy="55.5" r="2.4" fill="#fff"/><circle cx="73.5" cy="55.5" r="2.4" fill="#fff"/>
<circle cx="18" cy="76" r="6" fill="#ff9ec0"/><circle cx="102" cy="76" r="6" fill="#ff9ec0"/>${DOT}`,
  jungle: `<circle cx="36" cy="24" r="17" fill="#7ddc5a" stroke="#2f9e44" stroke-width="4"/><circle cx="84" cy="24" r="17" fill="#7ddc5a" stroke="#2f9e44" stroke-width="4"/>
<circle cx="60" cy="64" r="52" fill="#7ddc5a" stroke="#2f9e44" stroke-width="4"/>
<circle cx="36" cy="22" r="10" fill="#fff"/><circle cx="84" cy="22" r="10" fill="#fff"/><circle cx="38" cy="23" r="5" fill="#123d24"/><circle cx="82" cy="23" r="5" fill="#123d24"/>
<rect x="34" y="50" width="52" height="42" rx="16" fill="#123d24"/>
<path d="M60 86 C40 72 46 58 55 60 C58 61 60 64 60 64 C60 64 62 61 65 60 C74 58 80 72 60 86 Z" fill="#ff8fb8"/>
<circle cx="20" cy="80" r="6" fill="#ffb36b"/><circle cx="100" cy="80" r="6" fill="#ffb36b"/>${DOT}`,
  cat: `<path d="M20 36 L26 -4 L58 12 Z" fill="#fff" stroke="#e58bc0" stroke-width="4" stroke-linejoin="round"/><path d="M100 36 L94 -4 L62 12 Z" fill="#fff" stroke="#e58bc0" stroke-width="4" stroke-linejoin="round"/>
<path d="M30 24 L31 8 L45 15 Z" fill="#ffb3dc"/><path d="M90 24 L89 8 L75 15 Z" fill="#ffb3dc"/>
<circle cx="60" cy="60" r="54" fill="#fff" stroke="#e58bc0" stroke-width="4"/><circle cx="60" cy="60" r="47" fill="none" stroke="#ffe3f3" stroke-width="3"/>
<rect x="32" y="38" width="56" height="48" rx="20" fill="#4a1f55"/>
<circle cx="46" cy="62" r="8" fill="#9be7c9"/><circle cx="74" cy="62" r="8" fill="#9be7c9"/><circle cx="48.5" cy="59" r="2.6" fill="#fff"/><circle cx="76.5" cy="59" r="2.6" fill="#fff"/>
<path d="M6 64 L24 68 M6 76 L24 74 M114 64 L96 68 M114 76 L96 74" stroke="#e58bc0" stroke-width="3" stroke-linecap="round" fill="none"/>
<circle cx="60" cy="102" r="5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`,
  arcade: `<circle cx="60" cy="60" r="54" fill="#ff4fd8" stroke="#fff" stroke-width="4"/>
<rect x="30" y="16" width="10" height="10" fill="#fff" opacity=".85"/><rect x="42" y="12" width="8" height="8" fill="#fff" opacity=".85"/>
<rect x="24" y="34" width="72" height="44" rx="6" fill="#0d0221" stroke="#00f0ff" stroke-width="4"/>
<rect x="36" y="46" width="12" height="16" fill="#7dffc4"/><rect x="72" y="46" width="12" height="16" fill="#7dffc4"/><rect x="38" y="48" width="4" height="4" fill="#fff"/><rect x="74" y="48" width="4" height="4" fill="#fff"/>
<circle cx="60" cy="102" r="5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`,
  rainbow: `<circle cx="60" cy="60" r="54" fill="#fff" stroke="#8ad4ff" stroke-width="4"/>
<rect x="32" y="30" width="56" height="44" rx="18" fill="#1b3a6b"/>
<circle cx="46" cy="52" r="8" fill="#bfe9ff"/><circle cx="74" cy="52" r="8" fill="#bfe9ff"/><circle cx="48.5" cy="49" r="2.6" fill="#fff"/><circle cx="76.5" cy="49" r="2.6" fill="#fff"/>
<path d="M21.4 70.4 A40 40 0 0 0 98.6 70.4" fill="none" stroke="#ff6b6b" stroke-width="5" stroke-linecap="round"/>
<path d="M27.2 68.8 A34 34 0 0 0 92.8 68.8" fill="none" stroke="#ffd23d" stroke-width="5" stroke-linecap="round"/>
<path d="M33 67.3 A28 28 0 0 0 87 67.3" fill="none" stroke="#5ab4ff" stroke-width="5" stroke-linecap="round"/>
<circle cx="18" cy="56" r="6" fill="#ffb3c8"/><circle cx="102" cy="56" r="6" fill="#ffb3c8"/><circle cx="60" cy="108" r="4.5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`,
  owl: `<path d="M22 34 L18 2 L52 16 Z" fill="#9b6b4a" stroke="#6b4630" stroke-width="3" stroke-linejoin="round"/><path d="M98 34 L102 2 L68 16 Z" fill="#9b6b4a" stroke="#6b4630" stroke-width="3" stroke-linejoin="round"/>
<circle cx="60" cy="60" r="54" fill="#9b6b4a" stroke="#6b4630" stroke-width="4"/><ellipse cx="60" cy="86" rx="30" ry="22" fill="#e7c9a5"/>
<circle cx="40" cy="50" r="21" fill="#fff4c2" stroke="#6b4630" stroke-width="3"/><circle cx="80" cy="50" r="21" fill="#fff4c2" stroke="#6b4630" stroke-width="3"/>
<circle cx="42" cy="52" r="10" fill="#0b2a3d"/><circle cx="78" cy="52" r="10" fill="#0b2a3d"/><circle cx="45" cy="48" r="3.2" fill="#fff"/><circle cx="81" cy="48" r="3.2" fill="#fff"/>
<path d="M54 68 L66 68 L60 80 Z" fill="#ffb347" stroke="#d9871a" stroke-width="2" stroke-linejoin="round"/><circle cx="60" cy="101" r="4.5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`,
  pirate: `<circle cx="60" cy="60" r="54" fill="#fff3d6" stroke="#c9954a" stroke-width="4"/>
<path d="M112 52 L126 68 L116 70 Z" fill="#e8523f" stroke="#a82d1c" stroke-width="2" stroke-linejoin="round"/>
<path d="M7 54 A54 54 0 0 1 113 54 Q60 70 7 54 Z" fill="#e8523f" stroke="#a82d1c" stroke-width="3" stroke-linejoin="round"/>
<circle cx="34" cy="30" r="3.5" fill="#fff"/><circle cx="60" cy="20" r="3.5" fill="#fff"/><circle cx="86" cy="30" r="3.5" fill="#fff"/><circle cx="47" cy="44" r="3" fill="#fff"/><circle cx="73" cy="44" r="3" fill="#fff"/>
<circle cx="113" cy="50" r="8" fill="#e8523f" stroke="#a82d1c" stroke-width="3"/>
<line x1="46" y1="72" x2="10" y2="56" stroke="#2e1d0e" stroke-width="3"/><ellipse cx="44" cy="78" rx="12" ry="10" fill="#2e1d0e"/>
<circle cx="78" cy="78" r="12" fill="#fff" stroke="#c9954a" stroke-width="2"/><circle cx="80" cy="79" r="6" fill="#2e1d0e"/><circle cx="82.5" cy="76" r="2.2" fill="#fff"/>
<circle cx="22" cy="94" r="5" fill="#ffb3a0"/><circle cx="98" cy="96" r="5" fill="#ffb3a0"/><circle cx="60" cy="108" r="4.5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`,
  dino: `<path d="M28 18 L38 -4 L50 10 Z" fill="#ff9b3d" stroke="#d9731a" stroke-width="2.5" stroke-linejoin="round"/><path d="M48 8 L60 -12 L72 8 Z" fill="#ff9b3d" stroke="#d9731a" stroke-width="2.5" stroke-linejoin="round"/><path d="M70 10 L82 -4 L92 18 Z" fill="#ff9b3d" stroke="#d9731a" stroke-width="2.5" stroke-linejoin="round"/>
<circle cx="60" cy="60" r="54" fill="#4ccf7a" stroke="#2a9c55" stroke-width="4"/><ellipse cx="60" cy="90" rx="32" ry="20" fill="#c9f5a8"/>
<circle cx="24" cy="46" r="6" fill="#2a9c55" opacity=".5"/><circle cx="98" cy="40" r="5" fill="#2a9c55" opacity=".5"/><circle cx="96" cy="60" r="4" fill="#2a9c55" opacity=".5"/>
<circle cx="44" cy="52" r="12" fill="#fff"/><circle cx="76" cy="52" r="12" fill="#fff"/><circle cx="46" cy="54" r="6" fill="#4a2411"/><circle cx="74" cy="54" r="6" fill="#4a2411"/><circle cx="48.5" cy="51" r="2.3" fill="#fff"/><circle cx="76.5" cy="51" r="2.3" fill="#fff"/>
<circle cx="55" cy="72" r="2" fill="#2a9c55"/><circle cx="65" cy="72" r="2" fill="#2a9c55"/><circle cx="24" cy="72" r="6" fill="#ffb3a0"/><circle cx="96" cy="72" r="6" fill="#ffb3a0"/>
<circle cx="60" cy="102" r="4.5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`,
  penguin: `<ellipse cx="44" cy="116" rx="13" ry="6" fill="#ffa43d"/><ellipse cx="76" cy="116" rx="13" ry="6" fill="#ffa43d"/>
<ellipse cx="8" cy="68" rx="9" ry="20" transform="rotate(15 8 68)" fill="#1f3a68" stroke="#12264a" stroke-width="3"/><ellipse cx="112" cy="68" rx="9" ry="20" transform="rotate(-15 112 68)" fill="#1f3a68" stroke="#12264a" stroke-width="3"/>
<circle cx="60" cy="60" r="54" fill="#1f3a68" stroke="#12264a" stroke-width="4"/><ellipse cx="60" cy="72" rx="36" ry="38" fill="#fff"/>
<circle cx="46" cy="60" r="7" fill="#1f3a68"/><circle cx="74" cy="60" r="7" fill="#1f3a68"/><circle cx="48.5" cy="57" r="2.5" fill="#fff"/><circle cx="76.5" cy="57" r="2.5" fill="#fff"/>
<path d="M52 72 L68 72 L60 84 Z" fill="#ffa43d" stroke="#d97a0f" stroke-width="2" stroke-linejoin="round"/>
<circle cx="35" cy="74" r="5.5" fill="#ffb3c8"/><circle cx="85" cy="74" r="5.5" fill="#ffb3c8"/>
<path d="M26 30 Q60 -14 94 30 Z" fill="#ff6b6b" stroke="#c43d3d" stroke-width="3" stroke-linejoin="round"/><rect x="24" y="26" width="72" height="12" rx="6" fill="#fff" stroke="#c43d3d" stroke-width="3"/>
<circle cx="60" cy="4" r="9" fill="#fff" stroke="#c43d3d" stroke-width="2"/><circle cx="60" cy="102" r="4.5" fill="#2f7bff" stroke="#fff" stroke-width="1.5"/>`
};

/* ---- Deko (Positionen für eine 390-px-breite Spalte) ---- */
const star = (x, y, s, c = '#fff') => C(x, y, s, c);
const firefly = (x, y, s) => C(x, y, s, '#e8ff7a', 'box-shadow:0 0 12px 4px rgba(232,255,122,.6)');
const leaf = (x, y, w, h, r, c) => D(`left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:50%;background:${c};transform:rotate(${r}deg)`);
const spr = (x, y, c, r) => D(`left:${x}px;top:${y}px;width:22px;height:7px;border-radius:4px;background:${c};transform:rotate(${r}deg)`);
const snow = (x, y, s) => C(x, y, s, '#fff', 'border:2px solid #bfe3fb;box-sizing:border-box');
const cloud = (x, y, s, o = 1) => C(x, y, s, '#fff', `opacity:${o}`);

const DECOR = {
  std: [C(5, 17, 68, 'rgba(255,255,255,.75)'), C(309, 77, 116, 'rgba(255,255,255,.5)'), C(-68, 439, 168, 'rgba(46,196,182,.22)'),
        C(312, 554, 140, 'rgba(30,136,229,.18)'), C(152, 737, 180, 'rgba(91,227,176,.3)')],
  space: [C(290, -40, 150, '#7b5cff'), D('left:290px;top:10px;width:250px;height:50px;border-radius:50%;border:6px solid rgba(255,216,77,.8);transform:rotate(-20deg)'),
          C(-60, 560, 120, '#ff8fd0', 'opacity:.35'), C(300, 640, 90, '#5ee7ff', 'opacity:.18'),
          star(30, 20, 6), star(170, 30, 4), star(340, 150, 5), star(12, 190, 4), star(360, 420, 6, '#ffd84d'), star(8, 470, 5), star(350, 560, 4), star(150, 830, 5)],
  ocean: [C(300, 110, 60, 'rgba(255,255,255,.3)'), C(10, 150, 34, 'rgba(255,255,255,.35)'), C(340, 330, 22, 'rgba(255,255,255,.4)'), C(20, 420, 46, 'rgba(255,255,255,.25)'), C(350, 480, 16, 'rgba(255,255,255,.45)'),
          D('left:300px;top:70px;width:34px;height:22px;border-radius:50%;background:#ff9f45'), D('left:330px;top:74px;width:16px;height:14px;background:#ff9f45;clip-path:polygon(0 50%,100% 0,100% 100%)'),
          D('left:8px;top:300px;width:30px;height:20px;border-radius:50%;background:#ff7a8a'), D('left:36px;top:303px;width:14px;height:14px;background:#ff7a8a;clip-path:polygon(0 50%,100% 0,100% 100%)'),
          D('left:-14px;top:640px;width:46px;height:230px;border-radius:50%;background:#2fd18b'), D('left:16px;top:690px;width:36px;height:180px;border-radius:50%;background:#0f8a63'),
          D('left:356px;top:650px;width:46px;height:230px;border-radius:50%;background:#2fd18b'), D('left:336px;top:700px;width:34px;height:170px;border-radius:50%;background:#0f8a63')],
  jungle: [leaf(-70, -20, 190, 80, 35, '#2f9e44'), leaf(-60, 30, 150, 60, 60, '#1f7a3a'), leaf(290, -30, 190, 80, 145, '#2f9e44'), leaf(330, 10, 130, 56, 120, '#1f7a3a'),
           leaf(-80, 700, 210, 90, -35, '#2f9e44'), leaf(270, 710, 220, 90, 30, '#1f7a3a'), D('left:60px;top:0;width:5px;height:60px;background:#2f9e44'), C(55, 56, 15, '#ff8fb8'),
           C(325, 150, 18, '#ff8fb8', 'border:5px solid #ffd84d;box-sizing:content-box'), C(14, 400, 16, '#ff8fb8', 'border:4px solid #ffd84d;box-sizing:content-box'), C(340, 470, 12, '#ffd84d')],
  cat: [C(-50, -50, 190, '#ffd1ea'), C(300, 90, 120, '#d6f5e8'), C(-40, 380, 110, '#e3d8ff'), C(320, 520, 110, '#fff0b3'), C(-30, 700, 140, '#d6f5e8'), C(290, 720, 160, '#e3d8ff'),
        spr(160, 18, '#9be7c9', 30), spr(340, 30, '#ffb3dc', -40), spr(20, 200, '#c9b6ff', 70), spr(350, 420, '#ffc94d', 15), spr(14, 560, '#ffb3dc', -20)],
  arcade: [C(95, -40, 200, 'linear-gradient(180deg,#ffe14d 0%,#ff2bd6 100%)', 'opacity:.35'), D('left:95px;top:90px;width:200px;height:5px;background:#0d0221'), D('left:95px;top:112px;width:200px;height:8px;background:#0d0221'), D('left:95px;top:136px;width:200px;height:12px;background:#0d0221'),
           D('left:0;top:560px;width:390px;height:284px;background:repeating-linear-gradient(90deg,rgba(255,43,214,.35) 0 2px,transparent 2px 39px),repeating-linear-gradient(180deg,rgba(0,240,255,.3) 0 2px,transparent 2px 36px)'),
           D('left:30px;top:200px;width:4px;height:4px;background:#fff'), D('left:350px;top:260px;width:4px;height:4px;background:#00f0ff'), D('left:12px;top:480px;width:4px;height:4px;background:#ffe14d'), D('left:360px;top:500px;width:4px;height:4px;background:#fff')],
  rainbow: [D('left:360px;top:-40px;width:80px;height:80px;border-radius:50%;box-shadow:0 0 0 12px #ff6b6b,0 0 0 24px #ffb84d,0 0 0 36px #ffe14d,0 0 0 48px #6bd68a,0 0 0 60px #5ab4ff,0 0 0 72px #b48cff'),
            cloud(-20, 230, 60), cloud(20, 210, 50), cloud(300, 300, 70, .9), cloud(340, 320, 56, .9), cloud(-30, 520, 70, .8), cloud(10, 540, 50, .8), cloud(330, 740, 90), cloud(290, 770, 70), cloud(-40, 760, 100)],
  owl: [C(12, 236, 56, '#fff4c2'), C(24, 250, 12, '#f1e3a8'), C(44, 266, 8, '#f1e3a8'), star(150, 14, 4), star(230, 90, 4), star(350, 200, 5), star(30, 130, 4),
        firefly(340, 130, 9), firefly(20, 380, 9), firefly(360, 440, 9), firefly(330, 600, 9),
        D('left:-40px;top:660px;width:120px;height:260px;border-radius:50%;background:#0b3a3a'), D('left:320px;top:640px;width:130px;height:280px;border-radius:50%;background:#0b3a3a'), C(40, 760, 90, '#0f4a46')],
  pirate: [leaf(290, -30, 140, 40, 30, '#3fb455'), leaf(310, 10, 130, 36, 62, '#2f9e44'), leaf(260, -10, 120, 34, 4, '#3fb455'),
           C(-50, 560, 150, '#e9bf6e', 'opacity:.6'), C(300, 700, 180, '#e9bf6e', 'opacity:.6'),
           D('left:342px;top:330px;width:30px;height:6px;border-radius:3px;background:#e8523f;transform:rotate(45deg)'), D('left:342px;top:330px;width:30px;height:6px;border-radius:3px;background:#e8523f;transform:rotate(-45deg)'),
           C(18, 300, 14, '#ffb3a0'), C(30, 316, 9, '#ffb3a0')],
  dino: [leaf(-60, -10, 140, 44, 40, '#4ccf7a'), leaf(-50, 40, 120, 40, 70, '#2a9c55'), C(300, -40, 120, '#ff9b3d', 'opacity:.45'),
         D('left:12px;top:250px;width:56px;height:72px;border-radius:50% 50% 50% 50% / 62% 62% 38% 38%;background:#fff3d6;border:3px solid #e8934a;box-sizing:border-box'), C(26, 270, 10, '#4ccf7a'), C(42, 290, 8, '#4ccf7a'),
         C(330, 250, 16, '#e8934a', 'opacity:.6'), C(316, 236, 9, '#e8934a', 'opacity:.6'), C(332, 232, 9, '#e8934a', 'opacity:.6'), C(348, 236, 9, '#e8934a', 'opacity:.6'),
         C(340, 480, 14, '#4ccf7a', 'opacity:.7'), C(-40, 700, 150, '#e8934a', 'opacity:.5'), C(300, 720, 160, '#4ccf7a', 'opacity:.5')],
  penguin: [D('left:-30px;top:690px;width:170px;height:160px;background:#cfeaff;clip-path:polygon(50% 0,100% 100%,0 100%)'), D('left:250px;top:660px;width:200px;height:190px;background:#a9d6f5;clip-path:polygon(50% 0,100% 100%,0 100%)'),
            snow(30, 40, 14), snow(180, 8, 10), snow(340, 110, 16), snow(14, 260, 12), snow(350, 330, 12), snow(30, 400, 18), snow(355, 480, 14),
            C(300, 200, 60, '#bfe3fb', 'opacity:.5'), C(-30, 560, 80, '#bfe3fb', 'opacity:.5')]
};

const T = (id, name, bar, vars, ball, decor) => ({ id, name, bar, vars: Object.assign({}, BASE, vars), ball, decor: decor.join('') });

const THEMES = [
  T('std', 'Original', '#1e88e5', {
    '--bg': 'linear-gradient(165deg,#c4f1ff,#c9f8e6)', '--text': '#0b3b6b', '--panel': 'rgba(255,255,255,.88)', '--pborder': '#ffffff', '--pill': 'rgba(255,255,255,.88)', '--pillb': '#ffffff',
    '--pribg': '#5be3b0', '--pritext': '#0b3b6b', '--priborder': '#0f8a63', '--prishadow': '0 4px 0 #0f8a63',
    '--secbg': '#ffffff', '--sectext': '#0b3b6b', '--secborder': '#1e88e5', '--secshadow': '0 4px 0 rgba(15,107,181,.35)',
    '--padbg': 'radial-gradient(circle closest-side,#fff 0 25%,#d4f7ff 25% 50%,#b8f2dc 50% 75%,#9fe6f8 75% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(15,107,181,.25)',
    '--track': 'linear-gradient(90deg,#9fe6f8,#5be3b0)', '--trackborder': '#ffffff', '--thumbbg': '#ffffff', '--thumbborder': '#2ec4b6',
    '--dialouter': '#ffffff', '--dialinner': '#9fe6f8', '--dialfill': '#2ec4b6', '--knobstroke': '#0f8a63', '--dialtext': '#0b3b6b',
    '--dot': '#5be3b0', '--dotborder': '#0f8a63', '--shell': 'radial-gradient(circle at 35% 28%,#f0fdff,#8fdcf7 55%,#2f9fe3)', '--ledpanel': '#0b3b6b', '--ledoff': '#12406f'
  }, B.std, DECOR.std),
  T('space', 'Weltraum', '#1a1458', {
    '--font-ui': "'Fredoka',system-ui,sans-serif", '--font-head': "'Fredoka',system-ui,sans-serif", '--headw': '700',
    '--bg': 'linear-gradient(180deg,#1a1458 0%,#2b1c7c 55%,#3d2aa3 100%)', '--text': '#ffffff', '--panel': 'rgba(255,255,255,.1)', '--pborder': 'rgba(255,255,255,.25)', '--pill': 'rgba(255,255,255,.14)', '--pillb': 'rgba(255,255,255,.3)',
    '--pribg': '#5ee7ff', '--pritext': '#120d4a', '--priborder': '#c9f6ff', '--prishadow': '0 4px 0 #2aa9c4',
    '--secbg': 'rgba(255,255,255,.12)', '--sectext': '#ffffff', '--secborder': 'rgba(255,255,255,.5)',
    '--padbg': 'radial-gradient(circle closest-side,#4b3bc4 0 25%,#5a49dc 25% 50%,#6a5af0 50% 75%,#7b6cff 75% 100%)', '--padborder': 'rgba(255,255,255,.9)', '--padshadow': '0 8px 0 rgba(0,0,0,.25)', '--padring': 'rgba(255,255,255,.55)',
    '--track': 'linear-gradient(90deg,#7b6cff,#5ee7ff)', '--trackborder': 'rgba(255,255,255,.8)', '--thumbbg': '#ffffff', '--thumbborder': '#5ee7ff',
    '--dialouter': 'rgba(255,255,255,.35)', '--dialinner': '#3b2fa8', '--dialfill': '#5ee7ff', '--knobstroke': '#5ee7ff', '--dialtext': '#ffffff',
    '--dot': '#5ee7ff', '--dotborder': '#ffffff', '--shell': 'radial-gradient(circle at 35% 28%,#8f86ff,#4b3bc4 60%,#2b1c7c)', '--ledpanel': '#120d4a', '--ledoff': '#2a2380'
  }, B.space, DECOR.space),
  T('ocean', 'Unterwasser', '#34bde0', {
    '--font-ui': "'Baloo 2',system-ui,sans-serif", '--font-head': "'Baloo 2',system-ui,sans-serif",
    '--bg': 'linear-gradient(180deg,#9aefff 0%,#34bde0 42%,#0b6aa8 100%)', '--text': '#062a52', '--panel': 'rgba(255,255,255,.9)', '--pborder': '#ffffff', '--pill': 'rgba(255,255,255,.9)', '--pillb': '#ffffff', '--sliderbg': 'rgba(255,255,255,.9)',
    '--pribg': '#ffd84d', '--pritext': '#062a52', '--priborder': '#062a52', '--prishadow': '0 4px 0 #062a52',
    '--secbg': '#ffffff', '--sectext': '#062a52', '--secborder': '#062a52', '--secshadow': '0 4px 0 #062a52',
    '--padbg': 'radial-gradient(circle closest-side,#e6fbff 0 25%,#b5f0ff 25% 50%,#7fdcf5 50% 75%,#4fc3ea 75% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(6,42,82,.25)',
    '--track': 'linear-gradient(90deg,#9aefff,#1bb7a0)', '--trackborder': '#ffffff', '--thumbbg': '#ffffff', '--thumbborder': '#1bb7a0',
    '--dialouter': '#9aefff', '--dialinner': '#d9f6ff', '--dialfill': '#1bb7a0', '--knobstroke': '#1bb7a0', '--dialtext': '#062a52',
    '--dot': '#ffd84d', '--dotborder': '#062a52', '--shell': 'radial-gradient(circle at 35% 28%,#e6fbff,#7fdcf5 55%,#2bb6d9)', '--ledpanel': '#0b3b6b', '--ledoff': '#14507e'
  }, B.ocean, DECOR.ocean),
  T('jungle', 'Dschungel', '#6fd06a', {
    '--headw': '900',
    '--bg': 'linear-gradient(180deg,#d9f7b6 0%,#a8e68a 55%,#6fd06a 100%)', '--text': '#123d24', '--panel': 'rgba(255,255,255,.9)', '--pborder': '#ffffff', '--pill': 'rgba(255,255,255,.9)', '--pillb': '#ffffff', '--sliderbg': 'rgba(255,255,255,.9)',
    '--pribg': '#ffd84d', '--pritext': '#123d24', '--priborder': '#123d24', '--prishadow': '0 4px 0 #123d24',
    '--secbg': '#ffffff', '--sectext': '#123d24', '--secborder': '#123d24', '--secshadow': '0 4px 0 #123d24',
    '--padbg': 'radial-gradient(circle closest-side,#d6ffc9 0 25%,#9be67e 25% 50%,#6fd06a 50% 75%,#3fb455 75% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(18,61,36,.3)',
    '--track': 'linear-gradient(90deg,#d6ffc9,#2f9e44)', '--trackborder': '#ffffff', '--thumbbg': '#ffd84d', '--thumbborder': '#2f9e44',
    '--dialouter': '#a8e68a', '--dialinner': '#e6ffd9', '--dialfill': '#2f9e44', '--knobstroke': '#2f9e44', '--dialtext': '#123d24',
    '--dot': '#ffd84d', '--dotborder': '#123d24', '--shell': 'radial-gradient(circle at 35% 28%,#e9ffd9,#9be67e 55%,#3fb455)', '--ledpanel': '#123d24', '--ledoff': '#1d5233'
  }, B.jungle, DECOR.jungle),
  T('cat', 'Bonbon', '#ff8fc7', {
    '--font-ui': "'Baloo 2',system-ui,sans-serif", '--font-head': "'Baloo 2',system-ui,sans-serif",
    '--bg': '#fff5fb', '--text': '#4a1f55', '--panel': '#ffffff', '--pborder': '#ffd1ea', '--pill': '#ffffff', '--pillb': '#ffd1ea',
    '--pribg': '#ff8fc7', '--pritext': '#4a1f55', '--priborder': '#4a1f55', '--prishadow': '0 4px 0 #4a1f55',
    '--secbg': '#ffffff', '--sectext': '#4a1f55', '--secborder': '#4a1f55', '--secshadow': '0 4px 0 #4a1f55',
    '--padbg': 'radial-gradient(circle closest-side,#fff5fb 0 24%,#e3d8ff 24% 48%,#ffb3dc 48% 76%,#ffd1ea 76% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(74,31,85,.2)',
    '--track': 'linear-gradient(90deg,#e3d8ff,#ff8fc7)', '--trackborder': '#ffffff', '--thumbbg': '#ffffff', '--thumbborder': '#ff8fc7',
    '--dialouter': '#ffd1ea', '--dialinner': '#fff0f8', '--dialfill': '#ff8fc7', '--knobstroke': '#ff8fc7', '--dialtext': '#4a1f55',
    '--dot': '#c9b6ff', '--dotborder': '#4a1f55', '--shell': 'radial-gradient(circle at 35% 28%,#fff5fb,#ffd1ea 55%,#ff9bd0)', '--ledpanel': '#4a1f55', '--ledoff': '#6a3a78'
  }, B.cat, DECOR.cat),
  T('arcade', 'Arcade', '#0d0221', {
    '--font-head': "'Press Start 2P',monospace", '--headw': '400', '--h1': '12px', '--h1lh': '1.6', '--tabsize': '9px', '--bubsize': '10px', '--bubnum': '10px', '--dialsize': '15px', '--pr': '10px',
    '--bg': 'linear-gradient(180deg,#0d0221 0%,#1a0a40 100%)', '--text': '#ffffff', '--panel': 'rgba(26,10,64,.92)', '--pborder': '#ff2bd6', '--pill': 'rgba(0,240,255,.1)', '--pillb': '#00f0ff',
    '--pribg': '#ffe14d', '--pritext': '#0d0221', '--priborder': '#ffffff', '--prishadow': '4px 4px 0 #ff2bd6',
    '--secbg': 'transparent', '--sectext': '#00f0ff', '--secborder': '#00f0ff', '--secshadow': '4px 4px 0 #00f0ff',
    '--padbg': 'radial-gradient(circle closest-side,#1a0a40 0 25%,#2a1066 25% 50%,#1a0a40 50% 75%,#2a1066 75% 100%)', '--padborder': '#00f0ff', '--padshadow': '0 0 24px rgba(0,240,255,.6),inset 0 0 18px rgba(255,43,214,.5)', '--padring': '#ff2bd6',
    '--track': 'linear-gradient(90deg,#2a1066,#ff2bd6)', '--trackborder': '#00f0ff', '--thumbbg': '#ffe14d', '--thumbborder': '#0d0221',
    '--dialouter': '#00f0ff', '--dialinner': '#1a0a40', '--dialfill': '#ff2bd6', '--knobstroke': '#ffffff', '--knobfill': '#ffe14d', '--dialtext': '#ffe14d',
    '--dot': '#00f0ff', '--dotborder': '#ffffff', '--shell': 'radial-gradient(circle at 35% 28%,#3a1a80,#1a0a40 60%,#0d0221)', '--ledpanel': '#0d0221', '--ledoff': '#2a1066'
  }, B.arcade, DECOR.arcade),
  T('rainbow', 'Regenbogen', '#8ad4ff', {
    '--font-ui': "'Fredoka',system-ui,sans-serif", '--font-head': "'Fredoka',system-ui,sans-serif", '--headw': '700',
    '--bg': 'linear-gradient(180deg,#8ad4ff 0%,#c8ecff 55%,#effaff 100%)', '--text': '#1b3a6b', '--panel': 'rgba(255,255,255,.92)', '--pborder': '#ffffff', '--pill': 'rgba(255,255,255,.92)', '--pillb': '#ffffff', '--sliderbg': 'rgba(255,255,255,.9)',
    '--pribg': '#ffe14d', '--pritext': '#1b3a6b', '--priborder': '#1b3a6b', '--prishadow': '0 4px 0 #1b3a6b',
    '--secbg': '#ffffff', '--sectext': '#1b3a6b', '--secborder': '#1b3a6b', '--secshadow': '0 4px 0 #1b3a6b',
    '--padbg': 'radial-gradient(circle closest-side,#ffffff 0 25%,#e6f6ff 25% 50%,#c6e9ff 50% 75%,#a6dcff 75% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(27,58,107,.2)',
    '--track': 'linear-gradient(90deg,#ff6b6b,#ffb84d,#ffe14d,#6bd68a,#5ab4ff,#b48cff)', '--trackborder': '#ffffff', '--thumbbg': '#ffffff', '--thumbborder': '#1b3a6b',
    '--dialouter': '#c6e9ff', '--dialinner': '#effaff', '--dialfill': '#5ab4ff', '--knobstroke': '#b48cff', '--dialtext': '#1b3a6b',
    '--dot': '#b48cff', '--dotborder': '#1b3a6b', '--shell': 'radial-gradient(circle at 35% 28%,#ffffff,#c6e9ff 55%,#8ad4ff)', '--ledpanel': '#1b3a6b', '--ledoff': '#2e5290'
  }, B.rainbow, DECOR.rainbow),
  T('owl', 'Nacht-Eule', '#0b2a3d', {
    '--font-ui': "'Quicksand',system-ui,sans-serif", '--font-head': "'Quicksand',system-ui,sans-serif", '--headw': '700',
    '--bg': 'linear-gradient(180deg,#0b2a3d 0%,#12485a 55%,#1b6a6a 100%)', '--text': '#ffffff', '--panel': 'rgba(255,255,255,.1)', '--pborder': 'rgba(255,255,255,.25)', '--pill': 'rgba(255,255,255,.12)', '--pillb': 'rgba(255,255,255,.3)',
    '--pribg': '#ffe066', '--pritext': '#0b2a3d', '--priborder': '#fff4c2', '--prishadow': '0 4px 0 #b89a1f',
    '--secbg': 'rgba(255,255,255,.12)', '--sectext': '#ffffff', '--secborder': 'rgba(255,255,255,.5)', '--sliderbg': 'rgba(11,42,61,.75)',
    '--padbg': 'radial-gradient(circle closest-side,#d9f4ff 0 25%,#8fd3dd 25% 50%,#4aa3b0 50% 75%,#2a7f8c 75% 100%)', '--padborder': 'rgba(255,255,255,.9)', '--padshadow': '0 8px 0 rgba(0,0,0,.25)',
    '--track': 'linear-gradient(90deg,#2a7f8c,#ffe066)', '--trackborder': 'rgba(255,255,255,.8)', '--thumbbg': '#ffffff', '--thumbborder': '#ffe066',
    '--dialouter': 'rgba(255,255,255,.35)', '--dialinner': '#0f3a4a', '--dialfill': '#ffe066', '--knobstroke': '#ffe066', '--dialtext': '#ffffff',
    '--dot': '#e8ff7a', '--dotborder': '#ffffff', '--shell': 'radial-gradient(circle at 35% 28%,#b9eef2,#4aa3b0 60%,#1b6a6a)', '--ledpanel': '#0b2a3d', '--ledoff': '#1b4f63'
  }, B.owl, DECOR.owl),
  T('pirate', 'Piraten', '#7fd8e8', {
    '--font-ui': "'Baloo 2',system-ui,sans-serif", '--font-head': "'Baloo 2',system-ui,sans-serif",
    '--bg': 'linear-gradient(180deg,#7fd8e8 0%,#bff0e8 15%,#f9e8b8 28%,#f2d08a 100%)', '--text': '#2e1d0e', '--panel': 'rgba(255,247,221,.94)', '--pborder': '#c9954a', '--pill': 'rgba(255,247,221,.92)', '--pillb': '#c9954a', '--sliderbg': 'rgba(255,247,221,.92)',
    '--pribg': '#ffc94d', '--pritext': '#2e1d0e', '--priborder': '#2e1d0e', '--prishadow': '0 4px 0 #2e1d0e',
    '--secbg': '#fff7dd', '--sectext': '#2e1d0e', '--secborder': '#2e1d0e', '--secshadow': '0 4px 0 #2e1d0e',
    '--padbg': 'radial-gradient(circle closest-side,#fff7dd 0 25%,#f6dca0 25% 50%,#e9bf6e 50% 75%,#c9954a 75% 100%)', '--padborder': '#8a5a2b', '--padshadow': '0 8px 0 rgba(46,29,14,.3)',
    '--track': 'linear-gradient(90deg,#7fd8e8,#ffc94d)', '--trackborder': '#8a5a2b', '--thumbbg': '#fff7dd', '--thumbborder': '#8a5a2b',
    '--dialouter': '#8a5a2b', '--dialinner': '#f6dca0', '--dialfill': '#e8523f', '--knobstroke': '#8a5a2b', '--knobfill': '#fff7dd', '--dialtext': '#2e1d0e',
    '--dot': '#e8523f', '--dotborder': '#2e1d0e', '--shell': 'radial-gradient(circle at 35% 28%,#fff7dd,#e9bf6e 55%,#c9954a)', '--ledpanel': '#2e1d0e', '--ledoff': '#4a3420'
  }, B.pirate, DECOR.pirate),
  T('dino', 'Dino', '#ffe3b3', {
    '--font-ui': "'Baloo 2',system-ui,sans-serif", '--font-head': "'Baloo 2',system-ui,sans-serif",
    '--bg': 'linear-gradient(180deg,#ffe3b3 0%,#ffcf9a 100%)', '--text': '#4a2411', '--panel': 'rgba(255,255,255,.92)', '--pborder': '#ffffff', '--pill': 'rgba(255,255,255,.9)', '--pillb': '#ffffff', '--sliderbg': 'rgba(255,255,255,.9)',
    '--pribg': '#4ccf7a', '--pritext': '#4a2411', '--priborder': '#4a2411', '--prishadow': '0 4px 0 #4a2411',
    '--secbg': '#ffffff', '--sectext': '#4a2411', '--secborder': '#4a2411', '--secshadow': '0 4px 0 #4a2411',
    '--padbg': 'radial-gradient(circle closest-side,#fff3d6 0 25%,#ffd9a0 25% 50%,#ffb870 50% 75%,#e8934a 75% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(74,36,17,.25)',
    '--track': 'linear-gradient(90deg,#ffd9a0,#4ccf7a)', '--trackborder': '#ffffff', '--thumbbg': '#ffffff', '--thumbborder': '#ff9b3d',
    '--dialouter': '#ffd9a0', '--dialinner': '#fff7ea', '--dialfill': '#4ccf7a', '--knobstroke': '#ff9b3d', '--dialtext': '#4a2411',
    '--dot': '#ff9b3d', '--dotborder': '#4a2411', '--shell': 'radial-gradient(circle at 35% 28%,#fff3d6,#ffb870 55%,#e8934a)', '--ledpanel': '#4a2411', '--ledoff': '#6b3d22'
  }, B.dino, DECOR.dino),
  T('penguin', 'Winter', '#d8f1ff', {
    '--headw': '900',
    '--bg': 'linear-gradient(180deg,#d8f1ff 0%,#eaf8ff 55%,#ffffff 100%)', '--text': '#123a63', '--panel': 'rgba(255,255,255,.94)', '--pborder': '#bfe3fb', '--pill': 'rgba(255,255,255,.92)', '--pillb': '#bfe3fb', '--sliderbg': 'rgba(255,255,255,.92)',
    '--pribg': '#5ab4ff', '--pritext': '#123a63', '--priborder': '#123a63', '--prishadow': '0 4px 0 #123a63',
    '--secbg': '#ffffff', '--sectext': '#123a63', '--secborder': '#123a63', '--secshadow': '0 4px 0 #123a63',
    '--padbg': 'radial-gradient(circle closest-side,#ffffff 0 25%,#e1f3ff 25% 50%,#c0e3fb 50% 75%,#9fd2f5 75% 100%)', '--padborder': '#ffffff', '--padshadow': '0 8px 0 rgba(18,58,99,.2)',
    '--track': 'linear-gradient(90deg,#d8f1ff,#5ab4ff)', '--trackborder': '#ffffff', '--thumbbg': '#ffffff', '--thumbborder': '#5ab4ff',
    '--dialouter': '#bfe3fb', '--dialinner': '#f3faff', '--dialfill': '#5ab4ff', '--knobstroke': '#5ab4ff', '--dialtext': '#123a63',
    '--dot': '#ff6b6b', '--dotborder': '#123a63', '--shell': 'radial-gradient(circle at 35% 28%,#ffffff,#c0e3fb 55%,#9fd2f5)', '--ledpanel': '#123a63', '--ledoff': '#25507f'
  }, B.penguin, DECOR.penguin)
];
