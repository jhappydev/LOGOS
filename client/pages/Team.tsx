import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  specialization: string;
  image: string;
  email: string;
  career: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "yyh",
    name: "윤 영 호",
    position: "대표세무사",
    email: "youngtax25@naver.com",
    specialization: "세무조사, 재산세 (양도, 증여, 상속), 법인세 분야 전문가",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F91fa1cf5b0914bb095b18283f6d67553?format=webp&width=800",
    career: [
      "국세청 32년 근무",
      "반포 세무서 재산세 과장",
      "도봉 세무서 법인 재산세 과장",
      "북전주 세무서 조사과장",
      "국세청 감사관실",
      "서울청 1국, 조사 3국",
      "역삼조사, 삼성법인, 강남재산",
      "금천·성동조사",
      "서울청 부가세과 팀장 등",
    ],
  },
  {
    id: "lys",
    name: "이 영 섭",
    position: "경영 컨설팅 연구소장",
    email: "joohan3183@naver.com",
    specialization: "기업 컨설팅, M&A 분야 전문가",
    image: "이미지 준비중",
    career: [
      "한국철도공사(코레일) 경영평가위원",
      "상명대학교 산업경영학과 초빙교수",
      "대한민국정부 헌정 사상 최초 민간 컨설팅 수행",
      "MBC 전략정보경영시스템 도입을 위한 진단",
      "삼성전자 가전본부 고문",
      "LG전자 가전본부 원가관리",
      "SK Chemical 지식경영시스템",
    ],
  },
  {
    id: "jyh",
    name: "정 영 호",
    position: "컨설턴트",
    email: " ksjy0111@naver.com",
    specialization: "컨설팅, 조세 불복 전문",
    image: "images/정영호.jpeg",
    career: ["고려대 법학과 졸업"],
  },
  {
    id: "byg",
    name: "배 연 경",
    position: "세 무 사",
    email: "yoke258@naver.com",
    specialization: "법인세, 부가가치세 전문",
    image: "images/배연경.jpg",
    career: ["세무법인 삼성"],
  },
];

export default function Team() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // 모달 열릴 때 배경 스크롤 방지
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedMember]);

  // 스크롤 그라데이션 효과 제어 (데스크톱만)
  useEffect(() => {
    if (selectedMember) {
      const checkScrollable = (
        scrollContainerId: string,
        gradientId: string,
      ) => {
        const scrollContainer = document.getElementById(scrollContainerId);
        const gradient = document.getElementById(gradientId);

        if (scrollContainer && gradient) {
          const isScrollable =
            scrollContainer.scrollHeight > scrollContainer.clientHeight;

          if (isScrollable) {
            gradient.style.opacity = "1";

            const handleScroll = () => {
              const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
              const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
              gradient.style.opacity = isAtBottom ? "0" : "1";
            };

            scrollContainer.addEventListener("scroll", handleScroll);
            return () =>
              scrollContainer.removeEventListener("scroll", handleScroll);
          } else {
            gradient.style.opacity = "0";
          }
        }
      };

      const timeoutId = setTimeout(() => {
        checkScrollable("career-scroll-desktop", "scroll-gradient-desktop");
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [selectedMember]);

  // 공통 이미지 박스 (없으면 회색 박스 + 텍스트)
  const renderImage = (member: TeamMember, size = "card") => {
    const baseClass =
      size === "modal-desktop"
        ? "w-56 h-72"
        : size === "modal-mobile"
          ? "w-full h-56"
          : "w-32 h-40 lg:w-40 lg:h-52";

    if (member.image === "이미지 준비중") {
      return (
        <div
          className={`${baseClass} flex items-center justify-center rounded bg-gray-200 text-gray-500 text-sm`}
        >
          이미지 준비중
        </div>
      );
    }

    return (
      <img
        src={member.image}
        alt={member.name}
        onContextMenu={(e) => e.preventDefault()}
        draggable={false}
        onTouchStart={(e) => e.preventDefault()}
        className={`${baseClass} object-contain rounded bg-white`}
      />
    );
  };

  return (
    <Layout heroTitle="주요 구성원 소개">
      <section className="py-16 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Desktop Layout */}
            <div className="hidden lg:block">
              {/* First row - 2 cards */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {teamMembers.slice(0, 2).map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 cursor-pointer hover:shadow-md transition-shadow flex"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex-1 flex flex-col mr-6">
                      <div className="mb-3">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F4ce64c9a24414ec5aeb42f4477a65b1c?format=webp&width=800"
                          alt="로고"
                          className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p
                        className="text-base lg:text-lg mb-3"
                        style={{ color: "#703B1F" }}
                      >
                        {member.position}
                      </p>
                      <p
                        className="text-base lg:text-lg leading-relaxed"
                        style={{ color: "#345A9E" }}
                      >
                        {member.specialization}
                      </p>
                    </div>
                    <div className="flex-shrink-0">{renderImage(member)}</div>
                  </div>
                ))}
              </div>

              {/* Second row - 1 card left aligned */}
              <div className="grid grid-cols-2 gap-6">
                {teamMembers.slice(2).map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 lg:p-8 cursor-pointer hover:shadow-md transition-shadow flex"
                    onClick={() => setSelectedMember(member)}
                  >
                    <div className="flex-1 flex flex-col mr-6">
                      <div className="mb-3">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F4ce64c9a24414ec5aeb42f4477a65b1c?format=webp&width=800"
                          alt="로고"
                          className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
                        />
                      </div>
                      <h3 className="font-bold text-xl lg:text-2xl text-gray-900 mb-2">
                        {member.name}
                      </h3>
                      <p
                        className="text-base lg:text-lg mb-3"
                        style={{ color: "#703B1F" }}
                      >
                        {member.position}
                      </p>
                      <p
                        className="text-base lg:text-lg leading-relaxed"
                        style={{ color: "#345A9E" }}
                      >
                        {member.specialization}
                      </p>
                    </div>
                    <div className="flex-shrink-0">{renderImage(member)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow flex flex-col"
                  onClick={() => setSelectedMember(member)}
                >
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F4ce64c9a24414ec5aeb42f4477a65b1c?format=webp&width=800"
                      alt="로고"
                      className="w-10 h-10 object-contain"
                    />
                  </div>

                  <h3 className="font-bold text-2xl text-black mb-2 text-left">
                    {member.name}
                  </h3>

                  <p
                    className="text-lg mb-3 text-left"
                    style={{ color: "#703B1F" }}
                  >
                    {member.position}
                  </p>

                  <p
                    className="text-lg mb-6 text-left leading-relaxed"
                    style={{ color: "#345A9E" }}
                  >
                    {member.specialization}
                  </p>

                  <div className="flex justify-center">
                    {renderImage(member)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedMember && (
          <>
            {/* Desktop Modal */}
            <div className="hidden lg:flex fixed inset-0 bg-black bg-opacity-50 items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full max-h-[80vh] flex">
                <div className="flex-shrink-0 w-72 p-8 border-r border-gray-200">
                  {renderImage(selectedMember, "modal-desktop")}
                  <div className="space-y-2 text-base text-gray-600">
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <span>{selectedMember.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 p-8 flex flex-col">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                        {selectedMember.name}
                      </h2>
                      <p className="text-lg lg:text-xl text-gray-600">
                        {selectedMember.position}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedMember(null)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg lg:text-xl text-gray-900 mb-4">
                      경력사항
                    </h3>
                    <div className="relative overflow-hidden">
                      <div
                        className="overflow-y-auto max-h-96 scrollbar-hide"
                        id="career-scroll-desktop"
                      >
                        <div className="space-y-3 pr-2">
                          {selectedMember.career.map((item, index) => (
                            <p
                              key={index}
                              className="text-gray-700 text-sm lg:text-base leading-relaxed"
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      </div>
                      <div
                        className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none opacity-0 transition-opacity duration-300"
                        id="scroll-gradient-desktop"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Modal */}
            <div className="lg:hidden bg-white rounded-lg shadow-lg w-full max-w-sm h-[85vh] overflow-y-auto fixed inset-0 z-50 mx-auto my-8">
              <div className="flex justify-end p-4 pb-2">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-6 pb-4">
                {renderImage(selectedMember, "modal-mobile")}
              </div>

              <div className="px-6 pb-4">
                <div className="text-lg text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>{selectedMember.email}</span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  {selectedMember.name}
                </h2>
                <p className="text-lg text-gray-600">
                  {selectedMember.position}
                </p>
              </div>

              <div className="px-6 pb-6">
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  경력사항
                </h3>
                <div className="space-y-2">
                  {selectedMember.career.map((item, index) => (
                    <p
                      key={index}
                      className="text-lg text-gray-700 leading-relaxed"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </Layout>
  );
}
