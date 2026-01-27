module.exports = [
"[project]/.next-internal/server/app/api/news/route/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[project]/app/api/news/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function GET() {
    try {
        const query = encodeURIComponent("연말정산");
        const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=ko&gl=KR&ceid=KR:ko`;
        const response = await fetch(rssUrl, {
            next: {
                revalidate: 10800
            } // 3시간마다 재검증
        });
        if (!response.ok) {
            throw new Error("Failed to fetch news");
        }
        const xmlText = await response.text();
        // XML 파싱 (간단한 정규식 사용)
        const items = [];
        const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g);
        if (itemMatches) {
            itemMatches.slice(0, 10).forEach((item, index)=>{
                const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) || item.match(/<title>(.*?)<\/title>/);
                const linkMatch = item.match(/<link>(.*?)<\/link>/);
                const sourceMatch = item.match(/<source[^>]*>(.*?)<\/source>/) || item.match(/<source[^>]*><!\[CDATA\[(.*?)\]\]><\/source>/);
                const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);
                if (titleMatch && linkMatch) {
                    // 제목에서 소스 제거 (Google News 형식: "제목 - 출처")
                    let title = titleMatch[1];
                    let source = sourceMatch ? sourceMatch[1] : "뉴스";
                    // " - 출처" 형식 제거
                    const dashIndex = title.lastIndexOf(" - ");
                    if (dashIndex > 0) {
                        source = title.substring(dashIndex + 3);
                        title = title.substring(0, dashIndex);
                    }
                    // 시간 계산
                    let timeAgo = "방금 전";
                    if (pubDateMatch) {
                        const pubDate = new Date(pubDateMatch[1]);
                        const now = new Date();
                        const diffMs = now.getTime() - pubDate.getTime();
                        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                        const diffDays = Math.floor(diffHours / 24);
                        if (diffDays > 0) {
                            timeAgo = `${diffDays}일 전`;
                        } else if (diffHours > 0) {
                            timeAgo = `${diffHours}시간 전`;
                        } else {
                            const diffMins = Math.floor(diffMs / (1000 * 60));
                            timeAgo = diffMins > 0 ? `${diffMins}분 전` : "방금 전";
                        }
                    }
                    items.push({
                        id: String(index + 1),
                        title: title.trim(),
                        source: source.trim(),
                        time: timeAgo,
                        url: linkMatch[1],
                        isNew: index < 2
                    });
                }
            });
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: true,
            data: items,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("News fetch error:", error);
        // 에러 시 목업 데이터 반환
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            success: false,
            data: [],
            error: "뉴스를 가져오는데 실패했습니다."
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__def2931a._.js.map