// PixelLaiba.jsx — animated pixel-art character (v2: bob cut, wired earphones).
// Drop into src/components/. No dependencies beyond React.
// Animations: idle bob, blinking, typing code on the laptop, coffee steam.
// Click/tap or press Enter: she says something. Respects prefers-reduced-motion.
import { useEffect, useRef, useState } from "react";

const W = 34, H = 50;
const LAYERS = {
  base: [[14, 2, 7, "#2A1238"], [9, 3, 5, "#2A1238"], [14, 3, 7, "#1C1820"], [21, 3, 5, "#2A1238"], [8, 4, 1, "#2A1238"], [9, 4, 17, "#1C1820"], [26, 4, 1, "#2A1238"], [8, 5, 1, "#2A1238"], [9, 5, 4, "#1C1820"], [13, 5, 3, "#4A3A5C"], [16, 5, 4, "#1C1820"], [20, 5, 2, "#4A3A5C"], [22, 5, 4, "#1C1820"], [26, 5, 1, "#2A1238"], [8, 6, 1, "#2A1238"], [9, 6, 3, "#1C1820"], [12, 6, 1, "#4A3A5C"], [13, 6, 9, "#1C1820"], [22, 6, 1, "#4A3A5C"], [23, 6, 3, "#1C1820"], [26, 6, 1, "#2A1238"], [8, 7, 1, "#2A1238"], [9, 7, 17, "#1C1820"], [26, 7, 1, "#2A1238"], [7, 8, 1, "#2A1238"], [8, 8, 9, "#1C1820"], [17, 8, 1, "#E0B496"], [18, 8, 9, "#1C1820"], [27, 8, 1, "#2A1238"], [7, 9, 1, "#2A1238"], [8, 9, 8, "#1C1820"], [16, 9, 3, "#E0B496"], [19, 9, 8, "#1C1820"], [27, 9, 1, "#2A1238"], [6, 10, 1, "#2A1238"], [7, 10, 7, "#1C1820"], [14, 10, 7, "#E0B496"], [21, 10, 7, "#1C1820"], [28, 10, 1, "#2A1238"], [6, 11, 1, "#2A1238"], [7, 11, 4, "#1C1820"], [11, 11, 13, "#E0B496"], [24, 11, 4, "#1C1820"], [28, 11, 1, "#2A1238"], [6, 12, 1, "#2A1238"], [7, 12, 4, "#1C1820"], [11, 12, 1, "#E0B496"], [12, 12, 3, "#1C1820"], [15, 12, 5, "#E0B496"], [20, 12, 3, "#1C1820"], [23, 12, 1, "#E0B496"], [24, 12, 4, "#1C1820"], [28, 12, 1, "#2A1238"], [6, 13, 1, "#2A1238"], [7, 13, 4, "#1C1820"], [11, 13, 1, "#E0B496"], [12, 13, 2, "#1C1820"], [14, 13, 1, "#FFFFFF"], [15, 13, 5, "#E0B496"], [20, 13, 2, "#1C1820"], [22, 13, 1, "#FFFFFF"], [23, 13, 1, "#E0B496"], [24, 13, 4, "#1C1820"], [28, 13, 1, "#2A1238"], [6, 14, 1, "#2A1238"], [7, 14, 4, "#1C1820"], [11, 14, 1, "#E0B496"], [12, 14, 3, "#1C1820"], [15, 14, 5, "#E0B496"], [20, 14, 3, "#1C1820"], [23, 14, 1, "#E0B496"], [24, 14, 4, "#1C1820"], [28, 14, 1, "#2A1238"], [6, 15, 1, "#2A1238"], [7, 15, 2, "#1C1820"], [9, 15, 2, "#FFFFFF"], [11, 15, 1, "#E0B496"], [12, 15, 3, "#1C1820"], [15, 15, 5, "#E0B496"], [20, 15, 3, "#1C1820"], [23, 15, 1, "#E0B496"], [24, 15, 2, "#FFFFFF"], [26, 15, 2, "#1C1820"], [28, 15, 1, "#2A1238"], [6, 16, 1, "#2A1238"], [7, 16, 2, "#1C1820"], [9, 16, 2, "#FFFFFF"], [11, 16, 6, "#E0B496"], [17, 16, 1, "#C59475"], [18, 16, 6, "#E0B496"], [24, 16, 2, "#FFFFFF"], [26, 16, 2, "#1C1820"], [28, 16, 1, "#2A1238"], [6, 17, 1, "#2A1238"], [7, 17, 2, "#1C1820"], [9, 17, 1, "#FFFFFF"], [10, 17, 1, "#1C1820"], [11, 17, 2, "#EA9CAA"], [13, 17, 9, "#E0B496"], [22, 17, 2, "#EA9CAA"], [24, 17, 1, "#1C1820"], [25, 17, 1, "#FFFFFF"], [26, 17, 2, "#1C1820"], [28, 17, 1, "#2A1238"], [6, 18, 1, "#2A1238"], [7, 18, 2, "#1C1820"], [9, 18, 1, "#FFFFFF"], [10, 18, 1, "#1C1820"], [11, 18, 13, "#E0B496"], [24, 18, 1, "#1C1820"], [25, 18, 1, "#FFFFFF"], [26, 18, 2, "#1C1820"], [28, 18, 1, "#2A1238"], [6, 19, 1, "#2A1238"], [7, 19, 2, "#1C1820"], [9, 19, 1, "#FFFFFF"], [10, 19, 1, "#1C1820"], [11, 19, 5, "#E0B496"], [16, 19, 3, "#9C3352"], [19, 19, 5, "#E0B496"], [24, 19, 1, "#1C1820"], [25, 19, 1, "#FFFFFF"], [26, 19, 2, "#1C1820"], [28, 19, 1, "#2A1238"], [6, 20, 1, "#2A1238"], [7, 20, 2, "#1C1820"], [9, 20, 1, "#FFFFFF"], [10, 20, 2, "#1C1820"], [12, 20, 5, "#E0B496"], [17, 20, 1, "#7A2540"], [18, 20, 5, "#E0B496"], [23, 20, 2, "#1C1820"], [25, 20, 1, "#FFFFFF"], [26, 20, 2, "#1C1820"], [28, 20, 1, "#2A1238"], [6, 21, 1, "#2A1238"], [7, 21, 2, "#1C1820"], [9, 21, 1, "#FFFFFF"], [10, 21, 2, "#1C1820"], [12, 21, 1, "#2A1238"], [13, 21, 9, "#E0B496"], [22, 21, 1, "#2A1238"], [23, 21, 2, "#1C1820"], [25, 21, 1, "#FFFFFF"], [26, 21, 2, "#1C1820"], [28, 21, 1, "#2A1238"], [6, 22, 1, "#2A1238"], [7, 22, 2, "#1C1820"], [9, 22, 1, "#FFFFFF"], [10, 22, 2, "#1C1820"], [12, 22, 3, "#2A1238"], [15, 22, 5, "#E0B496"], [20, 22, 3, "#2A1238"], [23, 22, 2, "#1C1820"], [25, 22, 1, "#FFFFFF"], [26, 22, 2, "#1C1820"], [28, 22, 1, "#2A1238"], [7, 23, 1, "#2A1238"], [8, 23, 2, "#1C1820"], [10, 23, 1, "#FFFFFF"], [11, 23, 1, "#1C1820"], [12, 23, 1, "#2A1238"], [14, 23, 1, "#2A1238"], [15, 23, 5, "#E0B496"], [20, 23, 1, "#2A1238"], [22, 23, 1, "#2A1238"], [23, 23, 1, "#1C1820"], [24, 23, 1, "#FFFFFF"], [25, 23, 2, "#1C1820"], [27, 23, 1, "#2A1238"], [8, 24, 2, "#2A1238"], [10, 24, 1, "#FFFFFF"], [11, 24, 4, "#2A1238"], [15, 24, 5, "#E0B496"], [20, 24, 4, "#2A1238"], [24, 24, 1, "#FFFFFF"], [25, 24, 2, "#2A1238"], [11, 25, 1, "#FFFFFF"], [12, 25, 4, "#D2AAF0"], [16, 25, 3, "#E0B496"], [19, 25, 4, "#D2AAF0"], [23, 25, 1, "#FFFFFF"], [8, 26, 3, "#2A1238"], [11, 26, 1, "#D2AAF0"], [12, 26, 1, "#FFFFFF"], [13, 26, 4, "#D2AAF0"], [17, 26, 1, "#C59475"], [18, 26, 4, "#D2AAF0"], [22, 26, 1, "#FFFFFF"], [23, 26, 1, "#D2AAF0"], [24, 26, 3, "#2A1238"], [7, 27, 1, "#2A1238"], [8, 27, 1, "#B48AD8"], [9, 27, 2, "#D2AAF0"], [11, 27, 1, "#B48AD8"], [12, 27, 1, "#D2AAF0"], [13, 27, 1, "#FFFFFF"], [14, 27, 7, "#D2AAF0"], [21, 27, 1, "#FFFFFF"], [22, 27, 1, "#D2AAF0"], [23, 27, 1, "#B48AD8"], [24, 27, 2, "#D2AAF0"], [26, 27, 1, "#B48AD8"], [27, 27, 1, "#2A1238"], [0, 28, 8, "#2A1238"], [8, 28, 1, "#B48AD8"], [9, 28, 2, "#D2AAF0"], [11, 28, 1, "#B48AD8"], [12, 28, 2, "#D2AAF0"], [14, 28, 1, "#FFFFFF"], [15, 28, 5, "#D2AAF0"], [20, 28, 1, "#FFFFFF"], [21, 28, 2, "#D2AAF0"], [23, 28, 1, "#B48AD8"], [24, 28, 2, "#D2AAF0"], [26, 28, 1, "#B48AD8"], [27, 28, 5, "#2A1238"], [0, 29, 10, "#E8E0EE"], [10, 29, 1, "#D2AAF0"], [11, 29, 1, "#B48AD8"], [12, 29, 3, "#D2AAF0"], [15, 29, 1, "#FFFFFF"], [16, 29, 3, "#D2AAF0"], [19, 29, 1, "#FFFFFF"], [20, 29, 3, "#D2AAF0"], [23, 29, 1, "#B48AD8"], [24, 29, 2, "#D2AAF0"], [26, 29, 1, "#B48AD8"], [27, 29, 5, "#C9B8DA"], [32, 29, 1, "#2A1238"], [0, 30, 1, "#E8E0EE"], [1, 30, 8, "#3C1955"], [9, 30, 1, "#E8E0EE"], [10, 30, 1, "#D2AAF0"], [11, 30, 1, "#B48AD8"], [12, 30, 1, "#D2AAF0"], [13, 30, 1, "#B48AD8"], [14, 30, 1, "#D2AAF0"], [15, 30, 1, "#B48AD8"], [16, 30, 1, "#FFFFFF"], [17, 30, 1, "#B48AD8"], [18, 30, 1, "#FFFFFF"], [19, 30, 1, "#B48AD8"], [20, 30, 1, "#D2AAF0"], [21, 30, 1, "#B48AD8"], [22, 30, 1, "#D2AAF0"], [23, 30, 1, "#B48AD8"], [24, 30, 2, "#D2AAF0"], [26, 30, 1, "#B48AD8"], [27, 30, 5, "#FAF5FA"], [32, 30, 1, "#2A1238"], [0, 31, 1, "#E8E0EE"], [1, 31, 1, "#3C1955"], [7, 31, 2, "#3C1955"], [9, 31, 1, "#E8E0EE"], [10, 31, 1, "#D2AAF0"], [11, 31, 1, "#B48AD8"], [12, 31, 5, "#D2AAF0"], [17, 31, 1, "#FFFFFF"], [18, 31, 5, "#D2AAF0"], [23, 31, 1, "#B48AD8"], [24, 31, 2, "#D2AAF0"], [26, 31, 1, "#B48AD8"], [27, 31, 5, "#8A5A3B"], [32, 31, 1, "#2A1238"], [0, 32, 1, "#E8E0EE"], [1, 32, 2, "#3C1955"], [8, 32, 1, "#3C1955"], [9, 32, 1, "#E8E0EE"], [10, 32, 1, "#D2AAF0"], [11, 32, 1, "#B48AD8"], [12, 32, 5, "#D2AAF0"], [17, 32, 1, "#FFFFFF"], [18, 32, 5, "#D2AAF0"], [23, 32, 1, "#B48AD8"], [24, 32, 2, "#D2AAF0"], [26, 32, 1, "#B48AD8"], [27, 32, 5, "#8A5A3B"], [32, 32, 1, "#2A1238"], [0, 33, 1, "#E8E0EE"], [1, 33, 1, "#3C1955"], [6, 33, 3, "#3C1955"], [9, 33, 1, "#E8E0EE"], [10, 33, 1, "#D2AAF0"], [11, 33, 1, "#B48AD8"], [12, 33, 1, "#D2AAF0"], [13, 33, 1, "#B48AD8"], [14, 33, 1, "#D2AAF0"], [15, 33, 1, "#B48AD8"], [16, 33, 1, "#D2AAF0"], [17, 33, 1, "#FFFFFF"], [18, 33, 1, "#D2AAF0"], [19, 33, 1, "#B48AD8"], [20, 33, 1, "#D2AAF0"], [21, 33, 1, "#B48AD8"], [22, 33, 1, "#D2AAF0"], [23, 33, 1, "#B48AD8"], [24, 33, 2, "#D2AAF0"], [26, 33, 1, "#B48AD8"], [27, 33, 1, "#E0B496"], [28, 33, 4, "#FAF5FA"], [32, 33, 1, "#2A1238"], [0, 34, 1, "#E8E0EE"], [1, 34, 2, "#3C1955"], [7, 34, 2, "#3C1955"], [9, 34, 2, "#E0B496"], [11, 34, 1, "#B48AD8"], [12, 34, 5, "#D2AAF0"], [17, 34, 1, "#FFFFFF"], [18, 34, 5, "#D2AAF0"], [23, 34, 1, "#B48AD8"], [24, 34, 4, "#E0B496"], [28, 34, 4, "#FAF5FA"], [32, 34, 1, "#2A1238"], [0, 35, 1, "#E8E0EE"], [1, 35, 8, "#3C1955"], [9, 35, 1, "#E8E0EE"], [10, 35, 1, "#E0B496"], [11, 35, 1, "#B48AD8"], [12, 35, 5, "#D2AAF0"], [17, 35, 1, "#FFFFFF"], [18, 35, 5, "#D2AAF0"], [23, 35, 1, "#B48AD8"], [24, 35, 3, "#E0B496"], [27, 35, 5, "#FAF5FA"], [32, 35, 1, "#2A1238"], [0, 36, 10, "#E8E0EE"], [10, 36, 1, "#2A1238"], [11, 36, 13, "#B48AD8"], [24, 36, 8, "#2A1238"], [0, 37, 11, "#B9AEC4"], [11, 37, 1, "#2A1238"], [12, 37, 11, "#46527E"], [23, 37, 1, "#2A1238"], [0, 38, 12, "#2A1238"], [12, 38, 1, "#46527E"], [13, 38, 3, "#5B6A9C"], [16, 38, 1, "#46527E"], [17, 38, 1, "#5B6A9C"], [18, 38, 1, "#46527E"], [19, 38, 3, "#5B6A9C"], [22, 38, 1, "#46527E"], [23, 38, 1, "#2A1238"], [11, 39, 1, "#2A1238"], [12, 39, 1, "#46527E"], [13, 39, 3, "#5B6A9C"], [16, 39, 1, "#46527E"], [17, 39, 1, "#5B6A9C"], [18, 39, 1, "#46527E"], [19, 39, 3, "#5B6A9C"], [22, 39, 1, "#46527E"], [23, 39, 1, "#2A1238"], [11, 40, 1, "#2A1238"], [12, 40, 1, "#46527E"], [13, 40, 3, "#5B6A9C"], [16, 40, 1, "#46527E"], [17, 40, 1, "#2A1238"], [18, 40, 1, "#46527E"], [19, 40, 3, "#5B6A9C"], [22, 40, 1, "#46527E"], [23, 40, 1, "#2A1238"], [11, 41, 1, "#2A1238"], [12, 41, 1, "#46527E"], [13, 41, 3, "#5B6A9C"], [16, 41, 1, "#46527E"], [17, 41, 1, "#2A1238"], [18, 41, 1, "#46527E"], [19, 41, 3, "#5B6A9C"], [22, 41, 1, "#46527E"], [23, 41, 1, "#2A1238"], [11, 42, 1, "#2A1238"], [12, 42, 1, "#46527E"], [13, 42, 3, "#5B6A9C"], [16, 42, 1, "#46527E"], [17, 42, 1, "#2A1238"], [18, 42, 1, "#46527E"], [19, 42, 3, "#5B6A9C"], [22, 42, 1, "#46527E"], [23, 42, 1, "#2A1238"], [11, 43, 1, "#2A1238"], [12, 43, 1, "#46527E"], [13, 43, 3, "#5B6A9C"], [16, 43, 1, "#46527E"], [17, 43, 1, "#2A1238"], [18, 43, 1, "#46527E"], [19, 43, 3, "#5B6A9C"], [22, 43, 1, "#46527E"], [23, 43, 1, "#2A1238"], [11, 44, 1, "#2A1238"], [12, 44, 1, "#46527E"], [13, 44, 3, "#5B6A9C"], [16, 44, 1, "#46527E"], [17, 44, 1, "#2A1238"], [18, 44, 1, "#46527E"], [19, 44, 3, "#5B6A9C"], [22, 44, 1, "#46527E"], [23, 44, 1, "#2A1238"], [11, 45, 1, "#2A1238"], [12, 45, 1, "#46527E"], [13, 45, 3, "#5B6A9C"], [16, 45, 1, "#46527E"], [17, 45, 1, "#2A1238"], [18, 45, 1, "#46527E"], [19, 45, 3, "#5B6A9C"], [22, 45, 1, "#46527E"], [23, 45, 1, "#2A1238"], [10, 46, 1, "#2A1238"], [11, 46, 6, "#FAF5FA"], [17, 46, 1, "#2A1238"], [18, 46, 6, "#FAF5FA"], [24, 46, 1, "#2A1238"], [10, 47, 1, "#2A1238"], [11, 47, 6, "#C9B8DA"], [17, 47, 1, "#2A1238"], [18, 47, 6, "#C9B8DA"], [24, 47, 1, "#2A1238"], [11, 48, 6, "#2A1238"], [18, 48, 6, "#2A1238"]],
  lids: [[12, 13, 3, "#E0B496"], [20, 13, 3, "#E0B496"], [12, 14, 3, "#1C1820"], [20, 14, 3, "#1C1820"], [12, 15, 3, "#E0B496"], [20, 15, 3, "#E0B496"]],
  code1: [[2, 31, 5, "#FFE169"]],
  code2: [[3, 32, 5, "#D2AAF0"]],
  code3: [[2, 33, 4, "#FAF5FA"]],
  code4: [[3, 34, 4, "#FFE169"]],
  steam: [[31, 22, 1, "#9F7BC6"], [30, 23, 1, "#9F7BC6"], [29, 24, 1, "#9F7BC6"], [30, 25, 1, "#9F7BC6"], [30, 26, 1, "#9F7BC6"], [29, 27, 1, "#9F7BC6"]],
};

export const DEFAULT_QUIPS = [
  "no, I won’t hack your ex’s Instagram.",
  "it’s always DNS. except when it’s phishing.",
  "I read logs for fun. concerning, I know.",
  "trust me? don’t. check the logs.",
  "have you tried… not clicking the link?",
  "evidence first. coffee second. barely.",
  "this coffee is my incident response plan.",
  "my love language is a well-tuned alert."
];

const CSS = `.pxl{position:relative;display:inline-block;line-height:0}
.pxl-btn{background:none;border:0;padding:0;margin:0;cursor:pointer;display:block;line-height:0;border-radius:6px}
.pxl-btn:focus-visible{outline:2px solid #3C1955;outline-offset:6px}
.pxl svg{display:block;image-rendering:pixelated;overflow:visible}
.pxl-body{animation:pxl-bob 1.4s steps(1,end) infinite}
.pxl-lids{opacity:0;animation:pxl-blink 4.6s infinite}
.pxl-code{animation:pxl-type 3.2s steps(1,end) infinite both}
.pxl-c2{animation-delay:.4s}.pxl-c3{animation-delay:.8s}.pxl-c4{animation-delay:1.2s}
.pxl-steam{animation:pxl-steam 2.2s steps(4,end) infinite}
.pxl-btn:hover .pxl-body,.pxl-btn:focus-visible .pxl-body{animation-duration:.5s}
@keyframes pxl-bob{0%{transform:translateY(0)}50%{transform:translateY(-1px)}}
@keyframes pxl-blink{0%,92%{opacity:0}93%,97%{opacity:1}98%,100%{opacity:0}}
@keyframes pxl-type{0%{opacity:0}15%{opacity:1}85%{opacity:1}100%{opacity:0}}
@keyframes pxl-steam{0%{transform:translateY(2px);opacity:0}25%{opacity:1}100%{transform:translateY(-2px);opacity:0}}
.pxl-bubble{position:absolute;left:50%;bottom:calc(100% + 14px);transform:translateX(-50%);width:max-content;max-width:min(260px,80vw);
 background:#FAF5FA;color:#3C1955;border:2px solid #3C1955;border-radius:4px;padding:10px 12px;
 font:500 13px/1.45 'JetBrains Mono',ui-monospace,monospace;box-shadow:4px 4px 0 #3C1955;text-align:left;z-index:5}
.pxl-bubble::after{content:"";position:absolute;left:50%;top:100%;width:10px;height:10px;background:#FAF5FA;
 border-right:2px solid #3C1955;border-bottom:2px solid #3C1955;transform:translate(-50%,-4px) rotate(45deg)}
.pxl-bubble[hidden]{display:none}
@media (prefers-reduced-motion:reduce){.pxl-body,.pxl-lids,.pxl-code,.pxl-steam{animation:none}.pxl-lids{opacity:0}.pxl-code,.pxl-steam{opacity:1}}`;

const Rects = ({ data }) =>
  data.map(([x, y, w, f]) => <rect key={x + "-" + y} x={x} y={y} width={w} height={1} fill={f} />);

export default function PixelLaiba({ size = 200, quips = DEFAULT_QUIPS, label = "Pixel Laiba", className = "" }) {
  const [idx, setIdx] = useState(-1);
  const timer = useRef(null);

  const speak = () => {
    setIdx((i) => (i + 1) % quips.length);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setIdx(-1), 4200);
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <div className={`pxl ${className}`} style={{ width: size }}>
      <style>{CSS}</style>
      <div className="pxl-bubble" aria-live="polite" hidden={idx < 0}>
        {idx >= 0 ? quips[idx] : ""}
      </div>
      <button type="button" className="pxl-btn" onClick={speak} aria-label={`${label}. Click for a comment.`}>
        <svg viewBox={`0 0 ${W} ${H}`} width={size} height={(size * H) / W} shapeRendering="crispEdges" aria-hidden="true">
          <g className="pxl-body">
            <Rects data={LAYERS.base} />
            <g className="pxl-lids"><Rects data={LAYERS.lids} /></g>
            <g className="pxl-code pxl-c1"><Rects data={LAYERS.code1} /></g>
            <g className="pxl-code pxl-c2"><Rects data={LAYERS.code2} /></g>
            <g className="pxl-code pxl-c3"><Rects data={LAYERS.code3} /></g>
            <g className="pxl-code pxl-c4"><Rects data={LAYERS.code4} /></g>
            <g className="pxl-steam"><Rects data={LAYERS.steam} /></g>
          </g>
        </svg>
      </button>
    </div>
  );
}
