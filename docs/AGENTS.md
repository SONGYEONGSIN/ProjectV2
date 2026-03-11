# AGENTS.md
## TaxAI - 서브에이전트 & 스킬 구성

---

## 1. 서브에이전트 개요

5개의 전문 서브에이전트로 구성된 멀티에이전트 시스템:

```
Orchestrator (총괄)
├── 🧠 Planner Agent       — 기획
├── 🎨 Designer Agent      — 네오브루탈리즘 디자인
├── 💻 Developer Agent     — 풀스택 개발
├── ✅ QA Agent            — 검증
└── 🚀 Deploy Agent        — 배포
```

---

## 2. 기술 스택

| 항목 | 기술 |
|------|------|
| Framework | Next.js 15 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + 커스텀 네오브루탈리즘 CSS |
| Auth | NextAuth.js v5 (Google OAuth, JWT) |
| Database | Supabase (PostgreSQL) |
| Icons | lucide-react |
| Animation | framer-motion |
| Utilities | clsx, tailwind-merge, xlsx |

---

## 3. 에이전트별 스킬 파일 구조

```
agents/
├── orchestrator/
│   └── orchestrator.yaml
├── planner/
│   ├── planner.yaml
│   └── skills/
│       ├── data_analysis.yaml
│       └── content_strategy.yaml
├── designer/
│   ├── designer.yaml
│   └── skills/
│       ├── wireframing.yaml
│       └── design_system.yaml
├── developer/
│   ├── developer.yaml
│   └── skills/
│       ├── frontend.yaml
│       ├── backend.yaml
│       └── database.yaml
├── qa/
│   ├── qa.yaml
│   └── skills/
│       └── testing.yaml
└── deploy/
    ├── deploy.yaml
    └── skills/
        ├── ci_cd.yaml
        └── monitoring.yaml
```

---

## 4. 에이전트 협업 플로우

```
[Orchestrator]
      │
      ▼
[Planner] → PRD.md 생성 → 기획 검토 완료
      │
      ▼
[Designer] → 네오브루탈리즘 디자인 완성 → 디자인 검토 완료
      │
      ▼
[Developer] → 기능 구현 완료 → 코드 리뷰 완료
      │
      ▼
[QA Agent] → 테스트 통과 → QA 검증 완료
      │
      ▼
[Deploy Agent] → Vercel 배포 → 최종 승인 → 프로덕션 배포
```
