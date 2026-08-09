#!/usr/bin/env node
/**
 * CSS 변수 참조 ↔ 선언 대조 — 재개편 마이그레이션 안전망 V5
 *
 * 이 계획에서 **가장 재발 가능성 높은 회귀**를 잡는다. 토큰을 전면 재작성하는
 * 도중 선언이 하나 유실되면, 그 변수를 참조하던 곳은 조용히 초기값으로
 * 폴백한다(색이면 대개 검정 또는 투명). 타입체크·린트·빌드 전부 통과한다.
 *
 * 실제 사례: 시안 작업 중 --cx-brand-google-* 4종이 CSS 재작성 과정에서
 * 유실돼 Google 로고가 검정으로 폴백됐다. 어느 게이트에도 걸리지 않았고
 * 사람이 grep 으로 찾았다.
 *
 *   node scripts/css-var-check.mjs
 *
 * 종료 코드: 미정의 참조가 하나라도 있으면 1.
 */

import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join } from "node:path";

const ROOTS = ["app", "components", "lib"];
const EXTS = new Set([".tsx", ".ts", ".css"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "__snapshots__"]);

/**
 * 선언으로 인정하지 않지만 참조해도 되는 것들.
 * - Tailwind/Next 가 런타임에 주입하는 변수
 * - next/font 가 만드는 폰트 변수 (app/layout.tsx 의 variable 옵션)
 */
const EXTERNAL = [
  /^--tw-/,
  /^--font-(inter|montserrat)-loaded$/,
  /^--radix-/,
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

const files = ROOTS.filter((r) => {
  try {
    return statSync(r).isDirectory();
  } catch {
    return false;
  }
}).flatMap((r) => walk(r));

const declared = new Set();
const referenced = new Map(); // name -> Set<file>

/**
 * 블록 주석을 지운다. 주석 안의 설명용 `var(--cx-*)` 같은 문자열을 참조로
 * 오인하면 상시 실패하는 게이트가 되어 아무도 보지 않게 된다.
 * 줄 길이를 보존할 필요가 없으므로 단순 치환으로 충분하다.
 */
const stripComments = (src) => src.replace(/\/\*[\s\S]*?\*\//g, "");

for (const file of files) {
  const src = stripComments(readFileSync(file, "utf8"));

  for (const m of src.matchAll(/(--[a-zA-Z0-9-]+)\s*:\s*([^;\n]*)/g)) {
    const [, name, value] = m;
    // `--foo: var(--foo)` 자기참조는 선언으로 치지 않는다.
    // globals.css 의 `@theme inline` 이 이 형태로 :root 값을 Tailwind 에 노출하는데,
    // :root 쪽 실선언이 사라지면 순환 참조가 되어 값이 무효화된다. 자기참조를
    // 선언으로 세면 바로 그 유실을 못 잡는다 — 이 검사기의 존재 이유가 사라진다.
    if (new RegExp(`var\\(\\s*${name}\\b`).test(value)) continue;
    declared.add(name);
  }

  // 참조: `var(--foo)` / `var(--foo, fallback)`
  for (const m of src.matchAll(/var\(\s*(--[a-zA-Z0-9-]+)\s*[,)]/g)) {
    if (!referenced.has(m[1])) referenced.set(m[1], new Set());
    referenced.get(m[1]).add(file);
  }
}

const missing = [...referenced.entries()]
  .filter(([name]) => !declared.has(name) && !EXTERNAL.some((re) => re.test(name)))
  .sort(([a], [b]) => a.localeCompare(b));

console.log(`검사 파일 ${files.length} · 선언 ${declared.size}종 · 참조 ${referenced.size}종`);

if (missing.length === 0) {
  console.log("미정의 참조: 0건");
  process.exit(0);
}

console.log(`\n★ 미정의 참조 ${missing.length}건 — 색이 조용히 폴백된다:`);
for (const [name, where] of missing) {
  console.log(`  ${name}`);
  for (const f of [...where].sort()) console.log(`      ${f}`);
}
process.exit(1);
