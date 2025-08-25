import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        {/* 로고 이미지 (public/images/로고.png) */}
        <div className="mb-6">
          <img
            src="/images/로고.png"
            alt="로고"
            className="mx-auto w-64 h-64"
          />
        </div>

        {/* 큰 제목 */}
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          찾으시는 페이지가 없어요 😢
        </h1>

        {/* 설명 */}
        <p className="text-lg text-gray-600 mb-8">
          주소가 잘못되었거나 페이지가 삭제되었을 수 있습니다. <br />
          아래 버튼을 눌러 홈으로 이동해주세요.
        </p>

        {/* 버튼 */}
        <a
          href="/"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition"
        >
          <Home size={20} />
          홈으로 가기
        </a>
      </div>
    </div>
  );
};

export default NotFound;
