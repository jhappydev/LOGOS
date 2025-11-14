import Layout from "../components/Layout";

export default function Helper() {
  const taxLinks = [
    {
      title: "원천세",
      url: "https://hometax.go.kr/",
      guide: " 세금신고 → 원천세 신고",
    },
    {
      title: "부가가치세",
      url: "https://hometax.go.kr/",
      guide: " 세금신고 → 부가가치세 신고",
    },
    {
      title: "종합소득세",
      url: "https://hometax.go.kr/",
      guide: " 세금신고 → 종합소득세 신고",
    },
    {
      title: "법인세",
      url: "https://hometax.go.kr/",
      guide: " 세금신고 → 법인세 신고",
    },
    { title: "지방세", url: "https://www.wetax.go.kr/", guide: "" },
    { title: "4대보험", url: "https://www.4insure.or.kr", guide: "" },
    {
      title: "근로장려금·자녀장려금",
      url: "https://hometax.go.kr/",
      guide: " 장려금·연말정산·기부금 → 근로·자녀장려금",
    },
    {
      title: "전자세금계산서 발행",
      url: "https://hometax.go.kr/",
      guide: " 계산서·영수증·카드 → 전자(세금)계산서 발급",
    },
    {
      title: "연말정산 간소화",
      url: "https://hometax.go.kr/",
      guide: " 장려금·연말정산·기부금 → 연말정산간소화",
    },
  ];

  const infoLinks = [
    { title: "국세 행정 정보", url: "https://www.nts.go.kr" },
    { title: "조세심판 관련 정보", url: "https://www.tt.go.kr" },
    { title: "회계·세무 기준", url: "https://www.kasb.or.kr" },
    { title: "공인회계사·세무 전문가 자료", url: "https://www.kicpa.or.kr" },
    { title: "세무사 관련 자료", url: "https://www.kacta.or.kr" },
    { title: "중소기업 지원 정책", url: "https://www.mss.go.kr" },
    { title: "금융 및 세무 이슈 참고", url: "https://www.fss.or.kr" },
  ];

  return (
    <Layout heroTitle="세무도우미">
      <section className="py-10 sm:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          {/* 세무 신고·납부 바로가기 */}
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            세무 신고·납부 바로가기
          </h2>
          <div className="space-y-6">
            {taxLinks.map((item) => (
              <div
                key={item.title}
                className="border-b pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-bold text-xl lg:text-2xl text-gray-800">
                    {item.title}
                  </h3>

                  {item.guide && (
                    <p className="text-base md:text-lg lg:text-xl text-black mt-2 mb-1 break-keep">
                      {item.guide}
                    </p>
                  )}
                </div>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                      inline-block
                      mt-3 sm:mt-0
                      px-4 py-2 text-xl sm:text-2xl font-medium
                      bg-[#7BB0E3] text-white
                      rounded-md hover:bg-[#5A9BD4] transition
                      w-1/3 sm:w-auto
                      text-center
                    "
                >
                  바로가기
                </a>
              </div>
            ))}
          </div>

          {/* 세무 정보 바로가기 */}
          <h2 className="text-3xl font-bold text-gray-800 mt-24 mb-6">
            세무 정보 바로가기
          </h2>
          <div className="space-y-4">
            {infoLinks.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between border-b pb-3"
              >
                <p className="text-xl sm:text-2xl font-medium text-gray-800 whitespace-nowrap">
                  {item.title}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xl sm:text-2xl hover:text-blue-800 font-medium flex-shrink-0"
                >
                  바로가기 →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
