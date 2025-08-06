import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Layout from "../components/Layout";

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  const services = [
    {
      title: "세금신고업무",
      description: "상세 설명이 준비 중입니다.",
    },
    {
      title: "상속, 증여, 양도 신고",
      description: "상세 설명이 준비 중입니다.",
    },
    {
      title: "경정청구(환급)",
      description: "상세 설명이 준비 중입니다.",
    },
    {
      title: "조세불복",
      description: "상세 설명이 준비 중입니다.",
    },
    {
      title: "경영컨설팅",
      description: "상세 설명이 준비 중입니다.",
    },
    {
      title: "세무조사 수임",
      description: "상세 설명이 준비 중입니다.",
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
                    <h3 className="text-lg font-semibold text-gray-800">
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
                      <p className="text-gray-600">{service.description}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        상세 설명 추가를 원하시면 계속 요청해 주세요.
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
