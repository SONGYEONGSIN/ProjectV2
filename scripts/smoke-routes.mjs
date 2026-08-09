#!/usr/bin/env node
/**
 * 라우트 스모크 테스트 — 재개편 마이그레이션 안전망 V1
 *
 * 테스트가 없는 프로젝트라, "모든 라우트가 여전히 뜨는가"가 사실상 유일한
 * 자동 회귀 신호다. 각 단계 종료 게이트로 재사용한다.
 *
 * 의존성 0 (Node 내장 fetch). 서버를 띄우지는 않는다 — 이미 떠 있는 서버를 두드린다.
 *
 *   node scripts/smoke-routes.mjs                  # http://localhost:3000
 *   BASE=http://localhost:3001 node scripts/...    # 포트 지정
 *
 * worktree 비교 운용: main 을 3000, feat/redesign 을 3001 에 띄우고 각각 돌린다.
 */

const BASE = process.env.BASE ?? "http://localhost:3000";
const TIMEOUT_MS = Number(process.env.TIMEOUT_MS ?? 30000);

/**
 * expect: 허용 상태 코드. 배열이면 그중 하나면 통과.
 *
 * /admin·/admin/audit 은 middleware.ts:37 matcher 대상이라 비로그인 시
 * /login 으로 302 된다. 리다이렉트도 "정상 동작"이므로 통과로 친다 —
 * 이 스크립트는 인증을 검증하지 않고 "터지지 않았는가"만 본다.
 *
 * /board/[id] · /board/[id]/edit 은 실 DB 레코드가 있어야 하므로 제외한다.
 * 로컬에 Supabase 키가 없으면 항상 실패해 신호가 무의미해진다.
 */
const ROUTES = [
  { path: "/", expect: 200 },
  { path: "/login", expect: 200 },
  { path: "/signup", expect: 200 },
  { path: "/privacy", expect: 200 },
  { path: "/terms", expect: 200 },
  { path: "/dashboard", expect: 200 },
  { path: "/calculator", expect: 200 },
  { path: "/board", expect: 200 },
  { path: "/board/write", expect: 200 },
  { path: "/admin", expect: [200, 302, 307] },
  { path: "/admin/audit", expect: [200, 302, 307] },
  { path: "/opengraph-image", expect: 200 },
  // 재개편 시안 — 이식 완료 후 이 3건은 목록에서 뺀다.
  { path: "/commissioned/redesign-r1", expect: 200 },
  { path: "/commissioned/redesign-r1/login", expect: 200 },
  { path: "/commissioned/redesign-r1/signup", expect: 200 },
  // not-found 가 살아 있는지 (404 자체가 기대값)
  { path: "/__does_not_exist__", expect: 404, allowNotFoundText: true },
];

/** 본문에 이게 있으면 상태 코드와 무관하게 실패로 본다. */
const FATAL_PATTERNS = [
  "Application error",
  "Unhandled Runtime Error",
  "Internal Server Error",
];
const NOT_FOUND_TEXT = "This page could not be found";

async function probe(route) {
  const url = `${BASE}${route.path}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
    });
    const allowed = Array.isArray(route.expect) ? route.expect : [route.expect];
    const statusOk = allowed.includes(res.status);

    // 리다이렉트 응답은 본문이 비어 있으므로 본문 검사를 건너뛴다.
    let bodyProblem = null;
    if (res.status >= 200 && res.status < 300) {
      const body = await res.text();
      const fatal = FATAL_PATTERNS.find((p) => body.includes(p));
      if (fatal) bodyProblem = `본문에 "${fatal}"`;
      else if (!route.allowNotFoundText && body.includes(NOT_FOUND_TEXT)) {
        bodyProblem = `본문에 "${NOT_FOUND_TEXT}" (라우트 유실?)`;
      }
    }

    return {
      ...route,
      status: res.status,
      ok: statusOk && !bodyProblem,
      note: bodyProblem ?? (statusOk ? "" : `기대 ${allowed.join("|")}`),
    };
  } catch (err) {
    const reason = err.name === "AbortError" ? `타임아웃 ${TIMEOUT_MS}ms` : err.message;
    return { ...route, status: 0, ok: false, note: reason };
  } finally {
    clearTimeout(timer);
  }
}

const results = [];
// 순차 실행 — dev 서버는 라우트마다 온디맨드 컴파일하므로 병렬로 때리면
// 컴파일 경합으로 타임아웃이 난다. 느리지만 신호가 정확한 쪽을 택한다.
for (const route of ROUTES) {
  results.push(await probe(route));
}

const pass = results.filter((r) => r.ok).length;
for (const r of results) {
  const mark = r.ok ? "PASS" : "FAIL";
  const status = r.status === 0 ? "---" : String(r.status);
  console.log(`  ${mark}  ${status}  ${r.path}${r.note ? `  — ${r.note}` : ""}`);
}
console.log(`\n${pass}/${results.length} 통과  (BASE=${BASE})`);

process.exit(pass === results.length ? 0 : 1);
