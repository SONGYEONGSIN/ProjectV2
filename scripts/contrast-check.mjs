#!/usr/bin/env node
/**
 * 대비 실측 — 재개편 마이그레이션 안전망 V6
 *
 * globals.css 의 :root 색 변수를 읽어 WCAG 상대휘도로 대비를 계산한다.
 * 다크 → 라이트 전환에서 가장 흔한 사고는 "값만 바꾸고 대비를 안 재는 것"이다.
 * 보조 텍스트(muted/dim)가 배경에 묻히는 형태로 나타나며, 눈으로는 애매하고
 * 스크린샷으로도 잘 안 보인다.
 *
 *   node scripts/contrast-check.mjs
 *
 * 기준: 본문 4.5:1 · 대형활자/그래픽/UI 컴포넌트 3:1 (WCAG 2.2 AA, 1.4.3 / 1.4.11)
 */

import { readFileSync } from "node:fs";

const CSS = readFileSync("app/globals.css", "utf8");

/** :root 블록만 본다 — @theme inline 의 자기참조는 값이 아니다. */
const rootBlock = CSS.match(/:root\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

const vars = new Map();
for (const m of rootBlock.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*(#[0-9a-fA-F]{3,8})\s*;/g)) {
  vars.set(m[1], m[2]);
}

/** #rgb / #rrggbb → [r,g,b] 0-255 */
function parseHex(hex) {
  let h = hex.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  if (h.length === 8) h = h.slice(0, 6); // 알파는 대비 계산에서 무시
  const n = Number.parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/** WCAG 2.x 상대휘도 */
function luminance(hex) {
  const [r, g, b] = parseHex(hex).map((v) => {
    const s = v / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

/**
 * 검사 쌍. `min` 은 용도별 하한.
 * 토큰 이름은 S1 리네임(mint→accent) 이후 기준이며, 아직 없는 변수는 건너뛴다
 * (단계 진행 중에는 일부만 존재하는 게 정상이다).
 */
const PAIRS = [
  ["--color-hi", "--color-base", 4.5, "본문 텍스트"],
  ["--color-hi", "--color-surface", 4.5, "카드 위 본문"],
  ["--color-mid", "--color-base", 4.5, "보조 텍스트"],
  ["--color-mid", "--color-surface", 4.5, "카드 위 보조"],
  ["--color-dim", "--color-base", 4.5, "약한 보조 텍스트"],
  ["--color-accent", "--color-base", 3.0, "강조 — 면·아이콘·포커스링"],
  ["--color-accent-ink", "--color-base", 4.5, "강조 — 소형 텍스트"],
  ["--color-ink", "--color-accent", 4.5, "강조 면 위 텍스트"],
  ["--color-rose", "--color-base", 4.5, "에러 텍스트"],
  ["--color-amber", "--color-base", 4.5, "경고 텍스트"],
  ["--color-sky", "--color-base", 4.5, "정보 텍스트"],
  ["--color-edge", "--color-base", 3.0, "폼 컨트롤 경계 (1.4.11)"],
];

const rows = [];
for (const [fgName, bgName, min, label] of PAIRS) {
  const fg = vars.get(fgName);
  const bg = vars.get(bgName);
  if (!fg || !bg) {
    rows.push({ label, skip: `${!fg ? fgName : bgName} 미정의`, fgName, bgName });
    continue;
  }
  const ratio = contrast(fg, bg);
  rows.push({ label, fgName, bgName, fg, bg, ratio, min, ok: ratio >= min });
}

console.log(`:root 색 변수 ${vars.size}종 · 검사 쌍 ${PAIRS.length}\n`);

let failed = 0;
for (const r of rows) {
  if (r.skip) {
    console.log(`  SKIP        ${r.label.padEnd(24)} — ${r.skip}`);
    continue;
  }
  const mark = r.ok ? "PASS" : "FAIL";
  if (!r.ok) failed++;
  console.log(
    `  ${mark}  ${r.ratio.toFixed(2).padStart(5)}:1  ${r.label.padEnd(24)} ` +
      `${r.fg} on ${r.bg}  (하한 ${r.min})`,
  );
}

const checked = rows.filter((r) => !r.skip).length;
console.log(`\n${checked - failed}/${checked} 통과${failed ? ` · ${failed}건 미달` : ""}`);
process.exit(failed === 0 ? 0 : 1);
