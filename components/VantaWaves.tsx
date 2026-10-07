"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface VantaWavesProps {
  color?: number;
  shininess?: number;
  waveHeight?: number;
  waveSpeed?: number;
  zoom?: number;
}

export default function VantaWaves({
  color = 0x182f,
  shininess = 28.0,
  waveHeight = 20.5,
  waveSpeed = 0.8,
  zoom = 0.65,
}: VantaWavesProps) {
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
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
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
          }, 100);
        }
      } catch (error) {
        console.error("Failed to load Vanta Waves:", error);
      }
    };

    initVanta();

    return () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      if (vantaEffect && typeof vantaEffect.destroy === "function") {
        try {
          vantaEffect.destroy();
        } catch {
          // ignore cleanup error
        }
      }
    };
  }, [color, shininess, waveHeight, waveSpeed, zoom]);

  return (
    <div
      ref={vantaRef}
      className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none"
    />
  );
}
