"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface VantaKnobWavesProps {
  color?: number;
  shininess?: number;
  waveHeight?: number;
  waveSpeed?: number;
  zoom?: number;
}

export default function VantaKnobWaves({
  color = 0x0b2847,
  shininess = 30.0,
  waveHeight = 20.0,
  waveSpeed = 0.75,
  zoom = 0.65,
}: VantaKnobWavesProps) {
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let vantaEffect: any = null;
    let resizeTimer: NodeJS.Timeout | null = null;

    const initVanta = async () => {
      if (!vantaRef.current) return;
      try {
        if (typeof window !== "undefined") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).THREE = THREE;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const vantaModule: any = await import("vanta/dist/vanta.waves.min");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const WAVES = vantaModule.default || (window as any).VANTA?.WAVES || vantaModule;

        if (typeof WAVES === "function" && vantaRef.current) {
          vantaEffect = WAVES({
            el: vantaRef.current,
            THREE,
            mouseControls: false,
            touchControls: false,
            gyroControls: false,
            minHeight: 100.0,
            minWidth: 100.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color,
            shininess,
            waveHeight,
            waveSpeed,
            zoom,
            forceAnimate: true,
          });

          resizeTimer = setTimeout(() => {
            if (vantaEffect && typeof vantaEffect.resize === "function") {
              vantaEffect.resize();
            }
          }, 150);
        }
      } catch (error) {
        console.error("Failed to load Vanta Waves for knob:", error);
      }
    };

    initVanta();

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      if (vantaEffect) {
        try {
          if (vantaEffect.renderer) {
            vantaEffect.renderer.dispose?.();
            vantaEffect.renderer.forceContextLoss?.();
          }
          if (typeof vantaEffect.destroy === "function") {
            vantaEffect.destroy();
          }
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, [color, shininess, waveHeight, waveSpeed, zoom]);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none rounded-[1000px] z-0 bg-[#0b2847]"
    />
  );
}
