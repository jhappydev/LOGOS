import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function Facility() {
  const items = [
    {
      image: "images/시설1.jpeg",
      desc: "1번 이미지에 대한 설명입니다.",
    },
    {
      image: "images/시설2.jpeg",
      desc: "2번 이미지에 대한 설명입니다.",
    },
    {
      image: "images/시설3.jpeg",
      desc: "3번 이미지에 대한 설명입니다.",
    },
    {
      image: "images/시설4.jpeg",
      desc: "4번 이미지에 대한 설명입니다.",
    },
    {
      image: "images/시설5.jpeg",
      desc: "5번 이미지에 대한 설명입니다.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    if (isAutoPlay) {
      timer = window.setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 3000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, items.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  return (
    <Layout heroTitle="시설안내">
      <section className="py-10 sm:py-16 bg-white flex flex-col items-center text-center px-4">
        {/* 안내 문구 */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
          우리 시설을 소개합니다
        </h2>
        <p className="text-gray-500 max-w-xl mb-10">
          아래 사진을 통해 시설 내부를 간단히 둘러보실 수 있습니다.
        </p>
        {/* 이미지 슬라이더 래퍼 */}
        <div className="relative w-full max-w-3xl">
          {/* 이미지 */}
          <img
            src={items[currentIndex].image}
            alt="시설 이미지"
            className="w-full h-[32rem] object-cover rounded-xl shadow-lg"
          />

          {/* 이미지 번호 표시 */}
          <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {items.length}
          </div>

          {/* 이전 버튼 */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 px-3 py-2 rounded-full shadow"
          >
            ◀
          </button>

          {/* 다음 버튼 */}
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 px-3 py-2 rounded-full shadow"
          >
            ▶
          </button>

          {/* 자동재생 버튼 */}
          <button
            onClick={() => setIsAutoPlay((prev) => !prev)}
            className="absolute bottom-3 right-3 bg-black/60 hover:bg-black text-white px-3 py-1 rounded-full text-sm shadow"
          >
            {isAutoPlay ? "정지" : "재생"}
          </button>
        </div>
        {/* 이미지 설명 */}
        <p className="text-gray-600 mt-6 max-w-2xl">
          {items[currentIndex].desc}
        </p>
      </section>
    </Layout>
  );
}
