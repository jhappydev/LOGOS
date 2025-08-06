import { Phone, MessageCircle } from "lucide-react";

export default function FloatingButtons() {
  const handlePhoneCall = () => {
    window.location.href = "tel:02-563-2505";
  };

  const handleKakaoChat = () => {
    window.open("http://pf.kakao.com/_QLgxen", "_blank");
  };

  return (
    <>
      {/* Desktop Floating Buttons - Right Bottom */}
      <div className="hidden lg:block fixed bottom-6 right-6 z-50">
        <div className="flex flex-col gap-3">
          {/* Phone Button */}
          <button
            onClick={handlePhoneCall}
            className="flex flex-col items-center justify-center w-20 h-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#070D4C" }}
          >
            <Phone className="w-6 h-6 text-white mb-1" />
            <span className="text-xs text-white font-medium">전화상담</span>
          </button>

          {/* KakaoTalk Button */}
          <button
            onClick={handleKakaoChat}
            className="flex flex-col items-center justify-center w-20 h-20 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: "#070D4C" }}
          >
            <MessageCircle className="w-6 h-6 text-white mb-1" />
            <span className="text-xs text-white font-medium">카톡상담</span>
          </button>
        </div>
      </div>

      {/* Mobile Bottom Tab - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="flex">
          {/* Phone Button */}
          <button
            onClick={handlePhoneCall}
            className="flex-1 flex items-center justify-center py-4 border-r border-blue-600"
            style={{ backgroundColor: "#070D4C" }}
          >
            <Phone className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-medium">전화상담</span>
          </button>

          {/* KakaoTalk Button */}
          <button
            onClick={handleKakaoChat}
            className="flex-1 flex items-center justify-center py-4"
            style={{ backgroundColor: "#070D4C" }}
          >
            <MessageCircle className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-medium">카톡상담</span>
          </button>
        </div>
      </div>
    </>
  );
}
