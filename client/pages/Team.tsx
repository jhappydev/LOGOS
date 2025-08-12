import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { X } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  position: string;
  specialization: string;
  image: string;
  career: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: "yoon",
    name: "윤 영 호",
    position: "대표이사 / 세무사",
    specialization: "세무조사, 재산세 (양도, 증여, 상속), 법인세 분야 전문가",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F91fa1cf5b0914bb095b18283f6d67553?format=webp&width=800",
    career: [
      "국세청 32년 근무",
      "반포재산, 도봉법인, 북전주조사과장",
      "국세청 감사관실",
      "서울청 1국, 조사 3국",
      "역삼조사, 삼성법인, 강남재산",
      "금천·성동조사",
      "서울청 부과세과 팀장 등",
      "국세청 32년 근��",
      "반포재산, 도봉법인, 북전주조사과장",
      "국세청 감사관실",
      "서울청 1국, 조사 3국",
      "역삼조사, 삼성법인, 강남재산",
      "금천·성동조사",
      "서울청 부과세과 팀장 등",
      "국세청 32년 근무",
      "반포재산, 도봉법인, 북전주조사과장",
      "국세청 감사관실",
      "서울청 1국, 조사 3국",
      "역삼조사, 삼성법인, 강남재산",
      "금천·성동조사",
      "서울청 부과세과 팀장 등",
    ],
  },
  {
    id: "lee",
    name: "이 영 섭",
    position: "고 문",
    specialization: "기업 컸설팅, M&A 분야 전문가",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F91fa1cf5b0914bb095b18283f6d67553?format=webp&width=800",
    career: [
      "스닥상장사 대한뉴팜(주) 대표이사",
      "한국철도공사(코레일) 경영평가위원",
      "상명대학교 산업경영학과 초빙교��",
      "대한민국정부 헌정 사상 최초 민간 컨설팅 수행",
      "MBC ��략정보경영시스템 도입을 위한 진단",
      "삼성전자 가전본부 고문",
      "LG전자 가전본부 원가관리",
      "SK Chemical ��식경영시스템",
      "스닥상장사 대한뉴팜(주) 대표이사",
      "한국철도공사(코레일) 경영평가위원",
      "상명대학교 산업경영학과 초빙교수",
      "대한민국정부 ���정 사상 최초 민간 컨설팅 수행",
      "MBC 전략정보경영시스템 도입을 위한 진단",
      "삼성전자 가전본부 고문",
      "LG전자 가전본부 원가관리",
      "SK Chemical 지식경영시스템",
      "스닥상장사 대한뉴팜(주) 대표이사",
      "한국철도공사(코레일) 경영평가위원",
      "상명대학교 산업경영학과 초빙교수",
      "대한민국정부 헌정 사상 최초 민간 ���설팅 수행",
      "MBC 전략정보경영시스템 도입을 위한 진단",
      "삼성전자 가전본부 고문",
      "LG전자 가전본부 원가���리",
      "SK Chemical 지식경영시스템",
    ],
  },
  {
    id: "noh",
    name: "노 현 철",
    position: "이 사",
    specialization: "소득세, ���가세, 재산세 전문가",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F91fa1cf5b0914bb095b18283f6d67553?format=webp&width=800",
    career: [
      "국세청 15년 근무",
      "분�� 법인 의정부 재산 등",
      "국세청 15년 근무",
      "분당 법인 의정부 재산 등",
      "국세청 15년 근무",
      "분당 법인 의정부 재산 등",
    ],
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

  return (
    <Layout heroTitle="구성원">
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
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow flex"
                    onClick={() => setSelectedMember(member)}
                  >
                    {/* Left side - Info */}
                    <div className="flex-1 flex flex-col mr-6">
                      {/* Logo */}
                      <div className="mb-3">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F4ce64c9a24414ec5aeb42f4477a65b1c?format=webp&width=800"
                          alt="로고"
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {member.name}
                      </h3>

                      {/* Position */}
                      <p className="text-xs mb-3" style={{ color: "#703B1F" }}>
                        {member.position}
                      </p>

                      {/* Specialization */}
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "#345A9E" }}
                      >
                        {member.specialization}
                      </p>
                    </div>

                    {/* Right side - Photo */}
                    <div className="flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-40 object-contain rounded bg-white"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Second row - 1 card left aligned */}
              <div className="grid grid-cols-2 gap-6">
                {teamMembers.slice(2).map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow flex"
                    onClick={() => setSelectedMember(member)}
                  >
                    {/* Left side - Info */}
                    <div className="flex-1 flex flex-col mr-6">
                      {/* Logo */}
                      <div className="mb-3">
                        <img
                          src="https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F4ce64c9a24414ec5aeb42f4477a65b1c?format=webp&width=800"
                          alt="로고"
                          className="w-8 h-8 object-contain"
                        />
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-lg text-gray-900 mb-2">
                        {member.name}
                      </h3>

                      {/* Position */}
                      <p className="text-xs mb-3" style={{ color: "#703B1F" }}>
                        {member.position}
                      </p>

                      {/* Specialization */}
                      <p
                        className="text-xs leading-relaxed"
                        style={{ color: "#345A9E" }}
                      >
                        {member.specialization}
                      </p>
                    </div>

                    {/* Right side - Photo */}
                    <div className="flex-shrink-0">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-32 h-40 object-contain rounded bg-white"
                      />
                    </div>
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
                  {/* Logo at top left */}
                  <div className="flex justify-start mb-4">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets%2Faefe9eccf09446e998a16c0318d70c3f%2F4ce64c9a24414ec5aeb42f4477a65b1c?format=webp&width=800"
                      alt="로고"
                      className="w-8 h-8 object-contain"
                    />
                  </div>

                  {/* Name - black, slightly bigger text */}
                  <h3 className="font-bold text-lg text-black mb-2 text-left">
                    {member.name}
                  </h3>

                  {/* Position - #703B1F color */}
                  <p
                    className="text-sm mb-3 text-left"
                    style={{ color: "#703B1F" }}
                  >
                    {member.position}
                  </p>

                  {/* Specialization - #345A9E color */}
                  <p
                    className="text-sm mb-6 text-left leading-relaxed"
                    style={{ color: "#345A9E" }}
                  >
                    {member.specialization}
                  </p>

                  {/* Photo at bottom center - no visible container */}
                  <div className="flex justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-48 object-contain rounded"
                      style={{ backgroundColor: "transparent" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal */}
        {selectedMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            {/* Desktop Layout */}
            <div className="hidden md:flex bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh]">
              {/* Left side - Photo and contact info */}
              <div className="flex-shrink-0 w-64 p-6 border-r border-gray-200">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-48 h-64 object-cover rounded mb-6 mx-auto"
                />
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>jason@outlook.com</span>
                  </div>
                </div>
              </div>

              {/* Right side - Info and career */}
              <div className="flex-1 p-6 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {selectedMember.name}
                    </h2>
                    <p className="text-gray-600">{selectedMember.position}</p>
                  </div>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-4">경력사항</h3>
                  <div className="relative overflow-hidden">
                    <div
                      className="overflow-y-auto max-h-80 scrollbar-hide"
                      id="career-scroll-desktop"
                    >
                      <div className="space-y-2 pr-2">
                        {selectedMember.career.map((item, index) => (
                          <p
                            key={index}
                            className="text-gray-700 text-sm leading-relaxed"
                          >
                            {item}
                          </p>
                        ))}
                      </div>
                    </div>
                    {/* 스크롤 그라데이션 */}
                    <div
                      className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none opacity-0 transition-opacity duration-300"
                      id="scroll-gradient-desktop"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Layout - Now with full modal scroll */}
            <div className="md:hidden bg-white rounded-lg shadow-lg w-full max-w-sm h-[85vh] overflow-y-auto">
              {/* Header with close button */}
              <div className="flex justify-end p-4 pb-2">
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Photo section */}
              <div className="px-6 pb-4">
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-56 object-contain rounded bg-white"
                />
              </div>

              {/* Email section */}
              <div className="px-6 pb-4">
                <div className="text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>jason@outlook.com</span>
                  </div>
                </div>
              </div>

              {/* Name and position section */}
              <div className="px-6 pb-4">
                <h2 className="text-lg font-bold text-gray-900 mb-1">
                  {selectedMember.name}
                </h2>
                <p className="text-gray-600 text-sm">
                  {selectedMember.position}
                </p>
              </div>

              {/* Career section - simplified for full modal scroll */}
              <div className="px-6 pb-6">
                <h3 className="font-bold text-gray-900 mb-4">경력사항</h3>
                <div className="space-y-2">
                  {selectedMember.career.map((item, index) => (
                    <p
                      key={index}
                      className="text-gray-700 text-sm leading-relaxed"
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
