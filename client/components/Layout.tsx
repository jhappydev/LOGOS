import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import FloatingButtons from "./FloatingButtons";
import React from "react";

interface LayoutProps {
  children: ReactNode;
  heroTitle: string;
  heroSubtitle?: string;
  isHomepage?: boolean;
}

export default function Layout({
  children,
  heroTitle,
  heroSubtitle,
  isHomepage = false,
}: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    console.log(React.version);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-3 md:py-6 flex items-center justify-between">
          {/* Logo - Center on mobile, Left on desktop */}
          <Link
            to="/"
            className="flex items-center font-medium mx-auto lg:mx-0 lg:order-1"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F8517c0d1710c4d3599e60758bbb21b1d%2Fb3b53f52231b49298967686d64413891"
              alt="세무법인 로고스 로고"
              className={`w-12 h-12 object-contain transition-all duration-300 ${
                isScrolled ? "" : "brightness-0 invert"
              }`}
            />
            <span
              className={`ml-3 text-lg md:text-xl lg:text-2xl font-bold ${
                isScrolled ? "text-[#345A9E]" : "text-white"
              }`}
            >
              세무법인 로고스 강남지점
            </span>
          </Link>

          {/* Hamburger Button (PC & Mobile 공통) */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="bg-transparent p-2 md:p-3 rounded order-3"
          >
            {isMenuOpen ? (
              <X
                className={`w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 ${
                  isScrolled ? "text-[#345A9E]" : "text-white"
                }`}
              />
            ) : (
              <Menu
                className={`w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 ${
                  isScrolled ? "text-[#345A9E]" : "text-white"
                }`}
              />
            )}
          </button>
        </div>

        {/* Slide Menu - PC & Mobile 동일하게 사용 */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F8517c0d1710c4d3599e60758bbb21b1d%2Fc1a19d4d408c48e5a67fbd0c73679a92?format=webp&width=800"
                  alt="세무법인 로고스 로고"
                  className="w-16 h-6 object-contain"
                />
                <span className="ml-2 text-sm font-bold text-[#345A9E] whitespace-nowrap">
                  세무법인 로고스 강남지점
                </span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-1">
                <X className="w-5 h-5 text-[#345A9E]" />
              </button>
            </div>
          </div>

          {/* Slide Menu Links */}
          <nav className="p-4">
            <ul className="space-y-4">
              {[
                { label: "인사말", to: "/greeting" },
                { label: "주요 구성원 소개", to: "/team" },
                { label: "담당 업무", to: "/services" },
                { label: "세무도우미", to: "/helper" },
                { label: "오시는 길", to: "/directions" },
                { label: "문의하기", to: "/inquiry" },
                // { label: "시설안내", to: "/facility" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="block text-lg text-[#345A9E] hover:text-[#7BB0E3] transition-colors py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Overlay (메뉴 열렸을 때 화면 어둡게) */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
      </header>

      {/* Hero Section */}
      <section
        className={`relative ${
          isHomepage ? "h-screen" : "h-96"
        } bg-cover bg-center bg-no-repeat flex items-center`}
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2F8517c0d1710c4d3599e60758bbb21b1d%2F2c80f6ae184a4958b6c9fbd5fbe2c511')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-slate-700/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className={`${isHomepage ? "max-w-3xl" : "text-center"}`}>
            <h1
              className={`font-bold text-white mb-4 md:mb-6 leading-tight text-center ${
                isHomepage
                  ? "text-3xl md:text-4xl lg:text-6xl"
                  : "text-2xl md:text-3xl lg:text-4xl"
              }`}
            >
              {heroTitle}
            </h1>

            {isHomepage && (
              <div className="text-white/90 text-xl md:text-2xl lg:text-3xl font-medium mb-6 md:mb-8 text-center lg:text-left pl-8">
                <span className="block">"맞춤 상담, 사후관리까지 책임지는</span>
                <span className="block">&nbsp;믿을 수 있는 세무 동반자"</span>
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="flex-grow">{children}</main>

      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-1 md:space-y-2">
            <h4 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4">
              세무법인 로고스 강남지점
            </h4>
            <p className="text-sm md:text-base">대표: 윤영호</p>
            <p className="text-sm md:text-base">사업자등록번호: 445-85-02834</p>
            <p className="text-sm md:text-base">
              전화번호: 02-563-2505 / FAX 02-563-2506
            </p>
            <p className="text-sm md:text-base">
              주소 : 서울특별시 강남구 테헤란로20길 18 (부봉빌딩) 4층
            </p>
            <p className="text-sm md:text-base">이메일: logostax25@naver.com</p>
            <p className="text-sm md:text-base">
              Copyright (C) 2025 logostaxgn.com All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <FloatingButtons />
    </div>
  );
}
