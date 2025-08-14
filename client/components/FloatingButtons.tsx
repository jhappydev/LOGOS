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
      {/* Mobile Bottom Tab - Fixed Bottom */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="flex">
          {/* Phone Button */}
          <button
            onClick={handlePhoneCall}
            className="flex-1 flex items-center justify-center py-5"
            style={{ backgroundColor: "#070D4C" }}
          >
            <Phone className="w-6 h-6 text-white mr-2" />
            <span className="text-white font-medium text-lg">전화상담</span>
          </button>
        </div>
      </div>
    </>
  );
}
