import Link from "next/link";
import { Calculator } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t-[3px] border-black bg-white py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-black flex items-center justify-center text-white">
                                <Calculator size={20} strokeWidth={3} />
                            </div>
                            <span className="font-head text-xl font-black tracking-tighter">
                                TAX<span className="text-neo-orange">AI</span>
                            </span>
                        </div>
                        <p className="text-sm font-bold text-gray-600 leading-relaxed">
                            복잡한 연말정산,
                            <br />
                            AI와 함께 쉽고 빠르게 해결하세요.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neo-cyan rounded-full border border-black"></span>
                            SERVICE
                        </h4>
                        <ul className="space-y-2 text-sm font-bold text-gray-600">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-neo-cyan hover:underline decoration-2 underline-offset-2"
                                >
                                    기능 소개
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-neo-cyan hover:underline decoration-2 underline-offset-2"
                                >
                                    요금 안내
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-neo-cyan hover:underline decoration-2 underline-offset-2"
                                >
                                    자주 묻는 질문
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neo-yellow rounded-full border border-black"></span>
                            LEGAL
                        </h4>
                        <ul className="space-y-2 text-sm font-bold text-gray-600">
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-neo-yellow hover:underline decoration-2 underline-offset-2"
                                >
                                    이용약관
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-neo-yellow hover:underline decoration-2 underline-offset-2"
                                >
                                    개인정보처리방침
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-lg mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-neo-orange rounded-full border border-black"></span>
                            CONTACT
                        </h4>
                        <ul className="space-y-2 text-sm font-bold text-gray-600">
                            <li>ysong2526@gmail.com</li>
                            <li>02-1234-5678</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t-2 border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm font-bold text-gray-500">
                        © 2026 TaxAI. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a
                            href="https://www.nts.go.kr/nts/cm/cntnts/cntntsView.do?mi=6435&cntntsId=7871"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 px-4 border-2 border-black bg-neo-cyan flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                        >
                            <span className="font-black text-xs">국세청</span>
                        </a>
                        <a
                            href="https://www.koreatax.org/tax/index.php3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-10 px-4 border-2 border-black bg-neo-yellow flex items-center justify-center hover:-translate-y-1 transition-transform cursor-pointer shadow-[2px_2px_0px_0px_#000]"
                        >
                            <span className="font-black text-xs">한국납세자연맹</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

