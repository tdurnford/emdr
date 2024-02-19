"use client";

import { type ElementRef, memo, useEffect, useRef, useState } from "react";

import { useBoolean, useRefFrom } from "@/hooks";

import { Controller } from "./Controller";

export const Emdr = memo(() => {
  const [frequency, setFrequency] = useState(0.5);
  const [isAnimating, { toggle }] = useBoolean(false);

  const ballRef = useRef<ElementRef<"div">>(null);
  const isAnimatingRef = useRefFrom(isAnimating);

  useEffect(() => {
    if (!isAnimating) {
      return;
    }

    let start: number | undefined;

    // The amplitude is half the screen width minus the ball's width
    const amplitude =
      window.innerWidth / 2 -
      (ballRef.current?.getBoundingClientRect().width ?? 0) / 2;

    const updatePosition = (timestamp: number) => {
      if (!isAnimatingRef.current) {
        // Reset the ball's position
        ballRef.current!.style.left = `${amplitude}px`;
        return;
      }

      if (start === undefined) {
        start = timestamp;
      }
      const elapsed = timestamp - start;
      const period = 1000 / frequency;
      const x =
        amplitude + amplitude * Math.sin((2 * Math.PI * elapsed) / period);

      if (ballRef.current) {
        ballRef.current.style.left = `${x}px`;
      }

      requestAnimationFrame(updatePosition);
    };

    requestAnimationFrame(updatePosition);
  }, [frequency, isAnimating, isAnimatingRef]);

  return (
    <div className="h-full flex justify-center items-center overflow-hidden relative">
      <div
        ref={ballRef}
        className="absolute bg-blue-500 border-b-4 border-blue-700 rounded-full h-12 w-12"
      />
      <Controller
        frequency={frequency}
        isAnimating={isAnimating}
        onToggleAnimation={toggle}
        onSetFrequency={setFrequency}
      />
    </div>
  );
});

Emdr.displayName = "Emdr";
