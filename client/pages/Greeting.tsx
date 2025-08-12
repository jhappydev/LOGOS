import Layout from "../components/Layout";

export default function Greeting() {
  return (
    <Layout heroTitle="인사말">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="py-16">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-6">
                  안녕하십니까.
                  <br />
                  세무법인 로고스 강남지점 대표세무사 윤영호입니다.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  먼저 저희 홈페이지를 방문해주신 모든 분께 깊은 감사의 인사를
                  드립니다.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  저는 1993년부터 2025년 6월까지 국세청에서 32년간 근무하며
                  조사, 부과, 징수, 국세심판 등 세법 전반에 걸쳐 다양한 실무를
                  경험해왔습니다. 이러한 풍부한 실무 경험과 세법에 대한 깊은
                  이해를 바탕으로 2025년 7월, 세무법인 로고스 강남지점을
                  설립하게 되었습니다.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  세무는 단순히 수치를 계산하는 작업이 아니라 고객 한 분 한 분의
                  삶과 사업, 그리고 미래를 함께 고민하는 일이라고 생각합니다.
                  그래서 저희는 1:1 맞춤 상담을 통해 각자의 상황과 요구에 맞춘
                  실질적이고 정확한 세무 솔루션을 제공해 드리고자 합니다.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  또한, 저희 로고스 강남지점은 재산제세, 법인세, 조세불복,
                  세무조사 대응 등 복잡하고 민감한 세무 이슈에서도 분야별
                  전문가들과 함께 긴밀하게 협업하며 신속하고 정확한 대응으로
                  고객님의 권익을 지켜 드릴 것을 약속드립니다.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  상담 이후에도 단절되지 않고, 사후관리까지 책임지는 세무
                  서비스로 고객님께 신뢰를 드리고 든든한 동반자가 되겠습니다.
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  앞으로도 세무법인 로고스 강남지점은
                  <br />
                  '고객 한 분, 한 분께 정성을 다하고 끝까지 책임지는 것'이라는
                  신념 아래 늘 성실하고 진정성 있는 자세로 여러분을
                  맞이하겠습니다.
                </p>

                <p className="text-lg leading-relaxed mb-8">감사합니다.</p>

                <div className="text-right mt-12">
                  <p className="text-lg font-medium">
                    세무법인 로고스 대표{" "}
                    <span style={{ fontSize: "25px" }}>
                      <strong>
                        <span style={{ fontSize: "24px" }}>윤 영 호</span>
                      </strong>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
