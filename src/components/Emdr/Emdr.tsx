"use client";

import { useRefFrom } from "@/hooks/useRefFrom";
import { type ElementRef, memo, useEffect, useRef, useState } from "react";

export const Emdr = memo(() => {
  const ballRef = useRef<ElementRef<"div">>(null);
  const frequency = 0.3; // Hz
  const period = 1000 / frequency; // Period of the motion in milliseconds
  const [isAnimating, setIsAnimating] = useState(true);

  const isAnimatingRef = useRefFrom(isAnimating);

  useEffect(() => {
    if (!isAnimating) return;

    const audioContext = new window.AudioContext();
    const amplitude = window.innerWidth / 2 - 28; // Half of the window width minus half of the ball's width
    let start: number | undefined;

    const updatePosition = (timestamp: number) => {
      if (!isAnimatingRef.current) {
        ballRef.current!.style.left = `${amplitude}px`;
        return;
      }

      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      const x =
        amplitude + amplitude * Math.sin((2 * Math.PI * elapsed) / period);

      if (ballRef.current) {
        ballRef.current.style.left = `${x}px`;
      }

      requestAnimationFrame(updatePosition);
    };

    requestAnimationFrame(updatePosition);

    return () => {
      audioContext.close();
    };
  }, [isAnimating, isAnimatingRef, period]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <>
      <div
        ref={ballRef}
        className="absolute bg-blue-500 border-b-4 border-blue-700 rounded-full h-12 w-12"
      />
      <button
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded absolute bottom-4"
        onClick={toggleAnimation}
      >
        {isAnimating ? "Stop" : "Start"}
      </button>
    </>
  );
});

Emdr.displayName = "Emdr";
