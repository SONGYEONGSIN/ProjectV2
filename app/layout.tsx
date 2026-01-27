import type { Metadata } from "next";
import { Inter, Lexend, Nanum_Pen_Script } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider } from "@/components/providers/AuthProvider";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const lexend = Lexend({
    subsets: ["latin"],
    variable: "--font-lexend",
    weight: ["400", "500", "600", "700", "800", "900"],
    display: "swap",
});

const nanumPenScript = Nanum_Pen_Script({
    subsets: ["latin"],
    variable: "--font-handwriting",
    weight: "400",
    display: "swap",
});

export const metadata: Metadata = {
    title: "TAXAI - 2026 AI 연말정산 솔루션",
    description: "AI와 함께 쉽고 빠르게 최대 환급액을 받아보세요",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${lexend.variable} antialiased`}
                suppressHydrationWarning
            >
                <AuthProvider>
                    <div className="min-h-screen pb-24 md:pb-0 flex flex-col">
                        <Navigation />
                        <main className="container mx-auto px-4 py-8 max-w-6xl flex-grow">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}

