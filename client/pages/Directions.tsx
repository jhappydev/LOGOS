import { useEffect, useRef } from "react";
import { MapPin, Navigation, ExternalLink, Train } from "lucide-react";
import Layout from "../components/Layout";

declare global {
  interface Window {
    naver: any;
  }
}

export default function Directions() {
  const mapElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapElement.current) return;

    // Initialize map when Naver Maps API is loaded
    const initMap = () => {
      const map = new window.naver.maps.Map(mapElement.current, {
        center: new window.naver.maps.LatLng(37.498537, 127.034435), // 역삼역 근처 좌표
        zoom: 17,
        mapTypeControl: true,
      });

      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(37.4991, 127.0341),
        map: map,
        title: "세무법인 로고스 강남지점",
        icon: {
          content:
            '<div style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">로고스</div>',
          anchor: new window.naver.maps.Point(25, 26),
        },
      });

      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 200px;">
            <h4 style="margin: 0 0 8px 0; font-weight: bold;">세무법인 로고스 강남지점</h4>
            <p style="margin: 0; font-size: 13px; color: #666;">
              서울특별시 강남구 테헤란로20길 18<br>
              (부봉빌딩) 4층<br>
              전화: 02-563-2505
            </p>
          </div>
        `,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });
    };

    if (window.naver && window.naver.maps) {
      initMap();
    } else {
      if (mapElement.current) {
        mapElement.current.innerHTML = `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #f3f4f6; border-radius: 8px;">
            <div style="text-align: center; color: #6b7280;">
              <svg style="width: 48px; height: 48px; margin: 0 auto 16px; color: #9ca3af;" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
              </svg>
              <p style="margin: 0; font-weight: 500;">지도를 로드하는 중...</p>
              <p style="margin: 8px 0 0 0; font-size: 14px;">네이버 지도 API 연동</p>
            </div>
          </div>
        `;
      }
    }
  }, []);

  const handleNaverMap = () => {
    const address = encodeURIComponent("서울특별시 강남구 테헤란로20길 18");
    window.open(`https://map.naver.com/v5/search/${address}`, "_blank");
  };

  const handleKakaoMap = () => {
    const address = encodeURIComponent("서울특별시 강남구 테헤란로20길 18");
    window.open(`https://map.kakao.com/link/search/${address}`, "_blank");
  };

  return (
    <Layout heroTitle="오시는 길">
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="flex flex-col gap-6">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <Train className="w-6 h-6 mr-2 text-blue-600" />
                    지하철 이용 안내
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-2">
                    <strong>역삼역 3번 출구</strong>에서 직진
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    올리브영, 투썸플레이스에서 좌회전 후 <br />
                    백소정 앞까지 쭉 들어오시면 됩니다.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg flex-1">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                    주소 및 연락처
                  </h3>
                  <p className="text-lg text-gray-700 mb-2">
                    서울특별시 강남구 테헤란로20길 18 <br />
                    (부봉빌딩) 4층
                  </p>
                  <p className="text-lg text-gray-600 mb-1">TEL: 02-563-2505</p>
                  <p className="text-lg text-gray-600">FAX: 02-563-2506</p>
                  <p className="text-lg text-gray-600">
                    EMAIL: logostax25@naver.com
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div
                  ref={mapElement}
                  className="w-full flex-1 rounded-lg border border-gray-200"
                  style={{ minHeight: "280px" }}
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                길찾기 및 지도 서비스
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={handleNaverMap}
                  className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>네이버 지도</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <button
                  onClick={handleKakaoMap}
                  className="flex items-center justify-center space-x-2 bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  <span>카카오맵</span>
                  <ExternalLink className="w-3 h-3" />
                </button>

                <a
                  href="tel:02-563-2505"
                  className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>전화걸기</span>
                </a>
              </div>
            </div>

            {/* Additional Info */}
            <div className="mt-6 bg-amber-50 p-4 rounded-lg">
              {/* 모바일 버전 */}
              <p className="block md:hidden text-sm text-amber-800">
                <strong>주차 안내:</strong>
                <br />
                건물 내 주차장은 승용차 전용 기계식 주차장으로
                <br />
                주차 공간이 제한되어 있습니다.
                <br />
                인근 공용주차장 또는 포스코 건물 유료주차장을
                <br />
                이용하시거나 대중교통 이용을 권장드립니다.
              </p>

              {/* PC 버전 */}
              <p className="hidden md:block text-sm text-amber-800 whitespace-normal">
                <strong>주차 안내:</strong>
                <br />
                건물 내 주차장은 승용차 전용 기계식 주차장으로 주차 공간이
                제한되어 있습니다.
                <br />
                인근 공용주차장 또는 포스코 건물 유료주차장을 이용하시거나
                대중교통 이용을 권장드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
