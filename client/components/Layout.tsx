import { useState, ReactNode } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import FloatingButtons from "./FloatingButtons";

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

  return (
    <div className="min-h-screen bg-white pb-16 lg:pb-0">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between mb-30">
          <Link
            to="/"
            className="flex items-center text-white font-medium pl-3 mr-27"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fd94a560c34c543b2b75ed46d8b28bbee%2Fb284b4dc36024ca385a83cf5ab8a5bd2"
              alt="세무법인 로고스 로고"
              className="w-40 h-15 object-contain"
            />
          </Link>

          {/* Desktop Navigation Menu */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link
              to="/greeting"
              className="text-white hover:text-blue-200 transition-colors"
            >
              인사말
            </Link>
            <Link
              to="/team"
              className="text-white hover:text-blue-200 transition-colors"
            >
              구성원 소개
            </Link>
            <Link
              to="/services"
              className="text-white hover:text-blue-200 transition-colors"
            >
              담당 업무
            </Link>
            <Link
              to="/directions"
              className="text-white hover:text-blue-200 transition-colors"
            >
              오시는 길
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden bg-blue-700 p-3 rounded"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="container mx-auto px-4 py-6">
              <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
                <li>
                  <Link
                    to="/greeting"
                    className="text-lg text-gray-700 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    인사말
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-lg text-gray-700 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    구성원소개
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-lg text-gray-700 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    담당업무
                  </Link>
                </li>
                <li>
                  <Link
                    to="/directions"
                    className="text-lg text-gray-700 hover:text-blue-400 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    오시는 길
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        className={`relative ${isHomepage ? "h-screen" : "h-96"} bg-cover bg-center bg-no-repeat flex items-center`}
        style={{
          backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets%2Fd94a560c34c543b2b75ed46d8b28bbee%2Ff24062dbabd040be89ea5ee2b30747ea?format=webp&width=800')`,
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-slate-800/50 to-slate-700/30"></div>

        {/* Side Scroll Text (Homepage only) */}
        {isHomepage && (
          <div className="absolute left-6 top-1/2 transform -translate-y-1/2 rotate-90 origin-center">
            <span className="text-white/60 text-sm tracking-widest font-light">
              SCROLL
            </span>
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10">
          <div className={`${isHomepage ? "max-w-3xl" : "text-center"}`}>
            <h1
              className={`font-bold text-white mb-6 leading-tight ${isHomepage ? "text-4xl lg:text-6xl" : "text-3xl lg:text-4xl"}`}
            >
              {heroTitle}
            </h1>
            {isHomepage && (
              <div className="text-white/90 text-xl lg:text-2xl font-medium mb-8">
                "맞춤 상담, 사후관리까지 책임지는
                <br />
                믿을 수 있는 세무 동반자"
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-2">
            <h4 className="text-lg font-semibold text-white mb-4">
              세무법인 로고스 강남지점
            </h4>
            <p>대표: 윤영호</p>
            <p>사업자등록번호: 445-85-02834</p>
            <p>전화번호: 02-563-2505 / FAX 02-563-2506</p>
            <p>주소: 서울특별시 강남구 테헤란로20길 18 (부봉빌딩) 4층</p>
            <p>이메일: logostax25@naver.com</p>
          </div>
        </div>
      </footer>

      {/* Floating Consultation Buttons */}
      <FloatingButtons />
    </div>
  );
}
