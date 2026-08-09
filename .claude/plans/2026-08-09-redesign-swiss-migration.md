---
plan_id: 2026-08-09-redesign-swiss-migration
title: 전면 재개편 — v3 Premium Dark Fintech → 스위스 그리드 "Document as Layout"
status: draft (미승인 — 결정 게이트 3건 대기)
hard_gate: full
priority: HIGH
created: 2026-08-09
source: app/commissioned/redesign-r1/ (승인된 공개 3페이지 시안 = 정본)
predecessors:
  - 2026-05-07-design-rebrand-modern-fintech (실행됨)
  - 2026-05-11-design-rebrand-dub (실행됨, acc3bd0)
  - a06aa75 Premium Dark Fintech v3 (실행됨)
worktree: feat/redesign (권장 — 아래 §0.4)
scope: 13 라우트 + 공유 컴포넌트 7 + 토큰 인프라 + 메타/로고 ≈ 30 파일
---

## 0. 설계 문서

### 0.1 목표

`app/commissioned/redesign-r1/`에 완성·승인된 **스위스 그리드 / Document as Layout** 시각 언어를 앱 전체 13 라우트로 확장한다. **행동·계산 로직 0 변경**이 절대 조건이다.

성공 신호 (전부 측정 가능해야 함):
1. 13 라우트 + `/opengraph-image` 응답 200, 콘솔 에러 0
2. `npx tsc --noEmit` 0 / `npm run lint` 0 / `npm run build` exit 0
3. v3 다크 잔재 grep 0건 (`--color-base: #0b0c0f`, `bg-base/80`, `text-blue-600`, `radial-gradient`, `backdrop-blur`)
4. tsx·css의 `var(--*)` 참조 전량이 선언과 대조되어 **미정의 0건** (§5.4 — 시안에서 실제로 터진 회귀 유형)
5. 계산기 회귀: 동일 입력 → **동일 표시 환급액** (로직 무변경 증명)
6. 신규 토큰 전량 WCAG 실측치 문서화 (본문 4.5:1 / 대형·그래픽·UI 3:1)

### 0.2 제약 (실측)

| 제약 | 근거 |
|---|---|
| 테스트 0개 | `package.json:5-10` — `dev`/`build`/`start`/`lint`뿐. Vitest·Playwright 미설치 |
| 루트 셸이 13 라우트 전부를 감쌈 | `app/layout.tsx:96-102`. 부분 이식 불가, 콘텐츠 실폭 상한 1120px |
| calculator·admin이 물량 67% | 4,792 + 4,250 = 9,042줄 / 12,950줄 |
| 두 파일 모두 로직·UI 동일 파일 혼재 | §4 상세 |
| 시안은 `.cx-*` 스코프 + `body:has(.cx-r1)` 셸 은닉 해킹 위에 서 있음 | `commission.css:258-276`. 이식 시 전부 제거 대상 |
| 이 레포는 이미 리브랜드를 **두 번** 완주했다 | `.claude/plans/2026-05-07-*`, `2026-05-11-*` — 검증된 절차가 존재 |

### 0.3 대안 분석

**접근 A — 라우트별 병행 이식** (라우트 하나씩 새 언어로, 나머지는 옛 팔레트 유지)

- 장점: 각 PR이 작다. 라우트 단위 롤백.
- 단점: **치명적.** 토큰이 전역 CSS 변수 한 벌이라 "라우트별 팔레트 병행"이 물리적으로 불가능하다. 하려면 시안이 쓴 `.cx-*` 스코프 해킹(`body:has()`로 셸 숨기기)을 앱 전역에 영구화해야 하는데, 그건 셸이 이중으로 존재한다는 뜻이다. 게다가 셸은 13 라우트 공유라 "부분"이 성립하지 않는다 — 시안 1차에서 **이미 실패한 접근**이다(`COMMISSION.md:28` — 스코프를 라우트로 나눴더니 셸이 민트로 남아 본문과 충돌).

**접근 B — 토큰 우선 bottom-up** (토큰 값 → 셸 → 공유 원자 → 라우트 조판 순)

- 장점: `@theme inline`이 의미 토큰을 CSS 변수로 매핑하므로 **`:root` 값만 바꾸면 967개 토큰 클래스가 전부 따라온다**(실측: `bg|text|border|...-(base|surface|hi|mid|mint|...)` 967건 / 29파일). 페이지를 열지 않고 색을 일괄 전환할 수 있다. 각 단계가 토큰 차원에서 단일 상태를 유지해 검증이 명확하다.
- 단점: 토큰 스왑 직후 ~S3까지, 색은 새것인데 조판은 옛 카드형인 "과도기 화면"이 존재한다.
- 선례: 이 레포의 두 번의 리브랜드 모두 B를 썼고 완주했다(`2026-05-11-design-rebrand-dub.md:42-47` — *"방식 A는 grep 매트릭이 흐려지고 회귀 시점이 늦다. 폐기"*).

**선택: B.** 근거 — (1) A는 셸 공유 때문에 시안 1차에서 이미 실패가 증명됐다, (2) B의 유일한 단점인 과도기 화면은 `feat/redesign` worktree 안에서만 존재하고 main에는 노출되지 않는다, (3) 이 레포에서 두 번 검증된 절차라 미지의 위험이 가장 적다.

### 0.4 worktree 판정 — **권장한다**

`rules/git.md` HARD-GATE: 20개 이상 = 전체 설계 + worktree 격리 권장. 본 작업은 ~30 파일 + 토큰 1차 출처 교체 + 공개 시각 정체성 변경으로 **다중 상향 트리거**. 선행 plan 2건도 동일하게 `feat/redesign`을 썼다.

```bash
git worktree add ../taxback365-feat-redesign feat/redesign
cd ../taxback365-feat-redesign
npx tsc --noEmit && npm run lint    # 베이스라인 캡처
```

추가 근거: S2(토큰 값 스왑) 이후 앱 전체가 과도기 상태가 되어 **main에서 dev 서버를 띄운 채 다른 작업을 할 수 없게 된다.** worktree면 main 체크아웃이 그대로 살아 있어 "변경 전/후"를 두 포트에서 나란히 띄워 비교할 수 있다 — 테스트가 없는 이 프로젝트에서 이건 검증 수단 그 자체다.

### 0.5 검증 전략 개요

테스트가 0인 상태에서 회귀를 잡는 4중 그물. 상세는 §5.

1. **라우트 스모크** — 14개 URL 200 + 콘솔 에러 0 (스크립트, S0에서 도입)
2. **잔재 grep 게이트** — 선행 plan에서 검증된 방식. 단계마다 금지 패턴 0건
3. **CSS 변수 참조 대조** — tsx/css의 `var(--*)` vs 선언. 시안에서 실제로 터졌고 tsc·lint가 못 잡은 유형
4. **계산 특성화 테스트** — Vitest + `lib/tax-calculator.ts` 골든 케이스. 유일한 수치 안전망

---

## 1. 영향 파일 인벤토리

> 사용자 제공 표는 13 라우트만 담았다. **공유 컴포넌트 7종·OG 이미지·로고 2종이 누락돼 있어** 아래에 보강한다. 이들은 13 라우트 전부에 나타나므로 누락 시 셸 충돌이 재발한다(시안 1차 실패 원인).

### 1.1 토큰·인프라

| 파일 | 변경 | 설명 |
|---|---|---|
| `app/globals.css` | **전면 재작성** | `:root` v3 값 → 스위스. `mint`→`accent` 리네임. 신규 `scrim`/`accent-ink`/`alert`/`on-accent`. `--font-display`를 Inter로. 죽은 Dub 토큰 20종 제거 |
| `lib/design-tokens.ts` | 값 동기화 | **런타임 영향 0** — import하는 소스 파일이 하나도 없다(실측: 문서·plan에서만 언급). 규칙상 동기화 의무만 |
| `app/layout.tsx` | 부분 | Montserrat 로드 제거 검토(§3.3). `metadata.icons` 유지 |
| `DESIGN.md` | 재작성 | 디자인 1차 문서. 미갱신 시 다음 세션이 옛 팔레트를 되살린다 |

### 1.2 공유 컴포넌트 — **사용자 표 누락분**

| 파일 | v3 토큰 | 변경 | 비고 |
|---|---|---|---|
| `components/layout/Navigation.tsx` | 12 | 재작성 | 세션 타이머·모바일 탭바 로직 보존 (§3) |
| `components/layout/Footer.tsx` | 16 | 재작성 | 시안 `CommissionFooter` 이식 |
| `components/ui/Button.tsx` | 6 | 재작성 | `rounded-full` pill → 각진 면. `bg-mint text-ink` → accent |
| `components/ui/Card.tsx` | 7 | **역할 재정의** | 문서 조판은 카드를 기본 단위로 쓰지 않는다 (§3.4) |
| `components/ui/Input.tsx` | 8 | 재작성 | `border-edge-strong`(→#949494 컨트롤 경계)로 WCAG 1.4.11 충족 |
| `components/ui/Badge.tsx` | 6 | 재작성 | 알파 칩 → 사각 표식 + 텍스트 병행 |
| `components/ui/Tooltip.tsx` | 1 | 부분 | framer-motion 유지 |
| `components/common/Doc.tsx` | — | **신규** | 시안 `_components/Doc.tsx` 승격 (DocHead/DocSection/FieldFrame/DataRow/StatusMark/CTA_CLASS) |
| `components/layout/Brand.tsx` | — | **신규** | 로고 4곳 중복 제거의 단일 출처 |

### 1.3 라우트 13 + 메타

| 영역 | 라우트 | 줄수 | v3 토큰 | 변경 성격 |
|---|---|---|---|---|
| 공개 | `/` | 337 | 74 | 시안 이식 + **glow 4건·hard shadow 1건 삭제**(§2.5) |
| 공개 | `/login` | 175 | 35 | 시안 이식 + **실 `signIn` 배선**(시안은 더미) |
| 공개 | `/signup` | 278 | 36 | 시안 이식 + 실 배선 |
| 문서 | `/privacy` | 173 | 46 | 전면 조판 (저위험) |
| 문서 | `/terms` | 117 | 27 | 전면 조판 (저위험) |
| 문서 | `not-found` | 33 | 8 | 전면 조판 (저위험) |
| 게시판 | `/board` | 354 | 51 | 표 조판 |
| 게시판 | `/board/[id]` | 200 | 10 | 본문 조판 |
| 게시판 | `/board/write` | 234 | 46 | 폼 조판 |
| 게시판 | `/board/[id]/edit` | 281 | **23**(실측) | 폼 조판 — 사용자 표의 `?` 채움 |
| 앱 | `/dashboard` | 1,185 | 126(실측) | 카드→규칙선. `getUtilizationFill:217-222`가 토큰 문자열 반환(§2.6) |
| 앱 | `/admin/audit` | 209 | 19(실측) | 표 조판 |
| 앱 | **`/calculator`** | **4,792** | 217(실측) | **결정 게이트 §4.5** |
| 앱 | **`/admin`** | **4,250** | 258(실측) | **결정 게이트 §4.5** |
| 메타 | `app/opengraph-image.tsx` | — | — | **여전히 Dub 라이트 팔레트**(#F5F5F5/#0a0a0a/#404040) — v3 때 갱신 누락. 스위스와 이미 근접, accent만 추가 |
| 자산 | `public/logo.svg`, `logo-icon.svg` | — | — | ㅌ 자모 마크 → 시안 3막대 마크 |

> **실측 주의**: 사용자 제공 토큰 수와 내 grep 수가 다르다(정규식 범위 차이). 위 "실측" 표기는 `\b(bg|text|border|ring|outline|from|to|via|fill|stroke|divide|shadow|...)-(base|ink|surface|surface-2|surface-3|edge|edge-strong|hi|mid|dim|mint|mint-soft|rose|amber|sky)\b` 기준. **절대값이 아니라 상대 규모 판단에만 쓸 것.**

---

## 2. 토큰 전환 설계

### 2.1 핵심 레버리지 확인

`app/globals.css:149-238`의 `@theme inline`이 `--color-base: var(--color-base)` 형태로 의미 토큰을 노출한다. 컴포넌트는 `bg-base`/`text-hi`/`text-mint`만 쓰고 **하드코딩 hex는 calculator·admin 통틀어 0건**(두 하위 에이전트가 각각 grep으로 확인). 따라서 `:root` 값 교체만으로 967개 클래스가 전부 따라온다. 이것이 본 계획의 유일한 최대 레버리지다.

예외 4곳만 hex/rgba를 직접 쓴다 — `app/page.tsx:80,125,210,311`(§2.5), `app/opengraph-image.tsx`(satori 런타임이 CSS 변수를 못 씀 — 정당한 예외), `public/logo*.svg`, `app/globals.css` 정의부.

### 2.2 `:root` 값 매핑표

| 토큰 | v3 다크 | **새 스위스** | 대비(vs #FFFFFF) | 역할 |
|---|---|---|---|---|
| `base` | `#0b0c0f` | `#FFFFFF` | — | 지면 |
| `ink` | `#0b0c0f` | `#FFFFFF` | 4.80:1 (on accent) | **accent 면 위 텍스트 — 반드시 반전** |
| `surface` | `#14161b` | `#EDEDED` | 1.17:1 (vs base) | 판권면·얕은 면 |
| `surface-2` | `#1b1f27` | `#E4E4E4` | 1.27:1 | 표 합계 행 강조 |
| `surface-3` | `#232833` | `#DBDBDB` | ~1.38:1 ※제안 | 3단계 면 (희소 사용) |
| `edge` | `#23262e` | `#D4D4D4` | 1.48:1 | **행 구분 괘선**(장식선) |
| `edge-strong` | `#333844` | `#949494` | 3.03:1 | **폼 컨트롤 경계** — WCAG 1.4.11 충족 |
| `hi` | `#f4f6f9` | `#0A0A0A` | 19.80:1 | 본문·절 구획선·문서 경계선 |
| `mid` | `#a7aebc` | `#5F5F5F` | 6.39:1 | 보조 텍스트 |
| `dim` | `#6b7280` | `#767676` | 4.54:1 ※제안 | 3차 텍스트 (AA 하한) |
| `mint` → **`accent`** | `#35e4a4` | `#D92D33` | 4.80:1 | CTA 면·표식·포커스 링 |
| `mint-soft` → **`accent-ink`** | `#1e5c48` | `#C0242A` | 5.95:1 | 소형 accent 텍스트 전용 |
| `rose` | `#fb7185` | `#8C1D13` | 9.13:1 | alert (accent와 명도로 구분) |
| `amber` | `#fbbf24` | `#8A5A00` ※제안 | ~5.6:1 ※실측 필요 | 주의 |
| `sky` | `#60a5fa` | `#0B57D0` ※제안 | ~5.6:1 ※실측 필요 | 정보 |
| **`on-accent`** (신규) | — | `#FFFFFF` | 4.80:1 | accent 면 위 텍스트 |
| **`scrim`** (신규) | — | `rgba(10,10,10,0.5)` | — | **모달 백드롭 — §2.4 필수** |

> 대비값 출처: `#FFFFFF`/`#0A0A0A`/`#5F5F5F`/`#D92D33`/`#C0242A`/`#8C1D13`/`#EDEDED`/`#E4E4E4`/`#D4D4D4`/`#949494`는 `commission.css:41-58`에 **실측 기록된 값**. `dim`/`surface-3`/`amber`/`sky`는 내 **제안값이며 구현 시 실측 필수** — 짐작을 통과로 보고하지 않는다.

**규칙선 3단은 신규 토큰 없이 성립한다**: 문서 경계 = `border-b-2 border-hi` / 절 구획 = `border-t border-hi` / 행 구분 = `border-b border-edge`. 시안의 `--cx-rule-doc`·`--cx-rule-section`은 둘 다 `#0A0A0A`이므로 `hi`와 동일하고, `--cx-rule-row` `#D4D4D4`는 `edge`와 동일하다. **중복 토큰을 만들지 않는다** — 선 위계는 색이 아니라 `border-width`와 위치가 만든다.

### 2.3 `mint` 리네이밍 — **한다. 단 값 교체와 분리한다.**

**문제**: 205건(border 98 / bg 64 / text 43)의 토큰명이 값을 레드로 바꾸는 순간 거짓이 된다. 게다가 이름은 className 밖에도 있다 — `app/dashboard/page.tsx:217-222`의 `getUtilizationFill()`이 `"bg-mint"` 문자열을 **반환**한다. className만 훑는 grep으로는 안 잡힌다.

**왜 리네임하는가**: `rose`/`amber`/`sky`는 색상환 이름이고 새 값도 각각 적색계·황색계·청색계라 **이름이 계속 참이다**. `mint`만 거짓이 된다. 즉 리네임 대상은 `mint`·`mint-soft` 둘뿐이고, 나머지 126건은 손대지 않는다.

**어떻게 안전하게**: 205곳을 값 교체와 같은 커밋에서 바꾸면 리네임 오타와 팔레트 회귀가 뒤섞여 원인 분리가 불가능해진다. 그래서:

- **S1에서 이름만 바꾸고 값은 `#35e4a4` 그대로 둔다.** → 이 커밋은 **정의상 시각 변화 0**이다. 순수 식별자 치환이므로 "화면이 조금이라도 달라졌다면 리네임이 틀린 것"이라는 완전한 판정 기준이 생긴다.
- S2에서 값을 바꾼다. 이때 diff는 `globals.css` 한 파일이라 회귀 원인이 자명하다.

이 순서가 리네임을 **증명 가능한 no-op**으로 만든다. 반대 순서(값 먼저, 이름 나중)로는 이 증명이 불가능하다.

> 대안으로 검토한 "`accent`를 새로 추가하고 `mint`를 별칭으로 남긴다"는 **기각**한다 — `rules/donts.md`의 backwards-compatibility shim 금지에 정면으로 걸리고, 한 색에 두 이름이 영구히 남는다.

### 2.4 알파 106건 — 3분류. 하나는 기능 파손이다.

전부 "연해진다"는 미감 문제가 아니다. **`bg-base/70|80` 7곳은 실제로 깨진다.**

| 분류 | 대상 | 건수 | 처리 | 근거 |
|---|---|---|---|---|
| **① 파손** | `bg-base/80` 모달 백드롭 | `app/admin/page.tsx:2315, 2552, 2918, 3696, 4050, 4133` + `app/dashboard/page.tsx:1056` = **7** | **`bg-scrim`으로 교체 필수** | `base`가 흰색이 되면 백드롭이 "흰 80%"가 된다. 흰 모달이 흰 스크림 위에 뜨면 **경계가 사라져 판독 불가.** tsc·lint·빌드 전부 통과한다 |
| **② 색조 채움** | `bg-amber/12`(계산기 10 + 어드민 14), `bg-mint/8`·`/12`, `bg-sky/8`, `bg-rose/8`, hover `/20` | ~50 | 패턴 단위 일괄 조정 후 **대비 실측** | 문자열이 100% 동일해 안전한 일괄 치환. 계산기는 `/12`·`/30` **딱 2종**, 어드민은 `/8`(행)·`/12`(칩)·`/20`(hover) 규약이 **이미 일관** |
| **③ 포커스 링** | `ring-mint/30` (계산기 47 + 어드민 22 + Input 2) | ~71 | **제거하고 전역 outline에 위임** | `globals.css:279-282`에 이미 `:focus-visible { outline: 2px solid var(--color-mint) }` 전역 규칙이 있다. `ring-*/30`은 중복이고, 30% 적색 링은 흰 배경에서 3:1 미달이라 오히려 접근성 후퇴다 |

③은 별도 편집이 아니라 **컴포넌트 추출의 부산물로 소멸시킨다** — 계산기 46개 input이 122자 동일 문자열이므로 컴포넌트화하면 47곳이 1곳이 된다(§4.2).

### 2.5 shadow 17건 + backdrop-blur 3건 — 예상보다 훨씬 작다

**shadow**: `globals.css:137-146`의 정의 7종은 **이미 라이트 튜닝돼 있다**(`rgba(0,0,0,0.05)` / `0.1` / `0.09` — Dub 시절 값이 v3에서 갱신되지 않은 채 남았다). 즉 다크 전제가 아니다. 다크 전제 그림자는 `lib/design-tokens.ts:65-70`에만 있고 **그 파일은 아무 데서도 import되지 않는다.** 실제 손볼 것은 단 1곳:

- `app/page.tsx:125` — `shadow-[0_28px_70px_-24px_rgba(0,0,0,0.75)]` 인라인. 다크 전용. **삭제**(재조정 아님 — 문서 조판에 드롭섀도우는 없다).

**glow (표에 없던 항목)**: `app/page.tsx:80, 210, 311` — `radial-gradient(circle, rgba(53,228,164,0.18), transparent 70%)` 민트 글로우 3건. 흰 배경에서 의미가 없고 문서 조판과 충돌. **삭제**.

**backdrop-blur 3건**: `components/layout/Navigation.tsx:106`, `app/dashboard/page.tsx:1056`, (나머지 1건은 문서). 시안 근거(`COMMISSION.md:163`)대로 **불투명으로 전환** — sticky nav가 반투명이면 본문이 밑으로 지나갈 때 셸 면색이 흔들려 "구분된 면"이라는 목적 자체가 깨진다.

### 2.6 className 밖의 토큰 — grep 사각지대

토큰 문자열이 TS 값으로 존재하는 곳. className grep으로 안 잡히므로 **별도 체크 항목**으로 둔다.

- `app/dashboard/page.tsx:217-222` `getUtilizationFill()` → `"bg-mint"` / `"bg-amber"` 반환
- `components/ui/Button.tsx:21-36` `variantClass` 맵
- `components/ui/Card.tsx:21-29` `variantClass` 맵
- `components/ui/Input.tsx:13-14, 37-39` `baseField` / `fieldBorder`
- `app/calculator/page.tsx` `clsx()` 분기 내 문자열 (예: `:907` `"bg-amber/12 border border-amber/30 text-amber"`)
- `app/admin/page.tsx` `clsx()` 34회

### 2.7 계산기의 비토큰 색 45건 (표에 없던 항목)

`app/calculator/page.tsx`에 Tailwind 기본 팔레트가 직접 쓰여 있다 — `text-blue-600` **28건**, `text-green-600` **12건**, `text-red-500` **5건**. hex가 아니라 design-lint를 통과했지만 **토큰 체계 밖**이다. 의미는 공제액 강조 / 고공제율 / 한도초과 경고.

→ S2에서 `text-accent` / `text-amber` / `text-rose`로 매핑. `sed` 3회 수준이고, 매핑하지 않으면 흰 배경에 파란 글씨가 남아 스위스 팔레트가 깨진다.

---

## 3. 셸 통합 설계

### 3.1 무엇을 버리고 무엇을 올리나

시안의 셸은 **격리 전제 위에 서 있다.** `commission.css:258-276`이 `body:has(.cx-r1)`로 기존 nav/footer를 숨기고 `main`의 제약을 푼다. 이식하면 이 해킹은 **전부 삭제** 대상이다 — 격리가 끝나면 존재 이유가 사라진다.

| 시안 | → | 이식 대상 | 처리 |
|---|---|---|---|
| `_components/Brand.tsx` | → | `components/layout/Brand.tsx` | `R1` 상수 → `/`. `var(--cx-fg)` → `text-hi`, `var(--cx-accent)` → `text-accent` |
| `_components/CommissionNav.tsx` | → | `components/layout/Navigation.tsx` **병합** | 서버 컴포넌트 → **client 유지 필수**(§3.2) |
| `_components/CommissionFooter.tsx` | → | `components/layout/Footer.tsx` | 거의 그대로. 링크 `R1` → 실 라우트 |
| `_components/Doc.tsx` | → | `components/common/Doc.tsx` | 조판 공용 부품. `rules/design.md`의 "3회+ 반복 시 `components/common/` 추출"에 정확히 부합 |
| `commission.css` 셸 은닉 블록 | → | — | **삭제** |
| `layout.tsx`의 `fixed inset-0 -z-10` 배경 레이어 | → | — | **삭제**. root layout 무수정 조건의 우회책이었고 이제 root를 직접 고칠 수 있다 |
| `.cx-*` 변수 전량 | → | `globals.css` `:root` | §2.2 매핑으로 흡수 |

### 3.2 Nav 동작 차이 보존 — 가장 놓치기 쉬운 지점

시안 `CommissionNav`는 **서버 컴포넌트**다(`CommissionNav.tsx:8-11` — *"인증이 더미라 useSession이 필요 없고, 3페이지뿐이라 usePathname 활성 표시도 필요 없다"*). 실 `Navigation.tsx`는 그 반대다. 이식은 **조판만 가져오고 로직은 전부 남긴다.**

보존해야 할 것 (`Navigation.tsx` 실측):

| 기능 | 위치 | 보존 방법 |
|---|---|---|
| 30분 세션 타임아웃 + 카운트다운 + 자동 `signOut` | `:17, :47-71` | **손대지 않는다.** UI는 `mm:ss` mono 표시만 재조판 |
| `isLanding` / `isAuthPage` 분기 | `:43-45` | 유지. 시안은 공개 3면만이라 이 분기가 없다 |
| 데스크톱 앱 내비 4종(대시보드/계산기/기초자료/게시판) | `:81-102, :120-140` | 유지. **시안에는 아예 없다**(공개 페이지에 앱 내비를 두면 거짓말이라는 판단) → 인증 후 화면용으로 되살려야 함 |
| active 밑줄 표식 | `:131` `after:bg-mint` | `after:bg-accent` + 문서 조판에선 2px 검정 괘선이 더 맞음 — 디자인 판단 필요 |
| 세션 UI (이름/타이머/아바타/로그아웃) | `:143-181` | 유지 |
| 비로그인 CTA (로그인/회원가입) | `:182-197` | 시안 `CommissionNav:28-41` 조판 채택 (pill → 각진 accent 면) |
| **모바일 하단 탭바** | `:203-253` | 유지. `showMobileNav = !isLanding && !isAuthPage` |
| 탭바 자리 확보 `pb-24 md:pb-0` | `app/layout.tsx:96` | 유지 — 시안은 이걸 `commission.css:267`에서 상쇄했었다 |

> **핵심**: 시안 셸은 "인증 전 공개 페이지"만 상정했다. 앱 셸(인증 후)의 조판은 **시안에 존재하지 않으므로 이번에 새로 설계해야 한다.** 이걸 "이식"으로 착각하면 앱 내비가 통째로 사라진다.

### 3.3 폰트

시안은 `.cx-display`를 `--font-body`(Inter)로 되돌렸다(`commission.css:22-30`) — Montserrat가 `weight:["500","600"]`만 로드돼 상한 600이고, 스위스 그리드는 800이 필요하기 때문. 전역 이식 시:

- `globals.css`의 `--font-display`를 **Inter 스택으로 변경**. `app/layout.tsx:9-13`의 `Inter()`는 weight 미지정 = 가변 폰트라 800이 이미 로드돼 있다. **추가 로드 비용 0.**
- 그러면 `app/layout.tsx:15-20`의 `Montserrat` 로드가 완전 무용해진다 → **제거**하면 폰트 요청 1건 감소.
- ⚠️ 제거 전 `--font-montserrat-loaded` / `font-display` 참조를 전수 확인할 것. 남은 참조가 있으면 fallback 체인으로 조용히 떨어진다.

### 3.4 `Card`의 처지 — 명시적 결정 필요

문서 조판은 **카드를 기본 단위로 쓰지 않는다**(`commission.css:10-12`). 그런데 `components/ui/Card.tsx`는 4 variant 전부가 `rounded-xl`/`rounded-2xl` + `bg-surface` + `border`다. 세 갈래:

- (a) `Card`를 남기고 variant를 각진 규칙선으로 재정의 — 호출처 무수정. 이름이 반쯤 거짓.
- (b) `Card` 삭제하고 `Doc.tsx`의 `DocSection`/`FieldFrame`으로 전량 대체 — 가장 정합적. 호출처 전수 수정.
- (c) 둘 다 두고 신규만 `Doc` 사용 — 어휘 이원화 고착.

**권장 (a)** — 이번 마이그레이션에서는 `Card`를 각진 규칙선 컨테이너로 재정의하고 이름은 유지. 이유: (b)는 호출처 전수 수정이라 조판 작업과 뒤섞여 diff가 커지고, 이번 목표는 시각 교체지 API 정리가 아니다. `Doc`는 신규 조판에 쓰고, `Card` 제거는 후속 PR로 분리. **단 이건 트레이드오프이지 정답이 아니므로 사용자 확인 대상(D-gate 2).**

### 3.5 로고 4곳 중복 제거

현재 `LogoMark`가 4곳에 통째로 복붙 — `components/layout/Navigation.tsx:20-38`, `components/layout/Footer.tsx:3-21`, `app/login/page.tsx`, `app/signup/page.tsx`. 여기에 `public/logo.svg`·`public/logo-icon.svg`(같은 ㅌ 자모, `#0a0a0a` 하드코딩)까지 6곳이 같은 마크를 각자 들고 있다.

→ `components/layout/Brand.tsx` 단일 출처(`BrandMark` + `BrandLockup`)로 통합하고 4곳 인라인 삭제. `public/*.svg` 2개는 파비콘·OG용이라 인라인 컴포넌트로 대체 불가 — 새 3막대 마크로 **파일 자체를 교체**하되, `Brand.tsx`와 형상이 일치하는지 육안 대조를 체크리스트에 넣는다(시안 §5-B가 기록한 유형의 조용한 불일치 방지).

---

## 4. calculator · admin 전략

### 4.1 질문 1 — 로직과 UI가 얼마나 얽혀 있나 (파일 실독 결과)

**`/admin` (4,250줄): 로직 2,230 / JSX 1,967 — 거의 반반.** 최상위 선언 5개뿐이고 사실상 **단일 컴포넌트 4,196줄**(`:55-4250`). `useState` 34개, `useEffect` 1개, `useMemo`/`useCallback` **0개**.

**`/calculator` (4,792줄): 경계가 놀랍도록 깨끗하다.** `:1-536`이 순수 로직(React 무관), `:538`부터 컴포넌트. `calculateTax`(`:38-446`, 409줄)는 **클로저 참조 0, 훅 호출 0, 부작용 0**인 완전 독립 함수다.

**그런데 진짜 로직은 그 경계 밖에도 있다.** JSX 3,910줄 안에 **IIFE 11곳 ≈ 640줄의 계산 로직**이 박혀 있다:

| 위치 | 내용 |
|---|---|
| `:1743-1963`, `:1971-2054`, `:2058-2108`, `:2114-2176` | 카드 25% 순차 소진 계산을 **4벌 독립 재구현** |
| `:2308-2476`, `:2484-2552`, `:2556-2577` | 의료비 3벌 |
| `:3517-3945`, `:3953-4045` | 기부금 2벌 |
| `:4542-4594` | **총환급액 — 유일한 구현체** |

즉 카드 공제는 `calculateTax` 포함 **5번**, 의료비 **4번**, 기부금 **3번** 구현되어 있다.

### 4.2 질문 2 — 로직 보존하며 UI만 교체하는 경로가 있나

**admin: 있다. JSX만 교체 가능하다 — 단 조건부.**
- 데이터 계층 7개 호출 중 Supabase 직접 호출 **0건**(전부 API route 뒤). `loadAdminData`/`saveAdminData`는 이미 `lib/tax-store.ts`에 있다.
- 그러나 `lib/`로의 **추가 추출은 순수 리팩토링이 아니다**: `processCardExcelFile`(989줄) 내부의 `checkBizStatus`/`checkPharmacyApi`/`checkHospitalApi`/`checkMarketApi`가 상위 `parsedData`를 **직접 mutate**하고(`:1408, :1549, :1638`) 동시에 React setter를 호출한다(`:1429, :1502, :1574, :1688`). 데이터 처리와 UI 알림이 한 함수에 얽혀 있다.
- **JSX에 세법 규칙이 박혀 있다** — `:2429-2474`의 `<option disabled={...reduce(...) > 70000000}>` 총급여 7천만원 한도 판정이 대표. `:3920-3985` 카테고리 합계 7종, `:2825-2845` 중복 dedup.
- 결론: **추출 선행 없이 JSX 교체 가능하되, 위 로직 블록을 "읽기 전용 구역"으로 명시 표시**해야 한다.

**calculator: "UI만 교체"가 구조적으로 가능하지만, 안전한 순서가 강제된다.**

핵심 발견 3가지:

1. **`calculateTax`는 이미 `lib/`에 있다.** `lib/tax-calculator.ts:89-395`가 `page.tsx:38-446`과 정규화 후 바이트 비교 시 **로컬 변수 하나 차이**(9,247자 중)로 동일하다. 그런데 calculator 페이지는 **lib을 import하지 않고 자기 사본을 쓴다.** lib을 쓰는 건 `app/dashboard/page.tsx:46` 하나뿐. 즉 409줄이 이미 중복 상태다.

2. **⚠️ `calculateTax`와 JSX 인라인 계산이 실제로 다른 답을 낸다 — 6건.**

| # | 항목 | `calculateTax` | JSX 인라인 |
|---|---|---|---|
| D1 | 의료비 배분 | `:203-217` **비례 배분** | `:2325-2374` **공제율 높은순 순차 소진** — 알고리즘 자체가 다름 |
| D2 | 기부금 한도 기준 | `:304,316,326` `earnedIncome`(근로소득금액) | `:3566,3577,3588` `inputs.salary`(총급여) |
| D3 | 주택임차차입금 | `:149` `min(payment*0.4, 400만)` | `:2933-2936` `min(payment, 400만)*0.4` |
| D4 | 장기주택저당차입금 | `:151` `min(interest, 1,800만)` | `:2937, :2967, :3009` **캡 없음** |
| D5 | 문화체육 공제 | `:125-126` `salary <= 7천만` 조건부 | `:1815-1817` **무조건** 30% |
| D6 | 25% 문턱 | `:76` `salary*0.25` | `:1744` `Math.round(salary*0.25)` |

3. **`result.refund`는 화면 어디에서도 안 쓰인다.** 실제 표시되는 "예상 환급액"은 `:4544-4551`에서 **반대 부호로 재계산**되고 지방소득세(`inputs.localIncomeTax` — `calculateTax`가 아예 모르는 필드)를 합산한다. **최종 환급액 계산은 JSX에만 존재한다. JSX를 갈아엎으면 이 8줄이 같이 사라진다.**

→ 따라서 calculator는 "JSX만 교체 가능한가"의 답이 **"표면은 가능, 구조는 불가"**다. 상세는 §4.5.

### 4.3 질문 3 — 팔레트만 바꾸고 조판 유지하는 선택지의 실익

**사용자 결정(전체 조판 재설계)을 뒤집자는 게 아니라, 두 파일에 한해 비용·위험·이득을 명시한다.**

**admin의 경우 — 조판 재설계의 사용자 가치가 사실상 없다.**
- 이 화면의 사용자는 `lib/admin.ts:isAdmin(email)` 통과자, 즉 **극소수 내부 인원**. `middleware.ts:12-38`이 그 외 전원을 차단한다. 공개 화면이 아니다.
- 이 화면의 실제 병목은 미감이 아니라 **입력 노동**이다(12개월×10필드, 39옵션 드롭다운, 카드사 엑셀 파싱). 그래서 이미 일괄복사·OCR·엑셀 업로드가 붙어 있다. 여백과 활자를 바꿔도 이 병목은 그대로다.
- 팔레트 교체 비용은 **`globals.css` 13줄 + `rose` 이중 의미 정리 2줄**. 하드코딩 색 0건이라 page.tsx를 한 줄도 안 건드린다.

**calculator의 경우 — 팔레트만 바꿔도 45줄, 조판 재설계는 3,910줄 재작성.**
- 팔레트: `text-blue-600`(28) → `text-accent`, `text-green-600`(12) → `text-amber`, `text-red-500`(5) → `text-rose`. 그 외는 CSS 변수 경유라 자동.
- 조판: JSX 3,910줄 중 순수 마크업은 ~3,270줄, 나머지 640줄은 IIFE 로직이라 **재설계와 무관하게 어딘가로 옮겨야 한다.** 그런데 옮길 곳(`lib/tax-calculator.ts`)과 **6곳에서 답이 다르다**(D1~D6). "IIFE를 지우고 `calculateTax` 결과를 쓴다"는 순진한 이주는 **화면 숫자를 바꾼다.** 어느 쪽이 세법상 맞는지는 UI 작업이 아니라 도메인 판정이다.

**그러나 "팔레트만"의 이득도 정직하게 말하면 제한적이다.** 색만 바뀌고 46개 동일 input 반복, 10+10 패널 반복, 913줄 기부금 섹션, D1~D6 불일치가 전부 남는다. 스위스 그리드의 정수는 색이 아니라 **조판**이므로, 팔레트만으로는 "새 디자인"이라 부르기 어렵다.

→ 그래서 §4.5에서 **제3의 경로**를 권한다.

### 4.4 질문 4 — 테스트 0 상태에서 회귀를 어떻게 막나

§5 전체가 이 답이다. 두 파일에 한정한 요지:

- **admin**: 인증이 파일 밖 3중 방어(`middleware.ts:12-38` / `app/admin/layout.tsx:16-29` / `app/api/admin-data/route.ts:18-19,55-56`)에 있어 **page.tsx를 통째로 다시 써도 인증은 무사하다.** 유일한 안심 요소. 위험은 저장되는 숫자이므로 안전망은 "저장 전/후 `admin_data` payload 동일성" 수동 확인.
- **calculator**: `lib/tax-calculator.ts`에 **Vitest 특성화 테스트**를 붙이면 409줄 중 핵심 수식이 pin된다. 하지만 IIFE 640줄과 총환급액 8줄(`:4544-4551`)은 DOM에만 존재하므로 **단위 테스트로 못 잡는다.** 이 부분을 잡으려면 Playwright로 "입력 → 화면 숫자" 스냅샷이 필요하다. **즉 calculator 구조 재설계의 전제는 Playwright 도입이다.**

### 4.5 권장안

두 파일을 **"표면 조판(chrome-level)"** 과 **"구조 조판(structural)"** 으로 나눈다.

**표면 조판** = 반복되는 동일 문자열만 문서 언어로 교체. JSX 구조·로직 무변경.
- calculator: input 46곳(122자 **완전 동일 문자열**) + "계산식" 패널 10곳(`bg-surface-2 p-4 border border-edge rounded-md`) + "합계" 패널 10곳(`bg-amber/12 p-4 border border-amber/30 rounded-md`) + 비토큰 색 45 = **~111곳의 기계적 치환**
- admin: input className 22회 복붙 + 모달 셸 6개 + 섹션 헤더 3개 + `translate-x-[Npx]` 눌림 효과 46회 제거

이것만으로 각진 경계·규칙선·mono 우측정렬 숫자·accent 표식이 들어와 **시각적 변화의 대부분을 얻는다.** 문자열이 100% 동일해 일괄 치환이 안전하고, 로직 라인을 건드리지 않는다.

| | 표면 조판 | 구조 조판 |
|---|---|---|
| calculator 변경량 | ~111곳 치환 | 3,910줄 재작성 + 640줄 로직 이주 |
| admin 변경량 | ~77곳 치환 | 1,967줄 재작성 |
| 숫자 회귀 위험 | 없음 (로직 무접촉) | **높음** (D1~D6, 총환급액 소실) |
| 얻는 시각 변화 | 대부분 | 전부 |
| 전제 조건 | 없음 | Playwright + D1~D6 도메인 판정 |

**권장: 이번 마이그레이션은 두 파일 모두 표면 조판까지. 구조 조판은 후속 plan으로 분리.**

후속의 순서는 강제된다 (건너뛰면 세금 계산 회귀와 레이아웃 회귀가 같은 커밋에 섞여 원인 분리가 불가능해진다):
1. Vitest 도입 + `lib/tax-calculator.ts` 특성화 테스트
2. **D1~D6 도메인 판정** — 각 항목의 세법상 정답 확정 (개발 판단 아님, 사용자/세무 확인 필요)
3. IIFE 640줄 → `lib/` 단일화, 총환급액 8줄 포함
4. Playwright 도입 → 입력·화면숫자 스냅샷
5. 그 다음에야 구조 조판. 이 시점 JSX는 ~3,270줄 순수 마크업이라 위험이 "숫자가 틀릴 위험"에서 "레이아웃이 깨질 위험"으로 격하된다

**admin은 구조 조판을 권하지 않는다** (내부 도구, 사용자 극소수, 병목이 미감이 아님). 대신 중간 경로로 **모달 6개를 순수 cut-paste로 분리**(마크업 무변경, 파일만 분할)하면 4,250 → ~1,300줄이 되어 이후 어떤 변경도 350줄 단위에서 리뷰·롤백된다. 이건 조판 작업이 아니라 정리 작업이라 위험이 낮다.

---

## 5. 검증 전략 (테스트 0 상태의 안전망)

### 5.1 S0에서 먼저 만든다 — 시각 변경 착수 전

**V1. 라우트 스모크 스크립트** `scripts/smoke-routes.mjs`
- `next build && next start` → 14 URL(13 라우트 + `/opengraph-image`) fetch
- 판정: HTTP 200 + 본문에 `Application error` / `This page could not be found` 부재
- 의존성 0(Node 내장 fetch), ~40줄. **모든 단계 종료 게이트로 재사용**

**V2. 계산 특성화 테스트** — Vitest 도입 + `lib/tax-calculator.ts` 골든 케이스 6~10건
- 현재 출력을 **그대로 고정**한다(정답을 판정하지 않는다 — 그건 D1~D6 후속 작업)
- 이유: 이 파일은 calculator 페이지 사본과 바이트 동일하므로, 이 테스트가 곧 계산기 수식의 pin이다
- 없으면 §4.5의 후속 1~5단계 전체를 시작할 수 없다

**V3. 수동 회귀 체크리스트** `.claude/plans/checklists/redesign-manual.md`
- 13 라우트 × 상태 조합. 최소: 비로그인/로그인 각각의 nav, 모바일 390px 탭바, 모달 6개 개폐, 계산기 동일 입력 1케이스, 게시판 작성/수정, admin 저장
- 단계마다 관련 항목만 체크 (전량 재수행 아님)

### 5.2 단계마다 자동 실행

**V4. 잔재 grep 게이트** `scripts/token-audit.mjs` — 선행 plan에서 검증된 방식
```
금지: --color-base:\s*#0b0c0f | bg-base/(70|80) | backdrop-blur
      text-(blue|green|red)-\d00 | radial-gradient | \bmint\b (S1 이후)
      shadow-\[.*rgba\(0,\s*0,\s*0,\s*0\.7
```

**V5. CSS 변수 참조 대조** `scripts/css-var-check.mjs` — **본 계획 고유의 필수 항목**
- tsx·css 전체의 `var(--...)` 참조를 수집해 `globals.css` 선언과 대조 → **미정의 0건**
- 근거: 시안에서 `--cx-brand-google-*` 4종이 CSS 재작성 중 유실돼 Google 로고가 검정 폴백된 회귀가 실제로 발생했다. `COMMISSION.md:182` — *"타입체크·린트·static-check 어디에도 걸리지 않는 유형이다."* 토큰 전면 재작성을 하는 본 계획에서 **가장 재발 가능성 높은 회귀**

**V6. 대비 실측** `scripts/contrast-check.mjs`
- `globals.css` `:root`에서 색 쌍을 읽어 WCAG 상대휘도 계산 → 본문 4.5:1 / 대형·그래픽·UI 3:1 판정
- §2.2의 ※제안값(`dim`/`surface-3`/`amber`/`sky`)은 이 스크립트 통과 전까지 미확정

### 5.3 Playwright 도입 여부 — **이번 범위에서는 도입하지 않는다**

- 표면 조판까지는 로직 무접촉이라 DOM 스냅샷의 한계효용이 낮고, V1+V3로 커버된다
- 도입 시점은 §4.5 후속 4단계 — calculator **구조** 조판 직전. 그때는 필수다(IIFE 640줄과 총환급액 8줄이 DOM에만 존재)
- 지금 도입하면 스위스 조판이 확정되기 전 스냅샷을 찍게 되어 전량 폐기된다

### 5.4 단계 종료 게이트 (공통)

모든 단계는 아래를 전부 통과해야 닫힌다. 하나라도 미측정이면 **미측정으로 보고한다**(시안 §4의 원칙 — *"미측정 3건을 통과로 보고하지 않는다"*).

```
npx tsc --noEmit          → 0
npm run lint              → 0
npm run build             → exit 0
node scripts/smoke-routes.mjs   → 14/14 200
node scripts/token-audit.mjs    → 위반 0
node scripts/css-var-check.mjs  → 미정의 0
npx vitest run            → pass (S0 이후)
```

---

## 6. 단계 분해

> 각 단계는 **독립 검증 가능 + 단일 revert 가능**. 단계 = 1 커밋 또는 1 PR 단위.

### S0 — 안전망 구축 (시각 변경 0)

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T1 | worktree 생성 + 베이스라인 캡처 | — | `tsc` 0 / `lint` 0 기록 | 없음 |
| T2 | `scripts/smoke-routes.mjs` 작성 | 신규 1 | 현재 main에서 14/14 200 | T1 |
| T3 | Vitest 설치 + 설정 | `package.json`, `vitest.config.ts` | `npx vitest run` 실행됨 | T1 |
| T4 | `lib/tax-calculator.ts` 특성화 테스트 6~10건 | `lib/__tests__/tax-calculator.test.ts` 신규 | 전건 pass (현재 출력 고정) | T3 |
| T5 | `scripts/token-audit.mjs` + `css-var-check.mjs` + `contrast-check.mjs` | 신규 3 | 현재 코드에서 실행됨 | T1 |
| T6 | 수동 체크리스트 작성 | `.claude/plans/checklists/redesign-manual.md` | 13 라우트 × 상태 열거 | T1 |

**완료 기준**: 시각 변화 0. `git diff` 전량이 신규 파일 + `package.json`. **규모: 신규 7 파일.**

### S1 — `mint` → `accent` 리네임 (값 불변 = 시각 변화 0)

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T7 | `globals.css`에서 `--color-mint`→`--color-accent`, `--color-mint-soft`→`--color-accent-ink` (값은 `#35e4a4`/`#1e5c48` **유지**) | `app/globals.css` | `tsc` 0 | S0 |
| T8 | className 205곳 일괄 치환 | 19 파일 | `token-audit` `\bmint\b` 0건 | T7 |
| T9 | className 밖 토큰 문자열 (§2.6 6곳) | `dashboard:217-222`, `ui/*` 4, calculator·admin `clsx` | grep `"bg-mint"` 등 0건 | T8 |
| T10 | `lib/design-tokens.ts` 키 리네임 | 1 | `tsc` 0 | T7 |

**완료 기준**: **화면이 픽셀 단위로 동일해야 한다.** 달라졌다면 리네임이 틀린 것. `css-var-check` 미정의 0. **규모: ~21 파일, 순수 식별자 치환.**

### S2 — 토큰 값 스왑 (앱 전체가 백지로 전환되는 지점)

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T11 | `:root` 값 §2.2 매핑표대로 교체 + 신규 `scrim`/`on-accent` 선언 + 죽은 Dub 토큰 20종 제거 | `app/globals.css` | `contrast-check` 전건 통과 | S1 |
| T12 | `@theme inline` 신규 토큰 노출 | `app/globals.css` | `css-var-check` 0 | T11 |
| T13 | **스크림 7곳** `bg-base/80|70` → `bg-scrim` | `admin` 6곳, `dashboard:1056` | 모달 6개 육안 개폐 — 백드롭 판독 가능 | T12 |
| T14 | `backdrop-blur` 3곳 제거 | `Navigation:106`, `dashboard:1056` | grep 0 | T12 |
| T15 | `app/page.tsx` glow 3 + hard shadow 1 **삭제** | `page.tsx:80,125,210,311` | grep `radial-gradient` 0 | T12 |
| T16 | calculator 비토큰 색 45건 매핑 | `calculator/page.tsx` | grep `text-(blue\|green\|red)-\d00` 0 | T12 |
| T17 | admin `rose` 이중 의미 정리 (문화체육 vs 공제제외) | `admin:3871, 3891` | 두 의미가 다른 토큰 | T12 |
| T18 | 알파 색조 채움 재조정 (§2.4 ②) | calculator 20곳, admin ~30곳 | `contrast-check` | T12 |
| T19 | `lib/design-tokens.ts` 값 동기화 | 1 | `tsc` 0 | T11 |

**완료 기준**: 13 라우트 전부 백지 + 흑자 + 적색 accent. 조판은 아직 옛 카드형(**의도된 과도기**). 스모크 14/14. 수동 체크리스트 중 "모달 판독"·"대비" 항목 통과. **규모: ~10 파일, 대부분 `globals.css` 집중.**

> 이 단계가 사용자에게 **첫 시각 확인 지점**이다. 여기서 팔레트를 확정하고 다음으로 간다.

### S3 — 셸 통합 (13 라우트 전부 영향)

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T20 | `components/layout/Brand.tsx` 신규 (시안 `Brand.tsx` 승격) | 신규 1 | `tsc` 0 | S2 |
| T21 | 로고 인라인 4곳 삭제 → `Brand` 사용 | `Navigation`, `Footer`, `login`, `signup` | grep `LogoMark` 0 | T20 |
| T22 | `public/logo.svg`·`logo-icon.svg` 새 마크로 교체 | 2 | 16/32/96/192px 육안 + `Brand.tsx`와 형상 일치 | T20 |
| T23 | `components/common/Doc.tsx` 신규 (시안 `Doc.tsx` 승격, `--cx-*`→앱 토큰) | 신규 1 | `tsc` 0 | S2 |
| T24 | `Footer.tsx` 재작성 (시안 `CommissionFooter` 조판) | 1 | 링크 5종 정상 | T20, T23 |
| T25 | `Navigation.tsx` 재작성 — **§3.2 보존 목록 전건 유지** | 1 | 세션 타이머 동작 / 앱 내비 4종 / 모바일 탭바 / `isLanding`·`isAuthPage` 분기 | T20, T23 |
| T26 | `app/layout.tsx` — Montserrat 제거 검토 + `--font-display` Inter 전환 | `layout.tsx`, `globals.css` | `font-display` 참조 전수 확인 후 진행 | T25 |

**완료 기준**: 13 라우트 전부에서 새 셸. 세션 30분 카운트다운 실동작 확인. 390px 탭바 확인. **규모: ~8 파일. 위험도 상위 — 전 라우트 영향.**

### S4 — 공유 원자 재조판

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T27 | `Button.tsx` — pill → 각진 accent 면 (`Doc.tsx`의 `CTA_CLASS`/`GHOST_CLASS` 정합) | 1 | 호출처 시각 확인 | S3 |
| T28 | `Input.tsx` — `border-edge-strong`(#949494) 컨트롤 경계, `ring-*/30` 제거 | 1 | 포커스 링이 전역 outline으로 표시 | S3 |
| T29 | `Badge.tsx` — 알파 칩 → 사각 표식 + 텍스트 병행 (색만으로 의미 전달 금지) | 1 | 색맹 시뮬레이션 육안 | S3 |
| T30 | `Card.tsx` — §3.4 (a) 각진 규칙선 컨테이너로 재정의 | 1 | 호출처 무수정 동작 | S3 |
| T31 | `Tooltip.tsx` 토큰 정합 | 1 | — | S3 |

**완료 기준**: 5 원자가 문서 언어. 호출처 무수정. **규모: 5 파일.**

### S5 — 문서군 (가장 싼 전면 조판 — 언어 검증용)

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T32 | `not-found.tsx` 전면 조판 (33줄) | 1 | 404 육안 | S4 |
| T33 | `/terms` 전면 조판 (117줄) | 1 | 육안 | S4 |
| T34 | `/privacy` 전면 조판 (173줄) | 1 | 육안 | S4 |

**완료 기준**: 세 라우트가 시안과 같은 조판 언어. **여기서 언어가 실 콘텐츠에 통하는지 확인하고, 안 통하면 S6 이전에 되돌린다.** **규모: 3 파일, 총 323줄.**

### S6 — 공개 3면 이식 (시안 정본)

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T35 | **D-gate 1 해소** (§7) — `diagnose()` 가정 계수·미검증 후기/스탯 처리 결정 | — | 사용자 결정 기록 | S5 |
| T36 | `/` 랜딩 이식 | `app/page.tsx` | 스모크 + 육안 | T35 |
| T37 | `/login` 이식 + **실 `signIn` 배선** (시안은 더미) | `app/login/page.tsx` | Google OAuth 실 로그인 성공 | S5 |
| T38 | `/signup` 이식 + 실 배선 | `app/signup/page.tsx` | 실 가입 성공 | S5 |
| T39 | 시안 폴더 처리 결정 (삭제 or `COMMISSION.md`만 보존) | `app/commissioned/**` | 라우트 목록에서 제거 확인 | T36-38 |

**완료 기준**: 공개 3면이 시안과 동등. **인증이 더미가 아니라 실동작.** **규모: ~5 파일.**

> ⚠️ T37/T38은 조판 이식이 아니라 **기능 구현**이다. 시안의 인증은 `signIn` 호출 0건에 700ms 후 무조건 성공(`COMMISSION.md:203`). 잘못된 자격증명·중복 이메일·레이트리밋을 인라인 에러로 매핑해야 한다. 이 태스크만 별도 하위 분해가 필요할 수 있다.

### S7 — 게시판 4면

| # | 태스크 | 파일 | 규모 | 의존 |
|---|---|---|---|---|
| T40 | `/board` 목록 → 문서 표 조판 | 1 | 354줄 | S5 |
| T41 | `/board/[id]` 본문 조판 | 1 | 200줄 | S5 |
| T42 | `/board/write` 폼 조판 | 1 | 234줄 | S5 |
| T43 | `/board/[id]/edit` 폼 조판 | 1 | 281줄 | T42 |

**완료 기준**: 작성→조회→수정→삭제 왕복 동작. **규모: 4 파일.**

### S8 — dashboard

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T44 | KPI/추천 카드 → 규칙선 + mono 우측정렬 | `dashboard/page.tsx` | 육안 + 숫자 동일 | S5 |
| T45 | `getUtilizationFill:217-222` 토큰 정합 확인 | 동 | 4 분기 색 확인 | T44 |
| T46 | 뉴스/AI 추천 영역 조판 | 동 | fetch 정상 | T44 |

**완료 기준**: 1,185줄 조판 완료, 표시 숫자 무변경. **규모: 1 파일 (분할 커밋 권장).**

### S9 — calculator · admin 표면 조판

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T47 | **로직 읽기 전용 구역 표시** — calculator `:1-536`, IIFE 11곳, `:4544-4551` / admin `:189-2281` | — | 베이스라인 `git diff --stat` 캡처 | S8 |
| T48 | calculator input 46곳 → `<Input>` 컴포넌트 흡수 | `calculator/page.tsx` | 46 → 1. 동일 입력 → 동일 결과 | T47 |
| T49 | calculator "계산식" 패널 10곳 → `Doc` 규칙선 | 동 | 표시 숫자 동일 | T47 |
| T50 | calculator "합계" 패널 10곳 → `Doc` 규칙선 | 동 | 표시 숫자 동일 | T47 |
| T51 | calculator 아코디언 셸 + 우측 결과 패널 조판 | 동 | **동일 입력 → 동일 환급액** (필수) | T48-50 |
| T52 | admin input 22곳 → `<Input>` 흡수 | `admin/page.tsx` | 저장 payload 동일 | T47 |
| T53 | admin 모달 6개 셸 조판 (내용 무변경) | 동 | 6개 개폐 + 스크림 판독 | T52 |
| T54 | admin 3섹션 헤더 + 표 조판 | 동 | 저장/로드 왕복 | T52 |
| T55 | `translate-x-[Npx]` 눌림 효과 46곳 제거 (Neo 잔재) | 동 | grep 0 | T54 |

**완료 기준**: 두 파일 표면 조판 완료, **로직 라인 diff 0**(T47 베이스라인 대조). 계산기 동일 입력 → 동일 환급액. **규모: 2 파일, 분할 커밋 필수.**

### S10 — 메타·마감

| # | 태스크 | 파일 | 검증 | 의존 |
|---|---|---|---|---|
| T56 | `app/opengraph-image.tsx` 스위스 톤 (accent 추가) | 1 | `/opengraph-image` 육안 | S9 |
| T57 | `DESIGN.md` 재작성 | 1 | 토큰표가 `globals.css`와 일치 | S9 |
| T58 | 전역 잔재 grep 0 + `css-var-check` 0 + `contrast-check` 전건 | — | 게이트 전부 | T56-57 |
| T59 | 수동 체크리스트 전량 1회 | — | 13 라우트 × 상태 | T58 |
| T60 | PR — `feat(design): 스위스 그리드 전면 재개편` | — | squash merge | T59 |

**의존 그래프 요약**: `S0 → S1 → S2 → S3 → S4 → S5 → {S6, S7, S8} → S9 → S10`
S6·S7·S8은 S5 완료 후 **서로 독립**이라 병렬 가능.
**임계 경로**: S0 → S1 → S2 → S3 → S4 → S5 → S9 → S10

---

## 7. 결정 게이트 (진행 전 사용자 확인 필요)

| # | 결정 | 선택지 | 차단하는 단계 |
|---|---|---|---|
| **D1** | 랜딩 진단기 `data.ts`의 **지어낸 가정 계수**와 미검증 후기 2건·스탯 3종 | (a) 실데이터로 교체 (b) `lib/tax-calculator.ts`에 재배선 (c) 진단기 제거 (d) 면책 강화 후 그대로 | S6 |
| **D2** | `components/ui/Card.tsx` 처리 (§3.4) | (a) 각진 규칙선으로 재정의·이름 유지 **[권장]** (b) 삭제 후 `Doc`로 전량 대체 (c) 병존 | S4 |
| **D3** | calculator·admin **구조 조판** 범위 | (a) 이번엔 표면 조판까지, 구조는 후속 plan **[권장]** (b) admin만 구조 조판 (c) 전부 구조 조판 — Playwright + D1~D6 판정 선행 필수 | S9 |

> D1은 법무 이슈를 동반한다(`COMMISSION.md:211` — "국세청 간소화 자료" 등 기관·제도 언급과 환급액 추정치). 개발 판단으로 통과시키지 않는다.

---

## 8. 위험 목록

| # | 위험 | 무엇이 깨지나 | 감지 방법 | 완화 |
|---|---|---|---|---|
| **R1** | **calculator 표시 환급액 변경** — D1~D6 불일치 + 총환급액이 `:4544-4551` JSX에만 존재 | 사용자가 보는 금액이 조용히 바뀜. **tsc·lint·build 전부 통과** | 동일 입력 → 동일 출력 수동 회귀 (T51 필수) | 구조 조판 금지(D3-a). 로직 읽기 전용 구역 표시(T47) |
| **R2** | **스크림 반전** — `bg-base/80` 7곳이 흰 배경에서 흰 스크림이 됨 | 모달 6개 + 대시보드 오버레이 판독 불가. **자동 감지 수단 없음** | 수동 체크리스트 "모달 6개 개폐" | T13에서 `bg-scrim` 신규 토큰. `token-audit` 금지 패턴 등록 |
| **R3** | **미정의 CSS 변수** — 토큰 전면 재작성 중 선언 유실 | 색이 검정/투명으로 조용히 폴백. **시안에서 실제 발생**(`COMMISSION.md:182`), tsc·lint 무감지 | `css-var-check.mjs` (V5) | 매 단계 게이트에 포함 |
| **R4** | 셸 교체가 인증 분기·세션 타이머·모바일 탭바를 유실 | 로그인 후 앱 내비 소실, 30분 자동 로그아웃 미동작 | 수동: 로그인 상태 nav / 타이머 육안 / 390px 탭바 | §3.2 보존 목록을 T25 체크리스트로 강제 |
| **R5** | className 밖 토큰 문자열 누락 (§2.6) | `getUtilizationFill` 등이 옛 토큰명 반환 → 무스타일 | `token-audit`에 문자열 리터럴 패턴 포함 | T9에서 6곳 명시 처리 |
| **R6** | 제안 색상(`dim`/`amber`/`sky`/`surface-3`)이 대비 미달 | 흰 배경에서 본문 4.5:1 미달 | `contrast-check.mjs` (V6) | §2.2에 ※제안 표기. 실측 전 확정 금지 |
| **R7** | Montserrat 제거 시 `font-display` 잔존 참조 | 헤딩이 조용히 fallback 체인으로 | T26 전 전수 grep | 참조 0 확인 후에만 제거 |
| **R8** | 로고 6곳(인라인 4 + svg 2) 형상 불일치 | 파비콘과 헤더 마크가 다름 | T22 육안 대조 | `Brand.tsx` 단일 출처 + svg 대조 체크 |
| **R9** | admin JSX 내 세법 규칙 유실 (`:2429-2474` 7천만원 한도 등) | 잘못된 데이터가 `admin_data`에 저장 | 저장 payload 전/후 비교 | 표면 조판 한정(D3-a). 구조 변경 금지 |
| **R10** | 과도기(S2~S4) 화면을 최종안으로 오인 | 불필요한 재작업 지시 | — | worktree 격리 + S2 완료 시 "팔레트만 확정" 명시 보고 |
| **R11** | 시안 `commission.css` 해킹 잔존 (`body:has(.cx-r1)`) | 셸이 이중 렌더 또는 은닉 | T39에서 폴더 처리 + grep `cx-r1` 0 | S6 종료 게이트 |

**감지 불가 위험 순위**: R1 > R2 > R3. 셋 다 **tsc·lint·build를 전부 통과한다.** 이것이 S0(안전망)을 시각 변경보다 먼저 두는 이유다.

---

## 9. 범위 밖 (Out of Scope)

- 세금 계산 로직 변경 / D1~D6 정오 판정 (후속 plan)
- `lib/tax-calculator.ts`와 `calculator/page.tsx` 사본 409줄 중복 해소 (후속)
- admin 모달 6개 파일 분할 (후속 — 조판 아닌 정리)
- 다크 모드 (스위스 그리드는 라이트 전용)
- 신규 기능·라우트·DB 스키마·Server Action 시그니처
- `package.json` `name: "taxai"` 잔재 (빌드 무관)
- 비밀번호 찾기 라우트 신설 (`COMMISSION.md:208`)
- 진단 입력값을 가입 이후로 이어받는 배선 (`COMMISSION.md:209`)
