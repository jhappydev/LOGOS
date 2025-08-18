import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Layout from "../components/Layout";

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      title: "세금신고업무",
      description: "정확하고 효율적인 신고로 불필요한 세금 부담 최소화",
      detail:
        "• 개인사업자, 법인사업자의 종합소득세·법인세·부가가치세 신고 대행\n• 최신 세법 개정사항을 반영한 맞춤형 절세 전략 제공",
    },
    {
      title: "상속·증여·양도 신고",
      description: "복잡한 절차도 한 번에 해결",
      detail:
        "• 부동산, 주식, 가업 승계 등 상속·증여·양도소득세 전문 신고\n• 가업상속공제, 증여재산공제, 장기보유특별공제 등 다양한 세제 혜택 적용",
    },
    {
      title: "경정청구(환급)",
      description: "놓친 세금, 되돌려 받으세요",
      detail:
        "• 신고 오류·세액공제 누락·감면 미적용 등 사유 분석\n• 과다 납부 세금의 환급을 위한 경정청구 전 과정 대행",
    },
    {
      title: "조세불복",
      description: "부당한 과세로부터 권익 보호",
      detail:
        "• 이의신청, 심사청구, 심판청구 등 전문 조세불복 절차 수행\n• 세무조사·과세처분 대응 경험이 풍부한 전문가의 전략 제시",
    },
    {
      title: "경영컨설팅",
      description: "세무와 경영을 함께 보는 종합 솔루션",
      detail:
        "• 법인 설립, 사업 구조 변경, 세무 리스크 관리\n• 장기 절세 계획과 재무 구조 최적화",
    },
    {
      title: "세무조사 수임",
      description: "세무조사의 모든 단계, 전문가가 함께 합니다",
      detail:
        "• 조사 전 사전 준비, 자료 정리, 과세자료 분석\n• 조사 중 현장 대응 및 국세청 협의\n• 조사 종료 후 사후관리까지 전 과정 책임 수행",
    },
  ];

  const toggleService = (index: number) => {
    setExpandedService(expandedService === index ? null : index);
  };

  return (
    <Layout heroTitle="담당업무">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {services.map((service, index) => (
                <div key={index} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleService(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    {/* 타이틀: 가장 큰 글자 */}
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">
                      {service.title}
                    </h3>
                    {expandedService === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  {expandedService === index && (
                    <div className="px-4 pb-4">
                      {/* 설명: 타이틀보다는 작고 세부보다는 큰 글자 */}
                      <p className="text-base md:text-lg lg:text-xl text-black font-medium mt-2">
                        {service.description}
                      </p>

                      {/* 세부 설명: 가장 작은 글자 */}
                      <p className="text-sm md:text-base lg:text-lg text-gray-500 mt-2 whitespace-pre-line">
                        {service.detail}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
