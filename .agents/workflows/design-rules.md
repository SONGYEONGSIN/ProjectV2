---
description: TaxAI 네오브루탈리즘 디자인 규칙 - 타이포그래피, 그리드, 색상, 간격, 보더
---

# Design Rules (TaxAI 네오브루탈리즘)

이 프로젝트의 디자인 규칙입니다. 모든 UI 작업 시 반드시 준수합니다.

---

## 1. 네오브루탈리즘 핵심 원칙

- **두꺼운 보더**: 모든 UI 요소에 `border-[3px]` 또는 `border-4` + `border-black`
- **강한 그림자**: 오프셋 기반 그림자 `shadow-[Npx_Npx_0px_0px_#000]`
- **밝은 컬러**: 배경색에 강렬한 단색 사용 (노란색, 시안, 오렌지, 핑크)
- **둥근 모서리 없음**: `rounded-none` 또는 최소한의 `rounded-lg` (로고만)

---

## 2. Color (색상)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `neo-black` | #000000 | 테두리, 텍스트, 네비게이션 배경 |
| `neo-yellow` | #FFB800 | 주요 CTA, 활성 탭, 강조 |
| `neo-cyan` | #00D9FF | 보조 강조, FAQ 뱃지, 링크 배경 |
| `neo-orange` | #FF6B35 | 게시판 글쓰기, 오렌지 액센트 |
| `neo-pink` | #FF69B4 | 모바일 게시판 탭 활성 |
| `bg-background` | #F5F0EB | 페이지 배경 |

> **규칙**: 임의 HEX/RGB 색상 금지. 반드시 `neo-*` 토큰 또는 Tailwind 색상 사용.

---

## 3. Typography (타이포그래피)

### 폰트
- **제목**: Outfit (`font-head`)
- **본문**: Pretendard, system-ui, sans-serif

### 크기 스케일

| 용도 | 클래스 | Weight |
|------|--------|--------|
| **페이지 제목** | `text-2xl md:text-3xl` | `font-black uppercase tracking-tight` |
| **섹션 제목** | `text-xl` | `font-black` |
| **카드 제목** | `text-base` | `font-bold` |
| **본문 / 라벨** | `text-sm` | `font-bold` |
| **캡션 / 보조** | `text-xs` | `font-bold` |
| **숫자 강조** | `text-2xl ~ text-5xl` | `font-black` |

> **규칙**: 위 스케일 외의 크기 사용 금지. 제목에는 반드시 `font-black` + `tracking-tight` 적용.

---

## 4. Borders & Shadows

### 보더
| 용도 | 클래스 |
|------|--------|
| **기본 요소** | `border-[3px] border-black` |
| **카드** | `border-4 border-black` |
| **얇은 구분선** | `border-2 border-black` |
| **네비게이션** | `border-b-[3px] border-black` |
| **푸터** | `border-t-[3px] border-black` |

### 그림자
| 용도 | 클래스 |
|------|--------|
| **버튼 (기본)** | `shadow-[4px_4px_0px_0px_#000]` |
| **카드** | `shadow-[8px_8px_0px_0px_#000]` |
| **입력 포커스** | `shadow-[4px_4px_0px_0px_#FFB800]` |
| **작은 요소** | `shadow-[2px_2px_0px_0px_#000]` |

> **규칙**: 그림자는 반드시 `0px_0px` blur로 지정 (소프트 그림자 금지).

---

## 5. Spacing (간격)

### 페이지 패딩
```
container mx-auto px-4
content: p-4 md:p-6 pb-24 md:pb-6
```

### 간격
- **기본 gap**: `gap-4` (16px)
- **밀집 gap**: `gap-3` (12px)
- **인라인 gap**: `gap-2` (8px)
- **아이콘 gap**: `gap-0` ~ `gap-1` (0~4px)

> **규칙**: 간격은 4px 단위. `p-5`, `p-7` 같은 비표준 값 사용 금지.

---

## 6. 인터랙션 (호버/클릭)

| 효과 | 클래스 |
|------|--------|
| **호버** | `hover:-translate-y-1 transition-transform` |
| **클릭** | `active:translate-x-0.5 active:translate-y-0.5 active:shadow-none` |
| **스케일 호버** | `hover:scale-105 transition-transform` |
| **전환** | `transition-all duration-200` |

---

## 7. 컴포넌트 규칙

### neo-card
```css
border-4 border-black p-6 bg-white shadow-[8px_8px_0px_0px_#000]
```

### neo-btn
```css
border-[3px] border-black px-5 py-3 font-black
shadow-[4px_4px_0px_0px_#000]
hover:shadow-[2px_2px_0px_0px_#000]
active:shadow-none active:translate-x-0.5 active:translate-y-0.5
```

### neo-nav-item
```css
px-4 py-2 font-bold text-sm border-2 border-black
hover:bg-neo-yellow transition-all
```

### 뱃지 (카테고리)
```css
px-2 py-0.5 text-xs font-bold border-2 border-black
/* 카테고리별 배경색 */
공지: bg-red-400 text-white
FAQ: bg-neo-cyan text-black
질문: bg-neo-yellow text-black
일반: bg-gray-200 text-black
```
