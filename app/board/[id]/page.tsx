"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Eye, Calendar, User, Trash2, Pin, MessageSquare, HelpCircle, Megaphone, FileText, Lock, Pencil } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

interface BoardPost {
    id: number;
    category: string;
    title: string;
    content: string;
    author_name: string;
    author_email: string;
    views: number;
    is_pinned: boolean;
    is_public: boolean;
    created_at: string;
}

const categoryStyles: Record<string, { bg: string; text: string; icon: React.ElementType }> = {
    "공지": { bg: "bg-red-400 text-white", text: "공지", icon: Megaphone },
    "Q&A": { bg: "bg-neo-cyan text-black", text: "Q&A", icon: HelpCircle },
    "질문": { bg: "bg-neo-yellow text-black", text: "질문", icon: MessageSquare },
    "일반": { bg: "bg-gray-200 text-black", text: "일반", icon: FileText },
};

export default function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const router = useRouter();
    const { data: session } = useSession();
    const [post, setPost] = useState<BoardPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await fetch(`/api/board/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPost(data.data);
                }
            } catch (error) {
                console.error("Post fetch error:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        if (!confirm("정말 이 게시글을 삭제하시겠습니까?")) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/board/${id}`, { method: "DELETE" });
            const data = await res.json();
            if (data.success) {
                router.push("/board");
            } else {
                alert(data.error || "삭제에 실패했습니다.");
            }
        } catch {
            alert("삭제 중 오류가 발생했습니다.");
        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-10 h-10 border-4 border-neo-orange border-t-transparent rounded-full animate-spin" />
                    <span className="font-bold text-gray-500">로딩 중...</span>
                </div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
                <p className="text-2xl font-black">게시글을 찾을 수 없습니다 😢</p>
                <Link href="/board" className="neo-btn !py-3 !px-5">
                    <ArrowLeft size={18} />
                    목록으로
                </Link>
            </div>
        );
    }

    const catStyle = categoryStyles[post.category] || categoryStyles["일반"];
    const CatIcon = catStyle.icon;
    const isAuthor = session?.user?.email === post.author_email;
    const formattedDate = new Date(post.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 animate-fade-in"
        >
            {/* Header */}
            <div className="neo-card bg-white">
                {/* Category + Title */}
                <div className="flex items-start gap-3 mb-4">
                    {post.is_pinned && (
                        <Pin size={20} className="text-neo-orange mt-1 flex-shrink-0" />
                    )}
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-bold border-2 border-black ${catStyle.bg} flex-shrink-0`}>
                        <CatIcon size={14} />
                        {catStyle.text}
                    </span>
                    <h1 className="text-2xl md:text-3xl font-black tracking-tight normal-case break-words">
                        {post.title}
                    </h1>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 font-bold border-b-2 border-gray-200 pb-4">
                    <div className="flex items-center gap-1.5">
                        <User size={14} />
                        <span className="font-bold">{post.author_name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye size={14} />
                        <span>조회 {post.views}</span>
                    </div>
                    {post.is_public === false && (
                        <div className="flex items-center gap-1.5 text-neo-orange">
                            <Lock size={14} />
                            <span>비공개</span>
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="mt-6 min-h-[200px] whitespace-pre-wrap font-bold text-gray-800 leading-relaxed text-base">
                    {post.content}
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        href="/board"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border-[3px] border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all"
                    >
                        <ArrowLeft size={18} />
                        목록보기
                    </Link>
                </motion.div>

                {isAuthor && (
                    <div className="flex items-center gap-3">
                        <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href={`/board/${id}/edit`}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-neo-yellow text-black border-[3px] border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all"
                            >
                                <Pencil size={18} />
                                수정
                            </Link>
                        </motion.div>
                        <motion.button
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleDelete}
                            disabled={deleting}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-400 text-white border-[3px] border-black font-bold shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] active:shadow-none transition-all disabled:opacity-50"
                        >
                            <Trash2 size={18} />
                            {deleting ? "삭제 중..." : "삭제"}
                        </motion.button>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
