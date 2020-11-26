import { useState, useEffect, useRef } from "react";

export default function useComponentVisible(
  initialIsVisible: boolean,
  outsideCallback?: Function
) {
  const [isComponentVisible, setIsComponentVisible] = useState(
    initialIsVisible
  );
  const ref = useRef<HTMLDivElement>(null);

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsComponentVisible(false);
      outsideCallback?.();
    }
  };

  const handleClick = (event: Event) => {
    // Click outside
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsComponentVisible(false);
      outsideCallback?.();
    } else {
      setIsComponentVisible(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHideDropdown, true);
    document.addEventListener("click", handleClick, true);
    return () => {
      document.removeEventListener("keydown", handleHideDropdown, true);
      document.removeEventListener("click", handleClick, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}
