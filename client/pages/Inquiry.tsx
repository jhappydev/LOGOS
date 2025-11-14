import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Layout from "../components/Layout";

export default function Inquiry() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  // 📌 한국시간 포맷 YYYY.MM.DD HH:mm
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
      return `${missing
        .map((f) => `「${f.label}」`)
        .join(", ")} 항목을 입력해주세요.`;
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
      setSuccess(false);
      return;
    }

    // 🔥 제출 직전에 hidden input값 업데이트
    const submittedTime = getKoreanDateTime();
    const timeInput = formRef.current.querySelector(
      "input[name='submitted_at']",
    ) as HTMLInputElement;
    if (timeInput) timeInput.value = submittedTime;

    // 🔥 확인용 로그
    console.log("📌 제출시간:", submittedTime);

    setIsSending(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        PUBLIC_KEY,
      );

      console.log("✅ EmailJS 응답:", result);

      setSuccess(true);
      formRef.current.reset();
    } catch (err) {
      console.error("❌ 메일 전송 실패:", err);
      setError("메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Layout heroTitle="문의하기">
      <section className="py-10 sm:py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">문의하기</h2>

          <form
            ref={formRef}
            onSubmit={sendEmail}
            className="space-y-4"
            encType="multipart/form-data"
          >
            {/* 🔥 제출 시간(hidden, EmailJS가 읽음) */}
            <input type="hidden" name="submitted_at" />

            <div>
              <label className="block text-gray-700 mb-1">
                회사(단체)명 <span className="text-red-500">*</span>
              </label>
              <input
                name="company"
                type="text"
                className="w-full border p-2 rounded"
                placeholder="회사명 또는 단체명을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">부서/직급</label>
              <input
                name="position"
                type="text"
                className="w-full border p-2 rounded"
                placeholder="부서 또는 직급을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                성명 <span className="text-red-500">*</span>
              </label>
              <input
                name="name"
                type="text"
                className="w-full border p-2 rounded"
                placeholder="성함을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                이메일주소 <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                type="email"
                className="w-full border p-2 rounded"
                placeholder="example@email.com"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                type="tel"
                className="w-full border p-2 rounded"
                placeholder="010-1234-5678"
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">
                문의내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                className="w-full border p-2 rounded h-32"
                placeholder="문의 내용을 입력하세요"
              />
            </div>

            {error && (
              <p className="text-red-600 font-medium text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 font-medium text-center">
                메일이 성공적으로 전송되었습니다!
              </p>
            )}

            <div className="text-center pt-4">
              <button
                type="submit"
                disabled={isSending}
                className="bg-blue-600 text-white font-semibold px-8 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isSending ? "전송 중..." : "문의하기"}
              </button>
            </div>

            <p className="text-red-600 font-medium text-center pt-2">
              *첨부파일은 업로드가 불가능하오니 관련 파일은 회사 이메일로
              송부해주시기 바랍니다. <br />
            </p>
          </form>
        </div>
      </section>
    </Layout>
  );
}
