import { NextResponse } from "next/server";

interface NewsItem {
    id: string;
    title: string;
    source: string;
    time: string;
    url: string;
    isNew: boolean;
}

// Google News RSS 피드에서 뉴스 가져오기
export async function GET() {
    try {
        // 최근 기사부터 검색 (7일 → 30일 → 전체 순으로 폴백)
        const searchQueries = [
            "\"연말정산\" when:7d",
            "\"연말정산\" when:30d",
            "연말정산 환급 세금",
        ];

        let items: NewsItem[] = [];

        for (const searchQuery of searchQueries) {
            const query = encodeURIComponent(searchQuery);
            const rssUrl = `https://news.google.com/rss/search?q=${query}&hl=ko&gl=KR&ceid=KR:ko`;

            const response = await fetch(rssUrl, {
                next: { revalidate: 10800 } // 3시간마다 재검증
            });

            if (!response.ok) continue;

            const xmlText = await response.text();
            const itemMatches = xmlText.match(/<item>([\s\S]*?)<\/item>/g);

            if (itemMatches && itemMatches.length > 0) {
                itemMatches.slice(0, 15).forEach((item, index) => {
                    const titleMatch = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/) ||
                        item.match(/<title>(.*?)<\/title>/);
                    const linkMatch = item.match(/<link>(.*?)<\/link>/);
                    const sourceMatch = item.match(/<source[^>]*>(.*?)<\/source>/) ||
                        item.match(/<source[^>]*><!\[CDATA\[(.*?)\]\]><\/source>/);
                    const pubDateMatch = item.match(/<pubDate>(.*?)<\/pubDate>/);

                    if (titleMatch && linkMatch) {
                        let title = titleMatch[1];
                        let source = sourceMatch ? sourceMatch[1] : "뉴스";

                        const dashIndex = title.lastIndexOf(" - ");
                        if (dashIndex > 0) {
                            source = title.substring(dashIndex + 3);
                            title = title.substring(0, dashIndex);
                        }

                        let timeAgo = "방금 전";
                        let pubTimestamp = Date.now();
                        if (pubDateMatch) {
                            const pubDate = new Date(pubDateMatch[1]);
                            pubTimestamp = pubDate.getTime();
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

                        // 중복 제거 (같은 제목 방지)
                        const isDuplicate = items.some(
                            (existing) => existing.title === title.trim()
                        );

                        if (!isDuplicate) {
                            items.push({
                                id: String(items.length + 1),
                                title: title.trim(),
                                source: source.trim(),
                                time: timeAgo,
                                url: linkMatch[1],
                                isNew: false,
                                _timestamp: pubTimestamp,
                            } as NewsItem & { _timestamp: number });
                        }
                    }
                });

                // 충분한 기사가 모이면 중단
                if (items.length >= 10) break;
            }
        }

        // 최신순 정렬
        items.sort((a, b) =>
            ((b as unknown as { _timestamp: number })._timestamp || 0) -
            ((a as unknown as { _timestamp: number })._timestamp || 0)
        );

        // 상위 10개만 사용, 최신 2개에 NEW 표시
        items = items.slice(0, 10).map((item, index) => ({
            ...item,
            id: String(index + 1),
            isNew: index < 2,
        }));

        return NextResponse.json({
            success: true,
            data: items,
            updatedAt: new Date().toISOString(),
        });
    } catch (error) {
        console.error("News fetch error:", error);

        // 에러 시 목업 데이터 반환
        return NextResponse.json({
            success: false,
            data: [],
            error: "뉴스를 가져오는데 실패했습니다.",
        });
    }
}
