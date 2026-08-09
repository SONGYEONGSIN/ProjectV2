import { defineConfig } from "vitest/config";

/**
 * 재개편 마이그레이션 안전망 V2 전용 설정.
 *
 * 이 프로젝트에는 원래 테스트가 없다. 여기 있는 테스트는 기능 명세가 아니라
 * **특성화 테스트(characterization test)** 다 — 현재 계산 출력을 박제해서,
 * 조판·토큰 작업 중 숫자가 움직이면 즉시 잡는 것이 유일한 목적이다.
 * 정답 여부는 판정하지 않는다(그건 calculator/dashboard 계산 불일치 별건 과제).
 */
export default defineConfig({
  test: {
    include: ["lib/__tests__/**/*.test.ts"],
    environment: "node",
  },
});
