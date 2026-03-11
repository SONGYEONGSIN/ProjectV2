import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 60, // 30분 (초 단위)
    },
    jwt: {
        maxAge: 30 * 60, // 30분
    },
    callbacks: {
        async signIn({ user }) {
            // 로그인 시 users 테이블에 upsert
            try {
                await supabase
                    .from("users")
                    .upsert(
                        {
                            email: user.email,
                            name: user.name,
                            image: user.image,
                            provider: "google",
                            last_login_at: new Date().toISOString(),
                        },
                        { onConflict: "email" }
                    );
            } catch (error) {
                console.error("User upsert error:", error);
            }
            return true; // 로그인 허용
        },
        async redirect({ url, baseUrl }) {
            // 로그인 후 대시보드로 리다이렉트
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith("/")) return `${baseUrl}${url}`;
            return `${baseUrl}/dashboard`;
        },
    },
});
