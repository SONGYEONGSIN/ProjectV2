"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, PenSquare, Pin, Eye, ChevronLeft, ChevronRight, MessageSquare, HelpCircle, Megaphone, FileText } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface BoardPost {
    id: number;
    category: string;
    title: string;
    author_name: string;
    views: number;
    is_pinned: boolean;
    created_at: string;
}

interface BoardData {
    pinnedPosts: BoardPost[];
    posts: BoardPost[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
}

const categoryStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    "공지": { bg: "bg-red-400 text-white", text: "공지", icon: Megaphone },
    "FAQ": { bg: "bg-neo-cyan text-black", text: "FAQ", icon: HelpCircle },
    "질문": { bg: "bg-neo-yellow text-black", text: "질문", icon: MessageSquare },
    "일반": { bg: "bg-gray-200 text-black", text: "일반", icon: FileText },
};

function formatDate(dateStr: string) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);

    if (hours < 24) {
        if (hours < 1) return `${Math.floor(diff / (1000 * 60))}분 전`;
        return `${Math.floor(hours)}시간 전`;
    }

    return date.toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\. /g, "-").replace(".", "");
}

function maskName(name: string) {
    if (name.length <= 1) return name;
    if (name.length === 2) return name[0] + "*";
    return name[0] + "*".repeat(name.length - 2) + name[name.length - 1];
}

export default function BoardPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [boardData, setBoardData] = useState<BoardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchType, setSearchType] = useState("title");
    const [searchQuery, setSearchQuery] = useState("");
    const [activeSearch, setActiveSearch] = useState("");
    const [activeSearchType, setActiveSearchType] = useState("title");

    const fetchPosts = async (page: number, search = "", sType = "title") => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: page.toString(),
            });
            if (search) {
                params.set("search", search);
                params.set("searchType", sType);
            }
            const res = await fetch(`/api/board?${params}`);
            const data = await res.json();
            if (data.success) {
                setBoardData(data.data);
            }
        } catch (error) {
            console.error("Board fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(currentPage, activeSearch, activeSearchType);
    }, [currentPage, activeSearch, activeSearchType]);

    const handleSearch = () => {
        setCurrentPage(1);
        setActiveSearch(searchQuery);
        setActiveSearchType(searchType);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    const totalCount = boardData?.totalCount || 0;
    const totalPages = boardData?.totalPages || 1;

    const renderPostRow = (post: BoardPost, isPinned = false) => {
        const catStyle = categoryStyles[post.category] || categoryStyles["일반"];
        const CatIcon = catStyle.icon;

        return (
            <motion.tr
                key={post.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`border-b-2 border-black hover:bg-neo-yellow/20 transition-colors cursor-pointer ${isPinned ? "bg-gray-50" : ""
                    }`}
                onClick={() => router.push(`/board/${post.id}`)}
            >
                <td className="py-3 px-2 sm:px-4 text-center font-bold text-sm">
                    {isPinned ? (
                        <Pin size={16} className="inline text-neo-orange" />
                    ) : (
                        <span className="text-gray-500">{post.id}</span>
                    )}
                </td>
                <td className="py-3 px-2 sm:px-4">
                    <div className="flex items-center gap-2">
                        <span className={`hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-bold border-2 border-black ${catStyle.bg} whitespace-nowrap`}>
                            <CatIcon size={12} />
                            {catStyle.text}
                        </span>
                        <span className="font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-none">
                            {post.title}
                        </span>
                    </div>
                </td>
                <td className="py-3 px-2 sm:px-4 text-center font-bold text-sm text-gray-600 whitespace-nowrap hidden sm:table-cell">
                    {maskName(post.author_name)}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center text-sm text-gray-500 whitespace-nowrap hidden md:table-cell">
                    {formatDate(post.created_at)}
                </td>
                <td className="py-3 px-2 sm:px-4 text-center text-sm text-gray-500 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center justify-center gap-1">
                        <Eye size={14} />
                        {post.views}
                    </div>
                </td>
            </motion.tr>
        );
    };

    return (
        <div className="animate-fade-in space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight uppercase">
                        게시판
                    </h2>
                    <p className="text-gray-500 font-bold text-sm mt-1">
                        연말정산 관련 질문과 정보를 자유롭게 나눠보세요 💬
                    </p>
                </div>
                {session && (
                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            href="/board/write"
                            className="neo-btn text-sm !py-3 !px-5 !bg-neo-orange !text-white whitespace-nowrap"
                        >
                            <PenSquare size={18} />
                            새글쓰기
                        </Link>
                    </motion.div>
                )}
            </div>

            {/* Search Bar */}
            <div className="neo-card !p-4 bg-white">
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center gap-2 flex-1">
                        <select
                            value={searchType}
                            onChange={(e) => setSearchType(e.target.value)}
                            className="border-[3px] border-black px-3 py-2 font-bold text-sm bg-white focus:outline-none"
                        >
                            <option value="title">제목</option>
                            <option value="author">글쓴이</option>
                        </select>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="검색어를 입력하세요"
                            className="flex-1 border-[3px] border-black px-4 py-2 font-bold text-sm focus:outline-none focus:shadow-[4px_4px_0px_0px_#FFB800]"
                        />
                    </div>
                    <motion.button
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleSearch}
                        className="px-6 py-2 bg-neo-black text-white font-black border-[3px] border-black shadow-[4px_4px_0px_0px_#00D9FF] hover:shadow-[2px_2px_0px_0px_#00D9FF] active:shadow-none transition-all flex items-center justify-center gap-2"
                    >
                        <Search size={16} />
                        검색
                    </motion.button>
                </div>
                {totalCount > 0 && (
                    <div className="mt-3 text-sm font-bold text-gray-500">
                        total : {totalCount.toLocaleString()} [ {currentPage} / {totalPages} page ]
                    </div>
                )}
            </div>

            {/* Board Table */}
            <div className="neo-card !p-0 bg-white overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-neo-black text-white border-b-4 border-black">
                                <th className="py-3 px-2 sm:px-4 text-center font-black text-sm w-16">번호</th>
                                <th className="py-3 px-2 sm:px-4 text-left font-black text-sm">제목</th>
                                <th className="py-3 px-2 sm:px-4 text-center font-black text-sm w-24 hidden sm:table-cell">글쓴이</th>
                                <th className="py-3 px-2 sm:px-4 text-center font-black text-sm w-28 hidden md:table-cell">날짜</th>
                                <th className="py-3 px-2 sm:px-4 text-center font-black text-sm w-20 hidden md:table-cell">조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="py-20 text-center">
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 border-4 border-neo-orange border-t-transparent rounded-full animate-spin" />
                                            <span className="font-bold text-gray-500">로딩 중...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {/* Pinned Posts */}
                                    {boardData?.pinnedPosts.map((post) => renderPostRow(post, true))}

                                    {/* Regular Posts */}
                                    {boardData?.posts.map((post) => renderPostRow(post))}

                                    {/* Empty State */}
                                    {!boardData?.pinnedPosts.length && !boardData?.posts.length && (
                                        <tr>
                                            <td colSpan={5} className="py-20 text-center">
                                                <div className="flex flex-col items-center gap-3">
                                                    <MessageSquare size={48} className="text-gray-300" />
                                                    <p className="font-bold text-gray-400">
                                                        아직 게시글이 없습니다
                                                    </p>
                                                    {session && (
                                                        <Link
                                                            href="/board/write"
                                                            className="text-neo-orange font-bold underline decoration-2"
                                                        >
                                                            첫 번째 글을 작성해보세요!
                                                        </Link>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage <= 1}
                        className="w-10 h-10 border-[3px] border-black bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#000] active:shadow-none"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                            pageNum = i + 1;
                        } else if (currentPage <= 3) {
                            pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                        } else {
                            pageNum = currentPage - 2 + i;
                        }
                        return (
                            <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-10 h-10 border-[3px] border-black font-black text-sm flex items-center justify-center transition-all ${currentPage === pageNum
                                    ? "bg-neo-orange text-white shadow-[4px_4px_0px_0px_#000]"
                                    : "bg-white hover:bg-neo-yellow shadow-[2px_2px_0px_0px_#000] active:shadow-none"
                                    }`}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage >= totalPages}
                        className="w-10 h-10 border-[3px] border-black bg-white hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_#000] active:shadow-none"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}
        </div>
    );
}
