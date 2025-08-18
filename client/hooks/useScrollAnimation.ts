import { useEffect, useRef, useState } from "react";

export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // ✅ 보이면 true, 안 보이면 false
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.3, // 30% 이상 보일 때 트리거
        rootMargin: "-50px 0px", // 50px 전에 미리 감지
        ...options,
      }
    );

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [options]);

  return [ref, isVisible] as const;
};
