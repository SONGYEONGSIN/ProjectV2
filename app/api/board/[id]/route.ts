import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { auth } from "@/auth";

// GET: 게시글 상세 조회 + 조회수 증가
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        // 조회수 증가
        const { data: current } = await supabase
            .from("board_posts")
            .select("views")
            .eq("id", id)
            .single();

        if (current) {
            await supabase
                .from("board_posts")
                .update({ views: (current.views || 0) + 1 })
                .eq("id", id);
        }

        // 게시글 조회
        const { data, error } = await supabase
            .from("board_posts")
            .select("*")
            .eq("id", id)
            .single();

        if (error || !data) {
            return NextResponse.json(
                { success: false, error: "게시글을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data });
    } catch (error) {
        console.error("Board GET detail error:", error);
        return NextResponse.json(
            { success: false, error: "게시글을 불러오는데 실패했습니다." },
            { status: 500 }
        );
    }
}

// DELETE: 게시글 삭제 (작성자 본인만)
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const session = await auth();

    if (!session?.user) {
        return NextResponse.json(
            { success: false, error: "로그인이 필요합니다." },
            { status: 401 }
        );
    }

    try {
        // 작성자 확인
        const { data: post } = await supabase
            .from("board_posts")
            .select("author_email")
            .eq("id", id)
            .single();

        if (!post) {
            return NextResponse.json(
                { success: false, error: "게시글을 찾을 수 없습니다." },
                { status: 404 }
            );
        }

        if (post.author_email !== session.user.email) {
            return NextResponse.json(
                { success: false, error: "삭제 권한이 없습니다." },
                { status: 403 }
            );
        }

        const { error } = await supabase
            .from("board_posts")
            .delete()
            .eq("id", id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Board DELETE error:", error);
        return NextResponse.json(
            { success: false, error: "게시글 삭제에 실패했습니다." },
            { status: 500 }
        );
    }
}
