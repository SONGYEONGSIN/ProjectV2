#!/usr/bin/env node
/**
 * 옛 팔레트 잔재 grep 게이트 — 재개편 마이그레이션 안전망 V4
 *
 * 단계가 끝났는데 옛 토큰이 남아 있으면, 그 화면만 이전 정체성으로 남아
 * 본문과 충돌한다. 시안 1차에서 실제로 그랬다(셸이 옛 팔레트로 남아 민트 vs
 * 골드가 정면 충돌).
 *
 * 규칙은 단계별로 켜진다. 아직 도달하지 않은 단계의 규칙까지 켜면 상시 실패해
 * 게이트가 무시되므로, 활성 단계를 인자로 받는다.
 *
 *   node scripts/token-audit.mjs            # 현재 단계까지의 규칙만
 *   node scripts/token-audit.mjs --stage=2  # S2 까지의 규칙
 *   node scripts/token-audit.mjs --all      # 최종 상태 기준 전량
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const args = process.argv.slice(2);
const ALL = args.includes("--all");
const STAGE = ALL
  ? Infinity
  : Number((args.find((a) => a.startsWith("--stage=")) ?? "--stage=0").split("=")[1]);

const ROOTS = ["app", "components", "lib"];
const EXTS = new Set([".tsx", ".ts", ".css"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "__snapshots__"]);

/**
 * 시안 폴더는 자체 스코프 토큰(--cx-*)을 쓰는 별도 세계다. 이식이 끝나면
 * 통째로 삭제되므로 잔재 검사 대상이 아니다.
 */
const SKIP_PATHS = [/^app\/commissioned\//];

/** stage: 이 규칙이 켜지는 단계. 그 단계를 끝낸 시점부터 위반이면 실패. */
const RULES = [
  {
    stage: 1,
    id: "no-mint-token",
    re: /\b(bg|text|border|ring|from|to|via)-mint(-soft)?\b/,
    why: "S1 에서 mint → accent 로 리네임됨",
  },
  {
    stage: 1,
    id: "no-mint-var",
    re: /--color-mint\b/,
    why: "S1 에서 --color-accent 로 리네임됨",
  },
  {
    stage: 2,
    id: "no-old-base",
    re: /--color-base:\s*#0b0c0f/i,
    why: "S2 에서 백지(#ffffff)로 교체됨 — 옛 off-black 값이 남아 있다",
  },
  {
    stage: 2,
    id: "no-dark-scrim",
    re: /\bbg-base\/(70|80|90)\b/,
    why: "base 가 흰색이 된 뒤로는 흰 스크림 위 흰 모달이 된다 → --color-scrim 사용",
  },
  {
    stage: 2,
    id: "no-backdrop-blur",
    re: /\bbackdrop-blur\b/,
    why: "불투명 면 위에서는 효과 0 · 합성 레이어만 생긴다",
  },
  {
    stage: 2,
    id: "no-raw-tailwind-color",
    re: /\b(bg|text|border)-(blue|green|red|emerald|teal|indigo|violet)-\d00\b/,
    why: "의미 토큰(accent/rose/amber/sky)을 쓴다 — 원시 Tailwind 색상 금지",
  },
  {
    stage: 2,
    id: "no-gradient",
    re: /radial-gradient|linear-gradient/,
    why: "서류 조판에 그라데이션은 이물 (globals.css 의 Dub 잔재 포함)",
  },
  {
    stage: 2,
    id: "no-dark-shadow",
    re: /shadow-\[[^\]]*rgba\(0,\s*0,\s*0,\s*0\.[67]/,
    why: "다크 전제 그림자 — 라이트에서 과하다",
  },
];

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (EXTS.has(extname(full))) out.push(full);
  }
  return out;
}

const active = RULES.filter((r) => r.stage <= STAGE);
if (active.length === 0) {
  console.log(`활성 규칙 없음 (stage=${STAGE}). --stage=N 또는 --all 로 지정한다.`);
  process.exit(0);
}

const files = ROOTS.filter((r) => {
  try {
    return statSync(r).isDirectory();
  } catch {
    return false;
  }
})
  .flatMap((r) => walk(r))
  .filter((f) => !SKIP_PATHS.some((re) => re.test(f)));

const violations = [];
for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    for (const rule of active) {
      if (rule.re.test(line)) {
        violations.push({ file, line: i + 1, rule, text: line.trim().slice(0, 100) });
      }
    }
  });
}

console.log(`검사 파일 ${files.length} · 활성 규칙 ${active.length}종 (stage≤${STAGE})`);

if (violations.length === 0) {
  console.log("위반: 0건");
  process.exit(0);
}

const byRule = new Map();
for (const v of violations) {
  if (!byRule.has(v.rule.id)) byRule.set(v.rule.id, []);
  byRule.get(v.rule.id).push(v);
}

console.log(`\n★ 위반 ${violations.length}건`);
for (const [id, list] of byRule) {
  console.log(`\n  [${id}] ${list[0].rule.why}  (${list.length}건)`);
  for (const v of list.slice(0, 8)) console.log(`    ${v.file}:${v.line}  ${v.text}`);
  if (list.length > 8) console.log(`    … 외 ${list.length - 8}건`);
}
process.exit(1);
