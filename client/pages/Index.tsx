import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

export default function Index() {
  const [keywordsRef, keywordsVisible] = useScrollAnimation();

  const services = [
    "세금신고업무",
    "상속, 증여, 양도 신고",
    "경정청구(환급)",
    "조세불복",
    "경영컨설팅",
    "세무조사 수임",
  ];

  return (
    <Layout heroTitle="세무법인 로��스 강남지점" isHomepage={true}>
      {/* Frame 2: About Section with Circles */}
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Three Circles Design with Animation */}
            <div
              ref={keywordsRef}
              className={`flex items-center justify-center mb-16 transition-all duration-1000 ease-out ${
                keywordsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="flex items-center space-x-2 md:space-x-6 lg:space-x-16">
                {/* 최선 Circle */}
                <div
                  className={`flex flex-col items-center transition-all duration-1000 ease-out ${
                    keywordsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 lg:w-32 lg:h-32 bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xs md:text-sm lg:text-2xl">
                      최선
                    </span>
                  </div>
                </div>

                {/* Connecting Line */}
                <div
                  className={`w-4 md:w-8 lg:w-20 h-0.5 bg-gray-400 transition-all duration-1000 ease-out ${
                    keywordsVisible
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                  style={{ transitionDelay: "400ms" }}
                ></div>

                {/* 최적 Circle */}
                <div
                  className={`flex flex-col items-center transition-all duration-1000 ease-out ${
                    keywordsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "600ms" }}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xs md:text-base lg:text-2xl">
                      최적
                    </span>
                  </div>
                </div>

                {/* Connecting Line */}
                <div
                  className={`w-4 md:w-8 lg:w-20 h-0.5 bg-gray-400 transition-all duration-1000 ease-out ${
                    keywordsVisible
                      ? "opacity-100 scale-x-100"
                      : "opacity-0 scale-x-0"
                  }`}
                  style={{ transitionDelay: "800ms" }}
                ></div>

                {/* 최상 Circle */}
                <div
                  className={`flex flex-col items-center transition-all duration-1000 ease-out ${
                    keywordsVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: "1000ms" }}
                >
                  <div className="w-14 h-14 md:w-20 md:h-20 lg:w-32 lg:h-32 bg-blue-700 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
                    <span className="text-white font-bold text-xs md:text-sm lg:text-2xl">
                      최상
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm md:text-lg text-gray-700 leading-relaxed mb-8">
              재산세, 법인세, 조세불복 등 복잡한 세금 문제로 고민중이신가요?
              <br />
              이�� 세무법인 로고스 강남지점이 책임지고 해결해드리겠습니다.
            </p>
          </div>
        </div>
      </section>

      {/* Frame 3: Expert Group Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Frame with content from uploaded image */}
            <div className="bg-white border border-gray-200 rounded-xl p-10 shadow-sm">
              <p className="text-sm md:text-lg text-gray-700 mb-2 text-center">
                전문가그룹이 고객의 상황에 맞는
              </p>
              <div className="text-center">
                <p className="text-lg md:text-xl font-bold text-indigo-700 mb-8 bg-indigo-50 py-3 px-4 rounded-lg inline-block">
                  개인별 최적화된 세무 솔루션을 제공합니다.
                </p>
              </div>
              <div className="text-center">
                <Link
                  to="/team"
                  className="inline-block bg-blue-700 text-white px-10 py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
                >
                  구성원 소개
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frame 4: Services Section */}
      <section className="py-28 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              담당 업무
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              이 모든 업무를 세무법인 로고스 강남에서 제공하고 있습니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow group"
              >
                <div className="h-2 w-12 bg-blue-700 mb-6 group-hover:w-16 transition-all duration-300"></div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {service}
                </h4>
                <p className="text-gray-600 text-sm">
                  전문적이고 ��계적인 서비스를 제공합니다.
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              to="/services"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-800 transition-colors"
            >
              ���세 업무 보기
            </Link>
          </div>
        </div>
      </section>

      {/* Frame 5: Contact Section */}
      <section className="py-28 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-blue-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
              상담 문의
            </h3>
            <p className="text-lg text-gray-600 mb-12">
              세무 관련 문의사항이 있으시면 언제든지 연락해 주세요.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-xl shadow-sm border border-blue-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  전화 상담
                </h4>
                <p className="text-2xl font-bold text-blue-700 mb-2">
                  02-563-2505
                </p>
                <p className="text-gray-600">평일 9:00 - 18:00</p>
              </div>
              <div className="bg-white p-10 rounded-xl shadow-sm border border-blue-100">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">
                  방문 상담
                </h4>
                <p className="text-gray-700 mb-2">
                  서울특별시 강남구 테헤란로20길 18
                </p>
                <Link
                  to="/directions"
                  className="text-blue-700 hover:text-blue-800 font-semibold"
                >
                  오시는 길 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
