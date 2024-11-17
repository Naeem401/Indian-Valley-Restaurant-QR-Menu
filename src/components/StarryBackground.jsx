import { useEffect, useRef } from "react";

const StarryBackground = () => {
  const containerRef = useRef();

  useEffect(() => {
    const createStars = () => {
      const container = containerRef.current;
      const starCount = 150; 
      const starsArray = [];

      for (let i = 0; i < starCount; i++) {
        const star = document.createElement("div");
        star.classList.add(
          "absolute", 
          "w-[2px]",
          "h-[2px]",
          "bg-white",
          "rounded-full",
          "animate-twinkle"
        );
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;

        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        starsArray.push(star);
      }
      starsArray.forEach((star) => container.appendChild(star));
    };

    createStars();

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black z-[-1] overflow-hidden"
      ref={containerRef}
    ></div>
  );
};

export default StarryBackground;
