import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../components/Layout";

export default function Inquiry() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successModal, setSuccessModal] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  const getKoreanDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const minute = String(now.getMinutes()).padStart(2, "0");
    return `${year}.${month}.${day} ${hour}:${minute}`;
  };

  const validateForm = (formData: FormData) => {
    const requiredFields = [
      { name: "company", label: "회사(단체)명" },
      { name: "name", label: "성명" },
      { name: "email", label: "이메일주소" },
      { name: "phone", label: "전화번호" },
      { name: "message", label: "문의내용" },
    ];

    const missing = requiredFields.filter((f) => {
      const value = formData.get(f.name);
      return !value || (value as string).trim() === "";
    });

    if (missing.length > 0) {
      return `${missing.map((f) => `「${f.label}」`).join(", ")} 항목을 입력해주세요.`;
    }
    return null;
  };

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const validationError = validateForm(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    const submittedTime = getKoreanDateTime();
    const timeInput = formRef.current.querySelector(
      "input[name='submitted_at']",
    ) as HTMLInputElement;
    if (timeInput) timeInput.value = submittedTime;

    setIsSending(true);
    setError(null);

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY,
      );
      formRef.current.reset();
      setSuccessModal(true);
    } catch (err) {
      console.error("메일 전송 실패:", err);
      setError("메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout heroTitle="문의하기">
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-5xl font-bold mb-6 text-center">문의하기</h2>

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-5 text-xl"
            encType="multipart/form-data"
          >
            <input type="hidden" name="submitted_at" />

            <div>
              <label className="block text-gray-700 mb-2 text-xl">
                회사(단체)명 <span className="text-red-600 break-words">*</span>
              </label>
              <input
                name="company"
                type="text"
                className="w-full border p-4 rounded placeholder-gray-800 text-xl"
                placeholder="회사명 또는 단체명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xl">
                부서/직급
              </label>
              <input
                name="position"
                type="text"
                className="w-full border p-4 rounded placeholder-gray-800 text-xl"
                placeholder="부서 또는 직급을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xl">
                성명 <span className="text-red-600 break-words">*</span>
              </label>
              <input
                name="name"
                type="text"
                className="w-full border p-4 rounded placeholder-gray-800 text-xl"
                placeholder="성함을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xl">
                이메일주소 <span className="text-red-600 break-words">*</span>
              </label>
              <input
                name="email"
                type="email"
                className="w-full border p-4 rounded placeholder-gray-800 text-xl"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xl">
                전화번호 <span className="text-red-600 break-words">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full border p-4 rounded placeholder-gray-800 text-xl"
                placeholder="010-1234-5678"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2 text-xl">
                문의내용 <span className="text-red-600 break-words">*</span>
              </label>
              <textarea
                name="message"
                className="w-full border p-4 rounded placeholder-gray-800 h-40 resize-none text-xl"
                placeholder="문의 내용을 입력하세요"
              />
            </div>

            {error && (
              <p className="text-red-600 font-medium text-center text-xl break-words">
                {error}
              </p>
            )}

            <div className="text-center pt-5">
              <button
                type="submit"
                disabled={isSending}
                className="bg-[#7BB0E3] text-white font-semibold px-12 py-4 rounded text-2xl hover:bg-[#5A9BD4] disabled:bg-gray-400"
              >
                {isSending ? "전송 중..." : "문의하기"}
              </button>
            </div>

            <p className="text-red-600 font-medium text-center pt-3 text-xl break-words">
              *첨부파일은 업로드가 불가능하오니 관련 파일은 회사 이메일로
              송부해주시기 바랍니다.
            </p>
          </form>
        </div>

        {/* 🔹 성공 모달 */}
        {successModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm text-center relative">
              <h3 className="text-3xl font-bold mb-4">문의 성공!</h3>
              <p className="mb-6 text-2xl">메일이 성공적으로 전송되었습니다.</p>
              <button
                onClick={() => setSuccessModal(false)}
                className="bg-[#7BB0E3] text-white px-6 py-2 rounded hover:bg-[#5A9BD4]"
              >
                확인
              </button>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
